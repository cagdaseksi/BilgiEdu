# Release procedure

## Android

Configure the ignored android/keystore.properties with:
BILGIEDU_STORE_FILE, BILGIEDU_STORE_PASSWORD, BILGIEDU_KEY_ALIAS,
BILGIEDU_KEY_PASSWORD. Use the verified central signing inventory.

```sh
npm run participants
cd android
./gradlew bundleRelease assembleRelease -PreactNativeArchitectures=arm64-v8a
```

The workshop release targets arm64 Android phones. For other ABIs, update
reactNativeArchitectures and verify a device build before distributing.

Outputs:

- android/app/build/outputs/bundle/release/app-release.aab
- android/app/build/outputs/apk/release/app-release.apk

A release build fails if release signing is missing. There is no debug-key
fallback. Verify the Play Console upload certificate against the local key.

Distribute through Google Play internal testing. A tester must join the
opt-in link with their allowlisted Google account.

## iOS

Bundle ID: com.sourspark.bilgiedu.
Team: YBV5NARZ4A.
Provisioning profile: BilgiEdu App Store.

```sh
npm run participants
cd ios
pod install
cd ..
npm run ios:archive
npm run ios:export
npm run ios:upload
```

Build and export helpers read local release settings. The initial release
has no login, analytics, ads, purchases or custom encryption.
A new external TestFlight group needs Apple beta review before distribution.
Later builds may also require review. Do not describe an uploaded build as
available for testing until its processing and test-group status are verified.

## Workshop updates

Native TestFlight/Play builds are snapshots. Participant source edits do not
appear automatically on installed store builds. The maintainer integrates
changes, increments the native build number, checks and uploads a new version.

The signing helper uses a temporary keychain with the existing verified central
certificate and private key. It restores the original keychain search list and
deletes the temporary keychain when finished. Original keys are not changed.

## Verified initial release: 2026-10-23

- GitHub: https://github.com/cagdaseksi/BilgiEdu (public, protected main).
- App Store Connect app: 6826133987. Build 1.0 (1) is IN_BETA_TESTING
  in BilgiEdu Internal with one invited tester.
- Google Play app: 4974137176223605436. Version code 1 / 1.0 is
  available to internal testers in track 4701559686754947124.
- Android opt-in: https://play.google.com/apps/internaltest/4701559686754947124
- APK and IPA signatures verified. iOS release launched on an iPhone simulator.
- TypeScript, ESLint, screen flow and participant-scope checks passed.
- Play upload certificate matches the verified central upload key.

Testers accept the platform invitation using their allowlisted account.
The maintainer adds future participants through their GitHub login and slug;
students use forks and receive no upstream write permission.
