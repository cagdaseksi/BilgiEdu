import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, relative, sep } from 'node:path';

// Developer is outside macOS's Desktop/Documents iCloud synchronization.
export const releaseSecretsRoot = join(
  homedir(),
  'Developer/SoursparkRelease/secrets',
);
export const legacyReleaseSecretsRoot = join(
  homedir(),
  'Documents/SoursparkRelease/secrets',
);

export function releaseSecretPath(...parts) {
  const local = join(releaseSecretsRoot, ...parts);
  if (
    !existsSync(local) &&
    existsSync(join(legacyReleaseSecretsRoot, ...parts))
  ) {
    throw new Error(
      `Existing release file has not been copied locally: ${local}. Run scripts/migrate-release-secrets.mjs after its iCloud download completes. No cloud fallback or replacement credential will be created.`,
    );
  }
  return local;
}

export function localReleasePath(path) {
  if (
    path === legacyReleaseSecretsRoot ||
    path.startsWith(`${legacyReleaseSecretsRoot}${sep}`)
  ) {
    return releaseSecretPath(relative(legacyReleaseSecretsRoot, path));
  }
  return path;
}
