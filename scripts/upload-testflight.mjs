import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { localReleasePath } from './release-secrets.mjs';
const ipa = resolve(import.meta.dirname, '../release/ios/export/BilgiEdu.ipa');
const key = process.env.APP_STORE_CONNECT_API_KEY_ID;
const issuer = process.env.APP_STORE_CONNECT_ISSUER_ID;
const path = process.env.APP_STORE_CONNECT_API_KEY_PATH;
if (!existsSync(ipa) || !key || !issuer || !path) {
  throw new Error('IPA or local App Store Connect settings missing');
}
const result = spawnSync(
  'xcrun',
  [
    'altool',
    '--upload-app',
    '--type',
    'ios',
    '--file',
    ipa,
    '--apiKey',
    key,
    '--apiIssuer',
    issuer,
  ],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      API_PRIVATE_KEYS_DIR: dirname(localReleasePath(path)),
    },
  },
);
process.exitCode = result.status ?? 1;
