#!/usr/bin/env bash
# 重新生成 UPSTREAM.diff 与 UPSTREAM.changes.md
#
# 用法：
#   1. 把 OpenCut 上游仓库克隆/更新到 ../OpenCut（或通过 OPENCUT_DIR 环境变量指定）
#         git clone https://github.com/OpenCut-app/OpenCut.git ../OpenCut
#         # 或：cd ../OpenCut && git pull
#   2. 在本仓库根目录执行：
#         bash scripts/gen-upstream-diff.sh
#   3. git diff UPSTREAM.diff UPSTREAM.changes.md 查看变化
#
# 工作目录：在仓库根目录执行
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

OPENCUT_DIR="${OPENCUT_DIR:-$(cd "$ROOT_DIR/../OpenCut" 2>/dev/null && pwd || true)}"
if [[ -z "$OPENCUT_DIR" || ! -d "$OPENCUT_DIR/apps/web/src" ]]; then
  echo "❌ 找不到 OpenCut 上游目录。请设置 OPENCUT_DIR 或将 OpenCut 克隆到 $(cd "$ROOT_DIR/.." && pwd)/OpenCut" >&2
  echo "    例: OPENCUT_DIR=/path/to/OpenCut bash scripts/gen-upstream-diff.sh" >&2
  exit 1
fi

LEFT="$OPENCUT_DIR/apps/web/src"
RIGHT="$ROOT_DIR/src"

# 上游基线信息
pushd "$OPENCUT_DIR" >/dev/null
BASE_HASH=$(git rev-parse HEAD)
BASE_SUBJ=$(git log -1 --format='%s')
BASE_DATE=$(git log -1 --format='%ai')
BASE_BRANCH=$(git rev-parse --abbrev-ref HEAD)
BASE_REMOTE=$(git remote get-url origin)
popd >/dev/null

# 本地基线信息
LOCAL_HASH=$(git rev-parse --short HEAD)
LOCAL_SUBJ=$(git log -1 --format='%s')
LOCAL_REMOTE=$(git remote get-url origin 2>/dev/null || echo "(no remote)")
TODAY=$(date +%F)

OUT_DIFF="$ROOT_DIR/UPSTREAM.diff"
OUT_MD="$ROOT_DIR/UPSTREAM.changes.md"

EXCLUDES=(
  # 构建/缓存产物
  --exclude=node_modules --exclude=.git --exclude=dist --exclude=plugin-package
  --exclude=.DS_Store --exclude='*.tsbuildinfo'
  # OpenCut 独有、embed 不需要的业务壳
  --exclude=app --exclude=auth --exclude=blog --exclude=changelog
  --exclude=db --exclude=env --exclude=feedback --exclude=site --exclude=sounds
)

{
cat <<HEADER
# OpenCut → opencut-embed Upstream Diff
#
# 用途：记录 opencut-embed/src 相对 OpenCut/apps/web/src 的所有改动，
#       便于将来 pull OpenCut 上游更新时定位冲突 / 重新合并。
#
# ─────────────────────────────────────────────────────────────
# 上游基线（OpenCut）
#   repo:    $BASE_REMOTE
#   branch:  $BASE_BRANCH
#   commit:  $BASE_HASH
#   date:    $BASE_DATE
#   subject: $BASE_SUBJ
#
# 本地（opencut-embed）
#   repo:    $LOCAL_REMOTE
#   commit:  $LOCAL_HASH
#   subject: $LOCAL_SUBJ
#   生成日期: $TODAY
#
# ─────────────────────────────────────────────────────────────
# 对比映射
#   左侧 (a/):  $LEFT
#   右侧 (b/):  $RIGHT
#
# 排除规则见同目录 scripts/gen-upstream-diff.sh
# ─────────────────────────────────────────────────────────────

HEADER

diff -ruN "${EXCLUDES[@]}" "$LEFT" "$RIGHT" || true
} > "$OUT_DIFF"

echo "✅ 生成 $OUT_DIFF ($(wc -l < "$OUT_DIFF") 行)"

# ----- 生成 UPSTREAM.changes.md -----
python3 - "$OUT_DIFF" "$LEFT" "$RIGHT" "$OUT_MD" "$BASE_HASH" "$BASE_DATE" "$BASE_SUBJ" "$LOCAL_HASH" "$TODAY" <<'PY'
import sys, collections, os
diff_path, src_left, src_right, md_path, base_hash, base_date, base_subj, local_hash, today = sys.argv[1:]

added, deleted, modified = [], [], []
cur_left_path = cur_right_path = None
cur_left_ts   = cur_right_ts   = None

def flush():
    if cur_left_path is None or cur_right_path is None: return
    left_missing  = cur_left_ts  and cur_left_ts.startswith("1970-01-01")
    right_missing = cur_right_ts and cur_right_ts.startswith("1970-01-01")
    if left_missing and not right_missing:
        added.append(cur_right_path.replace(src_right + "/", ""))
    elif right_missing and not left_missing:
        deleted.append(cur_left_path.replace(src_left + "/", ""))
    else:
        modified.append(cur_right_path.replace(src_right + "/", ""))

with open(diff_path, encoding="utf-8", errors="replace") as f:
    for line in f:
        if line.startswith("diff -ruN"):
            flush()
            cur_left_path = cur_right_path = None
            cur_left_ts   = cur_right_ts   = None
        elif line.startswith("--- "):
            tail = line[4:].rstrip("\n")
            p, ts = (tail.split("\t", 1) + [""])[:2]
            cur_left_path, cur_left_ts = p, ts
        elif line.startswith("+++ "):
            tail = line[4:].rstrip("\n")
            p, ts = (tail.split("\t", 1) + [""])[:2]
            cur_right_path, cur_right_ts = p, ts
flush()

with open(md_path, "w", encoding="utf-8") as out:
    out.write("# UPSTREAM.diff 改动清单\n\n")
    out.write("> 由 `scripts/gen-upstream-diff.sh` 自动生成。\n\n")
    out.write("## 基线\n\n")
    out.write(f"- 上游 (a/): `OpenCut/apps/web/src` @ `{base_hash[:7]}` ({base_date.split()[0]}, {base_subj})\n")
    out.write(f"- 本地 (b/): `opencut-embed/src` @ `{local_hash}` (生成于 {today})\n\n")
    out.write("## 统计\n\n")
    out.write(f"- **修改**: {len(modified)} 个文件（升级时主要冲突点）\n")
    out.write(f"- **新增**: {len(added)} 个文件（embed 独有，升级时通常保留）\n")
    out.write(f"- **删除**: {len(deleted)} 个文件（上游有、embed 已移除，升级时通常忽略）\n\n")

    sections = (
        ("修改的文件 (Modified)", "升级时需重点查看，可能需要重新合并", modified),
        ("新增的文件 (Added in embed)", "embed 独有新增；升级时一般保留原样", added),
        ("删除/上游独有的文件 (Removed from embed)", "embed 已主动剔除；升级时一般继续保持不引入", deleted),
    )
    for title, hint, paths in sections:
        out.write(f"## {title}\n\n")
        out.write(f"_{hint}_\n\n")
        if not paths:
            out.write("(无)\n\n")
            continue
        groups = collections.defaultdict(list)
        for p in sorted(paths):
            top = p.split("/", 1)[0]
            groups[top].append(p)
        for top in sorted(groups):
            out.write(f"### `{top}/` ({len(groups[top])})\n\n")
            for p in groups[top]:
                out.write(f"- `{p}`\n")
            out.write("\n")
PY

echo "✅ 生成 $OUT_MD"
echo ""
echo "▶ 摘要："
head -n 12 "$OUT_MD"
