// Stub for the original IndexedDB migrations module.
// In the embed build there is no persistent storage, so no migrations ever
// need to run. We keep the public shape so call sites compile unchanged.

export const CURRENT_PROJECT_VERSION = 2 as const;

export interface MigrationProgress {
	isMigrating: boolean;
	fromVersion: number | null;
	toVersion: number | null;
	projectName: string | null;
}

export type StorageMigration = {
	from: number;
	to: number;
	run: () => Promise<void>;
};

export const migrations: StorageMigration[] = [];

export async function runStorageMigrations(_args: {
	migrations: StorageMigration[];
	onProgress?: (progress: MigrationProgress) => void;
}): Promise<void> {
	// no-op
}
