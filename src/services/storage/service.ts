// In-memory replacement of the original IndexedDB+OPFS-backed StorageService.
// Used by the OpenCut embed build — projects and media live only for the
// current page session and are wiped on reload. Public API surface mirrors
// the original so all 14 call sites continue to work unchanged.

import type { TProject, TProjectMetadata } from "@/project/types";
import { getProjectDurationFromScenes } from "@/timeline/scenes";
import type { MediaAsset } from "@/media/types";
import type { SceneTracks } from "@/timeline";
import type { StorageCapacityCheckResult } from "./quota";

class StorageService {
	private projects = new Map<string, TProject>();
	private mediaByProject = new Map<string, Map<string, MediaAsset>>();
	private mediaUrls = new Map<string, string>();

	private stripAudioBuffers({ tracks }: { tracks: SceneTracks }): SceneTracks {
		return {
			...tracks,
			audio: tracks.audio.map((track) => ({
				...track,
				elements: track.elements.map((element) => {
					const { buffer: _buffer, ...rest } = element;
					return rest;
				}),
			})),
		};
	}

	canStoreFile(_args: {
		size: number;
	}): Promise<StorageCapacityCheckResult> {
		return Promise.resolve({
			canStore: true,
			isExceedingFinalLimit: false,
			isExceedingSoftLimit: false,
		} as unknown as StorageCapacityCheckResult);
	}

	isQuotaExceededError(_args: { error: unknown }): boolean {
		return false;
	}

	async saveProject({ project }: { project: TProject }): Promise<void> {
		const duration =
			project.metadata.duration ??
			getProjectDurationFromScenes({ scenes: project.scenes });
		const cloned: TProject = {
			...project,
			metadata: {
				...project.metadata,
				duration,
				createdAt: new Date(project.metadata.createdAt),
				updatedAt: new Date(project.metadata.updatedAt),
			},
			scenes: project.scenes.map((scene) => ({
				...scene,
				tracks: this.stripAudioBuffers({ tracks: scene.tracks }),
				createdAt: new Date(scene.createdAt),
				updatedAt: new Date(scene.updatedAt),
			})),
		};
		this.projects.set(project.metadata.id, cloned);
	}

	async loadProject({
		id,
	}: {
		id: string;
	}): Promise<{ project: TProject } | null> {
		const project = this.projects.get(id);
		if (!project) return null;
		return { project };
	}

	async loadAllProjects(): Promise<TProject[]> {
		return [...this.projects.values()];
	}

	async loadAllProjectsMetadata(): Promise<TProjectMetadata[]> {
		return [...this.projects.values()].map((p) => ({
			...p.metadata,
			duration:
				p.metadata.duration ??
				getProjectDurationFromScenes({ scenes: p.scenes }),
		}));
	}

	async deleteProject({ id }: { id: string }): Promise<void> {
		this.projects.delete(id);
		await this.deleteProjectMedia({ projectId: id });
	}

	async saveMediaAsset({
		projectId,
		mediaAsset,
	}: {
		projectId: string;
		mediaAsset: MediaAsset;
	}): Promise<void> {
		let bucket = this.mediaByProject.get(projectId);
		if (!bucket) {
			bucket = new Map();
			this.mediaByProject.set(projectId, bucket);
		}
		bucket.set(mediaAsset.id, mediaAsset);
	}

	async loadMediaAsset({
		projectId,
		id,
	}: {
		projectId: string;
		id: string;
	}): Promise<MediaAsset | null> {
		const bucket = this.mediaByProject.get(projectId);
		const asset = bucket?.get(id);
		return asset ?? null;
	}

	async loadAllMediaAssets({
		projectId,
	}: {
		projectId: string;
	}): Promise<MediaAsset[]> {
		const bucket = this.mediaByProject.get(projectId);
		return bucket ? [...bucket.values()] : [];
	}

	async deleteMediaAsset({
		projectId,
		id,
	}: {
		projectId: string;
		id: string;
	}): Promise<void> {
		const bucket = this.mediaByProject.get(projectId);
		if (!bucket) return;
		const asset = bucket.get(id);
		if (asset?.url) {
			try {
				URL.revokeObjectURL(asset.url);
			} catch {
				/* ignore */
			}
		}
		bucket.delete(id);
		this.mediaUrls.delete(id);
	}

	async deleteProjectMedia({
		projectId,
	}: {
		projectId: string;
	}): Promise<void> {
		const bucket = this.mediaByProject.get(projectId);
		if (!bucket) return;
		for (const asset of bucket.values()) {
			if (asset.url) {
				try {
					URL.revokeObjectURL(asset.url);
				} catch {
					/* ignore */
				}
			}
		}
		this.mediaByProject.delete(projectId);
	}

	async clearAllData(): Promise<void> {
		for (const projectId of this.mediaByProject.keys()) {
			await this.deleteProjectMedia({ projectId });
		}
		this.projects.clear();
		this.mediaByProject.clear();
	}

	async getStorageInfo(): Promise<{
		projects: number;
		isOPFSSupported: boolean;
		isIndexedDBSupported: boolean;
	}> {
		return {
			projects: this.projects.size,
			isOPFSSupported: this.isOPFSSupported(),
			isIndexedDBSupported: this.isIndexedDBSupported(),
		};
	}

	async getProjectStorageInfo({
		projectId,
	}: {
		projectId: string;
	}): Promise<{ mediaItems: number }> {
		const bucket = this.mediaByProject.get(projectId);
		return { mediaItems: bucket?.size ?? 0 };
	}

	isOPFSSupported(): boolean {
		return true;
	}

	isIndexedDBSupported(): boolean {
		return true;
	}

	isFullySupported(): boolean {
		return true;
	}
}

export const storageService = new StorageService();
export { StorageService };
