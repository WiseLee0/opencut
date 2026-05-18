let dS, lS, gS, Ki, Sf, yS, mS, kS, Nl, wa, _S, wS, Jn, bS, fS, hS, pS, TS, SS, xS, PS, CS, IS, vS, ES, AS, BS, FS, RS, MS, DS, OS, zS, NS;
let __tla = (async ()=>{
    function p(t) {
        if (!t) throw new Error("Assertion failed.");
    }
    const gn = (t)=>{
        const e = (t % 360 + 360) % 360;
        if (e === 0 || e === 90 || e === 180 || e === 270) return e;
        throw new Error(`Invalid rotation ${t}.`);
    }, ie = (t)=>t && t[t.length - 1], Tt = (t)=>t >= 0 && t < 2 ** 32, F = (t)=>{
        let e = 0;
        for(; t.readBits(1) === 0 && e < 32;)e++;
        if (e >= 32) throw new Error("Invalid exponential-Golomb code.");
        return (1 << e) - 1 + t.readBits(e);
    }, at = (t)=>{
        const e = F(t);
        return (e & 1) === 0 ? -(e >> 1) : e + 1 >> 1;
    }, Xo = (t, e, r, n)=>{
        for(let i = e; i < r; i++){
            const s = Math.floor(i / 8);
            let a = t[s];
            const o = 7 - (i & 7);
            a &= ~(1 << o), a |= (n & 1 << r - i - 1) >> r - i - 1 << o, t[s] = a;
        }
    }, he = (t)=>t.constructor === Uint8Array ? t : ArrayBuffer.isView(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : new Uint8Array(t), Z = (t)=>t.constructor === DataView ? t : ArrayBuffer.isView(t) ? new DataView(t.buffer, t.byteOffset, t.byteLength) : new DataView(t), ve = new TextDecoder, Se = new TextEncoder, Ti = (t)=>Object.fromEntries(Object.entries(t).map(([e, r])=>[
                r,
                e
            ])), Ut = {
        bt709: 1,
        bt470bg: 5,
        smpte170m: 6,
        bt2020: 9,
        smpte432: 12
    }, sn = Ti(Ut), Lt = {
        bt709: 1,
        smpte170m: 6,
        linear: 8,
        "iec61966-2-1": 13,
        pq: 16,
        hlg: 18
    }, an = Ti(Lt), Wt = {
        rgb: 0,
        bt709: 1,
        bt470bg: 5,
        smpte170m: 6,
        "bt2020-ncl": 9
    }, on = Ti(Wt), ka = (t)=>!!t && !!t.primaries && !!t.transfer && !!t.matrix && t.fullRange !== void 0, _n = (t)=>t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer || ArrayBuffer.isView(t);
    class lr {
        constructor(){
            this.currentPromise = Promise.resolve(), this.pending = 0;
        }
        async acquire() {
            let e;
            const r = new Promise((i)=>{
                let s = !1;
                e = ()=>{
                    s || (i(), this.pending--, s = !0);
                };
            }), n = this.currentPromise;
            return this.currentPromise = r, this.pending++, await n, e;
        }
    }
    const Qo = /^[0-9a-fA-F]+$/, Ar = (t)=>[
            ...t
        ].map((e)=>e.toString(16).padStart(2, "0")).join(""), Yo = (t)=>{
        p(t.length % 2 === 0);
        const e = new Uint8Array(t.length / 2);
        for(let r = 0; r < t.length; r += 2)e[r / 2] = parseInt(t.slice(r, r + 2), 16);
        return e;
    }, ls = (t)=>(t = t >> 1 & 1431655765 | (t & 1431655765) << 1, t = t >> 2 & 858993459 | (t & 858993459) << 2, t = t >> 4 & 252645135 | (t & 252645135) << 4, t = t >> 8 & 16711935 | (t & 16711935) << 8, t = t >> 16 & 65535 | (t & 65535) << 16, t >>> 0), Nr = (t, e, r)=>{
        let n = 0, i = t.length - 1, s = -1;
        for(; n <= i;){
            const a = n + i >> 1, o = r(t[a]);
            o === e ? (s = a, i = a - 1) : o < e ? n = a + 1 : i = a - 1;
        }
        return s;
    }, K = (t, e, r)=>{
        let n = 0, i = t.length - 1, s = -1;
        for(; n <= i;){
            const a = n + (i - n + 1) / 2 | 0;
            r(t[a]) <= e ? (s = a, n = a + 1) : i = a - 1;
        }
        return s;
    }, ds = (t, e, r)=>{
        const n = K(t, r(e), r);
        t.splice(n + 1, 0, e);
    }, le = ()=>{
        let t, e;
        return {
            promise: new Promise((n, i)=>{
                t = n, e = i;
            }),
            resolve: t,
            reject: e
        };
    }, Zo = (t, e)=>{
        const r = t.indexOf(e);
        r !== -1 && t.splice(r, 1);
    }, Ta = (t, e)=>{
        for(let r = t.length - 1; r >= 0; r--)if (e(t[r])) return t[r];
    }, Si = (t, e)=>{
        for(let r = t.length - 1; r >= 0; r--)if (e(t[r])) return r;
        return -1;
    }, Jo = async function*(t) {
        Symbol.iterator in t ? yield* t[Symbol.iterator]() : yield* t[Symbol.asyncIterator]();
    }, ec = (t)=>{
        if (!(Symbol.iterator in t) && !(Symbol.asyncIterator in t)) throw new TypeError("Argument must be an iterable or async iterable.");
    }, je = (t)=>{
        throw new Error(`Unexpected value: ${t}`);
    }, bn = (t, e, r)=>{
        const n = t.getUint8(e), i = t.getUint8(e + 1), s = t.getUint8(e + 2);
        return r ? n | i << 8 | s << 16 : n << 16 | i << 8 | s;
    }, tc = (t, e, r)=>bn(t, e, r) << 8 >> 8, xi = (t, e, r, n)=>{
        r = r >>> 0, r = r & 16777215, n ? (t.setUint8(e, r & 255), t.setUint8(e + 1, r >>> 8 & 255), t.setUint8(e + 2, r >>> 16 & 255)) : (t.setUint8(e, r >>> 16 & 255), t.setUint8(e + 1, r >>> 8 & 255), t.setUint8(e + 2, r & 255));
    }, rc = (t, e, r, n)=>{
        r = fe(r, -8388608, 8388607), r < 0 && (r = r + 16777216 & 16777215), xi(t, e, r, n);
    }, cn = (t, e)=>({
            async next () {
                const r = await t.next();
                return r.done ? {
                    value: void 0,
                    done: !0
                } : {
                    value: e(r.value),
                    done: !1
                };
            },
            return () {
                return t.return();
            },
            throw (r) {
                return t.throw(r);
            },
            [Symbol.asyncIterator] () {
                return this;
            }
        }), fe = (t, e, r)=>Math.max(e, Math.min(r, t)), me = "und", Br = (t)=>{
        const e = Math.round(t);
        return Math.abs(t / e - 1) < 10 * Number.EPSILON ? e : t;
    }, ni = (t, e)=>Math.round(t / e) * e, cr = (t, e)=>Math.round(t * e) / e, Fn = (t, e)=>Math.floor(t / e) * e, fs = (t, e)=>Math.floor(t * e) / e, nc = (t)=>{
        let e = 0;
        for(; t;)e++, t >>= 1;
        return e;
    }, ic = /^[a-z]{3}$/, Pi = (t)=>ic.test(t), bt = 1e6 * (1 + Number.EPSILON), sc = (t, e)=>{
        const r = t < 0 ? -1 : 1;
        t = Math.abs(t);
        let n = 0, i = 1, s = 1, a = 0, o = t;
        for(;;){
            const c = Math.floor(o), u = c * s + n, l = c * a + i;
            if (l > e) return {
                num: r * s,
                den: a
            };
            if (n = s, i = a, s = u, a = l, o = 1 / (o - c), !isFinite(o)) break;
        }
        return {
            num: r * s,
            den: a
        };
    };
    class Fr {
        constructor(){
            this.currentPromise = Promise.resolve();
        }
        call(e) {
            return this.currentPromise = this.currentPromise.then(e);
        }
    }
    let Rn = null;
    const Pr = ()=>Rn !== null ? Rn : Rn = !!(typeof navigator < "u" && (navigator.vendor?.match(/apple/i) || /AppleWebKit/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) || /\b(iPad|iPhone|iPod)\b/.test(navigator.userAgent)));
    let Mn = null;
    const ii = ()=>Mn !== null ? Mn : Mn = typeof navigator < "u" && navigator.userAgent?.includes("Firefox");
    let Dn = null;
    const si = ()=>Dn !== null ? Dn : Dn = !!(typeof navigator < "u" && (navigator.vendor?.includes("Google Inc") || /Chrome/.test(navigator.userAgent)));
    let On = null;
    const ac = ()=>{
        if (On !== null) return On;
        if (typeof navigator > "u") return null;
        const t = /\bChrome\/(\d+)/.exec(navigator.userAgent);
        return t ? On = Number(t[1]) : null;
    }, jt = (t, e)=>t !== -1 ? t : e, hs = (t, e, r, n)=>t <= n && r <= e, Ci = function*(t) {
        for(const e in t){
            const r = t[e];
            r !== void 0 && (yield {
                key: e,
                value: r
            });
        }
    }, oc = (t)=>{
        switch(t.toLowerCase()){
            case "image/jpeg":
            case "image/jpg":
                return ".jpg";
            case "image/png":
                return ".png";
            case "image/gif":
                return ".gif";
            case "image/webp":
                return ".webp";
            case "image/bmp":
                return ".bmp";
            case "image/svg+xml":
                return ".svg";
            case "image/tiff":
                return ".tiff";
            case "image/avif":
                return ".avif";
            case "image/x-icon":
            case "image/vnd.microsoft.icon":
                return ".ico";
            default:
                return null;
        }
    }, Sa = (t)=>{
        const e = atob(t), r = new Uint8Array(e.length);
        for(let n = 0; n < e.length; n++)r[n] = e.charCodeAt(n);
        return r;
    }, xa = (t, e)=>{
        if (t.length !== e.length) return !1;
        for(let r = 0; r < t.length; r++)if (t[r] !== e[r]) return !1;
        return !0;
    }, Ii = ()=>{
        Symbol.dispose ??= Symbol("Symbol.dispose");
    }, vi = (t)=>typeof t == "number" && !Number.isNaN(t), _t = (t, e)=>{
        if (e.includes("://")) return e;
        if (t.includes("://")) {
            const o = t.indexOf("?");
            o !== -1 && (t = t.slice(0, o));
        }
        let r;
        if (e.startsWith("/")) {
            const o = t.indexOf("://");
            if (o === -1) r = e;
            else {
                const c = t.indexOf("/", o + 3);
                c === -1 ? r = t + e : r = t.slice(0, c) + e;
            }
        } else {
            const o = t.lastIndexOf("/");
            o === -1 ? r = e : r = t.slice(0, o + 1) + e;
        }
        let n = "";
        const i = r.indexOf("://");
        if (i !== -1) {
            const o = r.indexOf("/", i + 3);
            o !== -1 && (n = r.slice(0, o), r = r.slice(o));
        }
        const s = r.split("/"), a = [];
        for (const o of s)o === ".." ? a.pop() : o !== "." && a.push(o);
        return n + a.join("/");
    }, Tr = (t, e)=>{
        let r = 0;
        for(let n = 0; n < t.length; n++)e(t[n]) && r++;
        return r;
    }, Ei = (t, e)=>{
        let r = -1, n = 1 / 0;
        for(let i = 0; i < t.length; i++){
            const s = e(t[i]);
            s < n && (n = s, r = i);
        }
        return r;
    }, Rr = (t)=>{
        p(Number.isInteger(t.num)), p(Number.isInteger(t.den)), p(t.den !== 0);
        let e = Math.abs(t.num), r = Math.abs(t.den);
        for(; r !== 0;){
            const i = e % r;
            e = r, r = i;
        }
        const n = e || 1;
        return {
            num: t.num / n,
            den: t.den / n
        };
    }, ms = (t, e)=>{
        if (typeof t != "object" || !t) throw new TypeError(`${e} must be an object.`);
        if (!Number.isInteger(t.left) || t.left < 0) throw new TypeError(`${e}.left must be a non-negative integer.`);
        if (!Number.isInteger(t.top) || t.top < 0) throw new TypeError(`${e}.top must be a non-negative integer.`);
        if (!Number.isInteger(t.width) || t.width < 0) throw new TypeError(`${e}.width must be a non-negative integer.`);
        if (!Number.isInteger(t.height) || t.height < 0) throw new TypeError(`${e}.height must be a non-negative integer.`);
    }, cc = (t)=>new Promise((e)=>setTimeout(e, t)), ps = (t)=>Array.isArray(t) ? t : [
            t
        ];
    class wn {
        constructor(){
            this._listeners = new Map;
        }
        on(e, r, n) {
            this._listeners.has(e) || this._listeners.set(e, new Set);
            const i = {
                fn: r,
                once: n?.once ?? !1
            };
            return this._listeners.get(e).add(i), ()=>{
                this._listeners.get(e)?.delete(i);
            };
        }
        _emit(...e) {
            const [r, n] = e, i = this._listeners.get(r);
            if (i) for (const s of i){
                try {
                    s.fn(n);
                } catch (a) {
                    console.error(a);
                }
                s.once && i.delete(s);
            }
        }
    }
    const uc = (t)=>t !== null && typeof t == "object" && Object.getPrototypeOf(t) === Object.prototype && Object.values(t).every((e)=>typeof e == "string");
    class ir {
        constructor(e, r){
            if (this.data = e, this.mimeType = r, !(e instanceof Uint8Array)) throw new TypeError("data must be a Uint8Array.");
            if (typeof r != "string") throw new TypeError("mimeType must be a string.");
        }
    }
    class Ai {
        constructor(e, r, n, i){
            if (this.data = e, this.mimeType = r, this.name = n, this.description = i, !(e instanceof Uint8Array)) throw new TypeError("data must be a Uint8Array.");
            if (r !== void 0 && typeof r != "string") throw new TypeError("mimeType, when provided, must be a string.");
            if (n !== void 0 && typeof n != "string") throw new TypeError("name, when provided, must be a string.");
            if (i !== void 0 && typeof i != "string") throw new TypeError("description, when provided, must be a string.");
        }
    }
    const lc = (t)=>{
        if (!t || typeof t != "object") throw new TypeError("tags must be an object.");
        if (t.title !== void 0 && typeof t.title != "string") throw new TypeError("tags.title, when provided, must be a string.");
        if (t.description !== void 0 && typeof t.description != "string") throw new TypeError("tags.description, when provided, must be a string.");
        if (t.artist !== void 0 && typeof t.artist != "string") throw new TypeError("tags.artist, when provided, must be a string.");
        if (t.album !== void 0 && typeof t.album != "string") throw new TypeError("tags.album, when provided, must be a string.");
        if (t.albumArtist !== void 0 && typeof t.albumArtist != "string") throw new TypeError("tags.albumArtist, when provided, must be a string.");
        if (t.trackNumber !== void 0 && (!Number.isInteger(t.trackNumber) || t.trackNumber <= 0)) throw new TypeError("tags.trackNumber, when provided, must be a positive integer.");
        if (t.tracksTotal !== void 0 && (!Number.isInteger(t.tracksTotal) || t.tracksTotal <= 0)) throw new TypeError("tags.tracksTotal, when provided, must be a positive integer.");
        if (t.discNumber !== void 0 && (!Number.isInteger(t.discNumber) || t.discNumber <= 0)) throw new TypeError("tags.discNumber, when provided, must be a positive integer.");
        if (t.discsTotal !== void 0 && (!Number.isInteger(t.discsTotal) || t.discsTotal <= 0)) throw new TypeError("tags.discsTotal, when provided, must be a positive integer.");
        if (t.genre !== void 0 && typeof t.genre != "string") throw new TypeError("tags.genre, when provided, must be a string.");
        if (t.date !== void 0 && (!(t.date instanceof Date) || Number.isNaN(t.date.getTime()))) throw new TypeError("tags.date, when provided, must be a valid Date.");
        if (t.lyrics !== void 0 && typeof t.lyrics != "string") throw new TypeError("tags.lyrics, when provided, must be a string.");
        if (t.images !== void 0) {
            if (!Array.isArray(t.images)) throw new TypeError("tags.images, when provided, must be an array.");
            for (const e of t.images){
                if (!e || typeof e != "object") throw new TypeError("Each image in tags.images must be an object.");
                if (!(e.data instanceof Uint8Array)) throw new TypeError("Each image.data must be a Uint8Array.");
                if (typeof e.mimeType != "string") throw new TypeError("Each image.mimeType must be a string.");
                if (![
                    "coverFront",
                    "coverBack",
                    "unknown"
                ].includes(e.kind)) throw new TypeError("Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.");
            }
        }
        if (t.comment !== void 0 && typeof t.comment != "string") throw new TypeError("tags.comment, when provided, must be a string.");
        if (t.raw !== void 0) {
            if (!t.raw || typeof t.raw != "object") throw new TypeError("tags.raw, when provided, must be an object.");
            for (const e of Object.values(t.raw))if (e !== null && typeof e != "string" && !(e instanceof Uint8Array) && !(e instanceof ir) && !(e instanceof Ai) && !uc(e)) throw new TypeError("Each value in tags.raw must be a string, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.");
        }
    }, dt = {
        default: !0,
        primary: !0,
        forced: !1,
        original: !1,
        commentary: !1,
        hearingImpaired: !1,
        visuallyImpaired: !1
    }, dc = (t)=>{
        if (!t || typeof t != "object") throw new TypeError("disposition must be an object.");
        if (t.default !== void 0 && typeof t.default != "boolean") throw new TypeError("disposition.default must be a boolean.");
        if (t.primary !== void 0 && typeof t.primary != "boolean") throw new TypeError("disposition.primary must be a boolean.");
        if (t.forced !== void 0 && typeof t.forced != "boolean") throw new TypeError("disposition.forced must be a boolean.");
        if (t.original !== void 0 && typeof t.original != "boolean") throw new TypeError("disposition.original must be a boolean.");
        if (t.commentary !== void 0 && typeof t.commentary != "boolean") throw new TypeError("disposition.commentary must be a boolean.");
        if (t.hearingImpaired !== void 0 && typeof t.hearingImpaired != "boolean") throw new TypeError("disposition.hearingImpaired must be a boolean.");
        if (t.visuallyImpaired !== void 0 && typeof t.visuallyImpaired != "boolean") throw new TypeError("disposition.visuallyImpaired must be a boolean.");
    };
    class Y {
        constructor(e){
            this.bytes = e, this.pos = 0;
        }
        seekToByte(e) {
            this.pos = 8 * e;
        }
        readBit() {
            const e = Math.floor(this.pos / 8), r = this.bytes[e] ?? 0, n = 7 - (this.pos & 7), i = (r & 1 << n) >> n;
            return this.pos++, i;
        }
        readBits(e) {
            if (e === 1) return this.readBit();
            let r = 0;
            for(let n = 0; n < e; n++)r <<= 1, r |= this.readBit();
            return r;
        }
        writeBits(e, r) {
            const n = this.pos + e;
            for(let i = this.pos; i < n; i++){
                const s = Math.floor(i / 8);
                let a = this.bytes[s];
                const o = 7 - (i & 7);
                a &= ~(1 << o), a |= (r & 1 << n - i - 1) >> n - i - 1 << o, this.bytes[s] = a;
            }
            this.pos = n;
        }
        readAlignedByte() {
            if (this.pos % 8 !== 0) throw new Error("Bitstream is not byte-aligned.");
            const e = this.pos / 8, r = this.bytes[e] ?? 0;
            return this.pos += 8, r;
        }
        skipBits(e) {
            this.pos += e;
        }
        getBitsLeft() {
            return this.bytes.length * 8 - this.pos;
        }
        clone() {
            const e = new Y(this.bytes);
            return e.pos = this.pos, e;
        }
    }
    const St = [
        96e3,
        88200,
        64e3,
        48e3,
        44100,
        32e3,
        24e3,
        22050,
        16e3,
        12e3,
        11025,
        8e3,
        7350
    ], dr = [
        -1,
        1,
        2,
        3,
        4,
        5,
        6,
        8
    ], Bi = (t)=>{
        if (!t || t.byteLength < 2) throw new TypeError("AAC description must be at least 2 bytes long.");
        const e = new Y(t);
        let r = e.readBits(5);
        r === 31 && (r = 32 + e.readBits(6));
        const n = e.readBits(4);
        let i = null;
        n === 15 ? i = e.readBits(24) : n < St.length && (i = St[n]);
        const s = e.readBits(4);
        let a = null;
        return s >= 1 && s <= 7 && (a = dr[s]), {
            objectType: r,
            frequencyIndex: n,
            sampleRate: i,
            channelConfiguration: s,
            numberOfChannels: a
        };
    }, Fi = (t)=>{
        let e = St.indexOf(t.sampleRate), r = null;
        e === -1 && (e = 15, r = t.sampleRate);
        const n = dr.indexOf(t.numberOfChannels);
        if (n === -1) throw new TypeError(`Unsupported number of channels: ${t.numberOfChannels}`);
        let i = 13;
        t.objectType >= 32 && (i += 6), e === 15 && (i += 24);
        const s = Math.ceil(i / 8), a = new Uint8Array(s), o = new Y(a);
        return t.objectType < 32 ? o.writeBits(5, t.objectType) : (o.writeBits(5, 31), o.writeBits(6, t.objectType - 32)), o.writeBits(4, e), e === 15 && o.writeBits(24, r), o.writeBits(4, n), a;
    };
    const Fe = [
        "avc",
        "hevc",
        "vp9",
        "av1",
        "vp8"
    ], be = [
        "pcm-s16",
        "pcm-s16be",
        "pcm-s24",
        "pcm-s24be",
        "pcm-s32",
        "pcm-s32be",
        "pcm-f32",
        "pcm-f32be",
        "pcm-f64",
        "pcm-f64be",
        "pcm-u8",
        "pcm-s8",
        "ulaw",
        "alaw"
    ], yn = [
        "aac",
        "opus",
        "mp3",
        "vorbis",
        "flac",
        "ac3",
        "eac3"
    ], ct = [
        ...yn,
        ...be
    ], zt = [
        "webvtt"
    ], un = [
        {
            maxMacroblocks: 99,
            maxBitrate: 64e3,
            maxDpbMbs: 396,
            level: 10
        },
        {
            maxMacroblocks: 396,
            maxBitrate: 192e3,
            maxDpbMbs: 900,
            level: 11
        },
        {
            maxMacroblocks: 396,
            maxBitrate: 384e3,
            maxDpbMbs: 2376,
            level: 12
        },
        {
            maxMacroblocks: 396,
            maxBitrate: 768e3,
            maxDpbMbs: 2376,
            level: 13
        },
        {
            maxMacroblocks: 396,
            maxBitrate: 2e6,
            maxDpbMbs: 2376,
            level: 20
        },
        {
            maxMacroblocks: 792,
            maxBitrate: 4e6,
            maxDpbMbs: 4752,
            level: 21
        },
        {
            maxMacroblocks: 1620,
            maxBitrate: 4e6,
            maxDpbMbs: 8100,
            level: 22
        },
        {
            maxMacroblocks: 1620,
            maxBitrate: 1e7,
            maxDpbMbs: 8100,
            level: 30
        },
        {
            maxMacroblocks: 3600,
            maxBitrate: 14e6,
            maxDpbMbs: 18e3,
            level: 31
        },
        {
            maxMacroblocks: 5120,
            maxBitrate: 2e7,
            maxDpbMbs: 20480,
            level: 32
        },
        {
            maxMacroblocks: 8192,
            maxBitrate: 2e7,
            maxDpbMbs: 32768,
            level: 40
        },
        {
            maxMacroblocks: 8192,
            maxBitrate: 5e7,
            maxDpbMbs: 32768,
            level: 41
        },
        {
            maxMacroblocks: 8704,
            maxBitrate: 5e7,
            maxDpbMbs: 34816,
            level: 42
        },
        {
            maxMacroblocks: 22080,
            maxBitrate: 135e6,
            maxDpbMbs: 110400,
            level: 50
        },
        {
            maxMacroblocks: 36864,
            maxBitrate: 24e7,
            maxDpbMbs: 184320,
            level: 51
        },
        {
            maxMacroblocks: 36864,
            maxBitrate: 24e7,
            maxDpbMbs: 184320,
            level: 52
        },
        {
            maxMacroblocks: 139264,
            maxBitrate: 24e7,
            maxDpbMbs: 696320,
            level: 60
        },
        {
            maxMacroblocks: 139264,
            maxBitrate: 48e7,
            maxDpbMbs: 696320,
            level: 61
        },
        {
            maxMacroblocks: 139264,
            maxBitrate: 8e8,
            maxDpbMbs: 696320,
            level: 62
        }
    ], gs = [
        {
            maxPictureSize: 36864,
            maxBitrate: 128e3,
            tier: "L",
            level: 30
        },
        {
            maxPictureSize: 122880,
            maxBitrate: 15e5,
            tier: "L",
            level: 60
        },
        {
            maxPictureSize: 245760,
            maxBitrate: 3e6,
            tier: "L",
            level: 63
        },
        {
            maxPictureSize: 552960,
            maxBitrate: 6e6,
            tier: "L",
            level: 90
        },
        {
            maxPictureSize: 983040,
            maxBitrate: 1e7,
            tier: "L",
            level: 93
        },
        {
            maxPictureSize: 2228224,
            maxBitrate: 12e6,
            tier: "L",
            level: 120
        },
        {
            maxPictureSize: 2228224,
            maxBitrate: 3e7,
            tier: "H",
            level: 120
        },
        {
            maxPictureSize: 2228224,
            maxBitrate: 2e7,
            tier: "L",
            level: 123
        },
        {
            maxPictureSize: 2228224,
            maxBitrate: 5e7,
            tier: "H",
            level: 123
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 25e6,
            tier: "L",
            level: 150
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 1e8,
            tier: "H",
            level: 150
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 4e7,
            tier: "L",
            level: 153
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 16e7,
            tier: "H",
            level: 153
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 6e7,
            tier: "L",
            level: 156
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 24e7,
            tier: "H",
            level: 156
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 6e7,
            tier: "L",
            level: 180
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 24e7,
            tier: "H",
            level: 180
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 12e7,
            tier: "L",
            level: 183
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 48e7,
            tier: "H",
            level: 183
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 24e7,
            tier: "L",
            level: 186
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 8e8,
            tier: "H",
            level: 186
        }
    ], wt = [
        {
            maxPictureSize: 36864,
            maxBitrate: 2e5,
            level: 10
        },
        {
            maxPictureSize: 73728,
            maxBitrate: 8e5,
            level: 11
        },
        {
            maxPictureSize: 122880,
            maxBitrate: 18e5,
            level: 20
        },
        {
            maxPictureSize: 245760,
            maxBitrate: 36e5,
            level: 21
        },
        {
            maxPictureSize: 552960,
            maxBitrate: 72e5,
            level: 30
        },
        {
            maxPictureSize: 983040,
            maxBitrate: 12e6,
            level: 31
        },
        {
            maxPictureSize: 2228224,
            maxBitrate: 18e6,
            level: 40
        },
        {
            maxPictureSize: 2228224,
            maxBitrate: 3e7,
            level: 41
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 6e7,
            level: 50
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 12e7,
            level: 51
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 18e7,
            level: 52
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 18e7,
            level: 60
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 24e7,
            level: 61
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 48e7,
            level: 62
        }
    ], _s = [
        {
            maxPictureSize: 147456,
            maxBitrate: 15e5,
            tier: "M",
            level: 0
        },
        {
            maxPictureSize: 278784,
            maxBitrate: 3e6,
            tier: "M",
            level: 1
        },
        {
            maxPictureSize: 665856,
            maxBitrate: 6e6,
            tier: "M",
            level: 4
        },
        {
            maxPictureSize: 1065024,
            maxBitrate: 1e7,
            tier: "M",
            level: 5
        },
        {
            maxPictureSize: 2359296,
            maxBitrate: 12e6,
            tier: "M",
            level: 8
        },
        {
            maxPictureSize: 2359296,
            maxBitrate: 3e7,
            tier: "H",
            level: 8
        },
        {
            maxPictureSize: 2359296,
            maxBitrate: 2e7,
            tier: "M",
            level: 9
        },
        {
            maxPictureSize: 2359296,
            maxBitrate: 5e7,
            tier: "H",
            level: 9
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 3e7,
            tier: "M",
            level: 12
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 1e8,
            tier: "H",
            level: 12
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 4e7,
            tier: "M",
            level: 13
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 16e7,
            tier: "H",
            level: 13
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 6e7,
            tier: "M",
            level: 14
        },
        {
            maxPictureSize: 8912896,
            maxBitrate: 24e7,
            tier: "H",
            level: 14
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 6e7,
            tier: "M",
            level: 15
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 24e7,
            tier: "H",
            level: 15
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 6e7,
            tier: "M",
            level: 16
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 24e7,
            tier: "H",
            level: 16
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 1e8,
            tier: "M",
            level: 17
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 48e7,
            tier: "H",
            level: 17
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 16e7,
            tier: "M",
            level: 18
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 8e8,
            tier: "H",
            level: 18
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 16e7,
            tier: "M",
            level: 19
        },
        {
            maxPictureSize: 35651584,
            maxBitrate: 8e8,
            tier: "H",
            level: 19
        }
    ], bs = ".01.01.01.01.00", ws = ".0.110.01.01.01.0", fc = (t, e, r, n)=>{
        if (t === "avc") {
            const s = Math.ceil(e / 16) * Math.ceil(r / 16), a = un.find((d)=>s <= d.maxMacroblocks && n <= d.maxBitrate) ?? ie(un), o = a ? a.level : 0, c = "64".padStart(2, "0"), u = "00", l = o.toString(16).padStart(2, "0");
            return `avc1.${c}${u}${l}`;
        } else if (t === "hevc") {
            const o = e * r, c = gs.find((l)=>o <= l.maxPictureSize && n <= l.maxBitrate) ?? ie(gs);
            return `hev1.1.6.${c.tier}${c.level}.B0`;
        } else {
            if (t === "vp8") return "vp8";
            if (t === "vp9") {
                const s = e * r;
                return `vp09.00.${(wt.find((c)=>s <= c.maxPictureSize && n <= c.maxBitrate) ?? ie(wt)).level.toString().padStart(2, "0")}.08`;
            } else if (t === "av1") {
                const s = e * r, a = _s.find((u)=>s <= u.maxPictureSize && n <= u.maxBitrate) ?? ie(_s);
                return `av01.0.${a.level.toString().padStart(2, "0")}${a.tier}.08`;
            }
        }
        throw new TypeError(`Unhandled codec '${t}'.`);
    }, hc = (t)=>{
        const e = t.split("."), r = Number(e[1]), n = Number(e[2]), i = Number(e[3]), s = e[4] ? Number(e[4]) : 1;
        return [
            1,
            1,
            r,
            2,
            1,
            n,
            3,
            1,
            i,
            4,
            1,
            s
        ];
    }, Pa = (t)=>{
        const e = t.split("."), i = (1 << 7) + 1, s = Number(e[1]), a = e[2], o = Number(a.slice(0, -1)), c = (s << 5) + o, u = a.slice(-1) === "H" ? 1 : 0, d = Number(e[3]) === 8 ? 0 : 1, f = 0, h = e[4] ? Number(e[4]) : 0, g = e[5] ? Number(e[5][0]) : 1, m = e[5] ? Number(e[5][1]) : 1, b = e[5] ? Number(e[5][2]) : 0, _ = (u << 7) + (d << 6) + (f << 5) + (h << 4) + (g << 3) + (m << 2) + b;
        return [
            i,
            c,
            _,
            0
        ];
    }, Ri = (t)=>{
        const { codec: e, codecDescription: r, colorSpace: n, avcCodecInfo: i, hevcCodecInfo: s, vp9CodecInfo: a, av1CodecInfo: o } = t;
        if (e === "avc") {
            if (p(t.avcType !== null), i) {
                const c = new Uint8Array([
                    i.avcProfileIndication,
                    i.profileCompatibility,
                    i.avcLevelIndication
                ]);
                return `avc${t.avcType}.${Ar(c)}`;
            }
            if (!r || r.byteLength < 4) throw new TypeError("AVC decoder description is not provided or is not at least 4 bytes long.");
            return `avc${t.avcType}.${Ar(r.subarray(1, 4))}`;
        } else if (e === "hevc") {
            let c, u, l, d, f, h;
            if (s) c = s.generalProfileSpace, u = s.generalProfileIdc, l = ls(s.generalProfileCompatibilityFlags), d = s.generalTierFlag, f = s.generalLevelIdc, h = [
                ...s.generalConstraintIndicatorFlags
            ];
            else {
                if (!r || r.byteLength < 23) throw new TypeError("HEVC decoder description is not provided or is not at least 23 bytes long.");
                const m = Z(r), b = m.getUint8(1);
                c = b >> 6 & 3, u = b & 31, l = ls(m.getUint32(2)), d = b >> 5 & 1, f = m.getUint8(12), h = [];
                for(let _ = 0; _ < 6; _++)h.push(m.getUint8(6 + _));
            }
            let g = "hev1.";
            for(g += [
                "",
                "A",
                "B",
                "C"
            ][c] + u, g += ".", g += l.toString(16).toUpperCase(), g += ".", g += d === 0 ? "L" : "H", g += f; h.length > 0 && h[h.length - 1] === 0;)h.pop();
            return h.length > 0 && (g += ".", g += h.map((m)=>m.toString(16).toUpperCase()).join(".")), g;
        } else {
            if (e === "vp8") return "vp8";
            if (e === "vp9") {
                if (!a) {
                    const _ = t.width * t.height;
                    let w = ie(wt).level;
                    for (const y of wt)if (_ <= y.maxPictureSize) {
                        w = y.level;
                        break;
                    }
                    return `vp09.00.${w.toString().padStart(2, "0")}.08`;
                }
                const c = a.profile.toString().padStart(2, "0"), u = a.level.toString().padStart(2, "0"), l = a.bitDepth.toString().padStart(2, "0"), d = a.chromaSubsampling.toString().padStart(2, "0"), f = a.colourPrimaries.toString().padStart(2, "0"), h = a.transferCharacteristics.toString().padStart(2, "0"), g = a.matrixCoefficients.toString().padStart(2, "0"), m = a.videoFullRangeFlag.toString().padStart(2, "0");
                let b = `vp09.${c}.${u}.${l}.${d}`;
                return b += `.${f}.${h}.${g}.${m}`, b.endsWith(bs) && (b = b.slice(0, -bs.length)), b;
            } else if (e === "av1") {
                if (!o) {
                    const y = t.width * t.height;
                    let T = ie(wt).level;
                    for (const S of wt)if (y <= S.maxPictureSize) {
                        T = S.level;
                        break;
                    }
                    return `av01.0.${T.toString().padStart(2, "0")}M.08`;
                }
                const c = o.profile, u = o.level.toString().padStart(2, "0"), l = o.tier ? "H" : "M", d = o.bitDepth.toString().padStart(2, "0"), f = o.monochrome ? "1" : "0", h = 100 * o.chromaSubsamplingX + 10 * o.chromaSubsamplingY + 1 * (o.chromaSubsamplingX && o.chromaSubsamplingY ? o.chromaSamplePosition : 0), g = n?.primaries ? Ut[n.primaries] : 1, m = n?.transfer ? Lt[n.transfer] : 1, b = n?.matrix ? Wt[n.matrix] : 1, _ = n?.fullRange ? 1 : 0;
                let w = `av01.${c}.${u}${l}.${d}`;
                return w += `.${f}.${h.toString().padStart(3, "0")}`, w += `.${g.toString().padStart(2, "0")}`, w += `.${m.toString().padStart(2, "0")}`, w += `.${b.toString().padStart(2, "0")}`, w += `.${_}`, w.endsWith(ws) && (w = w.slice(0, -ws.length)), w;
            }
        }
        throw new TypeError(`Unhandled codec '${e}'.`);
    }, mc = (t, e, r)=>{
        if (t === "aac") return e >= 2 && r <= 24e3 ? "mp4a.40.29" : r <= 24e3 ? "mp4a.40.5" : "mp4a.40.2";
        if (t === "mp3") return "mp3";
        if (t === "opus") return "opus";
        if (t === "vorbis") return "vorbis";
        if (t === "flac") return "flac";
        if (t === "ac3") return "ac-3";
        if (t === "eac3") return "ec-3";
        if (be.includes(t)) return t;
        throw new TypeError(`Unhandled codec '${t}'.`);
    }, Mi = (t)=>{
        const { codec: e, codecDescription: r, aacCodecInfo: n } = t;
        if (e === "aac") {
            if (!n) throw new TypeError("AAC codec info must be provided.");
            if (n.isMpeg2) return "mp4a.67";
            {
                let i;
                return n.objectType !== null ? i = n.objectType : i = Bi(r).objectType, `mp4a.40.${i}`;
            }
        } else {
            if (e === "mp3") return "mp3";
            if (e === "opus") return "opus";
            if (e === "vorbis") return "vorbis";
            if (e === "flac") return "flac";
            if (e === "ac3") return "ac-3";
            if (e === "eac3") return "ec-3";
            if (e && be.includes(e)) return e;
        }
        throw new TypeError(`Unhandled codec '${e}'.`);
    }, Ur = 48e3, Ca = /^pcm-([usf])(\d+)(be)?$/, $e = (t)=>{
        if (p(be.includes(t)), t === "ulaw") return {
            dataType: "ulaw",
            sampleSize: 1,
            littleEndian: !0,
            silentValue: 255
        };
        if (t === "alaw") return {
            dataType: "alaw",
            sampleSize: 1,
            littleEndian: !0,
            silentValue: 213
        };
        const e = Ca.exec(t);
        p(e);
        let r;
        e[1] === "u" ? r = "unsigned" : e[1] === "s" ? r = "signed" : r = "float";
        const n = Number(e[2]) / 8, i = e[3] !== "be", s = t === "pcm-u8" ? 2 ** 7 : 0;
        return {
            dataType: r,
            sampleSize: n,
            littleEndian: i,
            silentValue: s
        };
    }, Dt = (t)=>t.startsWith("avc1") || t.startsWith("avc3") ? "avc" : t.startsWith("hev1") || t.startsWith("hvc1") ? "hevc" : t === "vp8" ? "vp8" : t.startsWith("vp09") ? "vp9" : t.startsWith("av01") ? "av1" : t === "mp3" || t === "mp4a.69" || t === "mp4a.6B" || t === "mp4a.6b" || t === "mp4a.40.34" ? "mp3" : t.startsWith("mp4a.40.") || t === "mp4a.67" ? "aac" : t === "opus" ? "opus" : t === "vorbis" ? "vorbis" : t === "flac" ? "flac" : t === "ac-3" || t === "ac3" ? "ac3" : t === "ec-3" || t === "eac3" ? "eac3" : t === "ulaw" ? "ulaw" : t === "alaw" ? "alaw" : Ca.test(t) ? t : t === "webvtt" ? "webvtt" : null, pc = (t)=>t === "avc" ? {
            avc: {
                format: "avc"
            }
        } : t === "hevc" ? {
            hevc: {
                format: "hevc"
            }
        } : {}, gc = (t)=>t === "aac" ? {
            aac: {
                format: "aac"
            }
        } : t === "opus" ? {
            opus: {
                format: "opus"
            }
        } : {}, _c = [
        "avc1",
        "avc3",
        "hev1",
        "hvc1",
        "vp8",
        "vp09",
        "av01"
    ], bc = /^(avc1|avc3)\.[0-9a-fA-F]{6}$/, wc = /^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/, yc = /^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/, kc = /^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/, Ia = (t)=>{
        if (!t) throw new TypeError("Video chunk metadata must be provided.");
        if (typeof t != "object") throw new TypeError("Video chunk metadata must be an object.");
        if (!t.decoderConfig) throw new TypeError("Video chunk metadata must include a decoder configuration.");
        if (typeof t.decoderConfig != "object") throw new TypeError("Video chunk metadata decoder configuration must be an object.");
        if (typeof t.decoderConfig.codec != "string") throw new TypeError("Video chunk metadata decoder configuration must specify a codec string.");
        if (!_c.some((e)=>t.decoderConfig.codec.startsWith(e))) throw new TypeError("Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.");
        if (!Number.isInteger(t.decoderConfig.codedWidth) || t.decoderConfig.codedWidth <= 0) throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).");
        if (!Number.isInteger(t.decoderConfig.codedHeight) || t.decoderConfig.codedHeight <= 0) throw new TypeError("Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).");
        if (t.decoderConfig.displayAspectWidth !== void 0 && (!Number.isInteger(t.decoderConfig.displayAspectWidth) || t.decoderConfig.displayAspectWidth <= 0)) throw new TypeError("Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.");
        if (t.decoderConfig.displayAspectHeight !== void 0 && (!Number.isInteger(t.decoderConfig.displayAspectHeight) || t.decoderConfig.displayAspectHeight <= 0)) throw new TypeError("Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.");
        if (t.decoderConfig.displayAspectWidth !== void 0 != (t.decoderConfig.displayAspectHeight !== void 0)) throw new TypeError("Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.");
        if (t.decoderConfig.description !== void 0 && !_n(t.decoderConfig.description)) throw new TypeError("Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");
        if (t.decoderConfig.colorSpace !== void 0) {
            const { colorSpace: e } = t.decoderConfig;
            if (typeof e != "object") throw new TypeError("Video chunk metadata decoder configuration colorSpace, when provided, must be an object.");
            const r = Object.keys(Ut);
            if (e.primaries != null && !r.includes(e.primaries)) throw new TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${r.join(", ")}.`);
            const n = Object.keys(Lt);
            if (e.transfer != null && !n.includes(e.transfer)) throw new TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${n.join(", ")}.`);
            const i = Object.keys(Wt);
            if (e.matrix != null && !i.includes(e.matrix)) throw new TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(", ")}.`);
            if (e.fullRange != null && typeof e.fullRange != "boolean") throw new TypeError("Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.");
        }
        if (t.decoderConfig.codec.startsWith("avc1") || t.decoderConfig.codec.startsWith("avc3")) {
            if (!bc.test(t.decoderConfig.codec)) throw new TypeError("Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.");
        } else if (t.decoderConfig.codec.startsWith("hev1") || t.decoderConfig.codec.startsWith("hvc1")) {
            if (!wc.test(t.decoderConfig.codec)) throw new TypeError("Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.");
        } else if (t.decoderConfig.codec.startsWith("vp8")) {
            if (t.decoderConfig.codec !== "vp8") throw new TypeError('Video chunk metadata decoder configuration codec string for VP8 must be "vp8".');
        } else if (t.decoderConfig.codec.startsWith("vp09")) {
            if (!yc.test(t.decoderConfig.codec)) throw new TypeError('Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.');
        } else if (t.decoderConfig.codec.startsWith("av01") && !kc.test(t.decoderConfig.codec)) throw new TypeError('Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.');
    }, Tc = [
        "mp4a",
        "mp3",
        "opus",
        "vorbis",
        "flac",
        "ulaw",
        "alaw",
        "pcm",
        "ac-3",
        "ec-3"
    ], va = (t)=>{
        if (!t) throw new TypeError("Audio chunk metadata must be provided.");
        if (typeof t != "object") throw new TypeError("Audio chunk metadata must be an object.");
        if (!t.decoderConfig) throw new TypeError("Audio chunk metadata must include a decoder configuration.");
        if (typeof t.decoderConfig != "object") throw new TypeError("Audio chunk metadata decoder configuration must be an object.");
        if (typeof t.decoderConfig.codec != "string") throw new TypeError("Audio chunk metadata decoder configuration must specify a codec string.");
        if (!Tc.some((e)=>t.decoderConfig.codec.startsWith(e))) throw new TypeError("Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.");
        if (!Number.isInteger(t.decoderConfig.sampleRate) || t.decoderConfig.sampleRate <= 0) throw new TypeError("Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).");
        if (!Number.isInteger(t.decoderConfig.numberOfChannels) || t.decoderConfig.numberOfChannels <= 0) throw new TypeError("Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).");
        if (t.decoderConfig.description !== void 0 && !_n(t.decoderConfig.description)) throw new TypeError("Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.");
        if (t.decoderConfig.codec.startsWith("mp4a") && t.decoderConfig.codec !== "mp4a.69" && t.decoderConfig.codec !== "mp4a.6B" && t.decoderConfig.codec !== "mp4a.6b") {
            if (![
                "mp4a.40.2",
                "mp4a.40.02",
                "mp4a.40.5",
                "mp4a.40.05",
                "mp4a.40.29",
                "mp4a.67"
            ].includes(t.decoderConfig.codec)) throw new TypeError("Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.");
        } else if (t.decoderConfig.codec.startsWith("mp3") || t.decoderConfig.codec.startsWith("mp4a")) {
            if (t.decoderConfig.codec !== "mp3" && t.decoderConfig.codec !== "mp4a.69" && t.decoderConfig.codec !== "mp4a.6B" && t.decoderConfig.codec !== "mp4a.6b") throw new TypeError('Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".');
        } else if (t.decoderConfig.codec.startsWith("opus")) {
            if (t.decoderConfig.codec !== "opus") throw new TypeError('Audio chunk metadata decoder configuration codec string for Opus must be "opus".');
            if (t.decoderConfig.description && t.decoderConfig.description.byteLength < 18) throw new TypeError("Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.");
        } else if (t.decoderConfig.codec.startsWith("vorbis")) {
            if (t.decoderConfig.codec !== "vorbis") throw new TypeError('Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".');
            if (!t.decoderConfig.description) throw new TypeError("Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.");
        } else if (t.decoderConfig.codec.startsWith("flac")) {
            if (t.decoderConfig.codec !== "flac") throw new TypeError('Audio chunk metadata decoder configuration codec string for FLAC must be "flac".');
            if (!t.decoderConfig.description || t.decoderConfig.description.byteLength < 42) throw new TypeError("Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.");
        } else if (t.decoderConfig.codec.startsWith("ac-3") || t.decoderConfig.codec.startsWith("ac3")) {
            if (t.decoderConfig.codec !== "ac-3") throw new TypeError('Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".');
        } else if (t.decoderConfig.codec.startsWith("ec-3") || t.decoderConfig.codec.startsWith("eac3")) {
            if (t.decoderConfig.codec !== "ec-3") throw new TypeError('Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".');
        } else if ((t.decoderConfig.codec.startsWith("pcm") || t.decoderConfig.codec.startsWith("ulaw") || t.decoderConfig.codec.startsWith("alaw")) && !be.includes(t.decoderConfig.codec)) throw new TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${be.join(", ")}).`);
    }, Ea = (t)=>{
        if (!t) throw new TypeError("Subtitle metadata must be provided.");
        if (typeof t != "object") throw new TypeError("Subtitle metadata must be an object.");
        if (!t.config) throw new TypeError("Subtitle metadata must include a config object.");
        if (typeof t.config != "object") throw new TypeError("Subtitle metadata config must be an object.");
        if (typeof t.config.description != "string") throw new TypeError("Subtitle metadata config description must be a string.");
    };
    const Ot = 4, Sc = [
        44100,
        48e3,
        32e3
    ], xc = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        32,
        40,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        160,
        192,
        224,
        256,
        320,
        -1,
        -1,
        32,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        160,
        192,
        224,
        256,
        320,
        384,
        -1,
        -1,
        32,
        64,
        96,
        128,
        160,
        192,
        224,
        256,
        288,
        320,
        352,
        384,
        416,
        448,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        8,
        16,
        24,
        32,
        40,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        144,
        160,
        -1,
        -1,
        8,
        16,
        24,
        32,
        40,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        144,
        160,
        -1,
        -1,
        32,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        144,
        160,
        176,
        192,
        224,
        256,
        -1
    ], Aa = 1483304551, Ba = 1231971951, Pc = (t, e, r, n, i)=>e === 0 ? 0 : e === 1 ? Math.floor(144 * r / (n << t)) + i : e === 2 ? Math.floor(144 * r / n) + i : (Math.floor(12 * r / n) + i) * 4, Cc = (t, e, r, n)=>e === 0 ? 0 : e === 1 ? 144 * r / (n << t) : e === 2 ? 144 * r / n : 12 * r / n * 4, Fa = (t, e)=>t === 3 ? e === 3 ? 21 : 36 : e === 3 ? 13 : 21, Di = (t, e)=>{
        const r = t >>> 24, n = t >>> 16 & 255, i = t >>> 8 & 255, s = t & 255;
        if (r !== 255 && n !== 255 && i !== 255 && s !== 255) return {
            header: null,
            bytesAdvanced: 4
        };
        if (r !== 255) return {
            header: null,
            bytesAdvanced: 1
        };
        if ((n & 224) !== 224) return {
            header: null,
            bytesAdvanced: 1
        };
        let a = 0, o = 0;
        n & 16 ? a = n & 8 ? 0 : 1 : (a = 1, o = 1);
        const c = n >> 3 & 3, u = n >> 1 & 3, l = i >> 4 & 15, d = (i >> 2 & 3) % 3, f = i >> 1 & 1, h = s >> 6 & 3, g = s >> 4 & 3, m = s >> 3 & 1, b = s >> 2 & 1, _ = s & 3, w = xc[a * 16 * 4 + u * 16 + l];
        if (w === -1) return {
            header: null,
            bytesAdvanced: 1
        };
        const y = w * 1e3, T = Sc[d] >> a + o, S = Pc(a, u, y, T, f);
        if (e !== null && e < S) return {
            header: null,
            bytesAdvanced: 1
        };
        let C;
        return c === 3 ? C = u === 3 ? 384 : 1152 : u === 3 ? C = 384 : u === 2 ? C = 1152 : C = 576, {
            header: {
                totalSize: S,
                mpegVersionId: c,
                lowSamplingFrequency: a,
                layer: u,
                bitrate: y,
                frequencyIndex: d,
                sampleRate: T,
                channel: h,
                modeExtension: g,
                copyright: m,
                original: b,
                emphasis: _,
                audioSamplesInFrame: C
            },
            bytesAdvanced: 1
        };
    }, ai = (t)=>{
        let e = 2130706432, r = 0;
        for(; e !== 0;)r >>= 1, r |= t & e, e >>= 8;
        return r;
    };
    var ln;
    (function(t) {
        t[t.FrameCount = 1] = "FrameCount", t[t.FileSize = 2] = "FileSize", t[t.Toc = 4] = "Toc";
    })(ln || (ln = {}));
    const kn = [
        48e3,
        44100,
        32e3
    ], Ra = [
        24e3,
        22050,
        16e3
    ];
    var qe;
    (function(t) {
        t[t.NON_IDR_SLICE = 1] = "NON_IDR_SLICE", t[t.SLICE_DPA = 2] = "SLICE_DPA", t[t.SLICE_DPB = 3] = "SLICE_DPB", t[t.SLICE_DPC = 4] = "SLICE_DPC", t[t.IDR = 5] = "IDR", t[t.SEI = 6] = "SEI", t[t.SPS = 7] = "SPS", t[t.PPS = 8] = "PPS", t[t.AUD = 9] = "AUD", t[t.SPS_EXT = 13] = "SPS_EXT";
    })(qe || (qe = {}));
    var _e;
    (function(t) {
        t[t.RASL_N = 8] = "RASL_N", t[t.RASL_R = 9] = "RASL_R", t[t.BLA_W_LP = 16] = "BLA_W_LP", t[t.RSV_IRAP_VCL23 = 23] = "RSV_IRAP_VCL23", t[t.VPS_NUT = 32] = "VPS_NUT", t[t.SPS_NUT = 33] = "SPS_NUT", t[t.PPS_NUT = 34] = "PPS_NUT", t[t.AUD_NUT = 35] = "AUD_NUT", t[t.PREFIX_SEI_NUT = 39] = "PREFIX_SEI_NUT", t[t.SUFFIX_SEI_NUT = 40] = "SUFFIX_SEI_NUT";
    })(_e || (_e = {}));
    const Lr = function*(t) {
        let e = 0, r = -1;
        for(; e < t.length - 2;){
            const n = t.indexOf(0, e);
            if (n === -1 || n >= t.length - 2) break;
            e = n;
            let i = 0;
            if (e + 3 < t.length && t[e + 1] === 0 && t[e + 2] === 0 && t[e + 3] === 1 ? i = 4 : t[e + 1] === 0 && t[e + 2] === 1 && (i = 3), i === 0) {
                e++;
                continue;
            }
            r !== -1 && e > r && (yield {
                offset: r,
                length: e - r
            }), r = e + i, e = r;
        }
        r !== -1 && r < t.length && (yield {
            offset: r,
            length: t.length - r
        });
    }, Ma = function*(t, e) {
        let r = 0;
        const n = new DataView(t.buffer, t.byteOffset, t.byteLength);
        for(; r + e <= t.length;){
            let i;
            e === 1 ? i = n.getUint8(r) : e === 2 ? i = n.getUint16(r, !1) : e === 3 ? i = bn(n, r, !1) : (p(e === 4), i = n.getUint32(r, !1)), r += e, yield {
                offset: r,
                length: i
            }, r += i;
        }
    }, Da = (t, e)=>{
        if (e.description) {
            const i = (he(e.description)[4] & 3) + 1;
            return Ma(t, i);
        } else return Lr(t);
    }, Tn = (t)=>t & 31, Sn = (t)=>{
        const e = [], r = t.length;
        for(let n = 0; n < r; n++)n + 2 < r && t[n] === 0 && t[n + 1] === 0 && t[n + 2] === 3 ? (e.push(0, 0), n += 2) : e.push(t[n]);
        return new Uint8Array(e);
    }, zn = new Uint8Array([
        0,
        0,
        0,
        1
    ]), Oa = (t)=>{
        const e = t.reduce((i, s)=>i + zn.byteLength + s.byteLength, 0), r = new Uint8Array(e);
        let n = 0;
        for (const i of t)r.set(zn, n), n += zn.byteLength, r.set(i, n), n += i.byteLength;
        return r;
    }, Oi = (t, e)=>{
        const r = t.reduce((s, a)=>s + e + a.byteLength, 0), n = new Uint8Array(r);
        let i = 0;
        for (const s of t){
            const a = new DataView(n.buffer, n.byteOffset, n.byteLength);
            switch(e){
                case 1:
                    a.setUint8(i, s.byteLength);
                    break;
                case 2:
                    a.setUint16(i, s.byteLength, !1);
                    break;
                case 3:
                    xi(a, i, s.byteLength, !1);
                    break;
                case 4:
                    a.setUint32(i, s.byteLength, !1);
                    break;
            }
            i += e, n.set(s, i), i += s.byteLength;
        }
        return n;
    }, Ic = (t, e)=>{
        if (e.description) {
            const i = (he(e.description)[4] & 3) + 1;
            return Oi(t, i);
        } else return Oa(t);
    }, zi = (t)=>{
        try {
            const e = [], r = [], n = [];
            for (const o of Lr(t)){
                const c = t.subarray(o.offset, o.offset + o.length), u = Tn(c[0]);
                u === qe.SPS ? e.push(c) : u === qe.PPS ? r.push(c) : u === qe.SPS_EXT && n.push(c);
            }
            if (e.length === 0 || r.length === 0) return null;
            const i = e[0], s = Ni(i);
            p(s !== null);
            const a = s.profileIdc === 100 || s.profileIdc === 110 || s.profileIdc === 122 || s.profileIdc === 144;
            return {
                configurationVersion: 1,
                avcProfileIndication: s.profileIdc,
                profileCompatibility: s.constraintFlags,
                avcLevelIndication: s.levelIdc,
                lengthSizeMinusOne: 3,
                sequenceParameterSets: e,
                pictureParameterSets: r,
                chromaFormat: a ? s.chromaFormatIdc : null,
                bitDepthLumaMinus8: a ? s.bitDepthLumaMinus8 : null,
                bitDepthChromaMinus8: a ? s.bitDepthChromaMinus8 : null,
                sequenceParameterSetExt: a ? n : null
            };
        } catch (e) {
            return console.error("Error building AVC Decoder Configuration Record:", e), null;
        }
    }, vc = (t)=>{
        const e = [];
        e.push(t.configurationVersion), e.push(t.avcProfileIndication), e.push(t.profileCompatibility), e.push(t.avcLevelIndication), e.push(252 | t.lengthSizeMinusOne & 3), e.push(224 | t.sequenceParameterSets.length & 31);
        for (const r of t.sequenceParameterSets){
            const n = r.byteLength;
            e.push(n >> 8), e.push(n & 255);
            for(let i = 0; i < n; i++)e.push(r[i]);
        }
        e.push(t.pictureParameterSets.length);
        for (const r of t.pictureParameterSets){
            const n = r.byteLength;
            e.push(n >> 8), e.push(n & 255);
            for(let i = 0; i < n; i++)e.push(r[i]);
        }
        if (t.avcProfileIndication === 100 || t.avcProfileIndication === 110 || t.avcProfileIndication === 122 || t.avcProfileIndication === 144) {
            p(t.chromaFormat !== null), p(t.bitDepthLumaMinus8 !== null), p(t.bitDepthChromaMinus8 !== null), p(t.sequenceParameterSetExt !== null), e.push(252 | t.chromaFormat & 3), e.push(248 | t.bitDepthLumaMinus8 & 7), e.push(248 | t.bitDepthChromaMinus8 & 7), e.push(t.sequenceParameterSetExt.length);
            for (const r of t.sequenceParameterSetExt){
                const n = r.byteLength;
                e.push(n >> 8), e.push(n & 255);
                for(let i = 0; i < n; i++)e.push(r[i]);
            }
        }
        return new Uint8Array(e);
    }, Ec = (t)=>{
        try {
            const e = Z(t);
            let r = 0;
            const n = e.getUint8(r++), i = e.getUint8(r++), s = e.getUint8(r++), a = e.getUint8(r++), o = e.getUint8(r++) & 3, c = e.getUint8(r++) & 31, u = [];
            for(let h = 0; h < c; h++){
                const g = e.getUint16(r, !1);
                r += 2, u.push(t.subarray(r, r + g)), r += g;
            }
            const l = e.getUint8(r++), d = [];
            for(let h = 0; h < l; h++){
                const g = e.getUint16(r, !1);
                r += 2, d.push(t.subarray(r, r + g)), r += g;
            }
            const f = {
                configurationVersion: n,
                avcProfileIndication: i,
                profileCompatibility: s,
                avcLevelIndication: a,
                lengthSizeMinusOne: o,
                sequenceParameterSets: u,
                pictureParameterSets: d,
                chromaFormat: null,
                bitDepthLumaMinus8: null,
                bitDepthChromaMinus8: null,
                sequenceParameterSetExt: null
            };
            if ((i === 100 || i === 110 || i === 122 || i === 144) && r + 4 <= t.length) {
                const h = e.getUint8(r++) & 3, g = e.getUint8(r++) & 7, m = e.getUint8(r++) & 7, b = e.getUint8(r++);
                f.chromaFormat = h, f.bitDepthLumaMinus8 = g, f.bitDepthChromaMinus8 = m;
                const _ = [];
                for(let w = 0; w < b; w++){
                    const y = e.getUint16(r, !1);
                    r += 2, _.push(t.subarray(r, r + y)), r += y;
                }
                f.sequenceParameterSetExt = _;
            }
            return f;
        } catch (e) {
            return console.error("Error deserializing AVC Decoder Configuration Record:", e), null;
        }
    }, za = {
        1: {
            num: 1,
            den: 1
        },
        2: {
            num: 12,
            den: 11
        },
        3: {
            num: 10,
            den: 11
        },
        4: {
            num: 16,
            den: 11
        },
        5: {
            num: 40,
            den: 33
        },
        6: {
            num: 24,
            den: 11
        },
        7: {
            num: 20,
            den: 11
        },
        8: {
            num: 32,
            den: 11
        },
        9: {
            num: 80,
            den: 33
        },
        10: {
            num: 18,
            den: 11
        },
        11: {
            num: 15,
            den: 11
        },
        12: {
            num: 64,
            den: 33
        },
        13: {
            num: 160,
            den: 99
        },
        14: {
            num: 4,
            den: 3
        },
        15: {
            num: 3,
            den: 2
        },
        16: {
            num: 2,
            den: 1
        }
    }, Ni = (t)=>{
        try {
            const e = new Y(Sn(t));
            if (e.skipBits(1), e.skipBits(2), e.readBits(5) !== 7) return null;
            const n = e.readAlignedByte(), i = e.readAlignedByte(), s = e.readAlignedByte();
            F(e);
            let a = 1, o = 0, c = 0, u = 0;
            if ((n === 100 || n === 110 || n === 122 || n === 244 || n === 44 || n === 83 || n === 86 || n === 118 || n === 128) && (a = F(e), a === 3 && (u = e.readBits(1)), o = F(e), c = F(e), e.skipBits(1), e.readBits(1))) {
                for(let B = 0; B < (a !== 3 ? 8 : 12); B++)if (e.readBits(1)) {
                    const q = B < 6 ? 16 : 64;
                    let V = 8, W = 8;
                    for(let oe = 0; oe < q; oe++){
                        if (W !== 0) {
                            const pe = at(e);
                            W = (V + pe + 256) % 256;
                        }
                        V = W === 0 ? V : W;
                    }
                }
            }
            F(e);
            const l = F(e);
            if (l === 0) F(e);
            else if (l === 1) {
                e.skipBits(1), at(e), at(e);
                const R = F(e);
                for(let B = 0; B < R; B++)at(e);
            }
            F(e), e.skipBits(1);
            const d = F(e), f = F(e), h = 16 * (d + 1), g = 16 * (f + 1);
            let m = h, b = g;
            const _ = e.readBits(1);
            if (_ || e.skipBits(1), e.skipBits(1), e.readBits(1)) {
                const R = F(e), B = F(e), L = F(e), q = F(e);
                let V, W;
                if ((u === 0 ? a : 0) === 0) V = 1, W = 2 - _;
                else {
                    const pe = a === 3 ? 1 : 2, Ue = a === 1 ? 2 : 1;
                    V = pe, W = Ue * (2 - _);
                }
                m -= V * (R + B), b -= W * (L + q);
            }
            let y = 2, T = 2, S = 2, C = 0, I = {
                num: 1,
                den: 1
            }, P = null, x = null;
            if (e.readBits(1)) {
                if (e.readBits(1)) {
                    const Ue = e.readBits(8);
                    if (Ue === 255) I = {
                        num: e.readBits(16),
                        den: e.readBits(16)
                    };
                    else {
                        const us = za[Ue];
                        us && (I = us);
                    }
                }
                e.readBits(1) && e.skipBits(1), e.readBits(1) && (e.skipBits(3), C = e.readBits(1), e.readBits(1) && (y = e.readBits(8), T = e.readBits(8), S = e.readBits(8))), e.readBits(1) && (F(e), F(e)), e.readBits(1) && (e.skipBits(32), e.skipBits(32), e.skipBits(1));
                const W = e.readBits(1);
                W && ys(e);
                const oe = e.readBits(1);
                oe && ys(e), (W || oe) && e.skipBits(1), e.skipBits(1), e.readBits(1) && (e.skipBits(1), F(e), F(e), F(e), F(e), P = F(e), x = F(e));
            }
            if (P === null) {
                p(x === null);
                const R = i & 16;
                if ((n === 44 || n === 86 || n === 100 || n === 110 || n === 122 || n === 244) && R) P = 0, x = 0;
                else {
                    const B = d + 1, L = f + 1, q = (2 - _) * L, V = un.find((oe)=>oe.level >= s) ?? ie(un), W = Math.min(Math.floor(V.maxDpbMbs / (B * q)), 16);
                    P = W, x = W;
                }
            }
            return p(x !== null), {
                profileIdc: n,
                constraintFlags: i,
                levelIdc: s,
                frameMbsOnlyFlag: _,
                chromaFormatIdc: a,
                bitDepthLumaMinus8: o,
                bitDepthChromaMinus8: c,
                codedWidth: h,
                codedHeight: g,
                displayWidth: m,
                displayHeight: b,
                pixelAspectRatio: I,
                colourPrimaries: y,
                matrixCoefficients: S,
                transferCharacteristics: T,
                fullRangeFlag: C,
                numReorderFrames: P,
                maxDecFrameBuffering: x
            };
        } catch (e) {
            return console.error("Error parsing AVC SPS:", e), null;
        }
    }, ys = (t)=>{
        const e = F(t);
        t.skipBits(4), t.skipBits(4);
        for(let r = 0; r <= e; r++)F(t), F(t), t.skipBits(1);
        t.skipBits(5), t.skipBits(5), t.skipBits(5), t.skipBits(5);
    }, Ac = (t, e)=>{
        if (e.description) {
            const i = (he(e.description)[21] & 3) + 1;
            return Oi(t, i);
        } else return Oa(t);
    }, dn = (t, e)=>{
        if (e.description) {
            const i = (he(e.description)[21] & 3) + 1;
            return Ma(t, i);
        } else return Lr(t);
    }, ur = (t)=>t >> 1 & 63, Na = (t)=>{
        try {
            const e = new Y(Sn(t));
            e.skipBits(16), e.readBits(4);
            const r = e.readBits(3), n = e.readBits(1), { general_profile_space: i, general_tier_flag: s, general_profile_idc: a, general_profile_compatibility_flags: o, general_constraint_indicator_flags: c, general_level_idc: u } = Bc(e, r);
            F(e);
            const l = F(e);
            let d = 0;
            l === 3 && (d = e.readBits(1));
            const f = F(e), h = F(e);
            let g = f, m = h;
            if (e.readBits(1)) {
                const B = F(e), L = F(e), q = F(e), V = F(e);
                let W = 1, oe = 1;
                const pe = d === 0 ? l : 0;
                pe === 1 ? (W = 2, oe = 2) : pe === 2 && (W = 2, oe = 1), g -= (B + L) * W, m -= (q + V) * oe;
            }
            const b = F(e), _ = F(e);
            F(e);
            const y = e.readBits(1) ? 0 : r;
            let T = 0;
            for(let B = y; B <= r; B++)F(e), T = F(e), F(e);
            F(e), F(e), F(e), F(e), F(e), F(e), e.readBits(1) && e.readBits(1) && Fc(e), e.skipBits(1), e.skipBits(1), e.readBits(1) && (e.skipBits(4), e.skipBits(4), F(e), F(e), e.skipBits(1));
            const S = F(e);
            if (Rc(e, S), e.readBits(1)) {
                const B = F(e);
                for(let L = 0; L < B; L++)F(e), e.skipBits(1);
            }
            e.skipBits(1), e.skipBits(1);
            let C = 2, I = 2, P = 2, x = 0, v = 0, R = {
                num: 1,
                den: 1
            };
            if (e.readBits(1)) {
                const B = Dc(e, r);
                R = B.pixelAspectRatio, C = B.colourPrimaries, I = B.transferCharacteristics, P = B.matrixCoefficients, x = B.fullRangeFlag, v = B.minSpatialSegmentationIdc;
            }
            return {
                displayWidth: g,
                displayHeight: m,
                pixelAspectRatio: R,
                colourPrimaries: C,
                transferCharacteristics: I,
                matrixCoefficients: P,
                fullRangeFlag: x,
                maxDecFrameBuffering: T + 1,
                spsMaxSubLayersMinus1: r,
                spsTemporalIdNestingFlag: n,
                generalProfileSpace: i,
                generalTierFlag: s,
                generalProfileIdc: a,
                generalProfileCompatibilityFlags: o,
                generalConstraintIndicatorFlags: c,
                generalLevelIdc: u,
                chromaFormatIdc: l,
                bitDepthLumaMinus8: b,
                bitDepthChromaMinus8: _,
                minSpatialSegmentationIdc: v
            };
        } catch (e) {
            return console.error("Error parsing HEVC SPS:", e), null;
        }
    }, Ui = (t)=>{
        try {
            const e = [], r = [], n = [], i = [];
            for (const u of Lr(t)){
                const l = t.subarray(u.offset, u.offset + u.length), d = ur(l[0]);
                d === _e.VPS_NUT ? e.push(l) : d === _e.SPS_NUT ? r.push(l) : d === _e.PPS_NUT ? n.push(l) : (d === _e.PREFIX_SEI_NUT || d === _e.SUFFIX_SEI_NUT) && i.push(l);
            }
            if (r.length === 0 || n.length === 0) return null;
            const s = Na(r[0]);
            if (!s) return null;
            let a = 0;
            if (n.length > 0) {
                const u = n[0], l = new Y(Sn(u));
                l.skipBits(16), F(l), F(l), l.skipBits(1), l.skipBits(1), l.skipBits(3), l.skipBits(1), l.skipBits(1), F(l), F(l), at(l), l.skipBits(1), l.skipBits(1), l.readBits(1) && F(l), at(l), at(l), l.skipBits(1), l.skipBits(1), l.skipBits(1), l.skipBits(1);
                const d = l.readBits(1), f = l.readBits(1);
                !d && !f ? a = 0 : d && !f ? a = 2 : !d && f ? a = 3 : a = 0;
            }
            const o = [
                ...e.length ? [
                    {
                        arrayCompleteness: 1,
                        nalUnitType: _e.VPS_NUT,
                        nalUnits: e
                    }
                ] : [],
                ...r.length ? [
                    {
                        arrayCompleteness: 1,
                        nalUnitType: _e.SPS_NUT,
                        nalUnits: r
                    }
                ] : [],
                ...n.length ? [
                    {
                        arrayCompleteness: 1,
                        nalUnitType: _e.PPS_NUT,
                        nalUnits: n
                    }
                ] : [],
                ...i.length ? [
                    {
                        arrayCompleteness: 1,
                        nalUnitType: ur(i[0][0]),
                        nalUnits: i
                    }
                ] : []
            ];
            return {
                configurationVersion: 1,
                generalProfileSpace: s.generalProfileSpace,
                generalTierFlag: s.generalTierFlag,
                generalProfileIdc: s.generalProfileIdc,
                generalProfileCompatibilityFlags: s.generalProfileCompatibilityFlags,
                generalConstraintIndicatorFlags: s.generalConstraintIndicatorFlags,
                generalLevelIdc: s.generalLevelIdc,
                minSpatialSegmentationIdc: s.minSpatialSegmentationIdc,
                parallelismType: a,
                chromaFormatIdc: s.chromaFormatIdc,
                bitDepthLumaMinus8: s.bitDepthLumaMinus8,
                bitDepthChromaMinus8: s.bitDepthChromaMinus8,
                avgFrameRate: 0,
                constantFrameRate: 0,
                numTemporalLayers: s.spsMaxSubLayersMinus1 + 1,
                temporalIdNested: s.spsTemporalIdNestingFlag,
                lengthSizeMinusOne: 3,
                arrays: o
            };
        } catch (e) {
            return console.error("Error building HEVC Decoder Configuration Record:", e), null;
        }
    }, Bc = (t, e)=>{
        const r = t.readBits(2), n = t.readBits(1), i = t.readBits(5);
        let s = 0;
        for(let l = 0; l < 32; l++)s = s << 1 | t.readBits(1);
        const a = new Uint8Array(6);
        for(let l = 0; l < 6; l++)a[l] = t.readBits(8);
        const o = t.readBits(8), c = [], u = [];
        for(let l = 0; l < e; l++)c.push(t.readBits(1)), u.push(t.readBits(1));
        if (e > 0) for(let l = e; l < 8; l++)t.skipBits(2);
        for(let l = 0; l < e; l++)c[l] && t.skipBits(88), u[l] && t.skipBits(8);
        return {
            general_profile_space: r,
            general_tier_flag: n,
            general_profile_idc: i,
            general_profile_compatibility_flags: s,
            general_constraint_indicator_flags: a,
            general_level_idc: o
        };
    }, Fc = (t)=>{
        for(let e = 0; e < 4; e++)for(let r = 0; r < (e === 3 ? 2 : 6); r++)if (!t.readBits(1)) F(t);
        else {
            const i = Math.min(64, 1 << 4 + (e << 1));
            e > 1 && at(t);
            for(let s = 0; s < i; s++)at(t);
        }
    }, Rc = (t, e)=>{
        const r = [];
        for(let n = 0; n < e; n++)r[n] = Mc(t, n, e, r);
    }, Mc = (t, e, r, n)=>{
        let i = 0, s = 0, a = 0;
        if (e !== 0 && (s = t.readBits(1)), s) {
            if (e === r) {
                const c = F(t);
                a = e - (c + 1);
            } else a = e - 1;
            t.readBits(1), F(t);
            const o = n[a] ?? 0;
            for(let c = 0; c <= o; c++)t.readBits(1) || t.readBits(1);
            i = n[a];
        } else {
            const o = F(t), c = F(t);
            for(let u = 0; u < o; u++)F(t), t.readBits(1);
            for(let u = 0; u < c; u++)F(t), t.readBits(1);
            i = o + c;
        }
        return i;
    }, Dc = (t, e)=>{
        let r = 2, n = 2, i = 2, s = 0, a = 0, o = {
            num: 1,
            den: 1
        };
        if (t.readBits(1)) {
            const c = t.readBits(8);
            if (c === 255) o = {
                num: t.readBits(16),
                den: t.readBits(16)
            };
            else {
                const u = za[c];
                u && (o = u);
            }
        }
        return t.readBits(1) && t.readBits(1), t.readBits(1) && (t.readBits(3), s = t.readBits(1), t.readBits(1) && (r = t.readBits(8), n = t.readBits(8), i = t.readBits(8))), t.readBits(1) && (F(t), F(t)), t.readBits(1), t.readBits(1), t.readBits(1), t.readBits(1) && (F(t), F(t), F(t), F(t)), t.readBits(1) && (t.readBits(32), t.readBits(32), t.readBits(1) && F(t), t.readBits(1) && Oc(t, !0, e)), t.readBits(1) && (t.readBits(1), t.readBits(1), t.readBits(1), a = F(t), F(t), F(t), F(t), F(t)), {
            pixelAspectRatio: o,
            colourPrimaries: r,
            transferCharacteristics: n,
            matrixCoefficients: i,
            fullRangeFlag: s,
            minSpatialSegmentationIdc: a
        };
    }, Oc = (t, e, r)=>{
        let n = !1, i = !1, s = !1;
        n = t.readBits(1) === 1, i = t.readBits(1) === 1, (n || i) && (s = t.readBits(1) === 1, s && (t.readBits(8), t.readBits(5), t.readBits(1), t.readBits(5)), t.readBits(4), t.readBits(4), s && t.readBits(4), t.readBits(5), t.readBits(5), t.readBits(5));
        for(let a = 0; a <= r; a++){
            const o = t.readBits(1) === 1;
            let c = !0;
            o || (c = t.readBits(1) === 1);
            let u = !1;
            c ? F(t) : u = t.readBits(1) === 1;
            let l = 1;
            u || (l = F(t) + 1), n && ks(t, l, s), i && ks(t, l, s);
        }
    }, ks = (t, e, r)=>{
        for(let n = 0; n < e; n++)F(t), F(t), r && (F(t), F(t)), t.readBits(1);
    }, zc = (t)=>{
        const e = [];
        e.push(t.configurationVersion), e.push((t.generalProfileSpace & 3) << 6 | (t.generalTierFlag & 1) << 5 | t.generalProfileIdc & 31), e.push(t.generalProfileCompatibilityFlags >>> 24 & 255), e.push(t.generalProfileCompatibilityFlags >>> 16 & 255), e.push(t.generalProfileCompatibilityFlags >>> 8 & 255), e.push(t.generalProfileCompatibilityFlags & 255), e.push(...t.generalConstraintIndicatorFlags), e.push(t.generalLevelIdc & 255), e.push(240 | t.minSpatialSegmentationIdc >> 8 & 15), e.push(t.minSpatialSegmentationIdc & 255), e.push(252 | t.parallelismType & 3), e.push(252 | t.chromaFormatIdc & 3), e.push(248 | t.bitDepthLumaMinus8 & 7), e.push(248 | t.bitDepthChromaMinus8 & 7), e.push(t.avgFrameRate >> 8 & 255), e.push(t.avgFrameRate & 255), e.push((t.constantFrameRate & 3) << 6 | (t.numTemporalLayers & 7) << 3 | (t.temporalIdNested & 1) << 2 | t.lengthSizeMinusOne & 3), e.push(t.arrays.length & 255);
        for (const r of t.arrays){
            e.push((r.arrayCompleteness & 1) << 7 | 0 | r.nalUnitType & 63), e.push(r.nalUnits.length >> 8 & 255), e.push(r.nalUnits.length & 255);
            for (const n of r.nalUnits){
                e.push(n.length >> 8 & 255), e.push(n.length & 255);
                for(let i = 0; i < n.length; i++)e.push(n[i]);
            }
        }
        return new Uint8Array(e);
    };
    var ge;
    (function(t) {
        t[t.audAllowed = 0] = "audAllowed", t[t.beforeFirstVcl = 1] = "beforeFirstVcl", t[t.afterFirstVcl = 2] = "afterFirstVcl", t[t.eoBitstreamAllowed = 3] = "eoBitstreamAllowed", t[t.noMoreDataAllowed = 4] = "noMoreDataAllowed";
    })(ge || (ge = {}));
    const Nc = (t, e)=>{
        const r = new Set;
        let n = ge.audAllowed;
        for (const s of dn(t, e)){
            if (n === ge.noMoreDataAllowed) {
                r.add(s.offset);
                continue;
            }
            const a = ur(t[s.offset]);
            if (n === ge.eoBitstreamAllowed && a !== 37) {
                r.add(s.offset);
                continue;
            }
            let o = !1;
            a === 35 ? n > ge.audAllowed ? o = !0 : n = ge.beforeFirstVcl : a <= 31 ? n > ge.afterFirstVcl ? o = !0 : n = ge.afterFirstVcl : a === 36 ? n !== ge.afterFirstVcl ? o = !0 : n = ge.eoBitstreamAllowed : a === 37 ? n < ge.afterFirstVcl ? o = !0 : n = ge.noMoreDataAllowed : a === 32 || a === 33 || a === 34 || a === 39 || a >= 41 && a <= 44 || a >= 48 && a <= 55 ? n > ge.beforeFirstVcl ? o = !0 : n = ge.beforeFirstVcl : (a === 38 || a === 40 || a >= 45 && a <= 47 || a >= 56 && a <= 63) && n < ge.afterFirstVcl && (o = !0), o && r.add(s.offset);
        }
        if (r.size === 0) return null;
        const i = [];
        for (const s of dn(t, e))r.has(s.offset) || i.push(t.subarray(s.offset, s.offset + s.length));
        return Ac(i, e);
    }, Ua = (t)=>{
        const e = new Y(t);
        if (e.readBits(2) !== 2) return null;
        const n = e.readBits(1), s = (e.readBits(1) << 1) + n;
        if (s === 3 && e.skipBits(1), e.readBits(1) === 1 || e.readBits(1) !== 0 || (e.skipBits(2), e.readBits(24) !== 4817730)) return null;
        let u = 8;
        s >= 2 && (u = e.readBits(1) ? 12 : 10);
        const l = e.readBits(3);
        let d = 0, f = 0;
        if (l !== 7) if (f = e.readBits(1), s === 1 || s === 3) {
            const I = e.readBits(1), P = e.readBits(1);
            d = !I && !P ? 3 : I && !P ? 2 : 1, e.skipBits(1);
        } else d = 1;
        else d = 3, f = 1;
        const h = e.readBits(16), g = e.readBits(16), m = h + 1, b = g + 1, _ = m * b;
        let w = ie(wt).level;
        for (const C of wt)if (_ <= C.maxPictureSize) {
            w = C.level;
            break;
        }
        return {
            profile: s,
            level: w,
            bitDepth: u,
            chromaSubsampling: d,
            videoFullRangeFlag: f,
            colourPrimaries: l === 2 ? 1 : l === 1 ? 6 : 2,
            transferCharacteristics: l === 2 ? 1 : l === 1 ? 6 : 2,
            matrixCoefficients: l === 7 ? 0 : l === 2 ? 1 : l === 1 ? 6 : 2
        };
    }, La = function*(t) {
        const e = new Y(t), r = ()=>{
            let n = 0;
            for(let i = 0; i < 8; i++){
                const s = e.readAlignedByte();
                if (n |= (s & 127) << i * 7, !(s & 128)) break;
                if (i === 7 && s & 128) return null;
            }
            return n >= 2 ** 32 - 1 ? null : n;
        };
        for(; e.getBitsLeft() >= 8;){
            e.skipBits(1);
            const n = e.readBits(4), i = e.readBits(1), s = e.readBits(1);
            e.skipBits(1), i && e.skipBits(8);
            let a;
            if (s) {
                const o = r();
                if (o === null) return;
                a = o;
            } else a = Math.floor(e.getBitsLeft() / 8);
            p(e.pos % 8 === 0), yield {
                type: n,
                data: t.subarray(e.pos / 8, e.pos / 8 + a)
            }, e.skipBits(a * 8);
        }
    }, Wa = (t)=>{
        for (const { type: e, data: r } of La(t)){
            if (e !== 1) continue;
            const n = new Y(r), i = n.readBits(3);
            n.readBits(1);
            const s = n.readBits(1);
            let a = 0, o = 0, c = 0;
            if (s) a = n.readBits(5);
            else {
                if (n.readBits(1) && (n.skipBits(32), n.skipBits(32), n.readBits(1))) return null;
                const S = n.readBits(1);
                S && (c = n.readBits(5), n.skipBits(32), n.skipBits(5), n.skipBits(5));
                const C = n.readBits(5);
                for(let I = 0; I <= C; I++){
                    n.skipBits(12);
                    const P = n.readBits(5);
                    if (I === 0 && (a = P), P > 7) {
                        const v = n.readBits(1);
                        I === 0 && (o = v);
                    }
                    if (S && n.readBits(1)) {
                        const R = c + 1;
                        n.skipBits(R), n.skipBits(R), n.skipBits(1);
                    }
                    n.readBits(1) && n.skipBits(4);
                }
            }
            const u = n.readBits(4), l = n.readBits(4), d = u + 1;
            n.skipBits(d);
            const f = l + 1;
            n.skipBits(f);
            let h = 0;
            if (s ? h = 0 : h = n.readBits(1), h && (n.skipBits(4), n.skipBits(3)), n.skipBits(1), n.skipBits(1), n.skipBits(1), !s) {
                n.skipBits(1), n.skipBits(1), n.skipBits(1), n.skipBits(1);
                const T = n.readBits(1);
                T && (n.skipBits(1), n.skipBits(1));
                const S = n.readBits(1);
                let C = 0;
                S ? C = 2 : C = n.readBits(1), C > 0 && (n.readBits(1) || n.skipBits(1)), T && n.skipBits(3);
            }
            n.skipBits(1), n.skipBits(1), n.skipBits(1);
            const g = n.readBits(1);
            let m = 8;
            i === 2 && g ? m = n.readBits(1) ? 12 : 10 : i <= 2 && (m = g ? 10 : 8);
            let b = 0;
            i !== 1 && (b = n.readBits(1));
            let _ = 1, w = 1, y = 0;
            return b || (i === 0 ? (_ = 1, w = 1) : i === 1 ? (_ = 0, w = 0) : m === 12 && (_ = n.readBits(1), _ && (w = n.readBits(1))), _ && w && (y = n.readBits(2))), {
                profile: i,
                level: a,
                tier: o,
                bitDepth: m,
                monochrome: b,
                chromaSubsamplingX: _,
                chromaSubsamplingY: w,
                chromaSamplePosition: y
            };
        }
        return null;
    }, Li = (t)=>{
        const e = Z(t), r = e.getUint8(9), n = e.getUint16(10, !0), i = e.getUint32(12, !0), s = e.getInt16(16, !0), a = e.getUint8(18);
        let o = null;
        return a && (o = t.subarray(19, 21 + r)), {
            outputChannelCount: r,
            preSkip: n,
            inputSampleRate: i,
            outputGain: s,
            channelMappingFamily: a,
            channelMappingTable: o
        };
    }, Uc = [
        480,
        960,
        1920,
        2880,
        480,
        960,
        1920,
        2880,
        480,
        960,
        1920,
        2880,
        480,
        960,
        480,
        960,
        120,
        240,
        480,
        960,
        120,
        240,
        480,
        960,
        120,
        240,
        480,
        960,
        120,
        240,
        480,
        960
    ], Lc = (t)=>{
        const e = t[0] >> 3;
        return {
            durationInSamples: Uc[e]
        };
    }, Wc = (t)=>{
        if (t.length < 7) throw new Error("Setup header is too short.");
        if (t[0] !== 5) throw new Error("Wrong packet type in Setup header.");
        if (String.fromCharCode(...t.slice(1, 7)) !== "vorbis") throw new Error("Invalid packet signature in Setup header.");
        const r = t.length, n = new Uint8Array(r);
        for(let d = 0; d < r; d++)n[d] = t[r - 1 - d];
        const i = new Y(n);
        let s = 0;
        for(; i.getBitsLeft() > 97;)if (i.readBits(1) === 1) {
            s = i.pos;
            break;
        }
        if (s === 0) throw new Error("Invalid Setup header: framing bit not found.");
        let a = 0, o = !1, c = 0;
        for(; i.getBitsLeft() >= 97;){
            const d = i.pos, f = i.readBits(8), h = i.readBits(16), g = i.readBits(16);
            if (f > 63 || h !== 0 || g !== 0) {
                i.pos = d;
                break;
            }
            if (i.skipBits(1), a++, a > 64) break;
            i.clone().readBits(6) + 1 === a && (o = !0, c = a);
        }
        if (!o) throw new Error("Invalid Setup header: mode header not found.");
        if (c > 63) throw new Error(`Unsupported mode count: ${c}.`);
        const u = c;
        i.pos = 0, i.skipBits(s);
        const l = Array(u).fill(0);
        for(let d = u - 1; d >= 0; d--)i.skipBits(40), l[d] = i.readBits(1);
        return {
            modeBlockflags: l
        };
    }, Wi = (t, e, r)=>{
        switch(t){
            case "avc":
                {
                    for (const n of Da(r, e)){
                        const i = r[n.offset], s = Tn(i);
                        if (s >= qe.NON_IDR_SLICE && s <= qe.SLICE_DPC) return "delta";
                        if (s === qe.IDR) return "key";
                        if (s === qe.SEI && (!si() || ac() >= 144)) {
                            const a = r.subarray(n.offset, n.offset + n.length), o = Sn(a);
                            let c = 1;
                            do {
                                let u = 0;
                                for(;;){
                                    const f = o[c++];
                                    if (f === void 0 || (u += f, f < 255)) break;
                                }
                                let l = 0;
                                for(;;){
                                    const f = o[c++];
                                    if (f === void 0 || (l += f, f < 255)) break;
                                }
                                if (u === 6) {
                                    const f = new Y(o);
                                    f.pos = 8 * c;
                                    const h = F(f), g = f.readBits(1);
                                    if (h === 0 && g === 1) return "key";
                                }
                                c += l;
                            }while (c < o.length - 1);
                        }
                    }
                    return "delta";
                }
            case "hevc":
                {
                    for (const n of dn(r, e)){
                        const i = ur(r[n.offset]);
                        if (i < _e.BLA_W_LP) return "delta";
                        if (i <= _e.RSV_IRAP_VCL23) return "key";
                    }
                    return "delta";
                }
            case "vp8":
                return (r[0] & 1) === 0 ? "key" : "delta";
            case "vp9":
                {
                    const n = new Y(r);
                    if (n.readBits(2) !== 2) return null;
                    const i = n.readBits(1);
                    return (n.readBits(1) << 1) + i === 3 && n.skipBits(1), n.readBits(1) ? null : n.readBits(1) === 0 ? "key" : "delta";
                }
            case "av1":
                {
                    let n = !1;
                    for (const { type: i, data: s } of La(r))if (i === 1) {
                        const a = new Y(s);
                        a.skipBits(4), n = !!a.readBits(1);
                    } else if (i === 3 || i === 6 || i === 7) {
                        if (n) return "key";
                        const a = new Y(s);
                        return a.readBits(1) ? null : a.readBits(2) === 0 ? "key" : "delta";
                    }
                    return null;
                }
            default:
                je(t), p(!1);
        }
    };
    var sr;
    (function(t) {
        t[t.STREAMINFO = 0] = "STREAMINFO", t[t.VORBIS_COMMENT = 4] = "VORBIS_COMMENT", t[t.PICTURE = 6] = "PICTURE";
    })(sr || (sr = {}));
    const oi = (t, e)=>{
        const r = Z(t);
        let n = 0;
        const i = r.getUint32(n, !0);
        n += 4;
        const s = ve.decode(t.subarray(n, n + i));
        n += i, i > 0 && (e.raw ??= {}, e.raw.vendor ??= s);
        const a = r.getUint32(n, !0);
        n += 4;
        for(let o = 0; o < a; o++){
            const c = r.getUint32(n, !0);
            n += 4;
            const u = ve.decode(t.subarray(n, n + c));
            n += c;
            const l = u.indexOf("=");
            if (l === -1) continue;
            const d = u.slice(0, l).toUpperCase(), f = u.slice(l + 1);
            switch(e.raw ??= {}, e.raw[d] ??= f, d){
                case "TITLE":
                    e.title ??= f;
                    break;
                case "DESCRIPTION":
                    e.description ??= f;
                    break;
                case "ARTIST":
                    e.artist ??= f;
                    break;
                case "ALBUM":
                    e.album ??= f;
                    break;
                case "ALBUMARTIST":
                    e.albumArtist ??= f;
                    break;
                case "COMMENT":
                    e.comment ??= f;
                    break;
                case "LYRICS":
                    e.lyrics ??= f;
                    break;
                case "TRACKNUMBER":
                    {
                        const h = f.split("/"), g = Number.parseInt(h[0], 10), m = h[1] && Number.parseInt(h[1], 10);
                        Number.isInteger(g) && g > 0 && (e.trackNumber ??= g), m && Number.isInteger(m) && m > 0 && (e.tracksTotal ??= m);
                    }
                    break;
                case "TRACKTOTAL":
                    {
                        const h = Number.parseInt(f, 10);
                        Number.isInteger(h) && h > 0 && (e.tracksTotal ??= h);
                    }
                    break;
                case "DISCNUMBER":
                    {
                        const h = f.split("/"), g = Number.parseInt(h[0], 10), m = h[1] && Number.parseInt(h[1], 10);
                        Number.isInteger(g) && g > 0 && (e.discNumber ??= g), m && Number.isInteger(m) && m > 0 && (e.discsTotal ??= m);
                    }
                    break;
                case "DISCTOTAL":
                    {
                        const h = Number.parseInt(f, 10);
                        Number.isInteger(h) && h > 0 && (e.discsTotal ??= h);
                    }
                    break;
                case "DATE":
                    {
                        const h = new Date(f);
                        Number.isNaN(h.getTime()) || (e.date ??= h);
                    }
                    break;
                case "GENRE":
                    e.genre ??= f;
                    break;
                case "METADATA_BLOCK_PICTURE":
                    {
                        const h = Sa(f), g = Z(h), m = g.getUint32(0, !1), b = g.getUint32(4, !1), _ = String.fromCharCode(...h.subarray(8, 8 + b)), w = g.getUint32(8 + b, !1), y = ve.decode(h.subarray(12 + b, 12 + b + w)), T = g.getUint32(b + w + 28), S = h.subarray(b + w + 32, b + w + 32 + T);
                        e.images ??= [], e.images.push({
                            data: S,
                            mimeType: _,
                            kind: m === 3 ? "coverFront" : m === 4 ? "coverBack" : "unknown",
                            name: void 0,
                            description: y || void 0
                        });
                    }
                    break;
            }
        }
    }, Vi = [
        2,
        1,
        2,
        3,
        3,
        4,
        4,
        5
    ], Va = (t)=>{
        if (t.length < 7 || t[0] !== 11 || t[1] !== 119) return null;
        const e = new Y(t);
        e.skipBits(16), e.skipBits(16);
        const r = e.readBits(2);
        if (r === 3) return null;
        const n = e.readBits(6), i = e.readBits(5);
        if (i > 8) return null;
        const s = e.readBits(3), a = e.readBits(3);
        (a & 1) !== 0 && a !== 1 && e.skipBits(2), (a & 4) !== 0 && e.skipBits(2), a === 2 && e.skipBits(2);
        const o = e.readBits(1), c = Math.floor(n / 2);
        return {
            fscod: r,
            bsid: i,
            bsmod: s,
            acmod: a,
            lfeon: o,
            bitRateCode: c
        };
    }, Vc = [
        128,
        138,
        192,
        128,
        140,
        192,
        160,
        174,
        240,
        160,
        176,
        240,
        192,
        208,
        288,
        192,
        210,
        288,
        224,
        242,
        336,
        224,
        244,
        336,
        256,
        278,
        384,
        256,
        280,
        384,
        320,
        348,
        480,
        320,
        350,
        480,
        384,
        416,
        288 * 2,
        384,
        418,
        288 * 2,
        448,
        486,
        336 * 2,
        448,
        488,
        336 * 2,
        256 * 2,
        278 * 2,
        384 * 2,
        256 * 2,
        279 * 2,
        384 * 2,
        320 * 2,
        348 * 2,
        480 * 2,
        320 * 2,
        349 * 2,
        480 * 2,
        384 * 2,
        417 * 2,
        576 * 2,
        384 * 2,
        418 * 2,
        576 * 2,
        448 * 2,
        487 * 2,
        672 * 2,
        448 * 2,
        488 * 2,
        672 * 2,
        512 * 2,
        557 * 2,
        768 * 2,
        512 * 2,
        558 * 2,
        768 * 2,
        640 * 2,
        696 * 2,
        960 * 2,
        640 * 2,
        697 * 2,
        960 * 2,
        768 * 2,
        835 * 2,
        1152 * 2,
        768 * 2,
        836 * 2,
        1152 * 2,
        896 * 2,
        975 * 2,
        1344 * 2,
        896 * 2,
        976 * 2,
        1344 * 2,
        1024 * 2,
        1114 * 2,
        1536 * 2,
        1024 * 2,
        1115 * 2,
        1536 * 2,
        1152 * 2,
        1253 * 2,
        1728 * 2,
        1152 * 2,
        1254 * 2,
        1728 * 2,
        1280 * 2,
        1393 * 2,
        1920 * 2,
        1280 * 2,
        1394 * 2,
        1920 * 2
    ], Hc = 1536, Ha = [
        1,
        2,
        3,
        6
    ], qa = (t)=>{
        if (t.length < 6 || t[0] !== 11 || t[1] !== 119) return null;
        const e = new Y(t);
        e.skipBits(16);
        const r = e.readBits(2);
        if (e.skipBits(3), r !== 0 && r !== 2) return null;
        const n = e.readBits(11), i = e.readBits(2);
        let s = 0, a;
        i === 3 ? (s = e.readBits(2), a = 3) : a = e.readBits(2);
        const o = e.readBits(3), c = e.readBits(1), u = e.readBits(5);
        if (u < 11 || u > 16) return null;
        const l = Ha[a];
        let d;
        return i < 3 ? d = kn[i] / 1e3 : d = Ra[s] / 1e3, {
            dataRate: Math.round((n + 1) * d / (l * 16)),
            substreams: [
                {
                    fscod: i,
                    fscod2: s,
                    bsid: u,
                    bsmod: 0,
                    acmod: o,
                    lfeon: c,
                    numDepSub: 0,
                    chanLoc: 0
                }
            ]
        };
    }, qc = (t)=>{
        if (t.length < 2) return null;
        const e = new Y(t), r = e.readBits(13), n = e.readBits(3), i = [];
        for(let s = 0; s <= n && !(Math.ceil(e.pos / 8) + 3 > t.length); s++){
            const a = e.readBits(2), o = e.readBits(5);
            e.skipBits(1), e.skipBits(1);
            const c = e.readBits(3), u = e.readBits(3), l = e.readBits(1);
            e.skipBits(3);
            const d = e.readBits(4);
            let f = 0;
            d > 0 ? f = e.readBits(9) : e.skipBits(1), i.push({
                fscod: a,
                fscod2: null,
                bsid: o,
                bsmod: c,
                acmod: u,
                lfeon: l,
                numDepSub: d,
                chanLoc: f
            });
        }
        return i.length === 0 ? null : {
            dataRate: r,
            substreams: i
        };
    }, Ga = (t)=>{
        const e = t.substreams[0];
        return p(e), e.fscod < 3 ? kn[e.fscod] : e.fscod2 !== null && e.fscod2 < 3 ? Ra[e.fscod2] : null;
    }, ja = (t)=>{
        const e = t.substreams[0];
        p(e);
        let r = Vi[e.acmod] + e.lfeon;
        if (e.numDepSub > 0) {
            const n = [
                2,
                2,
                1,
                1,
                2,
                2,
                2,
                1,
                1
            ];
            for(let i = 0; i < 9; i++)e.chanLoc & 1 << 8 - i && (r += n[i]);
        }
        return r;
    };
    class ft {
        constructor(e){
            this.input = e;
        }
        dispose() {}
    }
    const Ee = new Uint8Array(0);
    class te {
        constructor(e, r, n, i, s = -1, a, o){
            if (this.data = e, this.type = r, this.timestamp = n, this.duration = i, this.sequenceNumber = s, e === Ee && a === void 0) throw new Error("Internal error: byteLength must be explicitly provided when constructing metadata-only packets.");
            if (a === void 0 && (a = e.byteLength), !(e instanceof Uint8Array)) throw new TypeError("data must be a Uint8Array.");
            if (r !== "key" && r !== "delta") throw new TypeError('type must be either "key" or "delta".');
            if (!Number.isFinite(n)) throw new TypeError("timestamp must be a number.");
            if (!Number.isFinite(i) || i < 0) throw new TypeError("duration must be a non-negative number.");
            if (!Number.isFinite(s)) throw new TypeError("sequenceNumber must be a number.");
            if (!Number.isInteger(a) || a < 0) throw new TypeError("byteLength must be a non-negative integer.");
            if (o !== void 0 && (typeof o != "object" || !o)) throw new TypeError("sideData, when provided, must be an object.");
            if (o?.alpha !== void 0 && !(o.alpha instanceof Uint8Array)) throw new TypeError("sideData.alpha, when provided, must be a Uint8Array.");
            if (o?.alphaByteLength !== void 0 && (!Number.isInteger(o.alphaByteLength) || o.alphaByteLength < 0)) throw new TypeError("sideData.alphaByteLength, when provided, must be a non-negative integer.");
            this.byteLength = a, this.sideData = o ?? {}, this.sideData.alpha && this.sideData.alphaByteLength === void 0 && (this.sideData.alphaByteLength = this.sideData.alpha.byteLength);
        }
        get isMetadataOnly() {
            return this.data === Ee;
        }
        get microsecondTimestamp() {
            return Math.trunc(bt * this.timestamp);
        }
        get microsecondDuration() {
            return Math.trunc(bt * this.duration);
        }
        toEncodedVideoChunk() {
            if (this.isMetadataOnly) throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");
            if (typeof EncodedVideoChunk > "u") throw new Error("Your browser does not support EncodedVideoChunk.");
            return new EncodedVideoChunk({
                data: this.data,
                type: this.type,
                timestamp: this.microsecondTimestamp,
                duration: this.microsecondDuration
            });
        }
        alphaToEncodedVideoChunk(e = this.type) {
            if (!this.sideData.alpha) throw new TypeError("This packet does not contain alpha side data.");
            if (this.isMetadataOnly) throw new TypeError("Metadata-only packets cannot be converted to a video chunk.");
            if (typeof EncodedVideoChunk > "u") throw new Error("Your browser does not support EncodedVideoChunk.");
            return new EncodedVideoChunk({
                data: this.sideData.alpha,
                type: e,
                timestamp: this.microsecondTimestamp,
                duration: this.microsecondDuration
            });
        }
        toEncodedAudioChunk() {
            if (this.isMetadataOnly) throw new TypeError("Metadata-only packets cannot be converted to an audio chunk.");
            if (typeof EncodedAudioChunk > "u") throw new Error("Your browser does not support EncodedAudioChunk.");
            return new EncodedAudioChunk({
                data: this.data,
                type: this.type,
                timestamp: this.microsecondTimestamp,
                duration: this.microsecondDuration
            });
        }
        static fromEncodedChunk(e, r) {
            if (!(e instanceof EncodedVideoChunk || e instanceof EncodedAudioChunk)) throw new TypeError("chunk must be an EncodedVideoChunk or EncodedAudioChunk.");
            const n = new Uint8Array(e.byteLength);
            return e.copyTo(n), new te(n, e.type, e.timestamp / 1e6, (e.duration ?? 0) / 1e6, void 0, void 0, r);
        }
        clone(e) {
            if (e !== void 0 && (typeof e != "object" || e === null)) throw new TypeError("options, when provided, must be an object.");
            if (e?.data !== void 0 && !(e.data instanceof Uint8Array)) throw new TypeError("options.data, when provided, must be a Uint8Array.");
            if (e?.type !== void 0 && e.type !== "key" && e.type !== "delta") throw new TypeError('options.type, when provided, must be either "key" or "delta".');
            if (e?.timestamp !== void 0 && !Number.isFinite(e.timestamp)) throw new TypeError("options.timestamp, when provided, must be a number.");
            if (e?.duration !== void 0 && !Number.isFinite(e.duration)) throw new TypeError("options.duration, when provided, must be a number.");
            if (e?.sequenceNumber !== void 0 && !Number.isFinite(e.sequenceNumber)) throw new TypeError("options.sequenceNumber, when provided, must be a number.");
            if (e?.sideData !== void 0 && (typeof e.sideData != "object" || e.sideData === null)) throw new TypeError("options.sideData, when provided, must be an object.");
            return new te(e?.data ?? this.data, e?.type ?? this.type, e?.timestamp ?? this.timestamp, e?.duration ?? this.duration, e?.sequenceNumber ?? this.sequenceNumber, this.byteLength, e?.sideData ?? this.sideData);
        }
    }
    const $a = (t)=>{
        let r = (t.hasVideo ? "video/" : t.hasAudio ? "audio/" : "application/") + (t.isQuickTime ? "quicktime" : "mp4");
        if (t.codecStrings.length > 0) {
            const n = [
                ...new Set(t.codecStrings)
            ];
            r += `; codecs="${n.join(", ")}"`;
        }
        return r;
    }, Ka = (t)=>{
        const e = Z(t);
        let r = 0;
        const n = e.getUint8(r);
        r += 1, r += 3;
        const i = Ar(t.subarray(r, r + 16));
        r += 16;
        let s = null;
        if (n > 0) {
            const o = e.getUint32(r);
            if (r += 4, o > 0) {
                s = [];
                for(let c = 0; c < o; c++)s.push(Ar(t.subarray(r, r + 16))), r += 16;
            }
        }
        const a = e.getUint32(r);
        return r += 4, {
            systemId: i,
            keyIds: s,
            data: t.slice(r, r + a)
        };
    }, Xa = (t, e)=>t.systemId === e.systemId && xa(t.data, e.data);
    const rt = 8, Ft = 16, gt = (t)=>{
        let e = A(t);
        const r = se(t, 4);
        let n = 8;
        e === 1 && (e = Ae(t), n = 16);
        const s = e - n;
        return s < 0 ? null : {
            name: r,
            totalSize: e,
            headerSize: n,
            contentSize: s
        };
    }, Ct = (t)=>Mt(t) / 65536, Nn = (t)=>Mt(t) / 1073741824, Un = (t)=>{
        let e = 0;
        for(let r = 0; r < 4; r++){
            e <<= 7;
            const n = M(t);
            if (e |= n & 127, (n & 128) === 0) break;
        }
        return e;
    }, Le = (t)=>{
        let e = ce(t);
        return t.skip(2), e = Math.min(e, t.remainingLength), ve.decode(O(t, e));
    }, Gc = (t)=>{
        const e = gt(t);
        if (!e || e.name !== "data" || t.remainingLength < 8) return null;
        const r = A(t);
        t.skip(4);
        const n = O(t, e.contentSize - 8);
        switch(r){
            case 1:
                return ve.decode(n);
            case 2:
                return new TextDecoder("utf-16be").decode(n);
            case 13:
                return new ir(n, "image/jpeg");
            case 14:
                return new ir(n, "image/png");
            case 27:
                return new ir(n, "image/bmp");
            default:
                return n;
        }
    };
    const He = 16, Qe = new Uint32Array(256), $t = new Uint32Array(256), Kt = new Uint32Array(256), Xt = new Uint32Array(256), Qt = new Uint32Array(256), de = new Uint32Array(256), Qa = new Uint32Array(10);
    let Ya = !1;
    const jc = ()=>{
        const t = new Uint8Array(256), e = new Uint8Array(256), r = new Uint8Array(256);
        for(let s = 0, a = 1; s < 256; s++)r[s] = a, e[a] = s, a = a ^ a << 1 ^ (a & 128 ? 283 : 0);
        const n = (s, a)=>s && a ? r[(e[s] + e[a]) % 255] : 0;
        t[0] = 99;
        for(let s = 1; s < 256; s++){
            const a = r[255 - e[s]];
            let o = a ^ a << 1 ^ a << 2 ^ a << 3 ^ a << 4;
            o = o >>> 8 ^ o & 255 ^ 99, t[s] = o;
        }
        for(let s = 0; s < 256; s++){
            const a = t[s], o = t.indexOf(s);
            Qe[s] = a << 24 | a << 16 | a << 8 | a, de[s] = o << 24 | o << 16 | o << 8 | o;
            const c = n(o, 14), u = n(o, 9), l = n(o, 13), d = n(o, 11), f = c << 24 | u << 16 | l << 8 | d;
            $t[s] = f, Kt[s] = f >>> 8 | f << 24, Xt[s] = f >>> 16 | f << 16, Qt[s] = f >>> 24 | f << 8;
        }
        let i = 1;
        for(let s = 0; s < 10; s++)Qa[s] = i << 24, i = i << 1 ^ (i & 128 ? 283 : 0);
        Ya = !0;
    };
    class Za {
        constructor(){
            this.roundkey = new Uint32Array(44), this.iv = new Uint32Array(He / Uint32Array.BYTES_PER_ELEMENT), this.in = new Uint8Array(He), this.out = new Uint8Array(He), this.inView = new DataView(this.in.buffer), this.outView = new DataView(this.out.buffer);
        }
        init({ key: e, iv: r }) {
            p(e.byteLength === 16), p(r.byteLength === 16), Ya || jc();
            const n = new DataView(e.buffer, e.byteOffset, e.byteLength), i = new DataView(r.buffer, r.byteOffset, r.byteLength);
            this.roundkey[0] = n.getUint32(0, !1), this.roundkey[1] = n.getUint32(4, !1), this.roundkey[2] = n.getUint32(8, !1), this.roundkey[3] = n.getUint32(12, !1), this.iv[0] = i.getUint32(0, !1), this.iv[1] = i.getUint32(4, !1), this.iv[2] = i.getUint32(8, !1), this.iv[3] = i.getUint32(12, !1);
            for(let s = 4; s < 44; s += 4){
                const a = this.roundkey[s - 1];
                this.roundkey[s] = this.roundkey[s - 4] ^ Qe[a >>> 16 & 255] & 4278190080 ^ Qe[a >>> 8 & 255] & 16711680 ^ Qe[a >>> 0 & 255] & 65280 ^ Qe[a >>> 24 & 255] & 255 ^ Qa[s / 4 - 1], this.roundkey[s + 1] = this.roundkey[s - 3] ^ this.roundkey[s], this.roundkey[s + 2] = this.roundkey[s - 2] ^ this.roundkey[s + 1], this.roundkey[s + 3] = this.roundkey[s - 1] ^ this.roundkey[s + 2];
            }
            for(let s = 0, a = 40; s < a; s += 4, a -= 4)for(let o = 0; o < 4; o++){
                const c = this.roundkey[s + o];
                this.roundkey[s + o] = this.roundkey[a + o], this.roundkey[a + o] = c;
            }
            for(let s = 4; s < 40; s += 4)for(let a = 0; a < 4; a++){
                const o = this.roundkey[s + a];
                this.roundkey[s + a] = $t[Qe[o >>> 24 & 255] & 255] ^ Kt[Qe[o >>> 16 & 255] & 255] ^ Xt[Qe[o >>> 8 & 255] & 255] ^ Qt[Qe[o >>> 0 & 255] & 255];
            }
        }
        decrypt() {
            let e = this.inView.getUint32(0, !1) ^ this.roundkey[0], r = this.inView.getUint32(4, !1) ^ this.roundkey[1], n = this.inView.getUint32(8, !1) ^ this.roundkey[2], i = this.inView.getUint32(12, !1) ^ this.roundkey[3];
            const s = this.inView.getUint32(0, !1), a = this.inView.getUint32(4, !1), o = this.inView.getUint32(8, !1), c = this.inView.getUint32(12, !1);
            let u, l, d, f;
            for(let _ = 1; _ < 10; _++){
                const w = _ * 4;
                u = $t[e >>> 24] ^ Kt[i >>> 16 & 255] ^ Xt[n >>> 8 & 255] ^ Qt[r & 255] ^ this.roundkey[w], l = $t[r >>> 24] ^ Kt[e >>> 16 & 255] ^ Xt[i >>> 8 & 255] ^ Qt[n & 255] ^ this.roundkey[w + 1], d = $t[n >>> 24] ^ Kt[r >>> 16 & 255] ^ Xt[e >>> 8 & 255] ^ Qt[i & 255] ^ this.roundkey[w + 2], f = $t[i >>> 24] ^ Kt[n >>> 16 & 255] ^ Xt[r >>> 8 & 255] ^ Qt[e & 255] ^ this.roundkey[w + 3], e = u, r = l, n = d, i = f;
            }
            const h = de[e >>> 24 & 255] & 4278190080 ^ de[i >>> 16 & 255] & 16711680 ^ de[n >>> 8 & 255] & 65280 ^ de[r >>> 0 & 255] & 255 ^ this.roundkey[40], g = de[r >>> 24 & 255] & 4278190080 ^ de[e >>> 16 & 255] & 16711680 ^ de[i >>> 8 & 255] & 65280 ^ de[n >>> 0 & 255] & 255 ^ this.roundkey[41], m = de[n >>> 24 & 255] & 4278190080 ^ de[r >>> 16 & 255] & 16711680 ^ de[e >>> 8 & 255] & 65280 ^ de[i >>> 0 & 255] & 255 ^ this.roundkey[42], b = de[i >>> 24 & 255] & 4278190080 ^ de[n >>> 16 & 255] & 16711680 ^ de[r >>> 8 & 255] & 65280 ^ de[e >>> 0 & 255] & 255 ^ this.roundkey[43];
            this.outView.setUint32(0, h ^ this.iv[0], !1), this.outView.setUint32(4, g ^ this.iv[1], !1), this.outView.setUint32(8, m ^ this.iv[2], !1), this.outView.setUint32(12, b ^ this.iv[3], !1), this.iv[0] = s, this.iv[1] = a, this.iv[2] = o, this.iv[3] = c;
        }
    }
    const $c = (t, e, r)=>{
        let n = !1, i = 0;
        const s = 2 ** 16, a = 16, o = new Za;
        return new ReadableStream({
            pull: async (c)=>{
                n || (o.init(await e()), n = !0);
                const u = s + a;
                let l = t.requestSliceRange(i, 0, u);
                if (l instanceof Promise && (l = await l), !l || l.length === 0) throw new Error("Invalid ciphertext.");
                const d = l.length;
                if (d % 16 !== 0) throw new Error("Invalid ciphertext.");
                const f = d === u ? d - a : d, h = O(l, f), g = new Uint8Array(f);
                for(let m = 0; m < f; m += 16)o.in.set(h.subarray(m, m + 16)), o.decrypt(), g.set(o.out, m);
                if (f < d) c.enqueue(g), i += f;
                else {
                    const m = g[f - 1];
                    if (m === 0 || m > 16) throw new Error("Invalid PKCS#7 padding. Incorrect key or corrupted data.");
                    const b = g.subarray(0, f - m);
                    c.enqueue(b), c.close(), r();
                }
            },
            cancel: ()=>{
                r();
            }
        });
    };
    class Hi extends ft {
        constructor(e){
            super(e), this.moovSlice = null, this.currentTrack = null, this.tracks = [], this.metadataPromise = null, this.movieTimescale = -1, this.movieDurationInTimescale = -1, this.isQuickTime = !1, this.metadataTags = {}, this.currentMetadataKeys = null, this.isFragmented = !1, this.fragmentTrackDefaults = [], this.psshBoxes = [], this.currentFragment = null, this.lastReadFragment = null, this.decryptionKeyCache = new Map, this.reader = e._reader;
        }
        async getTrackBackings() {
            return await this.readMetadata(), this.tracks.map((e)=>e.trackBacking);
        }
        async getMimeType() {
            await this.readMetadata();
            const e = await this.getTrackBackings(), r = await Promise.all(e.map((n)=>n.getDecoderConfig().then((i)=>i?.codec ?? null)));
            return $a({
                isQuickTime: this.isQuickTime,
                hasVideo: this.tracks.some((n)=>n.info?.type === "video"),
                hasAudio: this.tracks.some((n)=>n.info?.type === "audio"),
                codecStrings: r.filter(Boolean)
            });
        }
        async getMetadataTags() {
            return await this.readMetadata(), this.metadataTags;
        }
        readMetadata() {
            return this.metadataPromise ??= (async ()=>{
                let e = 0, r = !1;
                for(;;){
                    let n = this.reader.requestSliceRange(e, rt, Ft);
                    if (n instanceof Promise && (n = await n), !n) break;
                    const i = e, s = gt(n);
                    if (!s) break;
                    if (s.name === "ftyp" || s.name === "styp") {
                        const a = se(n, 4);
                        this.isQuickTime = a === "qt  ";
                    } else if (s.name === "moov") {
                        let a = this.reader.requestSlice(n.filePos, s.contentSize);
                        if (a instanceof Promise && (a = await a), !a) break;
                        this.moovSlice = a, this.readContiguousBoxes(this.moovSlice);
                        for (const o of this.tracks){
                            const c = o.editListPreviousSegmentDurations / this.movieTimescale;
                            o.editListOffset -= Math.round(c * o.timescale);
                        }
                        r = this.isFragmented && this.reader.fileSize !== null && this.reader.fileSize > i + s.totalSize;
                        break;
                    } else if (s.name === "moof") {
                        if (!this.input._initInput) throw new Error('"moof" box encountered with no "moov" box present; this file is likely a Segment as described in ISO/IEC 14496-12 Section 8.16. A separate init file that contains a "moov" box is required to read this file, please provide it using InputOptions.initInput.');
                        const a = await this.input._initInput._getDemuxer();
                        if (a.constructor !== Hi) throw new Error("Init input must match the input's format.");
                        await a.readMetadata(), this.movieTimescale = a.movieTimescale, this.movieDurationInTimescale = a.movieDurationInTimescale, this.metadataTags = a.metadataTags, this.isFragmented = !0, this.fragmentTrackDefaults = a.fragmentTrackDefaults, this.psshBoxes = a.psshBoxes;
                        for (const o of a.tracks){
                            const c = {
                                id: o.id,
                                demuxer: this,
                                trackBacking: null,
                                disposition: o.disposition,
                                timescale: o.timescale,
                                durationInMediaTimescale: o.durationInMediaTimescale,
                                durationInMovieTimescale: o.durationInMovieTimescale,
                                rotation: o.rotation,
                                internalCodecId: o.internalCodecId,
                                name: o.name,
                                languageCode: o.languageCode,
                                sampleTableByteOffset: null,
                                sampleTable: null,
                                fragmentLookupTable: [],
                                currentFragmentState: null,
                                fragmentPositionCache: [],
                                editListPreviousSegmentDurations: o.editListPreviousSegmentDurations,
                                editListOffset: o.editListOffset,
                                encryptionInfo: o.encryptionInfo,
                                encryptionAuxInfo: null,
                                frmaCodecString: null,
                                info: o.info
                            };
                            if (o.trackBacking) {
                                if (p(c.info), c.info.type === "video" && c.info.width !== -1) {
                                    const u = c;
                                    c.trackBacking = new Ts(u), this.tracks.push(c);
                                } else if (c.info.type === "audio" && c.info.numberOfChannels !== -1) {
                                    const u = c;
                                    c.trackBacking = new Ss(u), this.tracks.push(c);
                                }
                            }
                        }
                        r = !1;
                        break;
                    }
                    e = i + s.totalSize;
                }
                if (r) {
                    p(this.reader.fileSize !== null);
                    let n = this.reader.requestSlice(this.reader.fileSize - 4, 4);
                    n instanceof Promise && (n = await n), p(n);
                    const i = A(n), s = this.reader.fileSize - i;
                    if (s >= 0 && s <= this.reader.fileSize - Ft) {
                        let a = this.reader.requestSliceRange(s, rt, Ft);
                        if (a instanceof Promise && (a = await a), a) {
                            const o = gt(a);
                            if (o && o.name === "mfra") {
                                let c = this.reader.requestSlice(a.filePos, o.contentSize);
                                c instanceof Promise && (c = await c), c && this.readContiguousBoxes(c);
                            }
                        }
                    }
                }
            })();
        }
        getSampleTableForTrack(e) {
            if (e.sampleTable) return e.sampleTable;
            const r = {
                sampleTimingEntries: [],
                sampleCompositionTimeOffsets: [],
                sampleSizes: [],
                keySampleIndices: null,
                chunkOffsets: [],
                sampleToChunk: [],
                presentationTimestamps: null,
                presentationTimestampIndexMap: null
            };
            if (e.sampleTable = r, e.sampleTableByteOffset === null) return r;
            p(this.moovSlice);
            const n = this.moovSlice.slice(e.sampleTableByteOffset);
            if (this.currentTrack = e, this.traverseBox(n), this.currentTrack = null, e.info?.type === "audio" && e.info.codec && be.includes(e.info.codec) && r.sampleCompositionTimeOffsets.length === 0) {
                p(e.info?.type === "audio");
                const s = $e(e.info.codec), a = [], o = [];
                for(let c = 0; c < r.sampleToChunk.length; c++){
                    const u = r.sampleToChunk[c], l = r.sampleToChunk[c + 1], d = (l ? l.startChunkIndex : r.chunkOffsets.length) - u.startChunkIndex;
                    for(let f = 0; f < d; f++){
                        const h = u.startSampleIndex + f * u.samplesPerChunk, g = h + u.samplesPerChunk, m = K(r.sampleTimingEntries, h, (P)=>P.startIndex), b = r.sampleTimingEntries[m], _ = K(r.sampleTimingEntries, g, (P)=>P.startIndex), w = r.sampleTimingEntries[_], y = b.startDecodeTimestamp + (h - b.startIndex) * b.delta, S = w.startDecodeTimestamp + (g - w.startIndex) * w.delta - y, C = ie(a);
                        C && C.delta === S ? C.count++ : a.push({
                            startIndex: u.startChunkIndex + f,
                            startDecodeTimestamp: y,
                            count: 1,
                            delta: S
                        });
                        const I = u.samplesPerChunk * s.sampleSize * e.info.numberOfChannels;
                        o.push(I);
                    }
                    u.startSampleIndex = u.startChunkIndex, u.samplesPerChunk = 1;
                }
                r.sampleTimingEntries = a, r.sampleSizes = o;
            }
            if (r.sampleCompositionTimeOffsets.length > 0) {
                r.presentationTimestamps = [];
                for (const s of r.sampleTimingEntries)for(let a = 0; a < s.count; a++)r.presentationTimestamps.push({
                    presentationTimestamp: s.startDecodeTimestamp + a * s.delta,
                    sampleIndex: s.startIndex + a
                });
                for (const s of r.sampleCompositionTimeOffsets)for(let a = 0; a < s.count; a++){
                    const o = s.startIndex + a, c = r.presentationTimestamps[o];
                    c && (c.presentationTimestamp += s.offset);
                }
                r.presentationTimestamps.sort((s, a)=>s.presentationTimestamp - a.presentationTimestamp), r.presentationTimestampIndexMap = Array(r.presentationTimestamps.length).fill(-1);
                for(let s = 0; s < r.presentationTimestamps.length; s++)r.presentationTimestampIndexMap[r.presentationTimestamps[s].sampleIndex] = s;
            }
            return r;
        }
        async readFragment(e) {
            if (this.lastReadFragment?.moofOffset === e) return this.lastReadFragment;
            let r = this.reader.requestSliceRange(e, rt, Ft);
            r instanceof Promise && (r = await r), p(r);
            const n = gt(r);
            p(n?.name === "moof");
            let i = this.reader.requestSlice(e, n.totalSize);
            i instanceof Promise && (i = await i), p(i), this.traverseBox(i);
            const s = this.lastReadFragment;
            p(s && s.moofOffset === e);
            for (const [, a] of s.trackData){
                const o = a.track, { fragmentPositionCache: c } = o;
                if (!a.startTimestampIsFinal) {
                    const l = o.fragmentLookupTable.find((d)=>d.moofOffset === s.moofOffset);
                    if (l) Ln(a, l.timestamp);
                    else {
                        const d = K(c, s.moofOffset - 1, (f)=>f.moofOffset);
                        if (d !== -1) {
                            const f = c[d];
                            Ln(a, f.endTimestamp);
                        }
                    }
                    a.startTimestampIsFinal = !0;
                }
                const u = K(c, a.startTimestamp, (l)=>l.startTimestamp);
                if ((u === -1 || c[u].moofOffset !== s.moofOffset) && c.splice(u + 1, 0, {
                    moofOffset: s.moofOffset,
                    startTimestamp: a.startTimestamp,
                    endTimestamp: a.endTimestamp
                }), a.encryptionAuxInfo && o.encryptionInfo) {
                    const l = await eo(this.reader, o.encryptionInfo, a.encryptionAuxInfo);
                    for(let d = 0; d < Math.min(a.samples.length, l.length); d++){
                        const f = l[d];
                        a.samples[d].encryption = f;
                    }
                }
            }
            return s;
        }
        readContiguousBoxes(e) {
            const r = e.filePos;
            for(; e.filePos - r <= e.length - rt && this.traverseBox(e););
        }
        *iterateContiguousBoxes(e) {
            const r = e.filePos;
            for(; e.filePos - r <= e.length - rt;){
                const n = e.filePos, i = gt(e);
                if (!i) break;
                yield {
                    boxInfo: i,
                    slice: e
                }, e.filePos = n + i.totalSize;
            }
        }
        traverseBox(e) {
            const r = e.filePos, n = gt(e);
            if (!n) return !1;
            const i = e.filePos, s = r + n.totalSize;
            switch(n.name){
                case "mdia":
                case "minf":
                case "dinf":
                case "mfra":
                case "edts":
                case "sinf":
                case "schi":
                    this.readContiguousBoxes(e.slice(i, n.contentSize));
                    break;
                case "mvhd":
                    {
                        const a = M(e);
                        e.skip(3), a === 1 ? (e.skip(16), this.movieTimescale = A(e), this.movieDurationInTimescale = Ae(e)) : (e.skip(8), this.movieTimescale = A(e), this.movieDurationInTimescale = A(e));
                    }
                    break;
                case "trak":
                    {
                        const a = {
                            id: -1,
                            demuxer: this,
                            trackBacking: null,
                            disposition: {
                                ...dt,
                                primary: !1
                            },
                            info: null,
                            timescale: -1,
                            durationInMovieTimescale: -1,
                            durationInMediaTimescale: -1,
                            rotation: 0,
                            internalCodecId: null,
                            name: null,
                            languageCode: me,
                            sampleTableByteOffset: -1,
                            sampleTable: null,
                            fragmentLookupTable: [],
                            currentFragmentState: null,
                            fragmentPositionCache: [],
                            editListPreviousSegmentDurations: 0,
                            editListOffset: 0,
                            encryptionInfo: null,
                            encryptionAuxInfo: null,
                            frmaCodecString: null
                        };
                        if (this.currentTrack = a, this.readContiguousBoxes(e.slice(i, n.contentSize)), a.id !== -1 && a.timescale !== -1 && a.info !== null) {
                            if (a.info.type === "video" && a.info.width !== -1) {
                                const o = a;
                                a.trackBacking = new Ts(o), this.tracks.push(a);
                            } else if (a.info.type === "audio" && a.info.numberOfChannels !== -1) {
                                const o = a;
                                a.trackBacking = new Ss(o), this.tracks.push(a);
                            }
                        }
                        this.currentTrack = null;
                    }
                    break;
                case "tkhd":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        const o = M(e), u = !!(Ye(e) & 1);
                        if (a.disposition.default = u, o === 0) e.skip(8), a.id = A(e), e.skip(4), a.durationInMovieTimescale = A(e);
                        else if (o === 1) e.skip(16), a.id = A(e), e.skip(4), a.durationInMovieTimescale = Ae(e);
                        else throw new Error(`Incorrect track header version ${o}.`);
                        e.skip(16);
                        const l = [
                            Ct(e),
                            Ct(e),
                            Nn(e),
                            Ct(e),
                            Ct(e),
                            Nn(e),
                            Ct(e),
                            Ct(e),
                            Nn(e)
                        ], d = gn(ni(Yc(l), 90));
                        p(d === 0 || d === 90 || d === 180 || d === 270), a.rotation = d;
                    }
                    break;
                case "elst":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        const o = M(e);
                        e.skip(3);
                        let c = !1, u = 0;
                        const l = A(e);
                        for(let d = 0; d < l; d++){
                            const f = o === 1 ? Ae(e) : A(e), h = o === 1 ? Gl(e) : Mt(e), g = Ct(e);
                            if (f !== 0) {
                                if (c) {
                                    console.warn("Unsupported edit list: multiple edits are not currently supported. Only using first edit.");
                                    break;
                                }
                                if (h === -1) {
                                    u += f;
                                    continue;
                                }
                                if (g !== 1) {
                                    console.warn("Unsupported edit list entry: media rate must be 1.");
                                    break;
                                }
                                a.editListPreviousSegmentDurations = u, a.editListOffset = h, c = !0;
                            }
                        }
                    }
                    break;
                case "mdhd":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        const o = M(e);
                        e.skip(3), o === 0 ? (e.skip(8), a.timescale = A(e), a.durationInMediaTimescale = A(e)) : o === 1 && (e.skip(16), a.timescale = A(e), a.durationInMediaTimescale = Ae(e));
                        let c = ce(e);
                        if (c > 0) {
                            a.languageCode = "";
                            for(let u = 0; u < 3; u++)a.languageCode = String.fromCharCode(96 + (c & 31)) + a.languageCode, c >>= 5;
                            Pi(a.languageCode) || (a.languageCode = me);
                        }
                    }
                    break;
                case "hdlr":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        e.skip(8);
                        const o = se(e, 4);
                        o === "vide" ? a.info = {
                            type: "video",
                            width: -1,
                            height: -1,
                            squarePixelWidth: -1,
                            squarePixelHeight: -1,
                            codec: null,
                            codecDescription: null,
                            colorSpace: null,
                            avcType: null,
                            avcCodecInfo: null,
                            hevcCodecInfo: null,
                            vp9CodecInfo: null,
                            av1CodecInfo: null
                        } : o === "soun" && (a.info = {
                            type: "audio",
                            numberOfChannels: -1,
                            sampleRate: -1,
                            codec: null,
                            codecDescription: null,
                            aacCodecInfo: null,
                            pcmLittleEndian: !1,
                            pcmSampleSize: null
                        });
                    }
                    break;
                case "stbl":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        a.sampleTableByteOffset = r, this.readContiguousBoxes(e.slice(i, n.contentSize));
                    }
                    break;
                case "stsd":
                    {
                        const a = this.currentTrack;
                        if (!a || a.info === null || a.sampleTable) break;
                        const o = M(e);
                        e.skip(3);
                        const c = A(e);
                        for(let u = 0; u < c; u++){
                            const l = e.filePos, d = gt(e);
                            if (!d) break;
                            a.internalCodecId = d.name;
                            const f = d.name.toLowerCase();
                            if (a.info.type === "video") {
                                e.skip(24), a.info.width = ce(e), a.info.height = ce(e), a.info.squarePixelWidth = a.info.width, a.info.squarePixelHeight = a.info.height, e.skip(50), a.frmaCodecString = null, this.readContiguousBoxes(e.slice(e.filePos, l + d.totalSize - e.filePos));
                                const h = f === "encv" ? a.frmaCodecString : f;
                                a.frmaCodecString = null, h === "avc1" || h === "avc3" ? (a.info.codec = "avc", a.info.avcType = h === "avc1" ? 1 : 3) : h === "hvc1" || h === "hev1" ? a.info.codec = "hevc" : h === "vp08" ? a.info.codec = "vp8" : h === "vp09" ? a.info.codec = "vp9" : h === "av01" ? a.info.codec = "av1" : console.warn(h === null ? "Unknown encrypted video codec due to missing frma box." : `Unsupported video codec (sample entry type '${d.name}').`);
                            } else {
                                e.skip(8);
                                const h = ce(e);
                                e.skip(6);
                                let g = ce(e), m = ce(e);
                                e.skip(4);
                                let b = A(e) / 65536, _ = null;
                                o === 0 && h > 0 && (h === 1 ? (e.skip(4), m = 8 * A(e), e.skip(8)) : h === 2 && (e.skip(4), b = Eo(e), g = A(e), e.skip(4), m = A(e), _ = A(e), e.skip(8))), a.info.numberOfChannels = g, a.info.sampleRate = b, a.frmaCodecString = null, this.readContiguousBoxes(e.slice(e.filePos, l + d.totalSize - e.filePos));
                                const w = f === "enca" ? a.frmaCodecString : f;
                                if (a.frmaCodecString = null, w !== "mp4a") if (w === "opus") a.info.codec = "opus", a.info.sampleRate = Ur;
                                else if (w === "flac") a.info.codec = "flac";
                                else if (w === "ulaw") a.info.codec = "ulaw";
                                else if (w === "alaw") a.info.codec = "alaw";
                                else if (w === "ac-3") a.info.codec = "ac3";
                                else if (w === "ec-3") a.info.codec = "eac3";
                                else if (w === "twos") m === 8 ? a.info.codec = "pcm-s8" : m === 16 ? a.info.codec = a.info.pcmLittleEndian ? "pcm-s16" : "pcm-s16be" : (console.warn(`Unsupported sample size ${m} for codec 'twos'.`), a.info.codec = null);
                                else if (w === "sowt") m === 8 ? a.info.codec = "pcm-s8" : m === 16 ? a.info.codec = "pcm-s16" : (console.warn(`Unsupported sample size ${m} for codec 'sowt'.`), a.info.codec = null);
                                else if (w === "raw ") a.info.codec = "pcm-u8";
                                else if (w === "in24") a.info.codec = a.info.pcmLittleEndian ? "pcm-s24" : "pcm-s24be";
                                else if (w === "in32") a.info.codec = a.info.pcmLittleEndian ? "pcm-s32" : "pcm-s32be";
                                else if (w === "fl32") a.info.codec = a.info.pcmLittleEndian ? "pcm-f32" : "pcm-f32be";
                                else if (w === "fl64") a.info.codec = a.info.pcmLittleEndian ? "pcm-f64" : "pcm-f64be";
                                else if (w === "ipcm") {
                                    const y = a.info.pcmSampleSize;
                                    a.info.pcmLittleEndian ? y === 16 ? a.info.codec = "pcm-s16" : y === 24 ? a.info.codec = "pcm-s24" : y === 32 ? a.info.codec = "pcm-s32" : (console.warn(`Invalid ipcm sample size ${y}.`), a.info.codec = null) : y === 16 ? a.info.codec = "pcm-s16be" : y === 24 ? a.info.codec = "pcm-s24be" : y === 32 ? a.info.codec = "pcm-s32be" : (console.warn(`Invalid ipcm sample size ${y}.`), a.info.codec = null);
                                } else if (w === "fpcm") {
                                    const y = a.info.pcmSampleSize;
                                    a.info.pcmLittleEndian ? y === 32 ? a.info.codec = "pcm-f32" : y === 64 ? a.info.codec = "pcm-f64" : (console.warn(`Invalid fpcm sample size ${y}.`), a.info.codec = null) : y === 32 ? a.info.codec = "pcm-f32be" : y === 64 ? a.info.codec = "pcm-f64be" : (console.warn(`Invalid fpcm sample size ${y}.`), a.info.codec = null);
                                } else if (w === "lpcm" && _ !== null) {
                                    const y = m + 7 >> 3, T = !!(_ & 1), S = !!(_ & 2), C = _ & 4 ? -1 : 0;
                                    m > 0 && m <= 64 && (T ? m === 32 && (a.info.codec = S ? "pcm-f32be" : "pcm-f32") : C & 1 << y - 1 ? y === 1 ? a.info.codec = "pcm-s8" : y === 2 ? a.info.codec = S ? "pcm-s16be" : "pcm-s16" : y === 3 ? a.info.codec = S ? "pcm-s24be" : "pcm-s24" : y === 4 && (a.info.codec = S ? "pcm-s32be" : "pcm-s32") : y === 1 && (a.info.codec = "pcm-u8")), a.info.codec === null && console.warn("Unsupported PCM format.");
                                } else console.warn(w === null ? "Unknown encrypted audio codec due to missing frma box." : `Unsupported audio codec (sample entry type '${d.name}').`);
                            }
                            e.filePos = l + d.totalSize;
                        }
                    }
                    break;
                case "frma":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        const c = se(e, 4).toLowerCase();
                        a.frmaCodecString = c;
                    }
                    break;
                case "schm":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        e.skip(4);
                        const o = se(e, 4);
                        o === "cenc" || o === "cens" || o === "cbcs" ? a.encryptionInfo = {
                            scheme: o,
                            defaultKid: null,
                            defaultIsProtected: null,
                            defaultPerSampleIvSize: null,
                            defaultConstantIv: null,
                            defaultCryptByteBlock: null,
                            defaultSkipByteBlock: null
                        } : console.warn(`Unsupported encryption scheme '${o}'.`);
                    }
                    break;
                case "tenc":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.encryptionInfo) break;
                        const o = M(e);
                        e.skip(3), e.skip(1);
                        const c = M(e);
                        if (o > 0 ? (a.encryptionInfo.defaultCryptByteBlock = c >> 4, a.encryptionInfo.defaultSkipByteBlock = c & 15) : (a.encryptionInfo.defaultCryptByteBlock = 0, a.encryptionInfo.defaultSkipByteBlock = 0), a.encryptionInfo.defaultIsProtected = M(e) !== 0, a.encryptionInfo.defaultPerSampleIvSize = M(e), a.encryptionInfo.defaultKid = Ar(O(e, 16)), a.encryptionInfo.defaultIsProtected && a.encryptionInfo.defaultPerSampleIvSize === 0) {
                            const u = M(e), l = new Uint8Array(16);
                            l.set(O(e, u), 0), a.encryptionInfo.defaultConstantIv = l;
                        }
                    }
                    break;
                case "avcC":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info), a.info.codecDescription = O(e, n.contentSize);
                    }
                    break;
                case "hvcC":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info), a.info.codecDescription = O(e, n.contentSize);
                    }
                    break;
                case "vpcC":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "video"), e.skip(4);
                        const o = M(e), c = M(e), u = M(e), l = u >> 4, d = u >> 1 & 7, f = u & 1, h = M(e), g = M(e), m = M(e);
                        a.info.vp9CodecInfo = {
                            profile: o,
                            level: c,
                            bitDepth: l,
                            chromaSubsampling: d,
                            videoFullRangeFlag: f,
                            colourPrimaries: h,
                            transferCharacteristics: g,
                            matrixCoefficients: m
                        };
                    }
                    break;
                case "av1C":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "video"), e.skip(1);
                        const o = M(e), c = o >> 5, u = o & 31, l = M(e), d = l >> 7, f = l >> 6 & 1, h = l >> 5 & 1, g = l >> 4 & 1, m = l >> 3 & 1, b = l >> 2 & 1, _ = l & 3, w = c === 2 && f ? h ? 12 : 10 : f ? 10 : 8;
                        a.info.av1CodecInfo = {
                            profile: c,
                            level: u,
                            tier: d,
                            bitDepth: w,
                            monochrome: g,
                            chromaSubsamplingX: m,
                            chromaSubsamplingY: b,
                            chromaSamplePosition: _
                        };
                    }
                    break;
                case "colr":
                    {
                        const a = this.currentTrack;
                        if (!a || (p(a.info?.type === "video"), se(e, 4) !== "nclx")) break;
                        const c = ce(e), u = ce(e), l = ce(e), d = !!(M(e) & 128);
                        a.info.colorSpace = {
                            primaries: sn[c],
                            transfer: an[u],
                            matrix: on[l],
                            fullRange: d
                        };
                    }
                    break;
                case "pasp":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "video");
                        const o = A(e), c = A(e);
                        o > 0 && c > 0 && (o > c ? a.info.squarePixelWidth = Math.round(a.info.width * o / c) : a.info.squarePixelHeight = Math.round(a.info.height * c / o));
                    }
                    break;
                case "wave":
                    this.readContiguousBoxes(e.slice(i, n.contentSize));
                    break;
                case "esds":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "audio"), e.skip(4);
                        const o = M(e);
                        p(o === 3), Un(e), e.skip(2);
                        const c = M(e), u = (c & 128) !== 0, l = (c & 64) !== 0, d = (c & 32) !== 0;
                        if (u && e.skip(2), l) {
                            const b = M(e);
                            e.skip(b);
                        }
                        d && e.skip(2);
                        const f = M(e);
                        p(f === 4);
                        const h = Un(e), g = e.filePos, m = M(e);
                        if (m === 64 || m === 103 ? (a.info.codec = "aac", a.info.aacCodecInfo = {
                            isMpeg2: m === 103,
                            objectType: null
                        }) : m === 105 || m === 107 ? a.info.codec = "mp3" : m === 221 ? a.info.codec = "vorbis" : console.warn(`Unsupported audio codec (objectTypeIndication ${m}) - discarding track.`), e.skip(12), h > e.filePos - g) {
                            const b = M(e);
                            p(b === 5);
                            const _ = Un(e);
                            if (a.info.codecDescription = O(e, _), a.info.codec === "aac") {
                                const w = Bi(a.info.codecDescription);
                                w.numberOfChannels !== null && (a.info.numberOfChannels = w.numberOfChannels), w.sampleRate !== null && (a.info.sampleRate = w.sampleRate);
                            }
                        }
                    }
                    break;
                case "enda":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "audio"), a.info.pcmLittleEndian = !!(ce(e) & 255);
                    }
                    break;
                case "pcmC":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "audio"), e.skip(4);
                        const o = M(e);
                        a.info.pcmLittleEndian = !!(o & 1), a.info.pcmSampleSize = M(e);
                    }
                    break;
                case "dOps":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "audio"), e.skip(1);
                        const o = M(e), c = ce(e), u = A(e), l = wi(e), d = M(e);
                        let f;
                        d !== 0 ? f = O(e, 2 + o) : f = new Uint8Array(0);
                        const h = new Uint8Array(19 + f.byteLength), g = new DataView(h.buffer);
                        g.setUint32(0, 1332770163, !1), g.setUint32(4, 1214603620, !1), g.setUint8(8, 1), g.setUint8(9, o), g.setUint16(10, c, !0), g.setUint32(12, u, !0), g.setInt16(16, l, !0), g.setUint8(18, d), h.set(f, 19), a.info.codecDescription = h, a.info.numberOfChannels = o;
                    }
                    break;
                case "dfLa":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "audio"), e.skip(4);
                        const o = 127, c = 128, u = e.filePos;
                        for(; e.filePos < s;){
                            const g = M(e), m = Ye(e);
                            if ((g & o) === sr.STREAMINFO) {
                                e.skip(10);
                                const _ = A(e), w = _ >>> 12, y = (_ >> 9 & 7) + 1;
                                a.info.sampleRate = w, a.info.numberOfChannels = y, e.skip(20);
                            } else e.skip(m);
                            if (g & c) break;
                        }
                        const l = e.filePos;
                        e.filePos = u;
                        const d = O(e, l - u), f = new Uint8Array(4 + d.byteLength);
                        new DataView(f.buffer).setUint32(0, 1716281667, !1), f.set(d, 4), a.info.codecDescription = f;
                    }
                    break;
                case "dac3":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "audio");
                        const o = O(e, 3), c = new Y(o), u = c.readBits(2);
                        c.skipBits(8);
                        const l = c.readBits(3), d = c.readBits(1);
                        u < 3 && (a.info.sampleRate = kn[u]), a.info.numberOfChannels = Vi[l] + d;
                    }
                    break;
                case "dec3":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.info?.type === "audio");
                        const o = O(e, n.contentSize), c = qc(o);
                        if (!c) {
                            console.warn("Invalid dec3 box contents, ignoring.");
                            break;
                        }
                        const u = Ga(c);
                        u !== null && (a.info.sampleRate = u), a.info.numberOfChannels = ja(c);
                    }
                    break;
                case "stts":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.sampleTable) break;
                        e.skip(4);
                        const o = A(e);
                        let c = 0, u = 0;
                        for(let l = 0; l < o; l++){
                            const d = A(e), f = A(e);
                            a.sampleTable.sampleTimingEntries.push({
                                startIndex: c,
                                startDecodeTimestamp: u,
                                count: d,
                                delta: f
                            }), c += d, u += d * f;
                        }
                    }
                    break;
                case "ctts":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.sampleTable) break;
                        e.skip(4);
                        const o = A(e);
                        let c = 0;
                        for(let u = 0; u < o; u++){
                            const l = A(e), d = Mt(e);
                            a.sampleTable.sampleCompositionTimeOffsets.push({
                                startIndex: c,
                                count: l,
                                offset: d
                            }), c += l;
                        }
                    }
                    break;
                case "stsz":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.sampleTable) break;
                        e.skip(4);
                        const o = A(e), c = A(e);
                        if (o === 0) for(let u = 0; u < c; u++){
                            const l = A(e);
                            a.sampleTable.sampleSizes.push(l);
                        }
                        else a.sampleTable.sampleSizes.push(o);
                    }
                    break;
                case "stz2":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.sampleTable) break;
                        e.skip(4), e.skip(3);
                        const o = M(e), c = A(e), u = O(e, Math.ceil(c * o / 8)), l = new Y(u);
                        for(let d = 0; d < c; d++){
                            const f = l.readBits(o);
                            a.sampleTable.sampleSizes.push(f);
                        }
                    }
                    break;
                case "stss":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.sampleTable) break;
                        e.skip(4), a.sampleTable.keySampleIndices = [];
                        const o = A(e);
                        for(let c = 0; c < o; c++){
                            const u = A(e) - 1;
                            a.sampleTable.keySampleIndices.push(u);
                        }
                        a.sampleTable.keySampleIndices[0] !== 0 && a.sampleTable.keySampleIndices.unshift(0);
                    }
                    break;
                case "stsc":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.sampleTable) break;
                        e.skip(4);
                        const o = A(e);
                        for(let u = 0; u < o; u++){
                            const l = A(e) - 1, d = A(e), f = A(e);
                            a.sampleTable.sampleToChunk.push({
                                startSampleIndex: -1,
                                startChunkIndex: l,
                                samplesPerChunk: d,
                                sampleDescriptionIndex: f
                            });
                        }
                        let c = 0;
                        for(let u = 0; u < a.sampleTable.sampleToChunk.length; u++)if (a.sampleTable.sampleToChunk[u].startSampleIndex = c, u < a.sampleTable.sampleToChunk.length - 1) {
                            const d = a.sampleTable.sampleToChunk[u + 1].startChunkIndex - a.sampleTable.sampleToChunk[u].startChunkIndex;
                            c += d * a.sampleTable.sampleToChunk[u].samplesPerChunk;
                        }
                    }
                    break;
                case "stco":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.sampleTable) break;
                        e.skip(4);
                        const o = A(e);
                        for(let c = 0; c < o; c++){
                            const u = A(e);
                            a.sampleTable.chunkOffsets.push(u);
                        }
                    }
                    break;
                case "co64":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.sampleTable) break;
                        e.skip(4);
                        const o = A(e);
                        for(let c = 0; c < o; c++){
                            const u = Ae(e);
                            a.sampleTable.chunkOffsets.push(u);
                        }
                    }
                    break;
                case "mvex":
                    this.isFragmented = !0, this.readContiguousBoxes(e.slice(i, n.contentSize));
                    break;
                case "mehd":
                    {
                        const a = M(e);
                        e.skip(3);
                        const o = a === 1 ? Ae(e) : A(e);
                        this.movieDurationInTimescale = o;
                    }
                    break;
                case "trex":
                    {
                        e.skip(4);
                        const a = A(e), o = A(e), c = A(e), u = A(e), l = A(e);
                        this.fragmentTrackDefaults.push({
                            trackId: a,
                            defaultSampleDescriptionIndex: o,
                            defaultSampleDuration: c,
                            defaultSampleSize: u,
                            defaultSampleFlags: l
                        });
                    }
                    break;
                case "tfra":
                    {
                        const a = M(e);
                        e.skip(3);
                        const o = A(e), c = this.tracks.find((w)=>w.id === o);
                        if (!c) break;
                        const u = A(e), l = (u & 48) >> 4, d = (u & 12) >> 2, f = u & 3, h = [
                            M,
                            ce,
                            Ye,
                            A
                        ], g = h[l], m = h[d], b = h[f], _ = A(e);
                        for(let w = 0; w < _; w++){
                            const y = a === 1 ? Ae(e) : A(e), T = a === 1 ? Ae(e) : A(e);
                            g(e), m(e), b(e), c.fragmentLookupTable.push({
                                timestamp: y,
                                moofOffset: T
                            });
                        }
                        c.fragmentLookupTable.sort((w, y)=>w.timestamp - y.timestamp);
                        for(let w = 0; w < c.fragmentLookupTable.length - 1; w++){
                            const y = c.fragmentLookupTable[w], T = c.fragmentLookupTable[w + 1];
                            y.timestamp === T.timestamp && (c.fragmentLookupTable.splice(w + 1, 1), w--);
                        }
                    }
                    break;
                case "moof":
                    this.currentFragment = {
                        moofOffset: r,
                        moofSize: n.totalSize,
                        implicitBaseDataOffset: r,
                        trackData: new Map,
                        psshBoxes: []
                    }, this.readContiguousBoxes(e.slice(i, n.contentSize)), this.lastReadFragment = this.currentFragment, this.currentFragment = null;
                    break;
                case "traf":
                    if (p(this.currentFragment), this.readContiguousBoxes(e.slice(i, n.contentSize)), this.currentTrack) {
                        const a = this.currentFragment.trackData.get(this.currentTrack.id);
                        if (a) {
                            this.currentFragment.implicitBaseDataOffset = a.currentOffset, a.presentationTimestamps = a.samples.map((l, d)=>({
                                    presentationTimestamp: l.presentationTimestamp,
                                    sampleIndex: d
                                })).sort((l, d)=>l.presentationTimestamp - d.presentationTimestamp);
                            for(let l = 0; l < a.presentationTimestamps.length; l++){
                                const d = a.presentationTimestamps[l], f = a.samples[d.sampleIndex];
                                if (a.firstKeyFrameTimestamp === null && f.isKeyFrame && (a.firstKeyFrameTimestamp = f.presentationTimestamp), l < a.presentationTimestamps.length - 1) {
                                    const g = a.presentationTimestamps[l + 1].presentationTimestamp - d.presentationTimestamp;
                                    f.duration = g;
                                }
                            }
                            const o = a.samples[a.presentationTimestamps[0].sampleIndex], c = a.samples[ie(a.presentationTimestamps).sampleIndex];
                            a.startTimestamp = o.presentationTimestamp, a.endTimestamp = c.presentationTimestamp + c.duration;
                            const { currentFragmentState: u } = this.currentTrack;
                            p(u), u.startTimestamp !== null && (Ln(a, u.startTimestamp), a.startTimestampIsFinal = !0), u.encryptionAuxInfo && !a.samples[0].encryption && (a.encryptionAuxInfo = u.encryptionAuxInfo);
                        }
                        this.currentTrack.currentFragmentState = null, this.currentTrack = null;
                    }
                    break;
                case "pssh":
                    {
                        if (this.input._formatOptions.isobmff?._suppressPsshParsing) break;
                        const a = Ka(O(e, n.contentSize));
                        this.currentFragment ? this.currentFragment.psshBoxes.push(a) : this.currentTrack || this.psshBoxes.push(a);
                    }
                    break;
                case "tfhd":
                    {
                        p(this.currentFragment), e.skip(1);
                        const a = Ye(e), o = !!(a & 1), c = !!(a & 2), u = !!(a & 8), l = !!(a & 16), d = !!(a & 32), f = !!(a & 65536), h = !!(a & 131072), g = A(e), m = this.tracks.find((_)=>_.id === g);
                        if (!m) break;
                        const b = this.fragmentTrackDefaults.find((_)=>_.trackId === g);
                        this.currentTrack = m, m.currentFragmentState = {
                            baseDataOffset: this.currentFragment.implicitBaseDataOffset,
                            sampleDescriptionIndex: b?.defaultSampleDescriptionIndex ?? null,
                            defaultSampleDuration: b?.defaultSampleDuration ?? null,
                            defaultSampleSize: b?.defaultSampleSize ?? null,
                            defaultSampleFlags: b?.defaultSampleFlags ?? null,
                            startTimestamp: null,
                            encryptionAuxInfo: null
                        }, o ? m.currentFragmentState.baseDataOffset = Ae(e) : h && (m.currentFragmentState.baseDataOffset = this.currentFragment.moofOffset), c && (m.currentFragmentState.sampleDescriptionIndex = A(e)), u && (m.currentFragmentState.defaultSampleDuration = A(e)), l && (m.currentFragmentState.defaultSampleSize = A(e)), d && (m.currentFragmentState.defaultSampleFlags = A(e)), f && (m.currentFragmentState.defaultSampleDuration = 0);
                    }
                    break;
                case "tfdt":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(a.currentFragmentState);
                        const o = M(e);
                        e.skip(3);
                        const c = o === 0 ? A(e) : Ae(e);
                        a.currentFragmentState.startTimestamp = c;
                    }
                    break;
                case "trun":
                    {
                        const a = this.currentTrack;
                        if (!a) break;
                        p(this.currentFragment), p(a.currentFragmentState);
                        const o = M(e), c = Ye(e), u = !!(c & 1), l = !!(c & 4), d = !!(c & 256), f = !!(c & 512), h = !!(c & 1024), g = !!(c & 2048), m = A(e);
                        let b = null;
                        u && (b = Mt(e));
                        let _ = null;
                        l && (_ = A(e));
                        let w;
                        if (this.currentFragment.trackData.has(a.id) ? (w = this.currentFragment.trackData.get(a.id), b !== null && (w.currentOffset = a.currentFragmentState.baseDataOffset + b)) : (w = {
                            track: a,
                            currentTimestamp: 0,
                            currentOffset: a.currentFragmentState.baseDataOffset + (b ?? 0),
                            startTimestamp: 0,
                            endTimestamp: 0,
                            firstKeyFrameTimestamp: null,
                            samples: [],
                            presentationTimestamps: [],
                            startTimestampIsFinal: !1,
                            encryptionAuxInfo: null
                        }, this.currentFragment.trackData.set(a.id, w)), m === 0) {
                            this.currentFragment.implicitBaseDataOffset = w.currentOffset;
                            break;
                        }
                        for(let y = 0; y < m; y++){
                            let T;
                            d ? T = A(e) : (p(a.currentFragmentState.defaultSampleDuration !== null), T = a.currentFragmentState.defaultSampleDuration);
                            let S;
                            f ? S = A(e) : (p(a.currentFragmentState.defaultSampleSize !== null), S = a.currentFragmentState.defaultSampleSize);
                            let C;
                            h ? C = A(e) : (p(a.currentFragmentState.defaultSampleFlags !== null), C = a.currentFragmentState.defaultSampleFlags), y === 0 && _ !== null && (C = _);
                            let I = 0;
                            g && (o === 0 ? I = A(e) : I = Mt(e));
                            const P = !(C & 65536);
                            w.samples.push({
                                presentationTimestamp: w.currentTimestamp + I,
                                duration: T,
                                byteOffset: w.currentOffset,
                                byteSize: S,
                                isKeyFrame: P,
                                encryption: null
                            }), w.currentOffset += S, w.currentTimestamp += T;
                        }
                    }
                    break;
                case "saiz":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.encryptionInfo) break;
                        if (e.skip(1), Ye(e) & 1) {
                            const f = se(e, 4), h = A(e);
                            if (f !== a.encryptionInfo.scheme || h !== 0) break;
                        }
                        const c = M(e), u = A(e);
                        let l = null;
                        c === 0 && u > 0 && (l = O(e, u));
                        const d = Ps(a);
                        d.defaultSampleInfoSize = c, d.sampleSizes = l, d.sampleCount = u;
                    }
                    break;
                case "saio":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.encryptionInfo) break;
                        const o = M(e);
                        if (Ye(e) & 1) {
                            const f = se(e, 4), h = A(e);
                            if (f !== a.encryptionInfo.scheme || h !== 0) break;
                        }
                        const u = A(e);
                        if (u === 0) break;
                        u > 1 && console.warn("Multiple saio entries are not supported; using the first offset only.");
                        let l = o === 0 ? A(e) : Number(Ae(e));
                        this.currentFragment && (l += this.currentFragment.moofOffset);
                        const d = Ps(a);
                        d.offset = l;
                    }
                    break;
                case "senc":
                    {
                        const a = this.currentTrack;
                        if (!a || !a.encryptionInfo) break;
                        p(this.currentFragment);
                        const o = this.currentFragment.trackData.get(a.id);
                        if (!o) break;
                        e.skip(1);
                        const u = !!(Ye(e) & 2), l = A(e), d = a.encryptionInfo.defaultPerSampleIvSize;
                        p(d !== null);
                        for(let f = 0; f < Math.min(l, o.samples.length); f++){
                            const h = new Uint8Array(16);
                            d > 0 ? h.set(O(e, d), 0) : h.set(a.encryptionInfo.defaultConstantIv, 0);
                            let g = null;
                            if (u) {
                                const b = ce(e);
                                g = [];
                                for(let _ = 0; _ < b; _++){
                                    const w = ce(e), y = A(e);
                                    g.push({
                                        clearLen: w,
                                        protectedLen: y
                                    });
                                }
                            }
                            const m = o.samples[f];
                            m.encryption = {
                                iv: h,
                                subsamples: g
                            };
                        }
                    }
                    break;
                case "udta":
                    {
                        const a = this.iterateContiguousBoxes(e.slice(i, n.contentSize));
                        for (const { boxInfo: o, slice: c } of a){
                            if (o.name !== "meta" && !this.currentTrack) {
                                const u = c.filePos;
                                this.metadataTags.raw ??= {}, o.name[0] === "©" ? this.metadataTags.raw[o.name] ??= Le(c) : this.metadataTags.raw[o.name] ??= O(c, o.contentSize), c.filePos = u;
                            }
                            switch(o.name){
                                case "meta":
                                    c.skip(-o.headerSize), this.traverseBox(c);
                                    break;
                                case "©nam":
                                case "name":
                                    this.currentTrack ? this.currentTrack.name = ve.decode(O(c, o.contentSize)) : this.metadataTags.title ??= Le(c);
                                    break;
                                case "©des":
                                    this.currentTrack || (this.metadataTags.description ??= Le(c));
                                    break;
                                case "©ART":
                                    this.currentTrack || (this.metadataTags.artist ??= Le(c));
                                    break;
                                case "©alb":
                                    this.currentTrack || (this.metadataTags.album ??= Le(c));
                                    break;
                                case "albr":
                                    this.currentTrack || (this.metadataTags.albumArtist ??= Le(c));
                                    break;
                                case "©gen":
                                    this.currentTrack || (this.metadataTags.genre ??= Le(c));
                                    break;
                                case "©day":
                                    if (!this.currentTrack) {
                                        const u = new Date(Le(c));
                                        Number.isNaN(u.getTime()) || (this.metadataTags.date ??= u);
                                    }
                                    break;
                                case "©cmt":
                                    this.currentTrack || (this.metadataTags.comment ??= Le(c));
                                    break;
                                case "©lyr":
                                    this.currentTrack || (this.metadataTags.lyrics ??= Le(c));
                                    break;
                            }
                        }
                    }
                    break;
                case "meta":
                    {
                        if (this.currentTrack) break;
                        const o = A(e) !== 0;
                        this.currentMetadataKeys = new Map, o ? this.readContiguousBoxes(e.slice(i, n.contentSize)) : this.readContiguousBoxes(e.slice(i + 4, n.contentSize - 4)), this.currentMetadataKeys = null;
                    }
                    break;
                case "keys":
                    {
                        if (!this.currentMetadataKeys) break;
                        e.skip(4);
                        const a = A(e);
                        for(let o = 0; o < a; o++){
                            const c = A(e);
                            e.skip(4);
                            const u = ve.decode(O(e, c - 8));
                            this.currentMetadataKeys.set(o + 1, u);
                        }
                    }
                    break;
                case "ilst":
                    {
                        if (!this.currentMetadataKeys) break;
                        const a = this.iterateContiguousBoxes(e.slice(i, n.contentSize));
                        for (const { boxInfo: o, slice: c } of a){
                            let u = o.name;
                            const l = (u.charCodeAt(0) << 24) + (u.charCodeAt(1) << 16) + (u.charCodeAt(2) << 8) + u.charCodeAt(3);
                            this.currentMetadataKeys.has(l) && (u = this.currentMetadataKeys.get(l));
                            const d = Gc(c);
                            switch(this.metadataTags.raw ??= {}, this.metadataTags.raw[u] ??= d, u){
                                case "©nam":
                                case "titl":
                                case "com.apple.quicktime.title":
                                case "title":
                                    typeof d == "string" && (this.metadataTags.title ??= d);
                                    break;
                                case "©des":
                                case "desc":
                                case "dscp":
                                case "com.apple.quicktime.description":
                                case "description":
                                    typeof d == "string" && (this.metadataTags.description ??= d);
                                    break;
                                case "©ART":
                                case "com.apple.quicktime.artist":
                                case "artist":
                                    typeof d == "string" && (this.metadataTags.artist ??= d);
                                    break;
                                case "©alb":
                                case "albm":
                                case "com.apple.quicktime.album":
                                case "album":
                                    typeof d == "string" && (this.metadataTags.album ??= d);
                                    break;
                                case "aART":
                                case "album_artist":
                                    typeof d == "string" && (this.metadataTags.albumArtist ??= d);
                                    break;
                                case "©cmt":
                                case "com.apple.quicktime.comment":
                                case "comment":
                                    typeof d == "string" && (this.metadataTags.comment ??= d);
                                    break;
                                case "©gen":
                                case "gnre":
                                case "com.apple.quicktime.genre":
                                case "genre":
                                    typeof d == "string" && (this.metadataTags.genre ??= d);
                                    break;
                                case "©lyr":
                                case "lyrics":
                                    typeof d == "string" && (this.metadataTags.lyrics ??= d);
                                    break;
                                case "©day":
                                case "rldt":
                                case "com.apple.quicktime.creationdate":
                                case "date":
                                    if (typeof d == "string") {
                                        const f = new Date(d);
                                        Number.isNaN(f.getTime()) || (this.metadataTags.date ??= f);
                                    }
                                    break;
                                case "covr":
                                case "com.apple.quicktime.artwork":
                                    d instanceof ir ? (this.metadataTags.images ??= [], this.metadataTags.images.push({
                                        data: d.data,
                                        kind: "coverFront",
                                        mimeType: d.mimeType
                                    })) : d instanceof Uint8Array && (this.metadataTags.images ??= [], this.metadataTags.images.push({
                                        data: d,
                                        kind: "coverFront",
                                        mimeType: "image/*"
                                    }));
                                    break;
                                case "track":
                                    if (typeof d == "string") {
                                        const f = d.split("/"), h = Number.parseInt(f[0], 10), g = f[1] && Number.parseInt(f[1], 10);
                                        Number.isInteger(h) && h > 0 && (this.metadataTags.trackNumber ??= h), g && Number.isInteger(g) && g > 0 && (this.metadataTags.tracksTotal ??= g);
                                    }
                                    break;
                                case "trkn":
                                    if (d instanceof Uint8Array && d.length >= 6) {
                                        const f = Z(d), h = f.getUint16(2, !1), g = f.getUint16(4, !1);
                                        h > 0 && (this.metadataTags.trackNumber ??= h), g > 0 && (this.metadataTags.tracksTotal ??= g);
                                    }
                                    break;
                                case "disc":
                                case "disk":
                                    if (d instanceof Uint8Array && d.length >= 6) {
                                        const f = Z(d), h = f.getUint16(2, !1), g = f.getUint16(4, !1);
                                        h > 0 && (this.metadataTags.discNumber ??= h), g > 0 && (this.metadataTags.discsTotal ??= g);
                                    }
                                    break;
                            }
                        }
                    }
                    break;
            }
            return e.filePos = s, !0;
        }
    }
    class Ja {
        constructor(e){
            this.internalTrack = e, this.packetToSampleIndex = new WeakMap, this.packetToFragmentLocation = new WeakMap;
        }
        getId() {
            return this.internalTrack.id;
        }
        getNumber() {
            const e = this.internalTrack.demuxer, r = this.internalTrack.trackBacking.getType();
            let n = 0;
            for (const i of e.tracks)if (i.trackBacking.getType() === r && n++, i === this.internalTrack) break;
            return n;
        }
        getCodec() {
            throw new Error("Not implemented on base class.");
        }
        getInternalCodecId() {
            return this.internalTrack.internalCodecId;
        }
        getName() {
            return this.internalTrack.name;
        }
        getLanguageCode() {
            return this.internalTrack.languageCode;
        }
        getTimeResolution() {
            return this.internalTrack.timescale;
        }
        isRelativeToUnixEpoch() {
            return !1;
        }
        getDisposition() {
            return this.internalTrack.disposition;
        }
        getPairingMask() {
            return 1n;
        }
        getBitrate() {
            return null;
        }
        getAverageBitrate() {
            return null;
        }
        async getDurationFromMetadata() {
            const e = this.internalTrack;
            return e.durationInMediaTimescale <= 0 ? null : (p(e.trackBacking), ((await e.trackBacking.getFirstPacket({
                metadataOnly: !0
            }))?.timestamp ?? 0) + e.durationInMediaTimescale / e.timescale);
        }
        async getLiveRefreshInterval() {
            return null;
        }
        async getFirstPacket(e) {
            const r = await this.fetchPacketForSampleIndex(0, e);
            return r || !this.internalTrack.demuxer.isFragmented ? r : this.performFragmentedLookup(null, (n)=>n.trackData.get(this.internalTrack.id) ? {
                    sampleIndex: 0,
                    correctSampleFound: !0
                } : {
                    sampleIndex: -1,
                    correctSampleFound: !1
                }, -1 / 0, 1 / 0, e);
        }
        mapTimestampIntoTimescale(e) {
            return Br(e * this.internalTrack.timescale) + this.internalTrack.editListOffset;
        }
        async getPacket(e, r) {
            const n = this.mapTimestampIntoTimescale(e), i = this.internalTrack.demuxer.getSampleTableForTrack(this.internalTrack), s = ci(i, n), a = await this.fetchPacketForSampleIndex(s, r);
            return !xs(i) || !this.internalTrack.demuxer.isFragmented ? a : this.performFragmentedLookup(null, (o)=>{
                const c = o.trackData.get(this.internalTrack.id);
                if (!c) return {
                    sampleIndex: -1,
                    correctSampleFound: !1
                };
                const u = K(c.presentationTimestamps, n, (f)=>f.presentationTimestamp), l = u !== -1 ? c.presentationTimestamps[u].sampleIndex : -1, d = u !== -1 && n < c.endTimestamp;
                return {
                    sampleIndex: l,
                    correctSampleFound: d
                };
            }, n, n, r);
        }
        async getNextPacket(e, r) {
            const n = this.packetToSampleIndex.get(e);
            if (n !== void 0) return this.fetchPacketForSampleIndex(n + 1, r);
            const i = this.packetToFragmentLocation.get(e);
            if (i === void 0) throw new Error("Packet was not created from this track.");
            return this.performFragmentedLookup(i.fragment, (s)=>{
                if (s === i.fragment) {
                    const a = s.trackData.get(this.internalTrack.id);
                    if (i.sampleIndex + 1 < a.samples.length) return {
                        sampleIndex: i.sampleIndex + 1,
                        correctSampleFound: !0
                    };
                } else if (s.trackData.get(this.internalTrack.id)) return {
                    sampleIndex: 0,
                    correctSampleFound: !0
                };
                return {
                    sampleIndex: -1,
                    correctSampleFound: !1
                };
            }, -1 / 0, 1 / 0, r);
        }
        async getKeyPacket(e, r) {
            const n = this.mapTimestampIntoTimescale(e), i = this.internalTrack.demuxer.getSampleTableForTrack(this.internalTrack), s = Kc(i, n), a = await this.fetchPacketForSampleIndex(s, r);
            return !xs(i) || !this.internalTrack.demuxer.isFragmented ? a : this.performFragmentedLookup(null, (o)=>{
                const c = o.trackData.get(this.internalTrack.id);
                if (!c) return {
                    sampleIndex: -1,
                    correctSampleFound: !1
                };
                const u = Si(c.presentationTimestamps, (f)=>c.samples[f.sampleIndex].isKeyFrame && f.presentationTimestamp <= n), l = u !== -1 ? c.presentationTimestamps[u].sampleIndex : -1, d = u !== -1 && n < c.endTimestamp;
                return {
                    sampleIndex: l,
                    correctSampleFound: d
                };
            }, n, n, r);
        }
        async getNextKeyPacket(e, r) {
            const n = this.packetToSampleIndex.get(e);
            if (n !== void 0) {
                const s = this.internalTrack.demuxer.getSampleTableForTrack(this.internalTrack), a = Qc(s, n);
                return this.fetchPacketForSampleIndex(a, r);
            }
            const i = this.packetToFragmentLocation.get(e);
            if (i === void 0) throw new Error("Packet was not created from this track.");
            return this.performFragmentedLookup(i.fragment, (s)=>{
                if (s === i.fragment) {
                    const o = s.trackData.get(this.internalTrack.id).samples.findIndex((c, u)=>c.isKeyFrame && u > i.sampleIndex);
                    if (o !== -1) return {
                        sampleIndex: o,
                        correctSampleFound: !0
                    };
                } else {
                    const a = s.trackData.get(this.internalTrack.id);
                    if (a && a.firstKeyFrameTimestamp !== null) {
                        const o = a.samples.findIndex((c)=>c.isKeyFrame);
                        return p(o !== -1), {
                            sampleIndex: o,
                            correctSampleFound: !0
                        };
                    }
                }
                return {
                    sampleIndex: -1,
                    correctSampleFound: !1
                };
            }, -1 / 0, 1 / 0, r);
        }
        async fetchPacketForSampleIndex(e, r) {
            if (e === -1) return null;
            const n = this.internalTrack.demuxer.getSampleTableForTrack(this.internalTrack), i = Xc(n, e);
            if (!i) return null;
            let s;
            if (r.metadataOnly) s = Ee;
            else {
                let u = this.internalTrack.demuxer.reader.requestSlice(i.sampleOffset, i.sampleSize);
                if (u instanceof Promise && (u = await u), !u) return null;
                if (s = O(u, i.sampleSize), this.internalTrack.encryptionAuxInfo) {
                    p(this.internalTrack.encryptionInfo);
                    const l = await eo(this.internalTrack.demuxer.reader, this.internalTrack.encryptionInfo, this.internalTrack.encryptionAuxInfo);
                    e < l.length && (s = await Cs(this.internalTrack, l[e], s, null));
                }
            }
            const a = (i.presentationTimestamp - this.internalTrack.editListOffset) / this.internalTrack.timescale, o = i.duration / this.internalTrack.timescale, c = new te(s, i.isKeyFrame ? "key" : "delta", a, o, e, i.sampleSize);
            return this.packetToSampleIndex.set(c, e), c;
        }
        async fetchPacketInFragment(e, r, n) {
            if (r === -1) return null;
            const s = e.trackData.get(this.internalTrack.id).samples[r];
            p(s);
            let a;
            if (n.metadataOnly) a = Ee;
            else {
                let l = this.internalTrack.demuxer.reader.requestSlice(s.byteOffset, s.byteSize);
                if (l instanceof Promise && (l = await l), !l) return null;
                a = O(l, s.byteSize), s.encryption && (a = await Cs(this.internalTrack, s.encryption, a, e));
            }
            const o = (s.presentationTimestamp - this.internalTrack.editListOffset) / this.internalTrack.timescale, c = s.duration / this.internalTrack.timescale, u = new te(a, s.isKeyFrame ? "key" : "delta", o, c, e.moofOffset + r, s.byteSize);
            return this.packetToFragmentLocation.set(u, {
                fragment: e,
                sampleIndex: r
            }), u;
        }
        async performFragmentedLookup(e, r, n, i, s) {
            const a = this.internalTrack.demuxer;
            let o = null, c = null, u = -1;
            if (e) {
                const { sampleIndex: b, correctSampleFound: _ } = r(e);
                if (_) return this.fetchPacketInFragment(e, b, s);
                b !== -1 && (c = e, u = b);
            }
            const l = K(this.internalTrack.fragmentLookupTable, n, (b)=>b.timestamp), d = l !== -1 ? this.internalTrack.fragmentLookupTable[l] : null, f = K(this.internalTrack.fragmentPositionCache, n, (b)=>b.startTimestamp), h = f !== -1 ? this.internalTrack.fragmentPositionCache[f] : null, g = Math.max(d?.moofOffset ?? 0, h?.moofOffset ?? 0) || null;
            let m;
            for(e ? g === null || e.moofOffset >= g ? (m = e.moofOffset + e.moofSize, o = e) : m = g : m = g ?? 0;;){
                if (o) {
                    const y = o.trackData.get(this.internalTrack.id);
                    if (y && y.startTimestamp > i) break;
                }
                let b = a.reader.requestSliceRange(m, rt, Ft);
                if (b instanceof Promise && (b = await b), !b) break;
                const _ = m, w = gt(b);
                if (!w) break;
                if (w.name === "moof") {
                    o = await a.readFragment(_);
                    const { sampleIndex: y, correctSampleFound: T } = r(o);
                    if (T) return this.fetchPacketInFragment(o, y, s);
                    y !== -1 && (c = o, u = y);
                }
                m = _ + w.totalSize;
            }
            if (d && (!c || c.moofOffset < d.moofOffset)) {
                const b = this.internalTrack.fragmentLookupTable[l - 1];
                p(!b || b.timestamp < d.timestamp);
                const _ = b?.timestamp ?? -1 / 0;
                return this.performFragmentedLookup(null, r, _, i, s);
            }
            return c ? this.fetchPacketInFragment(c, u, s) : null;
        }
    }
    class Ts extends Ja {
        constructor(e){
            super(e), this.decoderConfigPromise = null, this.internalTrack = e;
        }
        getType() {
            return "video";
        }
        getCodec() {
            return this.internalTrack.info.codec;
        }
        getCodedWidth() {
            return this.internalTrack.info.width;
        }
        getCodedHeight() {
            return this.internalTrack.info.height;
        }
        getSquarePixelWidth() {
            return this.internalTrack.info.squarePixelWidth;
        }
        getSquarePixelHeight() {
            return this.internalTrack.info.squarePixelHeight;
        }
        getRotation() {
            return this.internalTrack.rotation;
        }
        async getColorSpace() {
            return {
                primaries: this.internalTrack.info.colorSpace?.primaries,
                transfer: this.internalTrack.info.colorSpace?.transfer,
                matrix: this.internalTrack.info.colorSpace?.matrix,
                fullRange: this.internalTrack.info.colorSpace?.fullRange
            };
        }
        async canBeTransparent() {
            return !1;
        }
        async getDecoderConfig() {
            return this.internalTrack.info.codec ? this.decoderConfigPromise ??= (async ()=>{
                if (this.internalTrack.info.codec === "vp9" && !this.internalTrack.info.vp9CodecInfo) {
                    const r = await this.getFirstPacket({});
                    this.internalTrack.info.vp9CodecInfo = r && Ua(r.data);
                } else if (this.internalTrack.info.codec === "av1" && !this.internalTrack.info.av1CodecInfo) {
                    const r = await this.getFirstPacket({});
                    this.internalTrack.info.av1CodecInfo = r && Wa(r.data);
                }
                const e = {
                    codec: Ri(this.internalTrack.info),
                    codedWidth: this.internalTrack.info.width,
                    codedHeight: this.internalTrack.info.height,
                    description: this.internalTrack.info.codecDescription ?? void 0,
                    colorSpace: this.internalTrack.info.colorSpace ?? void 0
                };
                return (this.internalTrack.info.width !== this.internalTrack.info.squarePixelWidth || this.internalTrack.info.height !== this.internalTrack.info.squarePixelHeight) && (e.displayAspectWidth = this.internalTrack.info.squarePixelWidth, e.displayAspectHeight = this.internalTrack.info.squarePixelHeight), e;
            })() : null;
        }
    }
    class Ss extends Ja {
        constructor(e){
            super(e), this.decoderConfig = null, this.internalTrack = e;
        }
        getType() {
            return "audio";
        }
        getCodec() {
            return this.internalTrack.info.codec;
        }
        getNumberOfChannels() {
            return this.internalTrack.info.numberOfChannels;
        }
        getSampleRate() {
            return this.internalTrack.info.sampleRate;
        }
        async getDecoderConfig() {
            return this.internalTrack.info.codec ? this.decoderConfig ??= {
                codec: Mi(this.internalTrack.info),
                numberOfChannels: this.internalTrack.info.numberOfChannels,
                sampleRate: this.internalTrack.info.sampleRate,
                description: this.internalTrack.info.codecDescription ?? void 0
            } : null;
        }
    }
    const ci = (t, e)=>{
        if (t.presentationTimestamps) {
            const r = K(t.presentationTimestamps, e, (n)=>n.presentationTimestamp);
            return r === -1 ? -1 : t.presentationTimestamps[r].sampleIndex;
        } else {
            const r = K(t.sampleTimingEntries, e, (i)=>i.startDecodeTimestamp);
            if (r === -1) return -1;
            const n = t.sampleTimingEntries[r];
            return n.startIndex + Math.min(Math.floor((e - n.startDecodeTimestamp) / n.delta), n.count - 1);
        }
    }, Kc = (t, e)=>{
        if (!t.keySampleIndices) return ci(t, e);
        if (t.presentationTimestamps) {
            const r = K(t.presentationTimestamps, e, (n)=>n.presentationTimestamp);
            if (r === -1) return -1;
            for(let n = r; n >= 0; n--){
                const i = t.presentationTimestamps[n].sampleIndex;
                if (Nr(t.keySampleIndices, i, (a)=>a) !== -1) return i;
            }
            return -1;
        } else {
            const r = ci(t, e), n = K(t.keySampleIndices, r, (i)=>i);
            return t.keySampleIndices[n] ?? -1;
        }
    }, Xc = (t, e)=>{
        const r = K(t.sampleTimingEntries, e, (_)=>_.startIndex), n = t.sampleTimingEntries[r];
        if (!n || n.startIndex + n.count <= e) return null;
        let s = n.startDecodeTimestamp + (e - n.startIndex) * n.delta;
        const a = K(t.sampleCompositionTimeOffsets, e, (_)=>_.startIndex), o = t.sampleCompositionTimeOffsets[a];
        o && e - o.startIndex < o.count && (s += o.offset);
        const c = t.sampleSizes[Math.min(e, t.sampleSizes.length - 1)], u = K(t.sampleToChunk, e, (_)=>_.startSampleIndex), l = t.sampleToChunk[u];
        p(l);
        const d = l.startChunkIndex + Math.floor((e - l.startSampleIndex) / l.samplesPerChunk), f = t.chunkOffsets[d], h = l.startSampleIndex + (d - l.startChunkIndex) * l.samplesPerChunk;
        let g = 0, m = f;
        if (t.sampleSizes.length === 1) m += c * (e - h), g += c * l.samplesPerChunk;
        else for(let _ = h; _ < h + l.samplesPerChunk; _++){
            const w = t.sampleSizes[_];
            _ < e && (m += w), g += w;
        }
        let b = n.delta;
        if (t.presentationTimestamps) {
            const _ = t.presentationTimestampIndexMap[e];
            p(_ !== void 0), _ < t.presentationTimestamps.length - 1 && (b = t.presentationTimestamps[_ + 1].presentationTimestamp - s);
        }
        return {
            presentationTimestamp: s,
            duration: b,
            sampleOffset: m,
            sampleSize: c,
            chunkOffset: f,
            chunkSize: g,
            isKeyFrame: t.keySampleIndices ? Nr(t.keySampleIndices, e, (_)=>_) !== -1 : !0
        };
    }, Qc = (t, e)=>{
        if (!t.keySampleIndices) return e + 1;
        const r = K(t.keySampleIndices, e, (n)=>n);
        return t.keySampleIndices[r + 1] ?? -1;
    }, Ln = (t, e)=>{
        t.startTimestamp += e, t.endTimestamp += e;
        for (const r of t.samples)r.presentationTimestamp += e;
        for (const r of t.presentationTimestamps)r.presentationTimestamp += e;
    }, Yc = (t)=>{
        const [e, r] = t, n = Math.atan2(r, e);
        return Number.isFinite(n) ? n * (180 / Math.PI) : 0;
    }, xs = (t)=>t.sampleSizes.length === 0, Ps = (t)=>t.currentFragmentState ? t.currentFragmentState.encryptionAuxInfo ??= {
            defaultSampleInfoSize: 0,
            sampleSizes: null,
            sampleCount: 0,
            offset: null,
            resolved: null
        } : t.encryptionAuxInfo ??= {
            defaultSampleInfoSize: 0,
            sampleSizes: null,
            sampleCount: 0,
            offset: null,
            resolved: null
        }, eo = async (t, e, r)=>{
        if (r.resolved) return r.resolved;
        if (r.offset === null || r.sampleCount === 0) throw new Error("Incomplete saiz/saio info; cannot resolve encryption data.");
        let n = 0;
        if (r.defaultSampleInfoSize > 0) n = r.defaultSampleInfoSize * r.sampleCount;
        else {
            p(r.sampleSizes);
            for(let o = 0; o < r.sampleCount; o++)n += r.sampleSizes[o];
        }
        let i = t.requestSlice(r.offset, n);
        if (i instanceof Promise && (i = await i), !i) throw new Error("Failed to read auxiliary encryption info.");
        const s = e.defaultPerSampleIvSize;
        p(s !== null);
        const a = [];
        for(let o = 0; o < r.sampleCount; o++){
            const c = r.defaultSampleInfoSize > 0 ? r.defaultSampleInfoSize : r.sampleSizes[o], u = new Uint8Array(16);
            s > 0 ? u.set(O(i, s), 0) : u.set(e.defaultConstantIv, 0);
            let l = null;
            if (c > s) {
                const d = ce(i);
                l = [];
                for(let f = 0; f < d; f++){
                    const h = ce(i), g = A(i);
                    l.push({
                        clearLen: h,
                        protectedLen: g
                    });
                }
            }
            a.push({
                iv: u,
                subsamples: l
            });
        }
        return r.resolved = a, a;
    }, Cs = async (t, e, r, n)=>{
        p(t.encryptionInfo);
        const i = t.encryptionInfo;
        p(i.defaultKid !== null);
        const s = i.defaultKid;
        let a;
        const o = t.demuxer.decryptionKeyCache.get(s);
        if (o) a = await o;
        else {
            if (!t.demuxer.input._formatOptions.isobmff?.resolveKeyId) throw new Error("Encrypted media samples encountered. To decrypt them, please provide a callback for InputOptions.formatOptions.isobmff.resolveKeyId.");
            const c = (async ()=>{
                let u = t.demuxer.psshBoxes;
                if (n) {
                    u = [
                        ...u,
                        ...n.psshBoxes
                    ].filter((d)=>d.keyIds === null || d.keyIds.includes(s));
                    for(let d = 0; d < u.length - 1; d++)for(let f = d + 1; f < u.length; f++)Xa(u[d], u[f]) && (u.splice(f, 1), f--);
                }
                const l = await t.demuxer.input._formatOptions.isobmff.resolveKeyId({
                    keyId: s,
                    psshBoxes: u
                });
                if (!(typeof l == "string" && l.length === 32 && Qo.test(l) || l instanceof Uint8Array && l.byteLength === 16)) throw new TypeError("resolveKeyId must return a 32-character hex string or a 16-byte Uint8Array containing the decryption key.");
                return l instanceof Uint8Array ? l : Yo(l);
            })();
            t.demuxer.decryptionKeyCache.set(s, c), a = await c;
        }
        return i.scheme === "cenc" || i.scheme === "cens" ? Zc(a, i, e, r) : Jc(a, i, e, r);
    }, Zc = async (t, e, r, n)=>{
        const i = new Uint8Array(16);
        i.set(r.iv, 0);
        const s = await crypto.subtle.importKey("raw", t, {
            name: "AES-CTR"
        }, !1, [
            "decrypt"
        ]), a = async (g)=>{
            const m = await crypto.subtle.decrypt({
                name: "AES-CTR",
                counter: i,
                length: 64
            }, s, g);
            return new Uint8Array(m);
        };
        if (!r.subsamples) return a(n);
        p(e.defaultCryptByteBlock !== null && e.defaultSkipByteBlock !== null);
        const o = to(r.subsamples, e.defaultCryptByteBlock, e.defaultSkipByteBlock);
        let c = 0;
        for (const g of o)for (const m of g.perSubsample)c += m.length;
        const u = new Uint8Array(c);
        let l = 0;
        for (const g of o)for (const m of g.perSubsample)u.set(n.subarray(m.offset, m.offset + m.length), l), l += m.length;
        const d = await a(u), f = new Uint8Array(n);
        let h = 0;
        for (const g of o)for (const m of g.perSubsample)f.set(d.subarray(h, h + m.length), m.offset), h += m.length;
        return f;
    }, Jc = (t, e, r, n)=>{
        const i = new Za;
        i.init({
            key: t,
            iv: r.iv
        });
        const s = e.defaultCryptByteBlock, a = e.defaultSkipByteBlock;
        if (p(s !== null && a !== null), !r.subsamples) {
            const l = new Uint8Array(n), d = Math.floor(n.length / 16);
            for(let f = 0; f < d; f++){
                const h = f * 16;
                i.in.set(n.subarray(h, h + 16)), i.decrypt(), l.set(i.out, h);
            }
            return l;
        }
        if (s === 0 && a === 0) throw new Error("cbcs with subsamples requires pattern encryption.");
        const o = new Uint8Array(n), c = to(r.subsamples, s, a), u = new DataView(r.iv.buffer, r.iv.byteOffset, 16);
        for (const l of c){
            i.iv[0] = u.getUint32(0, !1), i.iv[1] = u.getUint32(4, !1), i.iv[2] = u.getUint32(8, !1), i.iv[3] = u.getUint32(12, !1);
            for (const d of l.perSubsample){
                const f = d.length / 16;
                for(let h = 0; h < f; h++){
                    const g = d.offset + h * 16;
                    i.in.set(n.subarray(g, g + 16)), i.decrypt(), o.set(i.out, g);
                }
            }
        }
        return o;
    }, to = (t, e, r)=>{
        const n = [], i = e !== 0 || r !== 0;
        let s = 0;
        for (const a of t){
            s += a.clearLen;
            const o = [];
            if (!i) a.protectedLen > 0 && o.push({
                offset: s,
                length: a.protectedLen
            }), s += a.protectedLen;
            else {
                let c = a.protectedLen, u = s;
                for(; c > 0 && !(c < 16 * e);){
                    const l = 16 * e;
                    o.push({
                        offset: u,
                        length: l
                    }), u += l, c -= l;
                    const d = Math.min(16 * r, c);
                    u += d, c -= d;
                }
                s += a.protectedLen;
            }
            n.push({
                perSubsample: o
            });
        }
        return n;
    };
    class ui {
        constructor(e){
            this.value = e;
        }
    }
    class li {
        constructor(e){
            this.value = e;
        }
    }
    class ro {
        constructor(e){
            this.value = e;
        }
    }
    class mt {
        constructor(e){
            this.value = e;
        }
    }
    var k;
    (function(t) {
        t[t.EBML = 440786851] = "EBML", t[t.EBMLVersion = 17030] = "EBMLVersion", t[t.EBMLReadVersion = 17143] = "EBMLReadVersion", t[t.EBMLMaxIDLength = 17138] = "EBMLMaxIDLength", t[t.EBMLMaxSizeLength = 17139] = "EBMLMaxSizeLength", t[t.DocType = 17026] = "DocType", t[t.DocTypeVersion = 17031] = "DocTypeVersion", t[t.DocTypeReadVersion = 17029] = "DocTypeReadVersion", t[t.Void = 236] = "Void", t[t.Segment = 408125543] = "Segment", t[t.SeekHead = 290298740] = "SeekHead", t[t.Seek = 19899] = "Seek", t[t.SeekID = 21419] = "SeekID", t[t.SeekPosition = 21420] = "SeekPosition", t[t.Duration = 17545] = "Duration", t[t.Info = 357149030] = "Info", t[t.TimestampScale = 2807729] = "TimestampScale", t[t.MuxingApp = 19840] = "MuxingApp", t[t.WritingApp = 22337] = "WritingApp", t[t.Tracks = 374648427] = "Tracks", t[t.TrackEntry = 174] = "TrackEntry", t[t.TrackNumber = 215] = "TrackNumber", t[t.TrackUID = 29637] = "TrackUID", t[t.TrackType = 131] = "TrackType", t[t.FlagEnabled = 185] = "FlagEnabled", t[t.FlagDefault = 136] = "FlagDefault", t[t.FlagForced = 21930] = "FlagForced", t[t.FlagOriginal = 21934] = "FlagOriginal", t[t.FlagHearingImpaired = 21931] = "FlagHearingImpaired", t[t.FlagVisualImpaired = 21932] = "FlagVisualImpaired", t[t.FlagCommentary = 21935] = "FlagCommentary", t[t.FlagLacing = 156] = "FlagLacing", t[t.Name = 21358] = "Name", t[t.Language = 2274716] = "Language", t[t.LanguageBCP47 = 2274717] = "LanguageBCP47", t[t.CodecID = 134] = "CodecID", t[t.CodecPrivate = 25506] = "CodecPrivate", t[t.CodecDelay = 22186] = "CodecDelay", t[t.SeekPreRoll = 22203] = "SeekPreRoll", t[t.DefaultDuration = 2352003] = "DefaultDuration", t[t.Video = 224] = "Video", t[t.PixelWidth = 176] = "PixelWidth", t[t.PixelHeight = 186] = "PixelHeight", t[t.DisplayWidth = 21680] = "DisplayWidth", t[t.DisplayHeight = 21690] = "DisplayHeight", t[t.DisplayUnit = 21682] = "DisplayUnit", t[t.AlphaMode = 21440] = "AlphaMode", t[t.Audio = 225] = "Audio", t[t.SamplingFrequency = 181] = "SamplingFrequency", t[t.Channels = 159] = "Channels", t[t.BitDepth = 25188] = "BitDepth", t[t.SimpleBlock = 163] = "SimpleBlock", t[t.BlockGroup = 160] = "BlockGroup", t[t.Block = 161] = "Block", t[t.BlockAdditions = 30113] = "BlockAdditions", t[t.BlockMore = 166] = "BlockMore", t[t.BlockAdditional = 165] = "BlockAdditional", t[t.BlockAddID = 238] = "BlockAddID", t[t.BlockDuration = 155] = "BlockDuration", t[t.ReferenceBlock = 251] = "ReferenceBlock", t[t.Cluster = 524531317] = "Cluster", t[t.Timestamp = 231] = "Timestamp", t[t.Cues = 475249515] = "Cues", t[t.CuePoint = 187] = "CuePoint", t[t.CueTime = 179] = "CueTime", t[t.CueTrackPositions = 183] = "CueTrackPositions", t[t.CueTrack = 247] = "CueTrack", t[t.CueClusterPosition = 241] = "CueClusterPosition", t[t.Colour = 21936] = "Colour", t[t.MatrixCoefficients = 21937] = "MatrixCoefficients", t[t.TransferCharacteristics = 21946] = "TransferCharacteristics", t[t.Primaries = 21947] = "Primaries", t[t.Range = 21945] = "Range", t[t.Projection = 30320] = "Projection", t[t.ProjectionType = 30321] = "ProjectionType", t[t.ProjectionPoseRoll = 30325] = "ProjectionPoseRoll", t[t.Attachments = 423732329] = "Attachments", t[t.AttachedFile = 24999] = "AttachedFile", t[t.FileDescription = 18046] = "FileDescription", t[t.FileName = 18030] = "FileName", t[t.FileMediaType = 18016] = "FileMediaType", t[t.FileData = 18012] = "FileData", t[t.FileUID = 18094] = "FileUID", t[t.Chapters = 272869232] = "Chapters", t[t.Tags = 307544935] = "Tags", t[t.Tag = 29555] = "Tag", t[t.Targets = 25536] = "Targets", t[t.TargetTypeValue = 26826] = "TargetTypeValue", t[t.TargetType = 25546] = "TargetType", t[t.TagTrackUID = 25541] = "TagTrackUID", t[t.TagEditionUID = 25545] = "TagEditionUID", t[t.TagChapterUID = 25540] = "TagChapterUID", t[t.TagAttachmentUID = 25542] = "TagAttachmentUID", t[t.SimpleTag = 26568] = "SimpleTag", t[t.TagName = 17827] = "TagName", t[t.TagLanguage = 17530] = "TagLanguage", t[t.TagString = 17543] = "TagString", t[t.TagBinary = 17541] = "TagBinary", t[t.ContentEncodings = 28032] = "ContentEncodings", t[t.ContentEncoding = 25152] = "ContentEncoding", t[t.ContentEncodingOrder = 20529] = "ContentEncodingOrder", t[t.ContentEncodingScope = 20530] = "ContentEncodingScope", t[t.ContentCompression = 20532] = "ContentCompression", t[t.ContentCompAlgo = 16980] = "ContentCompAlgo", t[t.ContentCompSettings = 16981] = "ContentCompSettings", t[t.ContentEncryption = 20533] = "ContentEncryption";
    })(k || (k = {}));
    const eu = [
        k.EBML,
        k.Segment
    ], Mr = [
        k.SeekHead,
        k.Info,
        k.Cluster,
        k.Tracks,
        k.Cues,
        k.Attachments,
        k.Chapters,
        k.Tags
    ], en = [
        ...eu,
        ...Mr
    ], Is = (t)=>t < 256 ? 1 : t < 65536 ? 2 : t < 1 << 24 ? 3 : t < 2 ** 32 ? 4 : t < 2 ** 40 ? 5 : 6, vs = (t)=>t < 1n << 8n ? 1 : t < 1n << 16n ? 2 : t < 1n << 24n ? 3 : t < 1n << 32n ? 4 : t < 1n << 40n ? 5 : t < 1n << 48n ? 6 : t < 1n << 56n ? 7 : 8, Es = (t)=>t >= -64 && t < 64 ? 1 : t >= -8192 && t < 8192 ? 2 : t >= -1048576 && t < 1 << 20 ? 3 : t >= -134217728 && t < 1 << 27 ? 4 : t >= -17179869184 && t < 2 ** 34 ? 5 : 6, tu = (t)=>{
        if (t < 127) return 1;
        if (t < 16383) return 2;
        if (t < (1 << 21) - 1) return 3;
        if (t < (1 << 28) - 1) return 4;
        if (t < 2 ** 35 - 1) return 5;
        if (t < 2 ** 42 - 1) return 6;
        throw new Error("EBML varint size not supported " + t);
    };
    class ru {
        constructor(e){
            this.writer = e, this.helper = new Uint8Array(8), this.helperView = new DataView(this.helper.buffer), this.offsets = new WeakMap, this.dataOffsets = new WeakMap;
        }
        writeByte(e) {
            this.helperView.setUint8(0, e), this.writer.write(this.helper.subarray(0, 1));
        }
        writeFloat32(e) {
            this.helperView.setFloat32(0, e, !1), this.writer.write(this.helper.subarray(0, 4));
        }
        writeFloat64(e) {
            this.helperView.setFloat64(0, e, !1), this.writer.write(this.helper);
        }
        writeUnsignedInt(e, r = Is(e)) {
            let n = 0;
            switch(r){
                case 6:
                    this.helperView.setUint8(n++, e / 2 ** 40 | 0);
                case 5:
                    this.helperView.setUint8(n++, e / 2 ** 32 | 0);
                case 4:
                    this.helperView.setUint8(n++, e >> 24);
                case 3:
                    this.helperView.setUint8(n++, e >> 16);
                case 2:
                    this.helperView.setUint8(n++, e >> 8);
                case 1:
                    this.helperView.setUint8(n++, e);
                    break;
                default:
                    throw new Error("Bad unsigned int size " + r);
            }
            this.writer.write(this.helper.subarray(0, n));
        }
        writeUnsignedBigInt(e, r = vs(e)) {
            let n = 0;
            for(let i = r - 1; i >= 0; i--)this.helperView.setUint8(n++, Number(e >> BigInt(i * 8) & 0xffn));
            this.writer.write(this.helper.subarray(0, n));
        }
        writeSignedInt(e, r = Es(e)) {
            e < 0 && (e += 2 ** (r * 8)), this.writeUnsignedInt(e, r);
        }
        writeVarInt(e, r = tu(e)) {
            let n = 0;
            switch(r){
                case 1:
                    this.helperView.setUint8(n++, 128 | e);
                    break;
                case 2:
                    this.helperView.setUint8(n++, 64 | e >> 8), this.helperView.setUint8(n++, e);
                    break;
                case 3:
                    this.helperView.setUint8(n++, 32 | e >> 16), this.helperView.setUint8(n++, e >> 8), this.helperView.setUint8(n++, e);
                    break;
                case 4:
                    this.helperView.setUint8(n++, 16 | e >> 24), this.helperView.setUint8(n++, e >> 16), this.helperView.setUint8(n++, e >> 8), this.helperView.setUint8(n++, e);
                    break;
                case 5:
                    this.helperView.setUint8(n++, 8 | e / 2 ** 32 & 7), this.helperView.setUint8(n++, e >> 24), this.helperView.setUint8(n++, e >> 16), this.helperView.setUint8(n++, e >> 8), this.helperView.setUint8(n++, e);
                    break;
                case 6:
                    this.helperView.setUint8(n++, 4 | e / 2 ** 40 & 3), this.helperView.setUint8(n++, e / 2 ** 32 | 0), this.helperView.setUint8(n++, e >> 24), this.helperView.setUint8(n++, e >> 16), this.helperView.setUint8(n++, e >> 8), this.helperView.setUint8(n++, e);
                    break;
                default:
                    throw new Error("Bad EBML varint size " + r);
            }
            this.writer.write(this.helper.subarray(0, n));
        }
        writeAsciiString(e) {
            this.writer.write(new Uint8Array(e.split("").map((r)=>r.charCodeAt(0))));
        }
        writeEBML(e) {
            if (e !== null) if (e instanceof Uint8Array) this.writer.write(e);
            else if (Array.isArray(e)) for (const r of e)this.writeEBML(r);
            else if (this.offsets.set(e, this.writer.getPos()), this.writeUnsignedInt(e.id), Array.isArray(e.data)) {
                const r = this.writer.getPos(), n = e.size === -1 ? 1 : e.size ?? 4;
                e.size === -1 ? this.writeByte(255) : this.writer.seek(this.writer.getPos() + n);
                const i = this.writer.getPos();
                if (this.dataOffsets.set(e, i), this.writeEBML(e.data), e.size !== -1) {
                    const s = this.writer.getPos() - i, a = this.writer.getPos();
                    this.writer.seek(r), this.writeVarInt(s, n), this.writer.seek(a);
                }
            } else if (typeof e.data == "number") {
                const r = e.size ?? Is(e.data);
                this.writeVarInt(r), this.writeUnsignedInt(e.data, r);
            } else if (typeof e.data == "bigint") {
                const r = e.size ?? vs(e.data);
                this.writeVarInt(r), this.writeUnsignedBigInt(e.data, r);
            } else if (typeof e.data == "string") this.writeVarInt(e.data.length), this.writeAsciiString(e.data);
            else if (e.data instanceof Uint8Array) this.writeVarInt(e.data.byteLength, e.size), this.writer.write(e.data);
            else if (e.data instanceof ui) this.writeVarInt(4), this.writeFloat32(e.data.value);
            else if (e.data instanceof li) this.writeVarInt(8), this.writeFloat64(e.data.value);
            else if (e.data instanceof ro) {
                const r = e.size ?? Es(e.data.value);
                this.writeVarInt(r), this.writeSignedInt(e.data.value, r);
            } else if (e.data instanceof mt) {
                const r = Se.encode(e.data.value);
                this.writeVarInt(r.length), this.writer.write(r);
            } else je(e.data);
        }
    }
    const di = 8, Be = 2, nt = 2 * di, no = (t)=>{
        if (t.remainingLength < 1) return null;
        const e = M(t);
        if (t.skip(-1), e === 0) return null;
        let r = 1, n = 128;
        for(; (e & n) === 0;)r++, n >>= 1;
        return t.remainingLength < r ? null : r;
    }, Sr = (t)=>{
        if (t.remainingLength < 1) return null;
        const e = M(t);
        if (e === 0) return null;
        let r = 1, n = 128;
        for(; (e & n) === 0;)r++, n >>= 1;
        if (t.remainingLength < r - 1) return null;
        let i = e & n - 1;
        for(let s = 1; s < r; s++)i *= 256, i += M(t);
        return i;
    }, j = (t, e)=>{
        if (e < 1 || e > 8) throw new Error("Bad unsigned int size " + e);
        let r = 0;
        for(let n = 0; n < e; n++)r *= 256, r += M(t);
        return r;
    }, nu = (t, e)=>{
        if (e < 1) throw new Error("Bad unsigned int size " + e);
        let r = 0n;
        for(let n = 0; n < e; n++)r <<= 8n, r += BigInt(M(t));
        return r;
    }, qi = (t)=>{
        const e = no(t);
        return e === null || t.remainingLength < e ? null : j(t, e);
    }, io = (t)=>{
        if (t.remainingLength < 1) return null;
        if (M(t) === 255) return;
        t.skip(-1);
        const r = Sr(t);
        if (r === null) return null;
        if (r !== 72057594037927940) return r;
    }, tt = (t)=>{
        p(t.remainingLength >= Be);
        const e = qi(t);
        if (e === null) return null;
        const r = io(t);
        return r === null ? null : {
            id: e,
            size: r
        };
    }, Yt = (t, e)=>{
        const r = O(t, e);
        let n = 0;
        for(; n < e && r[n] !== 0;)n += 1;
        return String.fromCharCode(...r.subarray(0, n));
    }, hr = (t, e)=>{
        const r = O(t, e);
        let n = 0;
        for(; n < e && r[n] !== 0;)n += 1;
        return ve.decode(r.subarray(0, n));
    }, Wn = (t, e)=>{
        if (e === 0) return 0;
        if (e !== 4 && e !== 8) throw new Error("Bad float size " + e);
        return e === 4 ? $l(t) : Eo(t);
    }, fi = async (t, e, r, n)=>{
        const i = new Set(r);
        let s = e;
        for(; n === null || s < n;){
            let a = t.requestSliceRange(s, Be, nt);
            if (a instanceof Promise && (a = await a), !a) break;
            const o = tt(a);
            if (!o) break;
            if (i.has(o.id)) return {
                pos: s,
                found: !0
            };
            pt(o.size), s = a.filePos + o.size;
        }
        return {
            pos: n !== null && n > s ? n : s,
            found: !1
        };
    }, so = async (t, e, r, n)=>{
        const s = new Set(r);
        let a = e;
        for(; a < n;){
            let o = t.requestSliceRange(a, 0, Math.min(65536, n - a));
            if (o instanceof Promise && (o = await o), !o || o.length < di) break;
            for(let c = 0; c < o.length - di; c++){
                o.filePos = a;
                const u = qi(o);
                if (u !== null && s.has(u)) return a;
                a++;
            }
        }
        return null;
    }, Pe = {
        avc: "V_MPEG4/ISO/AVC",
        hevc: "V_MPEGH/ISO/HEVC",
        vp8: "V_VP8",
        vp9: "V_VP9",
        av1: "V_AV1",
        aac: "A_AAC",
        mp3: "A_MPEG/L3",
        opus: "A_OPUS",
        vorbis: "A_VORBIS",
        flac: "A_FLAC",
        ac3: "A_AC3",
        eac3: "A_EAC3",
        "pcm-u8": "A_PCM/INT/LIT",
        "pcm-s16": "A_PCM/INT/LIT",
        "pcm-s16be": "A_PCM/INT/BIG",
        "pcm-s24": "A_PCM/INT/LIT",
        "pcm-s24be": "A_PCM/INT/BIG",
        "pcm-s32": "A_PCM/INT/LIT",
        "pcm-s32be": "A_PCM/INT/BIG",
        "pcm-f32": "A_PCM/FLOAT/IEEE",
        "pcm-f64": "A_PCM/FLOAT/IEEE",
        webvtt: "S_TEXT/WEBVTT"
    };
    function pt(t) {
        if (t === void 0) throw new Error("Undefined element size is used in a place where it is not supported.");
    }
    const ao = (t)=>{
        let r = (t.hasVideo ? "video/" : t.hasAudio ? "audio/" : "application/") + (t.isWebM ? "webm" : "x-matroska");
        if (t.codecStrings.length > 0) {
            const n = [
                ...new Set(t.codecStrings.filter(Boolean))
            ];
            r += `; codecs="${n.join(", ")}"`;
        }
        return r;
    };
    var Ze;
    (function(t) {
        t[t.None = 0] = "None", t[t.Xiph = 1] = "Xiph", t[t.FixedSize = 2] = "FixedSize", t[t.Ebml = 3] = "Ebml";
    })(Ze || (Ze = {}));
    var fn;
    (function(t) {
        t[t.Block = 1] = "Block", t[t.Private = 2] = "Private", t[t.Next = 4] = "Next";
    })(fn || (fn = {}));
    var Cr;
    (function(t) {
        t[t.Zlib = 0] = "Zlib", t[t.Bzlib = 1] = "Bzlib", t[t.lzo1x = 2] = "lzo1x", t[t.HeaderStripping = 3] = "HeaderStripping";
    })(Cr || (Cr = {}));
    const Vn = [
        {
            id: k.SeekHead,
            flag: "seekHeadSeen"
        },
        {
            id: k.Info,
            flag: "infoSeen"
        },
        {
            id: k.Tracks,
            flag: "tracksSeen"
        },
        {
            id: k.Cues,
            flag: "cuesSeen"
        }
    ], oo = 10 * 2 ** 20;
    class iu extends ft {
        constructor(e){
            super(e), this.readMetadataPromise = null, this.segments = [], this.currentSegment = null, this.currentTrack = null, this.currentCluster = null, this.currentBlock = null, this.currentBlockAdditional = null, this.currentCueTime = null, this.currentDecodingInstruction = null, this.currentTagTargetIsMovie = !0, this.currentSimpleTagName = null, this.currentAttachedFile = null, this.isWebM = !1, this.reader = e._reader;
        }
        async getTrackBackings() {
            return await this.readMetadata(), this.segments.flatMap((e)=>e.tracks.map((r)=>r.trackBacking));
        }
        async getMimeType() {
            await this.readMetadata();
            const e = await this.getTrackBackings(), r = await Promise.all(e.map((n)=>n.getDecoderConfig().then((i)=>i?.codec ?? null)));
            return ao({
                isWebM: this.isWebM,
                hasVideo: this.segments.some((n)=>n.tracks.some((i)=>i.info?.type === "video")),
                hasAudio: this.segments.some((n)=>n.tracks.some((i)=>i.info?.type === "audio")),
                codecStrings: r.filter(Boolean)
            });
        }
        async getMetadataTags() {
            await this.readMetadata();
            for (const r of this.segments)r.metadataTagsCollected || (this.reader.fileSize !== null && await this.loadSegmentMetadata(r), r.metadataTagsCollected = !0);
            let e = {};
            for (const r of this.segments)e = {
                ...e,
                ...r.metadataTags
            };
            return e;
        }
        readMetadata() {
            return this.readMetadataPromise ??= (async ()=>{
                let e = 0;
                for(;;){
                    let r = this.reader.requestSliceRange(e, Be, nt);
                    if (r instanceof Promise && (r = await r), !r) break;
                    const n = tt(r);
                    if (!n) break;
                    const i = n.id;
                    let s = n.size;
                    const a = r.filePos;
                    if (i === k.EBML) {
                        pt(s);
                        let o = this.reader.requestSlice(a, s);
                        if (o instanceof Promise && (o = await o), !o) break;
                        this.readContiguousElements(o);
                    } else if (i === k.Segment) {
                        if (await this.readSegment(a, s), s === void 0 || this.reader.fileSize === null) break;
                    } else if (i === k.Cluster) {
                        if (this.reader.fileSize === null) break;
                        s === void 0 && (s = (await fi(this.reader, a, en, this.reader.fileSize)).pos - a);
                        const o = ie(this.segments);
                        o && (o.elementEndPos = a + s);
                    }
                    pt(s), e = a + s;
                }
            })();
        }
        async readSegment(e, r) {
            this.currentSegment = {
                seekHeadSeen: !1,
                infoSeen: !1,
                tracksSeen: !1,
                cuesSeen: !1,
                tagsSeen: !1,
                attachmentsSeen: !1,
                timestampScale: -1,
                timestampFactor: -1,
                duration: -1,
                seekEntries: [],
                tracks: [],
                cuePoints: [],
                dataStartPos: e,
                elementEndPos: r === void 0 ? null : e + r,
                clusterSeekStartPos: e,
                lastReadCluster: null,
                metadataTags: {},
                metadataTagsCollected: !1
            }, this.segments.push(this.currentSegment);
            let n = e;
            for(; this.currentSegment.elementEndPos === null || n < this.currentSegment.elementEndPos;){
                let o = this.reader.requestSliceRange(n, Be, nt);
                if (o instanceof Promise && (o = await o), !o) break;
                const c = n, u = tt(o);
                if (!u || !Mr.includes(u.id) && u.id !== k.Void) {
                    const g = await so(this.reader, c, Mr, Math.min(this.currentSegment.elementEndPos ?? 1 / 0, c + oo));
                    if (g) {
                        n = g;
                        continue;
                    } else break;
                }
                const { id: l, size: d } = u, f = o.filePos, h = Vn.findIndex((g)=>g.id === l);
                if (h !== -1) {
                    const g = Vn[h].flag;
                    this.currentSegment[g] = !0, pt(d);
                    let m = this.reader.requestSlice(f, d);
                    m instanceof Promise && (m = await m), m && this.readContiguousElements(m);
                } else if (l === k.Tags || l === k.Attachments) {
                    l === k.Tags ? this.currentSegment.tagsSeen = !0 : this.currentSegment.attachmentsSeen = !0, pt(d);
                    let g = this.reader.requestSlice(f, d);
                    g instanceof Promise && (g = await g), g && this.readContiguousElements(g);
                } else if (l === k.Cluster) {
                    this.currentSegment.clusterSeekStartPos = c;
                    break;
                }
                if (d === void 0) break;
                n = f + d;
            }
            if (this.currentSegment.seekEntries.sort((o, c)=>o.segmentPosition - c.segmentPosition), this.reader.fileSize !== null) for (const o of this.currentSegment.seekEntries){
                const c = Vn.find((g)=>g.id === o.id);
                if (!c || this.currentSegment[c.flag]) continue;
                let u = this.reader.requestSliceRange(e + o.segmentPosition, Be, nt);
                if (u instanceof Promise && (u = await u), !u) continue;
                const l = tt(u);
                if (!l) continue;
                const { id: d, size: f } = l;
                if (d !== c.id) continue;
                pt(f), this.currentSegment[c.flag] = !0;
                let h = this.reader.requestSlice(u.filePos, f);
                h instanceof Promise && (h = await h), h && this.readContiguousElements(h);
            }
            this.currentSegment.timestampScale === -1 && (this.currentSegment.timestampScale = 1e6, this.currentSegment.timestampFactor = 1e9 / 1e6);
            for (const o of this.currentSegment.tracks)o.defaultDurationNs !== null && (o.defaultDuration = this.currentSegment.timestampFactor * o.defaultDurationNs / 1e9);
            const i = new Map(this.currentSegment.tracks.map((o)=>[
                    o.id,
                    o
                ]));
            for (const o of this.currentSegment.cuePoints){
                const c = i.get(o.trackId);
                c && c.cuePoints.push(o);
            }
            for (const o of this.currentSegment.tracks){
                o.cuePoints.sort((c, u)=>c.time - u.time);
                for(let c = 0; c < o.cuePoints.length - 1; c++){
                    const u = o.cuePoints[c], l = o.cuePoints[c + 1];
                    u.time === l.time && (o.cuePoints.splice(c + 1, 1), c--);
                }
            }
            let s = null, a = -1 / 0;
            for (const o of this.currentSegment.tracks)o.cuePoints.length > a && (a = o.cuePoints.length, s = o);
            for (const o of this.currentSegment.tracks)o.cuePoints.length === 0 && (o.cuePoints = s.cuePoints);
            this.currentSegment = null;
        }
        async readCluster(e, r) {
            if (r.lastReadCluster?.elementStartPos === e) return r.lastReadCluster;
            let n = this.reader.requestSliceRange(e, Be, nt);
            n instanceof Promise && (n = await n), p(n);
            const i = e, s = tt(n);
            p(s);
            const a = s.id;
            p(a === k.Cluster);
            let o = s.size;
            const c = n.filePos;
            o === void 0 && (o = (await fi(this.reader, c, en, r.elementEndPos)).pos - c);
            let u = this.reader.requestSlice(c, o);
            u instanceof Promise && (u = await u);
            const l = {
                segment: r,
                elementStartPos: i,
                elementEndPos: c + o,
                dataStartPos: c,
                timestamp: -1,
                trackData: new Map
            };
            if (this.currentCluster = l, u) {
                const d = this.readContiguousElements(u, en);
                l.elementEndPos = d;
            }
            for (const [, d] of l.trackData){
                const f = d.track;
                p(d.blocks.length > 0);
                let h = !1;
                for(let _ = 0; _ < d.blocks.length; _++){
                    const w = d.blocks[_];
                    w.timestamp += l.timestamp, h ||= w.lacing !== Ze.None;
                }
                d.presentationTimestamps = d.blocks.map((_, w)=>({
                        timestamp: _.timestamp,
                        blockIndex: w
                    })).sort((_, w)=>_.timestamp - w.timestamp);
                for(let _ = 0; _ < d.presentationTimestamps.length; _++){
                    const w = d.presentationTimestamps[_], y = d.blocks[w.blockIndex];
                    if (d.firstKeyFrameTimestamp === null && y.isKeyFrame && (d.firstKeyFrameTimestamp = y.timestamp), _ < d.presentationTimestamps.length - 1) {
                        const T = d.presentationTimestamps[_ + 1];
                        y.duration = T.timestamp - y.timestamp;
                    } else y.duration === 0 && f.defaultDuration != null && y.lacing === Ze.None && (y.duration = f.defaultDuration);
                }
                h && (this.expandLacedBlocks(d.blocks, f), d.presentationTimestamps = d.blocks.map((_, w)=>({
                        timestamp: _.timestamp,
                        blockIndex: w
                    })).sort((_, w)=>_.timestamp - w.timestamp));
                const g = d.blocks[d.presentationTimestamps[0].blockIndex], m = d.blocks[ie(d.presentationTimestamps).blockIndex];
                d.startTimestamp = g.timestamp, d.endTimestamp = m.timestamp + m.duration;
                const b = K(f.clusterPositionCache, d.startTimestamp, (_)=>_.startTimestamp);
                (b === -1 || f.clusterPositionCache[b].elementStartPos !== i) && f.clusterPositionCache.splice(b + 1, 0, {
                    elementStartPos: l.elementStartPos,
                    startTimestamp: d.startTimestamp
                });
            }
            return r.lastReadCluster = l, l;
        }
        getTrackDataInCluster(e, r) {
            let n = e.trackData.get(r);
            if (!n) {
                const i = e.segment.tracks.find((s)=>s.id === r);
                if (!i) return null;
                n = {
                    track: i,
                    startTimestamp: 0,
                    endTimestamp: 0,
                    firstKeyFrameTimestamp: null,
                    blocks: [],
                    presentationTimestamps: []
                }, e.trackData.set(r, n);
            }
            return n;
        }
        expandLacedBlocks(e, r) {
            for(let n = 0; n < e.length; n++){
                const i = e[n];
                if (i.lacing === Ze.None) continue;
                i.decoded || (i.data = this.decodeBlockData(r, i.data), i.decoded = !0);
                const s = ye.tempFromBytes(i.data), a = [], o = M(s) + 1;
                switch(i.lacing){
                    case Ze.Xiph:
                        {
                            let u = 0;
                            for(let l = 0; l < o - 1; l++){
                                let d = 0;
                                for(; s.bufferPos < s.length;){
                                    const f = M(s);
                                    if (d += f, f < 255) {
                                        a.push(d), u += d;
                                        break;
                                    }
                                }
                            }
                            a.push(s.length - (s.bufferPos + u));
                        }
                        break;
                    case Ze.FixedSize:
                        {
                            const u = s.length - 1, l = Math.floor(u / o);
                            for(let d = 0; d < o; d++)a.push(l);
                        }
                        break;
                    case Ze.Ebml:
                        {
                            const u = Sr(s);
                            p(u !== null);
                            let l = u;
                            a.push(l);
                            let d = l;
                            for(let f = 1; f < o - 1; f++){
                                const h = s.bufferPos, g = Sr(s);
                                p(g !== null);
                                const m = g, _ = (1 << (s.bufferPos - h) * 7 - 1) - 1, w = m - _;
                                l += w, a.push(l), d += l;
                            }
                            a.push(s.length - (s.bufferPos + d));
                        }
                        break;
                    default:
                        p(!1);
                }
                p(a.length === o), e.splice(n, 1);
                const c = i.duration || o * (r.defaultDuration ?? 0);
                for(let u = 0; u < o; u++){
                    const l = a[u], d = O(s, l), f = i.timestamp + c * u / o, h = c / o;
                    e.splice(n + u, 0, {
                        timestamp: f,
                        duration: h,
                        isKeyFrame: i.isKeyFrame,
                        data: d,
                        lacing: Ze.None,
                        decoded: !0,
                        mainAdditional: i.mainAdditional
                    });
                }
                n += o, n--;
            }
        }
        async loadSegmentMetadata(e) {
            for (const r of e.seekEntries){
                if (!(r.id === k.Tags && !e.tagsSeen)) {
                    if (!(r.id === k.Attachments && !e.attachmentsSeen)) continue;
                }
                let n = this.reader.requestSliceRange(e.dataStartPos + r.segmentPosition, Be, nt);
                if (n instanceof Promise && (n = await n), !n) continue;
                const i = tt(n);
                if (!i || i.id !== r.id) continue;
                const { size: s } = i;
                pt(s), p(!this.currentSegment), this.currentSegment = e;
                let a = this.reader.requestSlice(n.filePos, s);
                a instanceof Promise && (a = await a), a && this.readContiguousElements(a), this.currentSegment = null, r.id === k.Tags ? e.tagsSeen = !0 : r.id === k.Attachments && (e.attachmentsSeen = !0);
            }
        }
        readContiguousElements(e, r) {
            for(; e.remainingLength >= Be;){
                const n = e.filePos;
                if (!this.traverseElement(e, r)) return n;
            }
            return e.filePos;
        }
        traverseElement(e, r) {
            const n = tt(e);
            if (!n || r && r.includes(n.id)) return !1;
            const { id: i, size: s } = n, a = e.filePos;
            switch(pt(s), i){
                case k.DocType:
                    this.isWebM = Yt(e, s) === "webm";
                    break;
                case k.Seek:
                    {
                        if (!this.currentSegment) break;
                        const o = {
                            id: -1,
                            segmentPosition: -1
                        };
                        this.currentSegment.seekEntries.push(o), this.readContiguousElements(e.slice(a, s)), (o.id === -1 || o.segmentPosition === -1) && this.currentSegment.seekEntries.pop();
                    }
                    break;
                case k.SeekID:
                    {
                        const o = this.currentSegment?.seekEntries[this.currentSegment.seekEntries.length - 1];
                        if (!o) break;
                        o.id = j(e, s);
                    }
                    break;
                case k.SeekPosition:
                    {
                        const o = this.currentSegment?.seekEntries[this.currentSegment.seekEntries.length - 1];
                        if (!o) break;
                        o.segmentPosition = j(e, s);
                    }
                    break;
                case k.TimestampScale:
                    {
                        if (!this.currentSegment) break;
                        this.currentSegment.timestampScale = j(e, s), this.currentSegment.timestampFactor = 1e9 / this.currentSegment.timestampScale;
                    }
                    break;
                case k.Duration:
                    {
                        if (!this.currentSegment) break;
                        this.currentSegment.duration = Wn(e, s);
                    }
                    break;
                case k.TrackEntry:
                    {
                        if (!this.currentSegment || (this.currentTrack = {
                            id: -1,
                            segment: this.currentSegment,
                            demuxer: this,
                            clusterPositionCache: [],
                            cuePoints: [],
                            disposition: {
                                ...dt,
                                primary: !1
                            },
                            trackBacking: null,
                            codecId: null,
                            codecPrivate: null,
                            defaultDuration: null,
                            defaultDurationNs: null,
                            name: null,
                            languageCode: "eng",
                            hasLanguageBcp47: !1,
                            decodingInstructions: [],
                            info: null
                        }, this.readContiguousElements(e.slice(a, s)), !this.currentTrack)) break;
                        if (this.currentTrack.decodingInstructions.some((o)=>o.data?.type !== "decompress" || o.scope !== fn.Block || o.data.algorithm !== Cr.HeaderStripping) && (console.warn(`Track #${this.currentTrack.id} has an unsupported content encoding; dropping.`), this.currentTrack = null), this.currentTrack && this.currentTrack.id !== -1 && this.currentTrack.codecId && this.currentTrack.info) {
                            const o = this.currentTrack.codecId.indexOf("/"), c = o === -1 ? this.currentTrack.codecId : this.currentTrack.codecId.slice(0, o);
                            if (this.currentTrack.info.type === "video" && this.currentTrack.info.width !== -1 && this.currentTrack.info.height !== -1) {
                                if (this.currentTrack.info.squarePixelWidth = this.currentTrack.info.width, this.currentTrack.info.squarePixelHeight = this.currentTrack.info.height, this.currentTrack.info.displayWidth !== null && this.currentTrack.info.displayHeight !== null) {
                                    const l = this.currentTrack.info.displayWidth * this.currentTrack.info.height, d = this.currentTrack.info.displayHeight * this.currentTrack.info.width;
                                    l > 0 && d > 0 && (l > d ? this.currentTrack.info.squarePixelWidth = Math.round(this.currentTrack.info.width * l / d) : this.currentTrack.info.squarePixelHeight = Math.round(this.currentTrack.info.height * d / l));
                                }
                                this.currentTrack.codecId === Pe.avc ? (this.currentTrack.info.codec = "avc", this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate) : this.currentTrack.codecId === Pe.hevc ? (this.currentTrack.info.codec = "hevc", this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate) : c === Pe.vp8 ? this.currentTrack.info.codec = "vp8" : c === Pe.vp9 ? this.currentTrack.info.codec = "vp9" : c === Pe.av1 && (this.currentTrack.info.codec = "av1");
                                const u = this.currentTrack;
                                this.currentTrack.trackBacking = new su(u), this.currentSegment.tracks.push(this.currentTrack);
                            } else if (this.currentTrack.info.type === "audio") {
                                c === Pe.aac ? (this.currentTrack.info.codec = "aac", this.currentTrack.info.aacCodecInfo = {
                                    isMpeg2: this.currentTrack.codecId.includes("MPEG2"),
                                    objectType: null
                                }, this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate) : this.currentTrack.codecId === Pe.mp3 ? this.currentTrack.info.codec = "mp3" : c === Pe.opus ? (this.currentTrack.info.codec = "opus", this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate, this.currentTrack.info.sampleRate = Ur) : c === Pe.vorbis ? (this.currentTrack.info.codec = "vorbis", this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate) : c === Pe.flac ? (this.currentTrack.info.codec = "flac", this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate) : c === Pe.ac3 ? (this.currentTrack.info.codec = "ac3", this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate) : c === Pe.eac3 ? (this.currentTrack.info.codec = "eac3", this.currentTrack.info.codecDescription = this.currentTrack.codecPrivate) : this.currentTrack.codecId === "A_PCM/INT/LIT" ? this.currentTrack.info.bitDepth === 8 ? this.currentTrack.info.codec = "pcm-u8" : this.currentTrack.info.bitDepth === 16 ? this.currentTrack.info.codec = "pcm-s16" : this.currentTrack.info.bitDepth === 24 ? this.currentTrack.info.codec = "pcm-s24" : this.currentTrack.info.bitDepth === 32 && (this.currentTrack.info.codec = "pcm-s32") : this.currentTrack.codecId === "A_PCM/INT/BIG" ? this.currentTrack.info.bitDepth === 8 ? this.currentTrack.info.codec = "pcm-u8" : this.currentTrack.info.bitDepth === 16 ? this.currentTrack.info.codec = "pcm-s16be" : this.currentTrack.info.bitDepth === 24 ? this.currentTrack.info.codec = "pcm-s24be" : this.currentTrack.info.bitDepth === 32 && (this.currentTrack.info.codec = "pcm-s32be") : this.currentTrack.codecId === "A_PCM/FLOAT/IEEE" && (this.currentTrack.info.bitDepth === 32 ? this.currentTrack.info.codec = "pcm-f32" : this.currentTrack.info.bitDepth === 64 && (this.currentTrack.info.codec = "pcm-f64"));
                                const u = this.currentTrack;
                                this.currentTrack.trackBacking = new au(u), this.currentSegment.tracks.push(this.currentTrack);
                            }
                        }
                        this.currentTrack = null;
                    }
                    break;
                case k.TrackNumber:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.id = j(e, s);
                    }
                    break;
                case k.TrackType:
                    {
                        if (!this.currentTrack) break;
                        const o = j(e, s);
                        o === 1 ? this.currentTrack.info = {
                            type: "video",
                            width: -1,
                            height: -1,
                            displayWidth: null,
                            displayHeight: null,
                            displayUnit: null,
                            squarePixelWidth: -1,
                            squarePixelHeight: -1,
                            rotation: 0,
                            codec: null,
                            codecDescription: null,
                            colorSpace: null,
                            alphaMode: !1
                        } : o === 2 && (this.currentTrack.info = {
                            type: "audio",
                            numberOfChannels: 1,
                            sampleRate: 8e3,
                            bitDepth: -1,
                            codec: null,
                            codecDescription: null,
                            aacCodecInfo: null
                        });
                    }
                    break;
                case k.FlagEnabled:
                    {
                        if (!this.currentTrack) break;
                        j(e, s) || (this.currentTrack = null);
                    }
                    break;
                case k.FlagDefault:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.disposition.default = !!j(e, s);
                    }
                    break;
                case k.FlagForced:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.disposition.forced = !!j(e, s);
                    }
                    break;
                case k.FlagOriginal:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.disposition.original = !!j(e, s);
                    }
                    break;
                case k.FlagHearingImpaired:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.disposition.hearingImpaired = !!j(e, s);
                    }
                    break;
                case k.FlagVisualImpaired:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.disposition.visuallyImpaired = !!j(e, s);
                    }
                    break;
                case k.FlagCommentary:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.disposition.commentary = !!j(e, s);
                    }
                    break;
                case k.CodecID:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.codecId = Yt(e, s);
                    }
                    break;
                case k.CodecPrivate:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.codecPrivate = O(e, s);
                    }
                    break;
                case k.DefaultDuration:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.defaultDurationNs = j(e, s);
                    }
                    break;
                case k.Name:
                    {
                        if (!this.currentTrack) break;
                        this.currentTrack.name = hr(e, s);
                    }
                    break;
                case k.Language:
                    {
                        if (!this.currentTrack || this.currentTrack.hasLanguageBcp47) break;
                        this.currentTrack.languageCode = Yt(e, s), Pi(this.currentTrack.languageCode) || (this.currentTrack.languageCode = me);
                    }
                    break;
                case k.LanguageBCP47:
                    {
                        if (!this.currentTrack) break;
                        const c = Yt(e, s).split("-")[0];
                        c ? this.currentTrack.languageCode = c : this.currentTrack.languageCode = me, this.currentTrack.hasLanguageBcp47 = !0;
                    }
                    break;
                case k.Video:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.readContiguousElements(e.slice(a, s));
                    }
                    break;
                case k.PixelWidth:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.currentTrack.info.width = j(e, s);
                    }
                    break;
                case k.PixelHeight:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.currentTrack.info.height = j(e, s);
                    }
                    break;
                case k.DisplayWidth:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.currentTrack.info.displayWidth = j(e, s);
                    }
                    break;
                case k.DisplayHeight:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.currentTrack.info.displayHeight = j(e, s);
                    }
                    break;
                case k.DisplayUnit:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.currentTrack.info.displayUnit = j(e, s);
                    }
                    break;
                case k.AlphaMode:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.currentTrack.info.alphaMode = j(e, s) === 1;
                    }
                    break;
                case k.Colour:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.currentTrack.info.colorSpace = {}, this.readContiguousElements(e.slice(a, s));
                    }
                    break;
                case k.MatrixCoefficients:
                    {
                        if (this.currentTrack?.info?.type !== "video" || !this.currentTrack.info.colorSpace) break;
                        const o = j(e, s), c = on[o] ?? null;
                        this.currentTrack.info.colorSpace.matrix = c;
                    }
                    break;
                case k.Range:
                    {
                        if (this.currentTrack?.info?.type !== "video" || !this.currentTrack.info.colorSpace) break;
                        this.currentTrack.info.colorSpace.fullRange = j(e, s) === 2;
                    }
                    break;
                case k.TransferCharacteristics:
                    {
                        if (this.currentTrack?.info?.type !== "video" || !this.currentTrack.info.colorSpace) break;
                        const o = j(e, s), c = an[o] ?? null;
                        this.currentTrack.info.colorSpace.transfer = c;
                    }
                    break;
                case k.Primaries:
                    {
                        if (this.currentTrack?.info?.type !== "video" || !this.currentTrack.info.colorSpace) break;
                        const o = j(e, s), c = sn[o] ?? null;
                        this.currentTrack.info.colorSpace.primaries = c;
                    }
                    break;
                case k.Projection:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        this.readContiguousElements(e.slice(a, s));
                    }
                    break;
                case k.ProjectionPoseRoll:
                    {
                        if (this.currentTrack?.info?.type !== "video") break;
                        const c = -Wn(e, s);
                        try {
                            this.currentTrack.info.rotation = gn(c);
                        } catch  {}
                    }
                    break;
                case k.Audio:
                    {
                        if (this.currentTrack?.info?.type !== "audio") break;
                        this.readContiguousElements(e.slice(a, s));
                    }
                    break;
                case k.SamplingFrequency:
                    {
                        if (this.currentTrack?.info?.type !== "audio") break;
                        this.currentTrack.info.sampleRate = Wn(e, s);
                    }
                    break;
                case k.Channels:
                    {
                        if (this.currentTrack?.info?.type !== "audio") break;
                        this.currentTrack.info.numberOfChannels = j(e, s);
                    }
                    break;
                case k.BitDepth:
                    {
                        if (this.currentTrack?.info?.type !== "audio") break;
                        this.currentTrack.info.bitDepth = j(e, s);
                    }
                    break;
                case k.CuePoint:
                    {
                        if (!this.currentSegment) break;
                        this.readContiguousElements(e.slice(a, s)), this.currentCueTime = null;
                    }
                    break;
                case k.CueTime:
                    this.currentCueTime = j(e, s);
                    break;
                case k.CueTrackPositions:
                    {
                        if (this.currentCueTime === null) break;
                        p(this.currentSegment);
                        const o = {
                            time: this.currentCueTime,
                            trackId: -1,
                            clusterPosition: -1
                        };
                        this.currentSegment.cuePoints.push(o), this.readContiguousElements(e.slice(a, s)), (o.trackId === -1 || o.clusterPosition === -1) && this.currentSegment.cuePoints.pop();
                    }
                    break;
                case k.CueTrack:
                    {
                        const o = this.currentSegment?.cuePoints[this.currentSegment.cuePoints.length - 1];
                        if (!o) break;
                        o.trackId = j(e, s);
                    }
                    break;
                case k.CueClusterPosition:
                    {
                        const o = this.currentSegment?.cuePoints[this.currentSegment.cuePoints.length - 1];
                        if (!o) break;
                        p(this.currentSegment), o.clusterPosition = this.currentSegment.dataStartPos + j(e, s);
                    }
                    break;
                case k.Timestamp:
                    {
                        if (!this.currentCluster) break;
                        this.currentCluster.timestamp = j(e, s);
                    }
                    break;
                case k.SimpleBlock:
                    {
                        if (!this.currentCluster) break;
                        const o = Sr(e);
                        if (o === null) break;
                        const c = this.getTrackDataInCluster(this.currentCluster, o);
                        if (!c) break;
                        const u = wi(e), l = M(e), d = l >> 1 & 3;
                        let f = !!(l & 128);
                        c.track.info?.type === "audio" && c.track.info.codec && (f = !0);
                        const h = O(e, s - (e.filePos - a)), g = c.track.decodingInstructions.length > 0;
                        c.blocks.push({
                            timestamp: u,
                            duration: 0,
                            isKeyFrame: f,
                            data: h,
                            lacing: d,
                            decoded: !g,
                            mainAdditional: null
                        });
                    }
                    break;
                case k.BlockGroup:
                    {
                        if (!this.currentCluster) break;
                        this.readContiguousElements(e.slice(a, s)), this.currentBlock = null;
                    }
                    break;
                case k.Block:
                    {
                        if (!this.currentCluster) break;
                        const o = Sr(e);
                        if (o === null) break;
                        const c = this.getTrackDataInCluster(this.currentCluster, o);
                        if (!c) break;
                        const u = wi(e), d = M(e) >> 1 & 3, f = O(e, s - (e.filePos - a)), h = c.track.decodingInstructions.length > 0;
                        this.currentBlock = {
                            timestamp: u,
                            duration: 0,
                            isKeyFrame: !0,
                            data: f,
                            lacing: d,
                            decoded: !h,
                            mainAdditional: null
                        }, c.blocks.push(this.currentBlock);
                    }
                    break;
                case k.BlockAdditions:
                    this.readContiguousElements(e.slice(a, s));
                    break;
                case k.BlockMore:
                    {
                        if (!this.currentBlock) break;
                        this.currentBlockAdditional = {
                            addId: 1,
                            data: null
                        }, this.readContiguousElements(e.slice(a, s)), this.currentBlockAdditional.data && this.currentBlockAdditional.addId === 1 && (this.currentBlock.mainAdditional = this.currentBlockAdditional.data), this.currentBlockAdditional = null;
                    }
                    break;
                case k.BlockAdditional:
                    {
                        if (!this.currentBlockAdditional) break;
                        this.currentBlockAdditional.data = O(e, s);
                    }
                    break;
                case k.BlockAddID:
                    {
                        if (!this.currentBlockAdditional) break;
                        this.currentBlockAdditional.addId = j(e, s);
                    }
                    break;
                case k.BlockDuration:
                    {
                        if (!this.currentBlock) break;
                        this.currentBlock.duration = j(e, s);
                    }
                    break;
                case k.ReferenceBlock:
                    {
                        if (!this.currentBlock) break;
                        this.currentBlock.isKeyFrame = !1;
                    }
                    break;
                case k.Tag:
                    this.currentTagTargetIsMovie = !0, this.readContiguousElements(e.slice(a, s));
                    break;
                case k.Targets:
                    this.readContiguousElements(e.slice(a, s));
                    break;
                case k.TargetTypeValue:
                    j(e, s) !== 50 && (this.currentTagTargetIsMovie = !1);
                    break;
                case k.TagTrackUID:
                case k.TagEditionUID:
                case k.TagChapterUID:
                case k.TagAttachmentUID:
                    this.currentTagTargetIsMovie = !1;
                    break;
                case k.SimpleTag:
                    {
                        if (!this.currentTagTargetIsMovie) break;
                        this.currentSimpleTagName = null, this.readContiguousElements(e.slice(a, s));
                    }
                    break;
                case k.TagName:
                    this.currentSimpleTagName = hr(e, s);
                    break;
                case k.TagString:
                    {
                        if (!this.currentSimpleTagName) break;
                        const o = hr(e, s);
                        this.processTagValue(this.currentSimpleTagName, o);
                    }
                    break;
                case k.TagBinary:
                    {
                        if (!this.currentSimpleTagName) break;
                        const o = O(e, s);
                        this.processTagValue(this.currentSimpleTagName, o);
                    }
                    break;
                case k.AttachedFile:
                    {
                        if (!this.currentSegment) break;
                        this.currentAttachedFile = {
                            fileUid: null,
                            fileName: null,
                            fileMediaType: null,
                            fileData: null,
                            fileDescription: null
                        }, this.readContiguousElements(e.slice(a, s));
                        const o = this.currentSegment.metadataTags;
                        if (this.currentAttachedFile.fileUid && this.currentAttachedFile.fileData && (o.raw ??= {}, o.raw[this.currentAttachedFile.fileUid.toString()] = new Ai(this.currentAttachedFile.fileData, this.currentAttachedFile.fileMediaType ?? void 0, this.currentAttachedFile.fileName ?? void 0, this.currentAttachedFile.fileDescription ?? void 0)), this.currentAttachedFile.fileMediaType?.startsWith("image/") && this.currentAttachedFile.fileData) {
                            const c = this.currentAttachedFile.fileName;
                            let u = "unknown";
                            if (c) {
                                const l = c.toLowerCase();
                                l.startsWith("cover.") ? u = "coverFront" : l.startsWith("back.") && (u = "coverBack");
                            }
                            o.images ??= [], o.images.push({
                                data: this.currentAttachedFile.fileData,
                                mimeType: this.currentAttachedFile.fileMediaType,
                                kind: u,
                                name: this.currentAttachedFile.fileName ?? void 0,
                                description: this.currentAttachedFile.fileDescription ?? void 0
                            });
                        }
                        this.currentAttachedFile = null;
                    }
                    break;
                case k.FileUID:
                    {
                        if (!this.currentAttachedFile) break;
                        this.currentAttachedFile.fileUid = nu(e, s);
                    }
                    break;
                case k.FileName:
                    {
                        if (!this.currentAttachedFile) break;
                        this.currentAttachedFile.fileName = hr(e, s);
                    }
                    break;
                case k.FileMediaType:
                    {
                        if (!this.currentAttachedFile) break;
                        this.currentAttachedFile.fileMediaType = Yt(e, s);
                    }
                    break;
                case k.FileData:
                    {
                        if (!this.currentAttachedFile) break;
                        this.currentAttachedFile.fileData = O(e, s);
                    }
                    break;
                case k.FileDescription:
                    {
                        if (!this.currentAttachedFile) break;
                        this.currentAttachedFile.fileDescription = hr(e, s);
                    }
                    break;
                case k.ContentEncodings:
                    {
                        if (!this.currentTrack) break;
                        this.readContiguousElements(e.slice(a, s)), this.currentTrack.decodingInstructions.sort((o, c)=>c.order - o.order);
                    }
                    break;
                case k.ContentEncoding:
                    this.currentDecodingInstruction = {
                        order: 0,
                        scope: fn.Block,
                        data: null
                    }, this.readContiguousElements(e.slice(a, s)), this.currentDecodingInstruction.data && this.currentTrack.decodingInstructions.push(this.currentDecodingInstruction), this.currentDecodingInstruction = null;
                    break;
                case k.ContentEncodingOrder:
                    {
                        if (!this.currentDecodingInstruction) break;
                        this.currentDecodingInstruction.order = j(e, s);
                    }
                    break;
                case k.ContentEncodingScope:
                    {
                        if (!this.currentDecodingInstruction) break;
                        this.currentDecodingInstruction.scope = j(e, s);
                    }
                    break;
                case k.ContentCompression:
                    {
                        if (!this.currentDecodingInstruction) break;
                        this.currentDecodingInstruction.data = {
                            type: "decompress",
                            algorithm: Cr.Zlib,
                            settings: null
                        }, this.readContiguousElements(e.slice(a, s));
                    }
                    break;
                case k.ContentCompAlgo:
                    {
                        if (this.currentDecodingInstruction?.data?.type !== "decompress") break;
                        this.currentDecodingInstruction.data.algorithm = j(e, s);
                    }
                    break;
                case k.ContentCompSettings:
                    {
                        if (this.currentDecodingInstruction?.data?.type !== "decompress") break;
                        this.currentDecodingInstruction.data.settings = O(e, s);
                    }
                    break;
                case k.ContentEncryption:
                    {
                        if (!this.currentDecodingInstruction) break;
                        this.currentDecodingInstruction.data = {
                            type: "decrypt"
                        };
                    }
                    break;
            }
            return e.filePos = a + s, !0;
        }
        decodeBlockData(e, r) {
            p(e.decodingInstructions.length > 0);
            let n = r;
            for (const i of e.decodingInstructions)switch(p(i.data), i.data.type){
                case "decompress":
                    switch(i.data.algorithm){
                        case Cr.HeaderStripping:
                            if (i.data.settings && i.data.settings.length > 0) {
                                const s = i.data.settings, a = new Uint8Array(s.length + n.length);
                                a.set(s, 0), a.set(n, s.length), n = a;
                            }
                            break;
                    }
                    break;
            }
            return n;
        }
        processTagValue(e, r) {
            if (!this.currentSegment?.metadataTags) return;
            const n = this.currentSegment.metadataTags;
            if (n.raw ??= {}, n.raw[e] ??= r, typeof r == "string") switch(e.toLowerCase()){
                case "title":
                    n.title ??= r;
                    break;
                case "description":
                    n.description ??= r;
                    break;
                case "artist":
                    n.artist ??= r;
                    break;
                case "album":
                    n.album ??= r;
                    break;
                case "album_artist":
                    n.albumArtist ??= r;
                    break;
                case "genre":
                    n.genre ??= r;
                    break;
                case "comment":
                    n.comment ??= r;
                    break;
                case "lyrics":
                    n.lyrics ??= r;
                    break;
                case "date":
                    {
                        const i = new Date(r);
                        Number.isNaN(i.getTime()) || (n.date ??= i);
                    }
                    break;
                case "track_number":
                case "part_number":
                    {
                        const i = r.split("/"), s = Number.parseInt(i[0], 10), a = i[1] && Number.parseInt(i[1], 10);
                        Number.isInteger(s) && s > 0 && (n.trackNumber ??= s), a && Number.isInteger(a) && a > 0 && (n.tracksTotal ??= a);
                    }
                    break;
                case "disc_number":
                case "disc":
                    {
                        const i = r.split("/"), s = Number.parseInt(i[0], 10), a = i[1] && Number.parseInt(i[1], 10);
                        Number.isInteger(s) && s > 0 && (n.discNumber ??= s), a && Number.isInteger(a) && a > 0 && (n.discsTotal ??= a);
                    }
                    break;
            }
        }
    }
    class co {
        constructor(e){
            this.internalTrack = e, this.packetToClusterLocation = new WeakMap;
        }
        getId() {
            return this.internalTrack.id;
        }
        getNumber() {
            const e = this.internalTrack.demuxer, r = this.internalTrack.trackBacking.getType();
            let n = 0;
            for (const i of e.segments)for (const s of i.tracks)if (s.trackBacking.getType() === r && n++, s === this.internalTrack) break;
            return n;
        }
        getCodec() {
            throw new Error("Not implemented on base class.");
        }
        getInternalCodecId() {
            return this.internalTrack.codecId;
        }
        getName() {
            return this.internalTrack.name;
        }
        getLanguageCode() {
            return this.internalTrack.languageCode;
        }
        getTimeResolution() {
            return this.internalTrack.segment.timestampFactor;
        }
        isRelativeToUnixEpoch() {
            return !1;
        }
        getDisposition() {
            return this.internalTrack.disposition;
        }
        getPairingMask() {
            return 1n;
        }
        getBitrate() {
            return null;
        }
        getAverageBitrate() {
            return null;
        }
        async getDurationFromMetadata() {
            const e = this.internalTrack.segment;
            if (e.duration <= 0) return null;
            let r = e.duration / e.timestampFactor;
            const n = await this.getFirstPacket({
                metadataOnly: !0
            });
            return r += n?.timestamp ?? 0, r;
        }
        async getLiveRefreshInterval() {
            return null;
        }
        async getFirstPacket(e) {
            return this.performClusterLookup(null, (r)=>r.trackData.get(this.internalTrack.id) ? {
                    blockIndex: 0,
                    correctBlockFound: !0
                } : {
                    blockIndex: -1,
                    correctBlockFound: !1
                }, -1 / 0, 1 / 0, e);
        }
        intoTimescale(e) {
            return Br(e * this.internalTrack.segment.timestampFactor);
        }
        async getPacket(e, r) {
            const n = this.intoTimescale(e);
            return this.performClusterLookup(null, (i)=>{
                const s = i.trackData.get(this.internalTrack.id);
                if (!s) return {
                    blockIndex: -1,
                    correctBlockFound: !1
                };
                const a = K(s.presentationTimestamps, n, (u)=>u.timestamp), o = a !== -1 ? s.presentationTimestamps[a].blockIndex : -1, c = a !== -1 && n < s.endTimestamp;
                return {
                    blockIndex: o,
                    correctBlockFound: c
                };
            }, n, n, r);
        }
        async getNextPacket(e, r) {
            const n = this.packetToClusterLocation.get(e);
            if (n === void 0) throw new Error("Packet was not created from this track.");
            return this.performClusterLookup(n.cluster, (i)=>{
                if (i === n.cluster) {
                    const s = i.trackData.get(this.internalTrack.id);
                    if (n.blockIndex + 1 < s.blocks.length) return {
                        blockIndex: n.blockIndex + 1,
                        correctBlockFound: !0
                    };
                } else if (i.trackData.get(this.internalTrack.id)) return {
                    blockIndex: 0,
                    correctBlockFound: !0
                };
                return {
                    blockIndex: -1,
                    correctBlockFound: !1
                };
            }, -1 / 0, 1 / 0, r);
        }
        async getKeyPacket(e, r) {
            const n = this.intoTimescale(e);
            return this.performClusterLookup(null, (i)=>{
                const s = i.trackData.get(this.internalTrack.id);
                if (!s) return {
                    blockIndex: -1,
                    correctBlockFound: !1
                };
                const a = Si(s.presentationTimestamps, (u)=>s.blocks[u.blockIndex].isKeyFrame && u.timestamp <= n), o = a !== -1 ? s.presentationTimestamps[a].blockIndex : -1, c = a !== -1 && n < s.endTimestamp;
                return {
                    blockIndex: o,
                    correctBlockFound: c
                };
            }, n, n, r);
        }
        async getNextKeyPacket(e, r) {
            const n = this.packetToClusterLocation.get(e);
            if (n === void 0) throw new Error("Packet was not created from this track.");
            return this.performClusterLookup(n.cluster, (i)=>{
                if (i === n.cluster) {
                    const a = i.trackData.get(this.internalTrack.id).blocks.findIndex((o, c)=>o.isKeyFrame && c > n.blockIndex);
                    if (a !== -1) return {
                        blockIndex: a,
                        correctBlockFound: !0
                    };
                } else {
                    const s = i.trackData.get(this.internalTrack.id);
                    if (s && s.firstKeyFrameTimestamp !== null) {
                        const a = s.blocks.findIndex((o)=>o.isKeyFrame);
                        return p(a !== -1), {
                            blockIndex: a,
                            correctBlockFound: !0
                        };
                    }
                }
                return {
                    blockIndex: -1,
                    correctBlockFound: !1
                };
            }, -1 / 0, 1 / 0, r);
        }
        async fetchPacketInCluster(e, r, n) {
            if (r === -1) return null;
            const s = e.trackData.get(this.internalTrack.id).blocks[r];
            p(s), s.decoded || (s.data = this.internalTrack.demuxer.decodeBlockData(this.internalTrack, s.data), s.decoded = !0);
            const a = n.metadataOnly ? Ee : s.data, o = s.timestamp / this.internalTrack.segment.timestampFactor, c = s.duration / this.internalTrack.segment.timestampFactor, u = {};
            s.mainAdditional && this.internalTrack.info?.type === "video" && this.internalTrack.info.alphaMode && (u.alpha = n.metadataOnly ? Ee : s.mainAdditional, u.alphaByteLength = s.mainAdditional.byteLength);
            const l = new te(a, s.isKeyFrame ? "key" : "delta", o, c, e.dataStartPos + r, s.data.byteLength, u);
            return this.packetToClusterLocation.set(l, {
                cluster: e,
                blockIndex: r
            }), l;
        }
        async performClusterLookup(e, r, n, i, s) {
            const { demuxer: a, segment: o } = this.internalTrack;
            let c = null, u = null, l = -1;
            if (e) {
                const { blockIndex: _, correctBlockFound: w } = r(e);
                if (w) return this.fetchPacketInCluster(e, _, s);
                _ !== -1 && (u = e, l = _);
            }
            const d = K(this.internalTrack.cuePoints, n, (_)=>_.time), f = d !== -1 ? this.internalTrack.cuePoints[d] : null, h = K(this.internalTrack.clusterPositionCache, n, (_)=>_.startTimestamp), g = h !== -1 ? this.internalTrack.clusterPositionCache[h] : null, m = Math.max(f?.clusterPosition ?? 0, g?.elementStartPos ?? 0) || null;
            let b;
            for(e ? m === null || e.elementStartPos >= m ? (b = e.elementEndPos, c = e) : b = m : b = m ?? o.clusterSeekStartPos; o.elementEndPos === null || b <= o.elementEndPos - Be;){
                if (c) {
                    const P = c.trackData.get(this.internalTrack.id);
                    if (P && P.startTimestamp > i) break;
                }
                let _ = a.reader.requestSliceRange(b, Be, nt);
                if (_ instanceof Promise && (_ = await _), !_) break;
                const w = b, y = tt(_);
                if (!y || !Mr.includes(y.id) && y.id !== k.Void) {
                    const P = await so(a.reader, w, Mr, Math.min(o.elementEndPos ?? 1 / 0, w + oo));
                    if (P) {
                        b = P;
                        continue;
                    } else break;
                }
                const T = y.id;
                let S = y.size;
                const C = _.filePos;
                if (T === k.Cluster) {
                    c = await a.readCluster(w, o), S = c.elementEndPos - C;
                    const { blockIndex: P, correctBlockFound: x } = r(c);
                    if (x) return this.fetchPacketInCluster(c, P, s);
                    P !== -1 && (u = c, l = P);
                }
                S === void 0 && (p(T !== k.Cluster), S = (await fi(a.reader, C, en, o.elementEndPos)).pos - C);
                const I = C + S;
                if (o.elementEndPos === null) {
                    let P = a.reader.requestSliceRange(I, Be, nt);
                    if (P instanceof Promise && (P = await P), !P) break;
                    if (qi(P) === k.Segment) {
                        o.elementEndPos = I;
                        break;
                    }
                }
                b = I;
            }
            if (f && (!u || u.elementStartPos < f.clusterPosition)) {
                const _ = this.internalTrack.cuePoints[d - 1];
                p(!_ || _.time < f.time);
                const w = _?.time ?? -1 / 0;
                return this.performClusterLookup(null, r, w, i, s);
            }
            return u ? this.fetchPacketInCluster(u, l, s) : null;
        }
    }
    class su extends co {
        constructor(e){
            super(e), this.decoderConfigPromise = null, this.internalTrack = e;
        }
        getType() {
            return "video";
        }
        getCodec() {
            return this.internalTrack.info.codec;
        }
        getCodedWidth() {
            return this.internalTrack.info.width;
        }
        getCodedHeight() {
            return this.internalTrack.info.height;
        }
        getSquarePixelWidth() {
            return this.internalTrack.info.squarePixelWidth;
        }
        getSquarePixelHeight() {
            return this.internalTrack.info.squarePixelHeight;
        }
        getRotation() {
            return this.internalTrack.info.rotation;
        }
        async getColorSpace() {
            return {
                primaries: this.internalTrack.info.colorSpace?.primaries,
                transfer: this.internalTrack.info.colorSpace?.transfer,
                matrix: this.internalTrack.info.colorSpace?.matrix,
                fullRange: this.internalTrack.info.colorSpace?.fullRange
            };
        }
        async canBeTransparent() {
            return this.internalTrack.info.alphaMode;
        }
        async getDecoderConfig() {
            return this.internalTrack.info.codec ? this.decoderConfigPromise ??= (async ()=>{
                let e = null;
                (this.internalTrack.info.codec === "vp9" || this.internalTrack.info.codec === "av1" || this.internalTrack.info.codec === "avc" && !this.internalTrack.info.codecDescription || this.internalTrack.info.codec === "hevc" && !this.internalTrack.info.codecDescription) && (e = await this.getFirstPacket({}));
                const n = {
                    codec: Ri({
                        width: this.internalTrack.info.width,
                        height: this.internalTrack.info.height,
                        codec: this.internalTrack.info.codec,
                        codecDescription: this.internalTrack.info.codecDescription,
                        colorSpace: this.internalTrack.info.colorSpace,
                        avcType: 1,
                        avcCodecInfo: this.internalTrack.info.codec === "avc" && e ? zi(e.data) : null,
                        hevcCodecInfo: this.internalTrack.info.codec === "hevc" && e ? Ui(e.data) : null,
                        vp9CodecInfo: this.internalTrack.info.codec === "vp9" && e ? Ua(e.data) : null,
                        av1CodecInfo: this.internalTrack.info.codec === "av1" && e ? Wa(e.data) : null
                    }),
                    codedWidth: this.internalTrack.info.width,
                    codedHeight: this.internalTrack.info.height,
                    description: this.internalTrack.info.codecDescription ?? void 0,
                    colorSpace: this.internalTrack.info.colorSpace ?? void 0
                };
                return (this.internalTrack.info.width !== this.internalTrack.info.squarePixelWidth || this.internalTrack.info.height !== this.internalTrack.info.squarePixelHeight) && (n.displayAspectWidth = this.internalTrack.info.squarePixelWidth, n.displayAspectHeight = this.internalTrack.info.squarePixelHeight), n;
            })() : null;
        }
    }
    class au extends co {
        constructor(e){
            super(e), this.decoderConfig = null, this.internalTrack = e;
        }
        getType() {
            return "audio";
        }
        getCodec() {
            return this.internalTrack.info.codec;
        }
        getNumberOfChannels() {
            return this.internalTrack.info.numberOfChannels;
        }
        getSampleRate() {
            return this.internalTrack.info.sampleRate;
        }
        async getDecoderConfig() {
            return this.internalTrack.info.codec ? this.decoderConfig ??= {
                codec: Mi({
                    codec: this.internalTrack.info.codec,
                    codecDescription: this.internalTrack.info.codecDescription,
                    aacCodecInfo: this.internalTrack.info.aacCodecInfo
                }),
                numberOfChannels: this.internalTrack.info.numberOfChannels,
                sampleRate: this.internalTrack.info.sampleRate,
                description: this.internalTrack.info.codecDescription ?? void 0
            } : null;
        }
    }
    const hi = async (t, e, r)=>{
        let i = e;
        for(; r === null || i < r;){
            const s = r !== null ? Math.min(65536, r - i) : 65536;
            let a = t.requestSliceRange(i, Ot, s);
            if (a instanceof Promise && (a = await a), !a || a.length < Ot) break;
            for(; a.remainingLength >= Ot;){
                const o = a.filePos, c = A(a), u = t.fileSize !== null ? t.fileSize - i : null, l = Di(c, u);
                if (l.header) return {
                    header: l.header,
                    startPos: i
                };
                a.filePos = o + l.bytesAdvanced, i = a.filePos;
            }
        }
        return null;
    };
    class ou extends ft {
        constructor(e){
            super(e), this.metadataPromise = null, this.firstFrameHeader = null, this.firstFrameHeaderPos = null, this.loadedSamples = [], this.metadataTags = null, this.xingData = null, this.trackBackings = [], this.readingMutex = new lr, this.lastSampleLoaded = !1, this.lastLoadedPos = 0, this.nextTimestampInSamples = 0, this.reader = e._reader;
        }
        async readMetadata() {
            return this.metadataPromise ??= (async ()=>{
                for(; !this.firstFrameHeader && !this.lastSampleLoaded;)await this.advanceReader();
                if (!this.firstFrameHeader) throw new Error("No valid MP3 frame found.");
                this.trackBackings = [
                    new cu(this)
                ];
            })();
        }
        async advanceReader() {
            if (this.lastLoadedPos === 0) for(;;){
                let o = this.reader.requestSlice(this.lastLoadedPos, lt);
                if (o instanceof Promise && (o = await o), !o) {
                    this.lastSampleLoaded = !0;
                    return;
                }
                const c = Nt(o);
                if (!c) break;
                this.lastLoadedPos = o.filePos + c.size;
            }
            const e = await hi(this.reader, this.lastLoadedPos, this.reader.fileSize);
            if (!e) {
                this.lastSampleLoaded = !0;
                return;
            }
            const r = e.header;
            this.lastLoadedPos = e.startPos + r.totalSize - 1;
            const n = Fa(r.mpegVersionId, r.channel);
            let i = this.reader.requestSlice(e.startPos + n, 4);
            if (i instanceof Promise && (i = await i), i) {
                const o = A(i);
                if (o === Aa || o === Ba) {
                    if (!this.xingData) {
                        let u = this.reader.requestSlice(e.startPos + n + 4, 12);
                        if (u instanceof Promise && (u = await u), u) {
                            const l = O(u, 12), d = Z(l), f = d.getUint32(0, !1);
                            this.xingData = {
                                frameCount: f & ln.FrameCount ? d.getUint32(4, !1) : null,
                                fileSize: f & ln.FileSize ? d.getUint32(8, !1) : null
                            };
                        }
                    }
                    return;
                }
            }
            this.firstFrameHeader || (this.firstFrameHeader = r, this.firstFrameHeaderPos = e.startPos), r.sampleRate !== this.firstFrameHeader.sampleRate && console.warn(`MP3 changed sample rate mid-file: ${this.firstFrameHeader.sampleRate} Hz to ${r.sampleRate} Hz. Might be a bug, so please report this file.`);
            const s = r.audioSamplesInFrame / this.firstFrameHeader.sampleRate, a = {
                timestamp: this.nextTimestampInSamples / this.firstFrameHeader.sampleRate,
                duration: s,
                dataStart: e.startPos,
                dataSize: r.totalSize
            };
            this.loadedSamples.push(a), this.nextTimestampInSamples += r.audioSamplesInFrame;
        }
        async getMimeType() {
            return "audio/mpeg";
        }
        async getTrackBackings() {
            return await this.readMetadata(), this.trackBackings;
        }
        async getMetadataTags() {
            const e = await this.readingMutex.acquire();
            try {
                if (await this.readMetadata(), this.metadataTags) return this.metadataTags;
                this.metadataTags = {};
                let r = 0, n = !1;
                for(;;){
                    let i = this.reader.requestSlice(r, lt);
                    if (i instanceof Promise && (i = await i), !i) break;
                    const s = Nt(i);
                    if (!s) break;
                    n = !0;
                    let a = this.reader.requestSlice(i.filePos, s.size);
                    if (a instanceof Promise && (a = await a), !a) break;
                    Xi(a, s, this.metadataTags), r = i.filePos + s.size;
                }
                if (!n && this.reader.fileSize !== null && this.reader.fileSize >= rn) {
                    let i = this.reader.requestSlice(this.reader.fileSize - rn, rn);
                    i instanceof Promise && (i = await i), p(i), se(i, 3) === "TAG" && Kl(i, this.metadataTags);
                }
                return this.metadataTags;
            } finally{
                e();
            }
        }
    }
    class cu {
        constructor(e){
            this.demuxer = e;
        }
        getType() {
            return "audio";
        }
        getId() {
            return 1;
        }
        getNumber() {
            return 1;
        }
        getTimeResolution() {
            return p(this.demuxer.firstFrameHeader), this.demuxer.firstFrameHeader.sampleRate / this.demuxer.firstFrameHeader.audioSamplesInFrame;
        }
        isRelativeToUnixEpoch() {
            return !1;
        }
        getPairingMask() {
            return 1n;
        }
        getBitrate() {
            return null;
        }
        getAverageBitrate() {
            return null;
        }
        async getDurationFromMetadata() {
            const e = this.demuxer;
            if (p(e.firstFrameHeader !== null), p(e.firstFrameHeaderPos !== null), e.xingData) {
                if (e.xingData.frameCount !== null) return e.xingData.frameCount * e.firstFrameHeader.audioSamplesInFrame / e.firstFrameHeader.sampleRate;
            } else if (e.reader.fileSize !== null) {
                const r = Cc(e.firstFrameHeader.lowSamplingFrequency, e.firstFrameHeader.layer, e.firstFrameHeader.bitrate, e.firstFrameHeader.sampleRate), n = (e.reader.fileSize - e.firstFrameHeaderPos) / r;
                return Math.round(n) * e.firstFrameHeader.audioSamplesInFrame / e.firstFrameHeader.sampleRate;
            }
            return null;
        }
        async getLiveRefreshInterval() {
            return null;
        }
        getName() {
            return null;
        }
        getLanguageCode() {
            return me;
        }
        getCodec() {
            return "mp3";
        }
        getInternalCodecId() {
            return null;
        }
        getNumberOfChannels() {
            return p(this.demuxer.firstFrameHeader), this.demuxer.firstFrameHeader.channel === 3 ? 1 : 2;
        }
        getSampleRate() {
            return p(this.demuxer.firstFrameHeader), this.demuxer.firstFrameHeader.sampleRate;
        }
        getDisposition() {
            return {
                ...dt
            };
        }
        async getDecoderConfig() {
            return p(this.demuxer.firstFrameHeader), {
                codec: "mp3",
                numberOfChannels: this.demuxer.firstFrameHeader.channel === 3 ? 1 : 2,
                sampleRate: this.demuxer.firstFrameHeader.sampleRate
            };
        }
        async getPacketAtIndex(e, r) {
            if (e === -1) return null;
            const n = this.demuxer.loadedSamples[e];
            if (!n) return null;
            let i;
            if (r.metadataOnly) i = Ee;
            else {
                let s = this.demuxer.reader.requestSlice(n.dataStart, n.dataSize);
                if (s instanceof Promise && (s = await s), !s) return null;
                i = O(s, n.dataSize);
            }
            return new te(i, "key", n.timestamp, n.duration, e, n.dataSize);
        }
        getFirstPacket(e) {
            return this.getPacketAtIndex(0, e);
        }
        async getNextPacket(e, r) {
            const n = await this.demuxer.readingMutex.acquire();
            try {
                const i = Nr(this.demuxer.loadedSamples, e.timestamp, (a)=>a.timestamp);
                if (i === -1) throw new Error("Packet was not created from this track.");
                const s = i + 1;
                for(; s >= this.demuxer.loadedSamples.length && !this.demuxer.lastSampleLoaded;)await this.demuxer.advanceReader();
                return this.getPacketAtIndex(s, r);
            } finally{
                n();
            }
        }
        async getPacket(e, r) {
            const n = await this.demuxer.readingMutex.acquire();
            try {
                for(;;){
                    const i = K(this.demuxer.loadedSamples, e, (s)=>s.timestamp);
                    if (i === -1 && this.demuxer.loadedSamples.length > 0) return null;
                    if (this.demuxer.lastSampleLoaded) return this.getPacketAtIndex(i, r);
                    if (i >= 0 && i + 1 < this.demuxer.loadedSamples.length) return this.getPacketAtIndex(i, r);
                    await this.demuxer.advanceReader();
                }
            } finally{
                n();
            }
        }
        getKeyPacket(e, r) {
            return this.getPacket(e, r);
        }
        getNextKeyPacket(e, r) {
            return this.getNextPacket(e, r);
        }
    }
    const uo = 1399285583, uu = 79764919, lo = new Uint32Array(256);
    for(let t = 0; t < 256; t++){
        let e = t << 24;
        for(let r = 0; r < 8; r++)e = e & 2147483648 ? e << 1 ^ uu : e << 1;
        lo[t] = e >>> 0 & 4294967295;
    }
    const lu = (t)=>{
        const e = Z(t), r = e.getUint32(22, !0);
        e.setUint32(22, 0, !0);
        let n = 0;
        for(let i = 0; i < t.length; i++){
            const s = t[i];
            n = (n << 8 ^ lo[n >>> 24 ^ s]) >>> 0;
        }
        return e.setUint32(22, r, !0), n;
    }, du = (t, e, r)=>{
        let n = 0, i = null;
        if (t.length > 0) if (e.codec === "vorbis") {
            p(e.vorbisInfo);
            const s = e.vorbisInfo.modeBlockflags.length, o = (1 << nc(s - 1)) - 1 << 1, c = (t[0] & o) >> 1;
            if (c >= e.vorbisInfo.modeBlockflags.length) throw new Error("Invalid mode number.");
            let u = r;
            const l = e.vorbisInfo.modeBlockflags[c];
            if (i = e.vorbisInfo.blocksizes[l], l === 1) {
                const d = (o | 1) + 1, f = t[0] & d ? 1 : 0;
                u = e.vorbisInfo.blocksizes[f];
            }
            n = u !== null ? u + i >> 2 : 0;
        } else e.codec === "opus" && (n = Lc(t).durationInSamples);
        return {
            durationInSamples: n,
            vorbisBlockSize: i
        };
    }, fu = (t)=>{
        let e = "audio/ogg";
        if (t.codecStrings) {
            const r = [
                ...new Set(t.codecStrings)
            ];
            e += `; codecs="${r.join(", ")}"`;
        }
        return e;
    };
    const Rt = 27, ar = 282, hu = ar + 65025, Ir = (t)=>{
        const e = t.filePos;
        if (er(t) !== uo) return null;
        t.skip(1);
        const n = M(t), i = jl(t), s = er(t), a = er(t), o = er(t), c = M(t), u = new Uint8Array(c);
        for(let h = 0; h < c; h++)u[h] = M(t);
        const l = 27 + c, d = u.reduce((h, g)=>h + g, 0), f = l + d;
        return {
            headerStartPos: e,
            totalSize: f,
            dataStartPos: e + l,
            dataSize: d,
            headerType: n,
            granulePosition: i,
            serialNumber: s,
            sequenceNumber: a,
            checksum: o,
            lacingValues: u
        };
    }, mu = (t, e)=>{
        for(; t.filePos < e - 3;){
            const r = er(t), n = r & 255, i = r >>> 8 & 255, s = r >>> 16 & 255, a = r >>> 24 & 255, o = 79;
            if (!(n !== o && i !== o && s !== o && a !== o)) {
                if (t.skip(-4), r === uo) return !0;
                t.skip(1);
            }
        }
        return !1;
    };
    class pu extends ft {
        constructor(e){
            super(e), this.metadataPromise = null, this.bitstreams = [], this.trackBackings = [], this.metadataTags = {}, this.reader = e._reader;
        }
        async readMetadata() {
            return this.metadataPromise ??= (async ()=>{
                let e = 0;
                for(;;){
                    let r = this.reader.requestSliceRange(e, Rt, ar);
                    if (r instanceof Promise && (r = await r), !r) break;
                    const n = Ir(r);
                    if (!n || !!!(n.headerType & 2)) break;
                    this.bitstreams.push({
                        serialNumber: n.serialNumber,
                        bosPage: n,
                        description: null,
                        numberOfChannels: -1,
                        sampleRate: -1,
                        codecInfo: {
                            codec: null,
                            vorbisInfo: null,
                            opusInfo: null
                        },
                        lastMetadataPacket: null
                    }), e = n.headerStartPos + n.totalSize;
                }
                for (const r of this.bitstreams){
                    const n = await this.readPacket(r.bosPage, 0);
                    n && (n.data.byteLength >= 7 && n.data[0] === 1 && n.data[1] === 118 && n.data[2] === 111 && n.data[3] === 114 && n.data[4] === 98 && n.data[5] === 105 && n.data[6] === 115 ? await this.readVorbisMetadata(n, r) : n.data.byteLength >= 8 && n.data[0] === 79 && n.data[1] === 112 && n.data[2] === 117 && n.data[3] === 115 && n.data[4] === 72 && n.data[5] === 101 && n.data[6] === 97 && n.data[7] === 100 && await this.readOpusMetadata(n, r), r.codecInfo.codec !== null && this.trackBackings.push(new gu(r, this)));
                }
            })();
        }
        async readVorbisMetadata(e, r) {
            let n = await this.findNextPacketStart(e);
            if (!n) return;
            const i = await this.readPacket(n.startPage, n.startSegmentIndex);
            if (!i || (n = await this.findNextPacketStart(i), !n)) return;
            const s = await this.readPacket(n.startPage, n.startSegmentIndex);
            if (!s || i.data[0] !== 3 || s.data[0] !== 5) return;
            const a = [], o = (d)=>{
                for(; a.push(Math.min(255, d)), !(d < 255);)d -= 255;
            };
            o(e.data.length), o(i.data.length);
            const c = new Uint8Array(1 + a.length + e.data.length + i.data.length + s.data.length);
            c[0] = 2, c.set(a, 1), c.set(e.data, 1 + a.length), c.set(i.data, 1 + a.length + e.data.length), c.set(s.data, 1 + a.length + e.data.length + i.data.length), r.codecInfo.codec = "vorbis", r.description = c, r.lastMetadataPacket = s;
            const u = Z(e.data);
            r.numberOfChannels = u.getUint8(11), r.sampleRate = u.getUint32(12, !0);
            const l = u.getUint8(28);
            r.codecInfo.vorbisInfo = {
                blocksizes: [
                    1 << (l & 15),
                    1 << (l >> 4)
                ],
                modeBlockflags: Wc(s.data).modeBlockflags
            }, oi(i.data.subarray(7), this.metadataTags);
        }
        async readOpusMetadata(e, r) {
            const n = await this.findNextPacketStart(e);
            if (!n) return;
            const i = await this.readPacket(n.startPage, n.startSegmentIndex);
            if (!i) return;
            r.codecInfo.codec = "opus", r.description = e.data, r.lastMetadataPacket = i;
            const s = Li(e.data);
            r.numberOfChannels = s.outputChannelCount, r.sampleRate = Ur, r.codecInfo.opusInfo = {
                preSkip: s.preSkip
            }, oi(i.data.subarray(8), this.metadataTags);
        }
        async readPacket(e, r) {
            p(r < e.lacingValues.length);
            let n = 0;
            for(let d = 0; d < r; d++)n += e.lacingValues[d];
            let i = e, s = n, a = r;
            const o = [];
            e: for(;;){
                let d = this.reader.requestSlice(i.dataStartPos, i.dataSize);
                d instanceof Promise && (d = await d), p(d);
                const f = O(d, i.dataSize);
                for(;;){
                    if (a === i.lacingValues.length) {
                        o.push(f.subarray(n, s));
                        break;
                    }
                    const g = i.lacingValues[a];
                    if (s += g, g < 255) {
                        o.push(f.subarray(n, s));
                        break e;
                    }
                    a++;
                }
                let h = i.headerStartPos + i.totalSize;
                for(;;){
                    let g = this.reader.requestSliceRange(h, Rt, ar);
                    if (g instanceof Promise && (g = await g), !g) return null;
                    const m = Ir(g);
                    if (!m) return null;
                    if (i = m, i.serialNumber === e.serialNumber) break;
                    h = i.headerStartPos + i.totalSize;
                }
                n = 0, s = 0, a = 0;
            }
            const c = o.reduce((d, f)=>d + f.length, 0);
            if (c === 0) return null;
            const u = new Uint8Array(c);
            let l = 0;
            for(let d = 0; d < o.length; d++){
                const f = o[d];
                u.set(f, l), l += f.length;
            }
            return {
                data: u,
                endPage: i,
                endSegmentIndex: a
            };
        }
        async findNextPacketStart(e) {
            if (e.endSegmentIndex < e.endPage.lacingValues.length - 1) return {
                startPage: e.endPage,
                startSegmentIndex: e.endSegmentIndex + 1
            };
            if (!!(e.endPage.headerType & 4)) return null;
            let n = e.endPage.headerStartPos + e.endPage.totalSize;
            for(;;){
                let i = this.reader.requestSliceRange(n, Rt, ar);
                if (i instanceof Promise && (i = await i), !i) return null;
                const s = Ir(i);
                if (!s) return null;
                if (s.serialNumber === e.endPage.serialNumber) return {
                    startPage: s,
                    startSegmentIndex: 0
                };
                n = s.headerStartPos + s.totalSize;
            }
        }
        async getMimeType() {
            await this.readMetadata();
            const e = await Promise.all(this.trackBackings.map((r)=>r.getDecoderConfig().then((n)=>n?.codec ?? null)));
            return fu({
                codecStrings: e.filter(Boolean)
            });
        }
        async getTrackBackings() {
            return await this.readMetadata(), this.trackBackings;
        }
        async getMetadataTags() {
            return await this.readMetadata(), this.metadataTags;
        }
    }
    class gu {
        constructor(e, r){
            this.bitstream = e, this.demuxer = r, this.encodedPacketToMetadata = new WeakMap, this.sequentialScanCache = [], this.sequentialScanMutex = new lr, this.internalSampleRate = e.codecInfo.codec === "opus" ? Ur : e.sampleRate;
        }
        getType() {
            return "audio";
        }
        getId() {
            return this.bitstream.serialNumber;
        }
        getNumber() {
            const e = this.demuxer.trackBackings.findIndex((r)=>r.bitstream === this.bitstream);
            return p(e !== -1), e + 1;
        }
        getNumberOfChannels() {
            return this.bitstream.numberOfChannels;
        }
        getSampleRate() {
            return this.bitstream.sampleRate;
        }
        getTimeResolution() {
            return this.bitstream.sampleRate;
        }
        isRelativeToUnixEpoch() {
            return !1;
        }
        getPairingMask() {
            return 1n;
        }
        getBitrate() {
            return null;
        }
        getAverageBitrate() {
            return null;
        }
        async getDurationFromMetadata() {
            return null;
        }
        async getLiveRefreshInterval() {
            return null;
        }
        getCodec() {
            return this.bitstream.codecInfo.codec;
        }
        getInternalCodecId() {
            return null;
        }
        async getDecoderConfig() {
            return p(this.bitstream.codecInfo.codec), {
                codec: this.bitstream.codecInfo.codec,
                numberOfChannels: this.bitstream.numberOfChannels,
                sampleRate: this.bitstream.sampleRate,
                description: this.bitstream.description ?? void 0
            };
        }
        getName() {
            return null;
        }
        getLanguageCode() {
            return me;
        }
        getDisposition() {
            return {
                ...dt,
                primary: !1
            };
        }
        granulePositionToTimestampInSamples(e) {
            return this.bitstream.codecInfo.codec === "opus" ? (p(this.bitstream.codecInfo.opusInfo), e - this.bitstream.codecInfo.opusInfo.preSkip) : e;
        }
        createEncodedPacketFromOggPacket(e, r, n) {
            if (!e) return null;
            const { durationInSamples: i, vorbisBlockSize: s } = du(e.data, this.bitstream.codecInfo, r.vorbisLastBlocksize), a = new te(n.metadataOnly ? Ee : e.data, "key", Math.max(0, r.timestampInSamples) / this.internalSampleRate, i / this.internalSampleRate, e.endPage.headerStartPos + e.endSegmentIndex, e.data.byteLength);
            return this.encodedPacketToMetadata.set(a, {
                packet: e,
                timestampInSamples: r.timestampInSamples,
                durationInSamples: i,
                vorbisLastBlockSize: r.vorbisLastBlocksize,
                vorbisBlockSize: s
            }), a;
        }
        async getFirstPacket(e) {
            p(this.bitstream.lastMetadataPacket);
            const r = await this.demuxer.findNextPacketStart(this.bitstream.lastMetadataPacket);
            if (!r) return null;
            let n = 0;
            this.bitstream.codecInfo.codec === "opus" && (p(this.bitstream.codecInfo.opusInfo), n -= this.bitstream.codecInfo.opusInfo.preSkip);
            const i = await this.demuxer.readPacket(r.startPage, r.startSegmentIndex);
            return this.createEncodedPacketFromOggPacket(i, {
                timestampInSamples: n,
                vorbisLastBlocksize: null
            }, e);
        }
        async getNextPacket(e, r) {
            const n = this.encodedPacketToMetadata.get(e);
            if (!n) throw new Error("Packet was not created from this track.");
            const i = await this.demuxer.findNextPacketStart(n.packet);
            if (!i) return null;
            const s = n.timestampInSamples + n.durationInSamples, a = await this.demuxer.readPacket(i.startPage, i.startSegmentIndex);
            return this.createEncodedPacketFromOggPacket(a, {
                timestampInSamples: s,
                vorbisLastBlocksize: n.vorbisBlockSize
            }, r);
        }
        async getPacket(e, r) {
            if (this.demuxer.reader.fileSize === null) return this.getPacketSequential(e, r);
            const n = Br(e * this.internalSampleRate);
            if (n === 0) return this.getFirstPacket(r);
            if (n < 0) return null;
            p(this.bitstream.lastMetadataPacket);
            const i = await this.demuxer.findNextPacketStart(this.bitstream.lastMetadataPacket);
            if (!i) return null;
            let s = i.startPage, a = this.demuxer.reader.fileSize;
            const o = [
                s
            ];
            e: for(; s.headerStartPos + s.totalSize < a;){
                const w = s.headerStartPos, y = Math.floor((w + a) / 2);
                let T = y;
                for(;;){
                    const S = Math.min(T + hu, a - Rt);
                    let C = this.demuxer.reader.requestSlice(T, S - T);
                    if (C instanceof Promise && (C = await C), p(C), !mu(C, S)) {
                        a = y + Rt;
                        continue e;
                    }
                    let P = this.demuxer.reader.requestSliceRange(C.filePos, Rt, ar);
                    P instanceof Promise && (P = await P), p(P);
                    const x = Ir(P);
                    p(x);
                    let v = !1;
                    if (x.serialNumber === this.bitstream.serialNumber) v = !0;
                    else {
                        let B = this.demuxer.reader.requestSlice(x.headerStartPos, x.totalSize);
                        B instanceof Promise && (B = await B), p(B);
                        const L = O(B, x.totalSize);
                        v = lu(L) === x.checksum;
                    }
                    if (!v) {
                        T = x.headerStartPos + 4;
                        continue;
                    }
                    if (v && x.serialNumber !== this.bitstream.serialNumber) {
                        T = x.headerStartPos + x.totalSize;
                        continue;
                    }
                    if (x.granulePosition === -1) {
                        T = x.headerStartPos + x.totalSize;
                        continue;
                    }
                    this.granulePositionToTimestampInSamples(x.granulePosition) > n ? a = x.headerStartPos : (s = x, o.push(x));
                    continue e;
                }
            }
            let c = i.startPage;
            for (const w of o){
                if (w.granulePosition === s.granulePosition) break;
                (!c || w.headerStartPos > c.headerStartPos) && (c = w);
            }
            let u = c;
            const l = [
                u
            ];
            for(; !(u.serialNumber === this.bitstream.serialNumber && u.granulePosition === s.granulePosition);){
                const w = u.headerStartPos + u.totalSize;
                let y = this.demuxer.reader.requestSliceRange(w, Rt, ar);
                y instanceof Promise && (y = await y), p(y);
                const T = Ir(y);
                p(T), u = T, u.serialNumber === this.bitstream.serialNumber && l.push(u);
            }
            p(u.granulePosition !== -1);
            let d = null, f, h, g = u, m = 0;
            if (u.headerStartPos === i.startPage.headerStartPos) f = this.granulePositionToTimestampInSamples(0), h = !0, d = 0;
            else {
                f = 0, h = !1;
                for(let T = u.lacingValues.length - 1; T >= 0; T--)if (u.lacingValues[T] < 255) {
                    d = T + 1;
                    break;
                }
                if (d === null) throw new Error("Invalid page with granule position: no packets end on this page.");
                m = d - 1;
                const w = {
                    data: Ee,
                    endPage: g,
                    endSegmentIndex: m
                };
                if (await this.demuxer.findNextPacketStart(w)) {
                    const T = Bs(l, u, d);
                    p(T);
                    const S = As(l, T.page, T.segmentIndex);
                    S && (u = S.page, d = S.segmentIndex);
                } else for(;;){
                    const T = Bs(l, u, d);
                    if (!T) break;
                    const S = As(l, T.page, T.segmentIndex);
                    if (!S) break;
                    if (u = S.page, d = S.segmentIndex, T.page.headerStartPos !== g.headerStartPos) {
                        g = T.page, m = T.segmentIndex;
                        break;
                    }
                }
            }
            let b = null, _ = null;
            for(; u !== null;){
                p(d !== null);
                const w = await this.demuxer.readPacket(u, d);
                if (!w) break;
                if (!(u.headerStartPos === i.startPage.headerStartPos && d < i.startSegmentIndex)) {
                    let S = this.createEncodedPacketFromOggPacket(w, {
                        timestampInSamples: f,
                        vorbisLastBlocksize: _?.vorbisBlockSize ?? null
                    }, r);
                    p(S);
                    let C = this.encodedPacketToMetadata.get(S);
                    if (p(C), !h && w.endPage.headerStartPos === g.headerStartPos && w.endSegmentIndex === m ? (f = this.granulePositionToTimestampInSamples(u.granulePosition), h = !0, S = this.createEncodedPacketFromOggPacket(w, {
                        timestampInSamples: f - C.durationInSamples,
                        vorbisLastBlocksize: _?.vorbisBlockSize ?? null
                    }, r), p(S), C = this.encodedPacketToMetadata.get(S), p(C)) : f += C.durationInSamples, b = S, _ = C, h && (Math.max(f, 0) > n || Math.max(C.timestampInSamples, 0) === n)) break;
                }
                const T = await this.demuxer.findNextPacketStart(w);
                if (!T) break;
                u = T.startPage, d = T.startSegmentIndex;
            }
            return b;
        }
        async getPacketSequential(e, r) {
            const n = await this.sequentialScanMutex.acquire();
            try {
                const i = Br(e * this.internalSampleRate);
                e = i / this.internalSampleRate;
                const s = K(this.sequentialScanCache, i, (c)=>c.timestampInSamples);
                let a;
                if (s !== -1) {
                    const c = this.sequentialScanCache[s];
                    a = this.createEncodedPacketFromOggPacket(c.packet, {
                        timestampInSamples: c.timestampInSamples,
                        vorbisLastBlocksize: c.vorbisLastBlockSize
                    }, r);
                } else a = await this.getFirstPacket(r);
                let o = 0;
                for(; a && a.timestamp < e;){
                    const c = await this.getNextPacket(a, r);
                    if (!c || c.timestamp > e) break;
                    if (a = c, o++, o === 100) {
                        o = 0;
                        const u = this.encodedPacketToMetadata.get(a);
                        p(u), this.sequentialScanCache.length > 0 && p(ie(this.sequentialScanCache).timestampInSamples <= u.timestampInSamples), this.sequentialScanCache.push(u);
                    }
                }
                return a;
            } finally{
                n();
            }
        }
        getKeyPacket(e, r) {
            return this.getPacket(e, r);
        }
        getNextKeyPacket(e, r) {
            return this.getNextPacket(e, r);
        }
    }
    const As = (t, e, r)=>{
        let n = e, i = r;
        e: for(;;){
            for(i--, i; i >= 0; i--)if (n.lacingValues[i] < 255) {
                i++;
                break e;
            }
            if (p(i === -1), !(n.headerType & 1)) {
                i = 0;
                break;
            }
            const a = Ta(t, (o)=>o.headerStartPos < n.headerStartPos);
            if (!a) return null;
            n = a, i = n.lacingValues.length;
        }
        if (p(i !== -1), i === n.lacingValues.length) {
            const s = t[t.indexOf(n) + 1];
            p(s), n = s, i = 0;
        }
        return {
            page: n,
            segmentIndex: i
        };
    }, Bs = (t, e, r)=>{
        if (r > 0) return {
            page: e,
            segmentIndex: r - 1
        };
        const n = Ta(t, (i)=>i.headerStartPos < e.headerStartPos);
        return n ? {
            page: n,
            segmentIndex: n.lacingValues.length - 1
        } : null;
    };
    var Je;
    (function(t) {
        t[t.PCM = 1] = "PCM", t[t.IEEE_FLOAT = 3] = "IEEE_FLOAT", t[t.ALAW = 6] = "ALAW", t[t.MULAW = 7] = "MULAW", t[t.EXTENSIBLE = 65534] = "EXTENSIBLE";
    })(Je || (Je = {}));
    class _u extends ft {
        constructor(e){
            super(e), this.metadataPromise = null, this.dataStart = -1, this.dataSize = -1, this.audioInfo = null, this.trackBackings = [], this.lastKnownPacketIndex = 0, this.metadataTags = {}, this.reader = e._reader;
        }
        async readMetadata() {
            return this.metadataPromise ??= (async ()=>{
                let e = this.reader.requestSlice(0, 12);
                e instanceof Promise && (e = await e), p(e);
                const r = se(e, 4), n = r !== "RIFX", i = r === "RF64", s = yt(e, n);
                let a = i ? this.reader.fileSize : Math.min(s + 8, this.reader.fileSize ?? 1 / 0);
                if (se(e, 4) !== "WAVE") throw new Error("Invalid WAVE file - wrong format");
                let c = 0, u = null, l = e.filePos;
                for(; a === null || l < a;){
                    let f = this.reader.requestSlice(l, 8);
                    if (f instanceof Promise && (f = await f), !f) break;
                    const h = se(f, 4), g = yt(f, n), m = f.filePos;
                    if (i && c === 0 && h !== "ds64") throw new Error('Invalid RF64 file: First chunk must be "ds64".');
                    if (h === "fmt ") await this.parseFmtChunk(m, g, n);
                    else if (h === "data") {
                        if (u ??= g, this.dataStart = f.filePos, this.dataSize = Math.min(u, (a ?? 1 / 0) - this.dataStart), this.reader.fileSize === null) break;
                    } else if (h === "ds64") {
                        let b = this.reader.requestSlice(m, g);
                        if (b instanceof Promise && (b = await b), !b) break;
                        const _ = aa(b, n);
                        u = aa(b, n), a = Math.min(_ + 8, this.reader.fileSize ?? 1 / 0);
                    } else h === "LIST" ? await this.parseListChunk(m, g, n) : (h === "ID3 " || h === "id3 ") && await this.parseId3Chunk(m, g);
                    l = m + g + (g & 1), c++;
                }
                if (!this.audioInfo) throw new Error('Invalid WAVE file - missing "fmt " chunk');
                if (this.dataStart === -1) throw new Error('Invalid WAVE file - missing "data" chunk');
                const d = this.audioInfo.blockSizeInBytes;
                this.dataSize = Math.floor(this.dataSize / d) * d, this.trackBackings.push(new bu(this));
            })();
        }
        async parseFmtChunk(e, r, n) {
            let i = this.reader.requestSlice(e, r);
            if (i instanceof Promise && (i = await i), !i) return;
            let s = yr(i, n);
            const a = yr(i, n), o = yt(i, n);
            i.skip(4);
            const c = yr(i, n);
            let u;
            if (r === 14 ? u = 8 : u = yr(i, n), r >= 18 && s !== 357) {
                const l = yr(i, n), d = r - 18;
                if (Math.min(d, l) >= 22 && s === Je.EXTENSIBLE) {
                    i.skip(6);
                    const h = O(i, 16);
                    s = h[0] | h[1] << 8;
                }
            }
            (s === Je.MULAW || s === Je.ALAW) && (u = 8), this.audioInfo = {
                format: s,
                numberOfChannels: a,
                sampleRate: o,
                sampleSizeInBytes: Math.ceil(u / 8),
                blockSizeInBytes: c
            };
        }
        async parseListChunk(e, r, n) {
            let i = this.reader.requestSlice(e, r);
            if (i instanceof Promise && (i = await i), !i) return;
            const s = se(i, 4);
            if (s !== "INFO" && s !== "INF0") return;
            let a = i.filePos;
            for(; a <= e + r - 8;){
                i.filePos = a;
                const o = se(i, 4), c = yt(i, n), u = O(i, c);
                let l = 0;
                for(let f = 0; f < u.length && u[f] !== 0; f++)l++;
                const d = String.fromCharCode(...u.subarray(0, l));
                switch(this.metadataTags.raw ??= {}, this.metadataTags.raw[o] = d, o){
                    case "INAM":
                    case "TITL":
                        this.metadataTags.title ??= d;
                        break;
                    case "TIT3":
                        this.metadataTags.description ??= d;
                        break;
                    case "IART":
                        this.metadataTags.artist ??= d;
                        break;
                    case "IPRD":
                        this.metadataTags.album ??= d;
                        break;
                    case "IPRT":
                    case "ITRK":
                    case "TRCK":
                        {
                            const f = d.split("/"), h = Number.parseInt(f[0], 10), g = f[1] && Number.parseInt(f[1], 10);
                            Number.isInteger(h) && h > 0 && (this.metadataTags.trackNumber ??= h), g && Number.isInteger(g) && g > 0 && (this.metadataTags.tracksTotal ??= g);
                        }
                        break;
                    case "ICRD":
                    case "IDIT":
                        {
                            const f = new Date(d);
                            Number.isNaN(f.getTime()) || (this.metadataTags.date ??= f);
                        }
                        break;
                    case "YEAR":
                        {
                            const f = Number.parseInt(d, 10);
                            Number.isInteger(f) && f > 0 && (this.metadataTags.date ??= new Date(f, 0, 1));
                        }
                        break;
                    case "IGNR":
                    case "GENR":
                        this.metadataTags.genre ??= d;
                        break;
                    case "ICMT":
                    case "CMNT":
                    case "COMM":
                        this.metadataTags.comment ??= d;
                        break;
                }
                a += 8 + c + (c & 1);
            }
        }
        async parseId3Chunk(e, r) {
            let n = this.reader.requestSlice(e, r);
            if (n instanceof Promise && (n = await n), !n) return;
            const i = Nt(n);
            if (i) {
                const s = r - lt;
                if (i.size = Math.min(i.size, s), i.size > 0) {
                    const a = n.slice(e + lt, i.size);
                    Xi(a, i, this.metadataTags);
                }
            }
        }
        getCodec() {
            if (p(this.audioInfo), this.audioInfo.format === Je.MULAW) return "ulaw";
            if (this.audioInfo.format === Je.ALAW) return "alaw";
            if (this.audioInfo.format === Je.PCM) {
                if (this.audioInfo.sampleSizeInBytes === 1) return "pcm-u8";
                if (this.audioInfo.sampleSizeInBytes === 2) return "pcm-s16";
                if (this.audioInfo.sampleSizeInBytes === 3) return "pcm-s24";
                if (this.audioInfo.sampleSizeInBytes === 4) return "pcm-s32";
            }
            return this.audioInfo.format === Je.IEEE_FLOAT && this.audioInfo.sampleSizeInBytes === 4 ? "pcm-f32" : null;
        }
        async getMimeType() {
            return "audio/wav";
        }
        async getTrackBackings() {
            return await this.readMetadata(), this.trackBackings;
        }
        async getMetadataTags() {
            return await this.readMetadata(), this.metadataTags;
        }
    }
    const Ht = 2048;
    class bu {
        constructor(e){
            this.demuxer = e;
        }
        getType() {
            return "audio";
        }
        getId() {
            return 1;
        }
        getNumber() {
            return 1;
        }
        getCodec() {
            return this.demuxer.getCodec();
        }
        getInternalCodecId() {
            return p(this.demuxer.audioInfo), this.demuxer.audioInfo.format;
        }
        async getDecoderConfig() {
            const e = this.demuxer.getCodec();
            return e ? (p(this.demuxer.audioInfo), {
                codec: e,
                numberOfChannels: this.demuxer.audioInfo.numberOfChannels,
                sampleRate: this.demuxer.audioInfo.sampleRate
            }) : null;
        }
        getNumberOfChannels() {
            return p(this.demuxer.audioInfo), this.demuxer.audioInfo.numberOfChannels;
        }
        getSampleRate() {
            return p(this.demuxer.audioInfo), this.demuxer.audioInfo.sampleRate;
        }
        getTimeResolution() {
            return p(this.demuxer.audioInfo), this.demuxer.audioInfo.sampleRate;
        }
        isRelativeToUnixEpoch() {
            return !1;
        }
        getPairingMask() {
            return 1n;
        }
        getBitrate() {
            return null;
        }
        getAverageBitrate() {
            return null;
        }
        async getDurationFromMetadata() {
            return p(this.demuxer.dataSize !== -1), this.demuxer.dataSize / this.demuxer.audioInfo.blockSizeInBytes / this.demuxer.audioInfo.sampleRate;
        }
        async getLiveRefreshInterval() {
            return null;
        }
        getName() {
            return null;
        }
        getLanguageCode() {
            return me;
        }
        getDisposition() {
            return {
                ...dt
            };
        }
        async getPacketAtIndex(e, r) {
            p(e >= 0), p(this.demuxer.audioInfo);
            const n = e * Ht * this.demuxer.audioInfo.blockSizeInBytes;
            if (n >= this.demuxer.dataSize) return null;
            const i = Math.min(Ht * this.demuxer.audioInfo.blockSizeInBytes, this.demuxer.dataSize - n);
            if (this.demuxer.reader.fileSize === null) {
                let c = this.demuxer.reader.requestSlice(this.demuxer.dataStart + n, i);
                if (c instanceof Promise && (c = await c), !c) return null;
            }
            let s;
            if (r.metadataOnly) s = Ee;
            else {
                let c = this.demuxer.reader.requestSlice(this.demuxer.dataStart + n, i);
                c instanceof Promise && (c = await c), p(c), s = O(c, i);
            }
            const a = e * Ht / this.demuxer.audioInfo.sampleRate, o = i / this.demuxer.audioInfo.blockSizeInBytes / this.demuxer.audioInfo.sampleRate;
            return this.demuxer.lastKnownPacketIndex = Math.max(e, this.demuxer.lastKnownPacketIndex), new te(s, "key", a, o, e, i);
        }
        getFirstPacket(e) {
            return this.getPacketAtIndex(0, e);
        }
        async getPacket(e, r) {
            p(this.demuxer.audioInfo);
            const n = Math.floor(Math.min(e * this.demuxer.audioInfo.sampleRate / Ht, (this.demuxer.dataSize - 1) / (Ht * this.demuxer.audioInfo.blockSizeInBytes)));
            if (n < 0) return null;
            const i = await this.getPacketAtIndex(n, r);
            if (i) return i;
            if (n === 0) return null;
            p(this.demuxer.reader.fileSize === null);
            let s = await this.getPacketAtIndex(this.demuxer.lastKnownPacketIndex, r);
            for(; s;){
                const a = await this.getNextPacket(s, r);
                if (!a) break;
                s = a;
            }
            return s;
        }
        getNextPacket(e, r) {
            p(this.demuxer.audioInfo);
            const n = Math.round(e.timestamp * this.demuxer.audioInfo.sampleRate / Ht);
            return this.getPacketAtIndex(n + 1, r);
        }
        getKeyPacket(e, r) {
            return this.getPacket(e, r);
        }
        getNextKeyPacket(e, r) {
            return this.getNextPacket(e, r);
        }
    }
    const Dr = 7, kt = 9, ut = (t)=>{
        const e = t.filePos, r = O(t, 9), n = new Y(r);
        if (n.readBits(12) !== 4095 || (n.skipBits(1), n.readBits(2) !== 0)) return null;
        const a = n.readBits(1), o = n.readBits(2) + 1, c = n.readBits(4);
        if (c === 15) return null;
        n.skipBits(1);
        const u = n.readBits(3);
        if (u === 0) throw new Error("ADTS frames with channel configuration 0 are not supported.");
        n.skipBits(1), n.skipBits(1), n.skipBits(1), n.skipBits(1);
        const l = n.readBits(13);
        n.skipBits(11);
        const d = n.readBits(2) + 1;
        if (d !== 1) throw new Error("ADTS frames with more than one AAC frame are not supported.");
        let f = null;
        return a === 1 ? t.filePos -= 2 : f = n.readBits(16), {
            objectType: o,
            samplingFrequencyIndex: c,
            channelConfiguration: u,
            frameLength: l,
            numberOfAacFrames: d,
            crcCheck: f,
            startPos: e
        };
    };
    const hn = 1024;
    class wu extends ft {
        constructor(e){
            super(e), this.metadataPromise = null, this.firstFrameHeader = null, this.loadedSamples = [], this.metadataTags = null, this.trackBackings = [], this.readingMutex = new lr, this.lastSampleLoaded = !1, this.lastLoadedPos = 0, this.nextTimestampInSamples = 0, this.reader = e._reader;
        }
        async readMetadata() {
            return this.metadataPromise ??= (async ()=>{
                for(; !this.firstFrameHeader && !this.lastSampleLoaded;)await this.advanceReader();
                p(this.firstFrameHeader), this.trackBackings = [
                    new yu(this)
                ];
            })();
        }
        async advanceReader() {
            if (this.lastLoadedPos === 0) for(;;){
                let a = this.reader.requestSlice(this.lastLoadedPos, lt);
                if (a instanceof Promise && (a = await a), !a) {
                    this.lastSampleLoaded = !0;
                    return;
                }
                const o = Nt(a);
                if (!o) break;
                this.lastLoadedPos = a.filePos + o.size;
            }
            let e = this.reader.requestSliceRange(this.lastLoadedPos, Dr, kt);
            if (e instanceof Promise && (e = await e), !e) {
                this.lastSampleLoaded = !0;
                return;
            }
            const r = ut(e);
            if (!r) {
                this.lastSampleLoaded = !0;
                return;
            }
            if (this.reader.fileSize !== null && r.startPos + r.frameLength > this.reader.fileSize) {
                this.lastSampleLoaded = !0;
                return;
            }
            this.firstFrameHeader || (this.firstFrameHeader = r);
            const n = St[r.samplingFrequencyIndex];
            p(n !== void 0);
            const i = hn / n, s = {
                timestamp: this.nextTimestampInSamples / n,
                duration: i,
                dataStart: r.startPos,
                dataSize: r.frameLength
            };
            this.loadedSamples.push(s), this.nextTimestampInSamples += hn, this.lastLoadedPos = r.startPos + r.frameLength;
        }
        async getMimeType() {
            return "audio/aac";
        }
        async getTrackBackings() {
            return await this.readMetadata(), this.trackBackings;
        }
        async getMetadataTags() {
            const e = await this.readingMutex.acquire();
            try {
                if (await this.readMetadata(), this.metadataTags) return this.metadataTags;
                this.metadataTags = {};
                let r = 0;
                for(;;){
                    let n = this.reader.requestSlice(r, lt);
                    if (n instanceof Promise && (n = await n), !n) break;
                    const i = Nt(n);
                    if (!i) break;
                    let s = this.reader.requestSlice(n.filePos, i.size);
                    if (s instanceof Promise && (s = await s), !s) break;
                    Xi(s, i, this.metadataTags), r = n.filePos + i.size;
                }
                return this.metadataTags;
            } finally{
                e();
            }
        }
    }
    class yu {
        constructor(e){
            this.demuxer = e;
        }
        getType() {
            return "audio";
        }
        getId() {
            return 1;
        }
        getNumber() {
            return 1;
        }
        getTimeResolution() {
            return this.getSampleRate() / hn;
        }
        isRelativeToUnixEpoch() {
            return !1;
        }
        getPairingMask() {
            return 1n;
        }
        getBitrate() {
            return null;
        }
        getAverageBitrate() {
            return null;
        }
        async getDurationFromMetadata() {
            return null;
        }
        async getLiveRefreshInterval() {
            return null;
        }
        getName() {
            return null;
        }
        getLanguageCode() {
            return me;
        }
        getCodec() {
            return "aac";
        }
        getInternalCodecId() {
            return p(this.demuxer.firstFrameHeader), this.demuxer.firstFrameHeader.objectType;
        }
        getNumberOfChannels() {
            p(this.demuxer.firstFrameHeader);
            const e = dr[this.demuxer.firstFrameHeader.channelConfiguration];
            return p(e !== void 0), e;
        }
        getSampleRate() {
            p(this.demuxer.firstFrameHeader);
            const e = St[this.demuxer.firstFrameHeader.samplingFrequencyIndex];
            return p(e !== void 0), e;
        }
        getDisposition() {
            return {
                ...dt
            };
        }
        async getDecoderConfig() {
            return p(this.demuxer.firstFrameHeader), {
                codec: `mp4a.40.${this.demuxer.firstFrameHeader.objectType}`,
                numberOfChannels: this.getNumberOfChannels(),
                sampleRate: this.getSampleRate()
            };
        }
        async getPacketAtIndex(e, r) {
            if (e === -1) return null;
            const n = this.demuxer.loadedSamples[e];
            if (!n) return null;
            let i;
            if (r.metadataOnly) i = Ee;
            else {
                let s = this.demuxer.reader.requestSlice(n.dataStart, n.dataSize);
                if (s instanceof Promise && (s = await s), !s) return null;
                i = O(s, n.dataSize);
            }
            return new te(i, "key", n.timestamp, n.duration, e, n.dataSize);
        }
        getFirstPacket(e) {
            return this.getPacketAtIndex(0, e);
        }
        async getNextPacket(e, r) {
            const n = await this.demuxer.readingMutex.acquire();
            try {
                const i = Nr(this.demuxer.loadedSamples, e.timestamp, (a)=>a.timestamp);
                if (i === -1) throw new Error("Packet was not created from this track.");
                const s = i + 1;
                for(; s >= this.demuxer.loadedSamples.length && !this.demuxer.lastSampleLoaded;)await this.demuxer.advanceReader();
                return this.getPacketAtIndex(s, r);
            } finally{
                n();
            }
        }
        async getPacket(e, r) {
            const n = await this.demuxer.readingMutex.acquire();
            try {
                for(;;){
                    const i = K(this.demuxer.loadedSamples, e, (s)=>s.timestamp);
                    if (i === -1 && this.demuxer.loadedSamples.length > 0) return null;
                    if (this.demuxer.lastSampleLoaded) return this.getPacketAtIndex(i, r);
                    if (i >= 0 && i + 1 < this.demuxer.loadedSamples.length) return this.getPacketAtIndex(i, r);
                    await this.demuxer.advanceReader();
                }
            } finally{
                n();
            }
        }
        getKeyPacket(e, r) {
            return this.getPacket(e, r);
        }
        getNextKeyPacket(e, r) {
            return this.getNextPacket(e, r);
        }
    }
    const ku = (t)=>t === 0 ? null : t === 1 ? 192 : t >= 2 && t <= 5 ? 144 * 2 ** t : t === 6 ? "uncommon-u8" : t === 7 ? "uncommon-u16" : t >= 8 && t <= 15 ? 2 ** t : null, Tu = (t, e)=>{
        switch(t){
            case 0:
                return e;
            case 1:
                return 88200;
            case 2:
                return 176400;
            case 3:
                return 192e3;
            case 4:
                return 8e3;
            case 5:
                return 16e3;
            case 6:
                return 22050;
            case 7:
                return 24e3;
            case 8:
                return 32e3;
            case 9:
                return 44100;
            case 10:
                return 48e3;
            case 11:
                return 96e3;
            case 12:
                return "uncommon-u8";
            case 13:
                return "uncommon-u16";
            case 14:
                return "uncommon-u16-10";
            default:
                return null;
        }
    }, Su = (t)=>{
        let e = 0;
        const r = new Y(O(t, 1));
        for(; r.readBits(1) === 1;)e++;
        if (e === 0) return r.readBits(7);
        const n = [], i = e - 1, s = new Y(O(t, i)), a = 8 - e - 1;
        for(let c = 0; c < a; c++)n.unshift(r.readBits(1));
        for(let c = 0; c < i; c++)for(let u = 0; u < 8; u++){
            const l = s.readBits(1);
            u < 2 || n.unshift(l);
        }
        return n.reduce((c, u, l)=>c | u << l, 0);
    }, xu = (t, e)=>{
        if (e === "uncommon-u16") return ce(t) + 1;
        if (e === "uncommon-u8") return M(t) + 1;
        if (typeof e == "number") return e;
        je(e), p(!1);
    }, Pu = (t, e)=>e === "uncommon-u16" ? ce(t) : e === "uncommon-u16-10" ? ce(t) * 10 : e === "uncommon-u8" ? M(t) : typeof e == "number" ? e : null, Cu = (t)=>{
        let r = 0;
        for (const n of t){
            r ^= n;
            for(let i = 0; i < 8; i++)(r & 128) !== 0 ? r = r << 1 ^ 7 : r <<= 1, r &= 255;
        }
        return r;
    };
    class Iu extends ft {
        constructor(e){
            super(e), this.loadedSamples = [], this.metadataPromise = null, this.trackBacking = null, this.metadataTags = {}, this.audioInfo = null, this.lastLoadedPos = null, this.blockingBit = null, this.readingMutex = new lr, this.lastSampleLoaded = !1, this.reader = e._reader;
        }
        async getMetadataTags() {
            return await this.readMetadata(), this.metadataTags;
        }
        async getTrackBackings() {
            return await this.readMetadata(), p(this.trackBacking), [
                this.trackBacking
            ];
        }
        async getMimeType() {
            return "audio/flac";
        }
        async readMetadata() {
            let e = 4;
            return this.metadataPromise ??= (async ()=>{
                for(; this.reader.fileSize === null || e < this.reader.fileSize;){
                    let r = this.reader.requestSlice(e, 4);
                    if (r instanceof Promise && (r = await r), e += 4, r === null) throw new Error(`Metadata block at position ${e} is too small! Corrupted file.`);
                    p(r);
                    const n = M(r), i = Ye(r), s = (n & 128) !== 0;
                    switch(n & 127){
                        case sr.STREAMINFO:
                            {
                                let o = this.reader.requestSlice(e, i);
                                if (o instanceof Promise && (o = await o), p(o), o === null) throw new Error(`StreamInfo block at position ${e} is too small! Corrupted file.`);
                                const c = O(o, 34), u = new Y(c), l = u.readBits(16), d = u.readBits(16), f = u.readBits(24), h = u.readBits(24), g = u.readBits(20), m = u.readBits(3) + 1;
                                u.readBits(5);
                                const b = u.readBits(36);
                                u.skipBits(128);
                                const _ = new Uint8Array(42);
                                _.set(new Uint8Array([
                                    102,
                                    76,
                                    97,
                                    67
                                ]), 0), _.set(new Uint8Array([
                                    128,
                                    0,
                                    0,
                                    34
                                ]), 4), _.set(c, 8), this.audioInfo = {
                                    numberOfChannels: m,
                                    sampleRate: g,
                                    totalSamples: b,
                                    minimumBlockSize: l,
                                    maximumBlockSize: d,
                                    minimumFrameSize: f,
                                    maximumFrameSize: h,
                                    description: _
                                }, this.trackBacking = new vu(this);
                                break;
                            }
                        case sr.VORBIS_COMMENT:
                            {
                                let o = this.reader.requestSlice(e, i);
                                o instanceof Promise && (o = await o), p(o), oi(O(o, i), this.metadataTags);
                                break;
                            }
                        case sr.PICTURE:
                            {
                                let o = this.reader.requestSlice(e, i);
                                o instanceof Promise && (o = await o), p(o);
                                const c = A(o), u = A(o), l = ve.decode(O(o, u)), d = A(o), f = ve.decode(O(o, d));
                                o.skip(16);
                                const h = A(o), g = O(o, h);
                                this.metadataTags.images ??= [], this.metadataTags.images.push({
                                    data: g,
                                    mimeType: l,
                                    kind: c === 3 ? "coverFront" : c === 4 ? "coverBack" : "unknown",
                                    description: f
                                });
                                break;
                            }
                    }
                    if (e += i, s) {
                        this.lastLoadedPos = e;
                        break;
                    }
                }
                if (!this.audioInfo) throw new Error("Missing STREAMINFO metadata block! Corrupted FLAC file.");
            })();
        }
        async readNextFlacFrame({ startPos: e, isFirstPacket: r }) {
            p(this.audioInfo);
            const n = 6, i = 16, s = 10, a = this.audioInfo.maximumBlockSize * this.audioInfo.numberOfChannels * 4 + i + 2, o = this.audioInfo.minimumFrameSize || s, u = (this.audioInfo.maximumFrameSize || a) + i, l = await this.reader.requestSliceRange(e, i, u);
            if (!l) return null;
            const d = this.readFlacFrameHeader({
                slice: l,
                isFirstPacket: r
            });
            if (!d) return null;
            for(l.filePos = e + o;;){
                if (l.filePos > l.end - n) return {
                    num: d.num,
                    blockSize: d.blockSize,
                    sampleRate: d.sampleRate,
                    size: l.end - e,
                    isLastFrame: !0
                };
                if (M(l) === 255) {
                    const h = l.filePos, g = M(l), m = this.blockingBit === 1 ? 249 : 248;
                    if (g !== m) {
                        l.filePos = h;
                        continue;
                    }
                    l.skip(-2);
                    const b = l.filePos - e, _ = this.readFlacFrameHeader({
                        slice: l,
                        isFirstPacket: !1
                    });
                    if (!_) {
                        l.filePos = h;
                        continue;
                    }
                    if (this.blockingBit === 0) {
                        if (_.num - d.num !== 1) {
                            l.filePos = h;
                            continue;
                        }
                    } else if (_.num - d.num !== d.blockSize) {
                        l.filePos = h;
                        continue;
                    }
                    return {
                        num: d.num,
                        blockSize: d.blockSize,
                        sampleRate: d.sampleRate,
                        size: b,
                        isLastFrame: !1
                    };
                }
            }
        }
        readFlacFrameHeader({ slice: e, isFirstPacket: r }) {
            const n = e.filePos, i = O(e, 4), s = new Y(i);
            if (s.readBits(15) !== 32764) return null;
            if (this.blockingBit === null) {
                p(r);
                const b = s.readBits(1);
                this.blockingBit = b;
            } else if (this.blockingBit === 1) {
                if (p(!r), s.readBits(1) !== 1) return null;
            } else if (this.blockingBit === 0) {
                if (p(!r), s.readBits(1) !== 0) return null;
            } else throw new Error("Invalid blocking bit");
            const o = ku(s.readBits(4));
            if (!o) return null;
            p(this.audioInfo);
            const c = Tu(s.readBits(4), this.audioInfo.sampleRate);
            if (!c || (s.readBits(4), s.readBits(3), s.readBits(1) !== 0)) return null;
            const l = Su(e), d = xu(e, o), f = Pu(e, c);
            if (f === null || f !== this.audioInfo.sampleRate) return null;
            const h = e.filePos - n, g = M(e);
            e.skip(-h), e.skip(-1);
            const m = Cu(O(e, h));
            return g !== m ? null : {
                num: l,
                blockSize: d,
                sampleRate: f
            };
        }
        async advanceReader() {
            await this.readMetadata(), p(this.lastLoadedPos !== null), p(this.audioInfo);
            const e = this.lastLoadedPos, r = await this.readNextFlacFrame({
                startPos: e,
                isFirstPacket: this.loadedSamples.length === 0
            });
            if (!r) {
                this.lastSampleLoaded = !0;
                return;
            }
            const n = this.loadedSamples[this.loadedSamples.length - 1], s = {
                blockOffset: n ? n.blockOffset + n.blockSize : 0,
                blockSize: r.blockSize,
                byteOffset: e,
                byteSize: r.size
            };
            if (this.lastLoadedPos = this.lastLoadedPos + r.size, this.loadedSamples.push(s), r.isLastFrame) {
                this.lastSampleLoaded = !0;
                return;
            }
        }
    }
    class vu {
        constructor(e){
            this.demuxer = e;
        }
        getType() {
            return "audio";
        }
        getId() {
            return 1;
        }
        getNumber() {
            return 1;
        }
        getCodec() {
            return "flac";
        }
        getInternalCodecId() {
            return null;
        }
        getNumberOfChannels() {
            return p(this.demuxer.audioInfo), this.demuxer.audioInfo.numberOfChannels;
        }
        getSampleRate() {
            return p(this.demuxer.audioInfo), this.demuxer.audioInfo.sampleRate;
        }
        getName() {
            return null;
        }
        getLanguageCode() {
            return me;
        }
        getTimeResolution() {
            return p(this.demuxer.audioInfo), this.demuxer.audioInfo.sampleRate;
        }
        isRelativeToUnixEpoch() {
            return !1;
        }
        getPairingMask() {
            return 1n;
        }
        getBitrate() {
            return null;
        }
        getAverageBitrate() {
            return null;
        }
        async getDurationFromMetadata() {
            return p(this.demuxer.audioInfo), this.demuxer.audioInfo.totalSamples === 0 ? null : this.demuxer.audioInfo.totalSamples / this.demuxer.audioInfo.sampleRate;
        }
        async getLiveRefreshInterval() {
            return null;
        }
        getDisposition() {
            return {
                ...dt
            };
        }
        async getDecoderConfig() {
            return p(this.demuxer.audioInfo), {
                codec: "flac",
                numberOfChannels: this.demuxer.audioInfo.numberOfChannels,
                sampleRate: this.demuxer.audioInfo.sampleRate,
                description: this.demuxer.audioInfo.description
            };
        }
        async getPacket(e, r) {
            if (p(this.demuxer.audioInfo), e < 0) return null;
            const n = await this.demuxer.readingMutex.acquire();
            try {
                for(;;){
                    const i = K(this.demuxer.loadedSamples, e, (c)=>c.blockOffset / this.demuxer.audioInfo.sampleRate);
                    if (i === -1) {
                        await this.demuxer.advanceReader();
                        continue;
                    }
                    const s = this.demuxer.loadedSamples[i], a = s.blockOffset / this.demuxer.audioInfo.sampleRate, o = s.blockSize / this.demuxer.audioInfo.sampleRate;
                    if (a + o <= e) {
                        if (this.demuxer.lastSampleLoaded) return this.getPacketAtIndex(this.demuxer.loadedSamples.length - 1, r);
                        await this.demuxer.advanceReader();
                        continue;
                    }
                    return this.getPacketAtIndex(i, r);
                }
            } finally{
                n();
            }
        }
        async getNextPacket(e, r) {
            const n = await this.demuxer.readingMutex.acquire();
            try {
                const i = e.sequenceNumber + 1;
                if (this.demuxer.lastSampleLoaded && i >= this.demuxer.loadedSamples.length) return null;
                for(; i >= this.demuxer.loadedSamples.length && !this.demuxer.lastSampleLoaded;)await this.demuxer.advanceReader();
                return this.getPacketAtIndex(i, r);
            } finally{
                n();
            }
        }
        getKeyPacket(e, r) {
            return this.getPacket(e, r);
        }
        getNextKeyPacket(e, r) {
            return this.getNextPacket(e, r);
        }
        async getPacketAtIndex(e, r) {
            const n = this.demuxer.loadedSamples[e];
            if (!n) return null;
            let i;
            if (r.metadataOnly) i = Ee;
            else {
                let o = this.demuxer.reader.requestSlice(n.byteOffset, n.byteSize);
                if (o instanceof Promise && (o = await o), !o) return null;
                i = O(o, n.byteSize);
            }
            p(this.demuxer.audioInfo);
            const s = n.blockOffset / this.demuxer.audioInfo.sampleRate, a = n.blockSize / this.demuxer.audioInfo.sampleRate;
            return new te(i, "key", s, a, e, n.byteSize);
        }
        async getFirstPacket(e) {
            for(; this.demuxer.loadedSamples.length === 0 && !this.demuxer.lastSampleLoaded;)await this.demuxer.advanceReader();
            return this.getPacketAtIndex(0, e);
        }
    }
    const it = 9e4, Ce = 188, Eu = (t)=>{
        let e = "video/MP2T";
        const r = [
            ...new Set(t.filter(Boolean))
        ];
        return r.length > 0 && (e += `; codecs="${r.join(", ")}"`), e;
    };
    const fo = "PES packet is missing PTS where it was expected. PES packets without PTS are not currently supported. If you think this file should be supported, please report it.", Fs = new Set;
    class Au extends ft {
        constructor(e){
            super(e), this.metadataPromise = null, this.elementaryStreams = [], this.trackBackingEntries = [], this.packetOffset = 0, this.packetStride = -1, this.sectionEndPositions = [], this.seekChunkSize = 5 * 1024 * 1024, this.minReferencePointByteDistance = -1, this.reader = e._reader;
        }
        async readMetadata() {
            return this.metadataPromise ??= (async ()=>{
                const e = Ce + 16 + 1;
                let r = this.reader.requestSlice(0, e);
                r instanceof Promise && (r = await r), p(r);
                const n = O(r, e);
                if (n[0] === 71 && n[Ce] === 71) this.packetOffset = 0, this.packetStride = Ce;
                else if (n[0] === 71 && n[Ce + 16] === 71) this.packetOffset = 0, this.packetStride = Ce + 16;
                else if (n[4] === 71 && n[4 + Ce + 4] === 71) this.packetOffset = 4, this.packetStride = Ce + 4;
                else throw new Error("Unreachable.");
                const i = 256;
                this.minReferencePointByteDistance = i * this.packetStride;
                let s = this.packetOffset, a = null, o = !1, c = !1;
                for(;;){
                    const u = await this.readPacketHeader(s);
                    if (!u) break;
                    if (u.payloadUnitStartIndicator === 0) {
                        s += this.packetStride;
                        continue;
                    }
                    const l = await this.readSection(s, !0, !c);
                    if (!l) break;
                    const d = 3, f = 32;
                    let h = !1;
                    if (!c && l.pid !== 0 && !(l.payload[0] === 0 && l.payload[1] === 0 && l.payload[2] === 1)) {
                        const b = new Y(l.payload), _ = b.readAlignedByte();
                        b.skipBits(8 * _), h = b.readBits(8) === 2;
                    }
                    if (l.pid === 0 && !o) {
                        const m = new Y(l.payload), b = m.readAlignedByte();
                        m.skipBits(8 * b), m.skipBits(14);
                        const _ = m.readBits(10);
                        for(m.skipBits(40); 8 * (_ + d) - m.pos > f;){
                            const w = m.readBits(16);
                            m.skipBits(3);
                            const y = m.readBits(13);
                            if (w !== 0) {
                                if (a !== null) throw new Error("Only files with a single program are supported.");
                                a = y;
                            }
                        }
                        if (a === null) throw new Error("Program Association Table must link to a Program Map Table.");
                        o = !0;
                    } else if ((l.pid === a || h) && !c) {
                        const m = new Y(l.payload), b = m.readAlignedByte();
                        m.skipBits(8 * b), m.skipBits(12);
                        const _ = m.readBits(12);
                        m.skipBits(43), m.readBits(13), m.skipBits(6);
                        const w = m.readBits(10);
                        for(m.skipBits(8 * w); 8 * (_ + d) - m.pos > f;){
                            const y = m.readBits(8);
                            m.skipBits(3);
                            const T = m.readBits(13);
                            m.skipBits(6);
                            const S = m.readBits(10), C = m.pos + 8 * S;
                            let I = !1, P = !1;
                            for(; m.pos < C;){
                                const v = m.readBits(8), R = m.readBits(8);
                                v === 106 ? I = !0 : (v === 122 || v === 204) && (P = !0), m.skipBits(8 * R);
                            }
                            let x = null;
                            switch(y){
                                case 27:
                                case 36:
                                    x = {
                                        type: "video",
                                        codec: y === 27 ? "avc" : "hevc",
                                        decoderConfig: null,
                                        avcCodecInfo: null,
                                        hevcCodecInfo: null,
                                        colorSpace: {
                                            primaries: null,
                                            transfer: null,
                                            matrix: null,
                                            fullRange: null
                                        },
                                        width: -1,
                                        height: -1,
                                        squarePixelWidth: -1,
                                        squarePixelHeight: -1,
                                        reorderSize: -1
                                    };
                                    break;
                                case 3:
                                case 4:
                                case 15:
                                case 129:
                                case 135:
                                    {
                                        let v;
                                        if (y === 3 || y === 4) v = "mp3";
                                        else if (y === 15) v = "aac";
                                        else if (y === 129) v = "ac3";
                                        else if (y === 135) v = "eac3";
                                        else throw new Error("Unreachable.");
                                        x = {
                                            type: "audio",
                                            codec: v,
                                            decoderConfig: null,
                                            aacCodecInfo: null,
                                            numberOfChannels: -1,
                                            sampleRate: -1
                                        };
                                    }
                                    break;
                                case 6:
                                    P ? x = {
                                        type: "audio",
                                        codec: "eac3",
                                        decoderConfig: null,
                                        aacCodecInfo: null,
                                        numberOfChannels: -1,
                                        sampleRate: -1
                                    } : I && (x = {
                                        type: "audio",
                                        codec: "ac3",
                                        decoderConfig: null,
                                        aacCodecInfo: null,
                                        numberOfChannels: -1,
                                        sampleRate: -1
                                    });
                                    break;
                                default:
                                    Fs.has(y) || (console.warn(`Note: MPEG-TS streams with stream_type 0x${y.toString(16)} are not currently supported.`), Fs.add(y));
                            }
                            x && this.elementaryStreams.push({
                                demuxer: this,
                                pid: T,
                                streamType: y,
                                initialized: !1,
                                firstSection: null,
                                canBeTrustedWithKeyPackets: !1,
                                info: x,
                                referencePesPackets: []
                            });
                        }
                        c = !0;
                    } else {
                        const m = this.elementaryStreams.find((b)=>b.pid === l.pid);
                        e: if (m && !m.initialized) {
                            const b = Zt(l, !0);
                            if (!b) throw new Error(`Couldn't read first PES packet for Elementary Stream with PID ${m.pid}`);
                            if (m.firstSection = l, m.canBeTrustedWithKeyPackets = l.randomAccessIndicator === 1, this.input._initInput) {
                                const y = (await this.input._initInput._getDemuxer()).elementaryStreams.find((T)=>T.pid === l.pid && T.info.codec === m.info.codec);
                                if (y) {
                                    m.info = y.info, m.initialized = !0;
                                    break e;
                                }
                            }
                            const _ = new xr(m, b);
                            if (m.info.type === "video") {
                                for(;;){
                                    const w = _;
                                    if (w.suppliedPacket = null, await _.markNextPacket(), m.info.codec === "avc") {
                                        if (!_.suppliedPacket) throw new Error("Invalid AVC video stream; could not extract AVCDecoderConfigurationRecord from any packet.");
                                        if (m.info.avcCodecInfo = zi(_.suppliedPacket.data), !m.info.avcCodecInfo) continue;
                                        const y = m.info.avcCodecInfo.sequenceParameterSets[0];
                                        p(y);
                                        const T = Ni(y);
                                        m.info.width = T.displayWidth, m.info.height = T.displayHeight;
                                        const S = T.pixelAspectRatio.num, C = T.pixelAspectRatio.den;
                                        S > 0 && C > 0 && (S > C ? (m.info.squarePixelWidth = Math.round(m.info.width * S / C), m.info.squarePixelHeight = m.info.height) : (m.info.squarePixelWidth = m.info.width, m.info.squarePixelHeight = Math.round(m.info.height * C / S))), m.info.colorSpace = {
                                            primaries: sn[T.colourPrimaries],
                                            transfer: an[T.transferCharacteristics],
                                            matrix: on[T.matrixCoefficients],
                                            fullRange: !!T.fullRangeFlag
                                        }, m.info.reorderSize = T.maxDecFrameBuffering;
                                        break;
                                    } else if (m.info.codec === "hevc") {
                                        if (!_.suppliedPacket) throw new Error("Invalid HEVC video stream; could not extract HVCDecoderConfigurationRecord from first packet.");
                                        if (m.info.hevcCodecInfo = Ui(_.suppliedPacket.data), !m.info.hevcCodecInfo) continue;
                                        const T = m.info.hevcCodecInfo.arrays.find((C)=>C.nalUnitType === _e.SPS_NUT).nalUnits[0];
                                        p(T);
                                        const S = Na(T);
                                        m.info.width = S.displayWidth, m.info.height = S.displayHeight, S.pixelAspectRatio.num > S.pixelAspectRatio.den ? (m.info.squarePixelWidth = Math.round(m.info.width * S.pixelAspectRatio.num / S.pixelAspectRatio.den), m.info.squarePixelHeight = m.info.height) : (m.info.squarePixelWidth = m.info.width, m.info.squarePixelHeight = Math.round(m.info.height * S.pixelAspectRatio.den / S.pixelAspectRatio.num)), m.info.colorSpace = {
                                            primaries: sn[S.colourPrimaries],
                                            transfer: an[S.transferCharacteristics],
                                            matrix: on[S.matrixCoefficients],
                                            fullRange: !!S.fullRangeFlag
                                        }, m.info.reorderSize = S.maxDecFrameBuffering;
                                        break;
                                    } else throw new Error("Unhandled.");
                                }
                                m.info.decoderConfig = {
                                    codec: Ri({
                                        width: m.info.width,
                                        height: m.info.height,
                                        codec: m.info.codec,
                                        codecDescription: null,
                                        colorSpace: m.info.colorSpace,
                                        avcType: 1,
                                        avcCodecInfo: m.info.avcCodecInfo,
                                        hevcCodecInfo: m.info.hevcCodecInfo,
                                        vp9CodecInfo: null,
                                        av1CodecInfo: null
                                    }),
                                    codedWidth: m.info.width,
                                    codedHeight: m.info.height,
                                    colorSpace: m.info.colorSpace
                                }, (m.info.width !== m.info.squarePixelWidth || m.info.height !== m.info.squarePixelHeight) && (m.info.decoderConfig.displayAspectWidth = m.info.squarePixelWidth, m.info.decoderConfig.displayAspectHeight = m.info.squarePixelHeight), m.initialized = !0;
                            } else {
                                if (await _.markNextPacket(), !_.suppliedPacket) throw new Error(`Couldn't parse first media packet for Elementary Stream with PID ${m.pid}`);
                                if (m.info.codec === "aac") {
                                    const w = ye.tempFromBytes(_.suppliedPacket.data), y = ut(w);
                                    if (!y) throw new Error("Invalid AAC audio stream; could not read ADTS frame header from first packet.");
                                    m.info.aacCodecInfo = {
                                        isMpeg2: !1,
                                        objectType: y.objectType
                                    }, m.info.numberOfChannels = dr[y.channelConfiguration], m.info.sampleRate = St[y.samplingFrequencyIndex];
                                } else if (m.info.codec === "mp3") {
                                    const w = A(ye.tempFromBytes(_.suppliedPacket.data)), y = Di(w, _.suppliedPacket.data.byteLength);
                                    if (!y.header) throw new Error("Invalid MP3 audio stream; could not read frame header from first packet.");
                                    m.info.numberOfChannels = y.header.channel === 3 ? 1 : 2, m.info.sampleRate = y.header.sampleRate;
                                } else if (m.info.codec === "ac3") {
                                    const w = Va(_.suppliedPacket.data);
                                    if (!w) throw new Error("Invalid AC-3 audio stream; could not read sync frame from first packet.");
                                    if (w.fscod === 3) throw new Error("Invalid AC-3 audio stream; reserved sample rate code found in first packet.");
                                    m.info.numberOfChannels = Vi[w.acmod] + w.lfeon, m.info.sampleRate = kn[w.fscod];
                                } else if (m.info.codec === "eac3") {
                                    const w = qa(_.suppliedPacket.data);
                                    if (!w) throw new Error("Invalid E-AC-3 audio stream; could not read sync frame from first packet.");
                                    const y = Ga(w);
                                    if (y === null) throw new Error("Invalid E-AC-3 audio stream; reserved sample rate code found in first packet.");
                                    m.info.numberOfChannels = ja(w), m.info.sampleRate = y;
                                } else throw new Error("Unhandled.");
                                m.info.decoderConfig = {
                                    codec: Mi({
                                        codec: m.info.codec,
                                        codecDescription: null,
                                        aacCodecInfo: m.info.aacCodecInfo
                                    }),
                                    numberOfChannels: m.info.numberOfChannels,
                                    sampleRate: m.info.sampleRate
                                }, m.initialized = !0;
                            }
                        }
                    }
                    if (c && this.elementaryStreams.every((m)=>m.initialized)) break;
                    s += this.packetStride;
                }
                if (!c) throw o ? new Error("No Program Map Table found in the file.") : new Error("No Program Association Table found in the file.");
                for (const u of this.elementaryStreams)u.info.type === "video" ? this.trackBackingEntries.push(new Bu(u)) : this.trackBackingEntries.push(new Fu(u));
            })();
        }
        async getTrackBackings() {
            return await this.readMetadata(), this.trackBackingEntries;
        }
        async getMetadataTags() {
            return {};
        }
        async getMimeType() {
            await this.readMetadata();
            const e = await Promise.all(this.trackBackingEntries.map((r)=>r.getDecoderConfig().then((n)=>n?.codec ?? null)));
            return Eu(e);
        }
        async readSection(e, r, n = !1) {
            let i = e, s = e;
            const a = [];
            let o = 0, c = null, u = !0, l = 0;
            for(;;){
                const f = await this.readPacket(s);
                if (s += this.packetStride, !f) break;
                if (c) {
                    if (f.pid !== c.pid) {
                        if (n) break;
                        continue;
                    }
                    if (f.payloadUnitStartIndicator === 1) break;
                } else {
                    if (f.payloadUnitStartIndicator === 0) break;
                    c = f;
                }
                const h = !!(f.adaptationFieldControl & 2), g = !!(f.adaptationFieldControl & 1);
                let m = 0;
                if (h && (m = 1 + f.body[0], f === c && m > 1 && (l = f.body[1] >> 6 & 1)), g && (m === 0 ? (a.push(f.body), o += f.body.byteLength) : (a.push(f.body.subarray(m)), o += f.body.byteLength - m)), i = s, !r && o >= 64) {
                    u = !1;
                    break;
                }
                if (Nr(this.sectionEndPositions, i, (_)=>_) !== -1) {
                    u = !1;
                    break;
                }
            }
            if (u) {
                const f = K(this.sectionEndPositions, i, (h)=>h);
                this.sectionEndPositions.splice(f + 1, 0, i);
            }
            if (!c) return null;
            let d;
            if (a.length === 1) d = a[0];
            else {
                const f = a.reduce((g, m)=>g + m.length, 0);
                d = new Uint8Array(f);
                let h = 0;
                for (const g of a)d.set(g, h), h += g.length;
            }
            return {
                startPos: e,
                endPos: r ? i : null,
                pid: c.pid,
                payload: d,
                randomAccessIndicator: l
            };
        }
        async readPacketHeader(e) {
            let r = this.reader.requestSlice(e, 4);
            if (r instanceof Promise && (r = await r), !r) return null;
            if (M(r) !== 71) throw new Error("Invalid TS packet sync byte. Likely an internal bug, please report this file.");
            const i = ce(r), s = i >> 14 & 1, a = i & 8191, c = M(r) >> 4 & 3;
            return {
                payloadUnitStartIndicator: s,
                pid: a,
                adaptationFieldControl: c
            };
        }
        async readPacket(e) {
            let r = this.reader.requestSlice(e, Ce);
            if (r instanceof Promise && (r = await r), !r) return null;
            const n = O(r, Ce);
            if (n[0] !== 71) throw new Error("Invalid TS packet sync byte. Likely an internal bug, please report this file.");
            const s = (n[1] << 8) + n[2], a = s >> 14 & 1, o = s & 8191, u = n[3] >> 4 & 3;
            return {
                payloadUnitStartIndicator: a,
                pid: o,
                adaptationFieldControl: u,
                body: n.subarray(4)
            };
        }
    }
    const Et = (t, e)=>{
        if (t.payload.byteLength < 3) return null;
        const r = new Y(t.payload);
        if (r.readBits(24) !== 1) return null;
        const i = r.readBits(8);
        if (r.skipBits(16), i === 188 || i === 190 || i === 191 || i === 240 || i === 241 || i === 255 || i === 242 || i === 248) return null;
        r.skipBits(8);
        const s = r.readBits(2);
        r.skipBits(14);
        let a = null;
        if (s === 2 || s === 3) a = 0, r.skipBits(4), a += r.readBits(3) * (1 << 30), r.skipBits(1), a += r.readBits(15) * 32768, r.skipBits(1), a += r.readBits(15);
        else if (e) throw new Error(fo);
        return {
            sectionStartPos: t.startPos,
            sectionEndPos: t.endPos,
            pts: a,
            randomAccessIndicator: t.randomAccessIndicator
        };
    }, Zt = (t, e)=>{
        p(t.endPos !== null);
        const r = Et(t, e);
        if (!r) return null;
        const n = new Y(t.payload);
        n.skipBits(32);
        const i = n.readBits(16), s = 6;
        n.skipBits(16);
        const a = n.readBits(8), o = n.pos + 8 * a;
        n.pos = o;
        const c = o / 8;
        p(Number.isInteger(c));
        const u = t.payload.subarray(c, i > 0 ? s + i : t.payload.byteLength);
        return {
            ...r,
            data: u
        };
    };
    class xn {
        constructor(e){
            this.elementaryStream = e, this.packetBuffers = new WeakMap, this.packetSectionStarts = new WeakMap;
        }
        getId() {
            return this.elementaryStream.pid;
        }
        getNumber() {
            const e = this.elementaryStream.demuxer, r = this.elementaryStream.info.type;
            let n = 0;
            for (const i of e.trackBackingEntries)if (i.getType() === r && n++, p(i instanceof xn), i.elementaryStream === this.elementaryStream) break;
            return n;
        }
        getCodec() {
            throw new Error("Not implemented on base class.");
        }
        getInternalCodecId() {
            return this.elementaryStream.streamType;
        }
        getName() {
            return null;
        }
        getLanguageCode() {
            return me;
        }
        getDisposition() {
            return {
                ...dt,
                primary: !1
            };
        }
        getTimeResolution() {
            return it;
        }
        isRelativeToUnixEpoch() {
            return !1;
        }
        getPairingMask() {
            return 1n;
        }
        getBitrate() {
            return null;
        }
        getAverageBitrate() {
            return null;
        }
        async getDurationFromMetadata() {
            return null;
        }
        async getLiveRefreshInterval() {
            return null;
        }
        createEncodedPacket(e, r, n) {
            let i;
            return this.allPacketsAreKeyPackets() ? i = "key" : i = e.randomAccessIndicator === 1 ? "key" : "delta", new te(n.metadataOnly ? Ee : e.data, i, e.pts / it, Math.max(r / it, 0), e.sequenceNumber, e.data.byteLength);
        }
        async getFirstPacket(e) {
            const r = this.elementaryStream.firstSection;
            p(r);
            const n = Zt(r, !0);
            p(n);
            const i = new xr(this.elementaryStream, n), s = new Hn(this, i), a = await s.readNext();
            if (!a) return null;
            const o = this.createEncodedPacket(a.packet, a.duration, e);
            return this.packetBuffers.set(o, s), this.packetSectionStarts.set(o, a.packet.sectionStartPos), o;
        }
        async getNextPacket(e, r) {
            let n = this.packetBuffers.get(e);
            if (n) {
                const l = await n.readNext();
                if (!l) return null;
                this.packetBuffers.delete(e);
                const d = this.createEncodedPacket(l.packet, l.duration, r);
                return this.packetBuffers.set(d, n), this.packetSectionStarts.set(d, l.packet.sectionStartPos), d;
            }
            const i = this.packetSectionStarts.get(e);
            if (i === void 0) throw new Error("Packet was not created from this track.");
            const a = await this.elementaryStream.demuxer.readSection(i, !0);
            p(a);
            const o = Zt(a, !0);
            p(o);
            const c = new xr(this.elementaryStream, o);
            n = new Hn(this, c);
            const u = e.sequenceNumber;
            for(;;){
                const l = await n.readNext();
                if (!l) return null;
                if (l.packet.sequenceNumber > u) {
                    const d = this.createEncodedPacket(l.packet, l.duration, r);
                    return this.packetBuffers.set(d, n), this.packetSectionStarts.set(d, l.packet.sectionStartPos), d;
                }
            }
        }
        async getNextKeyPacket(e, r) {
            let n = e;
            for(;;){
                if (n = await this.getNextPacket(n, r), !n) return null;
                if (n.type === "key") return n;
            }
        }
        getPacket(e, r) {
            return this.doPacketLookup(e, !1, r);
        }
        getKeyPacket(e, r) {
            return this.doPacketLookup(e, !0, r);
        }
        async doPacketLookup(e, r, n) {
            const i = Br(e * it), s = this.elementaryStream.demuxer, { reader: a, seekChunkSize: o } = s, c = this.elementaryStream.pid, u = async (T, S, C)=>{
                let I = T;
                for(; I < S;){
                    const P = await s.readPacketHeader(I);
                    if (!P) return null;
                    if (P.pid === c && P.payloadUnitStartIndicator === 1) {
                        const x = await s.readSection(I, C);
                        if (!x) return null;
                        const v = Et(x, !1);
                        if (v && v.pts !== null) return {
                            pesPacketHeader: v,
                            section: x
                        };
                    }
                    I += s.packetStride;
                }
                return null;
            }, l = this.elementaryStream.firstSection;
            p(l);
            const d = Et(l, !0);
            if (p(d), i < d.pts) return null;
            let f;
            const h = this.elementaryStream.referencePesPackets, g = K(h, i, (T)=>T.pts), m = g !== -1 ? h[g] : null;
            if (m && i - m.pts < it / 2) f = m.sectionStartPos;
            else {
                let T = 0;
                if (a.fileSize !== null) {
                    const S = Math.ceil(a.fileSize / o);
                    if (S > 1) {
                        let C = 0, I = S - 1;
                        for(T = C; C <= I;){
                            const P = Math.floor((C + I) / 2), x = Fn(P * o, s.packetStride) + d.sectionStartPos, v = x + o, R = await u(x, v, !1);
                            if (!R) {
                                I = P - 1;
                                continue;
                            }
                            R.pesPacketHeader.pts <= i ? (T = P, C = P + 1) : I = P - 1;
                        }
                    }
                }
                f = Fn(T * o, s.packetStride) + d.sectionStartPos;
            }
            let _ = (await u(f, a.fileSize ?? 1 / 0, !1))?.pesPacketHeader ?? null;
            _ || (_ = d);
            const w = this.getReorderSize(), y = async (T, S)=>{
                const C = await s.readSection(T, !0);
                p(C);
                const I = Zt(C, !0);
                p(I);
                const P = new xr(this.elementaryStream, I), x = new Hn(this, P);
                for(; !((ie(x.presentationOrderPackets)?.pts ?? -1 / 0) >= i || !await x.readNextPacket()););
                const v = Si(x.presentationOrderPackets, S);
                if (v === -1) return null;
                const R = x.presentationOrderPackets[v], B = v === 0 ? 0 : R.pts - x.presentationOrderPackets[v - 1].pts;
                for(; x.decodeOrderPackets[0] !== R;)x.decodeOrderPackets.shift();
                x.lastDuration = B;
                const L = await x.readNext();
                p(L);
                const q = this.createEncodedPacket(L.packet, L.duration, n);
                return this.packetBuffers.set(q, x), this.packetSectionStarts.set(q, L.packet.sectionStartPos), q;
            };
            if (!r || this.allPacketsAreKeyPackets()) {
                e: for(;;){
                    let T = _.sectionStartPos + s.packetStride;
                    for(;;){
                        const S = await s.readPacketHeader(T);
                        if (!S) break e;
                        if (S.pid === c && S.payloadUnitStartIndicator === 1) {
                            const C = await s.readSection(T, !1);
                            if (C) {
                                const I = Et(C, !1);
                                if (I && I.pts !== null) {
                                    if (I.pts > i) break e;
                                    _ = I, mi(this.elementaryStream, _);
                                    break;
                                }
                            }
                        }
                        T += s.packetStride;
                    }
                }
                e: for(let T = 0; T < w + 1; T++){
                    let S = _.sectionStartPos - s.packetStride;
                    for(; S >= s.packetOffset;){
                        const C = await s.readPacketHeader(S);
                        if (!C) break e;
                        if (C.pid === c && C.payloadUnitStartIndicator === 1) {
                            const I = await s.readSection(S, !1);
                            if (I) {
                                const P = Et(I, !1);
                                if (P && P.pts !== null) {
                                    _ = P;
                                    break;
                                }
                            }
                        }
                        S -= s.packetStride;
                    }
                }
                return y(_.sectionStartPos, (T)=>T.pts <= i);
            } else {
                let T = f, S = null;
                const C = !this.elementaryStream.canBeTrustedWithKeyPackets;
                for(;;){
                    let I = null;
                    const P = T <= d.sectionStartPos;
                    let x, v = null;
                    if (P) x = d, v = l;
                    else {
                        const L = await u(T, a.fileSize ?? 1 / 0, C);
                        x = L?.pesPacketHeader ?? null, v = L?.section ?? null;
                    }
                    let R = !1, B = 0;
                    e: for(; x && !(S !== null && x.sectionStartPos >= S);){
                        if (x.pts <= i) {
                            let q;
                            if (this.elementaryStream.canBeTrustedWithKeyPackets) q = x.randomAccessIndicator === 1;
                            else {
                                p(v);
                                const V = Zt(v, !0);
                                p(V);
                                const W = new xr(this.elementaryStream, V);
                                await W.markNextPacket(), q = W.suppliedPacket?.randomAccessIndicator === 1;
                            }
                            q && (I = x);
                        }
                        if (x.pts > i && (R = !0), R && (B++, B > w)) break;
                        let L = x.sectionStartPos + s.packetStride;
                        for(;;){
                            const q = await s.readPacketHeader(L);
                            if (!q) break e;
                            if (q.pid === c && q.payloadUnitStartIndicator === 1) {
                                const V = await s.readSection(L, C);
                                if (V) {
                                    const W = Et(V, !1);
                                    if (W && W.pts !== null) {
                                        x = W, v = V, mi(this.elementaryStream, x);
                                        break;
                                    }
                                }
                            }
                            L += s.packetStride;
                        }
                    }
                    if (I) {
                        let L = I;
                        if (B === 0) e: for(let V = 0; V < w; V++){
                            let W = L.sectionStartPos - s.packetStride;
                            for(; W >= s.packetOffset;){
                                const oe = await s.readPacketHeader(W);
                                if (!oe) break e;
                                if (oe.pid === c && oe.payloadUnitStartIndicator === 1) {
                                    const pe = await s.readSection(W, C);
                                    if (pe) {
                                        const Ue = Et(pe, !1);
                                        if (Ue && Ue.pts !== null) {
                                            L = Ue;
                                            break;
                                        }
                                    }
                                }
                                W -= s.packetStride;
                            }
                        }
                        const q = await y(L.sectionStartPos, (V)=>V.pts <= i && V.randomAccessIndicator === 1);
                        return p(q), q;
                    }
                    if (P) return null;
                    S = T, T = Math.max(Fn(T - d.sectionStartPos - o, s.packetStride) + d.sectionStartPos, d.sectionStartPos);
                }
            }
        }
    }
    class Bu extends xn {
        getType() {
            return "video";
        }
        getCodec() {
            return this.elementaryStream.info.codec;
        }
        getCodedWidth() {
            return this.elementaryStream.info.width;
        }
        getCodedHeight() {
            return this.elementaryStream.info.height;
        }
        getSquarePixelWidth() {
            return this.elementaryStream.info.squarePixelWidth;
        }
        getSquarePixelHeight() {
            return this.elementaryStream.info.squarePixelHeight;
        }
        getRotation() {
            return 0;
        }
        async getColorSpace() {
            return this.elementaryStream.info.colorSpace;
        }
        async canBeTransparent() {
            return !1;
        }
        async getDecoderConfig() {
            return p(this.elementaryStream.info.decoderConfig), this.elementaryStream.info.decoderConfig;
        }
        allPacketsAreKeyPackets() {
            return !1;
        }
        getReorderSize() {
            return this.elementaryStream.info.reorderSize;
        }
    }
    class Fu extends xn {
        getType() {
            return "audio";
        }
        getCodec() {
            return this.elementaryStream.info.codec;
        }
        getNumberOfChannels() {
            return this.elementaryStream.info.numberOfChannels;
        }
        getSampleRate() {
            return this.elementaryStream.info.sampleRate;
        }
        async getDecoderConfig() {
            return p(this.elementaryStream.info.decoderConfig), this.elementaryStream.info.decoderConfig;
        }
        allPacketsAreKeyPackets() {
            return !0;
        }
        getReorderSize() {
            return 0;
        }
    }
    const mi = (t, e)=>{
        const r = t.referencePesPackets, n = K(r, e.sectionStartPos, (i)=>i.sectionStartPos);
        if (n >= 0) {
            const i = r[n];
            if (e.pts <= i.pts) return !1;
            const s = t.demuxer.minReferencePointByteDistance;
            if (e.sectionStartPos - i.sectionStartPos < s) return !1;
            if (n < r.length - 1) {
                const a = r[n + 1];
                if (a.pts < e.pts || a.sectionStartPos - e.sectionStartPos < s) return !1;
            }
        }
        return r.splice(n + 1, 0, e), !0;
    };
    class xr {
        constructor(e, r){
            this.currentPos = 0, this.pesPackets = [], this.currentPesPacketIndex = 0, this.currentPesPacketPos = 0, this.endPos = 0, this.lastSuppliedPesPacket = null, this.nextPts = null, this.suppliedPacket = null, this.elementaryStream = e, this.pid = e.pid, this.demuxer = e.demuxer, this.startingPesPacket = r;
        }
        ensureBuffered(e) {
            const r = this.endPos - this.currentPos;
            return r >= e ? e : this.bufferData(e - r).then(()=>Math.min(this.endPos - this.currentPos, e));
        }
        getCurrentPesPacket() {
            const e = this.pesPackets[this.currentPesPacketIndex];
            return p(e), e;
        }
        async bufferData(e) {
            const r = this.endPos + e;
            for(; this.endPos < r;){
                let n;
                if (this.pesPackets.length === 0) n = this.startingPesPacket;
                else {
                    let i = ie(this.pesPackets).sectionEndPos;
                    for(p(i !== null);;){
                        const s = await this.demuxer.readPacketHeader(i);
                        if (!s) return;
                        if (s.pid === this.pid) {
                            const a = await this.demuxer.readSection(i, !0);
                            if (!a) return;
                            const o = Zt(a, !1);
                            if (o) {
                                n = o;
                                break;
                            }
                        }
                        i += this.demuxer.packetStride;
                    }
                }
                this.pesPackets.push(n), this.endPos += n.data.byteLength;
            }
        }
        readBytes(e) {
            const r = this.getCurrentPesPacket(), n = this.currentPos - this.currentPesPacketPos, i = n + e;
            if (this.currentPos += e, i <= r.data.byteLength) return r.data.subarray(n, i);
            const s = new Uint8Array(e);
            s.set(r.data.subarray(n));
            let a = r.data.byteLength - n;
            for(;;){
                this.advanceCurrentPacket();
                const o = this.getCurrentPesPacket(), c = e - a;
                if (c <= o.data.byteLength) {
                    s.set(o.data.subarray(0, c), a);
                    break;
                }
                s.set(o.data, a), a += o.data.byteLength;
            }
            return s;
        }
        readU8() {
            let e = this.getCurrentPesPacket();
            const r = this.currentPos - this.currentPesPacketPos;
            return this.currentPos++, r < e.data.byteLength ? e.data[r] : (this.advanceCurrentPacket(), e = this.getCurrentPesPacket(), e.data[0]);
        }
        seekTo(e) {
            if (e !== this.currentPos) {
                if (e < this.currentPos) for(; e < this.currentPesPacketPos;){
                    this.currentPesPacketIndex--;
                    const r = this.getCurrentPesPacket();
                    this.currentPesPacketPos -= r.data.byteLength;
                }
                else for(;;){
                    const r = this.getCurrentPesPacket(), n = this.currentPesPacketPos + r.data.byteLength;
                    if (e < n) break;
                    this.currentPesPacketPos += r.data.byteLength, this.currentPesPacketIndex++;
                }
                this.currentPos = e;
            }
        }
        skip(e) {
            this.seekTo(this.currentPos + e);
        }
        advanceCurrentPacket() {
            this.currentPesPacketPos += this.getCurrentPesPacket().data.byteLength, this.currentPesPacketIndex++;
        }
        async markNextPacket() {
            p(!this.suppliedPacket);
            const e = this.elementaryStream;
            if (e.info.type === "video") {
                const r = e.info.codec, n = 1024;
                if (r !== "avc" && r !== "hevc") throw new Error("Unhandled.");
                let i = null;
                for(;;){
                    let s = this.ensureBuffered(n);
                    if (s instanceof Promise && (s = await s), s === 0) break;
                    const a = this.currentPos, o = this.readBytes(s), c = o.byteLength;
                    let u = 0;
                    for(; u < c;){
                        const l = o.indexOf(0, u);
                        if (l === -1 || l >= c) break;
                        u = l;
                        const d = a + u;
                        if (u + 4 >= c) {
                            this.seekTo(d);
                            break;
                        }
                        const f = o[u + 1], h = o[u + 2], g = o[u + 3];
                        let m = 0, b = null;
                        if (f === 0 && h === 0 && g === 1 ? (m = 4, b = o[u + 4]) : f === 0 && h === 1 && (m = 3, b = g), m === 0) {
                            u++;
                            continue;
                        }
                        const _ = d;
                        if (i === null) {
                            i = _, u += m;
                            continue;
                        }
                        if (b !== null) {
                            const w = r === "avc" ? Tn(b) : ur(b);
                            if (r === "avc" ? w === qe.AUD : w === _e.AUD_NUT) {
                                const T = _ - i;
                                return this.seekTo(i), this.supplyPacket(T, 0);
                            }
                        }
                        u += m;
                    }
                    if (s < n) break;
                }
                if (i !== null) {
                    const s = this.endPos - i;
                    return this.seekTo(i), this.supplyPacket(s, 0);
                }
            } else {
                const r = e.info.codec, n = 128;
                for(;;){
                    let i = this.ensureBuffered(n);
                    i instanceof Promise && (i = await i);
                    const s = this.currentPos;
                    for(; this.currentPos - s < i;){
                        const a = this.readU8();
                        if (r === "aac") {
                            if (a !== 255) continue;
                            this.skip(-1);
                            const o = this.currentPos;
                            let c = this.ensureBuffered(kt);
                            if (c instanceof Promise && (c = await c), c < kt) return;
                            const u = this.readBytes(kt), l = ut(ye.tempFromBytes(u));
                            if (l) {
                                this.seekTo(o);
                                let d = this.ensureBuffered(l.frameLength);
                                return d instanceof Promise && (d = await d), this.supplyPacket(d, Math.round(hn * it / e.info.sampleRate));
                            } else this.seekTo(o + 1);
                        } else if (r === "mp3") {
                            if (a !== 255) continue;
                            this.skip(-1);
                            const o = this.currentPos;
                            let c = this.ensureBuffered(Ot);
                            if (c instanceof Promise && (c = await c), c < Ot) return;
                            const u = this.readBytes(Ot), l = Z(u).getUint32(0), d = Di(l, null);
                            if (d.header) {
                                this.seekTo(o);
                                let f = this.ensureBuffered(d.header.totalSize);
                                f instanceof Promise && (f = await f);
                                const h = d.header.audioSamplesInFrame * it / e.info.sampleRate;
                                return this.supplyPacket(f, Math.round(h));
                            } else this.seekTo(o + 1);
                        } else if (r === "ac3") {
                            if (a !== 11) continue;
                            this.skip(-1);
                            const o = this.currentPos;
                            let c = this.ensureBuffered(5);
                            if (c instanceof Promise && (c = await c), c < 5) return;
                            const u = this.readBytes(5);
                            if (u[0] !== 11 || u[1] !== 119) {
                                this.seekTo(o + 1);
                                continue;
                            }
                            const l = u[4] >> 6, d = u[4] & 63;
                            if (l === 3 || d > 37) {
                                this.seekTo(o + 1);
                                continue;
                            }
                            const f = Vc[3 * d + l];
                            p(f !== void 0), this.seekTo(o), c = this.ensureBuffered(f), c instanceof Promise && (c = await c);
                            const h = Math.round(Hc * it / e.info.sampleRate);
                            return this.supplyPacket(c, h);
                        } else if (r === "eac3") {
                            if (a !== 11) continue;
                            this.skip(-1);
                            const o = this.currentPos;
                            let c = this.ensureBuffered(5);
                            if (c instanceof Promise && (c = await c), c < 5) return;
                            const u = this.readBytes(5);
                            if (u[0] !== 11 || u[1] !== 119) {
                                this.seekTo(o + 1);
                                continue;
                            }
                            const d = (((u[2] & 7) << 8 | u[3]) + 1) * 2, h = u[4] >> 6 === 3 ? 3 : u[4] >> 4 & 3, g = Ha[h];
                            this.seekTo(o), c = this.ensureBuffered(d), c instanceof Promise && (c = await c);
                            const m = g * 256, b = Math.round(m * it / e.info.sampleRate);
                            return this.supplyPacket(c, b);
                        } else throw new Error("Unhandled.");
                    }
                    if (i < n) break;
                }
            }
        }
        supplyPacket(e, r) {
            const n = this.getCurrentPesPacket();
            let i;
            if (this.lastSuppliedPesPacket === n) p(this.nextPts !== null), i = this.nextPts;
            else {
                if (n.pts === null) throw new Error(fo);
                i = n.pts, mi(this.elementaryStream, n);
            }
            this.lastSuppliedPesPacket = n, this.nextPts = i + r;
            const s = n.sectionStartPos, a = s + (this.currentPos - this.currentPesPacketPos), o = this.readBytes(e);
            let c = n.randomAccessIndicator;
            if (c === 0 && !this.elementaryStream.canBeTrustedWithKeyPackets) {
                if (this.elementaryStream.info.type === "audio") c = 1;
                else if (this.elementaryStream.info.decoderConfig) {
                    const u = Wi(this.elementaryStream.info.codec, this.elementaryStream.info.decoderConfig, o) === "key";
                    c = Number(u);
                }
            }
            this.suppliedPacket = {
                pts: i,
                data: o,
                sequenceNumber: a,
                sectionStartPos: s,
                randomAccessIndicator: c
            }, this.pesPackets.splice(0, this.currentPesPacketIndex), this.currentPesPacketIndex = 0;
        }
    }
    class Hn {
        constructor(e, r){
            this.decodeOrderPackets = [], this.reorderBuffer = [], this.presentationOrderPackets = [], this.reachedEnd = !1, this.lastDuration = 0, this.backing = e, this.context = r, this.reorderSize = e.getReorderSize(), p(this.reorderSize >= 0);
        }
        async readNext() {
            if (this.decodeOrderPackets.length === 0 && !await this.readNextPacket()) return null;
            await this.ensureCurrentPacketHasNext();
            const e = this.decodeOrderPackets[0], r = this.presentationOrderPackets.indexOf(e);
            p(r !== -1);
            let n;
            for(r === this.presentationOrderPackets.length - 1 ? n = this.lastDuration : (n = this.presentationOrderPackets[r + 1].pts - e.pts, this.lastDuration = n), this.decodeOrderPackets.shift(); this.presentationOrderPackets.length > 0;){
                const i = this.presentationOrderPackets[0];
                if (this.decodeOrderPackets.includes(i)) break;
                this.presentationOrderPackets.shift();
            }
            return {
                packet: e,
                duration: n
            };
        }
        async readNextPacket() {
            if (this.reachedEnd) return !1;
            let e;
            return this.context.suppliedPacket ? e = this.context.suppliedPacket : (await this.context.markNextPacket(), e = this.context.suppliedPacket), this.context.suppliedPacket = null, e ? (this.decodeOrderPackets.push(e), this.processPacketThroughReorderBuffer(e), !0) : (this.reachedEnd = !0, this.flushReorderBuffer(), !1);
        }
        async ensureCurrentPacketHasNext() {
            const e = this.decodeOrderPackets[0];
            for(p(e);;){
                const r = this.presentationOrderPackets.indexOf(e);
                if (r !== -1 && r <= this.presentationOrderPackets.length - 2 || !await this.readNextPacket()) break;
            }
        }
        processPacketThroughReorderBuffer(e) {
            if (this.reorderBuffer.push(e), this.reorderBuffer.length > this.reorderSize) {
                let r = 0;
                for(let i = 1; i < this.reorderBuffer.length; i++)this.reorderBuffer[i].pts < this.reorderBuffer[r].pts && (r = i);
                const n = this.reorderBuffer[r];
                this.presentationOrderPackets.push(n), this.reorderBuffer.splice(r, 1);
            }
        }
        flushReorderBuffer() {
            this.reorderBuffer.sort((e, r)=>e.pts - r.pts), this.presentationOrderPackets.push(...this.reorderBuffer), this.reorderBuffer.length = 0;
        }
    }
    const ho = "application/vnd.apple.mpegurl", Rs = "#EXT-X-STREAM-INF:", Ms = "#EXT-X-I-FRAME-STREAM-INF:", Ds = "#EXT-X-MEDIA:", pi = "#EXTINF:", Os = "#EXT-X-MAP:", zs = "#EXT-X-KEY:", Ns = "#EXT-X-MEDIA-SEQUENCE:", Us = "#EXT-X-BYTERANGE:", Ls = "#EXT-X-PROGRAM-DATE-TIME:", Ru = "#EXT-X-DISCONTINUITY", Ws = "#EXT-X-TARGETDURATION:", Mu = "#EXT-X-ENDLIST", Vs = "#EXT-X-PLAYLIST-TYPE:", Du = "#EXT-X-I-FRAMES-ONLY", mo = (t)=>t.length === 0 || t.startsWith("#") && !t.startsWith("#EXT");
    class vr {
        constructor(e){
            this._attributes = {};
            let r = "", n = "", i = !1, s = !1;
            for(let a = 0; a < e.length; a++){
                const o = e[a];
                o === '"' ? s = !s : o === "=" && !i && !s ? i = !0 : o === "," && !s ? (r && (this._attributes[r.trim().toLowerCase()] = n), r = "", n = "", i = !1) : i ? n += o : r += o;
            }
            r && (this._attributes[r.trim().toLowerCase()] = n);
        }
        get(e) {
            return this._attributes[e.toLowerCase()] ?? null;
        }
        getAsNumber(e) {
            const r = this.get(e);
            if (r === null) return null;
            const n = Number(r);
            return Number.isFinite(n) ? n : null;
        }
        merge(e) {
            Object.assign(this._attributes, e._attributes);
        }
    }
    class Ou {
        constructor(e, r, n){
            this.nextInputCacheAge = 0, this.inputCache = [], this.trackBackingsPromise = null, this.firstSegment = null, this.firstSegmentFirstTimestamps = new WeakMap, this.firstTimestampCache = new WeakMap, this.input = e, this.path = r, this.trackDeclarations = n;
        }
        async getDurationFromMetadata(e) {
            const r = await this.getSegmentAt(1 / 0, {
                skipLiveWait: e.skipLiveWait
            });
            return r ? r.timestamp + r.duration : null;
        }
        async getTrackBackings() {
            return this.trackBackingsPromise ??= (async ()=>{
                const e = [];
                if (this.trackDeclarations) {
                    for (const r of this.trackDeclarations)if (r.type === "video") {
                        const n = Tr(e, (i)=>i.getType() === "video") + 1;
                        e.push(new Hs(this, r, n));
                    } else if (r.type === "audio") {
                        const n = Tr(e, (i)=>i.getType() === "audio") + 1;
                        e.push(new qs(this, r, n));
                    }
                } else {
                    if (this.firstSegment = await this.getFirstSegment({}), !this.firstSegment) return [];
                    const n = await this.getInputForSegment(this.firstSegment).getTracks();
                    for (const i of n)if (i.type === "video") {
                        const s = Tr(e, (a)=>a.getType() === "video") + 1;
                        e.push(new Hs(this, {
                            id: e.length + 1,
                            type: "video"
                        }, s));
                    } else if (i.type === "audio") {
                        const s = Tr(e, (a)=>a.getType() === "audio") + 1;
                        e.push(new qs(this, {
                            id: e.length + 1,
                            type: "audio"
                        }, s));
                    }
                }
                return e;
            })();
        }
        async getFirstTimestampForInput(e) {
            const r = this.firstTimestampCache.get(e);
            if (r !== void 0) return r;
            const n = await e.getFirstTimestamp();
            return this.firstTimestampCache.set(e, n), n;
        }
        async getMediaOffset(e, r) {
            const n = e.firstSegment ?? e;
            let i;
            if (this.firstSegmentFirstTimestamps.has(n)) i = this.firstSegmentFirstTimestamps.get(n);
            else {
                const u = this.getInputForSegment(n);
                i = await this.getFirstTimestampForInput(u), this.firstSegmentFirstTimestamps.set(n, i);
            }
            if (n === e) return n.timestamp - i;
            const s = await this.getFirstTimestampForInput(r), a = e.timestamp - n.timestamp, c = s - i - a;
            return Math.abs(c) <= Math.min(.25, a) ? n.timestamp - i : e.timestamp - s;
        }
        dispose() {
            for (const e of this.inputCache)e.input.dispose();
            this.inputCache.length = 0;
        }
    }
    class po {
        constructor(e, r, n){
            this.packetInfos = new WeakMap, this.hydrationPromise = null, this.firstInputTrack = null, this.segmentedInput = e, this.decl = r, this.number = n;
        }
        hydrate() {
            return this.hydrationPromise ??= (async ()=>{
                if (this.segmentedInput.firstSegment ??= await this.segmentedInput.getFirstSegment({}), !this.segmentedInput.firstSegment) throw new Error("Missing first segment, can't retrieve track.");
                const n = (await this.segmentedInput.getInputForSegment(this.segmentedInput.firstSegment).getTracks()).find((i)=>i.type === this.decl.type && i.number === this.number);
                if (!n) throw new Error("No matching track found in underlying media data.");
                this.firstInputTrack = n;
            })();
        }
        getId() {
            return this.decl.id;
        }
        getType() {
            return this.decl.type;
        }
        getNumber() {
            return this.number;
        }
        delegate(e) {
            return this.firstInputTrack ? e() : this.hydrate().then(e);
        }
        async getDecoderConfig() {
            return this.delegate(()=>this.firstInputTrack._backing.getDecoderConfig());
        }
        getHasOnlyKeyPackets() {
            return this.delegate(()=>this.firstInputTrack._backing.getHasOnlyKeyPackets?.() ?? null);
        }
        getPairingMask() {
            return 1n;
        }
        getCodec() {
            return this.delegate(()=>this.firstInputTrack._backing.getCodec());
        }
        getInternalCodecId() {
            return this.delegate(()=>this.firstInputTrack._backing.getInternalCodecId());
        }
        getDisposition() {
            return this.delegate(()=>this.firstInputTrack._backing.getDisposition());
        }
        getLanguageCode() {
            return this.delegate(()=>this.firstInputTrack._backing.getLanguageCode());
        }
        getName() {
            return this.delegate(()=>this.firstInputTrack._backing.getName());
        }
        getTimeResolution() {
            return this.delegate(()=>this.firstInputTrack._backing.getTimeResolution());
        }
        async isRelativeToUnixEpoch() {
            return await this.hydrate(), p(this.segmentedInput.firstSegment), this.segmentedInput.firstSegment.relativeToUnixEpoch;
        }
        getBitrate() {
            return this.delegate(()=>this.firstInputTrack._backing.getBitrate());
        }
        getAverageBitrate() {
            return this.delegate(()=>this.firstInputTrack._backing.getAverageBitrate());
        }
        getDurationFromMetadata(e) {
            return this.segmentedInput.getDurationFromMetadata(e);
        }
        getLiveRefreshInterval() {
            return this.segmentedInput.getLiveRefreshInterval();
        }
        async createAdjustedPacket(e, r, n) {
            p(e.sequenceNumber >= 0), p(this.segmentedInput.firstSegment);
            const i = await this.segmentedInput.getMediaOffset(r, n.input), s = r.timestamp - this.segmentedInput.firstSegment.timestamp, a = e.clone({
                timestamp: cr(e.timestamp + i, await n.getTimeResolution()),
                sequenceNumber: Math.floor(1e8 * s) + e.sequenceNumber
            });
            return this.packetInfos.set(a, {
                segment: r,
                track: n,
                sourcePacket: e
            }), a;
        }
        async getFirstPacket(e) {
            await this.hydrate(), p(this.segmentedInput.firstSegment), p(this.firstInputTrack);
            const r = await this.firstInputTrack._backing.getFirstPacket(e);
            return r ? this.createAdjustedPacket(r, this.segmentedInput.firstSegment, this.firstInputTrack) : null;
        }
        getNextPacket(e, r) {
            return this._getNextInternal(e, r, !1);
        }
        getNextKeyPacket(e, r) {
            return this._getNextInternal(e, r, !0);
        }
        async _getNextInternal(e, r, n) {
            const i = this.packetInfos.get(e);
            if (!i) throw new Error("Packet was not created from this track.");
            const s = n ? await i.track._backing.getNextKeyPacket(i.sourcePacket, r) : await i.track._backing.getNextPacket(i.sourcePacket, r);
            if (s) return this.createAdjustedPacket(s, i.segment, i.track);
            let a = i.segment;
            for(;;){
                const o = await this.segmentedInput.getNextSegment(a, {
                    skipLiveWait: r.skipLiveWait
                });
                if (!o) return null;
                const l = (await this.segmentedInput.getInputForSegment(o).getTracks()).find((f)=>f.type === i.track.type && f.number === i.track.number);
                if (!l) {
                    a = o;
                    continue;
                }
                const d = await l._backing.getFirstPacket(r);
                return d ? this.createAdjustedPacket(d, o, l) : null;
            }
        }
        getPacket(e, r) {
            return this._getPacketInternal(e, r, !1);
        }
        getKeyPacket(e, r) {
            return this._getPacketInternal(e, r, !0);
        }
        async _getPacketInternal(e, r, n) {
            let i = await this.segmentedInput.getSegmentAt(e, {
                skipLiveWait: r.skipLiveWait
            });
            if (!i) return null;
            for(await this.hydrate(); i;){
                const s = this.segmentedInput.getInputForSegment(i), o = (await s.getTracks()).find((d)=>d.type === this.firstInputTrack.type && d.number === this.firstInputTrack.number);
                if (!o) {
                    i = await this.segmentedInput.getPreviousSegment(i, {
                        skipLiveWait: r.skipLiveWait
                    });
                    continue;
                }
                const c = await this.segmentedInput.getMediaOffset(i, s), u = e - c, l = n ? await o._backing.getKeyPacket(u, r) : await o._backing.getPacket(u, r);
                if (!l) {
                    i = await this.segmentedInput.getPreviousSegment(i, {
                        skipLiveWait: r.skipLiveWait
                    });
                    continue;
                }
                return this.createAdjustedPacket(l, i, o);
            }
            return null;
        }
    }
    class Hs extends po {
        getType() {
            return "video";
        }
        getCodec() {
            return this.delegate(()=>this.firstInputTrack._backing.getCodec());
        }
        getCodedWidth() {
            return this.delegate(()=>this.firstInputTrack._backing.getCodedWidth());
        }
        getCodedHeight() {
            return this.delegate(()=>this.firstInputTrack._backing.getCodedHeight());
        }
        getSquarePixelWidth() {
            return this.delegate(()=>this.firstInputTrack._backing.getSquarePixelWidth());
        }
        getSquarePixelHeight() {
            return this.delegate(()=>this.firstInputTrack._backing.getSquarePixelHeight());
        }
        getRotation() {
            return this.delegate(()=>this.firstInputTrack._backing.getRotation());
        }
        async getColorSpace() {
            return this.delegate(()=>this.firstInputTrack._backing.getColorSpace());
        }
        async canBeTransparent() {
            return this.delegate(()=>this.firstInputTrack._backing.canBeTransparent());
        }
        async getDecoderConfig() {
            return this.delegate(()=>this.firstInputTrack._backing.getDecoderConfig());
        }
    }
    class qs extends po {
        getType() {
            return "audio";
        }
        getCodec() {
            return this.delegate(()=>this.firstInputTrack._backing.getCodec());
        }
        getNumberOfChannels() {
            return this.delegate(()=>this.firstInputTrack._backing.getNumberOfChannels());
        }
        getSampleRate() {
            return this.delegate(()=>this.firstInputTrack._backing.getSampleRate());
        }
        async getDecoderConfig() {
            return this.delegate(()=>this.firstInputTrack._backing.getDecoderConfig());
        }
    }
    Ii();
    const go = 0, _o = 1 / 0;
    class Ge extends wn {
        constructor(){
            super(...arguments), this._disposed = !1, this._refCount = 0, this._usedForHls = !1, this._sizePromise = null, this.onread = null;
        }
        async getSizeOrNull() {
            if (this._disposed) throw new Ie;
            return this._sizePromise ??= (async ()=>{
                let e = this._getFileSize();
                return e !== void 0 || (await this._read(0, 1, go, _o), e = this._getFileSize(), p(e !== void 0)), e;
            })();
        }
        async getSize() {
            if (this._disposed) throw new Ie;
            const e = await this.getSizeOrNull();
            if (e === null) throw new Error("Cannot determine the size of an unsized source.");
            return e;
        }
        slice(e, r) {
            if (!Number.isInteger(e) || e < 0) throw new TypeError("offset must be a non-negative integer.");
            if (r !== void 0 && (!Number.isInteger(r) || r < 0)) throw new TypeError("length, when provided, must be a non-negative integer.");
            return new Wu(this, e, r);
        }
        _dispatchRead(e, r) {
            this.onread?.(e, r), this._emit("read", {
                start: e,
                end: r
            });
        }
        ref() {
            return new Gi(this);
        }
    }
    class Gi {
        constructor(e){
            if (this._freed = !1, e._disposed) throw new Error("Cannot ref a disposed source.");
            e._refCount++, this._source = e;
        }
        get source() {
            if (!this._source) throw new Error("Can't get source; ref has already been freed.");
            return this._source;
        }
        get freed() {
            return this._freed;
        }
        free() {
            if (this._freed) throw new Error("Illegal operation: double free on SourceRef.");
            const e = this.source;
            p(e._refCount > 0), e._refCount--, e._refCount === 0 && (e._dispose(), e._disposed = !0), this._freed = !0, this._source = null;
        }
        [Symbol.dispose]() {
            this.freed || this.free();
        }
    }
    class Pn extends Ge {
        constructor(e, r){
            if (typeof e != "string") throw new TypeError("rootPath must be a string.");
            if (typeof r != "function") throw new TypeError("requestHandler must be a function.");
            super(), this.rootPath = e, this.requestHandler = r;
        }
        _resolveRequest(e) {
            const r = this.requestHandler(e), n = (i)=>{
                if (!(i instanceof Ge || i instanceof Gi)) throw new TypeError("requestHandler must return or resolve to a Source or SourceRef.");
                const s = i instanceof Ge ? i.ref() : i;
                return s.source._usedForHls ||= this._usedForHls, s;
            };
            return r instanceof Promise ? r.then(n) : n(r);
        }
    }
    const Gs = (t, e)=>t.path === e.path;
    class zu extends Pn {
        constructor(){
            super(...arguments), this._root = null, this._rootRequest = null;
        }
        _read(e, r, n, i) {
            if (!this._root) {
                if (!this._rootRequest) {
                    const s = this._resolveRequest({
                        path: this.rootPath,
                        isRoot: !0
                    }), a = (o)=>{
                        const c = o instanceof Ge ? o.ref() : o;
                        return this._root = c, this._rootRequest = null, c;
                    };
                    s instanceof Promise ? this._rootRequest = s.then(a) : (a(s), p(this._root));
                }
                if (this._rootRequest) return this._rootRequest.then((s)=>s.source._read(e, r, n, i));
            }
            return this._root.source._read(e, r, n, i);
        }
        _getFileSize() {
            if (this._root) return this._root.source._getFileSize();
        }
        _dispose() {
            this._root ? this._root.free() : this._rootRequest && this._rootRequest.then((e)=>e.free());
        }
    }
    lS = class extends Ge {
        constructor(e, r = {}){
            if (!(e instanceof Blob)) throw new TypeError("blob must be a Blob.");
            if (!r || typeof r != "object") throw new TypeError("options must be an object.");
            if (r.maxCacheSize !== void 0 && (!vi(r.maxCacheSize) || r.maxCacheSize < 0)) throw new TypeError("options.maxCacheSize, when provided, must be a non-negative number.");
            if (r.useStreamReader !== void 0 && typeof r.useStreamReader != "boolean") throw new TypeError("options.useStreamReader, when provided, must be a boolean.");
            super(), this._readers = new WeakMap, this._blob = e, this._options = r, this._orchestrator = new Lu({
                maxCacheSize: r.maxCacheSize ?? 8 * 2 ** 20,
                maxWorkerCount: 4,
                runWorker: this._runWorker.bind(this),
                prefetchProfile: Uu.fileSystem
            }), this._orchestrator.fileSize = e.size;
        }
        _getFileSize() {
            return this._orchestrator.fileSize;
        }
        _read(e, r, n, i) {
            return this._orchestrator.read(e, r, n, i);
        }
        async _runWorker(e) {
            p(e.strictTarget);
            let r = this._readers.get(e);
            for(r === void 0 && ("stream" in this._blob && !Pr() && this._options.useStreamReader !== !1 ? r = this._blob.slice(e.currentPos).stream().getReader() : r = null, this._readers.set(e, r)); e.currentPos < e.targetPos && !e.aborted;)if (r) {
                const { done: n, value: i } = await r.read();
                if (n) throw this._orchestrator.onWorkerFinished(e), new Error("Blob reader stopped unexpectedly before all requested data was read.");
                if (e.aborted) break;
                this._dispatchRead(e.currentPos, e.currentPos + i.length), this._orchestrator.supplyWorkerData(e, i);
            } else {
                const n = await this._blob.slice(e.currentPos, e.targetPos).arrayBuffer();
                if (e.aborted) break;
                this._dispatchRead(e.currentPos, e.currentPos + n.byteLength), this._orchestrator.supplyWorkerData(e, new Uint8Array(n));
            }
            this._orchestrator.signalWorkerStoppedRunning(e), e.aborted && await r?.cancel();
        }
        _dispose() {
            this._orchestrator.dispose();
        }
    };
    class Nu extends Ge {
        constructor(e, r = {}){
            if (!(e instanceof ReadableStream)) throw new TypeError("stream must be a ReadableStream.");
            if (!r || typeof r != "object") throw new TypeError("options must be an object.");
            if (r.maxCacheSize !== void 0 && (!vi(r.maxCacheSize) || r.maxCacheSize < 0)) throw new TypeError("options.maxCacheSize, when provided, must be a non-negative number.");
            super(), this._reader = null, this._cache = [], this._pendingSlices = [], this._currentIndex = 0, this._targetIndex = 0, this._maxRequestedIndex = 0, this._endIndex = null, this._pulling = !1, this._stream = e, this._maxCacheSize = r.maxCacheSize ?? 32 * 2 ** 20;
        }
        _getFileSize() {
            return this._endIndex;
        }
        _read(e, r) {
            if (this._endIndex !== null && r > this._endIndex) return null;
            this._maxRequestedIndex = Math.max(this._maxRequestedIndex, r);
            const n = K(this._cache, e, (l)=>l.start), i = n !== -1 ? this._cache[n] : null;
            if (i && i.start <= e && r <= i.end) return {
                bytes: i.bytes,
                view: i.view,
                offset: i.start
            };
            let s = e;
            const a = new Uint8Array(r - e);
            if (n !== -1) for(let l = n; l < this._cache.length; l++){
                const d = this._cache[l];
                if (d.start >= r) break;
                const f = Math.max(e, d.start);
                f > s && this._throwDueToCacheMiss();
                const h = Math.min(r, d.end);
                f < h && (a.set(d.bytes.subarray(f - d.start, h - d.start), f - e), s = h);
            }
            if (s === r) return {
                bytes: a,
                view: Z(a),
                offset: e
            };
            this._currentIndex > s && this._throwDueToCacheMiss();
            const { promise: o, resolve: c, reject: u } = le();
            return this._pendingSlices.push({
                start: e,
                end: r,
                bytes: a,
                resolve: c,
                reject: u
            }), this._targetIndex = Math.max(this._targetIndex, r), this._pulling || (this._pulling = !0, this._pull().catch((l)=>{
                if (this._pulling = !1, this._pendingSlices.length > 0) this._pendingSlices.forEach((d)=>d.reject(l)), this._pendingSlices.length = 0;
                else throw l;
            })), o;
        }
        _throwDueToCacheMiss() {
            throw new Error("Read is before the cached region. With ReadableStreamSource, you must access the data more sequentially or increase the size of its cache.");
        }
        async _pull() {
            for(this._reader ??= this._stream.getReader(); this._currentIndex < this._targetIndex && !this._disposed;){
                const { done: e, value: r } = await this._reader.read();
                if (e) {
                    for (const s of this._pendingSlices)s.resolve(null);
                    this._pendingSlices.length = 0, this._endIndex = this._currentIndex;
                    break;
                }
                const n = this._currentIndex, i = this._currentIndex + r.byteLength;
                this._dispatchRead(n, i);
                for(let s = 0; s < this._pendingSlices.length; s++){
                    const a = this._pendingSlices[s], o = Math.max(n, a.start), c = Math.min(i, a.end);
                    o < c && (a.bytes.set(r.subarray(o - n, c - n), o - a.start), c === a.end && (a.resolve({
                        bytes: a.bytes,
                        view: Z(a.bytes),
                        offset: a.start
                    }), this._pendingSlices.splice(s, 1), s--));
                }
                for(this._cache.push({
                    start: n,
                    end: i,
                    bytes: r,
                    view: Z(r),
                    age: 0
                }); this._cache.length > 0;){
                    const s = this._cache[0];
                    if (this._maxRequestedIndex - s.end <= this._maxCacheSize) break;
                    this._cache.shift();
                }
                this._currentIndex += r.byteLength;
            }
            this._pulling = !1;
        }
        _dispose() {
            this._pendingSlices.length = 0, this._cache.length = 0, this._reader?.cancel();
        }
    }
    const Uu = {
        fileSystem: (t, e)=>(t = Math.floor((t - 65536) / 65536) * 65536, e = Math.ceil((e + 65536) / 65536) * 65536, {
                start: t,
                end: e
            })
    };
    class Lu {
        constructor(e){
            this.options = e, this.fileSize = null, this.nextAge = 0, this.workers = [], this.cache = [], this.currentCacheSize = 0, this.disposed = !1, this.queuedReads = [];
        }
        read(e, r, n, i) {
            p(!this.disposed);
            const s = this.options.prefetchProfile(e, r, this.workers), a = Math.max(s.start, n), o = Math.min(s.end, this.fileSize ?? 1 / 0, i);
            p(a <= e && r <= o);
            let c = null;
            const u = K(this.cache, e, (S)=>S.start), l = u !== -1 ? this.cache[u] : null;
            l && l.start <= e && r <= l.end && (l.age = this.nextAge++, c = {
                bytes: l.bytes,
                view: l.view,
                offset: l.start
            });
            const d = K(this.cache, a, (S)=>S.start), f = c ? null : new Uint8Array(r - e);
            let h = 0, g = a;
            const m = [];
            if (d !== -1) {
                for(let S = d; S < this.cache.length; S++){
                    const C = this.cache[S];
                    if (C.start >= o) break;
                    if (C.end <= a) continue;
                    const I = Math.max(a, C.start), P = Math.min(o, C.end);
                    if (p(I <= P), g < I && m.push({
                        start: g,
                        end: I
                    }), g = P, f) {
                        const x = Math.max(e, C.start), v = Math.min(r, C.end);
                        if (x < v) {
                            const R = x - e;
                            f.set(C.bytes.subarray(x - C.start, v - C.start), R), R === h && (h = v - e);
                        }
                    }
                    C.age = this.nextAge++;
                }
                g < o && m.push({
                    start: g,
                    end: o
                });
            } else m.push({
                start: a,
                end: o
            });
            if (f && h >= f.length && (c = {
                bytes: f,
                view: Z(f),
                offset: e
            }), m.length === 0) return p(c), c;
            const { promise: b, resolve: _, reject: w } = le(), y = [];
            for (const S of m){
                const C = Math.max(e, S.start), I = Math.min(r, S.end);
                C === S.start && I === S.end ? y.push(S) : C < I && y.push({
                    start: C,
                    end: I
                });
            }
            const T = f && {
                start: e,
                bytes: f,
                holes: y,
                resolve: _,
                reject: w
            };
            e: for (const S of m){
                for (const P of this.workers)if (this.checkHoleAgainstWorker(P, S, T ? [
                    T
                ] : [])) {
                    this.checkQueuedReadsAgainstWorker(P);
                    continue e;
                }
                const C = S.end < o || this.fileSize !== null, I = this.createWorker(S.start, S.end, C);
                if (I) T && (I.pendingSlices = [
                    T
                ]), this.runWorker(I);
                else {
                    let P = K(this.queuedReads, S.start, (v)=>v.hole.start), x = P !== -1 ? this.queuedReads[P] : null;
                    for(x && S.start <= x.hole.end ? (x.hole.end = Math.max(x.hole.end, S.end), x.strictTarget &&= C, T && x.pendingSlices.push(T)) : (P++, x = {
                        hole: {
                            start: S.start,
                            end: S.end
                        },
                        strictTarget: C,
                        pendingSlices: T ? [
                            T
                        ] : [],
                        age: this.nextAge++
                    }, this.queuedReads.splice(P, 0, x)); P + 1 < this.queuedReads.length;){
                        const v = this.queuedReads[P + 1];
                        if (v.hole.start > x.hole.end) break;
                        x.hole.end = Math.max(x.hole.end, v.hole.end), x.pendingSlices.push(...v.pendingSlices), x.strictTarget &&= v.strictTarget, x.age = Math.min(x.age, v.age), this.queuedReads.splice(P + 1, 1);
                    }
                }
            }
            return c || (p(f), c = b.then((S)=>S && {
                    bytes: S,
                    view: Z(S),
                    offset: e
                })), c;
        }
        checkHoleAgainstWorker(e, r, n) {
            if (hs(r.start - 131072, r.start, e.currentPos, e.targetPos)) {
                e.targetPos = Math.max(e.targetPos, r.end);
                for(let s = 0; s < n.length; s++){
                    const a = n[s];
                    e.pendingSlices.includes(a) || e.pendingSlices.push(a);
                }
                return e.running || this.runWorker(e), !0;
            }
            return !1;
        }
        checkQueuedReadsAgainstWorker(e) {
            let r = !1;
            for(let n = 0; n < this.queuedReads.length; n++){
                const i = this.queuedReads[n];
                if (this.checkHoleAgainstWorker(e, i.hole, i.pendingSlices)) this.queuedReads.splice(n, 1), n--, r = !0;
                else if (r) break;
            }
        }
        createWorker(e, r, n) {
            if (this.workers.length >= this.options.maxWorkerCount) {
                let s = null, a = null;
                for(let o = 0; o < this.workers.length; o++){
                    const c = this.workers[o];
                    !c.running && c.pendingSlices.length === 0 && (!s || c.age < s.age) && (a = o, s = c);
                }
                if (s) p(a !== null), p(s.pendingSlices.length === 0), this.workers.splice(a, 1);
                else return null;
            }
            const i = {
                startPos: e,
                currentPos: e,
                targetPos: r,
                strictTarget: n,
                running: !1,
                aborted: this.disposed,
                pendingSlices: [],
                age: this.nextAge++
            };
            return this.workers.push(i), i;
        }
        runWorker(e) {
            p(!e.running), p(e.currentPos < e.targetPos), e.running = !0, e.age = this.nextAge++, this.options.runWorker(e).catch((r)=>{
                if (e.running = !1, e.pendingSlices.length > 0) e.pendingSlices.forEach((n)=>n.reject(r)), e.pendingSlices.length = 0;
                else throw r;
            }).finally(()=>{
                if (!e.running && this.queuedReads.length > 0) {
                    let r = 0;
                    for(let s = 1; s < this.queuedReads.length; s++)this.queuedReads[s].age < this.queuedReads[r].age && (r = s);
                    const n = this.queuedReads[r];
                    this.queuedReads.splice(r, 1);
                    const i = this.createWorker(n.hole.start, n.hole.end, n.strictTarget);
                    p(i), i.pendingSlices = n.pendingSlices, this.runWorker(i);
                }
            });
        }
        consolidateEverythingIntoOneWorker(e) {
            const r = new Set(e.pendingSlices);
            for(let n = 0; n < this.workers.length; n++){
                const i = this.workers[n];
                if (i !== e) {
                    for (const s of i.pendingSlices)r.add(s);
                    i.aborted = !0, i.pendingSlices.length = 0, this.workers.splice(n, 1), n--;
                }
            }
            for(let n = 0; n < this.queuedReads.length; n++){
                const i = this.queuedReads[n];
                for (const s of i.pendingSlices)r.add(s);
            }
            e.pendingSlices = [
                ...r
            ], this.queuedReads.length = 0;
        }
        supplyWorkerData(e, r) {
            p(!e.aborted);
            const n = e.currentPos, i = n + r.length;
            this.insertIntoCache({
                start: n,
                end: i,
                bytes: r,
                view: Z(r),
                age: this.nextAge++
            }), e.currentPos += r.length, e.currentPos > e.targetPos && (e.targetPos = e.currentPos, this.checkQueuedReadsAgainstWorker(e));
            for(let s = 0; s < e.pendingSlices.length; s++){
                const a = e.pendingSlices[s], o = Math.max(n, a.start), c = Math.min(i, a.start + a.bytes.length);
                o < c && a.bytes.set(r.subarray(o - n, c - n), o - a.start);
                for(let u = 0; u < a.holes.length; u++){
                    const l = a.holes[u];
                    n <= l.start && i > l.start && (l.start = i), l.end <= l.start && (a.holes.splice(u, 1), u--);
                }
                a.holes.length === 0 && (a.resolve(a.bytes), e.pendingSlices.splice(s, 1), s--);
            }
            for(let s = 0; s < this.workers.length; s++){
                const a = this.workers[s];
                e === a || a.running || hs(n, i, a.currentPos, a.targetPos) && (this.workers.splice(s, 1), s--);
            }
        }
        supplyFileSize(e) {
            p(this.fileSize === null), this.fileSize = e;
            for (const r of this.workers){
                r.targetPos = Math.min(r.targetPos, e), r.strictTarget = !0;
                for(let n = 0; n < r.pendingSlices.length; n++){
                    const i = r.pendingSlices[n];
                    for (const s of i.holes)if (s.end > e) {
                        i.resolve(null), r.pendingSlices.splice(n, 1), n--;
                        break;
                    }
                }
            }
            for(let r = 0; r < this.queuedReads.length; r++){
                const n = this.queuedReads[r];
                if (n.hole.start >= e) {
                    for (const i of n.pendingSlices)i.resolve(null);
                    this.queuedReads.splice(r, 1), r--;
                } else if (n.hole.end > e) {
                    n.hole.end = e, n.strictTarget = !0;
                    for(let i = 0; i < n.pendingSlices.length; i++){
                        const s = n.pendingSlices[i];
                        s.start >= e && (s.resolve(null), n.pendingSlices.splice(i, 1), i--);
                    }
                }
            }
        }
        signalWorkerStoppedRunning(e) {
            e.running = !1, e.pendingSlices.length = 0;
        }
        onWorkerFinished(e) {
            const r = this.workers.indexOf(e);
            p(r !== -1), e.running = !1, this.workers.splice(r, 1), this.fileSize === null && this.supplyFileSize(e.currentPos);
            for (const n of e.pendingSlices)n.resolve(null);
        }
        insertIntoCache(e) {
            if (this.options.maxCacheSize === 0) return;
            let r = K(this.cache, e.start, (n)=>n.start) + 1;
            if (r > 0) {
                const n = this.cache[r - 1];
                if (n.end >= e.end) return;
                if (n.end > e.start) {
                    const i = new Uint8Array(e.end - n.start);
                    i.set(n.bytes, 0), i.set(e.bytes, e.start - n.start), this.currentCacheSize += e.end - n.end, n.bytes = i, n.view = Z(i), n.end = e.end, r--, e = n;
                } else this.cache.splice(r, 0, e), this.currentCacheSize += e.bytes.length;
            } else this.cache.splice(r, 0, e), this.currentCacheSize += e.bytes.length;
            for(let n = r + 1; n < this.cache.length; n++){
                const i = this.cache[n];
                if (e.end <= i.start) break;
                if (e.end >= i.end) {
                    this.cache.splice(n, 1), this.currentCacheSize -= i.bytes.length, n--;
                    continue;
                }
                const s = new Uint8Array(i.end - e.start);
                s.set(e.bytes, 0), s.set(i.bytes, i.start - e.start), this.currentCacheSize -= e.end - i.start, e.bytes = s, e.view = Z(s), e.end = i.end, this.cache.splice(n, 1);
                break;
            }
            for(; this.currentCacheSize > this.options.maxCacheSize;){
                let n = 0, i = this.cache[0];
                for(let s = 1; s < this.cache.length; s++){
                    const a = this.cache[s];
                    a.age < i.age && (n = s, i = a);
                }
                if (this.currentCacheSize - i.bytes.length <= this.options.maxCacheSize) break;
                this.cache.splice(n, 1), this.currentCacheSize -= i.bytes.length;
            }
        }
        dispose() {
            for (const e of this.workers)e.aborted = !0;
            this.workers.length = 0, this.cache.length = 0, this.disposed = !0;
        }
    }
    class Wu extends Ge {
        constructor(e, r, n){
            if (super(), this._ref = null, e._disposed) throw new Error("Cannot create a slice of a disposed source.");
            this._baseSource = e, this._offset = r, this._length = n ?? null;
        }
        _getFileSize() {
            const e = this._baseSource._getFileSize();
            return e === void 0 ? this._length !== null ? this._length : void 0 : e === null ? this._length !== null ? this._length : null : fe(e - this._offset, 0, this._length ?? 1 / 0);
        }
        _read(e, r, n, i) {
            if (this._length !== null && r > this._length) return null;
            const s = this._baseSource._read(this._offset + e, this._offset + r, this._offset + n, this._offset + i);
            return s instanceof Promise ? s.then((a)=>a ? (a.offset -= this._offset, a) : null) : s ? (s.offset -= this._offset, s) : null;
        }
        _dispose() {
            this._ref?.free();
        }
        ref() {
            return this._ref ??= this._baseSource.ref(), super.ref();
        }
    }
    var js = function(t, e, r) {
        if (e != null) {
            if (typeof e != "object" && typeof e != "function") throw new TypeError("Object expected.");
            var n, i;
            if (r) {
                if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
                n = e[Symbol.asyncDispose];
            }
            if (n === void 0) {
                if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
                n = e[Symbol.dispose], r && (i = n);
            }
            if (typeof n != "function") throw new TypeError("Object not disposable.");
            i && (n = function() {
                try {
                    i.call(this);
                } catch (s) {
                    return Promise.reject(s);
                }
            }), t.stack.push({
                value: e,
                dispose: n,
                async: r
            });
        } else r && t.stack.push({
            async: !0
        });
        return e;
    }, $s = (function(t) {
        return function(e) {
            function r(a) {
                e.error = e.hasError ? new t(a, e.error, "An error was suppressed during disposal.") : a, e.hasError = !0;
            }
            var n, i = 0;
            function s() {
                for(; n = e.stack.pop();)try {
                    if (!n.async && i === 1) return i = 0, e.stack.push(n), Promise.resolve().then(s);
                    if (n.dispose) {
                        var a = n.dispose.call(n.value);
                        if (n.async) return i |= 2, Promise.resolve(a).then(s, function(o) {
                            return r(o), s();
                        });
                    } else i |= 1;
                } catch (o) {
                    r(o);
                }
                if (i === 1) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
                if (e.hasError) throw e.error;
            }
            return s();
        };
    })(typeof SuppressedError == "function" ? SuppressedError : function(t, e, r) {
        var n = new Error(r);
        return n.name = "SuppressedError", n.error = t, n.suppressed = e, n;
    });
    const Vu = /^0[xX][0-9a-fA-F]+$/, Hu = /^data:.*;base64,/i;
    class Ks extends Ou {
        constructor(e, r, n, i){
            super(e.input, r, n), this.segments = [], this.nextLines = null, this.currentUpdateSegmentsPromise = null, this.streamHasEnded = !1, this.lastSegmentUpdateTime = -1 / 0, this.refreshInterval = 5, this.demuxer = e, this.nextLines = i;
        }
        runUpdateSegments() {
            return this.currentUpdateSegmentsPromise ??= (async ()=>{
                try {
                    const e = this.getRemainingWaitTimeMs();
                    e > 0 && await cc(e), this.lastSegmentUpdateTime = performance.now(), await this.updateSegments();
                } finally{
                    this.currentUpdateSegmentsPromise = null;
                }
            })();
        }
        getRemainingWaitTimeMs() {
            const e = performance.now() - this.lastSegmentUpdateTime, r = Math.max(0, 1e3 * this.refreshInterval - e);
            return r <= 50 ? 0 : r;
        }
        async updateSegments() {
            let e = this.nextLines;
            if (this.nextLines = null, !e) {
                const _ = {
                    stack: [],
                    error: void 0,
                    hasError: !1
                };
                try {
                    const w = js(_, await this.demuxer.input._getSourceUncached({
                        path: this.path,
                        isRoot: !1
                    }), !1), T = await new tn(w.source).requestEntireFile();
                    p(T), e = Ao(T, T.length, {
                        ignore: mo
                    });
                } catch (w) {
                    _.error = w, _.hasError = !0;
                } finally{
                    $s(_);
                }
            }
            let r = !1, n = 0, i = null, s = null, a = 0, o = null, c = null, u = null, l = null, d = null, f = null, h = !1, g = ie(this.segments) ?? null;
            const m = (_)=>{
                const w = _.indexOf("@"), y = Number(w === -1 ? _ : _.slice(0, w));
                if (!Number.isInteger(y) || y < 0) throw new Error(`Invalid #EXT-X-BYTERANGE length '${_}'.`);
                let T = null;
                if (w !== -1 && (T = Number(_.slice(w + 1)), !Number.isInteger(T) || T < 0)) throw new Error(`Invalid #EXT-X-BYTERANGE offset '${_}'.`);
                return {
                    length: y,
                    offset: T
                };
            }, b = (_)=>{
                a = _, g && (p(g.sequenceNumber !== null), g.sequenceNumber < _ && (n = g.timestamp + g.duration, o = g.firstSegment, c = g.initSegment, d = g.lastProgramDateTimeSeconds, g = null));
            };
            for(let _ = 0; _ < e.length; _++){
                const w = e[_];
                if (!r) {
                    if (w !== "#EXTM3U") throw new Error("Invalid M3U8 file; expected first line to be #EXTM3U.");
                    r = !0;
                    continue;
                }
                if (!w.startsWith("#")) {
                    if (!g) {
                        if (i === null) throw new Error("Invalid M3U8 file; a segment must be preceded by an #EXTINF tag.");
                        let y = s;
                        if (y && y.method === "AES-128" && !y.iv) {
                            const I = new Uint8Array(He), P = Z(I);
                            P.setUint32(8, Math.floor(a / 2 ** 32)), P.setUint32(12, a), y = {
                                ...y,
                                iv: I
                            };
                        }
                        const S = {
                            path: _t(this.path, w),
                            offset: l?.offset ?? 0,
                            length: l?.length ?? null
                        }, C = {
                            timestamp: n,
                            relativeToUnixEpoch: d !== null,
                            firstSegment: o,
                            sequenceNumber: a,
                            location: S,
                            duration: i,
                            encryption: y,
                            initSegment: c,
                            lastProgramDateTimeSeconds: d
                        };
                        o ??= C, n += i, this.segments.push(C);
                    }
                    i = null, l === null ? u = null : l = null, b(a + 1);
                }
                if (w.startsWith(pi)) {
                    if (g) {
                        h = !0;
                        continue;
                    }
                    h || (d === null && a > 0 && f !== null && (n = a * f), h = !0);
                    const y = w.slice(pi.length), T = y.indexOf(","), S = T === -1 ? y : y.slice(0, T), C = Number(S);
                    if (!Number.isFinite(C) || C < 0) throw new Error(`Invalid #EXTINF tag duration '${S}'.`);
                    i = C;
                } else if (w.startsWith(Os)) {
                    const y = new vr(w.slice(Os.length)), T = y.get("uri");
                    if (!T) throw new Error("Invalid #EXT-X-MAP tag; missing URI attribute.");
                    const S = y.get("byterange");
                    let C = null;
                    if (S !== null && (C = m(S)), C && C.offset === null) throw new Error("Invalid #EXT-X-MAP tag; BYTERANGE attribute must have a specified offset.");
                    if (!g) {
                        const P = {
                            path: _t(this.path, T),
                            offset: C?.offset ?? 0,
                            length: C?.length ?? null
                        };
                        if (s?.method === "AES-128" && !s.iv) throw new Error("IV attribute must be set on #EXT-X-KEY tag preceding the #EXT-X-MAP tag.");
                        c = {
                            timestamp: n,
                            relativeToUnixEpoch: d !== null,
                            firstSegment: null,
                            sequenceNumber: null,
                            location: P,
                            duration: 0,
                            encryption: s,
                            initSegment: null,
                            lastProgramDateTimeSeconds: d
                        };
                    }
                    i = null, l === null ? u = null : l = null;
                } else if (w.startsWith(zs)) {
                    const y = new vr(w.slice(zs.length)), T = y.get("method");
                    if (T === "NONE") s = null;
                    else if (T === "AES-128") {
                        const S = y.get("uri");
                        if (!S) throw new Error("Invalid #EXT-X-KEY: AES-128 requires a URI attribute.");
                        let C = null;
                        const I = y.get("iv");
                        if (I) {
                            if (!Vu.test(I)) throw new Error(`Unsupported IV format '${I}'.`);
                            let x = I.slice(2);
                            x = x.padStart(He * 2, "0"), C = new Uint8Array(He);
                            for(let v = 0; v < He; v++){
                                const R = -He * 2 + v;
                                C[v] = parseInt(x.slice(R, R + 2), 16);
                            }
                        }
                        const P = y.get("keyformat") ?? "identity";
                        if (P !== "identity") throw new Error("For AES-128 encryption, only the 'identity' KEYFORMAT is currently supported. If you think other formats should be supported, please raise an issue.");
                        s = {
                            method: "AES-128",
                            keyUri: _t(this.path, S),
                            iv: C,
                            keyFormat: P
                        };
                    } else if (T === "SAMPLE-AES" || T === "SAMPLE-AES-CTR") {
                        const S = y.get("uri");
                        if (!S) throw new Error(`Invalid #EXT-X-KEY: ${T} requires a URI attribute.`);
                        if ((y.get("keyformat") ?? "identity") === "identity") throw new Error("For SAMPLE-AES and SAMPLE-AES-CTR encryption, the 'identity' KEYFORMAT is not supported. If you think this format should be supported, please raise an issue.");
                        let I = null;
                        if (Hu.test(S)) {
                            const P = S.indexOf(","), x = Sa(S.slice(P + 1));
                            if (x.length >= 8 && x[4] === 112 && x[5] === 115 && x[6] === 115 && x[7] === 104) {
                                const v = Z(x).getUint32(0);
                                I = Ka(x.subarray(8, Math.min(v, x.length)));
                            }
                        }
                        s = {
                            method: T,
                            psshBox: I
                        };
                    } else throw new Error(`Unsupported encryption method '${T}'. If you think this method should be supported, please raise an issue.`);
                } else if (w.startsWith(Ns)) {
                    const y = w.slice(Ns.length), T = Number(y);
                    if (!Number.isInteger(T) || T < 0) throw new Error(`Invalid EXT-X-MEDIA-SEQUENCE value '${y}'.`);
                    b(T);
                } else if (w.startsWith(Us)) {
                    const y = m(w.slice(Us.length));
                    if (y.offset === null) {
                        if (u === null) throw new Error("Invalid M3U8 file; #EXT-X-BYTERANGE without offset requires a previous byte range.");
                        y.offset = u;
                    }
                    l = y, u = y.offset + y.length;
                } else if (w.startsWith(Ls)) {
                    if (g) continue;
                    const y = w.slice(Ls.length), T = Date.parse(y);
                    if (!Number.isFinite(T)) continue;
                    const S = T / 1e3;
                    if (d === S) continue;
                    if (d === null && this.segments.length > 0) {
                        const C = ie(this.segments), I = C.timestamp + C.duration, P = S - I;
                        for (const x of this.segments)x.timestamp += P, x.relativeToUnixEpoch = !0;
                        n += P;
                    }
                    d = S, n = S;
                } else if (w === Ru) o = null;
                else if (w.startsWith(Ws)) {
                    const y = w.slice(Ws.length), T = Number(y);
                    if (!Number.isFinite(T) || T < 0) throw new Error(`Invalid EXT-X-TARGETDURATION value '${y}'.`);
                    this.refreshInterval = T, f = T;
                } else if (w === Mu) {
                    this.streamHasEnded = !0;
                    break;
                } else w.startsWith(Vs) && w.slice(Vs.length).toLowerCase() === "vod" && (this.streamHasEnded = !0);
            }
            if (!r) throw new Error("Invalid M3U8 file; no #EXTM3U header.");
        }
        async getFirstSegment() {
            return this.segments.length === 0 && await this.runUpdateSegments(), this.segments[0] ?? null;
        }
        async getSegmentAt(e, r) {
            this.segments.length === 0 && await this.runUpdateSegments();
            let n = !!r.skipLiveWait && this.getRemainingWaitTimeMs() > 0;
            for(;;){
                const i = K(this.segments, e, (a)=>a.timestamp);
                if (i === -1) return null;
                if (i < this.segments.length - 1 || this.streamHasEnded || n) return this.segments[i];
                const s = this.segments[i];
                if (e < s.timestamp + s.duration) return s;
                await this.runUpdateSegments(), r.skipLiveWait && (n = !0);
            }
        }
        async getNextSegment(e, r) {
            const n = this.segments.indexOf(e);
            p(n !== -1);
            const i = n + 1;
            let s = !!r.skipLiveWait && this.getRemainingWaitTimeMs() > 0;
            for(;;){
                if (i < this.segments.length) return this.segments[i];
                if (this.streamHasEnded || s) return null;
                await this.runUpdateSegments(), r.skipLiveWait && (s = !0);
            }
        }
        async getPreviousSegment(e) {
            const r = this.segments.indexOf(e);
            return p(r !== -1), this.segments[r - 1] ?? null;
        }
        getInputForSegment(e) {
            const r = e, n = this.inputCache.find((c)=>c.segment === r);
            if (n) return n.age = this.nextInputCacheAge++, n.input;
            let i = null;
            (r.initSegment || r.firstSegment) && (i = this.getInputForSegment(r.initSegment ?? r.firstSegment));
            const s = {
                ...this.input._formatOptions,
                isobmff: {
                    ...this.input._formatOptions.isobmff,
                    resolveKeyId: this.input._formatOptions.isobmff?.resolveKeyId && ((c)=>{
                        if (!r.encryption || !(r.encryption.method === "SAMPLE-AES" || r.encryption.method === "SAMPLE-AES-CTR") || !r.encryption.psshBox) return this.input._formatOptions.isobmff.resolveKeyId(c);
                        let u = c.psshBoxes;
                        const { psshBox: l } = r.encryption;
                        return (l.keyIds === null || l.keyIds.includes(c.keyId)) && !u.some((d)=>Xa(d, l)) && (u = [
                            ...u,
                            l
                        ]), this.input._formatOptions.isobmff.resolveKeyId({
                            ...c,
                            psshBoxes: u
                        });
                    })
                }
            }, a = new Ki({
                source: new zu(r.location.path, async (c)=>{
                    p(c.isRoot);
                    const u = {
                        ...c,
                        isRoot: !1
                    };
                    let l;
                    const d = r.location.offset > 0 || r.location.length !== null;
                    if (!r.encryption || r.encryption.method === "SAMPLE-AES" || r.encryption.method === "SAMPLE-AES-CTR") {
                        if (l = await this.input._getSourceCached(u), d) {
                            const h = l.source.slice(r.location.offset, r.location.length ?? void 0).ref();
                            l.free(), l = h;
                        }
                    } else if (r.encryption.method === "AES-128") {
                        const f = r.encryption;
                        p(f.iv);
                        let h = await this.input._getSourceCached(u);
                        if (d) {
                            const _ = h.source.slice(r.location.offset, r.location.length ?? void 0).ref();
                            h.free(), h = _;
                        }
                        const g = new tn(h.source), m = $c(g, async ()=>{
                            const b = {
                                stack: [],
                                error: void 0,
                                hasError: !1
                            };
                            try {
                                const _ = js(b, await this.input._getSourceCached({
                                    path: f.keyUri,
                                    isRoot: !1
                                }, Hl), !1), y = await new tn(_.source).requestSlice(0, He);
                                if (!y) throw new Error("Invalid AES-128 key; expected at least 16 bytes of data.");
                                return {
                                    key: O(y, He),
                                    iv: f.iv
                                };
                            } catch (_) {
                                b.error = _, b.hasError = !0;
                            } finally{
                                $s(b);
                            }
                        }, ()=>{
                            h.free();
                        });
                        l = new Nu(m).ref();
                    } else p(!1);
                    return l;
                }),
                formats: this.input._formats.filter((c)=>!(c instanceof So)),
                initInput: i ?? void 0,
                formatOptions: s
            });
            if (a._onFormatDetermined = (c)=>{
                if ((r.encryption?.method === "SAMPLE-AES" || r.encryption?.method === "SAMPLE-AES-CTR") && !c._isIsobmff) throw new Error("The SAMPLE-AES and SAMPLE-AES-CTR encryption methods are currently only supported for ISOBMFF files.");
            }, this.inputCache.push({
                segment: r,
                input: a,
                age: this.nextInputCacheAge++
            }), this.inputCache.length > 4) {
                const c = Ei(this.inputCache, (u)=>u.age);
                p(c !== -1), this.inputCache.splice(c, 1);
            }
            return a;
        }
        async getLiveRefreshInterval() {
            return this.getRemainingWaitTimeMs() === 0 && await this.runUpdateSegments(), this.streamHasEnded ? null : this.refreshInterval;
        }
    }
    class qu extends ft {
        constructor(e){
            super(e), this.metadataPromise = null, this.trackBackings = null, this.internalTracks = null, this.segmentedInputs = [], this.hasMasterPlaylist = !0;
        }
        readMetadata() {
            return this.metadataPromise ??= (async ()=>{
                p(this.input._rootSource instanceof Pn);
                const { rootPath: e } = this.input._rootSource, r = await this.input._reader.requestEntireFile();
                p(r);
                const n = Ao(r, r.length, {
                    ignore: mo
                }), i = [], s = [];
                for(let d = 1; d < n.length; d++){
                    const f = n[d];
                    if (f.startsWith(Rs)) {
                        const h = d, g = n[++d];
                        if (g === void 0) throw new Error("Incorrect M3U8 file; a line must follow the #EXT-X-STREAM-INF tag.");
                        const m = _t(e, g), b = new vr(f.slice(Rs.length));
                        if (b.getAsNumber("bandwidth") === null) throw new Error("Invalid M3U8 file; #EXT-X-STREAM-INF tag requires a BANDWIDTH attribute with a valid numerical value.");
                        i.push({
                            fullPath: m,
                            attributes: b,
                            lineNumber: h,
                            hasOnlyKeyPackets: !1
                        });
                    } else if (f.startsWith(Ms)) {
                        const h = new vr(f.slice(Ms.length)), g = h.get("uri");
                        if (g === null) throw new Error("Invalid M3U8 file; #EXT-X-I-FRAME-STREAM-INF tag requires a URI attribute.");
                        if (h.getAsNumber("bandwidth") === null) throw new Error("Invalid M3U8 file; #EXT-X-I-FRAME-STREAM-INF tag requires a BANDWIDTH attribute with a valid numerical value.");
                        const b = _t(e, g);
                        i.push({
                            fullPath: b,
                            attributes: h,
                            lineNumber: d,
                            hasOnlyKeyPackets: !0
                        });
                    } else if (f.startsWith(Ds)) {
                        const h = new vr(f.slice(Ds.length));
                        if (h.get("type") === null) throw new Error("Invalid M3U8 file; #EXT-X-MEDIA tag requires a TYPE attribute.");
                        if (h.get("group-id") === null) throw new Error("Invalid M3U8 file; #EXT-X-MEDIA tag requires a GROUP-ID attribute.");
                        let b = null;
                        const _ = h.get("uri");
                        _ !== null && (b = _t(e, _)), s.push({
                            fullPath: b,
                            attributes: h,
                            lineNumber: d
                        });
                    } else if (f !== Du) {
                        if (f.startsWith(pi)) {
                            const h = new Ks(this, e, null, n);
                            this.segmentedInputs = [
                                h
                            ], this.hasMasterPlaylist = !1, this.trackBackings = await h.getTrackBackings();
                            return;
                        }
                    }
                }
                const a = [
                    ...new Set(s.filter((d)=>d.attributes.get("type").toLowerCase() === "video").map((d)=>d.attributes.get("group-id")))
                ], o = [
                    ...new Set(s.filter((d)=>d.attributes.get("type").toLowerCase() === "audio").map((d)=>d.attributes.get("group-id")))
                ], c = await Promise.all(i.map(async (d, f)=>{
                    const h = [], g = d.attributes.get("codecs");
                    let m;
                    if (g) m = g.split(",").map((x)=>x.trim());
                    else {
                        const v = await this.getSegmentedInputForPath(d.fullPath).getTrackBackings(), R = await Promise.all(v.map(async (B)=>({
                                track: B,
                                codec: await B.getCodec()
                            })));
                        m = await Promise.all(R.filter((B)=>B.codec !== null).map((B)=>B.track.getDecoderConfig().then((L)=>L.codec)));
                    }
                    const b = d.attributes.get("video"), _ = d.attributes.get("audio"), w = m.some((x)=>Fe.includes(Dt(x))), y = m.some((x)=>ct.includes(Dt(x)));
                    if (b !== null && !w) {
                        if (!a.includes(b)) throw new Error(`Invalid M3U8 file; variant stream references video group "${b}" which is not defined in any #EXT-X-MEDIA tags.`);
                        const x = s.find((v)=>{
                            const R = v.attributes.get("group-id"), B = v.attributes.get("type");
                            return R === b && B.toLowerCase() === "video";
                        });
                        e: if (x) {
                            const v = x.attributes.get("uri");
                            if (v === null) break e;
                            const R = _t(e, v), q = (await this.getSegmentedInputForPath(R).getTrackBackings()).find((W)=>W.getType() === "video");
                            if (!q || await q.getCodec() === null) break e;
                            const V = await q.getDecoderConfig().then((W)=>W?.codec ?? null);
                            p(V !== null), m.push(V);
                        }
                    }
                    if (_ !== null && !y) {
                        if (!o.includes(_)) throw new Error(`Invalid M3U8 file; variant stream references audio group "${_}" which is not defined in any #EXT-X-MEDIA tags.`);
                        const x = s.find((v)=>{
                            const R = v.attributes.get("group-id"), B = v.attributes.get("type");
                            return R === _ && B.toLowerCase() === "audio";
                        });
                        e: if (x) {
                            const v = x.attributes.get("uri");
                            if (v === null) break e;
                            const R = _t(e, v), q = (await this.getSegmentedInputForPath(R).getTrackBackings()).find((W)=>W.getType() === "audio");
                            if (!q || await q.getCodec() === null) break e;
                            const V = await q.getDecoderConfig().then((W)=>W?.codec ?? null);
                            p(V !== null), m.push(V);
                        }
                    }
                    m = [
                        ...new Set(m)
                    ];
                    let T = null, S = null;
                    const C = d.attributes.getAsNumber("bandwidth");
                    p(C !== null);
                    const I = d.attributes.getAsNumber("average-bandwidth"), P = d.attributes.get("name");
                    for (const x of m){
                        const v = Dt(x);
                        if (v !== null) {
                            if (Fe.includes(v)) {
                                if (T !== null) throw new Error("Unsupported M3U8 file; multiple video codecs found in the CODECS attribute of a variant stream.");
                                T = x;
                                const R = d.attributes.get("video");
                                if (R === null) {
                                    const B = d.attributes.get("resolution");
                                    let L = null, q = null;
                                    if (B) {
                                        const V = B.match(/^(\d+)x(\d+)$/);
                                        V && (L = Number(V[1]), q = Number(V[2]));
                                    }
                                    h.push({
                                        id: -1,
                                        demuxer: this,
                                        backingTrack: null,
                                        default: !0,
                                        autoselect: !0,
                                        languageCode: me,
                                        lineNumber: d.lineNumber,
                                        fullPath: d.fullPath,
                                        fullCodecString: T,
                                        pairingMask: 1n << BigInt(f),
                                        peakBitrate: C,
                                        averageBitrate: I,
                                        name: P,
                                        hasOnlyKeyPackets: d.hasOnlyKeyPackets,
                                        info: {
                                            type: "video",
                                            width: L,
                                            height: q
                                        }
                                    });
                                } else {
                                    if (!a.includes(R)) throw new Error(`Invalid M3U8 file; variant stream references video group "${R}" which is not defined in any #EXT-X-MEDIA tags.`);
                                    for (const B of s){
                                        const L = B.attributes.get("group-id"), q = B.attributes.get("type");
                                        if (L !== R || q.toLowerCase() !== "video") continue;
                                        const V = B.attributes.get("resolution") ?? d.attributes.get("resolution");
                                        let W = null, oe = null;
                                        if (V) {
                                            const pe = V.match(/^(\d+)x(\d+)$/);
                                            pe && (W = Number(pe[1]), oe = Number(pe[2]));
                                        }
                                        h.push({
                                            id: -1,
                                            demuxer: this,
                                            backingTrack: null,
                                            default: Hr(B.attributes),
                                            autoselect: Hr(B.attributes) || Xs(B.attributes),
                                            languageCode: Qs(B.attributes.get("language")),
                                            lineNumber: B.lineNumber,
                                            fullPath: B.fullPath ?? d.fullPath,
                                            fullCodecString: T,
                                            pairingMask: 1n << BigInt(f),
                                            peakBitrate: null,
                                            averageBitrate: null,
                                            name: B.attributes.get("name"),
                                            hasOnlyKeyPackets: d.hasOnlyKeyPackets,
                                            info: {
                                                type: "video",
                                                width: W,
                                                height: oe
                                            }
                                        });
                                    }
                                }
                            } else if (ct.includes(v)) {
                                if (S !== null) throw new Error("Unsupported M3U8 file; multiple audio codecs found in the CODECS attribute of a variant stream.");
                                S = x;
                                const R = d.attributes.get("audio");
                                if (R === null) {
                                    const B = d.attributes.get("channels"), L = B !== null ? Number(B.split("/")[0]) : null;
                                    h.push({
                                        id: -1,
                                        demuxer: this,
                                        backingTrack: null,
                                        default: !0,
                                        autoselect: !0,
                                        languageCode: me,
                                        lineNumber: d.lineNumber,
                                        fullPath: d.fullPath,
                                        fullCodecString: S,
                                        pairingMask: 1n << BigInt(f),
                                        peakBitrate: C,
                                        averageBitrate: I,
                                        name: P,
                                        hasOnlyKeyPackets: d.hasOnlyKeyPackets,
                                        info: {
                                            type: "audio",
                                            numberOfChannels: L !== null && Number.isInteger(L) && L > 0 ? L : null
                                        }
                                    });
                                } else {
                                    if (!o.includes(R)) throw new Error(`Invalid M3U8 file; variant stream references audio group "${R}" which is not defined in any #EXT-X-MEDIA tags.`);
                                    for (const B of s){
                                        const L = B.attributes.get("group-id"), q = B.attributes.get("type");
                                        if (L !== R || q.toLowerCase() !== "audio") continue;
                                        const V = B.attributes.get("channels") ?? d.attributes.get("channels"), W = V !== null ? Number(V.split("/")[0]) : null;
                                        h.push({
                                            id: -1,
                                            demuxer: this,
                                            backingTrack: null,
                                            default: Hr(B.attributes),
                                            autoselect: Hr(B.attributes) || Xs(B.attributes),
                                            languageCode: Qs(B.attributes.get("language")),
                                            lineNumber: B.lineNumber,
                                            fullPath: B.fullPath ?? d.fullPath,
                                            fullCodecString: S,
                                            pairingMask: 1n << BigInt(f),
                                            peakBitrate: null,
                                            averageBitrate: null,
                                            name: B.attributes.get("name"),
                                            hasOnlyKeyPackets: d.hasOnlyKeyPackets,
                                            info: {
                                                type: "audio",
                                                numberOfChannels: W !== null && Number.isInteger(W) && W > 0 ? W : null
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                    return h;
                })), u = [], l = (d)=>{
                    const f = u.find((h)=>h.fullPath === d.fullPath && h.info.type === d.info.type);
                    f ? (f.pairingMask |= d.pairingMask, f.default ||= d.default, f.autoselect ||= d.autoselect, f.lineNumber = Math.min(f.lineNumber, d.lineNumber), d.peakBitrate !== null && (f.peakBitrate = Math.max(f.peakBitrate ?? -1 / 0, d.peakBitrate)), d.averageBitrate !== null && (f.averageBitrate = Math.max(f.averageBitrate ?? -1 / 0, d.averageBitrate)), f.languageCode === me && (f.languageCode = d.languageCode)) : (d.id = u.length + 1, u.push(d));
                };
                for (const d of c)for (const f of d)l(f);
                u.sort((d, f)=>d.lineNumber - f.lineNumber), this.trackBackings = [];
                for (const d of u)d.info.type === "video" ? this.trackBackings.push(new wo(d)) : this.trackBackings.push(new yo(d));
                this.internalTracks = u;
            })();
        }
        async getTrackBackings() {
            return await this.readMetadata(), p(this.trackBackings), this.trackBackings;
        }
        getSegmentedInputForPath(e) {
            let r = this.segmentedInputs.find((i)=>i.path === e);
            if (r) return r;
            let n = null;
            return this.internalTracks && (n = this.internalTracks.filter((s)=>s.fullPath === e).map((s)=>({
                    id: s.id,
                    type: s.info.type
                }))), r = new Ks(this, e, n, null), this.segmentedInputs.push(r), r;
        }
        async getMetadataTags() {
            return {};
        }
        async getMimeType() {
            return ho;
        }
        dispose() {
            if (this.segmentedInputs) {
                for (const e of this.segmentedInputs)e.dispose();
                this.segmentedInputs.length = 0;
            }
        }
    }
    class bo {
        constructor(e){
            this.internalTrack = e, this.hydrationPromise = null;
        }
        hydrate() {
            return this.hydrationPromise ??= (async ()=>{
                const e = this.internalTrack.demuxer.getSegmentedInputForPath(this.internalTrack.fullPath);
                let r = null;
                const i = (await e.getTrackBackings()).filter((s)=>s.getType() === this.getType());
                if (i.length === 1) r = i[0];
                else if (this instanceof wo) {
                    for (const s of i)if (await s.getCodec() === this.getCodec()) {
                        r = s;
                        break;
                    }
                } else {
                    p(this instanceof yo);
                    for (const s of i)if (await s.getCodec() === this.getCodec()) {
                        r = s;
                        break;
                    }
                }
                if (!r) throw new Error("Could not find matching track in underlying media data.");
                this.internalTrack.backingTrack = r;
            })();
        }
        delegate(e) {
            return this.internalTrack.backingTrack ? e() : this.hydrate().then(e);
        }
        getCodec() {
            throw new Error("Not implemented on base class.");
        }
        getDisposition() {
            return {
                ...dt,
                default: this.internalTrack.autoselect,
                primary: this.internalTrack.default
            };
        }
        getId() {
            return this.internalTrack.id;
        }
        getPairingMask() {
            return this.internalTrack.pairingMask;
        }
        getInternalCodecId() {
            return null;
        }
        getLanguageCode() {
            return this.internalTrack.languageCode;
        }
        getName() {
            return this.internalTrack.name;
        }
        getNumber() {
            p(this.internalTrack.demuxer.internalTracks);
            const e = this.internalTrack.info.type;
            let r = 0;
            for (const n of this.internalTrack.demuxer.internalTracks)if (n.info.type === e && r++, n === this.internalTrack) break;
            return r;
        }
        getTimeResolution() {
            return this.delegate(()=>this.internalTrack.backingTrack.getTimeResolution());
        }
        isRelativeToUnixEpoch() {
            return this.delegate(()=>this.internalTrack.backingTrack.isRelativeToUnixEpoch());
        }
        getBitrate() {
            return this.internalTrack.peakBitrate;
        }
        getAverageBitrate() {
            return this.internalTrack.averageBitrate;
        }
        async getDurationFromMetadata(e) {
            return await this.hydrate(), this.internalTrack.backingTrack.getDurationFromMetadata(e);
        }
        async getLiveRefreshInterval() {
            return await this.hydrate(), this.internalTrack.backingTrack.getLiveRefreshInterval();
        }
        getHasOnlyKeyPackets() {
            return this.internalTrack.hasOnlyKeyPackets || null;
        }
        async getFirstPacket(e) {
            return await this.hydrate(), this.internalTrack.backingTrack.getFirstPacket(e);
        }
        async getPacket(e, r) {
            return await this.hydrate(), this.internalTrack.backingTrack.getPacket(e, r);
        }
        async getKeyPacket(e, r) {
            return await this.hydrate(), this.internalTrack.backingTrack.getKeyPacket(e, r);
        }
        async getNextPacket(e, r) {
            return await this.hydrate(), this.internalTrack.backingTrack.getNextPacket(e, r);
        }
        async getNextKeyPacket(e, r) {
            return await this.hydrate(), this.internalTrack.backingTrack.getNextKeyPacket(e, r);
        }
    }
    class wo extends bo {
        constructor(e){
            super(e);
        }
        get backingVideoTrack() {
            return this.internalTrack.backingTrack;
        }
        getType() {
            return "video";
        }
        getCodec() {
            return Dt(this.internalTrack.fullCodecString);
        }
        getCodedWidth() {
            return this.delegate(()=>this.backingVideoTrack.getCodedWidth());
        }
        getCodedHeight() {
            return this.delegate(()=>this.backingVideoTrack.getCodedHeight());
        }
        getSquarePixelWidth() {
            return this.delegate(()=>this.backingVideoTrack.getSquarePixelWidth());
        }
        getSquarePixelHeight() {
            return this.delegate(()=>this.backingVideoTrack.getSquarePixelHeight());
        }
        getMetadataDisplayWidth() {
            return this.backingVideoTrack ? null : this.internalTrack.info.width;
        }
        getMetadataDisplayHeight() {
            return this.backingVideoTrack ? null : this.internalTrack.info.height;
        }
        getRotation() {
            return this.delegate(()=>this.backingVideoTrack.getRotation());
        }
        async getColorSpace() {
            return await this.hydrate(), this.backingVideoTrack.getColorSpace();
        }
        async canBeTransparent() {
            return await this.hydrate(), this.backingVideoTrack.canBeTransparent();
        }
        getMetadataCodecParameterString() {
            return this.backingVideoTrack ? null : this.internalTrack.fullCodecString;
        }
        async getDecoderConfig() {
            return await this.hydrate(), this.backingVideoTrack.getDecoderConfig();
        }
    }
    class yo extends bo {
        constructor(e){
            super(e);
        }
        get backingAudioTrack() {
            return this.internalTrack.backingTrack;
        }
        getType() {
            return "audio";
        }
        getCodec() {
            return Dt(this.internalTrack.fullCodecString);
        }
        getNumberOfChannels() {
            return this.internalTrack.info.numberOfChannels !== null ? this.internalTrack.info.numberOfChannels : this.delegate(()=>this.backingAudioTrack.getNumberOfChannels());
        }
        getSampleRate() {
            return this.delegate(()=>this.backingAudioTrack.getSampleRate());
        }
        getMetadataCodecParameterString() {
            return this.backingAudioTrack ? null : this.internalTrack.fullCodecString;
        }
        async getDecoderConfig() {
            return await this.hydrate(), this.backingAudioTrack.getDecoderConfig();
        }
    }
    const Hr = (t)=>{
        const e = t.get("default");
        if (e === null) return !1;
        const r = e.toUpperCase();
        if (r === "YES") return !0;
        if (r === "NO") return !1;
        throw new Error(`Invalid M3U8 file; #EXT-X-MEDIA DEFAULT attribute must be YES or NO, got "${e}".`);
    }, Xs = (t)=>{
        const e = t.get("autoselect");
        if (e === null) return !1;
        const r = e.toUpperCase();
        if (r === "YES") return !0;
        if (r === "NO") return !1;
        throw new Error(`Invalid M3U8 file; #EXT-X-MEDIA AUTOSELECT attribute must be YES or NO, got "${e}".`);
    }, Qs = (t)=>{
        if (t === null) return me;
        const e = t.split("-")[0];
        return e || me;
    };
    class Xe {
        constructor(){
            this._isIsobmff = !1;
        }
    }
    class ko extends Xe {
        constructor(){
            super(...arguments), this._isIsobmff = !0;
        }
        async _getMajorBrand(e) {
            let r = e._reader.requestSlice(0, 12);
            if (r instanceof Promise && (r = await r), !r) return null;
            r.skip(4);
            const n = se(r, 4);
            return n !== "ftyp" && n !== "styp" ? null : se(r, 4);
        }
        _createDemuxer(e) {
            return new Hi(e);
        }
    }
    class Gu extends ko {
        async _canReadInput(e) {
            const r = await this._getMajorBrand(e);
            if (r !== null) return r !== "qt  ";
            let n = e._reader.requestSlice(4, 4);
            if (n instanceof Promise && (n = await n), !n) return !1;
            const i = se(n, 4);
            return i === "moof" || i === "sidx";
        }
        get name() {
            return "MP4";
        }
        get mimeType() {
            return "video/mp4";
        }
    }
    class ju extends ko {
        async _canReadInput(e) {
            return await this._getMajorBrand(e) === "qt  ";
        }
        get name() {
            return "QuickTime File Format";
        }
        get mimeType() {
            return "video/quicktime";
        }
    }
    class To extends Xe {
        async isSupportedEBMLOfDocType(e, r) {
            let n = e._reader.requestSlice(0, nt);
            if (n instanceof Promise && (n = await n), !n) return !1;
            const i = no(n);
            if (i === null || i < 1 || i > 8 || j(n, i) !== k.EBML) return !1;
            const a = io(n);
            if (typeof a != "number") return !1;
            let o = e._reader.requestSlice(n.filePos, a);
            if (o instanceof Promise && (o = await o), !o) return !1;
            const c = n.filePos;
            for(; o.filePos <= c + a - Be;){
                const u = tt(o);
                if (!u) break;
                const { id: l, size: d } = u, f = o.filePos;
                if (d === void 0) return !1;
                switch(l){
                    case k.EBMLVersion:
                        if (j(o, d) !== 1) return !1;
                        break;
                    case k.EBMLReadVersion:
                        if (j(o, d) !== 1) return !1;
                        break;
                    case k.DocType:
                        if (Yt(o, d) !== r) return !1;
                        break;
                    case k.DocTypeVersion:
                        if (j(o, d) > 4) return !1;
                        break;
                }
                o.filePos = f + d;
            }
            return !0;
        }
        _canReadInput(e) {
            return this.isSupportedEBMLOfDocType(e, "matroska");
        }
        _createDemuxer(e) {
            return new iu(e);
        }
        get name() {
            return "Matroska";
        }
        get mimeType() {
            return "video/x-matroska";
        }
    }
    class $u extends To {
        _canReadInput(e) {
            return this.isSupportedEBMLOfDocType(e, "webm");
        }
        get name() {
            return "WebM";
        }
        get mimeType() {
            return "video/webm";
        }
    }
    class Ku extends Xe {
        async _canReadInput(e) {
            let r = 0;
            for(;;){
                let d = e._reader.requestSlice(r, lt);
                if (d instanceof Promise && (d = await d), !d) break;
                const f = Nt(d);
                if (!f) break;
                r = d.filePos + f.size;
            }
            const n = await hi(e._reader, r, r + 4096);
            if (!n) return !1;
            const i = n.header, s = Fa(i.mpegVersionId, i.channel);
            let a = e._reader.requestSlice(n.startPos + s, 4);
            if (a instanceof Promise && (a = await a), !a) return !1;
            const o = A(a);
            if (o === Aa || o === Ba) return !0;
            r = n.startPos + n.header.totalSize;
            const u = await hi(e._reader, r, r + Ot);
            if (!u) return !1;
            const l = u.header;
            return !(i.channel !== l.channel || i.sampleRate !== l.sampleRate);
        }
        _createDemuxer(e) {
            return new ou(e);
        }
        get name() {
            return "MP3";
        }
        get mimeType() {
            return "audio/mpeg";
        }
    }
    class Xu extends Xe {
        async _canReadInput(e) {
            let r = e._reader.requestSlice(0, 12);
            if (r instanceof Promise && (r = await r), !r) return !1;
            const n = se(r, 4);
            return n !== "RIFF" && n !== "RIFX" && n !== "RF64" ? !1 : (r.skip(4), se(r, 4) === "WAVE");
        }
        _createDemuxer(e) {
            return new _u(e);
        }
        get name() {
            return "WAVE";
        }
        get mimeType() {
            return "audio/wav";
        }
    }
    class Qu extends Xe {
        async _canReadInput(e) {
            let r = e._reader.requestSlice(0, 4);
            return r instanceof Promise && (r = await r), r ? se(r, 4) === "OggS" : !1;
        }
        _createDemuxer(e) {
            return new pu(e);
        }
        get name() {
            return "Ogg";
        }
        get mimeType() {
            return "application/ogg";
        }
    }
    class Yu extends Xe {
        async _canReadInput(e) {
            let r = e._reader.requestSlice(0, 4);
            return r instanceof Promise && (r = await r), r ? se(r, 4) === "fLaC" : !1;
        }
        get name() {
            return "FLAC";
        }
        get mimeType() {
            return "audio/flac";
        }
        _createDemuxer(e) {
            return new Iu(e);
        }
    }
    class Zu extends Xe {
        async _canReadInput(e) {
            let r = 0;
            for(;;){
                let a = e._reader.requestSlice(r, lt);
                if (a instanceof Promise && (a = await a), !a) break;
                const o = Nt(a);
                if (!o) break;
                r = a.filePos + o.size;
            }
            let n = e._reader.requestSliceRange(r, Dr, kt);
            if (n instanceof Promise && (n = await n), !n) return !1;
            const i = ut(n);
            if (!i || (r += i.frameLength, n = e._reader.requestSliceRange(r, Dr, kt), n instanceof Promise && (n = await n), !n)) return !1;
            const s = ut(n);
            return s ? i.objectType === s.objectType && i.samplingFrequencyIndex === s.samplingFrequencyIndex && i.channelConfiguration === s.channelConfiguration : !1;
        }
        _createDemuxer(e) {
            return new wu(e);
        }
        get name() {
            return "ADTS";
        }
        get mimeType() {
            return "audio/aac";
        }
    }
    class Ju extends Xe {
        async _canReadInput(e) {
            const r = Ce + 16 + 1;
            let n = e._reader.requestSlice(0, r);
            if (n instanceof Promise && (n = await n), !n) return !1;
            const i = O(n, r);
            return i[0] === 71 && i[Ce] === 71 || i[0] === 71 && i[Ce + 16] === 71 ? !0 : i[4] === 71 && i[4 + Ce + 4] === 71;
        }
        _createDemuxer(e) {
            return new Au(e);
        }
        get name() {
            return "MPEG Transport Stream";
        }
        get mimeType() {
            return "video/MP2T";
        }
    }
    class So extends Xe {
        async _canReadInput(e) {
            let r = e._reader.requestSlice(0, 7);
            if (r instanceof Promise && (r = await r), !r || !(se(r, 7) === "#EXTM3U")) return !1;
            if (!(e._rootSource instanceof Pn)) throw new TypeError("HLS inputs require `InputOptions.source` to be a PathedSource or a ref to one.");
            return e._rootSource._usedForHls = !0, !0;
        }
        _createDemuxer(e) {
            return new qu(e);
        }
        get name() {
            return "HTTP Live Streaming (HLS)";
        }
        get mimeType() {
            return ho;
        }
    }
    let el, tl, rl, nl, il, sl, al, ol, cl, ul, ll, dl;
    el = new Gu;
    tl = new ju;
    rl = new To;
    nl = new $u;
    il = new Ku;
    sl = new Xu;
    al = new Qu;
    ol = new Zu;
    cl = new Yu;
    ul = new Ju;
    ll = new So;
    dS = [
        ll,
        el,
        tl,
        rl,
        nl,
        sl,
        al,
        cl,
        il,
        ol,
        ul
    ];
    dl = (t, e)=>{
        if (!t || typeof t != "object") throw new TypeError(`${e}, when provided, must be an object.`);
        if (t.isobmff !== void 0) {
            if (!t.isobmff || typeof t.isobmff != "object") throw new TypeError(`${e}.isobmff, when provided, must be an object.`);
            if (t.isobmff.resolveKeyId !== void 0 && typeof t.isobmff.resolveKeyId != "function") throw new TypeError(`${e}.isobmff.resolveKeyId, when provided, must be a function.`);
        }
    };
    var fl = function(t, e, r) {
        if (e != null) {
            if (typeof e != "object" && typeof e != "function") throw new TypeError("Object expected.");
            var n, i;
            if (r) {
                if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
                n = e[Symbol.asyncDispose];
            }
            if (n === void 0) {
                if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
                n = e[Symbol.dispose], r && (i = n);
            }
            if (typeof n != "function") throw new TypeError("Object not disposable.");
            i && (n = function() {
                try {
                    i.call(this);
                } catch (s) {
                    return Promise.reject(s);
                }
            }), t.stack.push({
                value: e,
                dispose: n,
                async: r
            });
        } else r && t.stack.push({
            async: !0
        });
        return e;
    }, hl = (function(t) {
        return function(e) {
            function r(a) {
                e.error = e.hasError ? new t(a, e.error, "An error was suppressed during disposal.") : a, e.hasError = !0;
            }
            var n, i = 0;
            function s() {
                for(; n = e.stack.pop();)try {
                    if (!n.async && i === 1) return i = 0, e.stack.push(n), Promise.resolve().then(s);
                    if (n.dispose) {
                        var a = n.dispose.call(n.value);
                        if (n.async) return i |= 2, Promise.resolve(a).then(s, function(o) {
                            return r(o), s();
                        });
                    } else i |= 1;
                } catch (o) {
                    r(o);
                }
                if (i === 1) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
                if (e.hasError) throw e.error;
            }
            return s();
        };
    })(typeof SuppressedError == "function" ? SuppressedError : function(t, e, r) {
        var n = new Error(r);
        return n.name = "SuppressedError", n.error = t, n.suppressed = e, n;
    });
    Ii();
    let Ys = -1 / 0, Zs = -1 / 0, Or = null;
    typeof FinalizationRegistry < "u" && (Or = new FinalizationRegistry((t)=>{
        const e = performance.now();
        t.type === "video" ? (e - Ys >= 1e3 && (console.error("A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them."), Ys = e), typeof VideoFrame < "u" && t.data instanceof VideoFrame && t.data.close()) : (e - Zs >= 1e3 && (console.error("An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them."), Zs = e), typeof AudioData < "u" && t.data instanceof AudioData && t.data.close());
    }));
    class It {
        constructor(){
            this._referenceCount = 0, this._lastAllocationBuffer = null;
        }
    }
    const gi = [
        "I420",
        "I420P10",
        "I420P12",
        "I420A",
        "I420AP10",
        "I420AP12",
        "I422",
        "I422P10",
        "I422P12",
        "I422A",
        "I422AP10",
        "I422AP12",
        "I444",
        "I444P10",
        "I444P12",
        "I444A",
        "I444AP10",
        "I444AP12",
        "NV12",
        "RGBA",
        "RGBX",
        "BGRA",
        "BGRX"
    ], ml = new Set(gi);
    class we {
        get codedWidth() {
            return this.visibleRect.width;
        }
        get codedHeight() {
            return this.visibleRect.height;
        }
        get displayWidth() {
            return this.rotation % 180 === 0 ? this.squarePixelWidth : this.squarePixelHeight;
        }
        get displayHeight() {
            return this.rotation % 180 === 0 ? this.squarePixelHeight : this.squarePixelWidth;
        }
        get microsecondTimestamp() {
            return Math.trunc(bt * this.timestamp);
        }
        get microsecondDuration() {
            return Math.trunc(bt * this.duration);
        }
        get hasAlpha() {
            return this.format && this.format.includes("A");
        }
        constructor(e, r){
            if (this._closed = !1, e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer || ArrayBuffer.isView(e)) {
                if (!r || typeof r != "object") throw new TypeError("init must be an object.");
                if (r.format === void 0 || !ml.has(r.format)) throw new TypeError("init.format must be one of: " + gi.join(", "));
                if (!Number.isInteger(r.codedWidth) || r.codedWidth <= 0) throw new TypeError("init.codedWidth must be a positive integer.");
                if (!Number.isInteger(r.codedHeight) || r.codedHeight <= 0) throw new TypeError("init.codedHeight must be a positive integer.");
                if (r.rotation !== void 0 && ![
                    0,
                    90,
                    180,
                    270
                ].includes(r.rotation)) throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
                if (!Number.isFinite(r.timestamp)) throw new TypeError("init.timestamp must be a number.");
                if (r.duration !== void 0 && (!Number.isFinite(r.duration) || r.duration < 0)) throw new TypeError("init.duration, when provided, must be a non-negative number.");
                if (r.layout !== void 0) {
                    if (!Array.isArray(r.layout)) throw new TypeError("init.layout, when provided, must be an array.");
                    for (const i of r.layout){
                        if (!i || typeof i != "object" || Array.isArray(i)) throw new TypeError("Each entry in init.layout must be an object.");
                        if (!Number.isInteger(i.offset) || i.offset < 0) throw new TypeError("plane.offset must be a non-negative integer.");
                        if (!Number.isInteger(i.stride) || i.stride < 0) throw new TypeError("plane.stride must be a non-negative integer.");
                    }
                }
                if (r.visibleRect !== void 0 && ms(r.visibleRect, "init.visibleRect"), r.displayWidth !== void 0 && (!Number.isInteger(r.displayWidth) || r.displayWidth <= 0)) throw new TypeError("init.displayWidth, when provided, must be a positive integer.");
                if (r.displayHeight !== void 0 && (!Number.isInteger(r.displayHeight) || r.displayHeight <= 0)) throw new TypeError("init.displayHeight, when provided, must be a positive integer.");
                if (r.displayWidth !== void 0 != (r.displayHeight !== void 0)) throw new TypeError("init.displayWidth and init.displayHeight must be either both provided or both omitted.");
                this._data = he(e).slice(), this._layout = r.layout ?? _l(r.format, r.codedWidth, r.codedHeight), this.format = r.format, this.rotation = r.rotation ?? 0, this.timestamp = r.timestamp, this.duration = r.duration ?? 0;
                let n = r.colorSpace ?? null;
                n === null && (this.format === "RGBA" || this.format === "RGBX" || this.format === "BGRA" || this.format === "BGRX" ? n = {
                    primaries: "bt709",
                    transfer: "iec61966-2-1",
                    matrix: "rgb",
                    fullRange: !0
                } : n = {
                    primaries: "bt709",
                    transfer: "bt709",
                    matrix: "bt709",
                    fullRange: !1
                }), this.colorSpace = new qn(n), this.visibleRect = {
                    left: r.visibleRect?.left ?? 0,
                    top: r.visibleRect?.top ?? 0,
                    width: r.visibleRect?.width ?? r.codedWidth,
                    height: r.visibleRect?.height ?? r.codedHeight
                }, r.displayWidth !== void 0 ? (this.squarePixelWidth = this.rotation % 180 === 0 ? r.displayWidth : r.displayHeight, this.squarePixelHeight = this.rotation % 180 === 0 ? r.displayHeight : r.displayWidth) : (this.squarePixelWidth = this.visibleRect.width, this.squarePixelHeight = this.visibleRect.height);
            } else if (typeof VideoFrame < "u" && e instanceof VideoFrame) {
                if (r?.rotation !== void 0 && ![
                    0,
                    90,
                    180,
                    270
                ].includes(r.rotation)) throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
                if (r?.timestamp !== void 0 && !Number.isFinite(r?.timestamp)) throw new TypeError("init.timestamp, when provided, must be a number.");
                if (r?.duration !== void 0 && (!Number.isFinite(r.duration) || r.duration < 0)) throw new TypeError("init.duration, when provided, must be a non-negative number.");
                r?.visibleRect !== void 0 && ms(r.visibleRect, "init.visibleRect"), this._data = e, this._layout = null, this.format = e.format, this.visibleRect = {
                    left: e.visibleRect?.x ?? 0,
                    top: e.visibleRect?.y ?? 0,
                    width: e.visibleRect?.width ?? e.codedWidth,
                    height: e.visibleRect?.height ?? e.codedHeight
                }, this.rotation = r?.rotation ?? 0, this.squarePixelWidth = e.displayWidth, this.squarePixelHeight = e.displayHeight, this.timestamp = r?.timestamp ?? e.timestamp / 1e6, this.duration = r?.duration ?? (e.duration ?? 0) / 1e6, this.colorSpace = new qn(e.colorSpace);
            } else if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof SVGImageElement < "u" && e instanceof SVGImageElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas) {
                if (!r || typeof r != "object") throw new TypeError("init must be an object.");
                if (r.rotation !== void 0 && ![
                    0,
                    90,
                    180,
                    270
                ].includes(r.rotation)) throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
                if (!Number.isFinite(r.timestamp)) throw new TypeError("init.timestamp must be a number.");
                if (r.duration !== void 0 && (!Number.isFinite(r.duration) || r.duration < 0)) throw new TypeError("init.duration, when provided, must be a non-negative number.");
                if (typeof VideoFrame < "u") return new we(new VideoFrame(e, {
                    timestamp: Math.trunc(r.timestamp * bt),
                    duration: Math.trunc((r.duration ?? 0) * bt) || void 0
                }), r);
                let n = 0, i = 0;
                if ("naturalWidth" in e ? (n = e.naturalWidth, i = e.naturalHeight) : "videoWidth" in e ? (n = e.videoWidth, i = e.videoHeight) : "width" in e && (n = Number(e.width), i = Number(e.height)), !n || !i) throw new TypeError("Could not determine dimensions.");
                const s = new OffscreenCanvas(n, i), a = s.getContext("2d", {
                    alpha: ii(),
                    willReadFrequently: !0
                });
                p(a), a.drawImage(e, 0, 0), this._data = s, this._layout = null, this.format = "RGBX", this.visibleRect = {
                    left: 0,
                    top: 0,
                    width: n,
                    height: i
                }, this.squarePixelWidth = n, this.squarePixelHeight = i, this.rotation = r.rotation ?? 0, this.timestamp = r.timestamp, this.duration = r.duration ?? 0, this.colorSpace = new qn({
                    matrix: "rgb",
                    primaries: "bt709",
                    transfer: "iec61966-2-1",
                    fullRange: !0
                });
            } else if (e instanceof It) {
                if (!r || typeof r != "object") throw new TypeError("init must be an object.");
                if (r.rotation !== void 0 && ![
                    0,
                    90,
                    180,
                    270
                ].includes(r.rotation)) throw new TypeError("init.rotation, when provided, must be 0, 90, 180, or 270.");
                if (!Number.isFinite(r.timestamp)) throw new TypeError("init.timestamp must be a number.");
                if (r.duration !== void 0 && (!Number.isFinite(r.duration) || r.duration < 0)) throw new TypeError("init.duration, when provided, must be a non-negative number.");
                if (this._data = e, e._referenceCount++, this.format = e.getFormat(), this.format !== null && !gi.includes(this.format)) throw new TypeError("getFormat() must return a VideoSamplePixelFormat or null.");
                if (this.visibleRect = {
                    left: 0,
                    top: 0,
                    width: e.getCodedWidth(),
                    height: e.getCodedHeight()
                }, !Number.isInteger(this.visibleRect.width) || this.visibleRect.width <= 0) throw new TypeError("getCodedWidth() must return a positive integer.");
                if (!Number.isInteger(this.visibleRect.height) || this.visibleRect.height <= 0) throw new TypeError("getCodedHeight() must return a positive integer.");
                if (this.squarePixelWidth = e.getSquarePixelWidth(), !Number.isInteger(this.squarePixelWidth) || this.squarePixelWidth <= 0) throw new TypeError("getSquarePixelWidth() must return a positive integer.");
                if (this.squarePixelHeight = e.getSquarePixelHeight(), !Number.isInteger(this.squarePixelHeight) || this.squarePixelHeight <= 0) throw new TypeError("getSquarePixelHeight() must return a positive integer.");
                this.rotation = r.rotation ?? 0, this.timestamp = r.timestamp, this.duration = r.duration ?? 0, this.colorSpace = e.getColorSpace();
            } else throw new TypeError("Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.");
            this.pixelAspectRatio = Rr({
                num: this.squarePixelWidth * this.codedHeight,
                den: this.squarePixelHeight * this.codedWidth
            }), Or?.register(this, {
                type: "video",
                data: this._data
            }, this);
        }
        clone() {
            if (this._closed) throw new Error("VideoSample is closed.");
            return p(this._data !== null), this._data instanceof It ? new we(this._data, {
                timestamp: this.timestamp,
                duration: this.duration,
                rotation: this.rotation
            }) : pr(this._data) ? new we(this._data.clone(), {
                timestamp: this.timestamp,
                duration: this.duration,
                rotation: this.rotation
            }) : this._data instanceof Uint8Array ? (p(this._layout), new we(this._data, {
                format: this.format,
                layout: this._layout,
                codedWidth: this.codedWidth,
                codedHeight: this.codedHeight,
                timestamp: this.timestamp,
                duration: this.duration,
                colorSpace: this.colorSpace,
                rotation: this.rotation,
                visibleRect: this.visibleRect,
                displayWidth: this.displayWidth,
                displayHeight: this.displayHeight
            })) : new we(this._data, {
                format: this.format,
                codedWidth: this.codedWidth,
                codedHeight: this.codedHeight,
                timestamp: this.timestamp,
                duration: this.duration,
                colorSpace: this.colorSpace,
                rotation: this.rotation,
                visibleRect: this.visibleRect,
                displayWidth: this.displayWidth,
                displayHeight: this.displayHeight
            });
        }
        close() {
            this._closed || (Or?.unregister(this), this._data instanceof It ? (this._data._referenceCount--, this._data._referenceCount === 0 && this._data.close()) : pr(this._data) ? this._data.close() : this._data = null, this._closed = !0);
        }
        allocationSize(e = {}) {
            if (ea(e), this._closed) throw new Error("VideoSample is closed.");
            if ((e.format ?? this.format) == null) throw new Error("Cannot get allocation size when format is null.");
            return pr(this._data) ? this._data.allocationSize(e) : ta(this, e).allocationSize;
        }
        async copyTo(e, r = {}) {
            if (!_n(e)) throw new TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");
            if (ea(r), this._closed) throw new Error("VideoSample is closed.");
            if ((r.format ?? this.format) == null) throw new Error("Cannot copy video sample data when format is null.");
            if (p(this._data !== null), pr(this._data)) return this._data.copyTo(e, r);
            if (r.format && ![
                "RGBA",
                "RGBX",
                "BGRA",
                "BGRX"
            ].includes(this.format) && [
                "RGBA",
                "RGBX",
                "BGRA",
                "BGRX"
            ].includes(r.format)) if (this._data instanceof It) {
                const u = {
                    stack: [],
                    error: void 0,
                    hasError: !1
                };
                try {
                    const l = fl(u, await this._data.toRgbSample({
                        timestamp: this.timestamp,
                        duration: this.duration,
                        rotation: this.rotation
                    }, r.colorSpace ?? "srgb"), !1);
                    if (!(l instanceof we)) throw new TypeError("toRgbSample() must return a VideoSample.");
                    if (![
                        "RGBA",
                        "RGBX",
                        "BGRA",
                        "BGRX"
                    ].includes(l.format)) throw new Error(`Sample returned by toRgbSample was expected to have an RGB format, got '${l.format}' instead.`);
                    return await l.copyTo(e, r);
                } catch (l) {
                    u.error = l, u.hasError = !0;
                } finally{
                    hl(u);
                }
            } else {
                if (typeof VideoFrame > "u") throw new Error("For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.");
                const u = this.toVideoFrame(), l = await u.copyTo(e, r);
                return u.close(), l;
            }
            const n = ta(this, r);
            p(this.format);
            const i = he(e);
            if (i.byteLength < n.allocationSize) throw new TypeError(`Destination buffer too small. Required: ${n.allocationSize}, Available: ${i.byteLength}`);
            const s = Cn(this.format);
            let a;
            if (this._data instanceof It) {
                let u = this._data.getDataPlanes();
                if (u instanceof Promise && (u = await u), !Array.isArray(u) || u.some((l)=>!(l.data instanceof Uint8Array) || !Number.isInteger(l.stride) || l.stride < 0)) throw new TypeError('getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.');
                a = u;
            } else if (this._data instanceof Uint8Array) p(this._layout), p(this._layout.length === s.length), a = this._layout.map((u, l)=>{
                const d = Math.ceil(this.codedHeight / s[l].heightDivisor);
                return {
                    data: this._data.subarray(u.offset, u.offset + u.stride * d),
                    stride: u.stride
                };
            });
            else {
                const l = this._data.getContext("2d");
                p(l);
                const d = l.getImageData(0, 0, this.codedWidth, this.codedHeight);
                a = [
                    {
                        data: he(d.data),
                        stride: 4 * this.codedWidth
                    }
                ];
            }
            const o = [], c = s.length;
            for(let u = 0; u < c; u++){
                const l = n.computedLayouts[u], d = a[u].stride, f = a[u].data;
                let h = l.sourceTop * d;
                h += l.sourceLeftBytes;
                let g = l.destinationOffset;
                const m = l.sourceWidthBytes, b = {
                    offset: g,
                    stride: l.destinationStride
                };
                for(let _ = 0; _ < l.sourceHeight; _++){
                    if (h + m > f.byteLength) throw new Error("Source buffer OOB read.");
                    if (g + m > i.byteLength) throw new Error("Destination buffer OOB write.");
                    const w = f.subarray(h, h + m);
                    i.set(w, g), h += d, g += l.destinationStride;
                }
                o.push(b);
            }
            if (r.format !== void 0) {
                const u = this.format.startsWith("RGB") !== r.format.startsWith("RGB"), l = this.format.includes("X") && r.format.includes("A");
                if (u || l) for(let d = 0; d < n.allocationSize; d += 4){
                    if (u) {
                        const f = i[d], h = i[d + 2];
                        i[d] = h, i[d + 2] = f;
                    }
                    l && (i[d + 3] = 255);
                }
            }
            return o;
        }
        toVideoFrame() {
            if (this._closed) throw new Error("VideoSample is closed.");
            if (p(this._data !== null), this._data instanceof It) {
                if (this.format === null) throw new Error("Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.");
                const e = this._data.getDataPlanes();
                if (e instanceof Promise) throw new Error("Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.");
                const r = e.reduce((a, o)=>a + o.data.byteLength, 0), n = new Uint8Array(r);
                let i = 0;
                const s = [];
                for (const a of e)n.set(a.data, i), s.push(i), i += a.data.byteLength;
                return new VideoFrame(n, {
                    format: this.format,
                    layout: e.map((a, o)=>({
                            offset: s[o],
                            stride: a.stride
                        })),
                    codedWidth: this.codedWidth,
                    codedHeight: this.codedHeight,
                    timestamp: this.microsecondTimestamp,
                    duration: this.microsecondDuration,
                    colorSpace: this.colorSpace,
                    displayWidth: this.squarePixelWidth,
                    displayHeight: this.squarePixelHeight
                });
            } else return pr(this._data) ? new VideoFrame(this._data, {
                timestamp: this.microsecondTimestamp,
                duration: this.microsecondDuration || void 0
            }) : this._data instanceof Uint8Array ? new VideoFrame(this._data, {
                format: this.format,
                codedWidth: this.codedWidth,
                codedHeight: this.codedHeight,
                timestamp: this.microsecondTimestamp,
                duration: this.microsecondDuration || void 0,
                colorSpace: this.colorSpace,
                displayWidth: this.squarePixelWidth,
                displayHeight: this.squarePixelHeight
            }) : new VideoFrame(this._data, {
                timestamp: this.microsecondTimestamp,
                duration: this.microsecondDuration || void 0
            });
        }
        draw(e, r, n, i, s, a, o, c, u) {
            let l = 0, d = 0, f = this.displayWidth, h = this.displayHeight, g = 0, m = 0, b = this.displayWidth, _ = this.displayHeight;
            if (a !== void 0 ? (l = r, d = n, f = i, h = s, g = a, m = o, c !== void 0 ? (b = c, _ = u) : (b = f, _ = h)) : (g = r, m = n, i !== void 0 && (b = i, _ = s)), !(typeof CanvasRenderingContext2D < "u" && e instanceof CanvasRenderingContext2D || typeof OffscreenCanvasRenderingContext2D < "u" && e instanceof OffscreenCanvasRenderingContext2D)) throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");
            if (!Number.isFinite(l)) throw new TypeError("sx must be a number.");
            if (!Number.isFinite(d)) throw new TypeError("sy must be a number.");
            if (!Number.isFinite(f) || f < 0) throw new TypeError("sWidth must be a non-negative number.");
            if (!Number.isFinite(h) || h < 0) throw new TypeError("sHeight must be a non-negative number.");
            if (!Number.isFinite(g)) throw new TypeError("dx must be a number.");
            if (!Number.isFinite(m)) throw new TypeError("dy must be a number.");
            if (!Number.isFinite(b) || b < 0) throw new TypeError("dWidth must be a non-negative number.");
            if (!Number.isFinite(_) || _ < 0) throw new TypeError("dHeight must be a non-negative number.");
            if (this._closed) throw new Error("VideoSample is closed.");
            ({ sx: l, sy: d, sWidth: f, sHeight: h } = this._rotateSourceRegion(l, d, f, h, this.rotation));
            const w = this.toCanvasImageSource();
            e.save();
            const y = g + b / 2, T = m + _ / 2;
            e.translate(y, T), e.rotate(this.rotation * Math.PI / 180);
            const S = this.rotation % 180 === 0 ? 1 : b / _;
            e.scale(1 / S, S), e.drawImage(w, l, d, f, h, -b / 2, -_ / 2, b, _), e.restore();
        }
        drawWithFit(e, r) {
            if (!(typeof CanvasRenderingContext2D < "u" && e instanceof CanvasRenderingContext2D || typeof OffscreenCanvasRenderingContext2D < "u" && e instanceof OffscreenCanvasRenderingContext2D)) throw new TypeError("context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.");
            if (!r || typeof r != "object") throw new TypeError("options must be an object.");
            if (![
                "fill",
                "contain",
                "cover"
            ].includes(r.fit)) throw new TypeError("options.fit must be 'fill', 'contain', or 'cover'.");
            if (r.rotation !== void 0 && ![
                0,
                90,
                180,
                270
            ].includes(r.rotation)) throw new TypeError("options.rotation, when provided, must be 0, 90, 180, or 270.");
            r.crop !== void 0 && mn(r.crop, "options.");
            const n = e.canvas.width, i = e.canvas.height, s = r.rotation ?? this.rotation, [a, o] = s % 180 === 0 ? [
                this.squarePixelWidth,
                this.squarePixelHeight
            ] : [
                this.squarePixelHeight,
                this.squarePixelWidth
            ];
            let c = r.crop;
            c && (c = _i(c, a, o));
            let u, l, d, f;
            const { sx: h, sy: g, sWidth: m, sHeight: b } = this._rotateSourceRegion(r.crop?.left ?? 0, r.crop?.top ?? 0, r.crop?.width ?? a, r.crop?.height ?? o, s);
            if (r.fit === "fill") u = 0, l = 0, d = n, f = i;
            else {
                const [w, y] = r.crop ? [
                    r.crop.width,
                    r.crop.height
                ] : [
                    a,
                    o
                ], T = r.fit === "contain" ? Math.min(n / w, i / y) : Math.max(n / w, i / y);
                d = w * T, f = y * T, u = (n - d) / 2, l = (i - f) / 2;
            }
            e.save();
            const _ = s % 180 === 0 ? 1 : d / f;
            e.translate(n / 2, i / 2), e.rotate(s * Math.PI / 180), e.scale(1 / _, _), e.translate(-n / 2, -i / 2), e.drawImage(this.toCanvasImageSource(), h, g, m, b, u, l, d, f), e.restore();
        }
        _rotateSourceRegion(e, r, n, i, s) {
            return s === 90 ? [e, r, n, i] = [
                r,
                this.squarePixelHeight - e - n,
                i,
                n
            ] : s === 180 ? [e, r] = [
                this.squarePixelWidth - e - n,
                this.squarePixelHeight - r - i
            ] : s === 270 && ([e, r, n, i] = [
                this.squarePixelWidth - r - i,
                e,
                i,
                n
            ]), {
                sx: e,
                sy: r,
                sWidth: n,
                sHeight: i
            };
        }
        toCanvasImageSource() {
            if (this._closed) throw new Error("VideoSample is closed.");
            if (p(this._data !== null), this._data instanceof It || this._data instanceof Uint8Array) {
                const e = this.toVideoFrame();
                return queueMicrotask(()=>e.close()), e;
            } else return this._data;
        }
        async transform(e) {
            if (!e || typeof e != "object") throw new TypeError("options must be an object.");
            if (e.width !== void 0 && (!Number.isInteger(e.width) || e.width <= 0)) throw new TypeError("options.width, when provided, must be a positive integer.");
            if (e.height !== void 0 && (!Number.isInteger(e.height) || e.height <= 0)) throw new TypeError("options.height, when provided, must be a positive integer.");
            if (e.roundDimensionsTo !== void 0 && (!Number.isInteger(e.roundDimensionsTo) || e.roundDimensionsTo <= 0)) throw new TypeError("options.roundDimensionsTo, when provided, must be a positive integer.");
            if (e.fit !== void 0 && ![
                "fill",
                "contain",
                "cover"
            ].includes(e.fit)) throw new TypeError('options.fit, when provided, must be one of "fill", "contain", or "cover".');
            if (e.width !== void 0 && e.height !== void 0 && e.fit === void 0) throw new TypeError("When both options.width and options.height are provided, options.fit must also be provided.");
            if (e.rotate !== void 0 && ![
                0,
                90,
                180,
                270
            ].includes(e.rotate)) throw new TypeError("options.rotate, when provided, must be 0, 90, 180 or 270.");
            if (e.crop !== void 0 && mn(e.crop, "options."), e.alpha !== void 0 && ![
                "keep",
                "discard"
            ].includes(e.alpha)) throw new TypeError("options.alpha, when provided, must be 'keep' or 'discard'.");
            const r = gn(this.rotation + (e.rotate ?? 0)), [n, i] = r % 180 === 0 ? [
                this.squarePixelWidth,
                this.squarePixelHeight
            ] : [
                this.squarePixelHeight,
                this.squarePixelWidth
            ];
            let s = e.crop;
            s && (s = _i(s, n, i));
            const a = s ? s.width : n, o = s ? s.height : i, c = a / o;
            let u, l;
            e.width !== void 0 && e.height === void 0 ? (u = e.width, l = u / c) : e.width === void 0 && e.height !== void 0 ? (l = e.height, u = l * c) : e.width !== void 0 && e.height !== void 0 ? (u = e.width, l = e.height) : (u = a, l = o), u = ni(u, e.roundDimensionsTo ?? 1), l = ni(l, e.roundDimensionsTo ?? 1);
            const d = {
                width: u,
                height: l,
                fit: e.fit ?? "fill",
                rotation: r,
                crop: s ?? {
                    left: 0,
                    top: 0,
                    width: n,
                    height: i
                },
                alpha: e.alpha ?? "keep"
            };
            for (const m of pl){
                let b = m(this, d);
                if (b instanceof Promise && (b = await b), b !== null) return b;
            }
            let f = null, h = !1;
            for (const m of mr)if (m.canvas.width === d.width && m.canvas.height === d.height) {
                f = m.canvas, m.age = Js++;
                break;
            }
            if (f === null) {
                if (typeof OffscreenCanvas < "u") f = new OffscreenCanvas(d.width, d.height);
                else {
                    if (typeof window > "u" || typeof document > "u") throw new Error("Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().");
                    f = document.createElement("canvas"), f.width = d.width, f.height = d.height;
                }
                h = !0, mr.length >= gl && mr.splice(Ei(mr, (m)=>m.age), 1), mr.push({
                    canvas: f,
                    age: Js++
                });
            }
            const g = f.getContext("2d", {
                alpha: !0
            });
            return p(g), d.alpha === "discard" ? (g.fillStyle = "black", g.fillRect(0, 0, d.width, d.height)) : h || g.clearRect(0, 0, d.width, d.height), this.drawWithFit(g, {
                fit: d.fit,
                rotation: d.rotation,
                crop: d.crop
            }), new we(f, {
                timestamp: this.timestamp,
                duration: this.duration,
                rotation: 0
            });
        }
        setRotation(e) {
            if (![
                0,
                90,
                180,
                270
            ].includes(e)) throw new TypeError("newRotation must be 0, 90, 180, or 270.");
            this.rotation = e;
        }
        setTimestamp(e) {
            if (!Number.isFinite(e)) throw new TypeError("newTimestamp must be a number.");
            this.timestamp = e;
        }
        setDuration(e) {
            if (!Number.isFinite(e) || e < 0) throw new TypeError("newDuration must be a non-negative number.");
            this.duration = e;
        }
        [Symbol.dispose]() {
            this.close();
        }
    }
    const pl = [], gl = 3, mr = [];
    let Js = 0;
    class qn {
        constructor(e){
            if (e !== void 0) {
                if (!e || typeof e != "object") throw new TypeError("init.colorSpace, when provided, must be an object.");
                const r = Object.keys(Ut);
                if (e.primaries != null && !r.includes(e.primaries)) throw new TypeError(`init.colorSpace.primaries, when provided, must be one of ${r.join(", ")}.`);
                const n = Object.keys(Lt);
                if (e.transfer != null && !n.includes(e.transfer)) throw new TypeError(`init.colorSpace.transfer, when provided, must be one of ${n.join(", ")}.`);
                const i = Object.keys(Wt);
                if (e.matrix != null && !i.includes(e.matrix)) throw new TypeError(`init.colorSpace.matrix, when provided, must be one of ${i.join(", ")}.`);
                if (e.fullRange != null && typeof e.fullRange != "boolean") throw new TypeError("init.colorSpace.fullRange, when provided, must be a boolean.");
            }
            this.primaries = e?.primaries ?? null, this.transfer = e?.transfer ?? null, this.matrix = e?.matrix ?? null, this.fullRange = e?.fullRange ?? null;
        }
        toJSON() {
            return {
                primaries: this.primaries,
                transfer: this.transfer,
                matrix: this.matrix,
                fullRange: this.fullRange
            };
        }
    }
    const pr = (t)=>typeof VideoFrame < "u" && t instanceof VideoFrame, _i = (t, e, r)=>{
        const n = Math.min(t.left, e), i = Math.min(t.top, r), s = Math.min(t.width, e - n), a = Math.min(t.height, r - i);
        return p(s >= 0), p(a >= 0), {
            left: n,
            top: i,
            width: s,
            height: a
        };
    }, mn = (t, e)=>{
        if (!t || typeof t != "object") throw new TypeError(e + "crop, when provided, must be an object.");
        if (!Number.isInteger(t.left) || t.left < 0) throw new TypeError(e + "crop.left must be a non-negative integer.");
        if (!Number.isInteger(t.top) || t.top < 0) throw new TypeError(e + "crop.top must be a non-negative integer.");
        if (!Number.isInteger(t.width) || t.width < 0) throw new TypeError(e + "crop.width must be a non-negative integer.");
        if (!Number.isInteger(t.height) || t.height < 0) throw new TypeError(e + "crop.height must be a non-negative integer.");
    }, ea = (t)=>{
        if (!t || typeof t != "object") throw new TypeError("options must be an object.");
        if (t.colorSpace !== void 0 && ![
            "display-p3",
            "srgb"
        ].includes(t.colorSpace)) throw new TypeError("options.colorSpace, when provided, must be 'display-p3' or 'srgb'.");
        if (t.format !== void 0 && typeof t.format != "string") throw new TypeError("options.format, when provided, must be a string.");
        if (t.layout !== void 0) {
            if (!Array.isArray(t.layout)) throw new TypeError("options.layout, when provided, must be an array.");
            for (const e of t.layout){
                if (!e || typeof e != "object") throw new TypeError("Each entry in options.layout must be an object.");
                if (!Number.isInteger(e.offset) || e.offset < 0) throw new TypeError("plane.offset must be a non-negative integer.");
                if (!Number.isInteger(e.stride) || e.stride < 0) throw new TypeError("plane.stride must be a non-negative integer.");
            }
        }
        if (t.rect !== void 0) {
            if (!t.rect || typeof t.rect != "object") throw new TypeError("options.rect, when provided, must be an object.");
            if (t.rect.x !== void 0 && (!Number.isInteger(t.rect.x) || t.rect.x < 0)) throw new TypeError("options.rect.x, when provided, must be a non-negative integer.");
            if (t.rect.y !== void 0 && (!Number.isInteger(t.rect.y) || t.rect.y < 0)) throw new TypeError("options.rect.y, when provided, must be a non-negative integer.");
            if (t.rect.width !== void 0 && (!Number.isInteger(t.rect.width) || t.rect.width < 0)) throw new TypeError("options.rect.width, when provided, must be a non-negative integer.");
            if (t.rect.height !== void 0 && (!Number.isInteger(t.rect.height) || t.rect.height < 0)) throw new TypeError("options.rect.height, when provided, must be a non-negative integer.");
        }
    }, _l = (t, e, r)=>{
        const n = Cn(t), i = [];
        let s = 0;
        for (const a of n){
            const o = Math.ceil(e / a.widthDivisor), c = Math.ceil(r / a.heightDivisor), u = o * a.sampleBytes, l = u * c;
            i.push({
                offset: s,
                stride: u
            }), s += l;
        }
        return i;
    }, Cn = (t)=>{
        const e = (r, n, i, s, a)=>{
            const o = [
                {
                    sampleBytes: r,
                    widthDivisor: 1,
                    heightDivisor: 1
                },
                {
                    sampleBytes: n,
                    widthDivisor: i,
                    heightDivisor: s
                },
                {
                    sampleBytes: n,
                    widthDivisor: i,
                    heightDivisor: s
                }
            ];
            return a && o.push({
                sampleBytes: r,
                widthDivisor: 1,
                heightDivisor: 1
            }), o;
        };
        switch(t){
            case "I420":
                return e(1, 1, 2, 2, !1);
            case "I420P10":
            case "I420P12":
                return e(2, 2, 2, 2, !1);
            case "I420A":
                return e(1, 1, 2, 2, !0);
            case "I420AP10":
            case "I420AP12":
                return e(2, 2, 2, 2, !0);
            case "I422":
                return e(1, 1, 2, 1, !1);
            case "I422P10":
            case "I422P12":
                return e(2, 2, 2, 1, !1);
            case "I422A":
                return e(1, 1, 2, 1, !0);
            case "I422AP10":
            case "I422AP12":
                return e(2, 2, 2, 1, !0);
            case "I444":
                return e(1, 1, 1, 1, !1);
            case "I444P10":
            case "I444P12":
                return e(2, 2, 1, 1, !1);
            case "I444A":
                return e(1, 1, 1, 1, !0);
            case "I444AP10":
            case "I444AP12":
                return e(2, 2, 1, 1, !0);
            case "NV12":
                return [
                    {
                        sampleBytes: 1,
                        widthDivisor: 1,
                        heightDivisor: 1
                    },
                    {
                        sampleBytes: 2,
                        widthDivisor: 2,
                        heightDivisor: 2
                    }
                ];
            case "RGBA":
            case "RGBX":
            case "BGRA":
            case "BGRX":
                return [
                    {
                        sampleBytes: 4,
                        widthDivisor: 1,
                        heightDivisor: 1
                    }
                ];
            default:
                je(t), p(!1);
        }
    }, ta = (t, e)=>{
        const r = {
            left: 0,
            top: 0,
            width: t.codedWidth,
            height: t.codedHeight
        }, n = e.rect, i = bl(r, n, t.codedWidth, t.codedHeight, t.format), s = e.layout;
        let a;
        if (!e.format || e.format === t.format) a = t.format;
        else if ([
            "RGBA",
            "RGBX",
            "BGRA",
            "BGRX"
        ].includes(e.format)) a = e.format;
        else throw new Error("NotSupportedError: Invalid destination format.");
        return yl(i, a, s);
    }, bl = (t, e, r, n, i)=>{
        const s = {
            ...t
        };
        if (e !== void 0) {
            if (e.width === 0 || e.height === 0) throw new TypeError("visibleRect dimensions cannot be zero.");
            if ((e.x || 0) + (e.width || 0) > r) throw new TypeError("visibleRect exceeds codedWidth.");
            if ((e.y || 0) + (e.height || 0) > n) throw new TypeError("visibleRect exceeds codedHeight.");
            s.x = e.x || 0, s.y = e.y || 0, s.width = e.width || 0, s.height = e.height || 0;
        }
        if (!wl(i, s)) throw new TypeError("visibleRect alignment is invalid for the format.");
        return s;
    }, wl = (t, e)=>{
        if (t === null) return !0;
        const r = Cn(t);
        for(let n = 0; n < r.length; n++){
            const i = r[n], s = i.widthDivisor, a = i.heightDivisor;
            if ((e.x || 0) % s !== 0 || (e.y || 0) % a !== 0) return !1;
        }
        return !0;
    }, yl = (t, e, r)=>{
        const n = Cn(e), i = n.length;
        if (r !== void 0 && r.length !== i) throw new TypeError(`Layout must have ${i} planes.`);
        let s = 0;
        const a = [], o = [];
        for(let c = 0; c < i; c++){
            const u = n[c], l = u.sampleBytes, d = u.widthDivisor, f = u.heightDivisor, h = {
                destinationOffset: 0,
                destinationStride: 0,
                sourceTop: 0,
                sourceHeight: 0,
                sourceLeftBytes: 0,
                sourceWidthBytes: 0
            };
            if (h.sourceTop = Math.ceil(Math.trunc(t.y || 0) / f), h.sourceHeight = Math.ceil(Math.trunc(t.height || 0) / f), h.sourceLeftBytes = Math.floor(Math.trunc(t.x || 0) / d) * l, h.sourceWidthBytes = Math.floor(Math.trunc(t.width || 0) / d) * l, r !== void 0) {
                const b = r[c];
                if (b.stride < h.sourceWidthBytes) throw new TypeError(`Stride for plane ${c} is too small.`);
                h.destinationOffset = b.offset, h.destinationStride = b.stride;
            } else h.destinationOffset = s, h.destinationStride = h.sourceWidthBytes;
            const m = h.destinationStride * h.sourceHeight + h.destinationOffset;
            if (m > 4294967295) throw new TypeError("Allocation size exceeds limit.");
            o.push(m), s = Math.max(s, m);
            for(let b = 0; b < c; b++){
                const _ = a[b];
                if (!(o[c] <= _.destinationOffset || o[b] <= h.destinationOffset)) throw new TypeError("Planes overlap.");
            }
            a.push(h);
        }
        return {
            allocationSize: s,
            computedLayouts: a
        };
    }, qr = new Set([
        "f32",
        "f32-planar",
        "s16",
        "s16-planar",
        "s32",
        "s32-planar",
        "u8",
        "u8-planar"
    ]);
    class gr {
        constructor(){
            this._referenceCount = 0;
        }
    }
    class Te {
        get microsecondTimestamp() {
            return Math.trunc(bt * this.timestamp);
        }
        get microsecondDuration() {
            return Math.trunc(bt * this.duration);
        }
        constructor(e){
            if (this._closed = !1, _r(e)) {
                if (e.format === null) throw new TypeError("AudioData with null format is not supported.");
                this._data = e, this.format = e.format, this.sampleRate = e.sampleRate, this.numberOfFrames = e.numberOfFrames, this.numberOfChannels = e.numberOfChannels, this.timestamp = e.timestamp / 1e6, this.duration = e.numberOfFrames / e.sampleRate;
            } else if (e instanceof gr) {
                if (this._data = e, e._referenceCount++, this.format = e.getFormat(), !qr.has(this.format)) throw new TypeError("getFormat() must return an AudioSampleFormat.");
                if (this.sampleRate = e.getSampleRate(), !Number.isInteger(this.sampleRate) || this.sampleRate <= 0) throw new TypeError("getSampleRate() must return a positive integer.");
                if (this.numberOfFrames = e.getNumberOfFrames(), !Number.isInteger(this.numberOfFrames) || this.numberOfFrames < 0) throw new TypeError("getNumberOfFrames() must return a non-negative integer.");
                if (this.numberOfChannels = e.getNumberOfChannels(), !Number.isInteger(this.numberOfChannels) || this.numberOfChannels <= 0) throw new TypeError("getNumberOfChannels() must return a positive integer.");
                if (this.timestamp = e.getTimestamp(), !Number.isFinite(this.timestamp)) throw new TypeError("getTimestamp() must return a finite number.");
                this.duration = this.numberOfFrames / this.sampleRate;
            } else {
                if (!e || typeof e != "object") throw new TypeError("Invalid AudioDataInit: must be an object.");
                if (!qr.has(e.format)) throw new TypeError("Invalid AudioDataInit: invalid format.");
                if (!Number.isFinite(e.sampleRate) || e.sampleRate <= 0) throw new TypeError("Invalid AudioDataInit: sampleRate must be > 0.");
                if (!Number.isInteger(e.numberOfChannels) || e.numberOfChannels === 0) throw new TypeError("Invalid AudioDataInit: numberOfChannels must be an integer > 0.");
                if (!Number.isFinite(e?.timestamp)) throw new TypeError("init.timestamp must be a number.");
                const r = e.data.byteLength / (At(e.format) * e.numberOfChannels);
                if (!Number.isInteger(r)) throw new TypeError("Invalid AudioDataInit: data size is not a multiple of frame size.");
                this.format = e.format, this.sampleRate = e.sampleRate, this.numberOfFrames = r, this.numberOfChannels = e.numberOfChannels, this.timestamp = e.timestamp, this.duration = r / e.sampleRate;
                let n;
                if (e.data instanceof ArrayBuffer) n = new Uint8Array(e.data);
                else if (ArrayBuffer.isView(e.data)) n = new Uint8Array(e.data.buffer, e.data.byteOffset, e.data.byteLength);
                else throw new TypeError("Invalid AudioDataInit: data is not a BufferSource.");
                const i = this.numberOfFrames * this.numberOfChannels * At(this.format);
                if (n.byteLength < i) throw new TypeError("Invalid AudioDataInit: insufficient data size.");
                this._data = n;
            }
            Or?.register(this, {
                type: "audio",
                data: this._data
            }, this);
        }
        allocationSize(e) {
            if (!e || typeof e != "object") throw new TypeError("options must be an object.");
            if (!Number.isInteger(e.planeIndex) || e.planeIndex < 0) throw new TypeError("planeIndex must be a non-negative integer.");
            if (e.format !== void 0 && !qr.has(e.format)) throw new TypeError("Invalid format.");
            if (e.frameOffset !== void 0 && (!Number.isInteger(e.frameOffset) || e.frameOffset < 0)) throw new TypeError("frameOffset must be a non-negative integer.");
            if (e.frameCount !== void 0 && (!Number.isInteger(e.frameCount) || e.frameCount < 0)) throw new TypeError("frameCount must be a non-negative integer.");
            if (this._closed) throw new Error("AudioSample is closed.");
            const r = e.format ?? this.format, n = e.frameOffset ?? 0;
            if (n >= this.numberOfFrames) throw new RangeError("frameOffset out of range");
            const i = e.frameCount !== void 0 ? e.frameCount : this.numberOfFrames - n;
            if (i > this.numberOfFrames - n) throw new RangeError("frameCount out of range");
            const s = At(r), a = Jt(r);
            if (a && e.planeIndex >= this.numberOfChannels) throw new RangeError("planeIndex out of range");
            if (!a && e.planeIndex !== 0) throw new RangeError("planeIndex out of range");
            return (a ? i : i * this.numberOfChannels) * s;
        }
        copyTo(e, r) {
            if (!_n(e)) throw new TypeError("destination must be an ArrayBuffer or an ArrayBuffer view.");
            if (!r || typeof r != "object") throw new TypeError("options must be an object.");
            if (!Number.isInteger(r.planeIndex) || r.planeIndex < 0) throw new TypeError("planeIndex must be a non-negative integer.");
            if (r.format !== void 0 && !qr.has(r.format)) throw new TypeError("Invalid format.");
            if (r.frameOffset !== void 0 && (!Number.isInteger(r.frameOffset) || r.frameOffset < 0)) throw new TypeError("frameOffset must be a non-negative integer.");
            if (r.frameCount !== void 0 && (!Number.isInteger(r.frameCount) || r.frameCount < 0)) throw new TypeError("frameCount must be a non-negative integer.");
            if (this._closed) throw new Error("AudioSample is closed.");
            const { format: n, frameCount: i, frameOffset: s } = r;
            let { planeIndex: a } = r;
            const o = this.format, c = n ?? this.format;
            if (!c) throw new Error("Destination format not determined");
            const u = this.numberOfFrames, l = this.numberOfChannels, d = s ?? 0;
            if (d >= u) throw new RangeError("frameOffset out of range");
            const f = i !== void 0 ? i : u - d;
            if (f > u - d) throw new RangeError("frameCount out of range");
            const h = At(c), g = Jt(c);
            if (g && a >= l) throw new RangeError("planeIndex out of range");
            if (!g && a !== 0) throw new RangeError("planeIndex out of range");
            const b = (g ? f : f * l) * h;
            if (e.byteLength < b) throw new RangeError("Destination buffer is too small");
            const _ = Z(e), w = Po(c);
            if (_r(this._data)) Pr() && l > 2 && c !== o ? Tl(this._data, _, o, c, l, a, d, f) : this._data.copyTo(e, {
                planeIndex: a,
                frameOffset: d,
                frameCount: f,
                format: c
            });
            else {
                const y = xo(o), T = At(o), S = Jt(o);
                let C;
                if (this._data instanceof gr) {
                    const P = (x)=>{
                        const v = this._data.getDataPlane(x);
                        if (!(v instanceof Uint8Array)) throw new TypeError("getDataPlane() must return a Uint8Array.");
                        const R = u * T * (S ? 1 : l);
                        if (v.byteLength !== R) throw new TypeError(`Data plane ${x} has invalid size. Expected exactly ${R} bytes, got ${v.byteLength} bytes.`);
                        return v;
                    };
                    if (S) if (g) C = P(a), a = 0;
                    else {
                        C = new Uint8Array(u * T * l);
                        for(let x = 0; x < l; x++){
                            const v = P(x);
                            C.set(v, x * u * T);
                        }
                    }
                    else C = P(0);
                } else C = this._data;
                const I = Z(C);
                for(let P = 0; P < f; P++)if (g) {
                    const x = P * h;
                    let v;
                    S ? v = (a * u + (P + d)) * T : v = ((P + d) * l + a) * T;
                    const R = y(I, v);
                    w(_, x, R);
                } else for(let x = 0; x < l; x++){
                    const R = (P * l + x) * h;
                    let B;
                    S ? B = (x * u + (P + d)) * T : B = ((P + d) * l + x) * T;
                    const L = y(I, B);
                    w(_, R, L);
                }
            }
        }
        clone() {
            if (this._closed) throw new Error("AudioSample is closed.");
            if (this._data instanceof gr) {
                const e = new Te(this._data);
                return e.setTimestamp(this.timestamp), e;
            } else if (_r(this._data)) {
                const e = new Te(this._data.clone());
                return e.setTimestamp(this.timestamp), e;
            } else return new Te({
                format: this.format,
                sampleRate: this.sampleRate,
                numberOfFrames: this.numberOfFrames,
                numberOfChannels: this.numberOfChannels,
                timestamp: this.timestamp,
                data: this._data
            });
        }
        close() {
            this._closed || (Or?.unregister(this), this._data instanceof gr ? (this._data._referenceCount--, this._data._referenceCount === 0 && this._data.close()) : _r(this._data) ? this._data.close() : this._data = new Uint8Array(0), this._closed = !0);
        }
        toAudioData() {
            if (this._closed) throw new Error("AudioSample is closed.");
            return this._data instanceof gr ? this._createAudioDataFromData() : _r(this._data) ? this._data.timestamp === this.microsecondTimestamp ? this._data.clone() : this._createAudioDataFromData() : new AudioData({
                format: this.format,
                sampleRate: this.sampleRate,
                numberOfFrames: this.numberOfFrames,
                numberOfChannels: this.numberOfChannels,
                timestamp: this.microsecondTimestamp,
                data: this._data.buffer instanceof ArrayBuffer ? this._data.buffer : this._data.slice()
            });
        }
        _createAudioDataFromData() {
            if (Jt(this.format)) {
                const e = this.allocationSize({
                    planeIndex: 0,
                    format: this.format
                }), r = new ArrayBuffer(e * this.numberOfChannels);
                for(let n = 0; n < this.numberOfChannels; n++)this.copyTo(new Uint8Array(r, n * e, e), {
                    planeIndex: n,
                    format: this.format
                });
                return new AudioData({
                    format: this.format,
                    sampleRate: this.sampleRate,
                    numberOfFrames: this.numberOfFrames,
                    numberOfChannels: this.numberOfChannels,
                    timestamp: this.microsecondTimestamp,
                    data: r
                });
            } else {
                const e = new ArrayBuffer(this.allocationSize({
                    planeIndex: 0,
                    format: this.format
                }));
                return this.copyTo(e, {
                    planeIndex: 0,
                    format: this.format
                }), new AudioData({
                    format: this.format,
                    sampleRate: this.sampleRate,
                    numberOfFrames: this.numberOfFrames,
                    numberOfChannels: this.numberOfChannels,
                    timestamp: this.microsecondTimestamp,
                    data: e
                });
            }
        }
        toAudioBuffer() {
            if (this._closed) throw new Error("AudioSample is closed.");
            const e = new AudioBuffer({
                numberOfChannels: this.numberOfChannels,
                length: this.numberOfFrames,
                sampleRate: this.sampleRate
            }), r = new Float32Array(this.allocationSize({
                planeIndex: 0,
                format: "f32-planar"
            }) / 4);
            for(let n = 0; n < this.numberOfChannels; n++)this.copyTo(r, {
                planeIndex: n,
                format: "f32-planar"
            }), e.copyToChannel(r, n);
            return e;
        }
        setTimestamp(e) {
            if (!Number.isFinite(e)) throw new TypeError("newTimestamp must be a number.");
            this.timestamp = e;
        }
        [Symbol.dispose]() {
            this.close();
        }
        static *_fromAudioBuffer(e, r) {
            if (!(e instanceof AudioBuffer)) throw new TypeError("audioBuffer must be an AudioBuffer.");
            const n = 48e3 * 5, i = e.numberOfChannels, s = e.sampleRate, a = e.length, o = Math.floor(n / i);
            let c = 0, u = a;
            for(; u > 0;){
                const l = Math.min(o, u), d = new Float32Array(i * l);
                for(let f = 0; f < i; f++)e.copyFromChannel(d.subarray(f * l, (f + 1) * l), f, c);
                yield new Te({
                    format: "f32-planar",
                    sampleRate: s,
                    numberOfFrames: l,
                    numberOfChannels: i,
                    timestamp: r + c / s,
                    data: d
                }), c += l, u -= l;
            }
        }
        static fromAudioBuffer(e, r) {
            if (!(e instanceof AudioBuffer)) throw new TypeError("audioBuffer must be an AudioBuffer.");
            const n = 48e3 * 5, i = e.numberOfChannels, s = e.sampleRate, a = e.length, o = Math.floor(n / i);
            let c = 0, u = a;
            const l = [];
            for(; u > 0;){
                const d = Math.min(o, u), f = new Float32Array(i * d);
                for(let g = 0; g < i; g++)e.copyFromChannel(f.subarray(g * d, (g + 1) * d), g, c);
                const h = new Te({
                    format: "f32-planar",
                    sampleRate: s,
                    numberOfFrames: d,
                    numberOfChannels: i,
                    timestamp: r + c / s,
                    data: f
                });
                l.push(h), c += d, u -= d;
            }
            return l;
        }
    }
    const At = (t)=>{
        switch(t){
            case "u8":
            case "u8-planar":
                return 1;
            case "s16":
            case "s16-planar":
                return 2;
            case "s32":
            case "s32-planar":
                return 4;
            case "f32":
            case "f32-planar":
                return 4;
            default:
                throw new Error("Unknown AudioSampleFormat");
        }
    }, Jt = (t)=>{
        switch(t){
            case "u8-planar":
            case "s16-planar":
            case "s32-planar":
            case "f32-planar":
                return !0;
            default:
                return !1;
        }
    }, xo = (t)=>{
        switch(t){
            case "u8":
            case "u8-planar":
                return (e, r)=>(e.getUint8(r) - 128) / 128;
            case "s16":
            case "s16-planar":
                return (e, r)=>e.getInt16(r, !0) / 32768;
            case "s32":
            case "s32-planar":
                return (e, r)=>e.getInt32(r, !0) / 2147483648;
            case "f32":
            case "f32-planar":
                return (e, r)=>e.getFloat32(r, !0);
        }
    }, Po = (t)=>{
        switch(t){
            case "u8":
            case "u8-planar":
                return (e, r, n)=>e.setUint8(r, fe((n + 1) * 127.5, 0, 255));
            case "s16":
            case "s16-planar":
                return (e, r, n)=>e.setInt16(r, fe(Math.round(n * 32767), -32768, 32767), !0);
            case "s32":
            case "s32-planar":
                return (e, r, n)=>e.setInt32(r, fe(Math.round(n * 2147483647), -2147483648, 2147483647), !0);
            case "f32":
            case "f32-planar":
                return (e, r, n)=>e.setFloat32(r, n, !0);
        }
    }, _r = (t)=>typeof AudioData < "u" && t instanceof AudioData, kl = (t)=>{
        switch(t){
            case "u8-planar":
                return "u8";
            case "s16-planar":
                return "s16";
            case "s32-planar":
                return "s32";
            case "f32-planar":
                return "f32";
            default:
                return t;
        }
    }, Tl = (t, e, r, n, i, s, a, o)=>{
        const c = xo(r), u = Po(n), l = At(r), d = At(n), f = Jt(r);
        if (Jt(n)) if (f) {
            const g = new ArrayBuffer(o * l), m = Z(g);
            t.copyTo(g, {
                planeIndex: s,
                frameOffset: a,
                frameCount: o,
                format: r
            });
            for(let b = 0; b < o; b++){
                const _ = b * l, w = b * d, y = c(m, _);
                u(e, w, y);
            }
        } else {
            const g = new ArrayBuffer(o * i * l), m = Z(g);
            t.copyTo(g, {
                planeIndex: 0,
                frameOffset: a,
                frameCount: o,
                format: r
            });
            for(let b = 0; b < o; b++){
                const _ = (b * i + s) * l, w = b * d, y = c(m, _);
                u(e, w, y);
            }
        }
        else if (f) {
            const g = o * l, m = new ArrayBuffer(g), b = Z(m);
            for(let _ = 0; _ < i; _++){
                t.copyTo(m, {
                    planeIndex: _,
                    frameOffset: a,
                    frameCount: o,
                    format: r
                });
                for(let w = 0; w < o; w++){
                    const y = w * l, T = (w * i + _) * d, S = c(b, y);
                    u(e, T, S);
                }
            }
        } else {
            const g = new ArrayBuffer(o * i * l), m = Z(g);
            t.copyTo(g, {
                planeIndex: 0,
                frameOffset: a,
                frameCount: o,
                format: r
            });
            for(let b = 0; b < o; b++)for(let _ = 0; _ < i; _++){
                const w = b * i + _, y = w * l, T = w * d, S = c(m, y);
                u(e, T, S);
            }
        }
    }, Sl = (t, e)=>{
        const r = t.allocationSize({
            format: e,
            planeIndex: 0
        }), n = new ArrayBuffer(r);
        return t.copyTo(n, {
            format: e,
            planeIndex: 0
        }), new Te({
            data: n,
            format: e,
            numberOfChannels: t.numberOfChannels,
            sampleRate: t.sampleRate,
            timestamp: t.timestamp,
            duration: t.duration
        });
    };
    const xl = (t)=>{
        if (!t || typeof t != "object") throw new TypeError("Encoding config must be an object.");
        if (!Fe.includes(t.codec)) throw new TypeError(`Invalid video codec '${t.codec}'. Must be one of: ${Fe.join(", ")}.`);
        if (!(t.bitrate instanceof xt) && (!Number.isInteger(t.bitrate) || t.bitrate <= 0)) throw new TypeError("config.bitrate must be a positive integer or a quality.");
        if (t.keyFrameInterval !== void 0 && (!Number.isFinite(t.keyFrameInterval) || t.keyFrameInterval < 0)) throw new TypeError("config.keyFrameInterval, when provided, must be a non-negative number.");
        if (t.sizeChangeBehavior !== void 0 && ![
            "deny",
            "passThrough",
            "fill",
            "contain",
            "cover"
        ].includes(t.sizeChangeBehavior)) throw new TypeError("config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.");
        if (t.transform !== void 0) {
            if (typeof t.transform != "object" || !t.transform) throw new TypeError("config.transform, when provided, must be an object.");
            if (t.transform.width !== void 0 && (!Number.isInteger(t.transform.width) || t.transform.width <= 0)) throw new TypeError("config.transform.width, when provided, must be a positive integer.");
            if (t.transform.height !== void 0 && (!Number.isInteger(t.transform.height) || t.transform.height <= 0)) throw new TypeError("config.transform.height, when provided, must be a positive integer.");
            if (t.transform.fit !== void 0 && ![
                "fill",
                "contain",
                "cover"
            ].includes(t.transform.fit)) throw new TypeError('config.transform.fit, when provided, must be one of "fill", "contain", or "cover".');
            if (t.transform.width !== void 0 && t.transform.height !== void 0 && t.transform.fit === void 0 && ![
                "fill",
                "contain",
                "cover"
            ].includes(t.sizeChangeBehavior)) throw new TypeError("When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.");
            if (t.transform.fit !== void 0 && [
                "fill",
                "contain",
                "cover"
            ].includes(t.sizeChangeBehavior) && t.transform.fit !== t.sizeChangeBehavior) throw new TypeError("config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.");
            if (t.transform.rotate !== void 0 && ![
                0,
                90,
                180,
                270
            ].includes(t.transform.rotate)) throw new TypeError("config.transform.rotate, when provided, must be 0, 90, 180 or 270.");
            if (t.transform.crop !== void 0 && mn(t.transform.crop, "config.transform."), t.transform.process !== void 0 && typeof t.transform.process != "function") throw new TypeError("config.transform.process, when provided, must be a function.");
            if (t.transform.frameRate !== void 0 && (!Number.isFinite(t.transform.frameRate) || t.transform.frameRate <= 0)) throw new TypeError("config.transform.frameRate, when provided, must be a finite positive number.");
            if (t.transform.force !== void 0 && typeof t.transform.force != "boolean") throw new TypeError("config.transform.force, when provided, must be a boolean.");
        }
        if (t.onEncodedPacket !== void 0 && typeof t.onEncodedPacket != "function") throw new TypeError("config.onEncodedPacket, when provided, must be a function.");
        if (t.onEncoderConfig !== void 0 && typeof t.onEncoderConfig != "function") throw new TypeError("config.onEncoderConfig, when provided, must be a function.");
        Pl(t.codec, t);
    }, Pl = (t, e)=>{
        if (!e || typeof e != "object") throw new TypeError("Encoding options must be an object.");
        if (e.alpha !== void 0 && ![
            "discard",
            "keep"
        ].includes(e.alpha)) throw new TypeError("options.alpha, when provided, must be 'discard' or 'keep'.");
        if (e.bitrateMode !== void 0 && ![
            "constant",
            "variable"
        ].includes(e.bitrateMode)) throw new TypeError("bitrateMode, when provided, must be 'constant' or 'variable'.");
        if (e.latencyMode !== void 0 && ![
            "quality",
            "realtime"
        ].includes(e.latencyMode)) throw new TypeError("latencyMode, when provided, must be 'quality' or 'realtime'.");
        if (e.fullCodecString !== void 0 && typeof e.fullCodecString != "string") throw new TypeError("fullCodecString, when provided, must be a string.");
        if (e.fullCodecString !== void 0 && Dt(e.fullCodecString) !== t) throw new TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${t}).`);
        if (e.hardwareAcceleration !== void 0 && ![
            "no-preference",
            "prefer-hardware",
            "prefer-software"
        ].includes(e.hardwareAcceleration)) throw new TypeError("hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.");
        if (e.scalabilityMode !== void 0 && typeof e.scalabilityMode != "string") throw new TypeError("scalabilityMode, when provided, must be a string.");
        if (e.contentHint !== void 0 && typeof e.contentHint != "string") throw new TypeError("contentHint, when provided, must be a string.");
    }, Cl = (t)=>{
        const e = t.bitrate instanceof xt ? t.bitrate._toVideoBitrate(t.codec, t.width, t.height) : t.bitrate;
        return {
            codec: t.fullCodecString ?? fc(t.codec, t.width, t.height, e),
            width: t.width,
            height: t.height,
            displayWidth: t.squarePixelWidth,
            displayHeight: t.squarePixelHeight,
            bitrate: e,
            bitrateMode: t.bitrateMode,
            alpha: t.alpha ?? "discard",
            framerate: t.framerate,
            latencyMode: t.latencyMode,
            hardwareAcceleration: t.hardwareAcceleration,
            scalabilityMode: t.scalabilityMode,
            contentHint: t.contentHint,
            ...pc(t.codec)
        };
    }, Il = (t)=>{
        if (!t || typeof t != "object") throw new TypeError("Encoding config must be an object.");
        if (!ct.includes(t.codec)) throw new TypeError(`Invalid audio codec '${t.codec}'. Must be one of: ${ct.join(", ")}.`);
        if (t.bitrate === void 0 && !(be.includes(t.codec) || t.codec === "flac")) throw new TypeError("config.bitrate must be provided for compressed audio codecs.");
        if (t.bitrate !== void 0 && !(t.bitrate instanceof xt) && (!Number.isInteger(t.bitrate) || t.bitrate <= 0)) throw new TypeError("config.bitrate, when provided, must be a positive integer or a quality.");
        if (t.transform !== void 0) {
            if (typeof t.transform != "object" || !t.transform) throw new TypeError("config.transform, when provided, must be an object.");
            if (t.transform.numberOfChannels !== void 0 && (!Number.isInteger(t.transform.numberOfChannels) || t.transform.numberOfChannels <= 0)) throw new TypeError("config.transform.numberOfChannels, when provided, must be a positive integer.");
            if (t.transform.sampleRate !== void 0 && (!Number.isInteger(t.transform.sampleRate) || t.transform.sampleRate <= 0)) throw new TypeError("config.transform.sampleRate, when provided, must be a positive integer.");
            if (t.transform.sampleFormat !== void 0 && ![
                "u8",
                "s16",
                "s32",
                "f32"
            ].includes(t.transform.sampleFormat)) throw new TypeError("config.transform.sampleFormat, when provided, must be one of: u8, s16, s32, f32.");
            if (t.transform.process !== void 0 && typeof t.transform.process != "function") throw new TypeError("config.transform.process, when provided, must be a function.");
        }
        if (t.onEncodedPacket !== void 0 && typeof t.onEncodedPacket != "function") throw new TypeError("config.onEncodedPacket, when provided, must be a function.");
        if (t.onEncoderConfig !== void 0 && typeof t.onEncoderConfig != "function") throw new TypeError("config.onEncoderConfig, when provided, must be a function.");
        vl(t.codec, t);
    }, vl = (t, e)=>{
        if (!e || typeof e != "object") throw new TypeError("Encoding options must be an object.");
        if (e.bitrateMode !== void 0 && ![
            "constant",
            "variable"
        ].includes(e.bitrateMode)) throw new TypeError("bitrateMode, when provided, must be 'constant' or 'variable'.");
        if (e.fullCodecString !== void 0 && typeof e.fullCodecString != "string") throw new TypeError("fullCodecString, when provided, must be a string.");
        if (e.fullCodecString !== void 0 && Dt(e.fullCodecString) !== t) throw new TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${t}).`);
    }, El = (t)=>{
        const e = t.bitrate instanceof xt ? t.bitrate._toAudioBitrate(t.codec) : t.bitrate;
        return {
            codec: t.fullCodecString ?? mc(t.codec, t.numberOfChannels, t.sampleRate),
            numberOfChannels: t.numberOfChannels,
            sampleRate: t.sampleRate,
            bitrate: e,
            bitrateMode: t.bitrateMode,
            ...gc(t.codec)
        };
    };
    class xt {
        constructor(e){
            this._factor = e;
        }
        _toVideoBitrate(e, r, n) {
            const i = r * n, s = {
                avc: 1,
                hevc: .6,
                vp9: .6,
                av1: .4,
                vp8: 1.2
            }, a = 1920 * 1080, o = 3e6, c = Math.pow(i / a, .95), d = o * c * s[e] * this._factor;
            return Math.ceil(d / 1e3) * 1e3;
        }
        _toAudioBitrate(e) {
            if (be.includes(e) || e === "flac") return;
            const n = {
                aac: 128e3,
                opus: 64e3,
                mp3: 16e4,
                vorbis: 64e3,
                ac3: 384e3,
                eac3: 192e3
            }[e];
            if (!n) throw new Error(`Unhandled codec: ${e}`);
            let i = n * this._factor;
            return e === "aac" ? i = [
                96e3,
                128e3,
                16e4,
                192e3
            ].reduce((a, o)=>Math.abs(o - i) < Math.abs(a - i) ? o : a) : e === "opus" || e === "vorbis" ? i = Math.max(6e3, i) : e === "mp3" && (i = [
                8e3,
                16e3,
                24e3,
                32e3,
                4e4,
                48e3,
                64e3,
                8e4,
                96e3,
                112e3,
                128e3,
                16e4,
                192e3,
                224e3,
                256e3,
                32e4
            ].reduce((a, o)=>Math.abs(o - i) < Math.abs(a - i) ? o : a)), Math.round(i / 1e3) * 1e3;
        }
    }
    fS = new xt(.6);
    hS = new xt(1);
    mS = new xt(2);
    pS = new xt(4);
    const Co = [], Io = [], Al = [], Bl = [];
    const Fl = (t)=>{
        let n = t, i = 4096, s = 0, a = 12, o = 0;
        for(n < 0 && (n = -n, s = 128), n += 33, n > 8191 && (n = 8191); (n & i) !== i && a >= 5;)i >>= 1, a--;
        return o = n >> a - 4 & 15, ~(s | a - 5 << 4 | o) & 255;
    }, Rl = (t)=>{
        let r = 0, n = 0, i = ~t;
        i & 128 && (i &= -129, r = -1), n = ((i & 240) >> 4) + 5;
        const s = (1 << n | (i & 15) << n - 4 | 1 << n - 5) - 33;
        return r === 0 ? s : -s;
    }, Ml = (t)=>{
        let r = 2048, n = 0, i = 11, s = 0, a = t;
        for(a < 0 && (a = -a, n = 128), a > 4095 && (a = 4095); (a & r) !== r && i >= 5;)r >>= 1, i--;
        return s = a >> (i === 4 ? 1 : i - 4) & 15, (n | i - 4 << 4 | s) ^ 85;
    }, Dl = (t)=>{
        let e = 0, r = 0, n = t ^ 85;
        n & 128 && (n &= -129, e = -1), r = ((n & 240) >> 4) + 4;
        let i = 0;
        return r !== 4 ? i = 1 << r | (n & 15) << r - 4 | 1 << r - 5 : i = n << 1 | 1, e === 0 ? i : -i;
    };
    const vt = (t)=>{
        if (!t || typeof t != "object") throw new TypeError("options must be an object.");
        if (t.metadataOnly !== void 0 && typeof t.metadataOnly != "boolean") throw new TypeError("options.metadataOnly, when defined, must be a boolean.");
        if (t.verifyKeyPackets !== void 0 && typeof t.verifyKeyPackets != "boolean") throw new TypeError("options.verifyKeyPackets, when defined, must be a boolean.");
        if (t.verifyKeyPackets && t.metadataOnly) throw new TypeError("options.verifyKeyPackets and options.metadataOnly cannot be enabled together.");
        if (t.skipLiveWait !== void 0 && typeof t.skipLiveWait != "boolean") throw new TypeError("options.skipLiveWait, when defined, must be a boolean.");
    }, ot = (t)=>{
        if (!vi(t)) throw new TypeError("timestamp must be a number.");
    }, Gn = (t, e, r)=>r.verifyKeyPackets ? e.then(async (n)=>{
            if (!n || n.type === "delta") return n;
            const i = await t.determinePacketType(n);
            return i && (n.type = i), n;
        }) : e;
    class ji {
        constructor(e){
            if (!(e instanceof Wr)) throw new TypeError("track must be an InputTrack.");
            this._track = e;
        }
        async getFirstPacket(e = {}) {
            if (vt(e), this._track.input._disposed) throw new Ie;
            return Gn(this._track, this._track._backing.getFirstPacket(e), e);
        }
        async getFirstKeyPacket(e = {}) {
            vt(e);
            const r = await this.getFirstPacket(e);
            return r ? r.type === "key" ? r : this.getNextKeyPacket(r, e) : null;
        }
        async getPacket(e, r = {}) {
            if (ot(e), vt(r), this._track.input._disposed) throw new Ie;
            return Gn(this._track, this._track._backing.getPacket(e, r), r);
        }
        async getNextPacket(e, r = {}) {
            if (!(e instanceof te)) throw new TypeError("packet must be an EncodedPacket.");
            if (vt(r), this._track.input._disposed) throw new Ie;
            return Gn(this._track, this._track._backing.getNextPacket(e, r), r);
        }
        async getKeyPacket(e, r = {}) {
            if (ot(e), vt(r), this._track.input._disposed) throw new Ie;
            if (!r.verifyKeyPackets) return this._track._backing.getKeyPacket(e, r);
            const n = await this._track._backing.getKeyPacket(e, r);
            return n && (p(n.type === "key"), await this._track.determinePacketType(n) === "delta" ? this.getKeyPacket(n.timestamp - 1 / await this._track.getTimeResolution(), r) : n);
        }
        async getNextKeyPacket(e, r = {}) {
            if (!(e instanceof te)) throw new TypeError("packet must be an EncodedPacket.");
            if (vt(r), this._track.input._disposed) throw new Ie;
            if (!r.verifyKeyPackets) return this._track._backing.getNextKeyPacket(e, r);
            const n = await this._track._backing.getNextKeyPacket(e, r);
            return n && (p(n.type === "key"), await this._track.determinePacketType(n) === "delta" ? this.getNextKeyPacket(n, r) : n);
        }
        packets(e, r, n = {}) {
            if (e !== void 0 && !(e instanceof te)) throw new TypeError("startPacket must be an EncodedPacket.");
            if (e !== void 0 && e.isMetadataOnly && !n?.metadataOnly) throw new TypeError("startPacket can only be metadata-only if options.metadataOnly is enabled.");
            if (r !== void 0 && !(r instanceof te)) throw new TypeError("endPacket must be an EncodedPacket.");
            if (vt(n), this._track.input._disposed) throw new Ie;
            const i = [];
            let { promise: s, resolve: a } = le(), { promise: o, resolve: c } = le(), u = !1, l = !1, d = null;
            const f = [], h = ()=>Math.max(2, f.length);
            (async ()=>{
                let m = e ?? await this.getFirstPacket(n);
                for(; m && !l && !this._track.input._disposed && !(r && m.sequenceNumber >= r?.sequenceNumber);){
                    if (i.length > h()) {
                        ({ promise: o, resolve: c } = le()), await o;
                        continue;
                    }
                    i.push(m), a(), { promise: s, resolve: a } = le(), m = await this.getNextPacket(m, n);
                }
                u = !0, a();
            })().catch((m)=>{
                d || (d = m, a());
            });
            const g = this._track;
            return {
                async next () {
                    for(;;){
                        if (g.input._disposed) throw new Ie;
                        if (l) return {
                            value: void 0,
                            done: !0
                        };
                        if (d) throw d;
                        if (i.length > 0) {
                            const m = i.shift(), b = performance.now();
                            for(f.push(b); f.length > 0 && b - f[0] >= 1e3;)f.shift();
                            return c(), {
                                value: m,
                                done: !1
                            };
                        } else {
                            if (u) return {
                                value: void 0,
                                done: !0
                            };
                            await s;
                        }
                    }
                },
                async return () {
                    return l = !0, c(), a(), {
                        value: void 0,
                        done: !0
                    };
                },
                async throw (m) {
                    throw m;
                },
                [Symbol.asyncIterator] () {
                    return this;
                }
            };
        }
    }
    class $i {
        constructor(e, r){
            this.onSample = e, this.onError = r;
        }
    }
    class vo {
        mediaSamplesInRange(e = -1 / 0, r = 1 / 0, n) {
            ot(e), ot(r);
            const i = [];
            let s = !1, a = null, { promise: o, resolve: c } = le(), { promise: u, resolve: l } = le(), d = !1, f = !1, h = !1, g = null;
            const m = {
                ...n,
                verifyKeyPackets: !0,
                metadataOnly: !1
            };
            (async ()=>{
                const w = await this._createDecoder((P)=>{
                    if (l(), P.timestamp >= r && (f = !0), f) {
                        P.close();
                        return;
                    }
                    a && (P.timestamp > e ? (i.push(a), s = !0) : a.close()), P.timestamp >= e && (i.push(P), s = !0), a = s ? null : P, i.length > 0 && (c(), { promise: o, resolve: c } = le());
                }, (P)=>{
                    g || (g = P, c());
                }), y = this._createPacketSink(), T = await y.getKeyPacket(e, m) ?? await y.getFirstKeyPacket(m);
                let S = T;
                const I = y.packets(T ?? void 0, void 0, m);
                for(await I.next(); S && !f && !this._track.input._disposed;){
                    const P = ra(i.length);
                    if (i.length + w.getDecodeQueueSize() > P) {
                        ({ promise: u, resolve: l } = le()), await u;
                        continue;
                    }
                    w.decode(S);
                    const x = await I.next();
                    if (x.done) break;
                    S = x.value;
                }
                await I.return(), !h && !this._track.input._disposed && await w.flush(), w.close(), !s && a && i.push(a), d = !0, c();
            })().catch((w)=>{
                g || (g = w, c());
            });
            const b = this._track, _ = ()=>{
                a?.close();
                for (const w of i)w.close();
            };
            return {
                async next () {
                    for(;;){
                        if (b.input._disposed) throw _(), new Ie;
                        if (h) return {
                            value: void 0,
                            done: !0
                        };
                        if (g) throw _(), g;
                        if (i.length > 0) {
                            const w = i.shift();
                            return l(), {
                                value: w,
                                done: !1
                            };
                        } else if (!d) await o;
                        else return {
                            value: void 0,
                            done: !0
                        };
                    }
                },
                async return () {
                    return h = !0, f = !0, l(), c(), _(), {
                        value: void 0,
                        done: !0
                    };
                },
                async throw (w) {
                    throw w;
                },
                [Symbol.asyncIterator] () {
                    return this;
                }
            };
        }
        mediaSamplesAtTimestamps(e, r) {
            ec(e);
            const n = Jo(e), i = [], s = [];
            let { promise: a, resolve: o } = le(), { promise: c, resolve: u } = le(), l = !1, d = !1, f = null;
            const h = (_)=>{
                s.push(_), o(), { promise: a, resolve: o } = le();
            }, g = {
                ...r,
                verifyKeyPackets: !0,
                metadataOnly: !1
            };
            (async ()=>{
                const _ = await this._createDecoder((P)=>{
                    if (u(), d) {
                        P.close();
                        return;
                    }
                    let x = 0;
                    for(; i.length > 0 && P.timestamp - i[0] > -1e-10;)x++, i.shift();
                    if (x > 0) for(let v = 0; v < x; v++)h(v < x - 1 ? P.clone() : P);
                    else P.close();
                }, (P)=>{
                    f || (f = P, o());
                }), w = this._createPacketSink();
                let y = null, T = null, S = -1;
                const C = async ()=>{
                    p(T);
                    let P = T;
                    for(_.decode(P); P.sequenceNumber < S;){
                        const x = ra(s.length);
                        for(; s.length + _.getDecodeQueueSize() > x && !d;)({ promise: c, resolve: u } = le()), await c;
                        if (d) break;
                        const v = await w.getNextPacket(P, g);
                        p(v), _.decode(v), P = v;
                    }
                    S = -1;
                }, I = async ()=>{
                    await _.flush();
                    for(let P = 0; P < i.length; P++)h(null);
                    i.length = 0;
                };
                for await (const P of n){
                    if (ot(P), d || this._track.input._disposed) break;
                    const x = await w.getPacket(P, g), v = x && await w.getKeyPacket(P, g);
                    if (!v) {
                        S !== -1 && (await C(), await I()), h(null), y = null;
                        continue;
                    }
                    y && (v.sequenceNumber !== T.sequenceNumber || x.timestamp < y.timestamp) && (await C(), await I()), i.push(x.timestamp), S = Math.max(x.sequenceNumber, S), y = x, T = v;
                }
                !d && !this._track.input._disposed && (S !== -1 && await C(), await I()), _.close(), l = !0, o();
            })().catch((_)=>{
                f || (f = _, o());
            });
            const m = this._track, b = ()=>{
                for (const _ of s)_?.close();
            };
            return {
                async next () {
                    for(;;){
                        if (m.input._disposed) throw b(), new Ie;
                        if (d) return {
                            value: void 0,
                            done: !0
                        };
                        if (f) throw b(), f;
                        if (s.length > 0) {
                            const _ = s.shift();
                            return p(_ !== void 0), u(), {
                                value: _,
                                done: !1
                            };
                        } else if (!l) await a;
                        else return {
                            value: void 0,
                            done: !0
                        };
                    }
                },
                async return () {
                    return d = !0, u(), o(), b(), {
                        value: void 0,
                        done: !0
                    };
                },
                async throw (_) {
                    throw _;
                },
                [Symbol.asyncIterator] () {
                    return this;
                }
            };
        }
    }
    const ra = (t)=>t === 0 ? 40 : 8;
    class Ol extends $i {
        constructor(e, r, n, i, s, a){
            super(e, r), this.codec = n, this.decoderConfig = i, this.rotation = s, this.timeResolution = a, this.decoder = null, this.customDecoder = null, this.customDecoderCallSerializer = new Fr, this.customDecoderQueueSize = 0, this.inputTimestamps = [], this.sampleQueue = [], this.currentPacketIndex = 0, this.raslSkipped = !1, this.alphaDecoder = null, this.alphaHadKeyframe = !1, this.colorQueue = [], this.alphaQueue = [], this.merger = null, this.decodedAlphaChunkCount = 0, this.alphaDecoderQueueSize = 0, this.nullAlphaFrameQueue = [], this.currentAlphaPacketIndex = 0, this.alphaRaslSkipped = !1, this.frameHandlerSerializer = new Fr;
            const o = Co.find((c)=>c.supports(n, i));
            if (o) this.customDecoder = new o, this.customDecoder.codec = n, this.customDecoder.config = i, this.customDecoder.onSample = (c)=>{
                if (!(c instanceof we)) throw new TypeError("The argument passed to onSample must be a VideoSample.");
                this.finalizeAndEmitSample(c);
            }, this.customDecoderCallSerializer.call(()=>this.customDecoder.init());
            else {
                const c = (l)=>{
                    this.frameHandlerSerializer.call(async ()=>{
                        if (this.alphaQueue.length > 0) {
                            const d = this.alphaQueue.shift();
                            p(d !== void 0), await this.mergeAlpha(l, d);
                        } else this.colorQueue.push(l);
                    }).catch((d)=>this.onError(d));
                };
                if (n === "avc" && this.decoderConfig.description && si()) {
                    const l = Ec(he(this.decoderConfig.description));
                    if (l && l.sequenceParameterSets.length > 0) {
                        const d = Ni(l.sequenceParameterSets[0]);
                        d && d.frameMbsOnlyFlag === 0 && (this.decoderConfig = {
                            ...this.decoderConfig,
                            hardwareAcceleration: "prefer-software"
                        });
                    }
                }
                const u = new Error("Decoding error").stack;
                this.decoder = new VideoDecoder({
                    output: (l)=>{
                        try {
                            c(l);
                        } catch (d) {
                            this.onError(d);
                        }
                    },
                    error: (l)=>{
                        l.stack = u, this.onError(l);
                    }
                }), this.decoder.configure(this.decoderConfig);
            }
        }
        getDecodeQueueSize() {
            return this.customDecoder ? this.customDecoderQueueSize : (p(this.decoder), Math.max(this.decoder.decodeQueueSize, this.alphaDecoder?.decodeQueueSize ?? 0));
        }
        decode(e) {
            if (this.codec === "hevc" && this.currentPacketIndex > 0 && !this.raslSkipped) {
                if (this.hasHevcRaslPicture(e.data)) return;
                this.raslSkipped = !0;
            }
            if (this.customDecoder) this.customDecoderQueueSize++, this.customDecoderCallSerializer.call(()=>this.customDecoder.decode(e)).then(()=>this.customDecoderQueueSize--);
            else {
                if (p(this.decoder), Pr() || ds(this.inputTimestamps, e.timestamp, (r)=>r), si() && this.currentPacketIndex === 0) {
                    if (this.codec === "avc") {
                        const r = [];
                        for (const i of Da(e.data, this.decoderConfig)){
                            const s = Tn(e.data[i.offset]);
                            s >= 20 && s <= 31 || r.push(e.data.subarray(i.offset, i.offset + i.length));
                        }
                        const n = Ic(r, this.decoderConfig);
                        e = new te(n, e.type, e.timestamp, e.duration);
                    } else if (this.codec === "hevc") {
                        const r = Nc(e.data, this.decoderConfig);
                        r && (e = new te(r, e.type, e.timestamp, e.duration));
                    }
                }
                this.decoder.decode(e.toEncodedVideoChunk()), this.decodeAlphaData(e);
            }
            this.currentPacketIndex++;
        }
        decodeAlphaData(e) {
            if (!e.sideData.alpha) {
                this.pushNullAlphaFrame();
                return;
            }
            if (this.merger || (this.merger = new In), !this.alphaDecoder) {
                const n = (s)=>{
                    this.frameHandlerSerializer.call(async ()=>{
                        if (this.colorQueue.length > 0) {
                            const a = this.colorQueue.shift();
                            p(a !== void 0), await this.mergeAlpha(a, s);
                        } else this.alphaQueue.push(s);
                        for(this.decodedAlphaChunkCount++; this.nullAlphaFrameQueue.length > 0 && this.nullAlphaFrameQueue[0] === this.decodedAlphaChunkCount;)if (this.nullAlphaFrameQueue.shift(), this.colorQueue.length > 0) {
                            const a = this.colorQueue.shift();
                            p(a !== void 0), await this.mergeAlpha(a, null);
                        } else this.alphaQueue.push(null);
                        this.alphaDecoderQueueSize--;
                    }).catch((a)=>this.onError(a));
                }, i = new Error("Decoding error").stack;
                this.alphaDecoder = new VideoDecoder({
                    output: (s)=>{
                        try {
                            n(s);
                        } catch (a) {
                            this.onError(a);
                        }
                    },
                    error: (s)=>{
                        s.stack = i, this.onError(s);
                    }
                }), this.alphaDecoder.configure(this.decoderConfig);
            }
            const r = Wi(this.codec, this.decoderConfig, e.sideData.alpha);
            if (this.alphaHadKeyframe || (this.alphaHadKeyframe = r === "key"), this.alphaHadKeyframe) {
                if (this.codec === "hevc" && this.currentAlphaPacketIndex > 0 && !this.alphaRaslSkipped) {
                    if (this.hasHevcRaslPicture(e.sideData.alpha)) {
                        this.pushNullAlphaFrame();
                        return;
                    }
                    this.alphaRaslSkipped = !0;
                }
                this.currentAlphaPacketIndex++, this.alphaDecoder.decode(e.alphaToEncodedVideoChunk(r ?? e.type)), this.alphaDecoderQueueSize++;
            } else this.pushNullAlphaFrame();
        }
        pushNullAlphaFrame() {
            this.alphaDecoderQueueSize === 0 ? this.alphaQueue.push(null) : this.nullAlphaFrameQueue.push(this.decodedAlphaChunkCount + this.alphaDecoderQueueSize);
        }
        hasHevcRaslPicture(e) {
            for (const r of dn(e, this.decoderConfig)){
                const n = ur(e[r.offset]);
                if (n === _e.RASL_N || n === _e.RASL_R) return !0;
            }
            return !1;
        }
        sampleHandler(e) {
            if (Pr()) {
                if (this.sampleQueue.length > 0 && e.timestamp >= ie(this.sampleQueue).timestamp) {
                    for (const r of this.sampleQueue)this.finalizeAndEmitSample(r);
                    this.sampleQueue.length = 0;
                }
                ds(this.sampleQueue, e, (r)=>r.timestamp);
            } else {
                const r = this.inputTimestamps.shift();
                p(r !== void 0), e.setTimestamp(r), this.finalizeAndEmitSample(e);
            }
        }
        finalizeAndEmitSample(e) {
            e.setTimestamp(Math.round(e.timestamp * this.timeResolution) / this.timeResolution), e.setDuration(Math.round(e.duration * this.timeResolution) / this.timeResolution), e.setRotation(this.rotation), this.onSample(e);
        }
        async mergeAlpha(e, r) {
            if (!r) {
                const s = new we(e);
                this.sampleHandler(s);
                return;
            }
            p(this.merger);
            const n = await this.merger.update(e, r), i = new we(n);
            this.sampleHandler(i);
        }
        async flush() {
            if (this.customDecoder ? await this.customDecoderCallSerializer.call(()=>this.customDecoder.flush()) : (p(this.decoder), await Promise.all([
                this.decoder.flush(),
                this.alphaDecoder?.flush()
            ]), await this.frameHandlerSerializer.currentPromise, this.colorQueue.forEach((e)=>e.close()), this.colorQueue.length = 0, this.alphaQueue.forEach((e)=>e?.close()), this.alphaQueue.length = 0, this.alphaHadKeyframe = !1, this.decodedAlphaChunkCount = 0, this.alphaDecoderQueueSize = 0, this.nullAlphaFrameQueue.length = 0, this.currentAlphaPacketIndex = 0, this.alphaRaslSkipped = !1), Pr()) {
                for (const e of this.sampleQueue)this.finalizeAndEmitSample(e);
                this.sampleQueue.length = 0;
            }
            this.currentPacketIndex = 0, this.raslSkipped = !1;
        }
        close() {
            this.customDecoder ? this.customDecoderCallSerializer.call(()=>this.customDecoder.close()) : (p(this.decoder), this.decoder.close(), this.alphaDecoder?.close(), this.colorQueue.forEach((e)=>e.close()), this.colorQueue.length = 0, this.alphaQueue.forEach((e)=>e?.close()), this.alphaQueue.length = 0, this.merger?.close());
            for (const e of this.sampleQueue)e.close();
            this.sampleQueue.length = 0;
        }
    }
    let na = !1;
    class In {
        constructor(){
            this.canvas = null, this.gl = null, this.program = null, this.vao = null, this.colorTexture = null, this.alphaTexture = null, this.worker = null, this.pendingRequests = new Map, this.nextRequestId = 0;
            const e = typeof OffscreenCanvas < "u" || typeof document < "u" && typeof document.createElement == "function";
            if (!In.forceCpu && e && !na) try {
                typeof OffscreenCanvas < "u" ? this.canvas = new OffscreenCanvas(300, 150) : this.canvas = document.createElement("canvas");
                const r = this.canvas.getContext("webgl2", {
                    premultipliedAlpha: !1
                });
                if (!r) throw new Error("Couldn't acquire WebGL 2 context.");
                this.gl = r, this.program = this.createProgram(), this.vao = this.createVAO(), this.colorTexture = this.createTexture(), this.alphaTexture = this.createTexture(), this.gl.useProgram(this.program), this.gl.uniform1i(this.gl.getUniformLocation(this.program, "u_colorTexture"), 0), this.gl.uniform1i(this.gl.getUniformLocation(this.program, "u_alphaTexture"), 1);
            } catch (r) {
                this.gl = null, this.canvas = null, na = !0, console.warn("Falling back to CPU for color/alpha merging.", r);
            }
        }
        async update(e, r) {
            return this.gl ? this.updateGpu(e, r) : this.updateCpu(e, r);
        }
        createProgram() {
            p(this.gl);
            const e = this.createShader(this.gl.VERTEX_SHADER, `#version 300 es
			in vec2 a_position;
			in vec2 a_texCoord;
			out vec2 v_texCoord;
			
			void main() {
				gl_Position = vec4(a_position, 0.0, 1.0);
				v_texCoord = a_texCoord;
			}
		`), r = this.createShader(this.gl.FRAGMENT_SHADER, `#version 300 es
			precision highp float;
			
			uniform sampler2D u_colorTexture;
			uniform sampler2D u_alphaTexture;
			in vec2 v_texCoord;
			out vec4 fragColor;
			
			void main() {
				vec3 color = texture(u_colorTexture, v_texCoord).rgb;
				float alpha = texture(u_alphaTexture, v_texCoord).r;
				fragColor = vec4(color, alpha);
			}
		`), n = this.gl.createProgram();
            return this.gl.attachShader(n, e), this.gl.attachShader(n, r), this.gl.linkProgram(n), n;
        }
        createShader(e, r) {
            p(this.gl);
            const n = this.gl.createShader(e);
            return this.gl.shaderSource(n, r), this.gl.compileShader(n), n;
        }
        createVAO() {
            p(this.gl), p(this.program);
            const e = this.gl.createVertexArray();
            this.gl.bindVertexArray(e);
            const r = new Float32Array([
                -1,
                -1,
                0,
                1,
                1,
                -1,
                1,
                1,
                -1,
                1,
                0,
                0,
                1,
                1,
                1,
                0
            ]), n = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, n), this.gl.bufferData(this.gl.ARRAY_BUFFER, r, this.gl.STATIC_DRAW);
            const i = this.gl.getAttribLocation(this.program, "a_position"), s = this.gl.getAttribLocation(this.program, "a_texCoord");
            return this.gl.enableVertexAttribArray(i), this.gl.vertexAttribPointer(i, 2, this.gl.FLOAT, !1, 16, 0), this.gl.enableVertexAttribArray(s), this.gl.vertexAttribPointer(s, 2, this.gl.FLOAT, !1, 16, 8), e;
        }
        createTexture() {
            p(this.gl);
            const e = this.gl.createTexture();
            return this.gl.bindTexture(this.gl.TEXTURE_2D, e), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR), e;
        }
        updateGpu(e, r) {
            p(this.gl), p(this.canvas), (e.displayWidth !== this.canvas.width || e.displayHeight !== this.canvas.height) && (this.canvas.width = e.displayWidth, this.canvas.height = e.displayHeight), this.gl.activeTexture(this.gl.TEXTURE0), this.gl.bindTexture(this.gl.TEXTURE_2D, this.colorTexture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, e), this.gl.activeTexture(this.gl.TEXTURE1), this.gl.bindTexture(this.gl.TEXTURE_2D, this.alphaTexture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, r), this.gl.viewport(0, 0, this.canvas.width, this.canvas.height), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.gl.bindVertexArray(this.vao), this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            const n = new VideoFrame(this.canvas, {
                timestamp: e.timestamp,
                duration: e.duration ?? void 0
            });
            return e.close(), r.close(), n;
        }
        updateCpu(e, r) {
            if (!this.worker) {
                const s = new Blob([
                    `(${zl.toString()})()`
                ], {
                    type: "application/javascript"
                }), a = URL.createObjectURL(s);
                this.worker = new Worker(a), URL.revokeObjectURL(a), this.worker.addEventListener("message", (o)=>{
                    const c = o.data, u = this.pendingRequests.get(c.id);
                    u && (this.pendingRequests.delete(c.id), "error" in c ? u.reject(new Error(c.error)) : u.resolve(c.frame));
                }), this.worker.addEventListener("error", (o)=>{
                    const c = new Error(o.message || "Color/alpha merge worker error.");
                    for (const u of this.pendingRequests.values())u.reject(c);
                    this.pendingRequests.clear();
                });
            }
            const n = this.nextRequestId++, i = le();
            return this.pendingRequests.set(n, i), this.worker.postMessage({
                id: n,
                color: e,
                alpha: r
            }, {
                transfer: [
                    e,
                    r
                ]
            }), i.promise;
        }
        close() {
            this.gl?.getExtension("WEBGL_lose_context")?.loseContext(), this.gl = null, this.canvas = null, this.worker?.terminate(), this.worker = null;
            const e = new Error("Color/alpha merger closed.");
            for (const r of this.pendingRequests.values())r.reject(e);
            this.pendingRequests.clear();
        }
    }
    In.forceCpu = !0;
    const zl = ()=>{
        let t = null, e = null, r = Promise.resolve();
        self.addEventListener("message", (c)=>{
            const { id: u, color: l, alpha: d } = c.data;
            r = r.then(async ()=>{
                try {
                    const f = await n(l, d);
                    self.postMessage({
                        id: u,
                        frame: f
                    }, {
                        transfer: [
                            f
                        ]
                    });
                } catch (f) {
                    self.postMessage({
                        id: u,
                        error: f.message
                    });
                } finally{
                    l.close(), d.close();
                }
            });
        });
        const n = async (c, u)=>{
            const l = c.format, d = u.format;
            if (!l || !d) throw new Error("CPU color/alpha merging requires a known VideoFrame format.");
            const f = l.includes("P10"), h = l.includes("P12"), g = d.includes("P10"), m = d.includes("P12");
            if (g !== f || m !== h) throw new Error(`CPU color/alpha merging requires the alpha frame to have the same bit depth as the color frame (color: '${l}', alpha: '${d}').`);
            const b = c.codedWidth, _ = c.codedHeight;
            if (l === "RGBX" || l === "RGBA" || l === "BGRX" || l === "BGRA") return await i(c, u, b, _, l);
            if (l === "I420" || l === "I420P10" || l === "I420P12" || l === "I422" || l === "I422P10" || l === "I422P12" || l === "I444" || l === "I444P10" || l === "I444P12") return await s(c, u, b, _, l);
            if (l === "NV12") return await a(c, u, b, _);
            throw new Error(`CPU color/alpha merging does not support format '${l}'.`);
        }, i = async (c, u, l, d, f)=>{
            const h = l * d, g = new Uint8Array(h * 4);
            await c.copyTo(g);
            const m = await o(u, l, d, 1);
            for(let w = 0, y = 3; w < h; w++, y += 4)g[y] = m[w];
            const _ = {
                format: f === "RGBX" || f === "RGBA" ? "RGBA" : "BGRA",
                codedWidth: l,
                codedHeight: d,
                timestamp: c.timestamp,
                duration: c.duration ?? void 0,
                transfer: [
                    g.buffer
                ]
            };
            return new VideoFrame(g, _);
        }, s = async (c, u, l, d, f)=>{
            const h = f.includes("P10"), g = f.includes("P12"), m = h || g ? 2 : 1;
            let b, _;
            f.startsWith("I420") ? (b = Math.ceil(l / 2), _ = Math.ceil(d / 2)) : f.startsWith("I422") ? (b = Math.ceil(l / 2), _ = d) : (b = l, _ = d);
            const w = l * d, y = b * _, T = w * m, S = y * m, C = w * m, I = T + 2 * S + C, P = new Uint8Array(I);
            await c.copyTo(P);
            const x = await o(u, l, d, m), v = T + 2 * S;
            P.set(x, v);
            const B = {
                format: f.slice(0, 4) + "A" + f.slice(4),
                codedWidth: l,
                codedHeight: d,
                timestamp: c.timestamp,
                duration: c.duration ?? void 0,
                transfer: [
                    P.buffer
                ]
            };
            return new VideoFrame(P, B);
        }, a = async (c, u, l, d)=>{
            const f = l * d, h = Math.ceil(l / 2), g = Math.ceil(d / 2), m = h * g, b = c.allocationSize();
            (!e || e.byteLength !== b) && (e = new Uint8Array(b)), await c.copyTo(e);
            const _ = new Uint8Array(f + 2 * m + f);
            _.set(e.subarray(0, f), 0);
            const w = f, y = f + m, T = f;
            for(let I = 0; I < m; I++)_[w + I] = e[T + I * 2], _[y + I] = e[T + I * 2 + 1];
            const S = await o(u, l, d, 1);
            _.set(S, f + 2 * m);
            const C = {
                format: "I420A",
                codedWidth: l,
                codedHeight: d,
                timestamp: c.timestamp,
                duration: c.duration ?? void 0,
                transfer: [
                    _.buffer
                ]
            };
            return new VideoFrame(_, C);
        }, o = async (c, u, l, d)=>{
            const f = c.allocationSize();
            (!t || t.byteLength !== f) && (t = new Uint8Array(f)), await c.copyTo(t);
            const h = c.format;
            if (h === "RGBA" || h === "BGRA" || h === "RGBX" || h === "BGRX") {
                const g = h === "RGBA" || h === "RGBX" ? 0 : 2, m = u * l;
                for(let b = 0; b < m; b++)t[b] = t[b * 4 + g];
                return t.subarray(0, m);
            } else return t.subarray(0, u * l * d);
        };
    };
    Nl = class extends vo {
        constructor(e){
            if (!(e instanceof vn)) throw new TypeError("videoTrack must be an InputVideoTrack.");
            super(), this._track = e;
        }
        async _createDecoder(e, r) {
            if (!await this._track.canDecode()) throw new Error("This video track cannot be decoded by this browser. Make sure to check decodability before using a track.");
            const n = await this._track.getCodec(), i = await this._track.getRotation(), s = await this._track.getDecoderConfig(), a = await this._track.getTimeResolution();
            return p(n && s), new Ol(e, r, n, s, i, a);
        }
        _createPacketSink() {
            return new ji(this._track);
        }
        async getSample(e, r = {}) {
            ot(e);
            for await (const n of this.mediaSamplesAtTimestamps([
                e
            ], r))return n;
            throw new Error("Internal error: Iterator returned nothing.");
        }
        samples(e, r, n = {}) {
            return this.mediaSamplesInRange(e, r, n);
        }
        samplesAtTimestamps(e, r = {}) {
            return this.mediaSamplesAtTimestamps(e, r);
        }
    };
    gS = class {
        constructor(e, r = {}){
            if (this._rotation = 0, this._initPromise = null, this._nextCanvasIndex = 0, !(e instanceof vn)) throw new TypeError("videoTrack must be an InputVideoTrack.");
            if (r && typeof r != "object") throw new TypeError("options must be an object.");
            if (r.alpha !== void 0 && typeof r.alpha != "boolean") throw new TypeError("options.alpha, when provided, must be a boolean.");
            if (r.width !== void 0 && (!Number.isInteger(r.width) || r.width <= 0)) throw new TypeError("options.width, when defined, must be a positive integer.");
            if (r.height !== void 0 && (!Number.isInteger(r.height) || r.height <= 0)) throw new TypeError("options.height, when defined, must be a positive integer.");
            if (r.fit !== void 0 && ![
                "fill",
                "contain",
                "cover"
            ].includes(r.fit)) throw new TypeError('options.fit, when provided, must be one of "fill", "contain", or "cover".');
            if (r.width !== void 0 && r.height !== void 0 && r.fit === void 0) throw new TypeError("When both options.width and options.height are provided, options.fit must also be provided.");
            if (r.rotation !== void 0 && ![
                0,
                90,
                180,
                270
            ].includes(r.rotation)) throw new TypeError("options.rotation, when provided, must be 0, 90, 180 or 270.");
            if (r.crop !== void 0 && mn(r.crop, "options."), r.poolSize !== void 0 && (typeof r.poolSize != "number" || !Number.isInteger(r.poolSize) || r.poolSize < 0)) throw new TypeError("poolSize must be a non-negative integer.");
            this._videoTrack = e, this._alpha = r.alpha ?? !1, this._options = r, this._fit = r.fit ?? "fill", this._videoSampleSink = new Nl(e), this._canvasPool = Array.from({
                length: r.poolSize ?? 0
            }, ()=>null);
        }
        _ensureInit() {
            return this._initPromise ??= (async ()=>{
                const e = this._options, r = this._videoTrack, n = e.rotation ?? await r.getRotation(), i = await r.getSquarePixelWidth(), s = await r.getSquarePixelHeight(), [a, o] = n % 180 === 0 ? [
                    i,
                    s
                ] : [
                    s,
                    i
                ];
                let c = e.crop;
                c && (c = _i(c, a, o));
                let [u, l] = c ? [
                    c.width,
                    c.height
                ] : [
                    a,
                    o
                ];
                const d = u / l;
                e.width !== void 0 && e.height === void 0 ? (u = e.width, l = Math.round(u / d)) : e.width === void 0 && e.height !== void 0 ? (l = e.height, u = Math.round(l * d)) : e.width !== void 0 && e.height !== void 0 && (u = e.width, l = e.height), this._width = u, this._height = l, this._rotation = n, this._crop = c;
            })();
        }
        _videoSampleToWrappedCanvas(e) {
            const r = this._width, n = this._height;
            let i = this._canvasPool[this._nextCanvasIndex], s = !1;
            i || (typeof document < "u" ? (i = document.createElement("canvas"), i.width = r, i.height = n) : i = new OffscreenCanvas(r, n), this._canvasPool.length > 0 && (this._canvasPool[this._nextCanvasIndex] = i), s = !0), this._canvasPool.length > 0 && (this._nextCanvasIndex = (this._nextCanvasIndex + 1) % this._canvasPool.length);
            const a = i.getContext("2d", {
                alpha: this._alpha || ii()
            });
            p(a), a.resetTransform(), s || (!this._alpha && ii() ? (a.fillStyle = "black", a.fillRect(0, 0, r, n)) : a.clearRect(0, 0, r, n)), e.drawWithFit(a, {
                fit: this._fit,
                rotation: this._rotation,
                crop: this._crop
            });
            const o = {
                canvas: i,
                timestamp: e.timestamp,
                duration: e.duration
            };
            return e.close(), o;
        }
        async getCanvas(e, r) {
            ot(e), await this._ensureInit();
            const n = await this._videoSampleSink.getSample(e, r);
            return n && this._videoSampleToWrappedCanvas(n);
        }
        async *canvases(e, r, n) {
            await this._ensureInit(), yield* cn(this._videoSampleSink.samples(e, r, n), (i)=>this._videoSampleToWrappedCanvas(i));
        }
        async *canvasesAtTimestamps(e, r) {
            await this._ensureInit(), yield* cn(this._videoSampleSink.samplesAtTimestamps(e, r), (n)=>n && this._videoSampleToWrappedCanvas(n));
        }
    };
    class Ul extends $i {
        constructor(e, r, n, i){
            super(e, r), this.decoder = null, this.customDecoder = null, this.customDecoderCallSerializer = new Fr, this.customDecoderQueueSize = 0, this.currentTimestamp = null, this.expectedFirstTimestamp = null, this.timestampOffset = 0;
            const s = (o)=>{
                let c = o.timestamp;
                this.expectedFirstTimestamp && this.currentTimestamp === null && (this.timestampOffset = this.expectedFirstTimestamp - c), c += this.timestampOffset, (this.currentTimestamp === null || Math.abs(c - this.currentTimestamp) >= o.duration) && (this.currentTimestamp = c);
                const u = this.currentTimestamp;
                if (this.currentTimestamp += o.duration, o.numberOfFrames === 0) {
                    o.close();
                    return;
                }
                const l = i.sampleRate;
                o.setTimestamp(Math.round(u * l) / l), e(o);
            }, a = Io.find((o)=>o.supports(n, i));
            if (a) this.customDecoder = new a, this.customDecoder.codec = n, this.customDecoder.config = i, this.customDecoder.onSample = (o)=>{
                if (!(o instanceof Te)) throw new TypeError("The argument passed to onSample must be an AudioSample.");
                s(o);
            }, this.customDecoderCallSerializer.call(()=>this.customDecoder.init());
            else {
                const o = new Error("Decoding error").stack;
                this.decoder = new AudioDecoder({
                    output: (c)=>{
                        try {
                            s(new Te(c));
                        } catch (u) {
                            this.onError(u);
                        }
                    },
                    error: (c)=>{
                        c.stack = o, this.onError(c);
                    }
                }), this.decoder.configure(i);
            }
        }
        getDecodeQueueSize() {
            return this.customDecoder ? this.customDecoderQueueSize : (p(this.decoder), this.decoder.decodeQueueSize);
        }
        decode(e) {
            this.customDecoder ? (this.customDecoderQueueSize++, this.customDecoderCallSerializer.call(()=>this.customDecoder.decode(e)).then(()=>this.customDecoderQueueSize--)) : (p(this.decoder), this.expectedFirstTimestamp ??= e.timestamp, this.decoder.decode(e.toEncodedAudioChunk()));
        }
        async flush() {
            this.customDecoder ? await this.customDecoderCallSerializer.call(()=>this.customDecoder.flush()) : (p(this.decoder), await this.decoder.flush()), this.currentTimestamp = null, this.expectedFirstTimestamp = null, this.timestampOffset = 0;
        }
        close() {
            this.customDecoder ? this.customDecoderCallSerializer.call(()=>this.customDecoder.close()) : (p(this.decoder), this.decoder.close());
        }
    }
    class Ll extends $i {
        constructor(e, r, n){
            super(e, r), this.decoderConfig = n, this.currentTimestamp = null, p(be.includes(n.codec)), this.codec = n.codec;
            const { dataType: i, sampleSize: s, littleEndian: a } = $e(this.codec);
            switch(this.inputSampleSize = s, s){
                case 1:
                    i === "unsigned" ? this.readInputValue = (o, c)=>o.getUint8(c) - 2 ** 7 : i === "signed" ? this.readInputValue = (o, c)=>o.getInt8(c) : i === "ulaw" ? this.readInputValue = (o, c)=>Rl(o.getUint8(c)) : i === "alaw" ? this.readInputValue = (o, c)=>Dl(o.getUint8(c)) : p(!1);
                    break;
                case 2:
                    i === "unsigned" ? this.readInputValue = (o, c)=>o.getUint16(c, a) - 2 ** 15 : i === "signed" ? this.readInputValue = (o, c)=>o.getInt16(c, a) : p(!1);
                    break;
                case 3:
                    i === "unsigned" ? this.readInputValue = (o, c)=>bn(o, c, a) - 2 ** 23 : i === "signed" ? this.readInputValue = (o, c)=>tc(o, c, a) : p(!1);
                    break;
                case 4:
                    i === "unsigned" ? this.readInputValue = (o, c)=>o.getUint32(c, a) - 2 ** 31 : i === "signed" ? this.readInputValue = (o, c)=>o.getInt32(c, a) : i === "float" ? this.readInputValue = (o, c)=>o.getFloat32(c, a) : p(!1);
                    break;
                case 8:
                    i === "float" ? this.readInputValue = (o, c)=>o.getFloat64(c, a) : p(!1);
                    break;
                default:
                    je(s), p(!1);
            }
            switch(s){
                case 1:
                    i === "ulaw" || i === "alaw" ? (this.outputSampleSize = 2, this.outputFormat = "s16", this.writeOutputValue = (o, c, u)=>o.setInt16(c, u, !0)) : (this.outputSampleSize = 1, this.outputFormat = "u8", this.writeOutputValue = (o, c, u)=>o.setUint8(c, u + 2 ** 7));
                    break;
                case 2:
                    this.outputSampleSize = 2, this.outputFormat = "s16", this.writeOutputValue = (o, c, u)=>o.setInt16(c, u, !0);
                    break;
                case 3:
                    this.outputSampleSize = 4, this.outputFormat = "s32", this.writeOutputValue = (o, c, u)=>o.setInt32(c, u << 8, !0);
                    break;
                case 4:
                    this.outputSampleSize = 4, i === "float" ? (this.outputFormat = "f32", this.writeOutputValue = (o, c, u)=>o.setFloat32(c, u, !0)) : (this.outputFormat = "s32", this.writeOutputValue = (o, c, u)=>o.setInt32(c, u, !0));
                    break;
                case 8:
                    this.outputSampleSize = 4, this.outputFormat = "f32", this.writeOutputValue = (o, c, u)=>o.setFloat32(c, u, !0);
                    break;
                default:
                    je(s), p(!1);
            }
        }
        getDecodeQueueSize() {
            return 0;
        }
        decode(e) {
            const r = Z(e.data), n = e.byteLength / this.decoderConfig.numberOfChannels / this.inputSampleSize, i = n * this.decoderConfig.numberOfChannels * this.outputSampleSize, s = new ArrayBuffer(i), a = new DataView(s);
            for(let l = 0; l < n * this.decoderConfig.numberOfChannels; l++){
                const d = l * this.inputSampleSize, f = l * this.outputSampleSize, h = this.readInputValue(r, d);
                this.writeOutputValue(a, f, h);
            }
            const o = n / this.decoderConfig.sampleRate;
            (this.currentTimestamp === null || Math.abs(e.timestamp - this.currentTimestamp) >= o) && (this.currentTimestamp = e.timestamp);
            const c = this.currentTimestamp;
            this.currentTimestamp += o;
            const u = new Te({
                format: this.outputFormat,
                data: s,
                numberOfChannels: this.decoderConfig.numberOfChannels,
                sampleRate: this.decoderConfig.sampleRate,
                numberOfFrames: n,
                timestamp: c
            });
            this.onSample(u);
        }
        async flush() {}
        close() {}
    }
    class Wl extends vo {
        constructor(e){
            if (!(e instanceof En)) throw new TypeError("audioTrack must be an InputAudioTrack.");
            super(), this._track = e;
        }
        async _createDecoder(e, r) {
            if (!await this._track.canDecode()) throw new Error("This audio track cannot be decoded by this browser. Make sure to check decodability before using a track.");
            const n = await this._track.getCodec(), i = await this._track.getDecoderConfig();
            return p(n && i), be.includes(i.codec) ? new Ll(e, r, i) : new Ul(e, r, n, i);
        }
        _createPacketSink() {
            return new ji(this._track);
        }
        async getSample(e, r = {}) {
            ot(e);
            for await (const n of this.mediaSamplesAtTimestamps([
                e
            ], r))return n;
            throw new Error("Internal error: Iterator returned nothing.");
        }
        samples(e, r, n = {}) {
            return this.mediaSamplesInRange(e, r, n);
        }
        samplesAtTimestamps(e, r = {}) {
            return this.mediaSamplesAtTimestamps(e, r);
        }
    }
    _S = class {
        constructor(e){
            if (!(e instanceof En)) throw new TypeError("audioTrack must be an InputAudioTrack.");
            this._audioSampleSink = new Wl(e);
        }
        _audioSampleToWrappedArrayBuffer(e) {
            const r = {
                buffer: e.toAudioBuffer(),
                timestamp: e.timestamp,
                duration: e.duration
            };
            return e.close(), r;
        }
        async getBuffer(e, r) {
            ot(e);
            const n = await this._audioSampleSink.getSample(e, r);
            return n && this._audioSampleToWrappedArrayBuffer(n);
        }
        buffers(e, r, n) {
            return cn(this._audioSampleSink.samples(e, r, n), (i)=>this._audioSampleToWrappedArrayBuffer(i));
        }
        buffersAtTimestamps(e, r) {
            return cn(this._audioSampleSink.samplesAtTimestamps(e, r), (n)=>n && this._audioSampleToWrappedArrayBuffer(n));
        }
    };
    class Wr {
        constructor(e, r){
            this.input = e, this._backing = r;
        }
        isVideoTrack() {
            return this instanceof vn;
        }
        isAudioTrack() {
            return this instanceof En;
        }
        get id() {
            return this._backing.getId();
        }
        get number() {
            return this._backing.getNumber();
        }
        async getInternalCodecId() {
            return this._backing.getInternalCodecId();
        }
        get internalCodecId() {
            return re(this._backing.getInternalCodecId(), "internalCodecId", "getInternalCodecId");
        }
        async getLanguageCode() {
            return this._backing.getLanguageCode();
        }
        get languageCode() {
            return re(this._backing.getLanguageCode(), "languageCode", "getLanguageCode");
        }
        async getName() {
            return this._backing.getName();
        }
        get name() {
            return re(this._backing.getName(), "name", "getName");
        }
        async getTimeResolution() {
            return this._backing.getTimeResolution();
        }
        get timeResolution() {
            return re(this._backing.getTimeResolution(), "timeResolution", "getTimeResolution");
        }
        async isRelativeToUnixEpoch() {
            return this._backing.isRelativeToUnixEpoch();
        }
        async getDisposition() {
            return this._backing.getDisposition();
        }
        get disposition() {
            return re(this._backing.getDisposition(), "disposition", "getDisposition");
        }
        async getBitrate() {
            return this._backing.getBitrate();
        }
        async getAverageBitrate() {
            return this._backing.getAverageBitrate();
        }
        async getFirstTimestamp() {
            return (await this._backing.getFirstPacket({
                metadataOnly: !0
            }))?.timestamp ?? 0;
        }
        async computeDuration(e) {
            const r = await this._backing.getPacket(1 / 0, {
                metadataOnly: !0,
                ...e
            }), n = (r?.timestamp ?? 0) + (r?.duration ?? 0);
            return cr(n, await this.getTimeResolution());
        }
        async getDurationFromMetadata(e = {}) {
            return this._backing.getDurationFromMetadata(e);
        }
        async computePacketStats(e = 1 / 0, r) {
            const n = new ji(this);
            let i = 1 / 0, s = -1 / 0, a = 0, o = 0;
            for await (const c of n.packets(void 0, void 0, {
                metadataOnly: !0,
                ...r
            })){
                if (a >= e && c.timestamp >= s) break;
                i = Math.min(i, c.timestamp), s = Math.max(s, c.timestamp + c.duration), a++, o += c.byteLength;
            }
            return {
                packetCount: a,
                averagePacketRate: a ? Number((a / (s - i)).toPrecision(16)) : 0,
                averageBitrate: a ? Number((8 * o / (s - i)).toPrecision(16)) : 0
            };
        }
        async isLive() {
            return await this._backing.getLiveRefreshInterval() !== null;
        }
        async getLiveRefreshInterval() {
            return this._backing.getLiveRefreshInterval();
        }
        canBePairedWith(e) {
            if (!(e instanceof Wr)) throw new TypeError("other must be an InputTrack.");
            return this.input !== e.input || this === e ? !1 : (this._backing.getPairingMask() & e._backing.getPairingMask()) !== 0n;
        }
        async getPairableTracks(e) {
            return this.input.getTracks(Bt({
                filter: (r)=>r.canBePairedWith(this)
            }, e));
        }
        async getPairableVideoTracks(e) {
            return this.input.getVideoTracks(Bt({
                filter: (r)=>r.canBePairedWith(this)
            }, e));
        }
        async getPairableAudioTracks(e) {
            return this.input.getAudioTracks(Bt({
                filter: (r)=>r.canBePairedWith(this)
            }, e));
        }
        async getPrimaryPairableVideoTrack(e) {
            return this.input.getPrimaryVideoTrack(Bt({
                filter: (r)=>r.canBePairedWith(this)
            }, e));
        }
        async getPrimaryPairableAudioTrack(e) {
            return this.input.getPrimaryAudioTrack(Bt({
                filter: (r)=>r.canBePairedWith(this)
            }, e));
        }
        async hasPairableTrack(e) {
            e &&= jn(e);
            const r = await this.input.getTracks();
            for (const n of r)if (this.canBePairedWith(n) && (!e || await e(n))) return !0;
            return !1;
        }
        hasPairableVideoTrack(e) {
            return e &&= jn(e), this.hasPairableTrack(async (r)=>r.isVideoTrack() && (!e || await e(r)));
        }
        hasPairableAudioTrack(e) {
            return e &&= jn(e), this.hasPairableTrack(async (r)=>r.isAudioTrack() && (!e || await e(r)));
        }
    }
    const re = (t, e, r)=>{
        if (t instanceof Promise) throw new Error(`'${e}' is deprecated and not available synchronously for this track. Use the preferred '${r}()' instead.`);
        return t;
    }, jn = (t)=>{
        if (t !== void 0 && typeof t != "function") throw new TypeError("predicate, when provided, must be a function.");
        return t ? (e)=>{
            const r = (i)=>{
                if (typeof i != "boolean") throw new TypeError("predicate must return or resolve to a boolean value.");
                return i;
            }, n = t(e);
            return n instanceof Promise ? n.then(r) : r(n);
        } : void 0;
    };
    class vn extends Wr {
        constructor(e, r){
            super(e, r), this._pixelAspectRatioCache = null, this._backing = r;
        }
        get type() {
            return "video";
        }
        async getCodec() {
            return this._backing.getCodec();
        }
        get codec() {
            return re(this._backing.getCodec(), "codec", "getCodec");
        }
        async hasOnlyKeyPackets() {
            return await this._backing.getHasOnlyKeyPackets?.() ?? !1;
        }
        async getCodedWidth() {
            return this._backing.getCodedWidth();
        }
        get codedWidth() {
            return re(this._backing.getCodedWidth(), "codedWidth", "getCodedWidth");
        }
        async getCodedHeight() {
            return this._backing.getCodedHeight();
        }
        get codedHeight() {
            return re(this._backing.getCodedHeight(), "codedHeight", "getCodedHeight");
        }
        async getRotation() {
            return this._backing.getRotation();
        }
        get rotation() {
            return re(this._backing.getRotation(), "rotation", "getRotation");
        }
        async getSquarePixelWidth() {
            return this._backing.getSquarePixelWidth();
        }
        get squarePixelWidth() {
            return re(this._backing.getSquarePixelWidth(), "squarePixelWidth", "getSquarePixelWidth");
        }
        async getSquarePixelHeight() {
            return this._backing.getSquarePixelHeight();
        }
        get squarePixelHeight() {
            return re(this._backing.getSquarePixelHeight(), "squarePixelHeight", "getSquarePixelHeight");
        }
        async getPixelAspectRatio() {
            return this._pixelAspectRatioCache ??= Rr({
                num: await this.getSquarePixelWidth() * await this.getCodedHeight(),
                den: await this.getSquarePixelHeight() * await this.getCodedWidth()
            });
        }
        get pixelAspectRatio() {
            return this._pixelAspectRatioCache ??= Rr({
                num: re(this._backing.getSquarePixelWidth(), "pixelAspectRatio", "getPixelAspectRatio") * re(this._backing.getCodedHeight(), "pixelAspectRatio", "getPixelAspectRatio"),
                den: re(this._backing.getSquarePixelHeight(), "pixelAspectRatio", "getPixelAspectRatio") * re(this._backing.getCodedWidth(), "pixelAspectRatio", "getPixelAspectRatio")
            });
        }
        async getDisplayWidth() {
            const e = await this._backing.getMetadataDisplayWidth?.();
            return e ?? (await this.getRotation() % 180 === 0 ? this.getSquarePixelWidth() : this.getSquarePixelHeight());
        }
        get displayWidth() {
            const e = this._backing.getMetadataDisplayWidth?.();
            if (e !== void 0) {
                const i = re(e, "displayWidth", "getDisplayWidth");
                if (i !== null) return i;
            }
            const n = re(this._backing.getRotation(), "displayWidth", "getDisplayWidth") % 180 === 0 ? this._backing.getSquarePixelWidth() : this._backing.getSquarePixelHeight();
            return re(n, "displayWidth", "getDisplayWidth");
        }
        async getDisplayHeight() {
            const e = await this._backing.getMetadataDisplayHeight?.();
            return e ?? (await this.getRotation() % 180 === 0 ? this.getSquarePixelHeight() : this.getSquarePixelWidth());
        }
        get displayHeight() {
            const e = this._backing.getMetadataDisplayHeight?.();
            if (e !== void 0) {
                const i = re(e, "displayHeight", "getDisplayHeight");
                if (i !== null) return i;
            }
            const n = re(this._backing.getRotation(), "displayHeight", "getDisplayHeight") % 180 === 0 ? this._backing.getSquarePixelHeight() : this._backing.getSquarePixelWidth();
            return re(n, "displayHeight", "getDisplayHeight");
        }
        async getColorSpace() {
            return this._backing.getColorSpace();
        }
        async hasHighDynamicRange() {
            const e = await this._backing.getColorSpace();
            return e.primaries === "bt2020" || e.primaries === "smpte432" || e.transfer === "pg" || e.transfer === "hlg" || e.matrix === "bt2020-ncl";
        }
        async canBeTransparent() {
            return this._backing.canBeTransparent();
        }
        async getDecoderConfig() {
            return this._backing.getDecoderConfig();
        }
        async getCodecParameterString() {
            const e = await this._backing.getMetadataCodecParameterString?.();
            return e ?? (await this._backing.getDecoderConfig())?.codec ?? null;
        }
        async canDecode() {
            try {
                const e = await this._backing.getDecoderConfig();
                if (!e) return !1;
                const r = await this._backing.getCodec();
                return p(r !== null), Co.some((i)=>i.supports(r, e)) ? !0 : typeof VideoDecoder > "u" ? !1 : (await VideoDecoder.isConfigSupported(e)).supported === !0;
            } catch (e) {
                return console.error("Error during decodability check:", e), !1;
            }
        }
        async determinePacketType(e) {
            if (!(e instanceof te)) throw new TypeError("packet must be an EncodedPacket.");
            if (e.isMetadataOnly) throw new TypeError("packet must not be metadata-only to determine its type.");
            const r = await this.getCodec();
            if (r === null) return null;
            const n = await this.getDecoderConfig();
            return p(n), Wi(r, n, e.data);
        }
    }
    class En extends Wr {
        constructor(e, r){
            super(e, r), this._backing = r;
        }
        get type() {
            return "audio";
        }
        async getCodec() {
            return this._backing.getCodec();
        }
        get codec() {
            return re(this._backing.getCodec(), "codec", "getCodec");
        }
        async hasOnlyKeyPackets() {
            return await this._backing.getHasOnlyKeyPackets?.() ?? !0;
        }
        async getNumberOfChannels() {
            return this._backing.getNumberOfChannels();
        }
        get numberOfChannels() {
            return re(this._backing.getNumberOfChannels(), "numberOfChannels", "getNumberOfChannels");
        }
        async getSampleRate() {
            return this._backing.getSampleRate();
        }
        get sampleRate() {
            return re(this._backing.getSampleRate(), "sampleRate", "getSampleRate");
        }
        async getDecoderConfig() {
            return this._backing.getDecoderConfig();
        }
        async getCodecParameterString() {
            const e = await this._backing.getMetadataCodecParameterString?.();
            return e ?? (await this._backing.getDecoderConfig())?.codec ?? null;
        }
        async canDecode() {
            try {
                const e = await this._backing.getDecoderConfig();
                if (!e) return !1;
                const r = await this._backing.getCodec();
                return p(r !== null), Io.some((n)=>n.supports(r, e)) || e.codec.startsWith("pcm-") ? !0 : typeof AudioDecoder > "u" ? !1 : (await AudioDecoder.isConfigSupported(e)).supported === !0;
            } catch (e) {
                return console.error("Error during decodability check:", e), !1;
            }
        }
        async determinePacketType(e) {
            if (!(e instanceof te)) throw new TypeError("packet must be an EncodedPacket.");
            return await this.getCodec() === null ? null : "key";
        }
    }
    const ia = (t)=>-(t ?? -1 / 0), br = (t)=>-t, wr = (t)=>{
        if (typeof t != "object" || !t) throw new TypeError("query must be an object.");
        if (t.filter !== void 0 && typeof t.filter != "function") throw new TypeError("query.filter, when provided, must be a function.");
        if (t.sortBy !== void 0 && typeof t.sortBy != "function") throw new TypeError("query.sortBy, when provided, must be a function.");
        return {
            filter: t.filter ? (e)=>{
                const r = (i)=>{
                    if (typeof i != "boolean") throw new TypeError("query.filter must return or resolve to a boolean.");
                    return i;
                }, n = t.filter(e);
                return n instanceof Promise ? n.then(r) : r(n);
            } : void 0,
            sortBy: t.sortBy ? (e)=>{
                const r = (i)=>{
                    if (typeof i != "number" && (!Array.isArray(i) || !i.every((s)=>typeof s == "number"))) throw new TypeError("query.sortBy must return or resolve to a number or an array of numbers.");
                    return i;
                }, n = t.sortBy(e);
                return n instanceof Promise ? n.then(r) : r(n);
            } : void 0
        };
    }, Bt = (t, e)=>({
            filter: t?.filter || e?.filter ? (r)=>{
                const n = t?.filter?.(r) ?? !0, i = (s)=>s === !1 ? !1 : e?.filter?.(r) ?? !0;
                return n instanceof Promise ? n.then(i) : i(n);
            } : void 0,
            sortBy: t?.sortBy || e?.sortBy ? (r)=>{
                const n = t?.sortBy?.(r) ?? [], i = e?.sortBy?.(r) ?? [], s = (a, o)=>[
                        ...Array.isArray(a) ? a : [
                            a
                        ],
                        ...Array.isArray(o) ? o : [
                            o
                        ]
                    ];
                return n instanceof Promise || i instanceof Promise ? Promise.all([
                    n,
                    i
                ]).then(([a, o])=>s(a, o)) : s(n, i);
            } : void 0
        }), $n = async (t, e)=>{
        let r = t;
        if (e?.filter) {
            const a = t.map((c)=>e.filter(c));
            if (a.some((c)=>c instanceof Promise)) {
                const c = await Promise.all(a);
                r = t.filter((u, l)=>c[l]);
            } else r = t.filter((c, u)=>a[u]);
        }
        if (!e?.sortBy) return r;
        const n = r.map((a)=>e.sortBy(a)), s = n.some((a)=>a instanceof Promise) ? await Promise.all(n) : n;
        return r.map((a, o)=>({
                track: a,
                sortValue: s[o]
            })).sort((a, o)=>{
            const c = Array.isArray(a.sortValue) ? a.sortValue : [
                a.sortValue
            ], u = Array.isArray(o.sortValue) ? o.sortValue : [
                o.sortValue
            ], l = Math.max(c.length, u.length);
            for(let d = 0; d < l; d++){
                const f = c[d] ?? 0, h = u[d] ?? 0;
                if (f !== h) return f - h;
            }
            return 0;
        }).map((a)=>a.track);
    };
    Ii();
    const Vl = 1, Hl = 2;
    let bi = null;
    typeof FinalizationRegistry < "u" && (bi = new FinalizationRegistry((t)=>{
        for (const e of t)e.freed || e.free();
    }));
    Ki = class extends wn {
        get disposed() {
            return this._disposed;
        }
        constructor(e){
            if (super(), this._demuxerPromise = null, this._format = null, this._trackBackingsCache = null, this._backingToTrack = new Map, this._disposed = !1, this._nextSourceCacheAge = 0, this._sourceRefs = [], this._sourceCache = [], this._sourceCachePromises = [], this._onFormatDetermined = null, !e || typeof e != "object") throw new TypeError("options must be an object.");
            if (!Array.isArray(e.formats) || e.formats.some((r)=>!(r instanceof Xe))) throw new TypeError("options.formats must be an array of InputFormat.");
            if (!(e.source instanceof Ge || e.source instanceof Gi)) throw new TypeError("options.source must be a Source or SourceRef.");
            if (e.source instanceof Ge && e.source._disposed) throw new TypeError("options.source must not be a disposed Source.");
            if (e.initInput !== void 0 && !(e.initInput instanceof Ki)) throw new TypeError("options.initInput, when provided, must be an Input.");
            e.formatOptions !== void 0 && dl(e.formatOptions, "formatOptions"), this._formats = e.formats, this._initInput = e.initInput ?? null, this._formatOptions = e.formatOptions ?? {}, e.source instanceof Ge ? this._rootRef = e.source.ref() : this._rootRef = e.source, this._sourceRefs.push(this._rootRef), bi?.register(this, this._sourceRefs, this);
        }
        get _rootSource() {
            return this._rootRef.source;
        }
        async _getSourceUncached(e) {
            p(this._rootSource instanceof Pn);
            const r = await this._rootSource._resolveRequest(e);
            return this._emit("source", {
                source: r.source,
                request: e,
                isRoot: e.isRoot
            }), r;
        }
        _getSourceCached(e, r = Vl) {
            const n = this._sourceCache.find((a)=>a.cacheGroup === r && Gs(a.request, e));
            if (n) return n.age++, Promise.resolve(n.sourceRef.source.ref());
            const i = this._sourceCachePromises.find((a)=>a.cacheGroup === r && Gs(a.request, e));
            if (i) return i.promise.then((a)=>a.sourceRef.source.ref());
            const s = (async ()=>{
                const a = await this._getSourceUncached(e);
                if (Tr(this._sourceCache, (d)=>d.cacheGroup === r && d.sourceRef.source._refCount === 1) >= 4) {
                    const d = Ei(this._sourceCache, (h)=>h.cacheGroup === r && h.sourceRef.source._refCount === 1 ? h.age : 1 / 0);
                    p(d !== -1);
                    const f = this._sourceCache[d];
                    this._sourceCache.splice(d, 1), f.sourceRef.free(), Zo(this._sourceRefs, f.sourceRef);
                }
                this._sourceRefs.push(a);
                const u = this._sourceCachePromises.findIndex((d)=>d.request === e);
                return p(u !== -1), this._sourceCachePromises.splice(u, 1), {
                    request: e,
                    sourceRef: a,
                    age: this._nextSourceCacheAge++,
                    cacheGroup: r
                };
            })();
            return this._sourceCachePromises.push({
                request: e,
                cacheGroup: r,
                promise: s
            }), s.then((a)=>{
                const o = a.sourceRef.source.ref();
                return this._sourceCache.push(a), o;
            });
        }
        _getDemuxer() {
            return this._demuxerPromise ??= (async ()=>{
                this._reader = new tn(this._rootSource), this._emit("source", {
                    source: this._rootSource,
                    request: null,
                    isRoot: !0
                });
                for (const e of this._formats)if (await e._canReadInput(this)) return this._format = e, this._onFormatDetermined?.(e), e._createDemuxer(this);
                throw new sa;
            })();
        }
        get source() {
            return this._rootSource;
        }
        async getFormat() {
            return await this._getDemuxer(), p(this._format), this._format;
        }
        async canRead() {
            try {
                return await this._getDemuxer(), !0;
            } catch (e) {
                if (e instanceof sa) return !1;
                throw e;
            }
        }
        async getFirstTimestamp(e) {
            e ??= await this.getTracks();
            const r = e.filter((i)=>i !== null);
            if (r.length === 0) return 0;
            const n = await Promise.all(r.map((i)=>i.getFirstTimestamp()));
            return Math.min(...n);
        }
        async computeDuration(e, r) {
            e ??= await this.getTracks();
            const n = e.filter((s)=>s !== null);
            if (n.length === 0) return 0;
            const i = await Promise.all(n.map((s)=>s.computeDuration(r)));
            return Math.max(...i);
        }
        async getDurationFromMetadata(e, r) {
            e ??= await this.getTracks();
            const n = e.filter((a)=>a !== null), s = (await Promise.all(n.map((a)=>a.getDurationFromMetadata(r)))).filter((a)=>a !== null);
            return s.length === 0 ? null : Math.max(...s);
        }
        async getTracks(e) {
            e &&= wr(e);
            const n = (await this._getTrackBackings()).map((i)=>this._wrapBackingAsTrack(i));
            return $n(n, e);
        }
        async getVideoTracks(e) {
            e &&= wr(e);
            const n = (await this.getTracks()).filter((i)=>i.isVideoTrack());
            return $n(n, e);
        }
        async getAudioTracks(e) {
            e &&= wr(e);
            const n = (await this.getTracks()).filter((i)=>i.isAudioTrack());
            return $n(n, e);
        }
        async getPrimaryVideoTrack(e) {
            e &&= wr(e);
            const r = Bt(e, {
                sortBy: async (i)=>[
                        br((await i.getDisposition()).default),
                        br(await i.hasPairableAudioTrack()),
                        br(!await i.hasOnlyKeyPackets()),
                        ia(await i.getBitrate())
                    ]
            });
            return (await this.getVideoTracks(r))[0] ?? null;
        }
        async getPrimaryAudioTrack(e) {
            e &&= wr(e);
            const r = await this.getPrimaryVideoTrack(), n = Bt(e, {
                sortBy: async (s)=>[
                        br(!r || s.canBePairedWith(r)),
                        br((await s.getDisposition()).default),
                        ia(await s.getBitrate())
                    ]
            });
            return (await this.getAudioTracks(n))[0] ?? null;
        }
        async _getTrackBackings() {
            const e = await this._getDemuxer();
            return this._trackBackingsCache ??= await e.getTrackBackings();
        }
        _wrapBackingAsTrack(e) {
            const r = this._backingToTrack.get(e);
            if (r) return r;
            const i = e.getType() === "video" ? new vn(this, e) : new En(this, e);
            return this._backingToTrack.set(e, i), i;
        }
        async getMimeType() {
            return (await this._getDemuxer()).getMimeType();
        }
        async getMetadataTags() {
            return (await this._getDemuxer()).getMetadataTags();
        }
        dispose() {
            if (!this._disposed) {
                this._disposed = !0;
                for (const e of this._sourceRefs)e.free();
                this._sourceRefs.length = 0, bi?.unregister(this), this._demuxerPromise?.then((e)=>e.dispose());
            }
        }
        [Symbol.dispose]() {
            this.dispose();
        }
    };
    class sa extends Error {
        constructor(e = "Input has an unsupported or unrecognizable format."){
            super(e), this.name = "UnsupportedInputFormatError";
        }
    }
    class Ie extends Error {
        constructor(e = "Input has been disposed."){
            super(e), this.name = "InputDisposedError";
        }
    }
    class tn {
        constructor(e){
            this.source = e;
        }
        get fileSize() {
            const e = this.source._getFileSize();
            if (e === void 0) throw new Error("Reading file size too early; read required first.");
            return e;
        }
        get fileSizeNonStrict() {
            return this.source._getFileSize() ?? null;
        }
        requestSlice(e, r) {
            if (this.source._disposed) throw new Ie;
            if (e < 0 || this.fileSizeNonStrict !== null && e + r > this.fileSizeNonStrict) return null;
            if (r === 0) {
                const s = new Uint8Array(0);
                return new ye(s, Z(s), 0, e, e);
            }
            const n = e + r, i = this.source._read(e, n, go, _o);
            return i instanceof Promise ? i.then((s)=>s ? new ye(s.bytes, s.view, s.offset, e, n) : null) : i ? new ye(i.bytes, i.view, i.offset, e, n) : null;
        }
        requestSliceRange(e, r, n) {
            if (this.source._disposed) throw new Ie;
            if (e < 0) return null;
            if (this.fileSizeNonStrict !== null) return this.requestSlice(e, fe(this.fileSizeNonStrict - e, r, n));
            {
                const i = this.requestSlice(e, n), s = (a)=>a || (p(this.fileSizeNonStrict !== null), this.requestSlice(e, fe(this.fileSizeNonStrict - e, r, n)));
                return i instanceof Promise ? i.then(s) : s(i);
            }
        }
        requestEntireFile() {
            if (this.fileSizeNonStrict !== null) return this.requestSlice(0, this.fileSizeNonStrict);
            const e = 1024;
            return (async ()=>{
                const r = [];
                let n = 0;
                for(;;){
                    if (r.length === 1 && this.fileSizeNonStrict !== null) return this.requestSlice(0, this.fileSizeNonStrict);
                    const a = r.length * e;
                    let o = this.requestSliceRange(a, 0, e);
                    if (o instanceof Promise && (o = await o), !o) break;
                    r.push(O(o, o.length)), n += o.length;
                }
                const i = new Uint8Array(n);
                let s = 0;
                for (const a of r)i.set(a, s), s += a.length;
                return new ye(i, Z(i), 0, 0, n);
            })();
        }
    }
    class ye {
        constructor(e, r, n, i, s){
            this.bytes = e, this.view = r, this.offset = n, this.start = i, this.end = s, this.bufferPos = i - n;
        }
        static tempFromBytes(e) {
            return new ye(e, Z(e), 0, 0, e.length);
        }
        get length() {
            return this.end - this.start;
        }
        get filePos() {
            return this.offset + this.bufferPos;
        }
        set filePos(e) {
            this.bufferPos = e - this.offset;
        }
        get remainingLength() {
            return Math.max(this.end - this.filePos, 0);
        }
        skip(e) {
            this.bufferPos += e;
        }
        slice(e, r = this.end - e) {
            if (e < this.start || e + r > this.end) throw new RangeError("Slicing outside of original slice.");
            return new ye(this.bytes, this.view, this.offset, e, e + r);
        }
    }
    const xe = (t, e)=>{
        if (t.filePos < t.start || t.filePos + e > t.end) throw new RangeError(`Tried reading [${t.filePos}, ${t.filePos + e}), but slice is [${t.start}, ${t.end}). This is likely an internal error, please report it alongside the file that caused it.`);
    }, O = (t, e)=>{
        xe(t, e);
        const r = t.bytes.subarray(t.bufferPos, t.bufferPos + e);
        return t.bufferPos += e, r;
    }, M = (t)=>(xe(t, 1), t.view.getUint8(t.bufferPos++)), yr = (t, e)=>{
        xe(t, 2);
        const r = t.view.getUint16(t.bufferPos, e);
        return t.bufferPos += 2, r;
    }, ce = (t)=>{
        xe(t, 2);
        const e = t.view.getUint16(t.bufferPos, !1);
        return t.bufferPos += 2, e;
    }, Ye = (t)=>{
        xe(t, 3);
        const e = bn(t.view, t.bufferPos, !1);
        return t.bufferPos += 3, e;
    }, wi = (t)=>{
        xe(t, 2);
        const e = t.view.getInt16(t.bufferPos, !1);
        return t.bufferPos += 2, e;
    }, yt = (t, e)=>{
        xe(t, 4);
        const r = t.view.getUint32(t.bufferPos, e);
        return t.bufferPos += 4, r;
    }, A = (t)=>{
        xe(t, 4);
        const e = t.view.getUint32(t.bufferPos, !1);
        return t.bufferPos += 4, e;
    }, er = (t)=>{
        xe(t, 4);
        const e = t.view.getUint32(t.bufferPos, !0);
        return t.bufferPos += 4, e;
    }, Mt = (t)=>{
        xe(t, 4);
        const e = t.view.getInt32(t.bufferPos, !1);
        return t.bufferPos += 4, e;
    }, ql = (t)=>{
        xe(t, 4);
        const e = t.view.getInt32(t.bufferPos, !0);
        return t.bufferPos += 4, e;
    }, aa = (t, e)=>{
        let r, n;
        return e ? (r = yt(t, !0), n = yt(t, !0)) : (n = yt(t, !1), r = yt(t, !1)), n * 4294967296 + r;
    }, Ae = (t)=>{
        const e = A(t), r = A(t);
        return e * 4294967296 + r;
    }, Gl = (t)=>{
        const e = Mt(t), r = A(t);
        return e * 4294967296 + r;
    }, jl = (t)=>{
        const e = er(t);
        return ql(t) * 4294967296 + e;
    }, $l = (t)=>{
        xe(t, 4);
        const e = t.view.getFloat32(t.bufferPos, !1);
        return t.bufferPos += 4, e;
    }, Eo = (t)=>{
        xe(t, 8);
        const e = t.view.getFloat64(t.bufferPos, !1);
        return t.bufferPos += 8, e;
    }, se = (t, e)=>{
        xe(t, e);
        let r = "";
        for(let n = 0; n < e; n++)r += String.fromCharCode(t.bytes[t.bufferPos++]);
        return r;
    }, Ao = (t, e, r)=>ve.decode(O(t, e)).split(`
`).map((s)=>s.trim()).filter((s)=>s.length > 0 && !r?.ignore?.(s));
    var tr;
    (function(t) {
        t[t.Unsynchronisation = 128] = "Unsynchronisation", t[t.ExtendedHeader = 64] = "ExtendedHeader", t[t.ExperimentalIndicator = 32] = "ExperimentalIndicator", t[t.Footer = 16] = "Footer";
    })(tr || (tr = {}));
    var rr;
    (function(t) {
        t[t.ISO_8859_1 = 0] = "ISO_8859_1", t[t.UTF_16_WITH_BOM = 1] = "UTF_16_WITH_BOM", t[t.UTF_16_BE_NO_BOM = 2] = "UTF_16_BE_NO_BOM", t[t.UTF_8 = 3] = "UTF_8";
    })(rr || (rr = {}));
    const rn = 128, lt = 10, nr = [
        "Blues",
        "Classic rock",
        "Country",
        "Dance",
        "Disco",
        "Funk",
        "Grunge",
        "Hip-hop",
        "Jazz",
        "Metal",
        "New age",
        "Oldies",
        "Other",
        "Pop",
        "Rhythm and blues",
        "Rap",
        "Reggae",
        "Rock",
        "Techno",
        "Industrial",
        "Alternative",
        "Ska",
        "Death metal",
        "Pranks",
        "Soundtrack",
        "Euro-techno",
        "Ambient",
        "Trip-hop",
        "Vocal",
        "Jazz & funk",
        "Fusion",
        "Trance",
        "Classical",
        "Instrumental",
        "Acid",
        "House",
        "Game",
        "Sound clip",
        "Gospel",
        "Noise",
        "Alternative rock",
        "Bass",
        "Soul",
        "Punk",
        "Space",
        "Meditative",
        "Instrumental pop",
        "Instrumental rock",
        "Ethnic",
        "Gothic",
        "Darkwave",
        "Techno-industrial",
        "Electronic",
        "Pop-folk",
        "Eurodance",
        "Dream",
        "Southern rock",
        "Comedy",
        "Cult",
        "Gangsta",
        "Top 40",
        "Christian rap",
        "Pop/funk",
        "Jungle music",
        "Native US",
        "Cabaret",
        "New wave",
        "Psychedelic",
        "Rave",
        "Showtunes",
        "Trailer",
        "Lo-fi",
        "Tribal",
        "Acid punk",
        "Acid jazz",
        "Polka",
        "Retro",
        "Musical",
        "Rock 'n' roll",
        "Hard rock",
        "Folk",
        "Folk rock",
        "National folk",
        "Swing",
        "Fast fusion",
        "Bebop",
        "Latin",
        "Revival",
        "Celtic",
        "Bluegrass",
        "Avantgarde",
        "Gothic rock",
        "Progressive rock",
        "Psychedelic rock",
        "Symphonic rock",
        "Slow rock",
        "Big band",
        "Chorus",
        "Easy listening",
        "Acoustic",
        "Humour",
        "Speech",
        "Chanson",
        "Opera",
        "Chamber music",
        "Sonata",
        "Symphony",
        "Booty bass",
        "Primus",
        "Porn groove",
        "Satire",
        "Slow jam",
        "Club",
        "Tango",
        "Samba",
        "Folklore",
        "Ballad",
        "Power ballad",
        "Rhythmic Soul",
        "Freestyle",
        "Duet",
        "Punk rock",
        "Drum solo",
        "A cappella",
        "Euro-house",
        "Dance hall",
        "Goa music",
        "Drum & bass",
        "Club-house",
        "Hardcore techno",
        "Terror",
        "Indie",
        "Britpop",
        "Negerpunk",
        "Polsk punk",
        "Beat",
        "Christian gangsta rap",
        "Heavy metal",
        "Black metal",
        "Crossover",
        "Contemporary Christian",
        "Christian rock",
        "Merengue",
        "Salsa",
        "Thrash metal",
        "Anime",
        "Jpop",
        "Synthpop",
        "Christmas",
        "Art rock",
        "Baroque",
        "Bhangra",
        "Big beat",
        "Breakbeat",
        "Chillout",
        "Downtempo",
        "Dub",
        "EBM",
        "Eclectic",
        "Electro",
        "Electroclash",
        "Emo",
        "Experimental",
        "Garage",
        "Global",
        "IDM",
        "Illbient",
        "Industro-Goth",
        "Jam Band",
        "Krautrock",
        "Leftfield",
        "Lounge",
        "Math rock",
        "New romantic",
        "Nu-breakz",
        "Post-punk",
        "Post-rock",
        "Psytrance",
        "Shoegaze",
        "Space rock",
        "Trop rock",
        "World music",
        "Neoclassical",
        "Audiobook",
        "Audio theatre",
        "Neue Deutsche Welle",
        "Podcast",
        "Indie rock",
        "G-Funk",
        "Dubstep",
        "Garage rock",
        "Psybient"
    ], Kl = (t, e)=>{
        const r = t.filePos;
        e.raw ??= {}, e.raw.TAG ??= O(t, rn - 3), t.filePos = r;
        const n = qt(t, 30);
        n && (e.title ??= n);
        const i = qt(t, 30);
        i && (e.artist ??= i);
        const s = qt(t, 30);
        s && (e.album ??= s);
        const a = qt(t, 4), o = Number.parseInt(a, 10);
        Number.isInteger(o) && o > 0 && (e.date ??= new Date(o, 0, 1));
        const c = O(t, 30);
        let u;
        if (c[28] === 0 && c[29] !== 0) {
            const d = c[29];
            d > 0 && (e.trackNumber ??= d), t.skip(-30), u = qt(t, 28), t.skip(2);
        } else t.skip(-30), u = qt(t, 30);
        u && (e.comment ??= u);
        const l = M(t);
        l < nr.length && (e.genre ??= nr[l]);
    }, qt = (t, e)=>{
        const r = O(t, e), n = jt(r.indexOf(0), r.length), i = r.subarray(0, n);
        let s = "";
        for(let a = 0; a < i.length; a++)s += String.fromCharCode(i[a]);
        return s.trimEnd();
    }, Nt = (t)=>{
        const e = t.filePos, r = se(t, 3), n = M(t), i = M(t), s = M(t), a = A(t);
        if (r !== "ID3" || n === 255 || i === 255 || (a & 2155905152) !== 0) return t.filePos = e, null;
        const o = ai(a);
        return {
            majorVersion: n,
            revision: i,
            flags: s,
            size: o
        };
    }, Xi = (t, e, r)=>{
        if (![
            2,
            3,
            4
        ].includes(e.majorVersion)) {
            console.warn(`Unsupported ID3v2 major version: ${e.majorVersion}`);
            return;
        }
        const n = O(t, e.size), i = new Xl(e, n);
        if (e.flags & tr.Footer && i.removeFooter(), e.flags & tr.Unsynchronisation && e.majorVersion === 3 && i.ununsynchronizeAll(), e.flags & tr.ExtendedHeader) {
            const s = i.readU32();
            e.majorVersion === 3 ? i.pos += s : i.pos += s - 4;
        }
        for(; i.pos <= i.bytes.length - i.frameHeaderSize();){
            const s = i.readId3V2Frame();
            if (!s) break;
            const a = i.pos, o = i.pos + s.size;
            let c = !1, u = !1, l = !1;
            if (e.majorVersion === 3 ? (c = !!(s.flags & 64), u = !!(s.flags & 128)) : e.majorVersion === 4 && (c = !!(s.flags & 4), u = !!(s.flags & 8), l = !!(s.flags & 2) || !!(e.flags & tr.Unsynchronisation)), c) {
                console.warn(`Skipping encrypted ID3v2 frame ${s.id}`), i.pos = o;
                continue;
            }
            if (u) {
                console.warn(`Skipping compressed ID3v2 frame ${s.id}`), i.pos = o;
                continue;
            }
            if (l && i.ununsynchronizeRegion(i.pos, o), r.raw ??= {}, s.id === "TXXX") {
                const d = r.raw.TXXX ??= {}, f = i.readId3V2TextEncoding(), h = i.readId3V2Text(f, o), g = i.readId3V2Text(f, o);
                d[h] ??= g;
            } else s.id[0] === "T" ? r.raw[s.id] ??= i.readId3V2EncodingAndText(o) : r.raw[s.id] ??= i.readBytes(s.size);
            switch(i.pos = a, s.id){
                case "TIT2":
                case "TT2":
                    r.title ??= i.readId3V2EncodingAndText(o);
                    break;
                case "TIT3":
                case "TT3":
                    r.description ??= i.readId3V2EncodingAndText(o);
                    break;
                case "TPE1":
                case "TP1":
                    r.artist ??= i.readId3V2EncodingAndText(o);
                    break;
                case "TALB":
                case "TAL":
                    r.album ??= i.readId3V2EncodingAndText(o);
                    break;
                case "TPE2":
                case "TP2":
                    r.albumArtist ??= i.readId3V2EncodingAndText(o);
                    break;
                case "TRCK":
                case "TRK":
                    {
                        const f = i.readId3V2EncodingAndText(o).split("/"), h = Number.parseInt(f[0], 10), g = f[1] && Number.parseInt(f[1], 10);
                        Number.isInteger(h) && h > 0 && (r.trackNumber ??= h), g && Number.isInteger(g) && g > 0 && (r.tracksTotal ??= g);
                    }
                    break;
                case "TPOS":
                case "TPA":
                    {
                        const f = i.readId3V2EncodingAndText(o).split("/"), h = Number.parseInt(f[0], 10), g = f[1] && Number.parseInt(f[1], 10);
                        Number.isInteger(h) && h > 0 && (r.discNumber ??= h), g && Number.isInteger(g) && g > 0 && (r.discsTotal ??= g);
                    }
                    break;
                case "TCON":
                case "TCO":
                    {
                        const d = i.readId3V2EncodingAndText(o);
                        let f = /^\((\d+)\)/.exec(d);
                        if (f) {
                            const h = Number.parseInt(f[1]);
                            if (nr[h] !== void 0) {
                                r.genre ??= nr[h];
                                break;
                            }
                        }
                        if (f = /^\d+$/.exec(d), f) {
                            const h = Number.parseInt(f[0]);
                            if (nr[h] !== void 0) {
                                r.genre ??= nr[h];
                                break;
                            }
                        }
                        r.genre ??= d;
                    }
                    break;
                case "TDRC":
                case "TDAT":
                    {
                        const d = i.readId3V2EncodingAndText(o), f = new Date(d);
                        Number.isNaN(f.getTime()) || (r.date ??= f);
                    }
                    break;
                case "TYER":
                case "TYE":
                    {
                        const d = i.readId3V2EncodingAndText(o), f = Number.parseInt(d, 10);
                        Number.isInteger(f) && (r.date ??= new Date(f, 0, 1));
                    }
                    break;
                case "USLT":
                case "ULT":
                    {
                        const d = i.readU8();
                        i.pos += 3, i.readId3V2Text(d, o), r.lyrics ??= i.readId3V2Text(d, o);
                    }
                    break;
                case "COMM":
                case "COM":
                    {
                        const d = i.readU8();
                        i.pos += 3, i.readId3V2Text(d, o), r.comment ??= i.readId3V2Text(d, o);
                    }
                    break;
                case "APIC":
                case "PIC":
                    {
                        const d = i.readId3V2TextEncoding();
                        let f;
                        if (e.majorVersion === 2) {
                            const b = i.readAscii(3);
                            f = b === "PNG" ? "image/png" : b === "JPG" ? "image/jpeg" : "image/*";
                        } else f = i.readId3V2Text(d, o);
                        const h = i.readU8(), g = i.readId3V2Text(d, o).trimEnd(), m = o - i.pos;
                        if (m >= 0) {
                            const b = i.readBytes(m);
                            r.images || (r.images = []), r.images.push({
                                data: b,
                                mimeType: f,
                                kind: h === 3 ? "coverFront" : h === 4 ? "coverBack" : "unknown",
                                description: g
                            });
                        }
                    }
                    break;
                default:
                    i.pos += s.size;
                    break;
            }
            i.pos = o;
        }
    };
    class Xl {
        constructor(e, r){
            this.header = e, this.bytes = r, this.pos = 0, this.view = new DataView(r.buffer, r.byteOffset, r.byteLength);
        }
        frameHeaderSize() {
            return this.header.majorVersion === 2 ? 6 : 10;
        }
        ununsynchronizeAll() {
            const e = [];
            for(let r = 0; r < this.bytes.length; r++){
                const n = this.bytes[r];
                e.push(n), n === 255 && r !== this.bytes.length - 1 && this.bytes[r] === 0 && r++;
            }
            this.bytes = new Uint8Array(e), this.view = new DataView(this.bytes.buffer);
        }
        ununsynchronizeRegion(e, r) {
            const n = [];
            for(let a = e; a < r; a++){
                const o = this.bytes[a];
                n.push(o), o === 255 && a !== r - 1 && this.bytes[a + 1] === 0 && a++;
            }
            const i = this.bytes.subarray(0, e), s = this.bytes.subarray(r);
            this.bytes = new Uint8Array(i.length + n.length + s.length), this.bytes.set(i, 0), this.bytes.set(n, i.length), this.bytes.set(s, i.length + n.length), this.view = new DataView(this.bytes.buffer);
        }
        removeFooter() {
            this.bytes = this.bytes.subarray(0, this.bytes.length - lt), this.view = new DataView(this.bytes.buffer);
        }
        readBytes(e) {
            const r = this.bytes.subarray(this.pos, this.pos + e);
            return this.pos += e, r;
        }
        readU8() {
            const e = this.view.getUint8(this.pos);
            return this.pos += 1, e;
        }
        readU16() {
            const e = this.view.getUint16(this.pos, !1);
            return this.pos += 2, e;
        }
        readU24() {
            const e = this.view.getUint16(this.pos, !1), r = this.view.getUint8(this.pos + 2);
            return this.pos += 3, e * 256 + r;
        }
        readU32() {
            const e = this.view.getUint32(this.pos, !1);
            return this.pos += 4, e;
        }
        readAscii(e) {
            let r = "";
            for(let n = 0; n < e; n++)r += String.fromCharCode(this.view.getUint8(this.pos + n));
            return this.pos += e, r;
        }
        readId3V2Frame() {
            if (this.header.majorVersion === 2) {
                const e = this.readAscii(3);
                if (e === "\0\0\0") return null;
                const r = this.readU24();
                return {
                    id: e,
                    size: r,
                    flags: 0
                };
            } else {
                const e = this.readAscii(4);
                if (e === "\0\0\0\0") return null;
                const r = this.readU32();
                let n = this.header.majorVersion === 4 ? ai(r) : r;
                const i = this.readU16(), s = this.pos, a = (o)=>{
                    const c = this.pos + o;
                    if (c > this.bytes.length) return !1;
                    if (c <= this.bytes.length - this.frameHeaderSize()) {
                        this.pos += o;
                        const u = this.readAscii(4);
                        if (u !== "\0\0\0\0" && !/[0-9A-Z]{4}/.test(u)) return !1;
                    }
                    return !0;
                };
                if (!a(n)) {
                    const o = this.header.majorVersion === 4 ? r : ai(r);
                    a(o) && (n = o);
                }
                return this.pos = s, {
                    id: e,
                    size: n,
                    flags: i
                };
            }
        }
        readId3V2TextEncoding() {
            const e = this.readU8();
            if (e > 3) throw new Error(`Unsupported text encoding: ${e}`);
            return e;
        }
        readId3V2Text(e, r) {
            const n = this.pos, i = this.readBytes(r - this.pos);
            switch(e){
                case rr.ISO_8859_1:
                    {
                        let s = "";
                        for(let a = 0; a < i.length; a++){
                            const o = i[a];
                            if (o === 0) {
                                this.pos = n + a + 1;
                                break;
                            }
                            s += String.fromCharCode(o);
                        }
                        return s;
                    }
                case rr.UTF_16_WITH_BOM:
                    if (i[0] === 255 && i[1] === 254) {
                        const s = new TextDecoder("utf-16le"), a = jt(i.findIndex((o, c)=>o === 0 && i[c + 1] === 0 && c % 2 === 0), i.length);
                        return this.pos = n + Math.min(a + 2, i.length), s.decode(i.subarray(2, a));
                    } else if (i[0] === 254 && i[1] === 255) {
                        const s = new TextDecoder("utf-16be"), a = jt(i.findIndex((o, c)=>o === 0 && i[c + 1] === 0 && c % 2 === 0), i.length);
                        return this.pos = n + Math.min(a + 2, i.length), s.decode(i.subarray(2, a));
                    } else {
                        const s = jt(i.findIndex((a)=>a === 0), i.length);
                        return this.pos = n + Math.min(s + 1, i.length), ve.decode(i.subarray(0, s));
                    }
                case rr.UTF_16_BE_NO_BOM:
                    {
                        const s = new TextDecoder("utf-16be"), a = jt(i.findIndex((o, c)=>o === 0 && i[c + 1] === 0 && c % 2 === 0), i.length);
                        return this.pos = n + Math.min(a + 2, i.length), s.decode(i.subarray(0, a));
                    }
                case rr.UTF_8:
                    {
                        const s = jt(i.findIndex((a)=>a === 0), i.length);
                        return this.pos = n + Math.min(s + 1, i.length), ve.decode(i.subarray(0, s));
                    }
            }
        }
        readId3V2EncodingAndText(e) {
            if (this.pos >= e) return "";
            const r = this.readId3V2TextEncoding();
            return this.readId3V2Text(r, e);
        }
    }
    class Bo {
        constructor(e){
            this.mutex = new lr, this.trackTimestampInfo = new WeakMap, this.output = e;
        }
        onTrackClose(e) {}
        validateTimestamp(e, r, n) {
            if (r < 0) throw new Error(`Timestamps must be non-negative (got ${r}s).`);
            let i = this.trackTimestampInfo.get(e);
            if (i) {
                if (n && (i.maxTimestampBeforeLastKeyPacket = i.maxTimestamp), i.maxTimestampBeforeLastKeyPacket !== null && r < i.maxTimestampBeforeLastKeyPacket) throw new Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${r}s, but largest timestamp is ${i.maxTimestampBeforeLastKeyPacket}s.`);
                i.maxTimestamp = Math.max(i.maxTimestamp, r);
            } else {
                if (!n) throw new Error("First packet must be a key packet.");
                i = {
                    maxTimestamp: r,
                    maxTimestampBeforeLastKeyPacket: null
                }, this.trackTimestampInfo.set(e, i);
            }
        }
    }
    const pn = /<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g, Ql = /(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})/, Yl = (t)=>{
        const e = Ql.exec(t);
        if (!e) throw new Error("Expected match.");
        return 3600 * 1e3 * Number(e[1] || "0") + 60 * 1e3 * Number(e[2]) + 1e3 * Number(e[3]) + Number(e[4]);
    }, Fo = (t)=>{
        const e = Math.floor(t / 36e5), r = Math.floor(t % (3600 * 1e3) / (60 * 1e3)), n = Math.floor(t % (60 * 1e3) / 1e3), i = t % 1e3;
        return e.toString().padStart(2, "0") + ":" + r.toString().padStart(2, "0") + ":" + n.toString().padStart(2, "0") + "." + i.toString().padStart(3, "0");
    };
    class Gr {
        constructor(e){
            this.writer = e, this.helper = new Uint8Array(8), this.helperView = new DataView(this.helper.buffer), this.offsets = new WeakMap;
        }
        writeU32(e) {
            this.helperView.setUint32(0, e, !1), this.writer.write(this.helper.subarray(0, 4));
        }
        writeU64(e) {
            this.helperView.setUint32(0, Math.floor(e / 2 ** 32), !1), this.helperView.setUint32(4, e, !1), this.writer.write(this.helper.subarray(0, 8));
        }
        writeAscii(e) {
            for(let r = 0; r < e.length; r++)this.helperView.setUint8(r % 8, e.charCodeAt(r)), r % 8 === 7 && this.writer.write(this.helper);
            e.length % 8 !== 0 && this.writer.write(this.helper.subarray(0, e.length % 8));
        }
        writeBox(e) {
            if (this.offsets.set(e, this.writer.getPos()), e.contents && !e.children) this.writeBoxHeader(e, e.size ?? e.contents.byteLength + 8), this.writer.write(e.contents);
            else {
                const r = this.writer.getPos();
                if (this.writeBoxHeader(e, 0), e.contents && this.writer.write(e.contents), e.children) for (const s of e.children)s && this.writeBox(s);
                const n = this.writer.getPos(), i = e.size ?? n - r;
                this.writer.seek(r), this.writeBoxHeader(e, i), this.writer.seek(n);
            }
        }
        writeBoxHeader(e, r) {
            this.writeU32(e.largeSize ? 1 : r), this.writeAscii(e.type), e.largeSize && this.writeU64(r);
        }
        measureBoxHeader(e) {
            return 8 + (e.largeSize ? 8 : 0);
        }
        patchBox(e) {
            const r = this.offsets.get(e);
            p(r !== void 0);
            const n = this.writer.getPos();
            this.writer.seek(r), this.writeBox(e), this.writer.seek(n);
        }
        measureBox(e) {
            if (e.contents && !e.children) return this.measureBoxHeader(e) + e.contents.byteLength;
            {
                let r = this.measureBoxHeader(e);
                if (e.contents && (r += e.contents.byteLength), e.children) for (const n of e.children)n && (r += this.measureBox(n));
                return r;
            }
        }
    }
    const G = new Uint8Array(8), Re = new DataView(G.buffer), ae = (t)=>[
            (t % 256 + 256) % 256
        ], U = (t)=>(Re.setUint16(0, t, !1), [
            G[0],
            G[1]
        ]), Qi = (t)=>(Re.setInt16(0, t, !1), [
            G[0],
            G[1]
        ]), Ro = (t)=>(Re.setUint32(0, t, !1), [
            G[1],
            G[2],
            G[3]
        ]), E = (t)=>(Re.setUint32(0, t, !1), [
            G[0],
            G[1],
            G[2],
            G[3]
        ]), st = (t)=>(Re.setInt32(0, t, !1), [
            G[0],
            G[1],
            G[2],
            G[3]
        ]), Ke = (t)=>(Re.setUint32(0, Math.floor(t / 2 ** 32), !1), Re.setUint32(4, t, !1), [
            G[0],
            G[1],
            G[2],
            G[3],
            G[4],
            G[5],
            G[6],
            G[7]
        ]), Zl = (t)=>(Re.setInt32(0, Math.floor(t / 2 ** 32), !1), Re.setUint32(4, t, !1), [
            G[0],
            G[1],
            G[2],
            G[3],
            G[4],
            G[5],
            G[6],
            G[7]
        ]), Mo = (t)=>(Re.setInt16(0, 2 ** 8 * t, !1), [
            G[0],
            G[1]
        ]), Oe = (t)=>(Re.setInt32(0, 2 ** 16 * t, !1), [
            G[0],
            G[1],
            G[2],
            G[3]
        ]), Kn = (t)=>(Re.setInt32(0, 2 ** 30 * t, !1), [
            G[0],
            G[1],
            G[2],
            G[3]
        ]), Xn = (t, e)=>{
        const r = [];
        let n = t;
        do {
            let i = n & 127;
            n >>= 7, r.length > 0 && (i |= 128), r.push(i);
        }while (n > 0 || e);
        return r.reverse();
    }, J = (t, e = !1)=>{
        const r = Array(t.length).fill(null).map((n, i)=>t.charCodeAt(i));
        return e && r.push(0), r;
    }, Do = (t)=>{
        const e = t * (Math.PI / 180), r = Math.round(Math.cos(e)), n = Math.round(Math.sin(e));
        return [
            r,
            n,
            0,
            -n,
            r,
            0,
            0,
            0,
            1
        ];
    }, Oo = Do(0), zo = (t)=>[
            Oe(t[0]),
            Oe(t[1]),
            Kn(t[2]),
            Oe(t[3]),
            Oe(t[4]),
            Kn(t[5]),
            Oe(t[6]),
            Oe(t[7]),
            Kn(t[8])
        ], z = (t, e, r)=>({
            type: t,
            contents: e && new Uint8Array(e.flat(10)),
            children: r
        }), Q = (t, e, r, n, i)=>z(t, [
            ae(e),
            Ro(r),
            n ?? []
        ], i), Jl = (t)=>t.isQuickTime ? z("ftyp", [
            J("qt  "),
            E(512),
            J("qt  ")
        ]) : t.fragmented ? t.cmaf ? z("ftyp", [
            J("iso5"),
            E(512),
            J("iso5"),
            J("iso6"),
            J("mp41"),
            J("cmfc"),
            J("dash")
        ]) : z("ftyp", [
            J("iso5"),
            E(512),
            J("iso5"),
            J("iso6"),
            J("mp41")
        ]) : z("ftyp", [
            J("isom"),
            E(512),
            J("isom"),
            t.holdsAvc ? J("avc1") : [],
            J("mp41")
        ]), oa = ()=>z("styp", [
            J("iso5"),
            E(0),
            J("iso5"),
            J("iso6"),
            J("mp41"),
            J("cmfc"),
            J("dash")
        ]), ca = (t, e)=>{
        let r = t.maxWrittenEndTimestamp - t.minWrittenTimestamp;
        return Number.isFinite(r) || (r = 0), Q("sidx", 1, 0, [
            E(1),
            E(ze),
            Ke(ne(t.minWrittenTimestamp, ze)),
            Ke(0),
            U(0),
            U(1),
            E(e & 2147483647),
            E(ne(r, ze)),
            E(0)
        ]);
    }, jr = (t)=>({
            type: "mdat",
            largeSize: t
        }), ed = (t)=>({
            type: "free",
            size: t
        }), kr = (t)=>z("moov", void 0, [
            td(t.creationTime, t.trackDatas),
            ...t.trackDatas.map((e)=>rd(e, t.creationTime)),
            t.isFragmented ? Wd(t.trackDatas) : null,
            ef(t)
        ]), td = (t, e)=>{
        const r = Math.max(0, ...e.map((a)=>ne(An(a), ze) + ne(a.startTimestampOffset ?? 0, ze))), n = Math.max(0, ...e.map((a)=>a.track.id)) + 1, i = !Tt(t) || !Tt(r), s = i ? Ke : E;
        return Q("mvhd", +i, 0, [
            s(t),
            s(t),
            E(ze),
            s(r),
            Oe(1),
            Mo(1),
            Array(10).fill(0),
            zo(Oo),
            Array(24).fill(0),
            E(n)
        ]);
    }, An = (t)=>{
        if (t.samples.length === 0) return 0;
        let e = 1 / 0, r = -1 / 0;
        for(let n = 0; n < t.samples.length; n++){
            const i = t.samples[n];
            i.timestamp < e && (e = i.timestamp), i.timestamp + i.duration > r && (r = i.timestamp + i.duration);
        }
        return e === 1 / 0 ? 0 : r - e;
    }, rd = (t, e)=>{
        const r = ff(t), n = t.startTimestampOffset !== null && t.startTimestampOffset > 0;
        return z("trak", void 0, [
            nd(t, e),
            n ? id(t, t.startTimestampOffset) : null,
            sd(t, e),
            r.name !== void 0 ? z("udta", void 0, [
                z("name", [
                    ...Se.encode(r.name)
                ])
            ]) : null
        ]);
    }, nd = (t, e)=>{
        const r = ne(An(t), ze) + ne(t.startTimestampOffset ?? 0, ze), n = !Tt(e) || !Tt(r), i = n ? Ke : E;
        let s;
        if (t.type === "video") {
            const o = t.track.metadata.rotation;
            s = Do(o ?? 0);
        } else s = Oo;
        let a = 2;
        return t.track.metadata.disposition?.default !== !1 && (a |= 1), Q("tkhd", +n, a, [
            i(e),
            i(e),
            E(t.track.id),
            E(0),
            i(r),
            Array(8).fill(0),
            U(0),
            U(t.track.id),
            Mo(t.type === "audio" ? 1 : 0),
            U(0),
            zo(s),
            Oe(t.type === "video" ? t.info.width : 0),
            Oe(t.type === "video" ? t.info.height : 0)
        ]);
    }, id = (t, e)=>{
        const r = ne(e, ze), n = ne(An(t), ze), i = !Tt(r) || !Tt(n), s = i ? Ke : E, a = i ? Zl : st;
        return z("edts", void 0, [
            Q("elst", i ? 1 : 0, 0, [
                E(2),
                s(r),
                a(-1),
                Oe(1),
                s(n),
                a(0),
                Oe(1)
            ])
        ]);
    }, sd = (t, e)=>z("mdia", void 0, [
            ad(t, e),
            Yi(!0, od[t.type], cd[t.type]),
            ud(t)
        ]), ad = (t, e)=>{
        const r = ne(An(t), t.timescale), n = !Tt(e) || !Tt(r), i = n ? Ke : E;
        return Q("mdhd", +n, 0, [
            i(e),
            i(e),
            E(t.timescale),
            i(r),
            U(Wo(t.track.metadata.languageCode ?? me)),
            U(0)
        ]);
    }, od = {
        video: "vide",
        audio: "soun",
        subtitle: "text"
    }, cd = {
        video: "MediabunnyVideoHandler",
        audio: "MediabunnySoundHandler",
        subtitle: "MediabunnyTextHandler"
    }, Yi = (t, e, r, n = "\0\0\0\0")=>Q("hdlr", 0, 0, [
            t ? J("mhlr") : E(0),
            J(e),
            J(n),
            E(0),
            E(0),
            J(r, !0)
        ]), ud = (t)=>z("minf", void 0, [
            hd[t.type](),
            md(),
            _d(t)
        ]), ld = ()=>Q("vmhd", 0, 1, [
            U(0),
            U(0),
            U(0),
            U(0)
        ]), dd = ()=>Q("smhd", 0, 0, [
            U(0),
            U(0)
        ]), fd = ()=>Q("nmhd", 0, 0), hd = {
        video: ld,
        audio: dd,
        subtitle: fd
    }, md = ()=>z("dinf", void 0, [
            pd()
        ]), pd = ()=>Q("dref", 0, 0, [
            E(1)
        ], [
            gd()
        ]), gd = ()=>Q("url ", 0, 1), _d = (t)=>{
        const e = t.compositionTimeOffsetTable.length > 1 || t.compositionTimeOffsetTable.some((r)=>r.sampleCompositionTimeOffset !== 0);
        return z("stbl", void 0, [
            bd(t),
            Md(t),
            e ? Ud(t) : null,
            e ? Ld(t) : null,
            Od(t),
            zd(t),
            Nd(t),
            Dd(t)
        ]);
    }, bd = (t)=>{
        let e;
        if (t.type === "video") e = wd(sf(t.track.source._codec, t.info.decoderConfig.codec), t);
        else if (t.type === "audio") {
            const r = Lo(t.track.source._codec, t.muxer.isQuickTime);
            p(r), e = Pd(r, t);
        } else t.type === "subtitle" && (e = Fd(cf[t.track.source._codec], t));
        return p(e), Q("stsd", 0, 0, [
            E(1)
        ], [
            e
        ]);
    }, wd = (t, e)=>z(t, [
            Array(6).fill(0),
            U(1),
            U(0),
            U(0),
            Array(12).fill(0),
            U(e.info.width),
            U(e.info.height),
            E(4718592),
            E(4718592),
            E(0),
            U(1),
            Array(32).fill(0),
            U(24),
            Qi(65535)
        ], [
            af[e.track.source._codec](e),
            yd(e),
            ka(e.info.decoderConfig.colorSpace) ? kd(e) : null
        ]), yd = (t)=>t.info.pixelAspectRatio.num === t.info.pixelAspectRatio.den ? null : z("pasp", [
            E(t.info.pixelAspectRatio.num),
            E(t.info.pixelAspectRatio.den)
        ]), kd = (t)=>z("colr", [
            J("nclx"),
            U(Ut[t.info.decoderConfig.colorSpace.primaries]),
            U(Lt[t.info.decoderConfig.colorSpace.transfer]),
            U(Wt[t.info.decoderConfig.colorSpace.matrix]),
            ae((t.info.decoderConfig.colorSpace.fullRange ? 1 : 0) << 7)
        ]), Td = (t)=>t.info.decoderConfig && z("avcC", [
            ...he(t.info.decoderConfig.description)
        ]), Sd = (t)=>t.info.decoderConfig && z("hvcC", [
            ...he(t.info.decoderConfig.description)
        ]), ua = (t)=>{
        if (!t.info.decoderConfig) return null;
        const e = t.info.decoderConfig, r = e.codec.split("."), n = Number(r[1]), i = Number(r[2]), s = Number(r[3]), a = r[4] ? Number(r[4]) : 1, o = r[8] ? Number(r[8]) : Number(e.colorSpace?.fullRange ?? 0), c = (s << 4) + (a << 1) + o, u = r[5] ? Number(r[5]) : e.colorSpace?.primaries ? Ut[e.colorSpace.primaries] : 2, l = r[6] ? Number(r[6]) : e.colorSpace?.transfer ? Lt[e.colorSpace.transfer] : 2, d = r[7] ? Number(r[7]) : e.colorSpace?.matrix ? Wt[e.colorSpace.matrix] : 2;
        return Q("vpcC", 1, 0, [
            ae(n),
            ae(i),
            ae(c),
            ae(u),
            ae(l),
            ae(d),
            U(0)
        ]);
    }, xd = (t)=>z("av1C", Pa(t.info.decoderConfig.codec)), Pd = (t, e)=>{
        let r = 0, n, i = 16;
        const s = be.includes(e.track.source._codec);
        if (s) {
            const a = e.track.source._codec, { sampleSize: o } = $e(a);
            i = 8 * o, i > 16 && (r = 1);
        }
        if (e.muxer.isQuickTime && (r = 1), r === 0) n = [
            Array(6).fill(0),
            U(1),
            U(r),
            U(0),
            E(0),
            U(e.info.numberOfChannels),
            U(i),
            U(0),
            U(0),
            U(e.info.sampleRate < 2 ** 16 ? e.info.sampleRate : 0),
            U(0)
        ];
        else {
            const a = s ? 0 : -2;
            n = [
                Array(6).fill(0),
                U(1),
                U(r),
                U(0),
                E(0),
                U(e.info.numberOfChannels),
                U(Math.min(i, 16)),
                Qi(a),
                U(0),
                U(e.info.sampleRate < 2 ** 16 ? e.info.sampleRate : 0),
                U(0),
                s ? [
                    E(1),
                    E(i / 8),
                    E(e.info.numberOfChannels * i / 8)
                ] : [
                    E(0),
                    E(0),
                    E(0)
                ],
                E(2)
            ];
        }
        return z(t, n, [
            of(e.track.source._codec, e.muxer.isQuickTime)?.(e) ?? null
        ]);
    }, Qn = (t)=>{
        let e;
        switch(t.track.source._codec){
            case "aac":
                e = 64;
                break;
            case "mp3":
                e = 107;
                break;
            case "vorbis":
                e = 221;
                break;
            default:
                throw new Error(`Unhandled audio codec: ${t.track.source._codec}`);
        }
        let r = [
            ...ae(e),
            ...ae(21),
            ...Ro(0),
            ...E(0),
            ...E(0)
        ];
        if (t.info.decoderConfig.description) {
            const n = he(t.info.decoderConfig.description);
            r = [
                ...r,
                ...ae(5),
                ...Xn(n.byteLength),
                ...n
            ];
        }
        return r = [
            ...U(1),
            ...ae(0),
            ...ae(4),
            ...Xn(r.length),
            ...r,
            ...ae(6),
            ...ae(1),
            ...ae(2)
        ], r = [
            ...ae(3),
            ...Xn(r.length),
            ...r
        ], Q("esds", 0, 0, r);
    }, ht = (t)=>z("wave", void 0, [
            Cd(t),
            Id(t),
            z("\0\0\0\0")
        ]), Cd = (t)=>z("frma", [
            J(Lo(t.track.source._codec, t.muxer.isQuickTime))
        ]), Id = (t)=>{
        const { littleEndian: e } = $e(t.track.source._codec);
        return z("enda", [
            U(+e)
        ]);
    }, vd = (t)=>{
        let e = t.info.numberOfChannels, r = 3840, n = t.info.sampleRate, i = 0, s = 0, a = new Uint8Array(0);
        const o = t.info.decoderConfig?.description;
        if (o) {
            p(o.byteLength >= 18);
            const c = he(o), u = Li(c);
            e = u.outputChannelCount, r = u.preSkip, n = u.inputSampleRate, i = u.outputGain, s = u.channelMappingFamily, u.channelMappingTable && (a = u.channelMappingTable);
        }
        return z("dOps", [
            ae(0),
            ae(e),
            U(r),
            E(n),
            Qi(i),
            ae(s),
            ...a
        ]);
    }, Ed = (t)=>{
        const e = t.info.decoderConfig?.description;
        p(e);
        const r = he(e);
        return Q("dfLa", 0, 0, [
            ...r.subarray(4)
        ]);
    }, We = (t)=>{
        const { littleEndian: e, sampleSize: r } = $e(t.track.source._codec), n = +e;
        return Q("pcmC", 0, 0, [
            ae(n),
            ae(8 * r)
        ]);
    }, Ad = (t)=>{
        const e = Va(t.info.firstPacket.data);
        if (!e) throw new Error("Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).");
        const r = new Uint8Array(3), n = new Y(r);
        return n.writeBits(2, e.fscod), n.writeBits(5, e.bsid), n.writeBits(3, e.bsmod), n.writeBits(3, e.acmod), n.writeBits(1, e.lfeon), n.writeBits(5, e.bitRateCode), n.writeBits(5, 0), z("dac3", [
            ...r
        ]);
    }, Bd = (t)=>{
        const e = qa(t.info.firstPacket.data);
        if (!e) throw new Error("Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).");
        let r = 16;
        for (const a of e.substreams)r += 23, a.numDepSub > 0 ? r += 9 : r += 1;
        const n = Math.ceil(r / 8), i = new Uint8Array(n), s = new Y(i);
        s.writeBits(13, e.dataRate), s.writeBits(3, e.substreams.length - 1);
        for (const a of e.substreams)s.writeBits(2, a.fscod), s.writeBits(5, a.bsid), s.writeBits(1, 0), s.writeBits(1, 0), s.writeBits(3, a.bsmod), s.writeBits(3, a.acmod), s.writeBits(1, a.lfeon), s.writeBits(3, 0), s.writeBits(4, a.numDepSub), a.numDepSub > 0 ? s.writeBits(9, a.chanLoc) : s.writeBits(1, 0);
        return z("dec3", [
            ...i
        ]);
    }, Fd = (t, e)=>z(t, [
            Array(6).fill(0),
            U(1)
        ], [
            uf[e.track.source._codec](e)
        ]), Rd = (t)=>z("vttC", [
            ...Se.encode(t.info.config.description)
        ]), Md = (t)=>Q("stts", 0, 0, [
            E(t.timeToSampleTable.length),
            t.timeToSampleTable.map((e)=>[
                    E(e.sampleCount),
                    E(e.sampleDelta)
                ])
        ]), Dd = (t)=>{
        if (t.samples.every((r)=>r.type === "key")) return null;
        const e = [
            ...t.samples.entries()
        ].filter(([, r])=>r.type === "key");
        return Q("stss", 0, 0, [
            E(e.length),
            e.map(([r])=>E(r + 1))
        ]);
    }, Od = (t)=>Q("stsc", 0, 0, [
            E(t.compactlyCodedChunkTable.length),
            t.compactlyCodedChunkTable.map((e)=>[
                    E(e.firstChunk),
                    E(e.samplesPerChunk),
                    E(1)
                ])
        ]), zd = (t)=>{
        if (t.type === "audio" && t.info.requiresPcmTransformation) {
            const { sampleSize: e } = $e(t.track.source._codec);
            return Q("stsz", 0, 0, [
                E(e * t.info.numberOfChannels),
                E(t.samples.reduce((r, n)=>r + ne(n.duration, t.timescale), 0))
            ]);
        }
        return Q("stsz", 0, 0, [
            E(0),
            E(t.samples.length),
            t.samples.map((e)=>E(e.size))
        ]);
    }, Nd = (t)=>t.finalizedChunks.length > 0 && ie(t.finalizedChunks).offset >= 2 ** 32 ? Q("co64", 0, 0, [
            E(t.finalizedChunks.length),
            t.finalizedChunks.map((e)=>Ke(e.offset))
        ]) : Q("stco", 0, 0, [
            E(t.finalizedChunks.length),
            t.finalizedChunks.map((e)=>E(e.offset))
        ]), Ud = (t)=>Q("ctts", 1, 0, [
            E(t.compositionTimeOffsetTable.length),
            t.compositionTimeOffsetTable.map((e)=>[
                    E(e.sampleCount),
                    st(e.sampleCompositionTimeOffset)
                ])
        ]), Ld = (t)=>{
        let e = 1 / 0, r = -1 / 0, n = 1 / 0, i = -1 / 0;
        p(t.compositionTimeOffsetTable.length > 0), p(t.samples.length > 0);
        for(let a = 0; a < t.compositionTimeOffsetTable.length; a++){
            const o = t.compositionTimeOffsetTable[a];
            e = Math.min(e, o.sampleCompositionTimeOffset), r = Math.max(r, o.sampleCompositionTimeOffset);
        }
        for(let a = 0; a < t.samples.length; a++){
            const o = t.samples[a];
            n = Math.min(n, ne(o.timestamp, t.timescale)), i = Math.max(i, ne(o.timestamp + o.duration, t.timescale));
        }
        const s = Math.max(-e, 0);
        return i >= 2 ** 31 ? null : Q("cslg", 0, 0, [
            st(s),
            st(e),
            st(r),
            st(n),
            st(i)
        ]);
    }, Wd = (t)=>z("mvex", void 0, t.map(Vd)), Vd = (t)=>Q("trex", 0, 0, [
            E(t.track.id),
            E(1),
            E(0),
            E(0),
            E(0)
        ]), la = (t, e)=>z("moof", void 0, [
            Hd(t),
            ...e.map(qd)
        ]), Hd = (t)=>Q("mfhd", 0, 0, [
            E(t)
        ]), No = (t)=>{
        let e = 0, r = 0;
        const n = 0, i = 0, s = t.type === "delta";
        return r |= +s, s ? e |= 1 : e |= 2, e << 24 | r << 16 | n << 8 | i;
    }, qd = (t)=>z("traf", void 0, [
            Gd(t),
            jd(t),
            $d(t)
        ]), Gd = (t)=>{
        p(t.currentChunk);
        let e = 0;
        e |= 8, e |= 16, e |= 32, e |= 131072;
        const r = t.currentChunk.samples[1] ?? t.currentChunk.samples[0], n = {
            duration: r.timescaleUnitsToNextSample,
            size: r.size,
            flags: No(r)
        };
        return Q("tfhd", 0, e, [
            E(t.track.id),
            E(n.duration),
            E(n.size),
            E(n.flags)
        ]);
    }, jd = (t)=>(p(t.currentChunk), Q("tfdt", 1, 0, [
            Ke(ne(t.currentChunk.startTimestamp, t.timescale))
        ])), $d = (t)=>{
        p(t.currentChunk);
        const e = t.currentChunk.samples.map((m)=>m.timescaleUnitsToNextSample), r = t.currentChunk.samples.map((m)=>m.size), n = t.currentChunk.samples.map(No), i = t.currentChunk.samples.map((m)=>ne(m.timestamp - m.decodeTimestamp, t.timescale)), s = new Set(e), a = new Set(r), o = new Set(n), c = new Set(i), u = o.size === 2 && n[0] !== n[1], l = s.size > 1, d = a.size > 1, f = !u && o.size > 1, h = c.size > 1 || [
            ...c
        ].some((m)=>m !== 0);
        let g = 0;
        return g |= 1, g |= 4 * +u, g |= 256 * +l, g |= 512 * +d, g |= 1024 * +f, g |= 2048 * +h, Q("trun", 1, g, [
            E(t.currentChunk.samples.length),
            E(t.currentChunk.offset - t.currentChunk.moofOffset || 0),
            u ? E(n[0]) : [],
            t.currentChunk.samples.map((m, b)=>[
                    l ? E(e[b]) : [],
                    d ? E(r[b]) : [],
                    f ? E(n[b]) : [],
                    h ? st(i[b]) : []
                ])
        ]);
    }, Kd = (t)=>z("mfra", void 0, [
            ...t.map(Xd),
            Qd()
        ]), Xd = (t, e)=>Q("tfra", 1, 0, [
            E(t.track.id),
            E(63),
            E(t.finalizedChunks.length),
            t.finalizedChunks.map((n)=>[
                    Ke(ne(n.samples[0].timestamp, t.timescale)),
                    Ke(n.moofOffset),
                    E(e + 1),
                    E(1),
                    E(1)
                ])
        ]), Qd = ()=>Q("mfro", 0, 0, [
            E(0)
        ]), Yd = ()=>z("vtte"), Zd = (t, e, r, n, i)=>z("vttc", void 0, [
            i !== null ? z("vsid", [
                st(i)
            ]) : null,
            r !== null ? z("iden", [
                ...Se.encode(r)
            ]) : null,
            e !== null ? z("ctim", [
                ...Se.encode(Fo(e))
            ]) : null,
            n !== null ? z("sttg", [
                ...Se.encode(n)
            ]) : null,
            z("payl", [
                ...Se.encode(t)
            ])
        ]), Jd = (t)=>z("vtta", [
            ...Se.encode(t)
        ]), ef = (t)=>{
        const e = [], r = t.format._options.metadataFormat ?? "auto", n = t.output._metadataTags;
        if (r === "mdir" || r === "auto" && !t.isQuickTime) {
            const i = rf(n);
            i && e.push(i);
        } else if (r === "mdta") {
            const i = nf(n);
            i && e.push(i);
        } else (r === "udta" || r === "auto" && t.isQuickTime) && tf(e, t.output._metadataTags);
        return e.length === 0 ? null : z("udta", void 0, e);
    }, tf = (t, e)=>{
        for (const { key: r, value: n } of Ci(e))switch(r){
            case "title":
                t.push(Ve("©nam", n));
                break;
            case "description":
                t.push(Ve("©des", n));
                break;
            case "artist":
                t.push(Ve("©ART", n));
                break;
            case "album":
                t.push(Ve("©alb", n));
                break;
            case "albumArtist":
                t.push(Ve("albr", n));
                break;
            case "genre":
                t.push(Ve("©gen", n));
                break;
            case "date":
                t.push(Ve("©day", n.toISOString().slice(0, 10)));
                break;
            case "comment":
                t.push(Ve("©cmt", n));
                break;
            case "lyrics":
                t.push(Ve("©lyr", n));
                break;
            case "raw":
                break;
            case "discNumber":
            case "discsTotal":
            case "trackNumber":
            case "tracksTotal":
            case "images":
                break;
            default:
                je(r);
        }
        if (e.raw) for(const r in e.raw){
            const n = e.raw[r];
            n == null || r.length !== 4 || t.some((i)=>i.type === r) || (typeof n == "string" ? t.push(Ve(r, n)) : n instanceof Uint8Array && t.push(z(r, Array.from(n))));
        }
    }, Ve = (t, e)=>{
        const r = Se.encode(e);
        return z(t, [
            U(r.length),
            U(Wo("und")),
            Array.from(r)
        ]);
    }, da = {
        "image/jpeg": 13,
        "image/png": 14,
        "image/bmp": 27
    }, Uo = (t, e)=>{
        const r = [];
        for (const { key: n, value: i } of Ci(t))switch(n){
            case "title":
                r.push({
                    key: e ? "title" : "©nam",
                    value: De(i)
                });
                break;
            case "description":
                r.push({
                    key: e ? "description" : "©des",
                    value: De(i)
                });
                break;
            case "artist":
                r.push({
                    key: e ? "artist" : "©ART",
                    value: De(i)
                });
                break;
            case "album":
                r.push({
                    key: e ? "album" : "©alb",
                    value: De(i)
                });
                break;
            case "albumArtist":
                r.push({
                    key: e ? "album_artist" : "aART",
                    value: De(i)
                });
                break;
            case "comment":
                r.push({
                    key: e ? "comment" : "©cmt",
                    value: De(i)
                });
                break;
            case "genre":
                r.push({
                    key: e ? "genre" : "©gen",
                    value: De(i)
                });
                break;
            case "lyrics":
                r.push({
                    key: e ? "lyrics" : "©lyr",
                    value: De(i)
                });
                break;
            case "date":
                r.push({
                    key: e ? "date" : "©day",
                    value: De(i.toISOString().slice(0, 10))
                });
                break;
            case "images":
                for (const s of i)s.kind === "coverFront" && r.push({
                    key: "covr",
                    value: z("data", [
                        E(da[s.mimeType] ?? 0),
                        E(0),
                        Array.from(s.data)
                    ])
                });
                break;
            case "trackNumber":
                if (e) {
                    const s = t.tracksTotal !== void 0 ? `${i}/${t.tracksTotal}` : i.toString();
                    r.push({
                        key: "track",
                        value: De(s)
                    });
                } else r.push({
                    key: "trkn",
                    value: z("data", [
                        E(0),
                        E(0),
                        U(0),
                        U(i),
                        U(t.tracksTotal ?? 0),
                        U(0)
                    ])
                });
                break;
            case "discNumber":
                e || r.push({
                    key: "disc",
                    value: z("data", [
                        E(0),
                        E(0),
                        U(0),
                        U(i),
                        U(t.discsTotal ?? 0),
                        U(0)
                    ])
                });
                break;
            case "tracksTotal":
            case "discsTotal":
                break;
            case "raw":
                break;
            default:
                je(n);
        }
        if (t.raw) for(const n in t.raw){
            const i = t.raw[n];
            i == null || !e && n.length !== 4 || r.some((s)=>s.key === n) || (typeof i == "string" ? r.push({
                key: n,
                value: De(i)
            }) : i instanceof Uint8Array ? r.push({
                key: n,
                value: z("data", [
                    E(0),
                    E(0),
                    Array.from(i)
                ])
            }) : i instanceof ir && r.push({
                key: n,
                value: z("data", [
                    E(da[i.mimeType] ?? 0),
                    E(0),
                    Array.from(i.data)
                ])
            }));
        }
        return r;
    }, rf = (t)=>{
        const e = Uo(t, !1);
        return e.length === 0 ? null : Q("meta", 0, 0, void 0, [
            Yi(!1, "mdir", "", "appl"),
            z("ilst", void 0, e.map((r)=>z(r.key, void 0, [
                    r.value
                ])))
        ]);
    }, nf = (t)=>{
        const e = Uo(t, !0);
        return e.length === 0 ? null : z("meta", void 0, [
            Yi(!1, "mdta", ""),
            Q("keys", 0, 0, [
                E(e.length)
            ], e.map((r)=>z("mdta", [
                    ...Se.encode(r.key)
                ]))),
            z("ilst", void 0, e.map((r, n)=>{
                const i = String.fromCharCode(...E(n + 1));
                return z(i, void 0, [
                    r.value
                ]);
            }))
        ]);
    }, De = (t)=>z("data", [
            E(1),
            E(0),
            ...Se.encode(t)
        ]), sf = (t, e)=>{
        switch(t){
            case "avc":
                return e.startsWith("avc3") ? "avc3" : "avc1";
            case "hevc":
                return "hvc1";
            case "vp8":
                return "vp08";
            case "vp9":
                return "vp09";
            case "av1":
                return "av01";
        }
    }, af = {
        avc: Td,
        hevc: Sd,
        vp8: ua,
        vp9: ua,
        av1: xd
    }, Lo = (t, e)=>{
        switch(t){
            case "aac":
                return "mp4a";
            case "mp3":
                return "mp4a";
            case "opus":
                return "Opus";
            case "vorbis":
                return "mp4a";
            case "flac":
                return "fLaC";
            case "ulaw":
                return "ulaw";
            case "alaw":
                return "alaw";
            case "pcm-u8":
                return "raw ";
            case "pcm-s8":
                return "sowt";
            case "ac3":
                return "ac-3";
            case "eac3":
                return "ec-3";
        }
        if (e) switch(t){
            case "pcm-s16":
                return "sowt";
            case "pcm-s16be":
                return "twos";
            case "pcm-s24":
                return "in24";
            case "pcm-s24be":
                return "in24";
            case "pcm-s32":
                return "in32";
            case "pcm-s32be":
                return "in32";
            case "pcm-f32":
                return "fl32";
            case "pcm-f32be":
                return "fl32";
            case "pcm-f64":
                return "fl64";
            case "pcm-f64be":
                return "fl64";
        }
        else switch(t){
            case "pcm-s16":
                return "ipcm";
            case "pcm-s16be":
                return "ipcm";
            case "pcm-s24":
                return "ipcm";
            case "pcm-s24be":
                return "ipcm";
            case "pcm-s32":
                return "ipcm";
            case "pcm-s32be":
                return "ipcm";
            case "pcm-f32":
                return "fpcm";
            case "pcm-f32be":
                return "fpcm";
            case "pcm-f64":
                return "fpcm";
            case "pcm-f64be":
                return "fpcm";
        }
    }, of = (t, e)=>{
        switch(t){
            case "aac":
                return Qn;
            case "mp3":
                return Qn;
            case "opus":
                return vd;
            case "vorbis":
                return Qn;
            case "flac":
                return Ed;
            case "ac3":
                return Ad;
            case "eac3":
                return Bd;
        }
        if (e) switch(t){
            case "pcm-s24":
                return ht;
            case "pcm-s24be":
                return ht;
            case "pcm-s32":
                return ht;
            case "pcm-s32be":
                return ht;
            case "pcm-f32":
                return ht;
            case "pcm-f32be":
                return ht;
            case "pcm-f64":
                return ht;
            case "pcm-f64be":
                return ht;
        }
        else switch(t){
            case "pcm-s16":
                return We;
            case "pcm-s16be":
                return We;
            case "pcm-s24":
                return We;
            case "pcm-s24be":
                return We;
            case "pcm-s32":
                return We;
            case "pcm-s32be":
                return We;
            case "pcm-f32":
                return We;
            case "pcm-f32be":
                return We;
            case "pcm-f64":
                return We;
            case "pcm-f64be":
                return We;
        }
        return null;
    }, cf = {
        webvtt: "wvtt"
    }, uf = {
        webvtt: Rd
    }, Wo = (t)=>{
        p(t.length === 3);
        let e = 0;
        for(let r = 0; r < 3; r++)e <<= 5, e += t.charCodeAt(r) - 96;
        return e;
    };
    class yi {
        constructor(e, r){
            if (this.finalized = !1, this.started = !1, this.pos = 0, this.trackedWrites = null, this.trackedStart = -1, this.trackedEnd = -1, e._writerAcquired) throw new Error("Can't have multiple Writers for the same Target.");
            this.target = e, e._setMonotonicity(r), e._writerAcquired = !0;
        }
        start() {
            p(!this.started), this.target._start(), this.started = !0;
        }
        write(e) {
            p(this.started && !this.finalized), this.maybeTrackWrites(e), this.target._write(e, this.pos), this.pos += e.byteLength;
        }
        seek(e) {
            this.pos = e;
        }
        getPos() {
            return this.pos;
        }
        async flush() {
            return p(this.started && !this.finalized), this.target._flush();
        }
        async finalize() {
            p(this.started && !this.finalized), await this.target._finalize(), this.finalized = !0;
        }
        maybeTrackWrites(e) {
            if (!this.trackedWrites) return;
            let r = this.getPos();
            if (r < this.trackedStart) {
                if (r + e.byteLength <= this.trackedStart) return;
                e = e.subarray(this.trackedStart - r), r = 0;
            }
            const n = r + e.byteLength - this.trackedStart;
            let i = this.trackedWrites.byteLength;
            for(; i < n;)i *= 2;
            if (i !== this.trackedWrites.byteLength) {
                const s = new Uint8Array(i);
                s.set(this.trackedWrites, 0), this.trackedWrites = s;
            }
            this.trackedWrites.set(e, r - this.trackedStart), this.trackedEnd = Math.max(this.trackedEnd, r + e.byteLength);
        }
        startTrackingWrites() {
            this.trackedWrites = new Uint8Array(2 ** 10), this.trackedStart = this.getPos(), this.trackedEnd = this.trackedStart;
        }
        stopTrackingWrites() {
            if (!this.trackedWrites) throw new Error("Internal error: Can't get tracked writes since nothing was tracked.");
            const r = {
                data: this.trackedWrites.subarray(0, this.trackedEnd - this.trackedStart),
                start: this.trackedStart,
                end: this.trackedEnd
            };
            return this.trackedWrites = null, r;
        }
    }
    class et extends wn {
        constructor(){
            super(...arguments), this._writerAcquired = !1, this._monotonicity = null, this.onwrite = null;
        }
        _setMonotonicity(e) {
            this._monotonicity !== !1 && (this._monotonicity = e);
        }
        _dispatchWrite(e, r) {
            this.onwrite?.(e, r), this._emit("write", {
                start: e,
                end: r
            });
        }
        slice(e) {
            if (!Number.isInteger(e) || e < 0) throw new TypeError("offset must be a non-negative integer.");
            return new lf(this, e);
        }
    }
    const Yn = 2 ** 16, Zn = 2 ** 32;
    Jn = class extends et {
        constructor(e = {}){
            if (super(), this.buffer = null, this._maxPos = 0, !e || typeof e != "object") throw new TypeError("BufferTarget options, when provided, must be an object.");
            if (e.onFinalize !== void 0 && typeof e.onFinalize != "function") throw new TypeError("options.onFinalize, when provided, must be a function.");
            if (this._options = e, this._supportsResize = "resize" in new ArrayBuffer(0), this._supportsResize) try {
                this._buffer = new ArrayBuffer(Yn, {
                    maxByteLength: Zn
                });
            } catch  {
                this._buffer = new ArrayBuffer(Yn), this._supportsResize = !1;
            }
            else this._buffer = new ArrayBuffer(Yn);
            this._bytes = new Uint8Array(this._buffer);
        }
        _ensureSize(e) {
            let r = this._buffer.byteLength;
            for(; r < e;)r *= 2;
            if (r !== this._buffer.byteLength) {
                if (r > Zn) throw new Error(`ArrayBuffer exceeded maximum size of ${Zn} bytes. Please consider using another target.`);
                if (this._supportsResize) this._buffer.resize(r);
                else {
                    const n = new ArrayBuffer(r), i = new Uint8Array(n);
                    i.set(this._bytes, 0), this._buffer = n, this._bytes = i;
                }
            }
        }
        _start() {}
        _write(e, r) {
            this._ensureSize(r + e.byteLength), this._bytes.set(e, r), this._maxPos = Math.max(this._maxPos, r + e.byteLength), this._dispatchWrite(r, r + e.byteLength);
        }
        async _flush() {}
        async _finalize() {
            this.buffer = this._buffer.slice(0, this._maxPos), this._options.onFinalize && await this._options.onFinalize(this.buffer), this._emit("finalized");
        }
        async _close() {}
        _getSlice(e, r) {
            return this._bytes.slice(e, r);
        }
    };
    class lf extends et {
        constructor(e, r){
            super(), this._baseTarget = e, this._offset = r;
        }
        _start() {}
        _write(e, r) {
            this._baseTarget._write(e, this._offset + r), this._dispatchWrite(r, r + e.byteLength);
        }
        _flush() {
            return this._baseTarget._flush();
        }
        async _finalize() {
            this._emit("finalized");
        }
        async _close() {}
        _setMonotonicity(e) {
            super._setMonotonicity(e), this._baseTarget._setMonotonicity(e);
        }
    }
    class ei {
        constructor(e, r){
            if (this.rootPath = e, this.getTarget = r, typeof e != "string") throw new TypeError("rootPath must be a string.");
            if (typeof r != "function") throw new TypeError("getTarget must be a function.");
        }
    }
    const ze = 57600, df = 2082844800, ff = (t)=>{
        const e = {}, r = t.track;
        return r.metadata.name !== void 0 && (e.name = r.metadata.name), e;
    }, ne = (t, e, r = !0)=>{
        const n = t * e;
        return r ? Math.round(n) : n;
    };
    class hf extends Bo {
        constructor(e, r){
            super(e), this.writer = null, this.boxWriter = null, this.initWriter = null, this.initBoxWriter = null, this.auxTarget = new Jn, this.auxWriter = new yi(this.auxTarget, !1), this.auxBoxWriter = new Gr(this.auxWriter), this.mdat = null, this.ftypSize = null, this.trackDatas = [], this.allTracksKnown = le(), this.creationTime = Math.floor(Date.now() / 1e3) + df, this.finalizedChunks = [], this.nextFragmentNumber = 1, this.maxWrittenTimestamp = -1 / 0, this.minWrittenTimestamp = 1 / 0, this.maxWrittenEndTimestamp = -1 / 0, this.segmentHeaderSize = null, this.format = r, this.isQuickTime = r instanceof qo, this.isCmaf = r instanceof _a, this.minimumFragmentDuration = r._options.minimumFragmentDuration ?? (r instanceof _a ? 1 / 0 : 1);
        }
        async start() {
            const e = await this.mutex.acquire();
            if (this.isCmaf ? (this.fastStart = "fragmented", this.isFragmented = !0) : (this.writer = await this.output._getRootWriter((n)=>this.format._options.fastStart !== void 0 ? this.format._options.fastStart === "fragmented" : n instanceof Jn), this.boxWriter = new Gr(this.writer), this.fastStart = this.format._options.fastStart ?? (this.writer.target instanceof Jn ? "in-memory" : !1), this.isFragmented = this.fastStart === "fragmented"), this.isCmaf) {
                if (!this.output._hasInitTarget()) throw new Error("CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.");
                const n = await this.output._getInitTarget(), i = new yi(n, !0);
                i.start(), this.initWriter = i, this.initBoxWriter = new Gr(i);
            }
            const r = this.output._tracks.some((n)=>n.isVideoTrack() && n.source._codec === "avc");
            {
                const n = this.initBoxWriter ?? this.boxWriter;
                if (p(n), this.format._options.onFtyp && n.writer.startTrackingWrites(), n.writeBox(Jl({
                    isQuickTime: this.isQuickTime,
                    holdsAvc: r,
                    fragmented: this.isFragmented,
                    cmaf: this.isCmaf
                })), this.format._options.onFtyp) {
                    const { data: i, start: s } = n.writer.stopTrackingWrites();
                    this.format._options.onFtyp(i, s);
                }
                this.ftypSize = n.writer.getPos(), this.isCmaf && await this.initWriter.flush();
            }
            if (this.fastStart !== "in-memory") if (this.fastStart === "reserve") {
                for (const n of this.output._tracks)if (n.metadata.maximumPacketCount === void 0) throw new Error("All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.");
            } else this.isFragmented || (p(this.writer), p(this.boxWriter), this.format._options.onMdat && this.writer.startTrackingWrites(), this.mdat = jr(!0), this.boxWriter.writeBox(this.mdat));
            await this.writer?.flush(), e();
        }
        allTracksAreKnown() {
            for (const e of this.output._tracks)if (!e.source._closed && !this.trackDatas.some((r)=>r.track === e)) return !1;
            return !0;
        }
        async getMimeType() {
            await this.allTracksKnown.promise;
            const e = this.trackDatas.map((r)=>r.type === "video" || r.type === "audio" ? r.info.decoderConfig.codec : {
                    webvtt: "wvtt"
                }[r.track.source._codec]);
            return $a({
                isQuickTime: this.isQuickTime,
                hasVideo: this.trackDatas.some((r)=>r.type === "video"),
                hasAudio: this.trackDatas.some((r)=>r.type === "audio"),
                codecStrings: e
            });
        }
        getVideoTrackData(e, r, n) {
            const i = this.trackDatas.find((f)=>f.track === e);
            if (i) return i;
            Ia(n), p(n), p(n.decoderConfig);
            const s = {
                ...n.decoderConfig
            };
            p(s.codedWidth !== void 0), p(s.codedHeight !== void 0);
            let a = !1;
            if (e.source._codec === "avc" && !s.description) {
                const f = zi(r.data);
                if (!f) throw new Error("Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.");
                s.description = vc(f), a = !0;
            } else if (e.source._codec === "hevc" && !s.description) {
                const f = Ui(r.data);
                if (!f) throw new Error("Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.");
                s.description = zc(f), a = !0;
            }
            const o = sc(1 / (e.metadata.frameRate ?? ze), 1e6).den, c = s.displayAspectWidth, u = s.displayAspectHeight, l = c === void 0 || u === void 0 ? {
                num: 1,
                den: 1
            } : Rr({
                num: c * s.codedHeight,
                den: u * s.codedWidth
            }), d = {
                muxer: this,
                track: e,
                type: "video",
                info: {
                    width: s.codedWidth,
                    height: s.codedHeight,
                    pixelAspectRatio: l,
                    decoderConfig: s,
                    requiresAnnexBTransformation: a
                },
                timescale: o,
                samples: [],
                sampleQueue: [],
                timestampProcessingQueue: [],
                timeToSampleTable: [],
                compositionTimeOffsetTable: [],
                lastTimescaleUnits: null,
                lastSample: null,
                startTimestampOffset: null,
                finalizedChunks: [],
                currentChunk: null,
                compactlyCodedChunkTable: [],
                closed: !1
            };
            return this.trackDatas.push(d), this.trackDatas.sort((f, h)=>f.track.id - h.track.id), this.allTracksAreKnown() && this.allTracksKnown.resolve(), d;
        }
        getAudioTrackData(e, r, n) {
            const i = this.trackDatas.find((c)=>c.track === e);
            if (i) return i;
            va(n), p(n), p(n.decoderConfig);
            const s = {
                ...n.decoderConfig
            };
            let a = !1;
            if (e.source._codec === "aac" && !s.description) {
                const c = ut(ye.tempFromBytes(r.data));
                if (!c) throw new Error("Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.");
                const u = St[c.samplingFrequencyIndex], l = dr[c.channelConfiguration];
                if (u === void 0 || l === void 0) throw new Error("Invalid ADTS frame header.");
                s.description = Fi({
                    objectType: c.objectType,
                    sampleRate: u,
                    numberOfChannels: l
                }), a = !0;
            }
            const o = {
                muxer: this,
                track: e,
                type: "audio",
                info: {
                    numberOfChannels: n.decoderConfig.numberOfChannels,
                    sampleRate: n.decoderConfig.sampleRate,
                    decoderConfig: s,
                    requiresPcmTransformation: !this.isFragmented && be.includes(e.source._codec),
                    expectedNextPcmPacketTimestamp: null,
                    requiresAdtsStripping: a,
                    firstPacket: r
                },
                timescale: s.sampleRate,
                samples: [],
                sampleQueue: [],
                timestampProcessingQueue: [],
                timeToSampleTable: [],
                compositionTimeOffsetTable: [],
                lastTimescaleUnits: null,
                lastSample: null,
                startTimestampOffset: null,
                finalizedChunks: [],
                currentChunk: null,
                compactlyCodedChunkTable: [],
                closed: !1
            };
            return this.trackDatas.push(o), this.trackDatas.sort((c, u)=>c.track.id - u.track.id), this.allTracksAreKnown() && this.allTracksKnown.resolve(), o;
        }
        getSubtitleTrackData(e, r) {
            const n = this.trackDatas.find((s)=>s.track === e);
            if (n) return n;
            Ea(r), p(r), p(r.config);
            const i = {
                muxer: this,
                track: e,
                type: "subtitle",
                info: {
                    config: r.config
                },
                timescale: 1e3,
                samples: [],
                sampleQueue: [],
                timestampProcessingQueue: [],
                timeToSampleTable: [],
                compositionTimeOffsetTable: [],
                lastTimescaleUnits: null,
                lastSample: null,
                startTimestampOffset: null,
                finalizedChunks: [],
                currentChunk: null,
                compactlyCodedChunkTable: [],
                closed: !1,
                lastCueEndTimestamp: 0,
                cueQueue: [],
                nextSourceId: 0,
                cueToSourceId: new WeakMap
            };
            return this.trackDatas.push(i), this.trackDatas.sort((s, a)=>s.track.id - a.track.id), this.allTracksAreKnown() && this.allTracksKnown.resolve(), i;
        }
        async addEncodedVideoPacket(e, r, n) {
            const i = await this.mutex.acquire();
            try {
                const s = this.getVideoTrackData(e, r, n);
                let a = r.data;
                if (s.info.requiresAnnexBTransformation) {
                    const c = [
                        ...Lr(a)
                    ].map((u)=>a.subarray(u.offset, u.offset + u.length));
                    if (c.length === 0) throw new Error("Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.");
                    a = Oi(c, 4);
                }
                this.validateTimestamp(s.track, r.timestamp, r.type === "key");
                const o = this.createSampleForTrack(s, a, r.timestamp, r.duration, r.type);
                await this.registerSample(s, o);
            } finally{
                i();
            }
        }
        async addEncodedAudioPacket(e, r, n) {
            const i = await this.mutex.acquire();
            try {
                const s = this.getAudioTrackData(e, r, n);
                let a = r.data;
                if (s.info.requiresAdtsStripping) {
                    const l = ut(ye.tempFromBytes(a));
                    if (!l) throw new Error("Expected ADTS frame, didn't get one.");
                    const d = l.crcCheck === null ? Dr : kt;
                    a = a.subarray(d);
                }
                this.validateTimestamp(s.track, r.timestamp, r.type === "key");
                let o = r.timestamp, c = r.duration;
                if (s.info.requiresPcmTransformation) {
                    const d = $e(s.info.decoderConfig.codec).sampleSize * s.info.numberOfChannels;
                    if (c = a.byteLength / d / s.info.sampleRate, s.info.expectedNextPcmPacketTimestamp !== null) {
                        const f = o - s.info.expectedNextPcmPacketTimestamp;
                        if (f < .01) o = s.info.expectedNextPcmPacketTimestamp;
                        else {
                            const h = await this.padWithSilence(s, s.info.expectedNextPcmPacketTimestamp, f);
                            o = s.info.expectedNextPcmPacketTimestamp + h;
                        }
                    }
                    s.info.expectedNextPcmPacketTimestamp = o + c;
                }
                const u = this.createSampleForTrack(s, a, o, c, r.type);
                await this.registerSample(s, u);
            } finally{
                i();
            }
        }
        async padWithSilence(e, r, n) {
            const i = ne(n, e.timescale);
            if (n = i / e.timescale, i > 0) {
                const { sampleSize: s, silentValue: a } = $e(e.info.decoderConfig.codec), o = i * e.info.numberOfChannels, c = new Uint8Array(s * o).fill(a), u = this.createSampleForTrack(e, new Uint8Array(c.buffer), r, n, "key");
                await this.registerSample(e, u);
            }
            return n;
        }
        async addSubtitleCue(e, r, n) {
            const i = await this.mutex.acquire();
            try {
                const s = this.getSubtitleTrackData(e, n);
                this.validateTimestamp(s.track, r.timestamp, !0), e.source._codec === "webvtt" && (s.cueQueue.push(r), await this.processWebVTTCues(s, r.timestamp));
            } finally{
                i();
            }
        }
        async processWebVTTCues(e, r) {
            for(; e.cueQueue.length > 0;){
                const n = new Set([]);
                for (const u of e.cueQueue)p(u.timestamp <= r), p(e.lastCueEndTimestamp <= u.timestamp + u.duration), n.add(Math.max(u.timestamp, e.lastCueEndTimestamp)), n.add(u.timestamp + u.duration);
                const i = [
                    ...n
                ].sort((u, l)=>u - l), s = i[0], a = i[1] ?? s;
                if (r < a) break;
                if (e.lastCueEndTimestamp < s) {
                    this.auxWriter.seek(0);
                    const u = Yd();
                    this.auxBoxWriter.writeBox(u);
                    const l = this.auxTarget._getSlice(0, this.auxWriter.getPos()), d = this.createSampleForTrack(e, l, e.lastCueEndTimestamp, s - e.lastCueEndTimestamp, "key");
                    await this.registerSample(e, d), e.lastCueEndTimestamp = s;
                }
                this.auxWriter.seek(0);
                for(let u = 0; u < e.cueQueue.length; u++){
                    const l = e.cueQueue[u];
                    if (l.timestamp >= a) break;
                    pn.lastIndex = 0;
                    const d = pn.test(l.text), f = l.timestamp + l.duration;
                    let h = e.cueToSourceId.get(l);
                    if (h === void 0 && a < f && (h = e.nextSourceId++, e.cueToSourceId.set(l, h)), l.notes) {
                        const m = Jd(l.notes);
                        this.auxBoxWriter.writeBox(m);
                    }
                    const g = Zd(l.text, d ? s : null, l.identifier ?? null, l.settings ?? null, h ?? null);
                    this.auxBoxWriter.writeBox(g), f === a && e.cueQueue.splice(u--, 1);
                }
                const o = this.auxTarget._getSlice(0, this.auxWriter.getPos()), c = this.createSampleForTrack(e, o, s, a - s, "key");
                await this.registerSample(e, c), e.lastCueEndTimestamp = a;
            }
        }
        createSampleForTrack(e, r, n, i, s) {
            return {
                timestamp: n,
                decodeTimestamp: n,
                duration: i,
                data: r,
                size: r.byteLength,
                type: s,
                timescaleUnitsToNextSample: ne(i, e.timescale)
            };
        }
        processTimestamps(e, r) {
            if (e.timestampProcessingQueue.length === 0) return;
            if (e.type === "audio" && e.info.requiresPcmTransformation) {
                this.isFragmented || (e.startTimestampOffset ??= e.timestampProcessingQueue[0].timestamp);
                let i = 0;
                for(let s = 0; s < e.timestampProcessingQueue.length; s++){
                    const a = e.timestampProcessingQueue[s], o = ne(a.duration, e.timescale);
                    i += o;
                }
                if (e.timeToSampleTable.length === 0) e.timeToSampleTable.push({
                    sampleCount: i,
                    sampleDelta: 1
                });
                else {
                    const s = ie(e.timeToSampleTable);
                    s.sampleCount += i;
                }
                e.timestampProcessingQueue.length = 0;
                return;
            }
            const n = e.timestampProcessingQueue.map((i)=>i.timestamp).sort((i, s)=>i - s);
            this.isFragmented || (e.startTimestampOffset ??= n[0]);
            for(let i = 0; i < e.timestampProcessingQueue.length; i++){
                const s = e.timestampProcessingQueue[i];
                s.decodeTimestamp = n[i];
                const a = ne(s.timestamp - s.decodeTimestamp, e.timescale), o = ne(s.duration, e.timescale);
                if (e.lastTimescaleUnits !== null) {
                    p(e.lastSample);
                    const c = ne(s.decodeTimestamp, e.timescale, !1), u = Math.round(c - e.lastTimescaleUnits);
                    if (p(u >= 0), e.lastTimescaleUnits += u, e.lastSample.timescaleUnitsToNextSample = u, !this.isFragmented) {
                        let l = ie(e.timeToSampleTable);
                        if (p(l), l.sampleCount === 1) {
                            l.sampleDelta = u;
                            const f = e.timeToSampleTable[e.timeToSampleTable.length - 2];
                            f && f.sampleDelta === u && (f.sampleCount++, e.timeToSampleTable.pop(), l = f);
                        } else l.sampleDelta !== u && (l.sampleCount--, e.timeToSampleTable.push(l = {
                            sampleCount: 1,
                            sampleDelta: u
                        }));
                        l.sampleDelta === o ? l.sampleCount++ : e.timeToSampleTable.push({
                            sampleCount: 1,
                            sampleDelta: o
                        });
                        const d = ie(e.compositionTimeOffsetTable);
                        p(d), d.sampleCompositionTimeOffset === a ? d.sampleCount++ : e.compositionTimeOffsetTable.push({
                            sampleCount: 1,
                            sampleCompositionTimeOffset: a
                        });
                    }
                } else e.lastTimescaleUnits = ne(s.decodeTimestamp, e.timescale, !1), this.isFragmented || (e.timeToSampleTable.push({
                    sampleCount: 1,
                    sampleDelta: o
                }), e.compositionTimeOffsetTable.push({
                    sampleCount: 1,
                    sampleCompositionTimeOffset: a
                }));
                e.lastSample = s;
            }
            if (e.timestampProcessingQueue.length = 0, p(e.lastSample), p(e.lastTimescaleUnits !== null), r !== void 0 && e.lastSample.timescaleUnitsToNextSample === 0) {
                p(r.type === "key");
                const i = ne(r.timestamp, e.timescale, !1), s = Math.round(i - e.lastTimescaleUnits);
                e.lastSample.timescaleUnitsToNextSample = s;
            }
        }
        async registerSample(e, r) {
            r.type === "key" && this.processTimestamps(e, r), e.timestampProcessingQueue.push(r), this.isFragmented ? (e.sampleQueue.push(r), await this.interleaveSamples()) : this.fastStart === "reserve" ? await this.registerSampleFastStartReserve(e, r) : await this.addSampleToTrack(e, r);
        }
        async addSampleToTrack(e, r) {
            if (!this.isFragmented && (e.samples.push(r), this.fastStart === "reserve")) {
                const i = e.track.metadata.maximumPacketCount;
                if (p(i !== void 0), e.samples.length > i) throw new Error(`Track #${e.track.id} has already reached the maximum packet count (${i}). Either add less packets or increase the maximum packet count.`);
            }
            let n = !1;
            if (!e.currentChunk) n = !0;
            else {
                e.currentChunk.startTimestamp = Math.min(e.currentChunk.startTimestamp, r.timestamp);
                const i = r.timestamp - e.currentChunk.startTimestamp;
                if (this.isFragmented) {
                    const s = this.trackDatas.every((a)=>{
                        if (e === a) return r.type === "key";
                        const o = a.sampleQueue[0];
                        return o ? o.type === "key" : a.closed;
                    });
                    i >= this.minimumFragmentDuration && s && r.timestamp > this.maxWrittenTimestamp && (n = !0, await this.finalizeFragment());
                } else n = i >= .5;
            }
            n && (e.currentChunk && await this.finalizeCurrentChunk(e), e.currentChunk = {
                startTimestamp: r.timestamp,
                samples: [],
                offset: null,
                moofOffset: null
            }), p(e.currentChunk), e.currentChunk.samples.push(r), this.isFragmented && (this.maxWrittenTimestamp = Math.max(this.maxWrittenTimestamp, r.timestamp), this.maxWrittenEndTimestamp = Math.max(this.maxWrittenEndTimestamp, r.timestamp + r.duration), this.minWrittenTimestamp = Math.min(this.minWrittenTimestamp, r.timestamp));
        }
        async finalizeCurrentChunk(e) {
            if (p(!this.isFragmented), p(this.writer), !e.currentChunk) return;
            e.finalizedChunks.push(e.currentChunk), this.finalizedChunks.push(e.currentChunk);
            let r = e.currentChunk.samples.length;
            if (e.type === "audio" && e.info.requiresPcmTransformation && (r = e.currentChunk.samples.reduce((n, i)=>n + ne(i.duration, e.timescale), 0)), (e.compactlyCodedChunkTable.length === 0 || ie(e.compactlyCodedChunkTable).samplesPerChunk !== r) && e.compactlyCodedChunkTable.push({
                firstChunk: e.finalizedChunks.length,
                samplesPerChunk: r
            }), this.fastStart === "in-memory") {
                e.currentChunk.offset = 0;
                return;
            }
            e.currentChunk.offset = this.writer.getPos();
            for (const n of e.currentChunk.samples)p(n.data), this.writer.write(n.data), n.data = null;
            await this.writer.flush();
        }
        async interleaveSamples(e = !1) {
            if (p(this.isFragmented), !(!e && !this.allTracksAreKnown())) e: for(;;){
                let r = null, n = 1 / 0;
                for (const s of this.trackDatas){
                    if (!e && s.sampleQueue.length === 0 && !s.closed) break e;
                    s.sampleQueue.length > 0 && s.sampleQueue[0].timestamp < n && (r = s, n = s.sampleQueue[0].timestamp);
                }
                if (!r) break;
                const i = r.sampleQueue.shift();
                await this.addSampleToTrack(r, i);
            }
        }
        async finalizeFragment(e = !this.isCmaf) {
            p(this.isFragmented);
            const r = this.nextFragmentNumber++;
            if (r === 1) {
                const h = this.initBoxWriter ?? this.boxWriter;
                p(h), this.format._options.onMoov && h.writer.startTrackingWrites();
                const g = kr(this);
                if (h.writeBox(g), this.format._options.onMoov) {
                    const { data: m, start: b } = h.writer.stopTrackingWrites();
                    this.format._options.onMoov(m, b);
                }
                if (this.isCmaf) {
                    p(this.initWriter), await this.initWriter.flush(), await this.initWriter.finalize(), this.writer = await this.output._getRootWriter(!0), this.boxWriter = new Gr(this.writer);
                    const m = this.boxWriter.measureBox(oa()), b = this.boxWriter.measureBox(ca(this, 0));
                    this.segmentHeaderSize = m + b, this.writer.seek(this.segmentHeaderSize);
                }
            }
            p(this.writer), p(this.boxWriter);
            const n = this.trackDatas.filter((h)=>h.currentChunk), i = la(r, n), s = this.writer.getPos(), a = s + this.boxWriter.measureBox(i);
            let o = a + rt, c = 1 / 0;
            for (const h of n){
                h.currentChunk.offset = o, h.currentChunk.moofOffset = s;
                for (const g of h.currentChunk.samples)o += g.size;
                c = Math.min(c, h.currentChunk.startTimestamp);
            }
            const u = o - a, l = u >= 2 ** 32;
            if (l) for (const h of n)h.currentChunk.offset += Ft - rt;
            this.format._options.onMoof && this.writer.startTrackingWrites();
            const d = la(r, n);
            if (this.boxWriter.writeBox(d), this.format._options.onMoof) {
                const { data: h, start: g } = this.writer.stopTrackingWrites();
                this.format._options.onMoof(h, g, c);
            }
            p(this.writer.getPos() === a), this.format._options.onMdat && this.writer.startTrackingWrites();
            const f = jr(l);
            f.size = u, this.boxWriter.writeBox(f), this.writer.seek(a + (l ? Ft : rt));
            for (const h of n)for (const g of h.currentChunk.samples)this.writer.write(g.data), g.data = null;
            if (this.format._options.onMdat) {
                const { data: h, start: g } = this.writer.stopTrackingWrites();
                this.format._options.onMdat(h, g);
            }
            for (const h of n)h.finalizedChunks.push(h.currentChunk), this.finalizedChunks.push(h.currentChunk), h.currentChunk = null;
            e && await this.writer.flush();
        }
        async registerSampleFastStartReserve(e, r) {
            if (p(this.writer), p(this.boxWriter), this.allTracksAreKnown()) {
                if (!this.mdat) {
                    const n = kr(this), s = this.boxWriter.measureBox(n) + this.computeSampleTableSizeUpperBound() + 4096;
                    p(this.ftypSize !== null), this.writer.seek(this.ftypSize + s), this.format._options.onMdat && this.writer.startTrackingWrites(), this.mdat = jr(!0), this.boxWriter.writeBox(this.mdat);
                    for (const a of this.trackDatas){
                        for (const o of a.sampleQueue)await this.addSampleToTrack(a, o);
                        a.sampleQueue.length = 0;
                    }
                }
                await this.addSampleToTrack(e, r);
            } else e.sampleQueue.push(r);
        }
        computeSampleTableSizeUpperBound() {
            p(this.fastStart === "reserve");
            let e = 0;
            for (const r of this.trackDatas){
                const n = r.track.metadata.maximumPacketCount;
                p(n !== void 0), e += 8 * Math.ceil(2 / 3 * n), e += 4 * n, e += 8 * Math.ceil(2 / 3 * n), e += 12 * Math.ceil(2 / 3 * n), e += 4 * n, e += 8 * n;
            }
            return e;
        }
        async onTrackClose(e) {
            const r = await this.mutex.acquire(), n = this.trackDatas.find((i)=>i.track === e);
            n && (n.closed = !0, n.type === "subtitle" && e.source._codec === "webvtt" && await this.processWebVTTCues(n, 1 / 0), this.processTimestamps(n)), this.allTracksAreKnown() && this.allTracksKnown.resolve(), this.isFragmented && await this.interleaveSamples(), r();
        }
        async finalize() {
            const e = await this.mutex.acquire();
            this.allTracksKnown.resolve();
            for (const r of this.trackDatas)r.closed = !0, r.type === "subtitle" && r.track.source._codec === "webvtt" && await this.processWebVTTCues(r, 1 / 0), this.processTimestamps(r);
            if (this.isFragmented) await this.interleaveSamples(!0), await this.finalizeFragment(!1);
            else for (const r of this.trackDatas){
                await this.finalizeCurrentChunk(r), p(r.startTimestampOffset !== null);
                for(let n = 0; n < r.samples.length; n++){
                    const i = r.samples[n];
                    i.timestamp -= r.startTimestampOffset, i.decodeTimestamp -= r.startTimestampOffset;
                }
            }
            if (p(this.writer), p(this.boxWriter), this.fastStart === "in-memory") {
                this.mdat = jr(!1);
                let r;
                for(let i = 0; i < 2; i++){
                    const s = kr(this), a = this.boxWriter.measureBox(s);
                    r = this.boxWriter.measureBox(this.mdat);
                    let o = this.writer.getPos() + a + r;
                    for (const c of this.finalizedChunks){
                        c.offset = o;
                        for (const { data: u } of c.samples)p(u), o += u.byteLength, r += u.byteLength;
                    }
                    if (o < 2 ** 32) break;
                    r >= 2 ** 32 && (this.mdat.largeSize = !0);
                }
                this.format._options.onMoov && this.writer.startTrackingWrites();
                const n = kr(this);
                if (this.boxWriter.writeBox(n), this.format._options.onMoov) {
                    const { data: i, start: s } = this.writer.stopTrackingWrites();
                    this.format._options.onMoov(i, s);
                }
                this.format._options.onMdat && this.writer.startTrackingWrites(), this.mdat.size = r, this.boxWriter.writeBox(this.mdat);
                for (const i of this.finalizedChunks)for (const s of i.samples)p(s.data), this.writer.write(s.data), s.data = null;
                if (this.format._options.onMdat) {
                    const { data: i, start: s } = this.writer.stopTrackingWrites();
                    this.format._options.onMdat(i, s);
                }
            } else if (this.isFragmented) if (this.isCmaf) {
                const r = this.segmentHeaderSize !== null ? this.writer.getPos() - this.segmentHeaderSize : 0;
                this.writer.seek(0), this.boxWriter.writeBox(oa()), this.boxWriter.writeBox(ca(this, r));
            } else {
                const r = this.writer.getPos(), n = Kd(this.trackDatas);
                this.boxWriter.writeBox(n);
                const i = this.writer.getPos() - r;
                this.writer.seek(this.writer.getPos() - 4), this.boxWriter.writeU32(i);
            }
            else {
                p(this.mdat);
                const r = this.boxWriter.offsets.get(this.mdat);
                p(r !== void 0);
                const n = this.writer.getPos() - r;
                if (this.mdat.size = n, this.mdat.largeSize = n >= 2 ** 32, this.boxWriter.patchBox(this.mdat), this.format._options.onMdat) {
                    const { data: s, start: a } = this.writer.stopTrackingWrites();
                    this.format._options.onMdat(s, a);
                }
                const i = kr(this);
                if (this.fastStart === "reserve") {
                    p(this.ftypSize !== null), this.writer.seek(this.ftypSize), this.format._options.onMoov && this.writer.startTrackingWrites(), this.boxWriter.writeBox(i);
                    const s = this.boxWriter.offsets.get(this.mdat) - this.writer.getPos();
                    this.boxWriter.writeBox(ed(s));
                } else this.format._options.onMoov && this.writer.startTrackingWrites(), this.boxWriter.writeBox(i);
                if (this.format._options.onMoov) {
                    const { data: s, start: a } = this.writer.stopTrackingWrites();
                    this.format._options.onMoov(s, a);
                }
            }
            e();
        }
    }
    const mf = -32768, pf = 2 ** 15 - 1, fa = "Mediabunny", ha = 6, ma = 5, gf = {
        video: 1,
        audio: 2,
        subtitle: 17
    };
    class _f extends Bo {
        constructor(e, r){
            super(e), this.trackDatas = [], this.allTracksKnown = le(), this.segment = null, this.segmentInfo = null, this.seekHead = null, this.tracksElement = null, this.tagsElement = null, this.attachmentsElement = null, this.segmentDuration = null, this.cues = null, this.currentCluster = null, this.currentClusterStartMsTimestamp = null, this.currentClusterMaxMsTimestamp = null, this.trackDatasInCurrentCluster = new Map, this.startTimestamp = 1 / 0, this.endTimestamp = -1 / 0, this.format = r;
        }
        async start() {
            const e = await this.mutex.acquire();
            this.writer = await this.output._getRootWriter(!!this.format._options.appendOnly), this.ebmlWriter = new ru(this.writer), this.writeEBMLHeader(), this.createSegmentInfo(), this.createCues(), await this.writer.flush(), e();
        }
        writeEBMLHeader() {
            this.format._options.onEbmlHeader && this.writer.startTrackingWrites();
            const e = {
                id: k.EBML,
                data: [
                    {
                        id: k.EBMLVersion,
                        data: 1
                    },
                    {
                        id: k.EBMLReadVersion,
                        data: 1
                    },
                    {
                        id: k.EBMLMaxIDLength,
                        data: 4
                    },
                    {
                        id: k.EBMLMaxSizeLength,
                        data: 8
                    },
                    {
                        id: k.DocType,
                        data: this.format instanceof wa ? "webm" : "matroska"
                    },
                    {
                        id: k.DocTypeVersion,
                        data: 2
                    },
                    {
                        id: k.DocTypeReadVersion,
                        data: 2
                    }
                ]
            };
            if (this.ebmlWriter.writeEBML(e), this.format._options.onEbmlHeader) {
                const { data: r, start: n } = this.writer.stopTrackingWrites();
                this.format._options.onEbmlHeader(r, n);
            }
        }
        maybeCreateSeekHead(e) {
            if (this.format._options.appendOnly) return;
            const r = new Uint8Array([
                28,
                83,
                187,
                107
            ]), n = new Uint8Array([
                21,
                73,
                169,
                102
            ]), i = new Uint8Array([
                22,
                84,
                174,
                107
            ]), s = new Uint8Array([
                25,
                65,
                164,
                105
            ]), a = new Uint8Array([
                18,
                84,
                195,
                103
            ]), o = {
                id: k.SeekHead,
                data: [
                    {
                        id: k.Seek,
                        data: [
                            {
                                id: k.SeekID,
                                data: r
                            },
                            {
                                id: k.SeekPosition,
                                size: 5,
                                data: e ? this.ebmlWriter.offsets.get(this.cues) - this.segmentDataOffset : 0
                            }
                        ]
                    },
                    {
                        id: k.Seek,
                        data: [
                            {
                                id: k.SeekID,
                                data: n
                            },
                            {
                                id: k.SeekPosition,
                                size: 5,
                                data: e ? this.ebmlWriter.offsets.get(this.segmentInfo) - this.segmentDataOffset : 0
                            }
                        ]
                    },
                    {
                        id: k.Seek,
                        data: [
                            {
                                id: k.SeekID,
                                data: i
                            },
                            {
                                id: k.SeekPosition,
                                size: 5,
                                data: e ? this.ebmlWriter.offsets.get(this.tracksElement) - this.segmentDataOffset : 0
                            }
                        ]
                    },
                    this.attachmentsElement ? {
                        id: k.Seek,
                        data: [
                            {
                                id: k.SeekID,
                                data: s
                            },
                            {
                                id: k.SeekPosition,
                                size: 5,
                                data: e ? this.ebmlWriter.offsets.get(this.attachmentsElement) - this.segmentDataOffset : 0
                            }
                        ]
                    } : null,
                    this.tagsElement ? {
                        id: k.Seek,
                        data: [
                            {
                                id: k.SeekID,
                                data: a
                            },
                            {
                                id: k.SeekPosition,
                                size: 5,
                                data: e ? this.ebmlWriter.offsets.get(this.tagsElement) - this.segmentDataOffset : 0
                            }
                        ]
                    } : null
                ]
            };
            this.seekHead = o;
        }
        createSegmentInfo() {
            const e = {
                id: k.Duration,
                data: new li(0)
            };
            this.segmentDuration = e;
            const r = {
                id: k.Info,
                data: [
                    {
                        id: k.TimestampScale,
                        data: 1e6
                    },
                    {
                        id: k.MuxingApp,
                        data: fa
                    },
                    {
                        id: k.WritingApp,
                        data: fa
                    },
                    this.format._options.appendOnly ? null : e
                ]
            };
            this.segmentInfo = r;
        }
        createTracks() {
            const e = {
                id: k.Tracks,
                data: []
            };
            this.tracksElement = e;
            for (const r of this.trackDatas){
                const n = Pe[r.track.source._codec];
                p(n);
                let i = 0;
                if (r.type === "audio" && r.track.source._codec === "opus") {
                    i = 1e6 * 80;
                    const s = r.info.decoderConfig.description;
                    if (s) {
                        const a = he(s), o = Li(a);
                        i = Math.round(1e9 * (o.preSkip / Ur));
                    }
                }
                e.data.push({
                    id: k.TrackEntry,
                    data: [
                        {
                            id: k.TrackNumber,
                            data: r.track.id
                        },
                        {
                            id: k.TrackUID,
                            data: r.track.id
                        },
                        {
                            id: k.TrackType,
                            data: gf[r.type]
                        },
                        r.track.metadata.disposition?.default === !1 ? {
                            id: k.FlagDefault,
                            data: 0
                        } : null,
                        r.track.metadata.disposition?.forced ? {
                            id: k.FlagForced,
                            data: 1
                        } : null,
                        r.track.metadata.disposition?.hearingImpaired ? {
                            id: k.FlagHearingImpaired,
                            data: 1
                        } : null,
                        r.track.metadata.disposition?.visuallyImpaired ? {
                            id: k.FlagVisualImpaired,
                            data: 1
                        } : null,
                        r.track.metadata.disposition?.original ? {
                            id: k.FlagOriginal,
                            data: 1
                        } : null,
                        r.track.metadata.disposition?.commentary ? {
                            id: k.FlagCommentary,
                            data: 1
                        } : null,
                        {
                            id: k.FlagLacing,
                            data: 0
                        },
                        {
                            id: k.Language,
                            data: r.track.metadata.languageCode ?? me
                        },
                        {
                            id: k.CodecID,
                            data: n
                        },
                        {
                            id: k.CodecDelay,
                            data: 0
                        },
                        {
                            id: k.SeekPreRoll,
                            data: i
                        },
                        r.track.metadata.name !== void 0 ? {
                            id: k.Name,
                            data: new mt(r.track.metadata.name)
                        } : null,
                        r.type === "video" ? this.videoSpecificTrackInfo(r) : null,
                        r.type === "audio" ? this.audioSpecificTrackInfo(r) : null,
                        r.type === "subtitle" ? this.subtitleSpecificTrackInfo(r) : null
                    ]
                });
            }
        }
        videoSpecificTrackInfo(e) {
            const { frameRate: r, rotation: n } = e.track.metadata, i = [
                e.info.decoderConfig.description ? {
                    id: k.CodecPrivate,
                    data: he(e.info.decoderConfig.description)
                } : null,
                r ? {
                    id: k.DefaultDuration,
                    data: 1e9 / r
                } : null
            ], s = n ? gn(-n) : 0, a = !!e.info.aspectRatio && e.info.aspectRatio.num * e.info.height !== e.info.aspectRatio.den * e.info.width, o = e.info.decoderConfig.colorSpace, c = {
                id: k.Video,
                data: [
                    {
                        id: k.PixelWidth,
                        data: e.info.width
                    },
                    {
                        id: k.PixelHeight,
                        data: e.info.height
                    },
                    a ? {
                        id: k.DisplayWidth,
                        data: e.info.aspectRatio.num
                    } : null,
                    a ? {
                        id: k.DisplayHeight,
                        data: e.info.aspectRatio.den
                    } : null,
                    a ? {
                        id: k.DisplayUnit,
                        data: 3
                    } : null,
                    e.info.alphaMode ? {
                        id: k.AlphaMode,
                        data: 1
                    } : null,
                    ka(o) ? {
                        id: k.Colour,
                        data: [
                            {
                                id: k.MatrixCoefficients,
                                data: Wt[o.matrix]
                            },
                            {
                                id: k.TransferCharacteristics,
                                data: Lt[o.transfer]
                            },
                            {
                                id: k.Primaries,
                                data: Ut[o.primaries]
                            },
                            {
                                id: k.Range,
                                data: o.fullRange ? 2 : 1
                            }
                        ]
                    } : null,
                    s ? {
                        id: k.Projection,
                        data: [
                            {
                                id: k.ProjectionType,
                                data: 0
                            },
                            {
                                id: k.ProjectionPoseRoll,
                                data: new ui((s + 180) % 360 - 180)
                            }
                        ]
                    } : null
                ]
            };
            return i.push(c), i;
        }
        audioSpecificTrackInfo(e) {
            const r = be.includes(e.track.source._codec) ? $e(e.track.source._codec) : null;
            return [
                e.info.decoderConfig.description ? {
                    id: k.CodecPrivate,
                    data: he(e.info.decoderConfig.description)
                } : null,
                {
                    id: k.Audio,
                    data: [
                        {
                            id: k.SamplingFrequency,
                            data: new ui(e.info.sampleRate)
                        },
                        {
                            id: k.Channels,
                            data: e.info.numberOfChannels
                        },
                        r ? {
                            id: k.BitDepth,
                            data: 8 * r.sampleSize
                        } : null
                    ]
                }
            ];
        }
        subtitleSpecificTrackInfo(e) {
            return [
                {
                    id: k.CodecPrivate,
                    data: Se.encode(e.info.config.description)
                }
            ];
        }
        maybeCreateTags() {
            const e = [], r = (s, a)=>{
                e.push({
                    id: k.SimpleTag,
                    data: [
                        {
                            id: k.TagName,
                            data: new mt(s)
                        },
                        typeof a == "string" ? {
                            id: k.TagString,
                            data: new mt(a)
                        } : {
                            id: k.TagBinary,
                            data: a
                        }
                    ]
                });
            }, n = this.output._metadataTags, i = new Set;
            for (const { key: s, value: a } of Ci(n))switch(s){
                case "title":
                    r("TITLE", a), i.add("TITLE");
                    break;
                case "description":
                    r("DESCRIPTION", a), i.add("DESCRIPTION");
                    break;
                case "artist":
                    r("ARTIST", a), i.add("ARTIST");
                    break;
                case "album":
                    r("ALBUM", a), i.add("ALBUM");
                    break;
                case "albumArtist":
                    r("ALBUM_ARTIST", a), i.add("ALBUM_ARTIST");
                    break;
                case "genre":
                    r("GENRE", a), i.add("GENRE");
                    break;
                case "comment":
                    r("COMMENT", a), i.add("COMMENT");
                    break;
                case "lyrics":
                    r("LYRICS", a), i.add("LYRICS");
                    break;
                case "date":
                    r("DATE", a.toISOString().slice(0, 10)), i.add("DATE");
                    break;
                case "trackNumber":
                    {
                        const o = n.tracksTotal !== void 0 ? `${a}/${n.tracksTotal}` : a.toString();
                        r("PART_NUMBER", o), i.add("PART_NUMBER");
                    }
                    break;
                case "discNumber":
                    {
                        const o = n.discsTotal !== void 0 ? `${a}/${n.discsTotal}` : a.toString();
                        r("DISC", o), i.add("DISC");
                    }
                    break;
                case "tracksTotal":
                case "discsTotal":
                    break;
                case "images":
                case "raw":
                    break;
                default:
                    je(s);
            }
            if (n.raw) for(const s in n.raw){
                const a = n.raw[s];
                a == null || i.has(s) || (typeof a == "string" || a instanceof Uint8Array) && r(s, a);
            }
            e.length !== 0 && (this.tagsElement = {
                id: k.Tags,
                data: [
                    {
                        id: k.Tag,
                        data: [
                            {
                                id: k.Targets,
                                data: [
                                    {
                                        id: k.TargetTypeValue,
                                        data: 50
                                    },
                                    {
                                        id: k.TargetType,
                                        data: "MOVIE"
                                    }
                                ]
                            },
                            ...e
                        ]
                    }
                ]
            });
        }
        maybeCreateAttachments() {
            const e = this.output._metadataTags, r = [], n = new Set, i = e.images ?? [];
            for (const s of i){
                let a = s.name;
                a === void 0 && (a = (s.kind === "coverFront" ? "cover" : s.kind === "coverBack" ? "back" : "image") + (oc(s.mimeType) ?? ""));
                let o;
                for(;;){
                    o = 0n;
                    for(let c = 0; c < 8; c++)o <<= 8n, o |= BigInt(Math.floor(Math.random() * 256));
                    if (o !== 0n && !n.has(o)) break;
                }
                n.add(o), r.push({
                    id: k.AttachedFile,
                    data: [
                        s.description !== void 0 ? {
                            id: k.FileDescription,
                            data: new mt(s.description)
                        } : null,
                        {
                            id: k.FileName,
                            data: new mt(a)
                        },
                        {
                            id: k.FileMediaType,
                            data: s.mimeType
                        },
                        {
                            id: k.FileData,
                            data: s.data
                        },
                        {
                            id: k.FileUID,
                            data: o
                        }
                    ]
                });
            }
            for (const [s, a] of Object.entries(e.raw ?? {}))!(a instanceof Ai) || !/^\d+$/.test(s) || i.find((c)=>c.mimeType === a.mimeType && xa(c.data, a.data)) || r.push({
                id: k.AttachedFile,
                data: [
                    a.description !== void 0 ? {
                        id: k.FileDescription,
                        data: new mt(a.description)
                    } : null,
                    {
                        id: k.FileName,
                        data: new mt(a.name ?? "")
                    },
                    {
                        id: k.FileMediaType,
                        data: a.mimeType ?? ""
                    },
                    {
                        id: k.FileData,
                        data: a.data
                    },
                    {
                        id: k.FileUID,
                        data: BigInt(s)
                    }
                ]
            });
            r.length !== 0 && (this.attachmentsElement = {
                id: k.Attachments,
                data: r
            });
        }
        createSegment() {
            this.createTracks(), this.maybeCreateTags(), this.maybeCreateAttachments(), this.maybeCreateSeekHead(!1);
            const e = {
                id: k.Segment,
                size: this.format._options.appendOnly ? -1 : ha,
                data: [
                    this.seekHead,
                    this.segmentInfo,
                    this.tracksElement,
                    this.attachmentsElement,
                    this.tagsElement
                ]
            };
            if (this.segment = e, this.format._options.onSegmentHeader && this.writer.startTrackingWrites(), this.ebmlWriter.writeEBML(e), this.format._options.onSegmentHeader) {
                const { data: r, start: n } = this.writer.stopTrackingWrites();
                this.format._options.onSegmentHeader(r, n);
            }
        }
        createCues() {
            this.cues = {
                id: k.Cues,
                data: []
            };
        }
        get segmentDataOffset() {
            return p(this.segment), this.ebmlWriter.dataOffsets.get(this.segment);
        }
        allTracksAreKnown() {
            for (const e of this.output._tracks)if (!e.source._closed && !this.trackDatas.some((r)=>r.track === e)) return !1;
            return !0;
        }
        async getMimeType() {
            await this.allTracksKnown.promise;
            const e = this.trackDatas.map((r)=>r.type === "video" || r.type === "audio" ? r.info.decoderConfig.codec : {
                    webvtt: "wvtt"
                }[r.track.source._codec]);
            return ao({
                isWebM: this.format instanceof wa,
                hasVideo: this.trackDatas.some((r)=>r.type === "video"),
                hasAudio: this.trackDatas.some((r)=>r.type === "audio"),
                codecStrings: e
            });
        }
        getVideoTrackData(e, r, n) {
            const i = this.trackDatas.find((u)=>u.track === e);
            if (i) return i;
            Ia(n), p(n), p(n.decoderConfig), p(n.decoderConfig.codedWidth !== void 0), p(n.decoderConfig.codedHeight !== void 0);
            const s = n.decoderConfig.displayAspectWidth, a = n.decoderConfig.displayAspectHeight, o = s === void 0 || a === void 0 ? null : Rr({
                num: s,
                den: a
            }), c = {
                track: e,
                type: "video",
                info: {
                    width: n.decoderConfig.codedWidth,
                    height: n.decoderConfig.codedHeight,
                    aspectRatio: o,
                    decoderConfig: n.decoderConfig,
                    alphaMode: !!r.sideData.alpha
                },
                chunkQueue: [],
                lastWrittenMsTimestamp: null,
                closed: !1
            };
            return e.source._codec === "vp9" ? c.info.decoderConfig = {
                ...c.info.decoderConfig,
                description: new Uint8Array(hc(c.info.decoderConfig.codec))
            } : e.source._codec === "av1" && (c.info.decoderConfig = {
                ...c.info.decoderConfig,
                description: new Uint8Array(Pa(c.info.decoderConfig.codec))
            }), this.trackDatas.push(c), this.trackDatas.sort((u, l)=>u.track.id - l.track.id), this.allTracksAreKnown() && this.allTracksKnown.resolve(), c;
        }
        getAudioTrackData(e, r, n) {
            const i = this.trackDatas.find((c)=>c.track === e);
            if (i) return i;
            va(n), p(n), p(n.decoderConfig);
            const s = {
                ...n.decoderConfig
            };
            let a = !1;
            if (e.source._codec === "aac" && !s.description) {
                const c = ut(ye.tempFromBytes(r.data));
                if (!c) throw new Error("Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.");
                const u = St[c.samplingFrequencyIndex], l = dr[c.channelConfiguration];
                if (u === void 0 || l === void 0) throw new Error("Invalid ADTS frame header.");
                s.description = Fi({
                    objectType: c.objectType,
                    sampleRate: u,
                    numberOfChannels: l
                }), a = !0;
            }
            const o = {
                track: e,
                type: "audio",
                info: {
                    numberOfChannels: n.decoderConfig.numberOfChannels,
                    sampleRate: n.decoderConfig.sampleRate,
                    decoderConfig: s,
                    requiresAdtsStripping: a
                },
                chunkQueue: [],
                lastWrittenMsTimestamp: null,
                closed: !1
            };
            return this.trackDatas.push(o), this.trackDatas.sort((c, u)=>c.track.id - u.track.id), this.allTracksAreKnown() && this.allTracksKnown.resolve(), o;
        }
        getSubtitleTrackData(e, r) {
            const n = this.trackDatas.find((s)=>s.track === e);
            if (n) return n;
            Ea(r), p(r), p(r.config);
            const i = {
                track: e,
                type: "subtitle",
                info: {
                    config: r.config
                },
                chunkQueue: [],
                lastWrittenMsTimestamp: null,
                closed: !1
            };
            return this.trackDatas.push(i), this.trackDatas.sort((s, a)=>s.track.id - a.track.id), this.allTracksAreKnown() && this.allTracksKnown.resolve(), i;
        }
        async addEncodedVideoPacket(e, r, n) {
            const i = await this.mutex.acquire();
            try {
                const s = this.getVideoTrackData(e, r, n), a = r.type === "key";
                this.validateTimestamp(s.track, r.timestamp, a);
                let o = r.timestamp, c = r.duration;
                e.metadata.frameRate !== void 0 && (o = cr(o, e.metadata.frameRate), c = cr(c, e.metadata.frameRate));
                const u = s.info.alphaMode ? r.sideData.alpha ?? null : null, l = this.createInternalChunk(r.data, o, c, r.type, u);
                e.source._codec === "vp9" && this.fixVP9ColorSpace(s, l), s.chunkQueue.push(l), await this.interleaveChunks();
            } finally{
                i();
            }
        }
        async addEncodedAudioPacket(e, r, n) {
            const i = await this.mutex.acquire();
            try {
                const s = this.getAudioTrackData(e, r, n);
                let a = r.data;
                if (s.info.requiresAdtsStripping) {
                    const u = ut(ye.tempFromBytes(a));
                    if (!u) throw new Error("Expected ADTS frame, didn't get one.");
                    const l = u.crcCheck === null ? Dr : kt;
                    a = a.subarray(l);
                }
                const o = r.type === "key";
                this.validateTimestamp(s.track, r.timestamp, o);
                const c = this.createInternalChunk(a, r.timestamp, r.duration, r.type);
                s.chunkQueue.push(c), await this.interleaveChunks();
            } finally{
                i();
            }
        }
        async addSubtitleCue(e, r, n) {
            const i = await this.mutex.acquire();
            try {
                const s = this.getSubtitleTrackData(e, n);
                this.validateTimestamp(s.track, r.timestamp, !0);
                let a = r.text;
                const o = Math.round(r.timestamp * 1e3);
                pn.lastIndex = 0, a = a.replace(pn, (d)=>{
                    const h = Yl(d.slice(1, -1)) - o;
                    return `<${Fo(h)}>`;
                });
                const c = Se.encode(a), u = `${r.settings ?? ""}
${r.identifier ?? ""}
${r.notes ?? ""}`, l = this.createInternalChunk(c, r.timestamp, r.duration, "key", u.trim() ? Se.encode(u) : null);
                s.chunkQueue.push(l), await this.interleaveChunks();
            } finally{
                i();
            }
        }
        async interleaveChunks(e = !1) {
            if (!(!e && !this.allTracksAreKnown())) {
                e: for(;;){
                    let r = null, n = 1 / 0;
                    for (const s of this.trackDatas){
                        if (!e && s.chunkQueue.length === 0 && !s.closed) break e;
                        s.chunkQueue.length > 0 && s.chunkQueue[0].timestamp < n && (r = s, n = s.chunkQueue[0].timestamp);
                    }
                    if (!r) break;
                    const i = r.chunkQueue.shift();
                    this.writeBlock(r, i);
                }
                e || await this.writer.flush();
            }
        }
        fixVP9ColorSpace(e, r) {
            if (r.type !== "key" || !e.info.decoderConfig.colorSpace || !e.info.decoderConfig.colorSpace.matrix) return;
            const n = new Y(r.data);
            n.skipBits(2);
            const i = n.readBits(1), a = (n.readBits(1) << 1) + i;
            if (a === 3 && n.skipBits(1), n.readBits(1) || n.readBits(1) !== 0 || (n.skipBits(2), n.readBits(24) !== 4817730)) return;
            a >= 2 && n.skipBits(1);
            const l = {
                rgb: 7,
                bt709: 2,
                bt470bg: 1,
                smpte170m: 3
            }[e.info.decoderConfig.colorSpace.matrix];
            Xo(r.data, n.pos, n.pos + 3, l);
        }
        createInternalChunk(e, r, n, i, s = null) {
            return {
                data: e,
                type: i,
                timestamp: r,
                duration: n,
                additions: s
            };
        }
        writeBlock(e, r) {
            this.segment || this.createSegment();
            const n = Math.round(1e3 * r.timestamp), i = this.trackDatas.every((l)=>{
                if (e === l) return r.type === "key";
                const d = l.chunkQueue[0];
                return d ? d.type === "key" : l.closed;
            });
            let s = !1;
            if (!this.currentCluster) s = !0;
            else {
                p(this.currentClusterStartMsTimestamp !== null), p(this.currentClusterMaxMsTimestamp !== null);
                const l = n - this.currentClusterStartMsTimestamp;
                s = i && n > this.currentClusterMaxMsTimestamp && l >= 1e3 * (this.format._options.minimumClusterDuration ?? 1) || l > pf;
            }
            s && this.createNewCluster(n);
            const a = n - this.currentClusterStartMsTimestamp;
            if (a < mf) return;
            const o = new Uint8Array(4), c = new DataView(o.buffer);
            c.setUint8(0, 128 | e.track.id), c.setInt16(1, a, !1);
            const u = Math.round(1e3 * r.duration);
            if (r.additions) {
                const l = {
                    id: k.BlockGroup,
                    data: [
                        {
                            id: k.Block,
                            data: [
                                o,
                                r.data
                            ]
                        },
                        r.type === "delta" ? {
                            id: k.ReferenceBlock,
                            data: new ro(e.lastWrittenMsTimestamp - n)
                        } : null,
                        r.additions ? {
                            id: k.BlockAdditions,
                            data: [
                                {
                                    id: k.BlockMore,
                                    data: [
                                        {
                                            id: k.BlockAddID,
                                            data: 1
                                        },
                                        {
                                            id: k.BlockAdditional,
                                            data: r.additions
                                        }
                                    ]
                                }
                            ]
                        } : null,
                        u > 0 ? {
                            id: k.BlockDuration,
                            data: u
                        } : null
                    ]
                };
                this.ebmlWriter.writeEBML(l);
            } else {
                c.setUint8(3, +(r.type === "key") << 7);
                const l = {
                    id: k.SimpleBlock,
                    data: [
                        o,
                        r.data
                    ]
                };
                this.ebmlWriter.writeEBML(l);
            }
            this.startTimestamp = Math.min(this.startTimestamp, n), this.endTimestamp = Math.max(this.endTimestamp, n + u), e.lastWrittenMsTimestamp = n, this.trackDatasInCurrentCluster.has(e) || this.trackDatasInCurrentCluster.set(e, {
                firstMsTimestamp: n
            }), this.currentClusterMaxMsTimestamp = Math.max(this.currentClusterMaxMsTimestamp, n);
        }
        createNewCluster(e) {
            this.currentCluster && this.finalizeCurrentCluster(), this.format._options.onCluster && this.writer.startTrackingWrites(), this.currentCluster = {
                id: k.Cluster,
                size: this.format._options.appendOnly ? -1 : ma,
                data: [
                    {
                        id: k.Timestamp,
                        data: e
                    }
                ]
            }, this.ebmlWriter.writeEBML(this.currentCluster), this.currentClusterStartMsTimestamp = e, this.currentClusterMaxMsTimestamp = e, this.trackDatasInCurrentCluster.clear();
        }
        finalizeCurrentCluster() {
            if (p(this.currentCluster), !this.format._options.appendOnly) {
                const i = this.writer.getPos() - this.ebmlWriter.dataOffsets.get(this.currentCluster), s = this.writer.getPos();
                this.writer.seek(this.ebmlWriter.offsets.get(this.currentCluster) + 4), this.ebmlWriter.writeVarInt(i, ma), this.writer.seek(s);
            }
            if (this.format._options.onCluster) {
                p(this.currentClusterStartMsTimestamp !== null);
                const { data: i, start: s } = this.writer.stopTrackingWrites();
                this.format._options.onCluster(i, s, this.currentClusterStartMsTimestamp / 1e3);
            }
            const e = this.ebmlWriter.offsets.get(this.currentCluster) - this.segmentDataOffset, r = new Map;
            for (const [i, { firstMsTimestamp: s }] of this.trackDatasInCurrentCluster)r.has(s) || r.set(s, []), r.get(s).push(i);
            const n = [
                ...r.entries()
            ].sort((i, s)=>i[0] - s[0]);
            for (const [i, s] of n)p(this.cues), this.cues.data.push({
                id: k.CuePoint,
                data: [
                    {
                        id: k.CueTime,
                        data: i
                    },
                    ...s.map((a)=>({
                            id: k.CueTrackPositions,
                            data: [
                                {
                                    id: k.CueTrack,
                                    data: a.track.id
                                },
                                {
                                    id: k.CueClusterPosition,
                                    data: e
                                }
                            ]
                        }))
                ]
            });
        }
        async onTrackClose(e) {
            const r = await this.mutex.acquire(), n = this.trackDatas.find((i)=>i.track === e);
            n && (n.closed = !0), this.allTracksAreKnown() && this.allTracksKnown.resolve(), await this.interleaveChunks(), r();
        }
        async finalize() {
            const e = await this.mutex.acquire();
            this.allTracksKnown.resolve();
            for (const r of this.trackDatas)r.closed = !0;
            if (this.segment || this.createSegment(), await this.interleaveChunks(!0), this.currentCluster && this.finalizeCurrentCluster(), p(this.cues), this.ebmlWriter.writeEBML(this.cues), !this.format._options.appendOnly) {
                const r = this.writer.getPos() - this.segmentDataOffset;
                this.writer.seek(this.ebmlWriter.offsets.get(this.segment) + 4), this.ebmlWriter.writeVarInt(r, ha);
                const n = this.startTimestamp === 1 / 0 ? 0 : this.endTimestamp - this.startTimestamp;
                this.segmentDuration.data = new li(n), this.writer.seek(this.ebmlWriter.offsets.get(this.segmentDuration)), this.ebmlWriter.writeEBML(this.segmentDuration), p(this.seekHead), this.writer.seek(this.ebmlWriter.offsets.get(this.seekHead)), this.maybeCreateSeekHead(!0), this.ebmlWriter.writeEBML(this.seekHead);
            }
            e();
        }
    }
    class bf {
        constructor(e){
            this.sourceSampleRate = null, this.sourceNumberOfChannels = null, this.maxWrittenFrame = null, this.targetSampleRate = e.targetSampleRate, this.targetNumberOfChannels = e.targetNumberOfChannels, this.endTime = e.endTime, this.onSample = e.onSample, this.bufferSizeInFrames = Math.floor(this.targetSampleRate * 5), this.bufferSizeInSamples = this.bufferSizeInFrames * this.targetNumberOfChannels, this.outputBuffer = new Float32Array(this.bufferSizeInSamples), this.bufferStartFrame = Math.floor(e.startTime * this.targetSampleRate), this.timestampOffset = e.startTime - this.bufferStartFrame / this.targetSampleRate;
        }
        doChannelMixerSetup() {
            p(this.sourceNumberOfChannels !== null);
            const e = this.sourceNumberOfChannels, r = this.targetNumberOfChannels;
            e === 1 && r === 2 ? this.channelMixer = (n, i)=>n[i * e] : e === 1 && r === 4 ? this.channelMixer = (n, i, s)=>n[i * e] * +(s < 2) : e === 1 && r === 6 ? this.channelMixer = (n, i, s)=>n[i * e] * +(s === 2) : e === 2 && r === 1 ? this.channelMixer = (n, i)=>{
                const s = i * e;
                return .5 * (n[s] + n[s + 1]);
            } : e === 2 && r === 4 ? this.channelMixer = (n, i, s)=>n[i * e + s] * +(s < 2) : e === 2 && r === 6 ? this.channelMixer = (n, i, s)=>n[i * e + s] * +(s < 2) : e === 4 && r === 1 ? this.channelMixer = (n, i)=>{
                const s = i * e;
                return .25 * (n[s] + n[s + 1] + n[s + 2] + n[s + 3]);
            } : e === 4 && r === 2 ? this.channelMixer = (n, i, s)=>{
                const a = i * e;
                return .5 * (n[a + s] + n[a + s + 2]);
            } : e === 4 && r === 6 ? this.channelMixer = (n, i, s)=>{
                const a = i * e;
                return s < 2 ? n[a + s] : s === 2 || s === 3 ? 0 : n[a + s - 2];
            } : e === 6 && r === 1 ? this.channelMixer = (n, i)=>{
                const s = i * e;
                return Math.SQRT1_2 * (n[s] + n[s + 1]) + n[s + 2] + .5 * (n[s + 4] + n[s + 5]);
            } : e === 6 && r === 2 ? this.channelMixer = (n, i, s)=>{
                const a = i * e;
                return n[a + s] + Math.SQRT1_2 * (n[a + 2] + n[a + s + 4]);
            } : e === 6 && r === 4 ? this.channelMixer = (n, i, s)=>{
                const a = i * e;
                return s < 2 ? n[a + s] + Math.SQRT1_2 * n[a + 2] : n[a + s + 2];
            } : this.channelMixer = (n, i, s)=>s < e ? n[i * e + s] : 0;
        }
        ensureTempBufferSize(e) {
            let r = this.tempSourceBuffer.length;
            for(; r < e;)r *= 2;
            if (r !== this.tempSourceBuffer.length) {
                const n = new Float32Array(r);
                n.set(this.tempSourceBuffer), this.tempSourceBuffer = n;
            }
        }
        async add(e) {
            this.sourceSampleRate === null && (this.sourceSampleRate = e.sampleRate, this.sourceNumberOfChannels = e.numberOfChannels, this.tempSourceBuffer = new Float32Array(this.sourceSampleRate * this.sourceNumberOfChannels), this.doChannelMixerSetup());
            const r = e.numberOfFrames * e.numberOfChannels;
            this.ensureTempBufferSize(r);
            const n = e.allocationSize({
                planeIndex: 0,
                format: "f32"
            }), i = new Float32Array(this.tempSourceBuffer.buffer, 0, n / 4);
            e.copyTo(i, {
                planeIndex: 0,
                format: "f32"
            });
            const s = e.timestamp, a = Math.min(e.timestamp + e.duration, this.endTime), o = Math.floor(s * this.targetSampleRate), c = Math.ceil(a * this.targetSampleRate);
            for(let u = o; u < c; u++){
                if (u < this.bufferStartFrame) continue;
                for(; u >= this.bufferStartFrame + this.bufferSizeInFrames;)await this.finalizeCurrentBuffer(), this.bufferStartFrame += this.bufferSizeInFrames;
                const l = u - this.bufferStartFrame;
                p(l < this.bufferSizeInFrames);
                const h = (u / this.targetSampleRate - s) * this.sourceSampleRate, g = Math.floor(h), m = Math.ceil(h), b = h - g;
                for(let _ = 0; _ < this.targetNumberOfChannels; _++){
                    let w = 0, y = 0;
                    g >= 0 && g < e.numberOfFrames && (w = this.channelMixer(i, g, _)), m >= 0 && m < e.numberOfFrames && (y = this.channelMixer(i, m, _));
                    const T = w + b * (y - w), S = l * this.targetNumberOfChannels + _;
                    this.outputBuffer[S] += T;
                }
                this.maxWrittenFrame === null ? this.maxWrittenFrame = l : this.maxWrittenFrame = Math.max(this.maxWrittenFrame, l);
            }
        }
        async finalizeCurrentBuffer() {
            if (this.maxWrittenFrame === null) return;
            const e = (this.maxWrittenFrame + 1) * this.targetNumberOfChannels, r = new Float32Array(e);
            r.set(this.outputBuffer.subarray(0, e));
            const n = this.bufferStartFrame / this.targetSampleRate, i = new Te({
                format: "f32",
                sampleRate: this.targetSampleRate,
                numberOfChannels: this.targetNumberOfChannels,
                timestamp: n + this.timestampOffset,
                data: r
            });
            await this.onSample(i), this.outputBuffer.fill(0), this.maxWrittenFrame = null;
        }
        finalize() {
            return this.finalizeCurrentBuffer();
        }
    }
    class Zi {
        constructor(){
            this._connectedTrack = null, this._closingPromise = null, this._closed = !1;
        }
        _ensureValidAdd() {
            if (!this._connectedTrack) throw new Error("Source is not connected to an output track.");
            if (this._connectedTrack.output.state === "canceled") throw new Error("Output has been canceled.");
            if (this._connectedTrack.output.state === "finalizing" || this._connectedTrack.output.state === "finalized") throw new Error("Output has been finalized.");
            if (this._connectedTrack.output.state === "pending") throw new Error("Output has not started.");
            if (this._closed) throw new Error("Source is closed.");
        }
        async _start() {}
        async _flushAndClose(e) {}
        close() {
            if (this._closingPromise) return;
            const e = this._connectedTrack;
            if (!e) throw new Error("Cannot call close without connecting the source to an output track.");
            if (e.output.state === "pending") throw new Error("Cannot call close before output has been started.");
            this._closingPromise = (async ()=>{
                await this._flushAndClose(!1), this._closed = !0, !(e.output.state === "finalizing" || e.output.state === "finalized") && e.output._muxer.onTrackClose(e);
            })();
        }
        async _flushOrWaitForOngoingClose(e) {
            return this._closingPromise ??= (async ()=>{
                await this._flushAndClose(e), this._closed = !0;
            })();
        }
    }
    class Vo extends Zi {
        constructor(e){
            if (super(), this._connectedTrack = null, !Fe.includes(e)) throw new TypeError(`Invalid video codec '${e}'. Must be one of: ${Fe.join(", ")}.`);
            this._codec = e;
        }
    }
    const pa = (t, e)=>{
        if (t.metadata.hasOnlyKeyPackets && e.type !== "key") throw new Error("Cannot add non-key packets to a hasOnlyKeyPackets video track.");
    };
    class wf {
        constructor(e, r){
            this.source = e, this.encodingConfig = r, this.ensureEncoderPromise = null, this.encoderInitialized = !1, this.encoder = null, this.muxer = null, this.lastMultipleOfKeyFrameInterval = -1, this.codedWidth = null, this.codedHeight = null, this.outputWidth = null, this.outputHeight = null, this.frameRateLastSample = null, this.frameRateLastTimestamp = null, this.frameRateLastEndTimestamp = null, this.preciseTimings = [], this.customEncoder = null, this.customEncoderCallSerializer = new Fr, this.customEncoderQueueSize = 0, this.alphaEncoder = null, this.splitter = null, this.splitterCreationFailed = !1, this.alphaFrameQueue = [], this.error = null, this.lastMuxerPromise = Promise.resolve();
        }
        async add(e, r, n) {
            const i = e;
            try {
                this.checkForEncoderError(), this.source._ensureValidAdd();
                const s = this.encodingConfig, a = s.sizeChangeBehavior ?? "deny";
                let o = !1;
                if (this.codedWidth !== null && this.codedHeight !== null) {
                    if ((e.codedWidth !== this.codedWidth || e.codedHeight !== this.codedHeight) && (o = !0, a === "deny")) throw new Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`);
                } else this.codedWidth = e.codedWidth, this.codedHeight = e.codedHeight;
                if (s.transform?.width !== void 0 || s.transform?.height !== void 0 || s.transform?.rotate !== void 0 || s.transform?.crop !== void 0 || s.transform?.force === !0 || o && a !== "passThrough") {
                    let d = s.transform?.width, f = s.transform?.height, h = s.transform?.fit ?? "fill";
                    o && a !== "passThrough" && (p(this.outputWidth), p(this.outputHeight), p(a !== "deny"), d = this.outputWidth, f = this.outputHeight, h = a);
                    const g = await e.transform({
                        width: d,
                        height: f,
                        roundDimensionsTo: 2,
                        crop: s.transform?.crop,
                        rotate: s.transform?.rotate,
                        fit: h,
                        alpha: s.alpha
                    });
                    (this.outputWidth === null || this.outputHeight === null) && (this.outputWidth = g.displayWidth, this.outputHeight = g.displayHeight), r && e.close(), e = g, r = !0;
                } else (this.outputWidth === null || this.outputHeight === null) && (this.outputWidth = e.codedWidth, this.outputHeight = e.codedHeight);
                const l = s.transform?.frameRate;
                if (l !== void 0) {
                    const d = e.timestamp + e.duration, f = fs(e.timestamp, l);
                    if (this.frameRateLastSample !== null) if (f <= this.frameRateLastTimestamp) {
                        this.frameRateLastSample.close(), this.frameRateLastSample = e.clone(), this.frameRateLastEndTimestamp = d;
                        return;
                    } else await this.padFrameRate(f, n);
                    e === i && (e = e.clone(), r = !0), e.setTimestamp(f), e.setDuration(1 / l), this.frameRateLastSample?.close(), this.frameRateLastSample = e.clone(), this.frameRateLastTimestamp = f, this.frameRateLastEndTimestamp = d;
                }
                await this.processAndEncode(e, n);
            } finally{
                r && e.close();
            }
        }
        async processAndEncode(e, r) {
            const n = this.encodingConfig;
            let i;
            if (n.transform?.process) {
                let s = n.transform.process(e);
                if (s instanceof Promise && (s = await s), s === null) return;
                Array.isArray(s) || (s = [
                    s
                ]), i = s.map((a)=>a instanceof we ? a : typeof VideoFrame < "u" && a instanceof VideoFrame ? new we(a) : new we(a, {
                        timestamp: e.timestamp,
                        duration: e.duration
                    }));
            } else i = [
                e
            ];
            try {
                for (const s of i){
                    this.encoderInitialized || (this.ensureEncoderPromise || this.ensureEncoder(s), this.encoderInitialized || await this.ensureEncoderPromise), p(this.encoderInitialized);
                    const a = this.encodingConfig.keyFrameInterval ?? 2, o = Math.floor(s.timestamp / a), c = {
                        ...r,
                        keyFrame: r?.keyFrame || a === 0 || o !== this.lastMultipleOfKeyFrameInterval
                    };
                    if (this.lastMultipleOfKeyFrameInterval = o, this.customEncoder) {
                        this.customEncoderQueueSize++;
                        const u = s.clone(), l = this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(u, c)).then(()=>this.customEncoderQueueSize--).catch((d)=>this.error ??= d).finally(()=>{
                            u.close();
                        });
                        this.customEncoderQueueSize >= 4 && await l;
                    } else {
                        p(this.encoder);
                        const u = s.toVideoFrame(), l = K(this.preciseTimings, u.timestamp, (f)=>f.microsecondTimestamp), d = l !== -1 ? this.preciseTimings[l] : null;
                        if (d && d.microsecondTimestamp === u.timestamp ? (d.timestamp !== s.timestamp && (d.timestampIsValid = !1), d.duration !== s.duration && (d.durationIsValid = !1)) : (this.preciseTimings.splice(l + 1, 0, {
                            microsecondTimestamp: u.timestamp,
                            timestamp: s.timestamp,
                            duration: s.duration,
                            timestampIsValid: !0,
                            durationIsValid: !0
                        }), this.preciseTimings.length > 128 && this.preciseTimings.shift()), !this.alphaEncoder) this.encoder.encode(u, c), u.close();
                        else if (!!u.format && !u.format.includes("A") || this.splitterCreationFailed) this.alphaFrameQueue.push(null), this.encoder.encode(u, c), u.close();
                        else {
                            const h = u.displayWidth, g = u.displayHeight;
                            this.splitter || (this.splitter = new Bn(h, g));
                            const { colorFrame: m, alphaFrame: b } = await this.splitter.update(u);
                            this.alphaFrameQueue.push(b), this.encoder.encode(m, c), m.close();
                        }
                        this.encoder.encodeQueueSize >= 4 && await new Promise((f)=>this.encoder.addEventListener("dequeue", f, {
                                once: !0
                            }));
                    }
                    await this.lastMuxerPromise;
                }
            } finally{
                for (const s of i)s !== e && s.close();
            }
        }
        async padFrameRate(e, r) {
            const n = this.encodingConfig.transform.frameRate;
            p(this.frameRateLastSample);
            const i = Math.round((e - this.frameRateLastTimestamp) * n);
            for(let s = 1; s < i; s++){
                const a = this.frameRateLastSample.clone();
                a.setTimestamp(this.frameRateLastTimestamp + s / n), a.setDuration(1 / n), await this.processAndEncode(a, r), a.close();
            }
        }
        ensureEncoder(e) {
            this.ensureEncoderPromise = (async ()=>{
                const r = Cl({
                    ...this.encodingConfig,
                    width: e.codedWidth,
                    height: e.codedHeight,
                    squarePixelWidth: e.squarePixelWidth,
                    squarePixelHeight: e.squarePixelHeight,
                    framerate: this.source._connectedTrack?.metadata.frameRate
                });
                this.encodingConfig.onEncoderConfig?.(r);
                const n = Al.find((i)=>i.supports(this.encodingConfig.codec, r));
                if (n) this.customEncoder = new n, this.customEncoder.codec = this.encodingConfig.codec, this.customEncoder.config = r, this.customEncoder.onPacket = (i, s)=>{
                    if (!(i instanceof te)) throw new TypeError("The first argument passed to onPacket must be an EncodedPacket.");
                    if (s !== void 0 && (!s || typeof s != "object")) throw new TypeError("The second argument passed to onPacket must be an object or undefined.");
                    pa(this.source._connectedTrack, i), this.encodingConfig.onEncodedPacket?.(i, s), this.lastMuxerPromise = this.muxer.addEncodedVideoPacket(this.source._connectedTrack, i, s).catch((a)=>{
                        this.error ??= a;
                    });
                }, await this.customEncoder.init();
                else {
                    if (typeof VideoEncoder > "u") throw new Error("VideoEncoder is not supported by this browser.");
                    if (r.alpha = "discard", this.encodingConfig.alpha === "keep" && (r.latencyMode = "quality"), (r.width % 2 === 1 || r.height % 2 === 1) && (this.encodingConfig.codec === "avc" || this.encodingConfig.codec === "hevc")) throw new Error(`The dimensions ${r.width}x${r.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);
                    if (!(await VideoEncoder.isConfigSupported(r)).supported) throw new Error(`This specific encoder configuration (${r.codec}, ${r.bitrate} bps, ${r.width}x${r.height}, hardware acceleration: ${r.hardwareAcceleration ?? "no-preference"}) is not supported by this browser. Consider using another codec or changing your video parameters.`);
                    const a = [], o = [];
                    let c = 0, u = 0;
                    const l = (f, h, g)=>{
                        const m = {};
                        if (h) {
                            const y = new Uint8Array(h.byteLength);
                            h.copyTo(y), m.alpha = y;
                        }
                        let b = te.fromEncodedChunk(f, m);
                        const _ = K(this.preciseTimings, f.timestamp, (y)=>y.microsecondTimestamp), w = _ !== -1 ? this.preciseTimings[_] : null;
                        w && w.microsecondTimestamp === f.timestamp && (b = b.clone({
                            timestamp: w.timestampIsValid ? w.timestamp : void 0,
                            duration: w.durationIsValid ? w.duration : void 0
                        })), pa(this.source._connectedTrack, b), this.encodingConfig.onEncodedPacket?.(b, g), this.lastMuxerPromise = this.muxer.addEncodedVideoPacket(this.source._connectedTrack, b, g).catch((y)=>{
                            this.error ??= y;
                        });
                    }, d = new Error("Encoding error").stack;
                    if (this.encoder = new VideoEncoder({
                        output: (f, h)=>{
                            if (!this.alphaEncoder) {
                                l(f, null, h);
                                return;
                            }
                            const g = this.alphaFrameQueue.shift();
                            p(g !== void 0), g ? (this.alphaEncoder.encode(g, {
                                keyFrame: f.type === "key"
                            }), u++, g.close(), a.push({
                                chunk: f,
                                meta: h
                            })) : u === 0 ? l(f, null, h) : (o.push(c + u), a.push({
                                chunk: f,
                                meta: h
                            }));
                        },
                        error: (f)=>{
                            f.stack = d, this.error ??= f;
                        }
                    }), this.encoder.configure(r), this.encodingConfig.alpha === "keep") {
                        const f = new Error("Encoding error").stack;
                        this.alphaEncoder = new VideoEncoder({
                            output: (h, g)=>{
                                u--;
                                const m = a.shift();
                                for(p(m !== void 0), l(m.chunk, h, m.meta), c++; o.length > 0 && o[0] === c;){
                                    o.shift();
                                    const b = a.shift();
                                    p(b !== void 0), l(b.chunk, null, b.meta);
                                }
                            },
                            error: (h)=>{
                                h.stack = f, this.error ??= h;
                            }
                        }), this.alphaEncoder.configure(r);
                    }
                }
                p(this.source._connectedTrack), this.muxer = this.source._connectedTrack.output._muxer, this.encoderInitialized = !0;
            })();
        }
        async flushAndClose(e) {
            if (e || this.checkForEncoderError(), !e && this.frameRateLastSample) {
                const r = this.encodingConfig.transform.frameRate, n = fs(this.frameRateLastEndTimestamp, r);
                await this.padFrameRate(n);
            }
            this.frameRateLastSample?.close(), this.frameRateLastSample = null, this.customEncoder ? (e || this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()), await this.customEncoderCallSerializer.call(()=>this.customEncoder.close())) : this.encoder && (e || (await this.encoder.flush(), await this.alphaEncoder?.flush()), this.encoder.state !== "closed" && this.encoder.close(), this.alphaEncoder && this.alphaEncoder.state !== "closed" && this.alphaEncoder.close(), this.alphaFrameQueue.forEach((r)=>r?.close()), this.splitter?.close()), e || this.checkForEncoderError();
        }
        getQueueSize() {
            return this.customEncoder ? this.customEncoderQueueSize : this.encoder?.encodeQueueSize ?? 0;
        }
        checkForEncoderError() {
            if (this.error) throw this.error;
        }
    }
    let ga = !1;
    class Bn {
        constructor(e, r){
            this.canvas = null, this.gl = null, this.colorProgram = null, this.alphaProgram = null, this.vao = null, this.sourceTexture = null, this.alphaResolutionLocation = null, this.worker = null, this.pendingRequests = new Map, this.nextRequestId = 0;
            const n = typeof OffscreenCanvas < "u" || typeof document < "u" && typeof document.createElement == "function";
            if (!Bn.forceCpu && n && !ga) try {
                typeof OffscreenCanvas < "u" ? this.canvas = new OffscreenCanvas(e, r) : (this.canvas = document.createElement("canvas"), this.canvas.width = e, this.canvas.height = r);
                const i = this.canvas.getContext("webgl2", {
                    alpha: !0
                });
                if (!i) throw new Error("Couldn't acquire WebGL 2 context.");
                this.gl = i, this.colorProgram = this.createColorProgram(), this.alphaProgram = this.createAlphaProgram(), this.vao = this.createVAO(), this.sourceTexture = this.createTexture(), this.alphaResolutionLocation = this.gl.getUniformLocation(this.alphaProgram, "u_resolution"), this.gl.useProgram(this.colorProgram), this.gl.uniform1i(this.gl.getUniformLocation(this.colorProgram, "u_sourceTexture"), 0), this.gl.useProgram(this.alphaProgram), this.gl.uniform1i(this.gl.getUniformLocation(this.alphaProgram, "u_sourceTexture"), 0);
            } catch (i) {
                this.gl = null, this.canvas = null, ga = !0, console.warn("Falling back to CPU for color/alpha splitting.", i);
            }
        }
        async update(e) {
            return this.gl ? this.updateGpu(e) : this.updateCpu(e);
        }
        updateGpu(e) {
            p(this.gl), p(this.canvas), (e.displayWidth !== this.canvas.width || e.displayHeight !== this.canvas.height) && (this.canvas.width = e.displayWidth, this.canvas.height = e.displayHeight), this.gl.activeTexture(this.gl.TEXTURE0), this.gl.bindTexture(this.gl.TEXTURE_2D, this.sourceTexture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, e);
            const r = this.runColorProgram(e), n = this.runAlphaProgram(e);
            return e.close(), {
                colorFrame: r,
                alphaFrame: n
            };
        }
        createVertexShader() {
            return p(this.gl), this.createShader(this.gl.VERTEX_SHADER, `#version 300 es
			in vec2 a_position;
			in vec2 a_texCoord;
			out vec2 v_texCoord;
			
			void main() {
				gl_Position = vec4(a_position, 0.0, 1.0);
				v_texCoord = a_texCoord;
			}
		`);
        }
        createColorProgram() {
            p(this.gl);
            const e = this.createVertexShader(), r = this.createShader(this.gl.FRAGMENT_SHADER, `#version 300 es
			precision highp float;
			
			uniform sampler2D u_sourceTexture;
			in vec2 v_texCoord;
			out vec4 fragColor;
			
			void main() {
				vec4 source = texture(u_sourceTexture, v_texCoord);
				fragColor = vec4(source.rgb, 1.0);
			}
		`), n = this.gl.createProgram();
            return this.gl.attachShader(n, e), this.gl.attachShader(n, r), this.gl.linkProgram(n), n;
        }
        createAlphaProgram() {
            p(this.gl);
            const e = this.createVertexShader(), r = this.createShader(this.gl.FRAGMENT_SHADER, `#version 300 es
			precision highp float;
			
			uniform sampler2D u_sourceTexture;
			uniform vec2 u_resolution; // The width and height of the canvas
			in vec2 v_texCoord;
			out vec4 fragColor;

			// This function determines the value for a single byte in the YUV stream
			float getByteValue(float byteOffset) {
				float width = u_resolution.x;
				float height = u_resolution.y;

				float yPlaneSize = width * height;

				if (byteOffset < yPlaneSize) {
					// This byte is in the luma plane. Find the corresponding pixel coordinates to sample from
					float y = floor(byteOffset / width);
					float x = mod(byteOffset, width);
					
					// Add 0.5 to sample the center of the texel
					vec2 sampleCoord = (vec2(x, y) + 0.5) / u_resolution;
					
					// The luma value is the alpha from the source texture
					return texture(u_sourceTexture, sampleCoord).a;
				} else {
					// Write a fixed value for chroma and beyond
					return 128.0 / 255.0;
				}
			}
			
			void main() {
				// Each fragment writes 4 bytes (R, G, B, A)
				float pixelIndex = floor(gl_FragCoord.y) * u_resolution.x + floor(gl_FragCoord.x);
				float baseByteOffset = pixelIndex * 4.0;

				vec4 result;
				for (int i = 0; i < 4; i++) {
					float currentByteOffset = baseByteOffset + float(i);
					result[i] = getByteValue(currentByteOffset);
				}
				
				fragColor = result;
			}
		`), n = this.gl.createProgram();
            return this.gl.attachShader(n, e), this.gl.attachShader(n, r), this.gl.linkProgram(n), n;
        }
        createShader(e, r) {
            p(this.gl);
            const n = this.gl.createShader(e);
            return this.gl.shaderSource(n, r), this.gl.compileShader(n), this.gl.getShaderParameter(n, this.gl.COMPILE_STATUS) || console.error("Shader compile error:", this.gl.getShaderInfoLog(n)), n;
        }
        createVAO() {
            p(this.gl), p(this.colorProgram);
            const e = this.gl.createVertexArray();
            this.gl.bindVertexArray(e);
            const r = new Float32Array([
                -1,
                -1,
                0,
                1,
                1,
                -1,
                1,
                1,
                -1,
                1,
                0,
                0,
                1,
                1,
                1,
                0
            ]), n = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, n), this.gl.bufferData(this.gl.ARRAY_BUFFER, r, this.gl.STATIC_DRAW);
            const i = this.gl.getAttribLocation(this.colorProgram, "a_position"), s = this.gl.getAttribLocation(this.colorProgram, "a_texCoord");
            return this.gl.enableVertexAttribArray(i), this.gl.vertexAttribPointer(i, 2, this.gl.FLOAT, !1, 16, 0), this.gl.enableVertexAttribArray(s), this.gl.vertexAttribPointer(s, 2, this.gl.FLOAT, !1, 16, 8), e;
        }
        createTexture() {
            p(this.gl);
            const e = this.gl.createTexture();
            return this.gl.bindTexture(this.gl.TEXTURE_2D, e), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR), e;
        }
        runColorProgram(e) {
            return p(this.gl), p(this.canvas), this.gl.useProgram(this.colorProgram), this.gl.viewport(0, 0, this.canvas.width, this.canvas.height), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.gl.bindVertexArray(this.vao), this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4), new VideoFrame(this.canvas, {
                timestamp: e.timestamp,
                duration: e.duration ?? void 0,
                alpha: "discard"
            });
        }
        runAlphaProgram(e) {
            p(this.gl), p(this.canvas), this.gl.useProgram(this.alphaProgram), this.gl.uniform2f(this.alphaResolutionLocation, this.canvas.width, this.canvas.height), this.gl.viewport(0, 0, this.canvas.width, this.canvas.height), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.gl.bindVertexArray(this.vao), this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            const { width: r, height: n } = this.canvas, i = Math.ceil(r / 2) * Math.ceil(n / 2), s = r * n + i * 2, a = Math.ceil(s / (r * 4));
            let o = new Uint8Array(4 * r * a);
            this.gl.readPixels(0, 0, r, a, this.gl.RGBA, this.gl.UNSIGNED_BYTE, o), o = o.subarray(0, s), p(o[r * n] === 128), p(o[o.length - 1] === 128);
            const c = {
                format: "I420",
                codedWidth: r,
                codedHeight: n,
                timestamp: e.timestamp,
                duration: e.duration ?? void 0,
                transfer: [
                    o.buffer
                ]
            };
            return new VideoFrame(o, c);
        }
        updateCpu(e) {
            if (!this.worker) {
                const i = new Blob([
                    `(${yf.toString()})()`
                ], {
                    type: "application/javascript"
                }), s = URL.createObjectURL(i);
                this.worker = new Worker(s), URL.revokeObjectURL(s), this.worker.addEventListener("message", (a)=>{
                    const o = a.data, c = this.pendingRequests.get(o.id);
                    c && (this.pendingRequests.delete(o.id), "error" in o ? c.reject(new Error(o.error)) : c.resolve({
                        colorFrame: o.colorFrame,
                        alphaFrame: o.alphaFrame
                    }));
                }), this.worker.addEventListener("error", (a)=>{
                    const o = new Error(a.message || "Color/alpha splitter worker error.");
                    for (const c of this.pendingRequests.values())c.reject(o);
                    this.pendingRequests.clear();
                });
            }
            const r = this.nextRequestId++, n = le();
            return this.pendingRequests.set(r, n), this.worker.postMessage({
                id: r,
                sourceFrame: e
            }, {
                transfer: [
                    e
                ]
            }), n.promise;
        }
        close() {
            this.gl?.getExtension("WEBGL_lose_context")?.loseContext(), this.gl = null, this.canvas = null, this.worker?.terminate(), this.worker = null;
            const e = new Error("Color/alpha splitter closed.");
            for (const r of this.pendingRequests.values())r.reject(e);
            this.pendingRequests.clear();
        }
    }
    Bn.forceCpu = !0;
    const yf = ()=>{
        let t = null, e = Promise.resolve();
        self.addEventListener("message", (s)=>{
            const { id: a, sourceFrame: o } = s.data;
            e = e.then(async ()=>{
                try {
                    const { colorFrame: c, alphaFrame: u } = await r(o);
                    self.postMessage({
                        id: a,
                        colorFrame: c,
                        alphaFrame: u
                    }, {
                        transfer: [
                            c,
                            u
                        ]
                    });
                } catch (c) {
                    self.postMessage({
                        id: a,
                        error: c.message
                    });
                } finally{
                    o.close();
                }
            });
        });
        const r = async (s)=>{
            const a = s.format;
            if (!a) throw new Error("CPU color/alpha splitting requires a known VideoFrame format.");
            const o = s.codedWidth, c = s.codedHeight, u = s.allocationSize();
            if ((!t || t.byteLength !== u) && (t = new Uint8Array(u)), await s.copyTo(t), a === "RGBA" || a === "BGRA") return n(t, o, c, a, s);
            if (a === "I420A" || a === "I420AP10" || a === "I420AP12" || a === "I422A" || a === "I422AP10" || a === "I422AP12" || a === "I444A" || a === "I444AP10" || a === "I444AP12") return i(t, o, c, a, s);
            throw new Error(`CPU color/alpha splitting does not support format '${a}'.`);
        }, n = (s, a, o, c, u)=>{
            const l = a * o, d = Math.ceil(a / 2), f = Math.ceil(o / 2), h = l + d * f * 2, g = new Uint8Array(h);
            for(let w = 0, y = 3; w < l; w++, y += 4)g[w] = s[y];
            g.fill(128, l);
            const m = new VideoFrame(s, {
                format: c === "RGBA" ? "RGBX" : "BGRX",
                codedWidth: a,
                codedHeight: o,
                timestamp: u.timestamp,
                duration: u.duration ?? void 0
            }), b = {
                format: "I420",
                codedWidth: a,
                codedHeight: o,
                timestamp: u.timestamp,
                duration: u.duration ?? void 0,
                transfer: [
                    g.buffer
                ]
            }, _ = new VideoFrame(g, b);
            return {
                colorFrame: m,
                alphaFrame: _
            };
        }, i = (s, a, o, c, u)=>{
            const l = c.includes("P10"), d = c.includes("P12"), f = l || d ? 2 : 1;
            let h, g;
            c.startsWith("I420") ? (h = Math.ceil(a / 2), g = Math.ceil(o / 2)) : c.startsWith("I422") ? (h = Math.ceil(a / 2), g = o) : (h = a, g = o);
            const m = a * o, b = h * g, _ = m * f, w = b * f, y = m * f, T = _ + w * 2, S = c.replace("A", ""), C = Math.ceil(a / 2), I = Math.ceil(o / 2), P = C * I, x = P * f, v = y + 2 * x, R = new Uint8Array(v), B = T;
            R.set(s.subarray(B, B + y), 0);
            const L = y, q = l ? 512 : d ? 2048 : 128;
            f === 1 ? R.fill(q, L) : new Uint16Array(R.buffer, L, 2 * P).fill(q);
            const V = l ? "I420P10" : d ? "I420P12" : "I420", W = new VideoFrame(s.subarray(0, T), {
                format: S,
                codedWidth: a,
                codedHeight: o,
                timestamp: u.timestamp,
                duration: u.duration ?? void 0
            }), oe = {
                format: V,
                codedWidth: a,
                codedHeight: o,
                timestamp: u.timestamp,
                duration: u.duration ?? void 0,
                transfer: [
                    R.buffer
                ]
            }, pe = new VideoFrame(R, oe);
            return {
                colorFrame: W,
                alphaFrame: pe
            };
        };
    };
    bS = class extends Vo {
        constructor(e, r){
            if (!(typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) && !(typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas)) throw new TypeError("canvas must be an HTMLCanvasElement or OffscreenCanvas.");
            xl(r), super(r.codec), this._encoder = new wf(this, r), this._canvas = e;
        }
        add(e, r = 0, n) {
            if (!Number.isFinite(e) || e < 0) throw new TypeError("timestamp must be a non-negative number.");
            if (!Number.isFinite(r) || r < 0) throw new TypeError("duration must be a non-negative number.");
            const i = new we(this._canvas, {
                timestamp: e,
                duration: r
            });
            return this._encoder.add(i, !0, n);
        }
        _flushAndClose(e) {
            return this._encoder.flushAndClose(e);
        }
    };
    class Ho extends Zi {
        constructor(e){
            if (super(), this._connectedTrack = null, !ct.includes(e)) throw new TypeError(`Invalid audio codec '${e}'. Must be one of: ${ct.join(", ")}.`);
            this._codec = e;
        }
    }
    class kf {
        constructor(e, r){
            this.source = e, this.encodingConfig = r, this.ensureEncoderPromise = null, this.encoderInitialized = !1, this.encoder = null, this.muxer = null, this.lastNumberOfChannels = null, this.lastSampleRate = null, this.isPcmEncoder = !1, this.outputSampleSize = null, this.writeOutputValue = null, this.customEncoder = null, this.customEncoderCallSerializer = new Fr, this.customEncoderQueueSize = 0, this.lastEndSampleIndex = null, this.resampler = null, this.error = null, this.lastMuxerPromise = Promise.resolve();
        }
        async add(e, r) {
            try {
                if (this.checkForEncoderError(), this.source._ensureValidAdd(), this.lastNumberOfChannels !== null && this.lastSampleRate !== null) {
                    if (e.numberOfChannels !== this.lastNumberOfChannels || e.sampleRate !== this.lastSampleRate) throw new Error(`Audio parameters must remain constant. Expected ${this.lastNumberOfChannels} channels at ${this.lastSampleRate} Hz, got ${e.numberOfChannels} channels at ${e.sampleRate} Hz.`);
                } else this.lastNumberOfChannels = e.numberOfChannels, this.lastSampleRate = e.sampleRate;
                const n = this.encodingConfig;
                n.transform?.numberOfChannels !== void 0 || n.transform?.sampleRate !== void 0 ? (this.resampler || (this.resampler = new bf({
                    targetNumberOfChannels: n.transform.numberOfChannels ?? e.numberOfChannels,
                    targetSampleRate: n.transform.sampleRate ?? e.sampleRate,
                    startTime: e.timestamp,
                    endTime: 1 / 0,
                    onSample: async (s)=>{
                        await this.processAndEncode(s, !0);
                    }
                })), await this.resampler.add(e)) : await this.processAndEncode(e, r);
            } finally{
                r && e.close();
            }
        }
        async processAndEncode(e, r) {
            const n = this.encodingConfig;
            if (n.transform?.sampleFormat !== void 0 && kl(e.format) !== n.transform.sampleFormat) {
                const i = Sl(e, n.transform.sampleFormat);
                r && e.close(), e = i, r = !0;
            }
            if (n.transform?.process) {
                let i = n.transform.process(e);
                if (i instanceof Promise && (i = await i), i === null) return;
                Array.isArray(i) || (i = [
                    i
                ]);
                for (const s of i){
                    if (!(s instanceof Te)) throw new TypeError("The audio process function must return an AudioSample, null, or an array of AudioSamples.");
                    await this.encodeSample(s, !0);
                }
                r && e.close();
            } else await this.encodeSample(e, r);
        }
        async encodeSample(e, r) {
            try {
                this.encoderInitialized || (this.ensureEncoderPromise || this.ensureEncoder(e), this.encoderInitialized || await this.ensureEncoderPromise), p(this.encoderInitialized);
                {
                    const n = Math.round(e.timestamp * e.sampleRate), i = Math.round((e.timestamp + e.duration) * e.sampleRate);
                    if (this.lastEndSampleIndex === null) this.lastEndSampleIndex = i;
                    else {
                        const s = n - this.lastEndSampleIndex;
                        if (s >= 64) {
                            const a = new Te({
                                data: new Float32Array(s * e.numberOfChannels),
                                format: "f32-planar",
                                sampleRate: e.sampleRate,
                                numberOfChannels: e.numberOfChannels,
                                numberOfFrames: s,
                                timestamp: this.lastEndSampleIndex / e.sampleRate
                            });
                            await this.encodeSample(a, !0);
                        }
                        this.lastEndSampleIndex += e.numberOfFrames;
                    }
                }
                if (this.customEncoder) {
                    this.customEncoderQueueSize++;
                    const n = e.clone(), i = this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(n)).then(()=>this.customEncoderQueueSize--).catch((s)=>this.error ??= s).finally(()=>{
                        n.close();
                    });
                    this.customEncoderQueueSize >= 4 && await i, await this.lastMuxerPromise;
                } else if (this.isPcmEncoder) await this.doPcmEncoding(e, r);
                else {
                    p(this.encoder);
                    const n = e.toAudioData();
                    this.encoder.encode(n), n.close(), r && e.close(), this.encoder.encodeQueueSize >= 4 && await new Promise((i)=>this.encoder.addEventListener("dequeue", i, {
                            once: !0
                        })), await this.lastMuxerPromise;
                }
            } finally{
                r && e.close();
            }
        }
        async doPcmEncoding(e, r) {
            p(this.outputSampleSize), p(this.writeOutputValue);
            const { numberOfChannels: n, numberOfFrames: i, sampleRate: s, timestamp: a } = e, o = 2048, c = [];
            for(let f = 0; f < i; f += o){
                const h = Math.min(o, e.numberOfFrames - f), g = h * n * this.outputSampleSize, m = new ArrayBuffer(g), b = new DataView(m);
                c.push({
                    frameCount: h,
                    view: b
                });
            }
            const u = e.allocationSize({
                planeIndex: 0,
                format: "f32-planar"
            }), l = new Float32Array(u / Float32Array.BYTES_PER_ELEMENT);
            for(let f = 0; f < n; f++){
                e.copyTo(l, {
                    planeIndex: f,
                    format: "f32-planar"
                });
                for(let h = 0; h < c.length; h++){
                    const { frameCount: g, view: m } = c[h];
                    for(let b = 0; b < g; b++)this.writeOutputValue(m, (b * n + f) * this.outputSampleSize, l[h * o + b]);
                }
            }
            r && e.close();
            const d = {
                decoderConfig: {
                    codec: this.encodingConfig.codec,
                    numberOfChannels: n,
                    sampleRate: s
                }
            };
            for(let f = 0; f < c.length; f++){
                const { frameCount: h, view: g } = c[f], m = g.buffer, b = f * o, _ = new te(new Uint8Array(m), "key", a + b / s, h / s);
                this.encodingConfig.onEncodedPacket?.(_, d), await this.muxer.addEncodedAudioPacket(this.source._connectedTrack, _, d);
            }
        }
        ensureEncoder(e) {
            this.ensureEncoderPromise = (async ()=>{
                const { numberOfChannels: r, sampleRate: n } = e, i = El({
                    numberOfChannels: r,
                    sampleRate: n,
                    ...this.encodingConfig
                });
                this.encodingConfig.onEncoderConfig?.(i);
                const s = Bl.find((a)=>a.supports(this.encodingConfig.codec, i));
                if (s) this.customEncoder = new s, this.customEncoder.codec = this.encodingConfig.codec, this.customEncoder.config = i, this.customEncoder.onPacket = (a, o)=>{
                    if (!(a instanceof te)) throw new TypeError("The first argument passed to onPacket must be an EncodedPacket.");
                    if (o !== void 0 && (!o || typeof o != "object")) throw new TypeError("The second argument passed to onPacket must be an object or undefined.");
                    this.encodingConfig.onEncodedPacket?.(a, o), this.lastMuxerPromise = this.muxer.addEncodedAudioPacket(this.source._connectedTrack, a, o).catch((c)=>{
                        this.error ??= c;
                    });
                }, await this.customEncoder.init();
                else if (be.includes(this.encodingConfig.codec)) this.initPcmEncoder();
                else {
                    if (typeof AudioEncoder > "u") throw new Error("AudioEncoder is not supported by this browser.");
                    if (!(await AudioEncoder.isConfigSupported(i)).supported) throw new Error(`This specific encoder configuration (${i.codec}, ${i.bitrate} bps, ${i.numberOfChannels} channels, ${i.sampleRate} Hz) is not supported by this browser. Consider using another codec or changing your audio parameters.`);
                    const o = new Error("Encoding error").stack;
                    this.encoder = new AudioEncoder({
                        output: (c, u)=>{
                            if (this.encodingConfig.codec === "aac" && u?.decoderConfig) {
                                let d = !1;
                                if (!u.decoderConfig.description || u.decoderConfig.description.byteLength < 2 ? d = !0 : d = Bi(he(u.decoderConfig.description)).objectType === 0, d) {
                                    const f = Number(ie(i.codec.split(".")));
                                    u.decoderConfig.description = Fi({
                                        objectType: f,
                                        numberOfChannels: u.decoderConfig.numberOfChannels,
                                        sampleRate: u.decoderConfig.sampleRate
                                    });
                                }
                            }
                            let l = te.fromEncodedChunk(c);
                            l = l.clone({
                                timestamp: cr(l.timestamp, i.sampleRate),
                                duration: c.duration != null ? cr(l.duration, i.sampleRate) : void 0
                            }), this.encodingConfig.onEncodedPacket?.(l, u), this.lastMuxerPromise = this.muxer.addEncodedAudioPacket(this.source._connectedTrack, l, u).catch((d)=>{
                                this.error ??= d;
                            });
                        },
                        error: (c)=>{
                            c.stack = o, this.error ??= c;
                        }
                    }), this.encoder.configure(i);
                }
                p(this.source._connectedTrack), this.muxer = this.source._connectedTrack.output._muxer, this.encoderInitialized = !0;
            })();
        }
        initPcmEncoder() {
            this.isPcmEncoder = !0;
            const e = this.encodingConfig.codec, { dataType: r, sampleSize: n, littleEndian: i } = $e(e);
            switch(this.outputSampleSize = n, n){
                case 1:
                    r === "unsigned" ? this.writeOutputValue = (s, a, o)=>s.setUint8(a, fe((o + 1) * 127.5, 0, 255)) : r === "signed" ? this.writeOutputValue = (s, a, o)=>{
                        s.setInt8(a, fe(Math.round(o * 128), -128, 127));
                    } : r === "ulaw" ? this.writeOutputValue = (s, a, o)=>{
                        const c = fe(Math.floor(o * 32767), -32768, 32767);
                        s.setUint8(a, Fl(c));
                    } : r === "alaw" ? this.writeOutputValue = (s, a, o)=>{
                        const c = fe(Math.floor(o * 32767), -32768, 32767);
                        s.setUint8(a, Ml(c));
                    } : p(!1);
                    break;
                case 2:
                    r === "unsigned" ? this.writeOutputValue = (s, a, o)=>s.setUint16(a, fe((o + 1) * 32767.5, 0, 65535), i) : r === "signed" ? this.writeOutputValue = (s, a, o)=>s.setInt16(a, fe(Math.round(o * 32767), -32768, 32767), i) : p(!1);
                    break;
                case 3:
                    r === "unsigned" ? this.writeOutputValue = (s, a, o)=>xi(s, a, fe((o + 1) * 83886075e-1, 0, 16777215), i) : r === "signed" ? this.writeOutputValue = (s, a, o)=>rc(s, a, fe(Math.round(o * 8388607), -8388608, 8388607), i) : p(!1);
                    break;
                case 4:
                    r === "unsigned" ? this.writeOutputValue = (s, a, o)=>s.setUint32(a, fe((o + 1) * 21474836475e-1, 0, 4294967295), i) : r === "signed" ? this.writeOutputValue = (s, a, o)=>s.setInt32(a, fe(Math.round(o * 2147483647), -2147483648, 2147483647), i) : r === "float" ? this.writeOutputValue = (s, a, o)=>s.setFloat32(a, o, i) : p(!1);
                    break;
                case 8:
                    r === "float" ? this.writeOutputValue = (s, a, o)=>s.setFloat64(a, o, i) : p(!1);
                    break;
                default:
                    je(n), p(!1);
            }
        }
        async flushAndClose(e) {
            e || this.checkForEncoderError(), !e && this.resampler && await this.resampler.finalize(), this.resampler = null, this.customEncoder ? (e || this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()), await this.customEncoderCallSerializer.call(()=>this.customEncoder.close())) : this.encoder && (e || await this.encoder.flush(), this.encoder.state !== "closed" && this.encoder.close()), e || this.checkForEncoderError();
        }
        getQueueSize() {
            return this.customEncoder ? this.customEncoderQueueSize : this.isPcmEncoder ? 0 : this.encoder?.encodeQueueSize ?? 0;
        }
        checkForEncoderError() {
            if (this.error) throw this.error;
        }
    }
    wS = class extends Ho {
        constructor(e){
            Il(e), super(e.codec), this._accumulatedTime = 0, this._encoder = new kf(this, e);
        }
        async add(e) {
            if (!(e instanceof AudioBuffer)) throw new TypeError("audioBuffer must be an AudioBuffer.");
            const r = Te._fromAudioBuffer(e, this._accumulatedTime);
            this._accumulatedTime += e.duration;
            for (const n of r)await this._encoder.add(n, !0);
        }
        _flushAndClose(e) {
            return this._encoder.flushAndClose(e);
        }
    };
    class Tf extends Zi {
        constructor(e){
            if (super(), this._connectedTrack = null, !zt.includes(e)) throw new TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${zt.join(", ")}.`);
            this._codec = e;
        }
    }
    class Ji {
        getSupportedVideoCodecs() {
            return this.getSupportedCodecs().filter((e)=>Fe.includes(e));
        }
        getSupportedAudioCodecs() {
            return this.getSupportedCodecs().filter((e)=>ct.includes(e));
        }
        getSupportedSubtitleCodecs() {
            return this.getSupportedCodecs().filter((e)=>zt.includes(e));
        }
        _codecUnsupportedHint(e) {
            return "";
        }
    }
    class es extends Ji {
        constructor(e = {}){
            if (!e || typeof e != "object") throw new TypeError("options must be an object.");
            if (e.fastStart !== void 0 && ![
                !1,
                "in-memory",
                "reserve",
                "fragmented"
            ].includes(e.fastStart)) throw new TypeError("options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.");
            if (e.minimumFragmentDuration !== void 0 && (!Number.isFinite(e.minimumFragmentDuration) || e.minimumFragmentDuration < 0)) throw new TypeError("options.minimumFragmentDuration, when provided, must be a non-negative number.");
            if (e.onFtyp !== void 0 && typeof e.onFtyp != "function") throw new TypeError("options.onFtyp, when provided, must be a function.");
            if (e.onMoov !== void 0 && typeof e.onMoov != "function") throw new TypeError("options.onMoov, when provided, must be a function.");
            if (e.onMdat !== void 0 && typeof e.onMdat != "function") throw new TypeError("options.onMdat, when provided, must be a function.");
            if (e.onMoof !== void 0 && typeof e.onMoof != "function") throw new TypeError("options.onMoof, when provided, must be a function.");
            if (e.metadataFormat !== void 0 && ![
                "mdir",
                "mdta",
                "udta",
                "auto"
            ].includes(e.metadataFormat)) throw new TypeError("options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.");
            super(), this._options = e;
        }
        getSupportedTrackCounts() {
            return {
                video: {
                    min: 0,
                    max: 4294967295
                },
                audio: {
                    min: 0,
                    max: 4294967295
                },
                subtitle: {
                    min: 0,
                    max: 4294967295
                },
                total: {
                    min: 1,
                    max: 4294967295
                }
            };
        }
        get supportsVideoRotationMetadata() {
            return !0;
        }
        get supportsTimestampedMediaData() {
            return !0;
        }
        _createMuxer(e) {
            return new hf(e, this);
        }
    }
    Sf = class extends es {
        constructor(e){
            super(e);
        }
        get _name() {
            return "MP4";
        }
        get fileExtension() {
            return ".mp4";
        }
        get mimeType() {
            return "video/mp4";
        }
        getSupportedCodecs() {
            return [
                ...Fe,
                ...yn,
                "pcm-s16",
                "pcm-s16be",
                "pcm-s24",
                "pcm-s24be",
                "pcm-s32",
                "pcm-s32be",
                "pcm-f32",
                "pcm-f32be",
                "pcm-f64",
                "pcm-f64be",
                ...zt
            ];
        }
        _codecUnsupportedHint(e) {
            return new qo().getSupportedCodecs().includes(e) ? " Switching to MOV will grant support for this codec." : "";
        }
    };
    class _a extends es {
        constructor(e){
            super(e);
        }
        get _name() {
            return "CMAF";
        }
        get fileExtension() {
            return ".m4s";
        }
        get mimeType() {
            return "video/mp4";
        }
        getSupportedCodecs() {
            return [
                ...Fe,
                ...yn,
                "pcm-s16",
                "pcm-s16be",
                "pcm-s24",
                "pcm-s24be",
                "pcm-s32",
                "pcm-s32be",
                "pcm-f32",
                "pcm-f32be",
                "pcm-f64",
                "pcm-f64be",
                ...zt
            ];
        }
    }
    class qo extends es {
        constructor(e){
            super(e);
        }
        get _name() {
            return "MOV";
        }
        get fileExtension() {
            return ".mov";
        }
        get mimeType() {
            return "video/quicktime";
        }
        getSupportedCodecs() {
            return [
                ...Fe,
                ...ct
            ];
        }
        _codecUnsupportedHint(e) {
            return new Sf().getSupportedCodecs().includes(e) ? " Switching to MP4 will grant support for this codec." : "";
        }
    }
    class ba extends Ji {
        constructor(e = {}){
            if (!e || typeof e != "object") throw new TypeError("options must be an object.");
            if (e.appendOnly !== void 0 && typeof e.appendOnly != "boolean") throw new TypeError("options.appendOnly, when provided, must be a boolean.");
            if (e.minimumClusterDuration !== void 0 && (!Number.isFinite(e.minimumClusterDuration) || e.minimumClusterDuration < 0)) throw new TypeError("options.minimumClusterDuration, when provided, must be a non-negative number.");
            if (e.onEbmlHeader !== void 0 && typeof e.onEbmlHeader != "function") throw new TypeError("options.onEbmlHeader, when provided, must be a function.");
            if (e.onSegmentHeader !== void 0 && typeof e.onSegmentHeader != "function") throw new TypeError("options.onHeader, when provided, must be a function.");
            if (e.onCluster !== void 0 && typeof e.onCluster != "function") throw new TypeError("options.onCluster, when provided, must be a function.");
            super(), this._options = e;
        }
        _createMuxer(e) {
            return new _f(e, this);
        }
        get _name() {
            return "Matroska";
        }
        getSupportedTrackCounts() {
            return {
                video: {
                    min: 0,
                    max: 127
                },
                audio: {
                    min: 0,
                    max: 127
                },
                subtitle: {
                    min: 0,
                    max: 127
                },
                total: {
                    min: 1,
                    max: 127
                }
            };
        }
        get fileExtension() {
            return ".mkv";
        }
        get mimeType() {
            return "video/x-matroska";
        }
        getSupportedCodecs() {
            return [
                ...Fe,
                ...yn,
                ...be.filter((e)=>![
                        "pcm-s8",
                        "pcm-f32be",
                        "pcm-f64be",
                        "ulaw",
                        "alaw"
                    ].includes(e)),
                ...zt
            ];
        }
        get supportsVideoRotationMetadata() {
            return !1;
        }
        get supportsTimestampedMediaData() {
            return !0;
        }
    }
    wa = class extends ba {
        constructor(e){
            super(e);
        }
        getSupportedCodecs() {
            return [
                ...Fe.filter((e)=>[
                        "vp8",
                        "vp9",
                        "av1"
                    ].includes(e)),
                ...ct.filter((e)=>[
                        "opus",
                        "vorbis"
                    ].includes(e)),
                ...zt
            ];
        }
        get _name() {
            return "WebM";
        }
        get fileExtension() {
            return ".webm";
        }
        get mimeType() {
            return "video/webm";
        }
        _codecUnsupportedHint(e) {
            return new ba().getSupportedCodecs().includes(e) ? " Switching to MKV will grant support for this codec." : "";
        }
    };
    const xf = [
        "video",
        "audio",
        "subtitle"
    ];
    class Vr {
        constructor(e, r, n, i, s){
            this.id = e, this.output = r, this.type = n, this.source = i, this.metadata = s;
        }
        isVideoTrack() {
            return this.type === "video";
        }
        isAudioTrack() {
            return this.type === "audio";
        }
        isSubtitleTrack() {
            return this.type === "subtitle";
        }
        canBePairedWith(e) {
            if (!(e instanceof Vr)) throw new TypeError("other must be an OutputTrack.");
            if (this === e) return !1;
            const r = ps(this.metadata.group), n = ps(e.metadata.group);
            for (const i of r)if (this.type !== e.type && n.some((o)=>i === o) || n.some((o)=>i._pairedGroups.has(o))) return !0;
            return !1;
        }
    }
    class Pf extends Vr {
        constructor(e, r, n, i){
            super(e, r, "video", n, i);
        }
    }
    class Cf extends Vr {
        constructor(e, r, n, i){
            super(e, r, "audio", n, i);
        }
    }
    class If extends Vr {
        constructor(e, r, n, i){
            super(e, r, "subtitle", n, i);
        }
    }
    class zr {
        constructor(){
            this._pairedGroups = new Set;
        }
        pairWith(e) {
            if (!(e instanceof zr)) throw new TypeError("other must be an OutputTrackGroup.");
            if (this === e) throw new TypeError("Cannot pair a group with itself.");
            this._pairedGroups.add(e), e._pairedGroups.add(this);
        }
    }
    const ti = (t)=>{
        if (!t || typeof t != "object") throw new TypeError("metadata must be an object.");
        if (t.languageCode !== void 0 && !Pi(t.languageCode)) throw new TypeError("metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.");
        if (t.name !== void 0 && typeof t.name != "string") throw new TypeError("metadata.name, when provided, must be a string.");
        if (t.disposition !== void 0 && dc(t.disposition), t.maximumPacketCount !== void 0 && (!Number.isInteger(t.maximumPacketCount) || t.maximumPacketCount < 0)) throw new TypeError("metadata.maximumPacketCount, when provided, must be a non-negative integer.");
        if (t.group !== void 0 && !(t.group instanceof zr) && (!Array.isArray(t.group) || t.group.some((e)=>!(e instanceof zr)))) throw new TypeError("metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.");
    };
    yS = class extends wn {
        get target() {
            const e = "Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.";
            if (this._rootTargetPromise) throw new TypeError(e);
            const r = this._getRootTarget();
            if (r instanceof Promise) throw new TypeError(e);
            return r;
        }
        constructor(e){
            if (super(), this.state = "pending", this.defaultTrackGroup = new zr, this._onFinalize = null, this._unfinalizedTargets = new Set, this._rootWriterPromise = null, this._tracks = [], this._startPromise = null, this._cancelPromise = null, this._finalizePromise = null, this._mutex = new lr, this._metadataTags = {}, this._rootTarget = null, this._rootTargetPromise = null, this._firstMediaStreamTimestamp = null, !e || typeof e != "object") throw new TypeError("options must be an object.");
            if (!(e.format instanceof Ji)) throw new TypeError("options.format must be an OutputFormat.");
            if (!(e.target instanceof et || e.target instanceof ei)) throw new TypeError("options.target must be a Target or a PathedTarget.");
            if (e.target instanceof et && this._rememberTarget(e.target), e.initTarget !== void 0 && !(e.initTarget instanceof et) && typeof e.initTarget != "function") throw new Error("options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.");
            if (e.onFinalize !== void 0 && typeof e.onFinalize != "function") throw new TypeError("options.onFinalize, when provided, must be a function.");
            this.format = e.format, this._target = e.target, this._onFinalize = e.onFinalize ?? null, this._initTarget = e.initTarget ?? null, this._initTarget instanceof et && this._rememberTarget(this._initTarget), this._muxer = e.format._createMuxer(this);
        }
        _getTargetValidated(e) {
            p(this._target instanceof ei);
            const r = this._target.getTarget(e), n = (i)=>{
                if (!(i instanceof et)) throw new TypeError("getTarget must return a Target.");
                return i;
            };
            return r instanceof Promise ? r.then(n) : n(r);
        }
        async _getTarget(e) {
            p(this._target instanceof ei);
            const r = await this._getTargetValidated(e);
            return this._emit("target", {
                target: r,
                request: e,
                isRoot: e.isRoot
            }), this.state === "canceled" ? await r._close() : this._rememberTarget(r), r;
        }
        _rememberTarget(e) {
            this._unfinalizedTargets.add(e), e.on("finalized", ()=>this._unfinalizedTargets.delete(e), {
                once: !0
            });
        }
        async _getInitTarget() {
            if (p(this._initTarget !== null), this._initTarget instanceof et) return this._initTarget;
            const e = await this._initTarget();
            return this.state === "canceled" ? await e._close() : this._rememberTarget(e), e;
        }
        _hasInitTarget() {
            return this._initTarget !== null;
        }
        _getRootTarget() {
            if (this._rootTarget) return this._rootTarget;
            if (this._rootTargetPromise) return this._rootTargetPromise;
            if (this._target instanceof et) return this._emit("target", {
                target: this._target,
                request: null,
                isRoot: !0
            }), this._rootTarget = this._target, this._target;
            const e = {
                path: this._target.rootPath,
                isRoot: !0,
                mimeType: this.format.mimeType
            }, r = this._getTargetValidated(e), n = (i)=>(this.state === "canceled" ? i._close() : this._rememberTarget(i), this._emit("target", {
                    target: i,
                    request: e,
                    isRoot: !0
                }), this._rootTarget = i, i);
            return r instanceof Promise ? this._rootTargetPromise = r.then(n) : n(r);
        }
        _getRootWriter(e) {
            return this._rootWriterPromise ??= (async ()=>{
                const r = await this._getRootTarget(), n = new yi(r, typeof e == "boolean" ? e : e(r));
                return n.start(), n;
            })();
        }
        addVideoTrack(e, r = {}) {
            if (!(e instanceof Vo)) throw new TypeError("source must be a VideoSource.");
            if (ti(r), r.rotation !== void 0 && ![
                0,
                90,
                180,
                270
            ].includes(r.rotation)) throw new TypeError(`Invalid video rotation: ${r.rotation}. Has to be 0, 90, 180 or 270.`);
            if (!this.format.supportsVideoRotationMetadata && r.rotation) throw new Error(`${this.format._name} does not support video rotation metadata.`);
            if (r.frameRate !== void 0 && (!Number.isFinite(r.frameRate) || r.frameRate <= 0)) throw new TypeError(`Invalid video frame rate: ${r.frameRate}. Must be a positive number.`);
            const n = {
                ...r
            };
            return n.group ??= this.defaultTrackGroup, this._addTrack(new Pf(this._tracks.length + 1, this, e, n));
        }
        addAudioTrack(e, r = {}) {
            if (!(e instanceof Ho)) throw new TypeError("source must be an AudioSource.");
            ti(r);
            const n = {
                ...r
            };
            return n.group ??= this.defaultTrackGroup, this._addTrack(new Cf(this._tracks.length + 1, this, e, n));
        }
        addSubtitleTrack(e, r = {}) {
            if (!(e instanceof Tf)) throw new TypeError("source must be a SubtitleSource.");
            ti(r);
            const n = {
                ...r
            };
            return n.group ??= this.defaultTrackGroup, this._addTrack(new If(this._tracks.length + 1, this, e, n));
        }
        setMetadataTags(e) {
            if (lc(e), this.state !== "pending") throw new Error("Cannot set metadata tags after output has been started or canceled.");
            this._metadataTags = e;
        }
        _addTrack(e) {
            if (this.state !== "pending") throw new Error("Cannot add track after output has been started or canceled.");
            if (e.source._connectedTrack) throw new Error("Source is already used for a track.");
            const r = this.format.getSupportedTrackCounts(), n = this._tracks.reduce((a, o)=>a + (o.type === e.type ? 1 : 0), 0), i = r[e.type].max;
            if (n === i) throw new Error(i === 0 ? `${this.format._name} does not support ${e.type} tracks.` : `${this.format._name} does not support more than ${i} ${e.type} track${i === 1 ? "" : "s"}.`);
            const s = r.total.max;
            if (this._tracks.length === s) throw new Error(`${this.format._name} does not support more than ${s} tracks${s === 1 ? "" : "s"} in total.`);
            if (e.isVideoTrack()) {
                const a = this.format.getSupportedVideoCodecs();
                if (a.length === 0) throw new Error(`${this.format._name} does not support video tracks.` + this.format._codecUnsupportedHint(e.source._codec));
                if (!a.includes(e.source._codec)) throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${a.map((o)=>`'${o}'`).join(", ")}.` + this.format._codecUnsupportedHint(e.source._codec));
            } else if (e.isAudioTrack()) {
                const a = this.format.getSupportedAudioCodecs();
                if (a.length === 0) throw new Error(`${this.format._name} does not support audio tracks.` + this.format._codecUnsupportedHint(e.source._codec));
                if (!a.includes(e.source._codec)) throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${a.map((o)=>`'${o}'`).join(", ")}.` + this.format._codecUnsupportedHint(e.source._codec));
            } else if (e.isSubtitleTrack()) {
                const a = this.format.getSupportedSubtitleCodecs();
                if (a.length === 0) throw new Error(`${this.format._name} does not support subtitle tracks.` + this.format._codecUnsupportedHint(e.source._codec));
                if (!a.includes(e.source._codec)) throw new Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${a.map((o)=>`'${o}'`).join(", ")}.` + this.format._codecUnsupportedHint(e.source._codec));
            }
            return this._tracks.push(e), e.source._connectedTrack = e, e;
        }
        async start() {
            const e = this.format.getSupportedTrackCounts();
            for (const n of xf){
                const i = this._tracks.reduce((a, o)=>a + (o.type === n ? 1 : 0), 0), s = e[n].min;
                if (i < s) throw new Error(s === e[n].max ? `${this.format._name} requires exactly ${s} ${n} track${s === 1 ? "" : "s"}.` : `${this.format._name} requires at least ${s} ${n} track${s === 1 ? "" : "s"}.`);
            }
            const r = e.total.min;
            if (this._tracks.length < r) throw new Error(r === e.total.max ? `${this.format._name} requires exactly ${r} track${r === 1 ? "" : "s"}.` : `${this.format._name} requires at least ${r} track${r === 1 ? "" : "s"}.`);
            if (this.state === "canceled") throw new Error("Output has been canceled.");
            return this._startPromise ? (console.warn("Output has already been started."), this._startPromise) : this._startPromise = (async ()=>{
                this.state = "started";
                const n = await this._mutex.acquire();
                try {
                    await this._muxer.start();
                    const i = this._tracks.map((s)=>s.source._start());
                    await Promise.all(i);
                } finally{
                    n();
                }
            })();
        }
        getMimeType() {
            return this._muxer.getMimeType();
        }
        async cancel() {
            if (this._cancelPromise) return console.warn("Output has already been canceled."), this._cancelPromise;
            if (this.state === "finalizing" || this.state === "finalized") {
                this.state === "finalized" && console.warn("Output has already been finalized.");
                return;
            }
            return this._cancelPromise = (async ()=>{
                this.state = "canceled";
                const e = await this._mutex.acquire();
                try {
                    const r = this._tracks.map((n)=>n.source._flushOrWaitForOngoingClose(!0));
                    await Promise.all(r), await Promise.all([
                        ...this._unfinalizedTargets
                    ].map((n)=>n._close())), this._unfinalizedTargets.clear();
                } finally{
                    e();
                }
            })();
        }
        async finalize() {
            if (this.state === "pending") throw new Error("Cannot finalize before starting.");
            if (this.state === "canceled") throw new Error("Cannot finalize after canceling.");
            return this._finalizePromise ? (console.warn("Output has already been finalized."), this._finalizePromise) : this._finalizePromise = (async ()=>{
                this.state = "finalizing";
                const e = await this._mutex.acquire();
                try {
                    const r = this._tracks.map((n)=>n.source._flushOrWaitForOngoingClose(!1));
                    if (await Promise.all(r), await this._muxer.finalize(), this._rootWriterPromise) {
                        const n = await this._rootWriterPromise;
                        n.finalized || (await n.flush(), await n.finalize());
                    }
                    this._onFinalize && await this._onFinalize(), this.state = "finalized";
                } finally{
                    e();
                }
            })();
        }
    };
    const vf = "" + new URL("opencut_wasm_bg-BWSypKWK.wasm", import.meta.url).href, Ef = async (t = {}, e)=>{
        let r;
        if (e.startsWith("data:")) {
            const n = e.replace(/^data:.*?base64,/, "");
            let i;
            if (typeof Buffer == "function" && typeof Buffer.from == "function") i = Buffer.from(n, "base64");
            else if (typeof atob == "function") {
                const s = atob(n);
                i = new Uint8Array(s.length);
                for(let a = 0; a < s.length; a++)i[a] = s.charCodeAt(a);
            } else throw new Error("Cannot decode base64-encoded data URL");
            r = await WebAssembly.instantiate(i, t);
        } else {
            const n = await fetch(e), i = n.headers.get("Content-Type") || "";
            if ("instantiateStreaming" in WebAssembly && i.startsWith("application/wasm")) r = await WebAssembly.instantiateStreaming(n, t);
            else {
                const s = await n.arrayBuffer();
                r = await WebAssembly.instantiate(s, t);
            }
        }
        return r.instance.exports;
    };
    kS = function() {
        return D.TICKS_PER_SECOND();
    };
    TS = function(t) {
        const e = D.applyEffectPasses(t);
        if (e[2]) throw Me(e[1]);
        return Me(e[0]);
    };
    SS = function(t) {
        const e = D.applyMaskFeather(t);
        if (e[2]) throw Me(e[1]);
        return Me(e[0]);
    };
    xS = function(t) {
        const e = D.formatTimecode(t);
        let r;
        return e[0] !== 0 && (r = $(e[0], e[1]).slice(), D.__wbindgen_free(e[0], e[1] * 1, 1)), r;
    };
    PS = function() {
        const t = D.getCompositorCanvas();
        if (t[2]) throw Me(t[1]);
        return Me(t[0]);
    };
    CS = function() {
        return D.getLastFrameProfile();
    };
    IS = function(t, e) {
        const r = D.initCompositor(t, e);
        if (r[1]) throw Me(r[0]);
    };
    vS = function() {
        return D.initializeGpu();
    };
    ES = function(t) {
        return D.lastFrameTime(t);
    };
    AS = function(t) {
        return D.mediaTimeFromSeconds(t);
    };
    BS = function(t) {
        return D.mediaTimeToSeconds(t);
    };
    FS = function(t) {
        return D.parseTimecode(t);
    };
    RS = function(t) {
        const e = Ne(t, D.__wbindgen_malloc, D.__wbindgen_realloc), r = ke, n = D.releaseTexture(e, r);
        if (n[1]) throw Me(n[0]);
    };
    MS = function(t) {
        const e = D.renderFrame(t);
        if (e[1]) throw Me(e[0]);
    };
    DS = function(t, e) {
        const r = D.resizeCompositor(t, e);
        if (r[1]) throw Me(r[0]);
    };
    OS = function(t) {
        return D.roundToFrame(t);
    };
    zS = function(t) {
        return D.snappedSeekTime(t);
    };
    NS = function(t) {
        const e = D.uploadTexture(t);
        if (e[1]) throw Me(e[0]);
    };
    function Af(t, e) {
        return Error($(t, e));
    }
    function Bf(t) {
        return Number(t);
    }
    function Ff(t, e) {
        const r = String(e), n = Ne(r, D.__wbindgen_malloc, D.__wbindgen_realloc), i = ke;
        ee().setInt32(t + 4, i, !0), ee().setInt32(t + 0, n, !0);
    }
    function Rf(t) {
        return t.Window;
    }
    function Mf(t) {
        return t.WorkerGlobalScope;
    }
    function Df(t, e) {
        const r = e, n = typeof r == "bigint" ? r : void 0;
        ee().setBigInt64(t + 8, H(n) ? BigInt(0) : n, !0), ee().setInt32(t + 0, !H(n), !0);
    }
    function Of(t) {
        const e = t, r = typeof e == "boolean" ? e : void 0;
        return H(r) ? 16777215 : r ? 1 : 0;
    }
    function zf(t, e) {
        const r = ki(e), n = Ne(r, D.__wbindgen_malloc, D.__wbindgen_realloc), i = ke;
        ee().setInt32(t + 4, i, !0), ee().setInt32(t + 0, n, !0);
    }
    function Nf(t, e) {
        return t in e;
    }
    function Uf(t) {
        return typeof t == "bigint";
    }
    function Lf(t) {
        return typeof t == "function";
    }
    function Wf(t) {
        return t === null;
    }
    function Vf(t) {
        const e = t;
        return typeof e == "object" && e !== null;
    }
    function Hf(t) {
        return typeof t == "string";
    }
    function qf(t) {
        return t === void 0;
    }
    function Gf(t, e) {
        return t === e;
    }
    function jf(t, e) {
        return t == e;
    }
    function $f(t, e) {
        const r = e, n = typeof r == "number" ? r : void 0;
        ee().setFloat64(t + 8, H(n) ? 0 : n, !0), ee().setInt32(t + 0, !H(n), !0);
    }
    function Kf(t, e) {
        const r = e, n = typeof r == "string" ? r : void 0;
        var i = H(n) ? 0 : Ne(n, D.__wbindgen_malloc, D.__wbindgen_realloc), s = ke;
        ee().setInt32(t + 4, s, !0), ee().setInt32(t + 0, i, !0);
    }
    function Xf(t, e) {
        throw new Error($(t, e));
    }
    function Qf(t) {
        t._wbg_cb_unref();
    }
    function Yf(t, e) {
        t.activeTexture(e >>> 0);
    }
    function Zf(t, e) {
        t.activeTexture(e >>> 0);
    }
    function Jf(t, e, r) {
        t.attachShader(e, r);
    }
    function eh(t, e, r) {
        t.attachShader(e, r);
    }
    function th(t, e, r) {
        t.beginQuery(e >>> 0, r);
    }
    function rh() {
        return N(function(t, e) {
            return t.beginRenderPass(e);
        }, arguments);
    }
    function nh(t, e, r, n, i) {
        t.bindAttribLocation(e, r >>> 0, $(n, i));
    }
    function ih(t, e, r, n, i) {
        t.bindAttribLocation(e, r >>> 0, $(n, i));
    }
    function sh(t, e, r, n, i, s) {
        t.bindBufferRange(e >>> 0, r >>> 0, n, i, s);
    }
    function ah(t, e, r) {
        t.bindBuffer(e >>> 0, r);
    }
    function oh(t, e, r) {
        t.bindBuffer(e >>> 0, r);
    }
    function ch(t, e, r) {
        t.bindFramebuffer(e >>> 0, r);
    }
    function uh(t, e, r) {
        t.bindFramebuffer(e >>> 0, r);
    }
    function lh(t, e, r) {
        t.bindRenderbuffer(e >>> 0, r);
    }
    function dh(t, e, r) {
        t.bindRenderbuffer(e >>> 0, r);
    }
    function fh(t, e, r) {
        t.bindSampler(e >>> 0, r);
    }
    function hh(t, e, r) {
        t.bindTexture(e >>> 0, r);
    }
    function mh(t, e, r) {
        t.bindTexture(e >>> 0, r);
    }
    function ph(t, e) {
        t.bindVertexArrayOES(e);
    }
    function gh(t, e) {
        t.bindVertexArray(e);
    }
    function _h(t, e, r, n, i) {
        t.blendColor(e, r, n, i);
    }
    function bh(t, e, r, n, i) {
        t.blendColor(e, r, n, i);
    }
    function wh(t, e, r) {
        t.blendEquationSeparate(e >>> 0, r >>> 0);
    }
    function yh(t, e, r) {
        t.blendEquationSeparate(e >>> 0, r >>> 0);
    }
    function kh(t, e) {
        t.blendEquation(e >>> 0);
    }
    function Th(t, e) {
        t.blendEquation(e >>> 0);
    }
    function Sh(t, e, r, n, i) {
        t.blendFuncSeparate(e >>> 0, r >>> 0, n >>> 0, i >>> 0);
    }
    function xh(t, e, r, n, i) {
        t.blendFuncSeparate(e >>> 0, r >>> 0, n >>> 0, i >>> 0);
    }
    function Ph(t, e, r) {
        t.blendFunc(e >>> 0, r >>> 0);
    }
    function Ch(t, e, r) {
        t.blendFunc(e >>> 0, r >>> 0);
    }
    function Ih(t, e, r, n, i, s, a, o, c, u, l) {
        t.blitFramebuffer(e, r, n, i, s, a, o, c, u >>> 0, l >>> 0);
    }
    function vh(t, e, r, n) {
        t.bufferData(e >>> 0, r, n >>> 0);
    }
    function Eh(t, e, r, n) {
        t.bufferData(e >>> 0, r, n >>> 0);
    }
    function Ah(t, e, r, n) {
        t.bufferData(e >>> 0, r, n >>> 0);
    }
    function Bh(t, e, r, n) {
        t.bufferData(e >>> 0, r, n >>> 0);
    }
    function Fh(t, e, r, n) {
        t.bufferSubData(e >>> 0, r, n);
    }
    function Rh(t, e, r, n) {
        t.bufferSubData(e >>> 0, r, n);
    }
    function Mh() {
        return N(function(t, e, r) {
            return t.call(e, r);
        }, arguments);
    }
    function Dh() {
        return N(function(t, e) {
            return t.call(e);
        }, arguments);
    }
    function Oh(t, e, r, n, i) {
        t.clearBufferfv(e >>> 0, r, ue(n, i));
    }
    function zh(t, e, r, n, i) {
        t.clearBufferiv(e >>> 0, r, Pt(n, i));
    }
    function Nh(t, e, r, n, i) {
        t.clearBufferuiv(e >>> 0, r, fr(n, i));
    }
    function Uh(t, e) {
        t.clearDepth(e);
    }
    function Lh(t, e) {
        t.clearDepth(e);
    }
    function Wh(t, e, r, n, i) {
        t.clearRect(e, r, n, i);
    }
    function Vh(t, e) {
        t.clearStencil(e);
    }
    function Hh(t, e) {
        t.clearStencil(e);
    }
    function qh(t, e) {
        t.clear(e >>> 0);
    }
    function Gh(t, e) {
        t.clear(e >>> 0);
    }
    function jh(t, e, r, n) {
        return t.clientWaitSync(e, r >>> 0, n >>> 0);
    }
    function $h(t, e, r, n, i) {
        t.colorMask(e !== 0, r !== 0, n !== 0, i !== 0);
    }
    function Kh(t, e, r, n, i) {
        t.colorMask(e !== 0, r !== 0, n !== 0, i !== 0);
    }
    function Xh(t, e) {
        t.compileShader(e);
    }
    function Qh(t, e) {
        t.compileShader(e);
    }
    function Yh(t, e, r, n, i, s, a, o, c) {
        t.compressedTexSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c);
    }
    function Zh(t, e, r, n, i, s, a, o, c) {
        t.compressedTexSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c);
    }
    function Jh(t, e, r, n, i, s, a, o, c, u) {
        t.compressedTexSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c, u);
    }
    function em(t, e, r, n, i, s, a, o, c, u, l) {
        t.compressedTexSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l);
    }
    function tm(t, e, r, n, i, s, a, o, c, u, l, d) {
        t.compressedTexSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l, d);
    }
    function rm() {
        return N(function(t, e) {
            t.configure(e);
        }, arguments);
    }
    function nm(t, e, r, n, i, s) {
        t.copyBufferSubData(e >>> 0, r >>> 0, n, i, s);
    }
    function im() {
        return N(function(t, e, r, n) {
            t.copyExternalImageToTexture(e, r, n);
        }, arguments);
    }
    function sm(t, e, r, n, i, s, a, o, c) {
        t.copyTexSubImage2D(e >>> 0, r, n, i, s, a, o, c);
    }
    function am(t, e, r, n, i, s, a, o, c) {
        t.copyTexSubImage2D(e >>> 0, r, n, i, s, a, o, c);
    }
    function om(t, e, r, n, i, s, a, o, c, u) {
        t.copyTexSubImage3D(e >>> 0, r, n, i, s, a, o, c, u);
    }
    function cm() {
        return N(function(t, e) {
            return t.createBindGroupLayout(e);
        }, arguments);
    }
    function um(t, e) {
        return t.createBindGroup(e);
    }
    function lm() {
        return N(function(t, e) {
            return t.createBuffer(e);
        }, arguments);
    }
    function dm(t) {
        const e = t.createBuffer();
        return H(e) ? 0 : X(e);
    }
    function fm(t) {
        const e = t.createBuffer();
        return H(e) ? 0 : X(e);
    }
    function hm(t, e) {
        return t.createCommandEncoder(e);
    }
    function mm() {
        return N(function(t, e, r) {
            return t.createElement($(e, r));
        }, arguments);
    }
    function pm(t) {
        const e = t.createFramebuffer();
        return H(e) ? 0 : X(e);
    }
    function gm(t) {
        const e = t.createFramebuffer();
        return H(e) ? 0 : X(e);
    }
    function _m(t, e) {
        return t.createPipelineLayout(e);
    }
    function bm(t) {
        const e = t.createProgram();
        return H(e) ? 0 : X(e);
    }
    function wm(t) {
        const e = t.createProgram();
        return H(e) ? 0 : X(e);
    }
    function ym(t) {
        const e = t.createQuery();
        return H(e) ? 0 : X(e);
    }
    function km() {
        return N(function(t, e) {
            return t.createRenderPipeline(e);
        }, arguments);
    }
    function Tm(t) {
        const e = t.createRenderbuffer();
        return H(e) ? 0 : X(e);
    }
    function Sm(t) {
        const e = t.createRenderbuffer();
        return H(e) ? 0 : X(e);
    }
    function xm(t) {
        const e = t.createSampler();
        return H(e) ? 0 : X(e);
    }
    function Pm(t, e) {
        return t.createSampler(e);
    }
    function Cm(t, e) {
        return t.createShaderModule(e);
    }
    function Im(t, e) {
        const r = t.createShader(e >>> 0);
        return H(r) ? 0 : X(r);
    }
    function vm(t, e) {
        const r = t.createShader(e >>> 0);
        return H(r) ? 0 : X(r);
    }
    function Em() {
        return N(function(t, e) {
            return t.createTexture(e);
        }, arguments);
    }
    function Am(t) {
        const e = t.createTexture();
        return H(e) ? 0 : X(e);
    }
    function Bm(t) {
        const e = t.createTexture();
        return H(e) ? 0 : X(e);
    }
    function Fm(t) {
        const e = t.createVertexArrayOES();
        return H(e) ? 0 : X(e);
    }
    function Rm(t) {
        const e = t.createVertexArray();
        return H(e) ? 0 : X(e);
    }
    function Mm() {
        return N(function(t, e) {
            return t.createView(e);
        }, arguments);
    }
    function Dm(t, e) {
        t.cullFace(e >>> 0);
    }
    function Om(t, e) {
        t.cullFace(e >>> 0);
    }
    function zm(t, e) {
        const r = e.data, n = bT(r, D.__wbindgen_malloc), i = ke;
        ee().setInt32(t + 4, i, !0), ee().setInt32(t + 0, n, !0);
    }
    function Nm(t, e) {
        t.deleteBuffer(e);
    }
    function Um(t, e) {
        t.deleteBuffer(e);
    }
    function Lm(t, e) {
        t.deleteFramebuffer(e);
    }
    function Wm(t, e) {
        t.deleteFramebuffer(e);
    }
    function Vm(t, e) {
        t.deleteProgram(e);
    }
    function Hm(t, e) {
        t.deleteProgram(e);
    }
    function qm(t, e) {
        t.deleteQuery(e);
    }
    function Gm(t, e) {
        t.deleteRenderbuffer(e);
    }
    function jm(t, e) {
        t.deleteRenderbuffer(e);
    }
    function $m(t, e) {
        t.deleteSampler(e);
    }
    function Km(t, e) {
        t.deleteShader(e);
    }
    function Xm(t, e) {
        t.deleteShader(e);
    }
    function Qm(t, e) {
        t.deleteSync(e);
    }
    function Ym(t, e) {
        t.deleteTexture(e);
    }
    function Zm(t, e) {
        t.deleteTexture(e);
    }
    function Jm(t, e) {
        t.deleteVertexArrayOES(e);
    }
    function ep(t, e) {
        t.deleteVertexArray(e);
    }
    function tp(t, e) {
        t.depthFunc(e >>> 0);
    }
    function rp(t, e) {
        t.depthFunc(e >>> 0);
    }
    function np(t, e) {
        t.depthMask(e !== 0);
    }
    function ip(t, e) {
        t.depthMask(e !== 0);
    }
    function sp(t, e, r) {
        t.depthRange(e, r);
    }
    function ap(t, e, r) {
        t.depthRange(e, r);
    }
    function op(t, e) {
        const r = e.description, n = Ne(r, D.__wbindgen_malloc, D.__wbindgen_realloc), i = ke;
        ee().setInt32(t + 4, i, !0), ee().setInt32(t + 0, n, !0);
    }
    function cp(t) {
        t.destroy();
    }
    function up(t, e) {
        t.disableVertexAttribArray(e >>> 0);
    }
    function lp(t, e) {
        t.disableVertexAttribArray(e >>> 0);
    }
    function dp(t, e) {
        t.disable(e >>> 0);
    }
    function fp(t, e) {
        t.disable(e >>> 0);
    }
    function hp(t) {
        const e = t.document;
        return H(e) ? 0 : X(e);
    }
    function mp(t) {
        return t.done;
    }
    function pp(t, e, r, n, i) {
        t.drawArraysInstancedANGLE(e >>> 0, r, n, i);
    }
    function gp(t, e, r, n, i) {
        t.drawArraysInstanced(e >>> 0, r, n, i);
    }
    function _p(t, e, r, n) {
        t.drawArrays(e >>> 0, r, n);
    }
    function bp(t, e, r, n) {
        t.drawArrays(e >>> 0, r, n);
    }
    function wp(t, e) {
        t.drawBuffersWEBGL(e);
    }
    function yp(t, e) {
        t.drawBuffers(e);
    }
    function kp(t, e, r, n, i, s) {
        t.drawElementsInstancedANGLE(e >>> 0, r, n >>> 0, i, s);
    }
    function Tp(t, e, r, n, i, s) {
        t.drawElementsInstanced(e >>> 0, r, n >>> 0, i, s);
    }
    function Sp() {
        return N(function(t, e, r, n) {
            t.drawImage(e, r, n);
        }, arguments);
    }
    function xp(t, e, r, n, i) {
        t.draw(e >>> 0, r >>> 0, n >>> 0, i >>> 0);
    }
    function Pp(t, e) {
        t.enableVertexAttribArray(e >>> 0);
    }
    function Cp(t, e) {
        t.enableVertexAttribArray(e >>> 0);
    }
    function Ip(t, e) {
        t.enable(e >>> 0);
    }
    function vp(t, e) {
        t.enable(e >>> 0);
    }
    function Ep(t, e) {
        t.endQuery(e >>> 0);
    }
    function Ap(t) {
        t.end();
    }
    function Bp(t) {
        return Object.entries(t);
    }
    function Fp(t, e) {
        let r, n;
        try {
            r = t, n = e, console.error($(t, e));
        } finally{
            D.__wbindgen_free(r, n, 1);
        }
    }
    function Rp(t, e, r) {
        const n = t.fenceSync(e >>> 0, r >>> 0);
        return H(n) ? 0 : X(n);
    }
    function Mp(t) {
        return t.finish();
    }
    function Dp(t, e) {
        return t.finish(e);
    }
    function Op(t) {
        t.flush();
    }
    function zp(t) {
        t.flush();
    }
    function Np(t, e, r, n, i) {
        t.framebufferRenderbuffer(e >>> 0, r >>> 0, n >>> 0, i);
    }
    function Up(t, e, r, n, i) {
        t.framebufferRenderbuffer(e >>> 0, r >>> 0, n >>> 0, i);
    }
    function Lp(t, e, r, n, i, s) {
        t.framebufferTexture2D(e >>> 0, r >>> 0, n >>> 0, i, s);
    }
    function Wp(t, e, r, n, i, s) {
        t.framebufferTexture2D(e >>> 0, r >>> 0, n >>> 0, i, s);
    }
    function Vp(t, e, r, n, i, s) {
        t.framebufferTextureLayer(e >>> 0, r >>> 0, n, i, s);
    }
    function Hp(t, e, r, n, i, s, a) {
        t.framebufferTextureMultiviewOVR(e >>> 0, r >>> 0, n, i, s, a);
    }
    function qp(t, e) {
        t.frontFace(e >>> 0);
    }
    function Gp(t, e) {
        t.frontFace(e >>> 0);
    }
    function jp(t, e, r, n) {
        t.getBufferSubData(e >>> 0, r, n);
    }
    function $p() {
        return N(function(t, e, r) {
            const n = t.getContext($(e, r));
            return H(n) ? 0 : X(n);
        }, arguments);
    }
    function Kp() {
        return N(function(t, e, r) {
            const n = t.getContext($(e, r));
            return H(n) ? 0 : X(n);
        }, arguments);
    }
    function Xp() {
        return N(function(t, e, r, n) {
            const i = t.getContext($(e, r), n);
            return H(i) ? 0 : X(i);
        }, arguments);
    }
    function Qp() {
        return N(function(t, e, r, n) {
            const i = t.getContext($(e, r), n);
            return H(i) ? 0 : X(i);
        }, arguments);
    }
    function Yp() {
        return N(function(t) {
            return t.getCurrentTexture();
        }, arguments);
    }
    function Zp() {
        return N(function(t, e, r) {
            const n = t.getExtension($(e, r));
            return H(n) ? 0 : X(n);
        }, arguments);
    }
    function Jp() {
        return N(function(t, e, r, n, i) {
            return t.getImageData(e, r, n, i);
        }, arguments);
    }
    function eg() {
        return N(function(t, e, r) {
            return t.getIndexedParameter(e >>> 0, r >>> 0);
        }, arguments);
    }
    function tg() {
        return N(function(t, e, r) {
            return t.getMappedRange(e, r);
        }, arguments);
    }
    function rg() {
        return N(function(t, e) {
            return t.getParameter(e >>> 0);
        }, arguments);
    }
    function ng() {
        return N(function(t, e) {
            return t.getParameter(e >>> 0);
        }, arguments);
    }
    function ig(t) {
        const e = t.getPreferredCanvasFormat();
        return (Vt.indexOf(e) + 1 || 96) - 1;
    }
    function sg(t, e, r) {
        const n = e.getProgramInfoLog(r);
        var i = H(n) ? 0 : Ne(n, D.__wbindgen_malloc, D.__wbindgen_realloc), s = ke;
        ee().setInt32(t + 4, s, !0), ee().setInt32(t + 0, i, !0);
    }
    function ag(t, e, r) {
        const n = e.getProgramInfoLog(r);
        var i = H(n) ? 0 : Ne(n, D.__wbindgen_malloc, D.__wbindgen_realloc), s = ke;
        ee().setInt32(t + 4, s, !0), ee().setInt32(t + 0, i, !0);
    }
    function og(t, e, r) {
        return t.getProgramParameter(e, r >>> 0);
    }
    function cg(t, e, r) {
        return t.getProgramParameter(e, r >>> 0);
    }
    function ug(t, e, r) {
        return t.getQueryParameter(e, r >>> 0);
    }
    function lg(t, e, r) {
        const n = e.getShaderInfoLog(r);
        var i = H(n) ? 0 : Ne(n, D.__wbindgen_malloc, D.__wbindgen_realloc), s = ke;
        ee().setInt32(t + 4, s, !0), ee().setInt32(t + 0, i, !0);
    }
    function dg(t, e, r) {
        const n = e.getShaderInfoLog(r);
        var i = H(n) ? 0 : Ne(n, D.__wbindgen_malloc, D.__wbindgen_realloc), s = ke;
        ee().setInt32(t + 4, s, !0), ee().setInt32(t + 0, i, !0);
    }
    function fg(t, e, r) {
        return t.getShaderParameter(e, r >>> 0);
    }
    function hg(t, e, r) {
        return t.getShaderParameter(e, r >>> 0);
    }
    function mg(t) {
        const e = t.getSupportedExtensions();
        return H(e) ? 0 : X(e);
    }
    function pg(t) {
        const e = t.getSupportedProfiles();
        return H(e) ? 0 : X(e);
    }
    function gg(t, e, r) {
        return t.getSyncParameter(e, r >>> 0);
    }
    function _g(t, e, r, n) {
        return t.getUniformBlockIndex(e, $(r, n));
    }
    function bg(t, e, r, n) {
        const i = t.getUniformLocation(e, $(r, n));
        return H(i) ? 0 : X(i);
    }
    function wg(t, e, r, n) {
        const i = t.getUniformLocation(e, $(r, n));
        return H(i) ? 0 : X(i);
    }
    function yg(t, e) {
        const r = t[e >>> 0];
        return H(r) ? 0 : X(r);
    }
    function kg(t, e) {
        return t[e >>> 0];
    }
    function Tg() {
        return N(function(t, e) {
            return Reflect.get(t, e);
        }, arguments);
    }
    function Sg() {
        return N(function(t, e) {
            return Reflect.get(t, e);
        }, arguments);
    }
    function xg(t, e) {
        return t[e >>> 0];
    }
    function Pg(t, e) {
        return t[e];
    }
    function Cg(t) {
        return t.gpu;
    }
    function Ig(t) {
        return t.height;
    }
    function vg(t) {
        return t.height;
    }
    function Eg(t) {
        return t.height;
    }
    function Ag(t) {
        return t.height;
    }
    function Bg(t) {
        return t.height;
    }
    function Fg(t, e, r) {
        return t.includes(e, r);
    }
    function Rg(t) {
        return t.info;
    }
    function Mg(t) {
        let e;
        try {
            e = t instanceof ArrayBuffer;
        } catch  {
            e = !1;
        }
        return e;
    }
    function Dg(t) {
        let e;
        try {
            e = t instanceof GPUAdapter;
        } catch  {
            e = !1;
        }
        return e;
    }
    function Og(t) {
        let e;
        try {
            e = t instanceof GPUCanvasContext;
        } catch  {
            e = !1;
        }
        return e;
    }
    function zg(t) {
        let e;
        try {
            e = t instanceof HTMLCanvasElement;
        } catch  {
            e = !1;
        }
        return e;
    }
    function Ng(t) {
        let e;
        try {
            e = t instanceof Map;
        } catch  {
            e = !1;
        }
        return e;
    }
    function Ug(t) {
        let e;
        try {
            e = t instanceof Object;
        } catch  {
            e = !1;
        }
        return e;
    }
    function Lg(t) {
        let e;
        try {
            e = t instanceof OffscreenCanvas;
        } catch  {
            e = !1;
        }
        return e;
    }
    function Wg(t) {
        let e;
        try {
            e = t instanceof Uint8Array;
        } catch  {
            e = !1;
        }
        return e;
    }
    function Vg(t) {
        let e;
        try {
            e = t instanceof WebGL2RenderingContext;
        } catch  {
            e = !1;
        }
        return e;
    }
    function Hg(t) {
        let e;
        try {
            e = t instanceof Window;
        } catch  {
            e = !1;
        }
        return e;
    }
    function qg() {
        return N(function(t, e, r) {
            t.invalidateFramebuffer(e >>> 0, r);
        }, arguments);
    }
    function Gg(t) {
        return Array.isArray(t);
    }
    function jg(t) {
        return Number.isSafeInteger(t);
    }
    function $g(t, e) {
        return Object.is(t, e);
    }
    function Kg() {
        return Symbol.iterator;
    }
    function Xg(t, e) {
        const r = e.label, n = Ne(r, D.__wbindgen_malloc, D.__wbindgen_realloc), i = ke;
        ee().setInt32(t + 4, i, !0), ee().setInt32(t + 0, n, !0);
    }
    function Qg(t) {
        return t.length;
    }
    function Yg(t) {
        return t.length;
    }
    function Zg(t) {
        return t.limits;
    }
    function Jg(t, e) {
        t.linkProgram(e);
    }
    function e_(t, e) {
        t.linkProgram(e);
    }
    function t_(t, e, r, n) {
        return t.mapAsync(e >>> 0, r, n);
    }
    function r_(t) {
        return t.maxBindGroups;
    }
    function n_(t) {
        return t.maxBindingsPerBindGroup;
    }
    function i_(t) {
        return t.maxBufferSize;
    }
    function s_(t) {
        return t.maxColorAttachmentBytesPerSample;
    }
    function a_(t) {
        return t.maxColorAttachments;
    }
    function o_(t) {
        return t.maxComputeInvocationsPerWorkgroup;
    }
    function c_(t) {
        return t.maxComputeWorkgroupSizeX;
    }
    function u_(t) {
        return t.maxComputeWorkgroupSizeY;
    }
    function l_(t) {
        return t.maxComputeWorkgroupSizeZ;
    }
    function d_(t) {
        return t.maxComputeWorkgroupStorageSize;
    }
    function f_(t) {
        return t.maxComputeWorkgroupsPerDimension;
    }
    function h_(t) {
        return t.maxDynamicStorageBuffersPerPipelineLayout;
    }
    function m_(t) {
        return t.maxDynamicUniformBuffersPerPipelineLayout;
    }
    function p_(t) {
        return t.maxInterStageShaderVariables;
    }
    function g_(t) {
        return t.maxSampledTexturesPerShaderStage;
    }
    function __(t) {
        return t.maxSamplersPerShaderStage;
    }
    function b_(t) {
        return t.maxStorageBufferBindingSize;
    }
    function w_(t) {
        return t.maxStorageBuffersPerShaderStage;
    }
    function y_(t) {
        return t.maxStorageTexturesPerShaderStage;
    }
    function k_(t) {
        return t.maxTextureArrayLayers;
    }
    function T_(t) {
        return t.maxTextureDimension1D;
    }
    function S_(t) {
        return t.maxTextureDimension2D;
    }
    function x_(t) {
        return t.maxTextureDimension3D;
    }
    function P_(t) {
        return t.maxUniformBufferBindingSize;
    }
    function C_(t) {
        return t.maxUniformBuffersPerShaderStage;
    }
    function I_(t) {
        return t.maxVertexAttributes;
    }
    function v_(t) {
        return t.maxVertexBufferArrayStride;
    }
    function E_(t) {
        return t.maxVertexBuffers;
    }
    function A_(t) {
        return t.minStorageBufferOffsetAlignment;
    }
    function B_(t) {
        return t.minUniformBufferOffsetAlignment;
    }
    function F_(t) {
        return t.navigator;
    }
    function R_(t) {
        return t.navigator;
    }
    function M_() {
        return new Error;
    }
    function D_(t) {
        return new Uint8Array(t);
    }
    function O_() {
        return new Array;
    }
    function z_() {
        return N(function(t, e) {
            return new OffscreenCanvas(t >>> 0, e >>> 0);
        }, arguments);
    }
    function N_() {
        return new Object;
    }
    function U_(t, e) {
        try {
            var r = {
                a: t,
                b: e
            }, n = (s, a)=>{
                const o = r.a;
                r.a = 0;
                try {
                    return $k(o, r.b, s, a);
                } finally{
                    r.a = o;
                }
            };
            return new Promise(n);
        } finally{
            r.a = 0;
        }
    }
    function L_(t, e, r) {
        return new Uint8Array(t, e >>> 0, r >>> 0);
    }
    function W_(t) {
        return new Array(t >>> 0);
    }
    function V_() {
        return N(function(t) {
            return t.next();
        }, arguments);
    }
    function H_(t) {
        return t.next;
    }
    function q_(t) {
        return t.now();
    }
    function G_(t) {
        return Array.of(t);
    }
    function j_(t) {
        return t.onSubmittedWorkDone();
    }
    function $_(t) {
        const e = t.performance;
        return H(e) ? 0 : X(e);
    }
    function K_(t, e, r) {
        t.pixelStorei(e >>> 0, r);
    }
    function X_(t, e, r) {
        t.pixelStorei(e >>> 0, r);
    }
    function Q_(t, e, r) {
        t.polygonOffset(e, r);
    }
    function Y_(t, e, r) {
        t.polygonOffset(e, r);
    }
    function Z_(t, e, r) {
        Uint8Array.prototype.set.call(cs(t, e), r);
    }
    function J_(t, e) {
        return t.push(e);
    }
    function eb(t, e, r) {
        t.queryCounterEXT(e, r >>> 0);
    }
    function tb() {
        return N(function(t, e, r) {
            return t.querySelectorAll($(e, r));
        }, arguments);
    }
    function rb() {
        return N(function(t, e, r) {
            const n = t.querySelector($(e, r));
            return H(n) ? 0 : X(n);
        }, arguments);
    }
    function nb(t) {
        queueMicrotask(t);
    }
    function ib(t) {
        return t.queueMicrotask;
    }
    function sb(t) {
        return t.queue;
    }
    function ab(t, e) {
        t.readBuffer(e >>> 0);
    }
    function ob() {
        return N(function(t, e, r, n, i, s, a, o) {
            t.readPixels(e, r, n, i, s >>> 0, a >>> 0, o);
        }, arguments);
    }
    function cb() {
        return N(function(t, e, r, n, i, s, a, o) {
            t.readPixels(e, r, n, i, s >>> 0, a >>> 0, o);
        }, arguments);
    }
    function ub() {
        return N(function(t, e, r, n, i, s, a, o) {
            t.readPixels(e, r, n, i, s >>> 0, a >>> 0, o);
        }, arguments);
    }
    function lb(t, e, r, n, i, s) {
        t.renderbufferStorageMultisample(e >>> 0, r, n >>> 0, i, s);
    }
    function db(t, e, r, n, i) {
        t.renderbufferStorage(e >>> 0, r >>> 0, n, i);
    }
    function fb(t, e, r, n, i) {
        t.renderbufferStorage(e >>> 0, r >>> 0, n, i);
    }
    function hb(t, e) {
        return t.requestAdapter(e);
    }
    function mb(t) {
        return t.requestAdapter();
    }
    function pb(t, e) {
        return t.requestDevice(e);
    }
    function gb(t) {
        return Promise.resolve(t);
    }
    function _b(t, e, r, n) {
        t.samplerParameterf(e, r >>> 0, n);
    }
    function bb(t, e, r, n) {
        t.samplerParameteri(e, r >>> 0, n);
    }
    function wb(t, e, r, n, i) {
        t.scissor(e, r, n, i);
    }
    function yb(t, e, r, n, i) {
        t.scissor(e, r, n, i);
    }
    function kb(t, e, r) {
        t.setBindGroup(e >>> 0, r);
    }
    function Tb() {
        return N(function(t, e, r, n, i, s, a) {
            t.setBindGroup(e >>> 0, r, fr(n, i), s, a >>> 0);
        }, arguments);
    }
    function Sb(t, e) {
        t.setPipeline(e);
    }
    function xb(t, e, r, n, i) {
        t.setVertexBuffer(e >>> 0, r, n, i);
    }
    function Pb(t, e, r, n) {
        t.setVertexBuffer(e >>> 0, r, n);
    }
    function Cb() {
        return N(function(t, e, r) {
            return Reflect.set(t, e, r);
        }, arguments);
    }
    function Ib(t, e, r) {
        t.set(e, r >>> 0);
    }
    function vb(t, e) {
        t.a = e;
    }
    function Eb(t, e) {
        t.access = iT[e];
    }
    function Ab(t, e) {
        t.addressModeU = ts[e];
    }
    function Bb(t, e) {
        t.addressModeV = ts[e];
    }
    function Fb(t, e) {
        t.addressModeW = ts[e];
    }
    function Rb(t, e) {
        t.alpha = e;
    }
    function Mb(t, e) {
        t.alphaMode = Qk[e];
    }
    function Db(t, e) {
        t.alphaToCoverageEnabled = e !== 0;
    }
    function Ob(t, e) {
        t.arrayLayerCount = e >>> 0;
    }
    function zb(t, e) {
        t.arrayStride = e;
    }
    function Nb(t, e) {
        t.aspect = as[e];
    }
    function Ub(t, e) {
        t.aspect = as[e];
    }
    function Lb(t, e) {
        t.aspect = as[e];
    }
    function Wb(t, e) {
        t.attributes = e;
    }
    function Vb(t, e) {
        t.b = e;
    }
    function Hb(t, e) {
        t.baseArrayLayer = e >>> 0;
    }
    function qb(t, e) {
        t.baseMipLevel = e >>> 0;
    }
    function Gb(t, e) {
        t.beginningOfPassWriteIndex = e >>> 0;
    }
    function jb(t, e) {
        t.bindGroupLayouts = e;
    }
    function $b(t, e) {
        t.binding = e >>> 0;
    }
    function Kb(t, e) {
        t.binding = e >>> 0;
    }
    function Xb(t, e) {
        t.blend = e;
    }
    function Qb(t, e) {
        t.buffer = e;
    }
    function Yb(t, e) {
        t.buffer = e;
    }
    function Zb(t, e) {
        t.buffers = e;
    }
    function Jb(t, e) {
        t.bytesPerRow = e >>> 0;
    }
    function e0(t, e, r) {
        t[e >>> 0] = r;
    }
    function t0(t, e) {
        t.clearValue = e;
    }
    function r0(t, e, r) {
        t.code = $(e, r);
    }
    function n0(t, e) {
        t.colorAttachments = e;
    }
    function i0(t, e) {
        t.color = e;
    }
    function s0(t, e) {
        t.compare = rs[e];
    }
    function a0(t, e) {
        t.compare = rs[e];
    }
    function o0(t, e) {
        t.count = e >>> 0;
    }
    function c0(t, e) {
        t.cullMode = Yk[e];
    }
    function u0(t, e) {
        t.depthBiasClamp = e;
    }
    function l0(t, e) {
        t.depthBias = e;
    }
    function d0(t, e) {
        t.depthBiasSlopeScale = e;
    }
    function f0(t, e) {
        t.depthClearValue = e;
    }
    function h0(t, e) {
        t.depthCompare = rs[e];
    }
    function m0(t, e) {
        t.depthFailOp = is[e];
    }
    function p0(t, e) {
        t.depthLoadOp = ns[e];
    }
    function g0(t, e) {
        t.depthOrArrayLayers = e >>> 0;
    }
    function _0(t, e) {
        t.depthReadOnly = e !== 0;
    }
    function b0(t, e) {
        t.depthStencil = e;
    }
    function w0(t, e) {
        t.depthStencilAttachment = e;
    }
    function y0(t, e) {
        t.depthStoreOp = ss[e];
    }
    function k0(t, e) {
        t.depthWriteEnabled = e !== 0;
    }
    function T0(t, e) {
        t.device = e;
    }
    function S0(t, e) {
        t.dimension = os[e];
    }
    function x0(t, e) {
        t.dimension = sT[e];
    }
    function P0(t, e) {
        t.dstFactor = Go[e];
    }
    function C0(t, e) {
        t.endOfPassWriteIndex = e >>> 0;
    }
    function I0(t, e) {
        t.entries = e;
    }
    function v0(t, e) {
        t.entries = e;
    }
    function E0(t, e, r) {
        t.entryPoint = $(e, r);
    }
    function A0(t, e, r) {
        t.entryPoint = $(e, r);
    }
    function B0(t, e) {
        t.externalTexture = e;
    }
    function F0(t, e) {
        t.failOp = is[e];
    }
    function R0(t, e) {
        t.flipY = e !== 0;
    }
    function M0(t, e) {
        t.format = Vt[e];
    }
    function D0(t, e) {
        t.format = Vt[e];
    }
    function O0(t, e) {
        t.format = Vt[e];
    }
    function z0(t, e) {
        t.format = oT[e];
    }
    function N0(t, e) {
        t.format = Vt[e];
    }
    function U0(t, e) {
        t.format = Vt[e];
    }
    function L0(t, e) {
        t.format = Vt[e];
    }
    function W0(t, e) {
        t.fragment = e;
    }
    function V0(t, e) {
        t.frontFace = Zk[e];
    }
    function H0(t, e) {
        t.g = e;
    }
    function q0(t, e) {
        t.hasDynamicOffset = e !== 0;
    }
    function G0(t, e) {
        t.height = e >>> 0;
    }
    function j0(t, e) {
        t.height = e >>> 0;
    }
    function $0(t, e) {
        t.height = e >>> 0;
    }
    function K0(t, e, r) {
        t.label = $(e, r);
    }
    function X0(t, e, r) {
        t.label = $(e, r);
    }
    function Q0(t, e, r) {
        t.label = $(e, r);
    }
    function Y0(t, e, r) {
        t.label = $(e, r);
    }
    function Z0(t, e, r) {
        t.label = $(e, r);
    }
    function J0(t, e, r) {
        t.label = $(e, r);
    }
    function ew(t, e, r) {
        t.label = $(e, r);
    }
    function tw(t, e, r) {
        t.label = $(e, r);
    }
    function rw(t, e, r) {
        t.label = $(e, r);
    }
    function nw(t, e, r) {
        t.label = $(e, r);
    }
    function iw(t, e, r) {
        t.label = $(e, r);
    }
    function sw(t, e, r) {
        t.label = $(e, r);
    }
    function aw(t, e, r) {
        t.label = $(e, r);
    }
    function ow(t, e) {
        t.layout = e;
    }
    function cw(t, e) {
        t.layout = e;
    }
    function uw(t, e) {
        t.loadOp = ns[e];
    }
    function lw(t, e) {
        t.lodMaxClamp = e;
    }
    function dw(t, e) {
        t.lodMinClamp = e;
    }
    function fw(t, e) {
        t.magFilter = jo[e];
    }
    function hw(t, e) {
        t.mappedAtCreation = e !== 0;
    }
    function mw(t, e) {
        t.mask = e >>> 0;
    }
    function pw(t, e) {
        t.maxAnisotropy = e;
    }
    function gw(t, e) {
        t.minBindingSize = e;
    }
    function _w(t, e) {
        t.minFilter = jo[e];
    }
    function bw(t, e) {
        t.mipLevel = e >>> 0;
    }
    function ww(t, e) {
        t.mipLevelCount = e >>> 0;
    }
    function yw(t, e) {
        t.mipLevelCount = e >>> 0;
    }
    function kw(t, e) {
        t.mipLevel = e >>> 0;
    }
    function Tw(t, e) {
        t.mipmapFilter = eT[e];
    }
    function Sw(t, e) {
        t.module = e;
    }
    function xw(t, e) {
        t.module = e;
    }
    function Pw(t, e) {
        t.multisample = e;
    }
    function Cw(t, e) {
        t.multisampled = e !== 0;
    }
    function Iw(t, e) {
        t.offset = e;
    }
    function vw(t, e) {
        t.offset = e;
    }
    function Ew(t, e) {
        t.offset = e;
    }
    function Aw(t, e) {
        t.operation = Kk[e];
    }
    function Bw(t, e) {
        t.origin = e;
    }
    function Fw(t, e) {
        t.origin = e;
    }
    function Rw(t, e) {
        t.origin = e;
    }
    function Mw(t, e) {
        t.passOp = is[e];
    }
    function Dw(t, e) {
        t.powerPreference = tT[e];
    }
    function Ow(t, e) {
        t.premultipliedAlpha = e !== 0;
    }
    function zw(t, e) {
        t.primitive = e;
    }
    function Nw(t, e) {
        t.querySet = e;
    }
    function Uw(t, e) {
        t.r = e;
    }
    function Lw(t, e) {
        t.requiredFeatures = e;
    }
    function Ww(t, e) {
        t.requiredLimits = e;
    }
    function Vw(t, e) {
        t.resolveTarget = e;
    }
    function Hw(t, e) {
        t.resource = e;
    }
    function qw(t, e) {
        t.rowsPerImage = e >>> 0;
    }
    function Gw(t, e) {
        t.sampleCount = e >>> 0;
    }
    function jw(t, e) {
        t.sampleType = aT[e];
    }
    function $w(t, e) {
        t.sampler = e;
    }
    function Kw(t, e) {
        t.shaderLocation = e >>> 0;
    }
    function Xw(t, e) {
        t.size = e;
    }
    function Qw(t, e) {
        t.size = e;
    }
    function Yw(t, e) {
        t.size = e;
    }
    function Zw(t, e) {
        t.source = e;
    }
    function Jw(t, e) {
        t.srcFactor = Go[e];
    }
    function ey(t, e) {
        t.stencilBack = e;
    }
    function ty(t, e) {
        t.stencilClearValue = e >>> 0;
    }
    function ry(t, e) {
        t.stencilFront = e;
    }
    function ny(t, e) {
        t.stencilLoadOp = ns[e];
    }
    function iy(t, e) {
        t.stencilReadMask = e >>> 0;
    }
    function sy(t, e) {
        t.stencilReadOnly = e !== 0;
    }
    function ay(t, e) {
        t.stencilStoreOp = ss[e];
    }
    function oy(t, e) {
        t.stencilWriteMask = e >>> 0;
    }
    function cy(t, e) {
        t.stepMode = cT[e];
    }
    function uy(t, e) {
        t.storageTexture = e;
    }
    function ly(t, e) {
        t.storeOp = ss[e];
    }
    function dy(t, e) {
        t.stripIndexFormat = Jk[e];
    }
    function fy(t, e) {
        t.targets = e;
    }
    function hy(t, e) {
        t.texture = e;
    }
    function my(t, e) {
        t.texture = e;
    }
    function py(t, e) {
        t.texture = e;
    }
    function gy(t, e) {
        t.timestampWrites = e;
    }
    function _y(t, e) {
        t.topology = rT[e];
    }
    function by(t, e) {
        t.type = nT[e];
    }
    function wy(t, e) {
        t.type = Xk[e];
    }
    function yy(t, e) {
        t.unclippedDepth = e !== 0;
    }
    function ky(t, e) {
        t.usage = e >>> 0;
    }
    function Ty(t, e) {
        t.usage = e >>> 0;
    }
    function Sy(t, e) {
        t.usage = e >>> 0;
    }
    function xy(t, e) {
        t.usage = e >>> 0;
    }
    function Py(t, e) {
        t.vertex = e;
    }
    function Cy(t, e) {
        t.view = e;
    }
    function Iy(t, e) {
        t.view = e;
    }
    function vy(t, e) {
        t.viewDimension = os[e];
    }
    function Ey(t, e) {
        t.viewDimension = os[e];
    }
    function Ay(t, e) {
        t.viewFormats = e;
    }
    function By(t, e) {
        t.viewFormats = e;
    }
    function Fy(t, e) {
        t.visibility = e >>> 0;
    }
    function Ry(t, e) {
        t.width = e >>> 0;
    }
    function My(t, e) {
        t.width = e >>> 0;
    }
    function Dy(t, e) {
        t.width = e >>> 0;
    }
    function Oy(t, e) {
        t.writeMask = e >>> 0;
    }
    function zy(t, e) {
        t.x = e >>> 0;
    }
    function Ny(t, e) {
        t.x = e >>> 0;
    }
    function Uy(t, e) {
        t.y = e >>> 0;
    }
    function Ly(t, e) {
        t.y = e >>> 0;
    }
    function Wy(t, e) {
        t.z = e >>> 0;
    }
    function Vy(t, e, r, n) {
        t.shaderSource(e, $(r, n));
    }
    function Hy(t, e, r, n) {
        t.shaderSource(e, $(r, n));
    }
    function qy(t, e) {
        const r = e.stack, n = Ne(r, D.__wbindgen_malloc, D.__wbindgen_realloc), i = ke;
        ee().setInt32(t + 4, i, !0), ee().setInt32(t + 0, n, !0);
    }
    function Gy() {
        const t = typeof global > "u" ? null : global;
        return H(t) ? 0 : X(t);
    }
    function jy() {
        const t = typeof globalThis > "u" ? null : globalThis;
        return H(t) ? 0 : X(t);
    }
    function $y() {
        const t = typeof self > "u" ? null : self;
        return H(t) ? 0 : X(t);
    }
    function Ky() {
        const t = typeof window > "u" ? null : window;
        return H(t) ? 0 : X(t);
    }
    function Xy(t, e, r, n, i) {
        t.stencilFuncSeparate(e >>> 0, r >>> 0, n, i >>> 0);
    }
    function Qy(t, e, r, n, i) {
        t.stencilFuncSeparate(e >>> 0, r >>> 0, n, i >>> 0);
    }
    function Yy(t, e, r) {
        t.stencilMaskSeparate(e >>> 0, r >>> 0);
    }
    function Zy(t, e, r) {
        t.stencilMaskSeparate(e >>> 0, r >>> 0);
    }
    function Jy(t, e) {
        t.stencilMask(e >>> 0);
    }
    function e1(t, e) {
        t.stencilMask(e >>> 0);
    }
    function t1(t, e, r, n, i) {
        t.stencilOpSeparate(e >>> 0, r >>> 0, n >>> 0, i >>> 0);
    }
    function r1(t, e, r, n, i) {
        t.stencilOpSeparate(e >>> 0, r >>> 0, n >>> 0, i >>> 0);
    }
    function n1(t, e) {
        t.submit(e);
    }
    function i1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function s1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function a1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function o1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l) {
            t.texImage3D(e >>> 0, r, n, i, s, a, o, c >>> 0, u >>> 0, l);
        }, arguments);
    }
    function c1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l) {
            t.texImage3D(e >>> 0, r, n, i, s, a, o, c >>> 0, u >>> 0, l);
        }, arguments);
    }
    function u1(t, e, r, n) {
        t.texParameteri(e >>> 0, r >>> 0, n);
    }
    function l1(t, e, r, n) {
        t.texParameteri(e >>> 0, r >>> 0, n);
    }
    function d1(t, e, r, n, i, s) {
        t.texStorage2D(e >>> 0, r, n >>> 0, i, s);
    }
    function f1(t, e, r, n, i, s, a) {
        t.texStorage3D(e >>> 0, r, n >>> 0, i, s, a);
    }
    function h1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function m1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function p1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function g1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function _1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function b1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function w1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function y1() {
        return N(function(t, e, r, n, i, s, a, o, c, u) {
            t.texSubImage2D(e >>> 0, r, n, i, s, a, o >>> 0, c >>> 0, u);
        }, arguments);
    }
    function k1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l, d) {
            t.texSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l >>> 0, d);
        }, arguments);
    }
    function T1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l, d) {
            t.texSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l >>> 0, d);
        }, arguments);
    }
    function S1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l, d) {
            t.texSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l >>> 0, d);
        }, arguments);
    }
    function x1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l, d) {
            t.texSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l >>> 0, d);
        }, arguments);
    }
    function P1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l, d) {
            t.texSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l >>> 0, d);
        }, arguments);
    }
    function C1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l, d) {
            t.texSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l >>> 0, d);
        }, arguments);
    }
    function I1() {
        return N(function(t, e, r, n, i, s, a, o, c, u, l, d) {
            t.texSubImage3D(e >>> 0, r, n, i, s, a, o, c, u >>> 0, l >>> 0, d);
        }, arguments);
    }
    function v1(t, e, r) {
        return t.then(e, r);
    }
    function E1(t, e) {
        return t.then(e);
    }
    function A1(t, e, r) {
        return t.then(e, r);
    }
    function B1(t, e, r) {
        t.uniform1f(e, r);
    }
    function F1(t, e, r) {
        t.uniform1f(e, r);
    }
    function R1(t, e, r) {
        t.uniform1i(e, r);
    }
    function M1(t, e, r) {
        t.uniform1i(e, r);
    }
    function D1(t, e, r) {
        t.uniform1ui(e, r >>> 0);
    }
    function O1(t, e, r, n) {
        t.uniform2fv(e, ue(r, n));
    }
    function z1(t, e, r, n) {
        t.uniform2fv(e, ue(r, n));
    }
    function N1(t, e, r, n) {
        t.uniform2iv(e, Pt(r, n));
    }
    function U1(t, e, r, n) {
        t.uniform2iv(e, Pt(r, n));
    }
    function L1(t, e, r, n) {
        t.uniform2uiv(e, fr(r, n));
    }
    function W1(t, e, r, n) {
        t.uniform3fv(e, ue(r, n));
    }
    function V1(t, e, r, n) {
        t.uniform3fv(e, ue(r, n));
    }
    function H1(t, e, r, n) {
        t.uniform3iv(e, Pt(r, n));
    }
    function q1(t, e, r, n) {
        t.uniform3iv(e, Pt(r, n));
    }
    function G1(t, e, r, n) {
        t.uniform3uiv(e, fr(r, n));
    }
    function j1(t, e, r, n, i, s) {
        t.uniform4f(e, r, n, i, s);
    }
    function $1(t, e, r, n, i, s) {
        t.uniform4f(e, r, n, i, s);
    }
    function K1(t, e, r, n) {
        t.uniform4fv(e, ue(r, n));
    }
    function X1(t, e, r, n) {
        t.uniform4fv(e, ue(r, n));
    }
    function Q1(t, e, r, n) {
        t.uniform4iv(e, Pt(r, n));
    }
    function Y1(t, e, r, n) {
        t.uniform4iv(e, Pt(r, n));
    }
    function Z1(t, e, r, n) {
        t.uniform4uiv(e, fr(r, n));
    }
    function J1(t, e, r, n) {
        t.uniformBlockBinding(e, r >>> 0, n >>> 0);
    }
    function ek(t, e, r, n, i) {
        t.uniformMatrix2fv(e, r !== 0, ue(n, i));
    }
    function tk(t, e, r, n, i) {
        t.uniformMatrix2fv(e, r !== 0, ue(n, i));
    }
    function rk(t, e, r, n, i) {
        t.uniformMatrix2x3fv(e, r !== 0, ue(n, i));
    }
    function nk(t, e, r, n, i) {
        t.uniformMatrix2x4fv(e, r !== 0, ue(n, i));
    }
    function ik(t, e, r, n, i) {
        t.uniformMatrix3fv(e, r !== 0, ue(n, i));
    }
    function sk(t, e, r, n, i) {
        t.uniformMatrix3fv(e, r !== 0, ue(n, i));
    }
    function ak(t, e, r, n, i) {
        t.uniformMatrix3x2fv(e, r !== 0, ue(n, i));
    }
    function ok(t, e, r, n, i) {
        t.uniformMatrix3x4fv(e, r !== 0, ue(n, i));
    }
    function ck(t, e, r, n, i) {
        t.uniformMatrix4fv(e, r !== 0, ue(n, i));
    }
    function uk(t, e, r, n, i) {
        t.uniformMatrix4fv(e, r !== 0, ue(n, i));
    }
    function lk(t, e, r, n, i) {
        t.uniformMatrix4x2fv(e, r !== 0, ue(n, i));
    }
    function dk(t, e, r, n, i) {
        t.uniformMatrix4x3fv(e, r !== 0, ue(n, i));
    }
    function fk(t) {
        t.unmap();
    }
    function hk(t, e) {
        t.useProgram(e);
    }
    function mk(t, e) {
        t.useProgram(e);
    }
    function pk(t) {
        return t.value;
    }
    function gk(t, e, r) {
        t.vertexAttribDivisorANGLE(e >>> 0, r >>> 0);
    }
    function _k(t, e, r) {
        t.vertexAttribDivisor(e >>> 0, r >>> 0);
    }
    function bk(t, e, r, n, i, s) {
        t.vertexAttribIPointer(e >>> 0, r, n >>> 0, i, s);
    }
    function wk(t, e, r, n, i, s, a) {
        t.vertexAttribPointer(e >>> 0, r, n >>> 0, i !== 0, s, a);
    }
    function yk(t, e, r, n, i, s, a) {
        t.vertexAttribPointer(e >>> 0, r, n >>> 0, i !== 0, s, a);
    }
    function kk(t) {
        return t.videoHeight;
    }
    function Tk(t) {
        return t.videoWidth;
    }
    function Sk(t, e, r, n, i) {
        t.viewport(e, r, n, i);
    }
    function xk(t, e, r, n, i) {
        t.viewport(e, r, n, i);
    }
    function Pk(t) {
        return t.width;
    }
    function Ck(t) {
        return t.width;
    }
    function Ik(t) {
        return t.width;
    }
    function vk(t) {
        return t.width;
    }
    function Ek(t) {
        return t.width;
    }
    function Ak() {
        return N(function(t, e, r, n, i, s) {
            t.writeTexture(e, cs(r, n), i, s);
        }, arguments);
    }
    function Bk(t, e) {
        return $o(t, e, jk);
    }
    function Fk(t, e) {
        return $o(t, e, Gk);
    }
    function Rk(t) {
        return t;
    }
    function Mk(t) {
        return t;
    }
    function Dk(t, e) {
        return ue(t, e);
    }
    function Ok(t, e) {
        return uT(t, e);
    }
    function zk(t, e) {
        return Pt(t, e);
    }
    function Nk(t, e) {
        return lT(t, e);
    }
    function Uk(t, e) {
        return dT(t, e);
    }
    function Lk(t, e) {
        return fr(t, e);
    }
    function Wk(t, e) {
        return cs(t, e);
    }
    function Vk(t, e) {
        return $(t, e);
    }
    function Hk(t) {
        return BigInt.asUintN(64, t);
    }
    function qk() {
        const t = D.__wbindgen_externrefs, e = t.grow(4);
        t.set(0, void 0), t.set(e + 0, void 0), t.set(e + 1, null), t.set(e + 2, !0), t.set(e + 3, !1);
    }
    function Gk(t, e, r) {
        D.wasm_bindgen__convert__closures_____invoke__he2009f21b86b77fe(t, e, r);
    }
    function jk(t, e, r) {
        const n = D.wasm_bindgen__convert__closures_____invoke__h328812056897e0cd(t, e, r);
        if (n[1]) throw Me(n[0]);
    }
    function $k(t, e, r, n) {
        D.wasm_bindgen__convert__closures_____invoke__h4b3060f33e3c4576(t, e, r, n);
    }
    const ts = [
        "clamp-to-edge",
        "repeat",
        "mirror-repeat"
    ], Go = [
        "zero",
        "one",
        "src",
        "one-minus-src",
        "src-alpha",
        "one-minus-src-alpha",
        "dst",
        "one-minus-dst",
        "dst-alpha",
        "one-minus-dst-alpha",
        "src-alpha-saturated",
        "constant",
        "one-minus-constant",
        "src1",
        "one-minus-src1",
        "src1-alpha",
        "one-minus-src1-alpha"
    ], Kk = [
        "add",
        "subtract",
        "reverse-subtract",
        "min",
        "max"
    ], Xk = [
        "uniform",
        "storage",
        "read-only-storage"
    ], Qk = [
        "opaque",
        "premultiplied"
    ], rs = [
        "never",
        "less",
        "equal",
        "less-equal",
        "greater",
        "not-equal",
        "greater-equal",
        "always"
    ], Yk = [
        "none",
        "front",
        "back"
    ], jo = [
        "nearest",
        "linear"
    ], Zk = [
        "ccw",
        "cw"
    ], Jk = [
        "uint16",
        "uint32"
    ], ns = [
        "load",
        "clear"
    ], eT = [
        "nearest",
        "linear"
    ], tT = [
        "low-power",
        "high-performance"
    ], rT = [
        "point-list",
        "line-list",
        "line-strip",
        "triangle-list",
        "triangle-strip"
    ], nT = [
        "filtering",
        "non-filtering",
        "comparison"
    ], is = [
        "keep",
        "zero",
        "replace",
        "invert",
        "increment-clamp",
        "decrement-clamp",
        "increment-wrap",
        "decrement-wrap"
    ], iT = [
        "write-only",
        "read-only",
        "read-write"
    ], ss = [
        "store",
        "discard"
    ], as = [
        "all",
        "stencil-only",
        "depth-only"
    ], sT = [
        "1d",
        "2d",
        "3d"
    ], Vt = [
        "r8unorm",
        "r8snorm",
        "r8uint",
        "r8sint",
        "r16uint",
        "r16sint",
        "r16float",
        "rg8unorm",
        "rg8snorm",
        "rg8uint",
        "rg8sint",
        "r32uint",
        "r32sint",
        "r32float",
        "rg16uint",
        "rg16sint",
        "rg16float",
        "rgba8unorm",
        "rgba8unorm-srgb",
        "rgba8snorm",
        "rgba8uint",
        "rgba8sint",
        "bgra8unorm",
        "bgra8unorm-srgb",
        "rgb9e5ufloat",
        "rgb10a2uint",
        "rgb10a2unorm",
        "rg11b10ufloat",
        "rg32uint",
        "rg32sint",
        "rg32float",
        "rgba16uint",
        "rgba16sint",
        "rgba16float",
        "rgba32uint",
        "rgba32sint",
        "rgba32float",
        "stencil8",
        "depth16unorm",
        "depth24plus",
        "depth24plus-stencil8",
        "depth32float",
        "depth32float-stencil8",
        "bc1-rgba-unorm",
        "bc1-rgba-unorm-srgb",
        "bc2-rgba-unorm",
        "bc2-rgba-unorm-srgb",
        "bc3-rgba-unorm",
        "bc3-rgba-unorm-srgb",
        "bc4-r-unorm",
        "bc4-r-snorm",
        "bc5-rg-unorm",
        "bc5-rg-snorm",
        "bc6h-rgb-ufloat",
        "bc6h-rgb-float",
        "bc7-rgba-unorm",
        "bc7-rgba-unorm-srgb",
        "etc2-rgb8unorm",
        "etc2-rgb8unorm-srgb",
        "etc2-rgb8a1unorm",
        "etc2-rgb8a1unorm-srgb",
        "etc2-rgba8unorm",
        "etc2-rgba8unorm-srgb",
        "eac-r11unorm",
        "eac-r11snorm",
        "eac-rg11unorm",
        "eac-rg11snorm",
        "astc-4x4-unorm",
        "astc-4x4-unorm-srgb",
        "astc-5x4-unorm",
        "astc-5x4-unorm-srgb",
        "astc-5x5-unorm",
        "astc-5x5-unorm-srgb",
        "astc-6x5-unorm",
        "astc-6x5-unorm-srgb",
        "astc-6x6-unorm",
        "astc-6x6-unorm-srgb",
        "astc-8x5-unorm",
        "astc-8x5-unorm-srgb",
        "astc-8x6-unorm",
        "astc-8x6-unorm-srgb",
        "astc-8x8-unorm",
        "astc-8x8-unorm-srgb",
        "astc-10x5-unorm",
        "astc-10x5-unorm-srgb",
        "astc-10x6-unorm",
        "astc-10x6-unorm-srgb",
        "astc-10x8-unorm",
        "astc-10x8-unorm-srgb",
        "astc-10x10-unorm",
        "astc-10x10-unorm-srgb",
        "astc-12x10-unorm",
        "astc-12x10-unorm-srgb",
        "astc-12x12-unorm",
        "astc-12x12-unorm-srgb"
    ], aT = [
        "float",
        "unfilterable-float",
        "depth",
        "sint",
        "uint"
    ], os = [
        "1d",
        "2d",
        "2d-array",
        "cube",
        "cube-array",
        "3d"
    ], oT = [
        "uint8",
        "uint8x2",
        "uint8x4",
        "sint8",
        "sint8x2",
        "sint8x4",
        "unorm8",
        "unorm8x2",
        "unorm8x4",
        "snorm8",
        "snorm8x2",
        "snorm8x4",
        "uint16",
        "uint16x2",
        "uint16x4",
        "sint16",
        "sint16x2",
        "sint16x4",
        "unorm16",
        "unorm16x2",
        "unorm16x4",
        "snorm16",
        "snorm16x2",
        "snorm16x4",
        "float16",
        "float16x2",
        "float16x4",
        "float32",
        "float32x2",
        "float32x3",
        "float32x4",
        "uint32",
        "uint32x2",
        "uint32x3",
        "uint32x4",
        "sint32",
        "sint32x2",
        "sint32x3",
        "sint32x4",
        "unorm10-10-10-2",
        "unorm8x4-bgra"
    ], cT = [
        "vertex",
        "instance"
    ];
    function X(t) {
        const e = D.__externref_table_alloc();
        return D.__wbindgen_externrefs.set(e, t), e;
    }
    const ya = typeof FinalizationRegistry > "u" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((t)=>D.__wbindgen_destroy_closure(t.a, t.b));
    function ki(t) {
        const e = typeof t;
        if (e == "number" || e == "boolean" || t == null) return `${t}`;
        if (e == "string") return `"${t}"`;
        if (e == "symbol") {
            const i = t.description;
            return i == null ? "Symbol" : `Symbol(${i})`;
        }
        if (e == "function") {
            const i = t.name;
            return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
        }
        if (Array.isArray(t)) {
            const i = t.length;
            let s = "[";
            i > 0 && (s += ki(t[0]));
            for(let a = 1; a < i; a++)s += ", " + ki(t[a]);
            return s += "]", s;
        }
        const r = /\[object ([^\]]+)\]/.exec(toString.call(t));
        let n;
        if (r && r.length > 1) n = r[1];
        else return toString.call(t);
        if (n == "Object") try {
            return "Object(" + JSON.stringify(t) + ")";
        } catch  {
            return "Object";
        }
        return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : n;
    }
    function ue(t, e) {
        return t = t >>> 0, fT().subarray(t / 4, t / 4 + e);
    }
    function uT(t, e) {
        return t = t >>> 0, hT().subarray(t / 2, t / 2 + e);
    }
    function Pt(t, e) {
        return t = t >>> 0, mT().subarray(t / 4, t / 4 + e);
    }
    function lT(t, e) {
        return t = t >>> 0, pT().subarray(t / 1, t / 1 + e);
    }
    function dT(t, e) {
        return t = t >>> 0, gT().subarray(t / 2, t / 2 + e);
    }
    function fr(t, e) {
        return t = t >>> 0, _T().subarray(t / 4, t / 4 + e);
    }
    function cs(t, e) {
        return t = t >>> 0, or().subarray(t / 1, t / 1 + e);
    }
    let Gt = null;
    function ee() {
        return (Gt === null || Gt.buffer.detached === !0 || Gt.buffer.detached === void 0 && Gt.buffer !== D.memory.buffer) && (Gt = new DataView(D.memory.buffer)), Gt;
    }
    let $r = null;
    function fT() {
        return ($r === null || $r.byteLength === 0) && ($r = new Float32Array(D.memory.buffer)), $r;
    }
    let Kr = null;
    function hT() {
        return (Kr === null || Kr.byteLength === 0) && (Kr = new Int16Array(D.memory.buffer)), Kr;
    }
    let Xr = null;
    function mT() {
        return (Xr === null || Xr.byteLength === 0) && (Xr = new Int32Array(D.memory.buffer)), Xr;
    }
    let Qr = null;
    function pT() {
        return (Qr === null || Qr.byteLength === 0) && (Qr = new Int8Array(D.memory.buffer)), Qr;
    }
    function $(t, e) {
        return t = t >>> 0, yT(t, e);
    }
    let Yr = null;
    function gT() {
        return (Yr === null || Yr.byteLength === 0) && (Yr = new Uint16Array(D.memory.buffer)), Yr;
    }
    let Zr = null;
    function _T() {
        return (Zr === null || Zr.byteLength === 0) && (Zr = new Uint32Array(D.memory.buffer)), Zr;
    }
    let Jr = null;
    function or() {
        return (Jr === null || Jr.byteLength === 0) && (Jr = new Uint8Array(D.memory.buffer)), Jr;
    }
    function N(t, e) {
        try {
            return t.apply(this, e);
        } catch (r) {
            const n = X(r);
            D.__wbindgen_exn_store(n);
        }
    }
    function H(t) {
        return t == null;
    }
    function $o(t, e, r) {
        const n = {
            a: t,
            b: e,
            cnt: 1
        }, i = (...s)=>{
            n.cnt++;
            const a = n.a;
            n.a = 0;
            try {
                return r(a, n.b, ...s);
            } finally{
                n.a = a, i._wbg_cb_unref();
            }
        };
        return i._wbg_cb_unref = ()=>{
            --n.cnt === 0 && (D.__wbindgen_destroy_closure(n.a, n.b), n.a = 0, ya.unregister(n));
        }, ya.register(i, n, n), i;
    }
    function bT(t, e) {
        const r = e(t.length * 1, 1) >>> 0;
        return or().set(t, r / 1), ke = t.length, r;
    }
    function Ne(t, e, r) {
        if (r === void 0) {
            const o = Er.encode(t), c = e(o.length, 1) >>> 0;
            return or().subarray(c, c + o.length).set(o), ke = o.length, c;
        }
        let n = t.length, i = e(n, 1) >>> 0;
        const s = or();
        let a = 0;
        for(; a < n; a++){
            const o = t.charCodeAt(a);
            if (o > 127) break;
            s[i + a] = o;
        }
        if (a !== n) {
            a !== 0 && (t = t.slice(a)), i = r(i, n, n = a + t.length * 3, 1) >>> 0;
            const o = or().subarray(i + a, i + n), c = Er.encodeInto(t, o);
            a += c.written, i = r(i, n, a, 1) >>> 0;
        }
        return ke = a, i;
    }
    function Me(t) {
        const e = D.__wbindgen_externrefs.get(t);
        return D.__externref_table_dealloc(t), e;
    }
    let nn = new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    });
    nn.decode();
    const wT = 2146435072;
    let ri = 0;
    function yT(t, e) {
        return ri += e, ri >= wT && (nn = new TextDecoder("utf-8", {
            ignoreBOM: !0,
            fatal: !0
        }), nn.decode(), ri = e), nn.decode(or().subarray(t, t + e));
    }
    const Er = new TextEncoder;
    "encodeInto" in Er || (Er.encodeInto = function(t, e) {
        const r = Er.encode(t);
        return e.set(r), {
            read: t.length,
            written: r.length
        };
    });
    let ke = 0, D;
    function kT(t) {
        D = t;
    }
    URL = globalThis.URL;
    const TT = await Ef({
        "./opencut_wasm_bg.js": {
            __wbg_get_unchecked_c33f0e513c522d7c: xg,
            __wbg_next_9a5990d0355cdd1a: V_,
            __wbg_done_e0b2820e599cb9f4: mp,
            __wbg_value_8996dd08e99f9529: pk,
            __wbg_instanceof_Map_4b9c368d84df6811: Ng,
            __wbg_length_713cc1160ce7b5b9: Yg,
            __wbg_set_c78f0ccf7c3f53b7: e0,
            __wbg_call_1aea13500fe8ff6c: Mh,
            __wbg_new_typed_5101eada2c6754de: U_,
            __wbg_then_f6dedb0d880db23a: A1,
            __wbg_instanceof_Object_a99dcb8b396fa196: Ug,
            __wbg_new_227d7c05414eb861: M_,
            __wbg_stack_3b0d974bbf31e44f: qy,
            __wbg_error_a6fa202b58aa1cd3: Fp,
            __wbg_get_8944f33c9c7f4f6c: kg,
            __wbg_get_with_ref_key_6412cf3094599694: Pg,
            __wbg_String_8564e559799eccda: Ff,
            __wbg_set_color_attachments_b740d060dacde5c0: n0,
            __wbg_set_label_797345a8c9c86146: J0,
            __wbg_set_view_6ff951d6e3f9e337: Cy,
            __wbg_set_depth_clear_value_57c2283d39fbb181: f0,
            __wbg_set_depth_load_op_f95fdb158b819261: p0,
            __wbg_set_depth_store_op_4c56ab1d005c7bf6: y0,
            __wbg_set_depth_read_only_878b741b02a4dd71: _0,
            __wbg_set_stencil_clear_value_15afeb03c22cd51d: ty,
            __wbg_set_stencil_load_op_1cd94e9e8c54f611: ny,
            __wbg_set_stencil_store_op_a244d5347f386c8c: ay,
            __wbg_set_stencil_read_only_f071431988182ad8: sy,
            __wbg_set_depth_stencil_attachment_82ce8924f4e0e79b: w0,
            __wbg_set_query_set_dcf406a51ece8f85: Nw,
            __wbg_set_beginning_of_pass_write_index_c2f97408798615ca: Gb,
            __wbg_set_end_of_pass_write_index_3476a9a4411846af: C0,
            __wbg_set_timestamp_writes_0236dfc7ae2b1a03: gy,
            __wbg_beginRenderPass_a19cc6156a7858b4: rh,
            __wbg_set_width_63034f88f9905ea3: Ry,
            __wbg_set_height_66583e77881d3a51: j0,
            __wbg_set_depth_or_array_layers_7335d3fc04cd5ade: g0,
            __wbg_label_18cae34ff19933d7: Xg,
            __wbg_set_label_c3405868bd8f6ab5: nw,
            __wbg_finish_68d7c5925d3fa394: Dp,
            __wbg_finish_48a7b6da7b76999e: Mp,
            __wbg_instanceof_GpuCanvasContext_c2609c698a76a6b6: Og,
            __wbg_maxTextureDimension1D_53d154cf8f16d439: T_,
            __wbg_maxTextureDimension2D_578c2c471b73bb60: S_,
            __wbg_maxTextureDimension3D_3532b309b08a5ddf: x_,
            __wbg_maxTextureArrayLayers_6fffbda0cd6f3036: k_,
            __wbg_maxBindGroups_3e48365ce9cb69b2: r_,
            __wbg_maxBindingsPerBindGroup_19eab6283879be75: n_,
            __wbg_maxDynamicUniformBuffersPerPipelineLayout_4c57dbd81a8d1c49: m_,
            __wbg_maxDynamicStorageBuffersPerPipelineLayout_122112462e514d25: h_,
            __wbg_maxSampledTexturesPerShaderStage_cea16550f969bbdc: g_,
            __wbg_maxSamplersPerShaderStage_1cbd8dba92d87dd9: __,
            __wbg_maxStorageBuffersPerShaderStage_e496ad22f8b97f12: w_,
            __wbg_maxStorageTexturesPerShaderStage_258aab0d332d9efe: y_,
            __wbg_maxUniformBuffersPerShaderStage_911223507ba8d12a: C_,
            __wbg_maxUniformBufferBindingSize_6c3b6b8424799146: P_,
            __wbg_maxStorageBufferBindingSize_ff2e77e686018944: b_,
            __wbg_maxVertexBuffers_15be37c3f8fbfe0a: E_,
            __wbg_maxBufferSize_8086300d000af7cb: i_,
            __wbg_maxVertexAttributes_399d9b947e980d08: I_,
            __wbg_maxVertexBufferArrayStride_b5550ff3b3aa4a9e: v_,
            __wbg_maxInterStageShaderVariables_5bb90c2a06f1e9ce: p_,
            __wbg_minUniformBufferOffsetAlignment_b9d974e659cd3e20: B_,
            __wbg_minStorageBufferOffsetAlignment_5c389200e0be5fe1: A_,
            __wbg_maxColorAttachments_3110f22e4c5e3621: a_,
            __wbg_maxColorAttachmentBytesPerSample_ee822e1793bea12f: s_,
            __wbg_maxComputeWorkgroupStorageSize_05e0131572ec6c1e: d_,
            __wbg_maxComputeInvocationsPerWorkgroup_e1b61d9c74f79e81: o_,
            __wbg_maxComputeWorkgroupSizeX_202ebe3252c09676: c_,
            __wbg_maxComputeWorkgroupSizeY_4f66f59c2daaa8f1: u_,
            __wbg_maxComputeWorkgroupSizeZ_eadb1eb36902e045: l_,
            __wbg_maxComputeWorkgroupsPerDimension_47cd4aa37eba4a57: f_,
            __wbg_description_972ee565dde8fe3f: op,
            __wbg_set_dst_factor_1382684d97e2aec4: P0,
            __wbg_set_operation_74a529d361734388: Aw,
            __wbg_set_src_factor_9a8e0943a05c9174: Jw,
            __wbg_set_texture_2c34d28ab9666948: hy,
            __wbg_set_mip_level_161666aedb691ca3: bw,
            __wbg_set_x_ffcb360b171098d5: Ny,
            __wbg_set_y_db82e366feb18537: Ly,
            __wbg_set_z_cec02b76fd208d0e: Wy,
            __wbg_set_origin_d09654f499e9edb8: Fw,
            __wbg_set_aspect_4c0237c8f21de349: Nb,
            __wbg_Window_5bac5165340af82e: Rf,
            __wbg_gpu_3f9d7df9a18237f8: Cg,
            __wbg_WorkerGlobalScope_d0d150069210a6e8: Mf,
            __wbg_set_a_2f4495829c853bba: vb,
            __wbg_set_b_7081554879455e65: Vb,
            __wbg_set_g_aa23517844bd7f61: H0,
            __wbg_set_r_8961014434a7656e: Uw,
            __wbg_set_bytes_per_row_39bcca8e0c25e0ee: Jb,
            __wbg_set_rows_per_image_7203b6e2d244a111: qw,
            __wbg_set_offset_a3a60cec10207186: vw,
            __wbg_writeTexture_d42ce6ec94b2c6ca: Ak,
            __wbg_onSubmittedWorkDone_81e152567230130a: j_,
            __wbg_set_source_51577a2cebeadf81: Zw,
            __wbg_set_x_0b48c73e72f71653: zy,
            __wbg_set_y_046a6a6e9b0ccbc6: Uy,
            __wbg_set_origin_f7a8894367b28556: Rw,
            __wbg_set_flip_y_21c0cdab245f4d89: R0,
            __wbg_set_texture_ac9a46252c0cb532: my,
            __wbg_set_mip_level_e61d3964c419f64b: kw,
            __wbg_set_origin_42cf0cf261f50d63: Bw,
            __wbg_set_aspect_adde591ce42eb208: Ub,
            __wbg_set_premultiplied_alpha_dde44b27abcf88fc: Ow,
            __wbg_copyExternalImageToTexture_6d56ad685a99824d: im,
            __wbg_push_bb0def92a641d074: J_,
            __wbg_submit_f39583470d95df20: n1,
            __wbg_getMappedRange_4a3dc3f452433b71: tg,
            __wbg_unmap_9455a68932e9b935: fk,
            __wbg_destroy_479a1ccb4eb28cd7: cp,
            __wbg_mapAsync_288e2fddbc3f7f7b: t_,
            __wbg_set_size_85cb1c2c4c3ea73a: Qw,
            __wbg_set_usage_e8d45decd5c483b3: xy,
            __wbg_set_mapped_at_creation_c78869832c67816c: hw,
            __wbg_set_label_f00eb249a34df7db: sw,
            __wbg_createBuffer_59de141e89014140: lm,
            __wbg_set_address_mode_u_c13cdf94d097b16d: Ab,
            __wbg_set_address_mode_v_c09db9861cd052a6: Bb,
            __wbg_set_address_mode_w_0b49c35f3d4322bf: Fb,
            __wbg_set_compare_11834994f7d75687: a0,
            __wbg_set_lod_max_clamp_fd1548dc78538913: lw,
            __wbg_set_lod_min_clamp_b489016289e378d2: dw,
            __wbg_set_mag_filter_b4e8d7f2fa665d2e: fw,
            __wbg_set_min_filter_cd8cf3dcdeebaa5b: _w,
            __wbg_set_mipmap_filter_a436d61249cfa785: Tw,
            __wbg_set_max_anisotropy_a019fd38d9ba634e: pw,
            __wbg_set_label_34d2766c2203f76a: Y0,
            __wbg_createSampler_6b972cd00bcc5dfb: Pm,
            __wbg_set_format_fcbaa54d6b5c186a: L0,
            __wbg_set_size_81a77f7f4f34fbed: Xw,
            __wbg_set_usage_d9ff4b7757fac246: Sy,
            __wbg_set_label_8fdd5f28eea3ca08: ew,
            __wbg_set_dimension_87dd70a08e54ea98: x0,
            __wbg_set_mip_level_count_9a86e098393fe360: yw,
            __wbg_set_sample_count_4d7160817d98838f: Gw,
            __wbg_set_view_formats_733fb624c2f2ef6b: Ay,
            __wbg_createTexture_011d4b0badf853e3: Em,
            __wbg_set_entries_44ee8dc60918063d: I0,
            __wbg_set_layout_9590b02a1d72ac45: ow,
            __wbg_set_label_0e9f90ea4e961823: X0,
            __wbg_createBindGroup_91159ca759115307: um,
            __wbg_set_code_3bb44fc02aa17153: r0,
            __wbg_set_label_f571593aaa82f18b: aw,
            __wbg_createShaderModule_bbe0476992dd060e: Cm,
            __wbg_set_label_a4be4acc3510c62f: tw,
            __wbg_createCommandEncoder_dc2b2ca6f09bd4c3: hm,
            __wbg_set_bind_group_layouts_5c298441f47e30a1: jb,
            __wbg_set_label_d73358f96a62d3bc: iw,
            __wbg_createPipelineLayout_a5290f84492f8b1e: _m,
            __wbg_set_module_951f2b6e5477a260: Sw,
            __wbg_set_entry_point_418e5aecbf7f95b4: E0,
            __wbg_set_buffers_3f9c487ea01dddcf: Zb,
            __wbg_set_layout_a065a939d1d05a2d: cw,
            __wbg_set_vertex_b95705590b782671: Py,
            __wbg_set_label_bb92451e0d92abf4: rw,
            __wbg_set_format_2bd90cb220cc6884: M0,
            __wbg_set_depth_compare_a9c538cec0e01535: h0,
            __wbg_set_depth_write_enabled_f726d4f27a24ff7e: k0,
            __wbg_set_depth_bias_ebe05aecbb98e11f: l0,
            __wbg_set_depth_bias_clamp_f573c2dda55692a6: u0,
            __wbg_set_depth_bias_slope_scale_27c8208740c46086: d0,
            __wbg_set_compare_00dc33383c873ad5: s0,
            __wbg_set_depth_fail_op_42b9d46a7c67baae: m0,
            __wbg_set_fail_op_6f4612035f584d02: F0,
            __wbg_set_pass_op_8abd39478c76666a: Mw,
            __wbg_set_stencil_back_596ea9628419413d: ey,
            __wbg_set_stencil_front_31be994e05be5aaa: ry,
            __wbg_set_stencil_read_mask_1635f30a0e6539e3: iy,
            __wbg_set_stencil_write_mask_7809f82a1debe58f: oy,
            __wbg_set_depth_stencil_1c7bed669574dd1e: b0,
            __wbg_set_module_a7b3448454ca8879: xw,
            __wbg_set_targets_22473476afe0dabd: fy,
            __wbg_set_entry_point_ac45ddee35909233: A0,
            __wbg_set_fragment_9b5673b1b740fe0e: W0,
            __wbg_set_count_ab42cbc78635ed91: o0,
            __wbg_set_mask_cee9de29cbe61459: mw,
            __wbg_set_alpha_to_coverage_enabled_ab6a22e18e338493: Db,
            __wbg_set_multisample_bb6537e862d91237: Pw,
            __wbg_set_cull_mode_c4f1ef740bd14c40: c0,
            __wbg_set_front_face_bb590812353fd2e0: V0,
            __wbg_set_strip_index_format_e76748cd840ab562: dy,
            __wbg_set_topology_e18a15a717ebc912: _y,
            __wbg_set_unclipped_depth_0f5d142d317e3a7c: yy,
            __wbg_set_primitive_f189fcdcb22d09e0: zw,
            __wbg_createRenderPipeline_f7aca470ad8ce865: km,
            __wbg_set_entries_803b89386febf57c: v0,
            __wbg_set_label_280bd57b618e4cf6: Q0,
            __wbg_createBindGroupLayout_adb8337a6808ae24: cm,
            __wbg_end_1db12af2e0ff1235: Ap,
            __wbg_set_required_limits_c9ee7006f1d1f2ab: Ww,
            __wbg_set_required_features_ec67124fd26c4d29: Lw,
            __wbg_set_label_4bf9f5458cdc0a68: Z0,
            __wbg_requestDevice_5c307ce72228d3f7: pb,
            __wbg_limits_8837ca9ac1296563: Zg,
            __wbg_info_46732e46da34944d: Rg,
            __wbg_getPreferredCanvasFormat_54381f1ef7aec03d: ig,
            __wbg_getCurrentTexture_9b00da7f6bc38606: Yp,
            __wbg_set_device_f991f8a955db69f7: T0,
            __wbg_set_format_c23f7c142762c3a7: N0,
            __wbg_set_usage_26861a639595cd45: ky,
            __wbg_set_alpha_mode_65ba0adaef90e1f3: Mb,
            __wbg_set_view_formats_c2b27891ca5d2740: By,
            __wbg_configure_16541864db644c70: rm,
            __wbg_set_dimension_7ca3d24380d365e4: S0,
            __wbg_set_format_40d793124494a9df: O0,
            __wbg_set_aspect_feb0fac859e82372: Lb,
            __wbg_set_base_array_layer_ab196aad24c8fac6: Hb,
            __wbg_set_array_layer_count_de83f575c3f6d15e: Ob,
            __wbg_set_base_mip_level_15d29fc182e25a82: qb,
            __wbg_set_mip_level_count_1993f039035d2469: ww,
            __wbg_set_label_08e9f27a97fdc9f7: K0,
            __wbg_set_usage_7b79a227ada2f5cc: Ty,
            __wbg_createView_1ef8f1ddc16facb0: Mm,
            __wbg_set_power_preference_b8b4ea5da6674cf7: Dw,
            __wbg_requestAdapter_90f7496e67f82c21: hb,
            __wbg_queue_81f5d725809ccd54: sb,
            __wbg_instanceof_GpuAdapter_dc7e13c1676da9bd: Dg,
            __wbg_setPipeline_9f6b0a3c5901572d: Sb,
            __wbg_setBindGroup_a62f9de1cb2449b2: Tb,
            __wbg_setBindGroup_58960c4b1bcdd182: kb,
            __wbg_setVertexBuffer_c3bb3670263af952: xb,
            __wbg_setVertexBuffer_c3c88170005afc1b: Pb,
            __wbg_draw_9a35daa0096c6f2c: xp,
            __wbg_set_alpha_29642d2219224544: Rb,
            __wbg_set_color_d0208d092af4f2e6: i0,
            __wbg_set_sample_type_8d4d5b141ce0f724: jw,
            __wbg_set_multisampled_9642e942e4d9d3ee: Cw,
            __wbg_set_view_dimension_e99ec138da7b8f83: Ey,
            __wbg_set_access_802ef755476d4064: Eb,
            __wbg_set_format_e0af83ab86ee58dc: U0,
            __wbg_set_view_dimension_87c95b0d987a14cd: vy,
            __wbg_set_type_31b1662dd5a6144d: by,
            __wbg_requestAdapter_fc75ea09f9702080: mb,
            __wbg_set_attributes_39e5a71bf05309a6: Wb,
            __wbg_set_array_stride_2033aeb8a42130f9: zb,
            __wbg_set_step_mode_eb762c8c4264418f: cy,
            __wbg_set_buffer_b04e4d70b1eb4630: Yb,
            __wbg_set_visibility_315bcac6427d0ba0: Fy,
            __wbg_set_binding_234b4c508d19a0a8: $b,
            __wbg_set_sampler_35bcbac78bd4356f: $w,
            __wbg_set_texture_aeea930400349204: py,
            __wbg_set_storage_texture_22f78b5171d1195a: uy,
            __wbg_set_external_texture_73d5e5303574a1e8: B0,
            __wbg_set_format_723d6bb38a9e71d3: z0,
            __wbg_set_offset_debfe602a5fbf272: Ew,
            __wbg_set_shader_location_3ce5152f6d464a63: Kw,
            __wbg_set_buffer_8f0ef5be1b92d605: Qb,
            __wbg_set_offset_3e55dd16ffd7aac5: Iw,
            __wbg_set_size_981550e5d7941340: Yw,
            __wbg_set_binding_fd933455b600a07f: Kb,
            __wbg_set_resource_86645e7515651c0e: Hw,
            __wbg_set_format_3cc5d6ead9a8cce0: D0,
            __wbg_set_blend_1dbdd086fc4fdebf: Xb,
            __wbg_set_write_mask_0b6ca0cb1b797997: Oy,
            __wbg_set_load_op_07c59d4ab60a3a01: uw,
            __wbg_set_store_op_386596acc7bf2c16: ly,
            __wbg_set_view_cf298e1e7b6ef38a: Iy,
            __wbg_set_clear_value_1663cbe7da00e7e4: t0,
            __wbg_set_resolve_target_cc7a6f0d2973ea34: Vw,
            __wbg_set_has_dynamic_offset_ea1fb6bd94b0c904: q0,
            __wbg_set_min_binding_size_26f877007450686c: gw,
            __wbg_set_type_719f40cf36d314f1: wy,
            __wbg_includes_907769f1752a98ff: Fg,
            __wbg_instanceof_WebGl2RenderingContext_b0fd328023d101b2: Vg,
            __wbg_blendFunc_7f6cfa190353236a: Ch,
            __wbg_colorMask_9af657e57e8c55fc: $h,
            __wbg_depthFunc_a43f1c731109915b: rp,
            __wbg_depthMask_66724117973b6ff9: np,
            __wbg_fenceSync_910518819efb411a: Rp,
            __wbg_frontFace_00ef7686d1b1088a: qp,
            __wbg_uniform1ui_155d89c092153aa2: D1,
            __wbg_beginQuery_8177623d995ace6f: th,
            __wbg_bindBuffer_dfc10755fbcf7688: oh,
            __wbg_blendColor_0dc1b9e2e8699cf8: _h,
            __wbg_clearDepth_d2694099c8ee7291: Lh,
            __wbg_deleteSync_fa5d1de5dd19d2c0: Qm,
            __wbg_depthRange_e827bfffaf500974: ap,
            __wbg_drawArrays_7330b8ea4a2497ba: bp,
            __wbg_readBuffer_272d64b66548e4bd: ab,
            __wbg_useProgram_eec93ec68983b282: mk,
            __wbg_bindSampler_81550d380ef83fde: fh,
            __wbg_bindTexture_adcc93a197a861bd: mh,
            __wbg_createQuery_e98e22ea5c4199f3: ym,
            __wbg_deleteQuery_493454abb4e57041: qm,
            __wbg_drawBuffers_a4461e8723df471c: yp,
            __wbg_linkProgram_4f362b048cee2c35: e_,
            __wbg_pixelStorei_f5aed17ba3a24523: X_,
            __wbg_stencilMask_45135bee9873f8e2: Jy,
            __wbg_attachShader_08f9dc290f7f21cc: Jf,
            __wbg_clearStencil_85cd03270e3236df: Vh,
            __wbg_createBuffer_cb32bba0a245b5f0: fm,
            __wbg_createShader_a68df73e8615cf7f: vm,
            __wbg_deleteBuffer_431cacf83f504e90: Nm,
            __wbg_deleteShader_b90b1e4c164edffd: Xm,
            __wbg_getExtension_accec60a148bde49: Zp,
            __wbg_getParameter_1a896a8dcca1c4fa: rg,
            __wbg_shaderSource_20cc64d9735c296d: Hy,
            __wbg_activeTexture_9c2e6aa83f9ff71f: Yf,
            __wbg_blendEquation_43c3d3a039205033: Th,
            __wbg_compileShader_e1741f6f6b22f200: Qh,
            __wbg_createProgram_eeb811f1092e4e66: wm,
            __wbg_createSampler_40d3d1808ce4ccf0: xm,
            __wbg_createTexture_bdd2fd7604c04839: Bm,
            __wbg_deleteProgram_b37d748df05b3396: Hm,
            __wbg_deleteSampler_8e2035a696360764: $m,
            __wbg_deleteTexture_cebd404ba7d6b782: Zm,
            __wbg_polygonOffset_74e50db650460a2c: Q_,
            __wbg_texParameteri_1d5f90924850bc7e: u1,
            __wbg_texStorage2D_4df7279c6b585e48: d1,
            __wbg_texStorage3D_ff0826b2a2cf6d6f: f1,
            __wbg_bindFramebuffer_ea890cc1c43ad089: uh,
            __wbg_blitFramebuffer_5765344141e52d50: Ih,
            __wbg_bindRenderbuffer_d4e73537cc3c23dd: dh,
            __wbg_bindVertexArray_b536f88ef905a6ac: gh,
            __wbg_createFramebuffer_1a30da56415d8128: pm,
            __wbg_deleteFramebuffer_92b5885f27fc8283: Lm,
            __wbg_getSyncParameter_2510b5abbf0df600: gg,
            __wbg_samplerParameterf_06875ad911bc519e: _b,
            __wbg_samplerParameteri_4af53d9fc7d25a07: bb,
            __wbg_blendFuncSeparate_cb15d1499ea79a3a: xh,
            __wbg_createRenderbuffer_ed399557e8acdba7: Sm,
            __wbg_createVertexArray_7c2c139cdda744b5: Rm,
            __wbg_deleteRenderbuffer_f57b915555c0b855: jm,
            __wbg_deleteVertexArray_145a499e098e8794: ep,
            __wbg_getQueryParameter_ca0185333ff24acf: ug,
            __wbg_getShaderInfoLog_4a30ecb2bca0a8fd: lg,
            __wbg_stencilOpSeparate_32ee0d9adb3e45e6: t1,
            __wbg_bindAttribLocation_89c2713acf4dd995: nh,
            __wbg_bufferData_f4e0d5b42151db0a: Ah,
            __wbg_getProgramInfoLog_8a6ecb6668e998d1: ag,
            __wbg_getShaderParameter_34d1e384ebb29665: hg,
            __wbg_getUniformLocation_83c8ff312ccadd3a: wg,
            __wbg_readPixels_ba0426af511e8a77: cb,
            __wbg_renderbufferStorage_4f355208808d8f99: fb,
            __wbg_copyTexSubImage2D_c4a40be8868d9a14: am,
            __wbg_copyTexSubImage3D_9d7f3a533a7ab416: om,
            __wbg_drawArraysInstanced_b238073b7bcc6a32: gp,
            __wbg_getIndexedParameter_de1acfd67158f312: eg,
            __wbg_getProgramParameter_8f31caa7326d56ff: og,
            __wbg_stencilFuncSeparate_cd1e7d14d8dd596e: Qy,
            __wbg_stencilMaskSeparate_d2e3112d57a20f9c: Zy,
            __wbg_texImage3D_2e97b9400c1fa848: o1,
            __wbg_uniformBlockBinding_29150fa1f063c3ce: J1,
            __wbg_vertexAttribDivisor_61b2b06e68a18d7e: _k,
            __wbg_framebufferTexture2D_eb2cdce93b74334f: Wp,
            __wbg_invalidateFramebuffer_5bc63f92473c0b28: qg,
            __wbg_blendEquationSeparate_9f1e2055fa2e7076: wh,
            __wbg_getUniformBlockIndex_88fc6cbcfe931148: _g,
            __wbg_framebufferRenderbuffer_53e70e3ca11fc094: Up,
            __wbg_getSupportedExtensions_fa152e3812b9efef: mg,
            __wbg_clientWaitSync_6523a0f72c96027e: jh,
            __wbg_framebufferTextureLayer_6d50955448761952: Vp,
            __wbg_texSubImage3D_7ad3e794fec3fe31: x1,
            __wbg_uniform2fv_1db51f6084ad6abc: O1,
            __wbg_uniform2iv_5cf511c784bb896d: N1,
            __wbg_uniform3fv_86a178cb652f2b7b: W1,
            __wbg_uniform3iv_fa6a96468c0c1b19: q1,
            __wbg_uniform4fv_74b5bf22f0b64068: X1,
            __wbg_uniform4iv_b1ec17c546329cf7: Y1,
            __wbg_enableVertexAttribArray_ebc5e5c3005f1bd8: Cp,
            __wbg_uniform2uiv_725f0512d37bf556: L1,
            __wbg_uniform3uiv_c7fafdccbda533a8: G1,
            __wbg_uniform4uiv_32dbcdf1d62f1335: Z1,
            __wbg_disableVertexAttribArray_7719cf9351a6e469: up,
            __wbg_clearBufferfv_a31a72ea53e2a9ce: Oh,
            __wbg_clearBufferiv_b6a791b01cf2df33: zh,
            __wbg_clearBufferuiv_072a39776be89ce3: Nh,
            __wbg_vertexAttribPointer_ef3fe0b7841ec062: yk,
            __wbg_drawElementsInstanced_85db7045d67748ac: Tp,
            __wbg_renderbufferStorageMultisample_ded5bbc0de39e3df: lb,
            __wbg_texSubImage3D_b05d9b6b481231e8: C1,
            __wbg_uniformMatrix2fv_9058d5464302984f: ek,
            __wbg_uniformMatrix3fv_afb1c2aac27851c3: sk,
            __wbg_uniformMatrix4fv_f1e046c5f61ed71f: uk,
            __wbg_vertexAttribIPointer_149075befb883e06: bk,
            __wbg_bindBufferRange_67e7b18d43028a1e: sh,
            __wbg_bufferData_fccd5262811b54a2: Bh,
            __wbg_texSubImage3D_305d1245292e3d56: T1,
            __wbg_uniformMatrix2x3fv_3d5f4732af0e8f7d: rk,
            __wbg_uniformMatrix2x4fv_ed9873fa3c163c6e: nk,
            __wbg_uniformMatrix3x2fv_7ab78a7f575bb7de: ak,
            __wbg_uniformMatrix3x4fv_d66820527e5f0045: ok,
            __wbg_uniformMatrix4x2fv_39f3d5afb850dfc2: lk,
            __wbg_uniformMatrix4x3fv_a53a6e2b38fde6ba: dk,
            __wbg_readPixels_c001c684bc183eda: ub,
            __wbg_texImage3D_c1d29edf43dca980: c1,
            __wbg_texSubImage3D_6162cf78b50b8ff1: S1,
            __wbg_texSubImage3D_ed53bff13f8fab20: I1,
            __wbg_texSubImage3D_a174690abf2066a1: P1,
            __wbg_texSubImage3D_154d5c67f1bf984e: k1,
            __wbg_compressedTexSubImage2D_a5d4bd631d195993: Jh,
            __wbg_compressedTexSubImage3D_879cbe501eb47666: tm,
            __wbg_copyBufferSubData_73c882b259d2e2b6: nm,
            __wbg_bufferSubData_40bca454022e641b: Rh,
            __wbg_compressedTexSubImage2D_7e034e3faa8ff6ae: Zh,
            __wbg_compressedTexSubImage3D_8646da3500c5c744: em,
            __wbg_getBufferSubData_1527fe409d7636a0: jp,
            __wbg_texSubImage2D_8be481783b3f22eb: w1,
            __wbg_clear_fec66fb050661e6a: Gh,
            __wbg_flush_f291478eb0dcb239: zp,
            __wbg_texImage2D_e8b9f50a2836a005: a1,
            __wbg_texSubImage2D_8d992d1161c1c3fe: y1,
            __wbg_texSubImage2D_56b8216178007d73: b1,
            __wbg_enable_78737d68d27bc055: Ip,
            __wbg_texSubImage2D_2a4269641c94bb9a: _1,
            __wbg_texSubImage2D_12b54c380b70c677: m1,
            __wbg_texSubImage2D_17e3e55f6593f187: p1,
            __wbg_texSubImage2D_07b82087117be55c: h1,
            __wbg_disable_289f67dd5f931fca: dp,
            __wbg_scissor_6505f3843445d107: wb,
            __wbg_texImage2D_795f9dff0fd9f8fe: i1,
            __wbg_viewport_1031753073d031a2: Sk,
            __wbg_cullFace_b47f0b5ff6fbc4e8: Om,
            __wbg_endQuery_17dba0e9a629778e: Ep,
            __wbg_uniform1f_1c377b51535d0d1f: B1,
            __wbg_uniform1i_017af453f51246d1: R1,
            __wbg_uniform4f_fa57294d7e814443: $1,
            __wbg_instanceof_Window_4bfad3a9470c25c9: Hg,
            __wbg_performance_6c4d39832e915483: $_,
            __wbg_document_8d00b6db6f4e3e5e: hp,
            __wbg_navigator_cda717510f3a4a47: R_,
            __wbg_createElement_22af76933a7b7e81: mm,
            __wbg_querySelector_1fc4d5c8e75b125f: rb,
            __wbg_querySelectorAll_8f983d85893fba25: tb,
            __wbg_navigator_a6aef662775ce236: F_,
            __wbg_blendFunc_34451c1da68c6f91: Ph,
            __wbg_colorMask_fe066b286e037add: Kh,
            __wbg_depthFunc_23bf1b6bd274f948: tp,
            __wbg_depthMask_c935705cda44d8be: ip,
            __wbg_frontFace_46fec56cf60a27cb: Gp,
            __wbg_bindBuffer_7e9a97580c172350: ah,
            __wbg_blendColor_347ae83996a6cf78: bh,
            __wbg_clearDepth_4d2ae05a73397b01: Uh,
            __wbg_depthRange_9feb49867173e854: sp,
            __wbg_drawArrays_4ede7221e809def6: _p,
            __wbg_useProgram_a229a93fc78688ee: hk,
            __wbg_bindTexture_9560807e79c79e9e: hh,
            __wbg_linkProgram_47357d3d0a10d366: Jg,
            __wbg_pixelStorei_838f319e957b97b1: K_,
            __wbg_stencilMask_a4e7a1a4b471aae5: e1,
            __wbg_attachShader_bf3db0e95841cd87: eh,
            __wbg_clearStencil_ff91a6538b8f6bb9: Hh,
            __wbg_createBuffer_634aae6afc8603fa: dm,
            __wbg_createShader_828e81c3b01299f7: Im,
            __wbg_deleteBuffer_fa6436606df27f35: Um,
            __wbg_deleteShader_7ccf49592116c727: Km,
            __wbg_getParameter_7be23eeb6876b790: ng,
            __wbg_shaderSource_0a7551b1ac04be73: Vy,
            __wbg_activeTexture_d7776bac3a6d7d81: Zf,
            __wbg_blendEquation_187168667c5442a4: kh,
            __wbg_compileShader_b489b59d862a0656: Xh,
            __wbg_createProgram_b20375f7e07e4565: bm,
            __wbg_createTexture_64eb57187dc16330: Am,
            __wbg_deleteProgram_4a768b09bc35123b: Vm,
            __wbg_deleteTexture_b1d80c8269d61722: Ym,
            __wbg_polygonOffset_7542e8fe4435f484: Y_,
            __wbg_texParameteri_2f60d62df693455a: l1,
            __wbg_bindFramebuffer_c2bbe6dfa5c632ff: ch,
            __wbg_bindRenderbuffer_324fd91405ebdb55: lh,
            __wbg_createFramebuffer_bec24194763552b8: gm,
            __wbg_deleteFramebuffer_a44089e317a80c64: Wm,
            __wbg_blendFuncSeparate_56946f7dffea79ff: Sh,
            __wbg_createRenderbuffer_a43f5cf814af62c8: Tm,
            __wbg_deleteRenderbuffer_5195180823a72395: Gm,
            __wbg_getShaderInfoLog_fb2b3e5488623f52: dg,
            __wbg_stencilOpSeparate_654ae73b54c22938: r1,
            __wbg_bindAttribLocation_de6ec2ac7d3f92aa: ih,
            __wbg_bufferData_2e9c7448cdc06bcf: vh,
            __wbg_getProgramInfoLog_6f8aa7c1b37d4140: sg,
            __wbg_getShaderParameter_1289544e6a149b67: fg,
            __wbg_getUniformLocation_141c8d21824a1679: bg,
            __wbg_renderbufferStorage_20bf5140a6a780c8: db,
            __wbg_copyTexSubImage2D_74ead2da76740798: sm,
            __wbg_getProgramParameter_a6da442bd18f71ea: cg,
            __wbg_stencilFuncSeparate_a5aa44ea4cd6e6ba: Xy,
            __wbg_stencilMaskSeparate_cf1c2440e82312dd: Yy,
            __wbg_framebufferTexture2D_3ca9eab3ad6f1ac1: Lp,
            __wbg_blendEquationSeparate_9f64c05b6971ddb3: yh,
            __wbg_framebufferRenderbuffer_1b2108ac472b1c17: Np,
            __wbg_uniform2fv_95eba8de1a75316c: z1,
            __wbg_uniform2iv_84e3c725bd528b8a: U1,
            __wbg_uniform3fv_ea1cef2226b3690b: V1,
            __wbg_uniform3iv_b4765f8639ffbc25: H1,
            __wbg_uniform4fv_5bf113e98e85870c: K1,
            __wbg_uniform4iv_b1cccf4a989f9766: Q1,
            __wbg_enableVertexAttribArray_a349186274ae7f6e: Pp,
            __wbg_disableVertexAttribArray_d4213fe0bc2a5347: lp,
            __wbg_vertexAttribPointer_72351aab9dc93e2c: wk,
            __wbg_uniformMatrix2fv_b0feb90ab800c7f2: tk,
            __wbg_uniformMatrix3fv_28106571f00b15e4: ik,
            __wbg_uniformMatrix4fv_919ea0c0b6fe355f: ck,
            __wbg_bufferData_2eb007f9cc031f1d: Eh,
            __wbg_readPixels_55677ecdb64ad211: ob,
            __wbg_bufferSubData_35ff920f72ac71da: Fh,
            __wbg_compressedTexSubImage2D_5b24c508183bc3f5: Yh,
            __wbg_clear_02b91fe3c1160f4b: qh,
            __wbg_flush_ccba3f5fdb5013a1: Op,
            __wbg_enable_bd9bfea24edbfe6f: vp,
            __wbg_texSubImage2D_256097e8c70c742d: g1,
            __wbg_disable_34e3af368545441a: fp,
            __wbg_scissor_8005f47af2354125: yb,
            __wbg_texImage2D_88a8191aa5c3d7bb: s1,
            __wbg_viewport_94c85b86d76f49a7: xk,
            __wbg_cullFace_2ac6820d8be3569b: Dm,
            __wbg_uniform1f_c490c66e9b895aae: F1,
            __wbg_uniform1i_620429c56da52252: M1,
            __wbg_uniform4f_28eae6dcd90747ef: j1,
            __wbg_clearRect_88636c02608eb9dd: Wh,
            __wbg_getImageData_767c4f63fc5e613d: Jp,
            __wbg_drawImage_df3e4a3282b52a97: Sp,
            __wbg_get_480fa63526daa580: yg,
            __wbg_bindVertexArrayOES_5a903bbe60cd30d4: ph,
            __wbg_createVertexArrayOES_17388a7ebf4b7bfe: Fm,
            __wbg_deleteVertexArrayOES_9af70f97832b5500: Jm,
            __wbg_width_2f2313f535ecc2de: Ck,
            __wbg_height_8ba0d55527fe8f18: Eg,
            __wbg_width_d1eed72b8d2ae405: Ek,
            __wbg_height_f3205fe0db73972c: Bg,
            __wbg_set_height_2a52d80e749439c5: G0,
            __wbg_getContext_30f7143eeaed637c: Kp,
            __wbg_getContext_a527af8fecba2087: Qp,
            __wbg_new_cc88e2b82fb56b5e: z_,
            __wbg_width_c387004ab78e7a13: vk,
            __wbg_height_599ce151f78a7ce4: Ig,
            __wbg_set_width_913f2db354db9600: My,
            __wbg_instanceof_OffscreenCanvas_34012446c4da8c89: Lg,
            __wbg_data_cfe3a2a875ad7522: zm,
            __wbg_width_7d707333391e14ff: Ik,
            __wbg_height_c4e90de06690eaec: Ag,
            __wbg_drawBuffersWEBGL_fa949d7e1f2f15a2: wp,
            __wbg_queryCounterEXT_d666e8a0dfecf78f: eb,
            __wbg_now_1925e14eb84a904c: q_,
            __wbg_set_height_9a5b963336a79877: $0,
            __wbg_getContext_064ba67b26a73a3e: $p,
            __wbg_getContext_729adedba115e573: Xp,
            __wbg_width_1b4013dc9b9b69b2: Pk,
            __wbg_height_8b6fea8d47c5e971: vg,
            __wbg_set_width_d8263652df911d1d: Dy,
            __wbg_instanceof_HtmlCanvasElement_1ee070c578ed9cdc: zg,
            __wbg_framebufferTextureMultiviewOVR_de47033d076a1c65: Hp,
            __wbg_drawArraysInstancedANGLE_d34b18d63f59d479: pp,
            __wbg_vertexAttribDivisorANGLE_b82130b5be2899a8: gk,
            __wbg_drawElementsInstancedANGLE_7a4a6e6d9f591778: kp,
            __wbg_videoWidth_0b0534d00ec8f243: Tk,
            __wbg_videoHeight_5b83e795d426af87: kk,
            __wbg_getSupportedProfiles_6935d344271bf832: pg,
            __wbg_new_480195ddf7042529: O_,
            __wbg_new_e4597c3f125a2038: N_,
            __wbg_new_4774b8d4db1224e4: D_,
            __wbg_length_090b6aa6235450ba: Qg,
            __wbg_prototypesetcall_7dca54d31cb9d2dc: Z_,
            __wbg_new_with_byte_offset_and_length_716709b677573556: L_,
            __wbg_set_311d3efbf4bfd23f: Ib,
            __wbg_then_d9ebfadd74ddfbb2: E1,
            __wbg_instanceof_Uint8Array_e7d245baab296394: Wg,
            __wbg_instanceof_ArrayBuffer_046631d47961f5fe: Mg,
            __wbg_new_with_length_7398e5e650b9da8d: W_,
            __wbg_of_786b4c4fc6e0c8d8: G_,
            __wbg_isArray_8dc932f4b6997756: Gg,
            __wbg_isSafeInteger_db44a36710ec7a10: jg,
            __wbg_is_04cfa9fd1c38e170: $g,
            __wbg_entries_e234c7de8150095c: Bp,
            __wbg_iterator_8af67730d17a1376: Kg,
            __wbg_static_accessor_GLOBAL_THIS_13002645baf43d84: jy,
            __wbg_static_accessor_SELF_91d0abd4d035416c: $y,
            __wbg_static_accessor_GLOBAL_44bef9fa6011e260: Gy,
            __wbg_static_accessor_WINDOW_513f857c65724fc7: Ky,
            __wbg_then_34956fdd88b794f7: v1,
            __wbg_resolve_bb4df27803d377b2: gb,
            __wbg_next_e75ce91d696d3c0f: H_,
            __wbg_get_97a4b9029a97fbd6: Tg,
            __wbg_call_faf6b66fc4667ce6: Dh,
            __wbg_get_d8a3d51a73d14c8a: Sg,
            __wbg_set_05b085c909633819: Cb,
            __wbg_queueMicrotask_1f50b4bdf2c98605: nb,
            __wbg_queueMicrotask_805204511f79bee8: ib,
            __wbg__wbg_cb_unref_207c541c2d58dfb3: Qf,
            __wbg___wbindgen_string_get_ae6081df8158aa73: Kf,
            __wbg___wbindgen_number_get_4fcba947d278ad7c: $f,
            __wbg___wbindgen_in_840bcdd0dba8d13c: Nf,
            __wbg___wbindgen_throw_bd5a70920abf0236: Xf,
            __wbg___wbindgen_is_null_77356bc8da6bb199: Wf,
            __wbg___wbindgen_jsval_eq_8d2fb89b36afbec9: Gf,
            __wbg_Number_d2ed9f811fff7051: Bf,
            __wbg_Error_7c536b7a8123d334: Af,
            __wbg___wbindgen_is_bigint_4393a1b8e13fdf64: Uf,
            __wbg___wbindgen_is_object_e04e3a51a90cde43: Vf,
            __wbg___wbindgen_is_string_3db04af369717583: Hf,
            __wbg___wbindgen_boolean_get_6abe7d340f528f63: Of,
            __wbg___wbindgen_is_function_d4c2480b46f29e33: Lf,
            __wbg___wbindgen_is_undefined_5957b329897cc39c: qf,
            __wbg___wbindgen_jsval_loose_eq_54779efa0bc46b0b: jf,
            __wbg___wbindgen_bigint_get_as_i64_3d66614a210167c9: Df,
            __wbg___wbindgen_debug_string_8baecc377ad92880: zf,
            __wbindgen_init_externref_table: qk,
            __wbindgen_cast_0000000000000001: Bk,
            __wbindgen_cast_0000000000000002: Fk,
            __wbindgen_cast_0000000000000003: Rk,
            __wbindgen_cast_0000000000000004: Mk,
            __wbindgen_cast_0000000000000005: Dk,
            __wbindgen_cast_0000000000000006: Ok,
            __wbindgen_cast_0000000000000007: zk,
            __wbindgen_cast_0000000000000008: Nk,
            __wbindgen_cast_0000000000000009: Uk,
            __wbindgen_cast_000000000000000a: Lk,
            __wbindgen_cast_000000000000000b: Wk,
            __wbindgen_cast_000000000000000c: Vk,
            __wbindgen_cast_000000000000000d: Hk
        }
    }, vf), { memory: ST, initializeGpu: xT, applyEffectPasses: PT, applyMaskFeather: CT, getLastFrameProfile: IT, getCompositorCanvas: vT, initCompositor: ET, releaseTexture: AT, renderFrame: BT, resizeCompositor: FT, uploadTexture: RT, TICKS_PER_SECOND: MT, floorToFrame: DT, isFrameAligned: OT, lastFrameTime: zT, mediaTimeAdd: NT, mediaTimeClamp: UT, mediaTimeFromFrame: LT, mediaTimeFromSeconds: WT, mediaTimeMax: VT, mediaTimeMin: HT, mediaTimeSub: qT, mediaTimeToFrame: GT, mediaTimeToSeconds: jT, roundToFrame: $T, snappedSeekTime: KT, formatTimecode: XT, guessTimecodeFormat: QT, parseTimecode: YT, wasm_bindgen__convert__closures_____invoke__h328812056897e0cd: ZT, wasm_bindgen__convert__closures_____invoke__h4b3060f33e3c4576: JT, wasm_bindgen__convert__closures_____invoke__he2009f21b86b77fe: eS, __wbindgen_malloc: tS, __wbindgen_realloc: rS, __wbindgen_exn_store: nS, __externref_table_alloc: iS, __wbindgen_externrefs: sS, __wbindgen_free: aS, __wbindgen_destroy_closure: oS, __externref_table_dealloc: cS, __wbindgen_start: Ko } = TT, uS = Object.freeze(Object.defineProperty({
        __proto__: null,
        TICKS_PER_SECOND: MT,
        __externref_table_alloc: iS,
        __externref_table_dealloc: cS,
        __wbindgen_destroy_closure: oS,
        __wbindgen_exn_store: nS,
        __wbindgen_externrefs: sS,
        __wbindgen_free: aS,
        __wbindgen_malloc: tS,
        __wbindgen_realloc: rS,
        __wbindgen_start: Ko,
        applyEffectPasses: PT,
        applyMaskFeather: CT,
        floorToFrame: DT,
        formatTimecode: XT,
        getCompositorCanvas: vT,
        getLastFrameProfile: IT,
        guessTimecodeFormat: QT,
        initCompositor: ET,
        initializeGpu: xT,
        isFrameAligned: OT,
        lastFrameTime: zT,
        mediaTimeAdd: NT,
        mediaTimeClamp: UT,
        mediaTimeFromFrame: LT,
        mediaTimeFromSeconds: WT,
        mediaTimeMax: VT,
        mediaTimeMin: HT,
        mediaTimeSub: qT,
        mediaTimeToFrame: GT,
        mediaTimeToSeconds: jT,
        memory: ST,
        parseTimecode: YT,
        releaseTexture: AT,
        renderFrame: BT,
        resizeCompositor: FT,
        roundToFrame: $T,
        snappedSeekTime: KT,
        uploadTexture: RT,
        wasm_bindgen__convert__closures_____invoke__h328812056897e0cd: ZT,
        wasm_bindgen__convert__closures_____invoke__h4b3060f33e3c4576: JT,
        wasm_bindgen__convert__closures_____invoke__he2009f21b86b77fe: eS
    }, Symbol.toStringTag, {
        value: "Module"
    }));
    kT(uS);
    Ko();
})();
export { dS as A, lS as B, gS as C, Ki as I, Sf as M, yS as O, mS as Q, kS as T, Nl as V, wa as W, _S as a, wS as b, Jn as c, bS as d, fS as e, hS as f, pS as g, TS as h, SS as i, xS as j, PS as k, CS as l, IS as m, vS as n, ES as o, AS as p, BS as q, FS as r, RS as s, MS as t, DS as u, OS as v, zS as w, NS as x, __tla };
