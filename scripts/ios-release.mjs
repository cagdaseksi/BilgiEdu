import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const release = join(root, 'release/ios');
mkdirSync(release, { recursive: true });
const action = process.argv[2];
if (action === 'archive') {
  const profileDir = join(
    homedir(),
    'Library/MobileDevice/Provisioning Profiles',
  );
  mkdirSync(profileDir, { recursive: true });
  const signing = JSON.parse(
    readFileSync(join(release, 'signing.json'), 'utf8'),
  );
  copyFileSync(
    join(release, 'BilgiEdu.mobileprovision'),
    join(profileDir, signing.profileUuid + '.mobileprovision'),
  );
  const result = spawnSync(
    'xcodebuild',
    [
      '-workspace',
      'ios/BilgiEdu.xcworkspace',
      '-scheme',
      'BilgiEdu',
      '-configuration',
      'Release',
      '-destination',
      'generic/platform=iOS',
      '-archivePath',
      join(release, 'BilgiEdu.xcarchive'),
      '-derivedDataPath',
      join(release, 'DerivedData'),
      '-jobs',
      '2',
      'archive',
    ],
    { cwd: root, stdio: 'inherit' },
  );
  process.exitCode = result.status ?? 1;
} else if (action === 'export') {
  const options =
    '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>method</key><string>app-store-connect</string><key>destination</key><string>export</string><key>signingStyle</key><string>manual</string><key>teamID</key><string>YBV5NARZ4A</string><key>signingCertificate</key><string>Apple Distribution</string><key>provisioningProfiles</key><dict><key>com.sourspark.bilgiedu</key><string>BilgiEdu App Store</string></dict><key>uploadSymbols</key><true/></dict></plist>';
  writeFileSync(join(release, 'ExportOptions.plist'), options);
  const result = spawnSync(
    'xcodebuild',
    [
      '-exportArchive',
      '-archivePath',
      join(release, 'BilgiEdu.xcarchive'),
      '-exportPath',
      join(release, 'export'),
      '-exportOptionsPlist',
      join(release, 'ExportOptions.plist'),
    ],
    { cwd: root, stdio: 'inherit' },
  );
  process.exitCode = result.status ?? 1;
} else {
  throw new Error('Expected archive or export');
}
