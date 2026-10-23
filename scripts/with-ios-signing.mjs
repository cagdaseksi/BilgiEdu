import { spawnSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir, homedir } from 'node:os';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
function security(args) {
  const result = spawnSync('security', args, { encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error('Signing keychain operation failed: ' + args[0]);
  }
  return result.stdout;
}
const original = [
  ...security(['list-keychains', '-d', 'user']).matchAll(/"([^"]+)"/g),
].map(m => m[1]);
const dir = mkdtempSync(join(tmpdir(), 'bilgiedu-signing-'));
const keychain = join(dir, 'signing.keychain-db');
const password = randomBytes(32).toString('hex');
const central = join(
  homedir(),
  'Developer/SoursparkRelease/secrets/ios/signing',
);
try {
  security(['create-keychain', '-p', password, keychain]);
  security(['unlock-keychain', '-p', password, keychain]);
  security(['set-keychain-settings', '-lut', '7200', keychain]);
  security(['import', join(central, 'SKX6LGR63U.cer'), '-k', keychain]);
  security([
    'import',
    join(central, 'SKX6LGR63U.p12'),
    '-k',
    keychain,
    '-t',
    'priv',
    '-f',
    'openssl',
    '-T',
    '/usr/bin/codesign',
  ]);
  security([
    'set-key-partition-list',
    '-S',
    'apple-tool:,apple:,codesign:',
    '-s',
    '-k',
    password,
    keychain,
  ]);
  security(['list-keychains', '-d', 'user', '-s', keychain, ...original]);
  if (
    !security(['find-identity', '-v', '-p', 'codesigning', keychain]).includes(
      'D033FD00957D5BDBC449336DCF94468407517C95',
    )
  ) {
    throw new Error('Existing distribution identity could not be verified');
  }
  const result = spawnSync(
    process.execPath,
    [join(import.meta.dirname, 'ios-release.mjs'), process.argv[2]],
    { stdio: 'inherit' },
  );
  process.exitCode = result.status ?? 1;
} finally {
  security(['list-keychains', '-d', 'user', '-s', ...original]);
  security(['delete-keychain', keychain]);
}
