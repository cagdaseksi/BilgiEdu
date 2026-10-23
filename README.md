# BilgiEdu

A minimal React Native Community CLI app for a 50-minute AI mobile game workshop.
React Native 0.86, React 19, TypeScript, Hermes. No Expo dependency.

## Start

Requires Node 22.11+, Java 17 and Android SDK, or Xcode and CocoaPods.

```sh
npm ci
npm start
npm run android
# iOS, once:
cd ios
pod install
cd ..
npm run ios
```

App flow: participant list -> participant home -> level selection -> game scene.
Only the selected participant is mounted. Release builds include the JS bundle
and work without Metro.

## Participant boundaries

Each person uses their own local clone, GitHub account and branch
`participant/<slug>`. They edit only `src/participants/<slug>/**`.

- Screen.tsx: the participant's home, levels and game scene.
- participant.json: ASCII display name, title and accent.
- assets/: participant-owned images and sounds.
- AGENTS.md: instructions for that participant's coding agent.

The registry is generated at install/start/check time. Nobody edits a common
list to register a game. Shared components and the screen contract are in
`src/shared`; only the maintainer edits them.

The trusted PR scope workflow runs code from the base branch, reads the PR author
and checks both old and new paths for renamed files. Its roster is
`workshop/ownership.json`. Updating a branch name does not confer ownership.

The upstream repository is public with protected main. Both participant-scope
and app-checks must pass, the branch must be up to date, and a maintainer review
is required. Force pushes and deletion are disabled. Participants use forks;
no upstream write access is needed. The repository owner retains administrative
access for instructor-managed releases. AGENTS.md is guidance, not a filesystem
security sandbox. Never share the instructor's GitHub credentials with students.

## Maintainer: add a participant

```sh
npm run participant:add -- alice "Alice" alice-github
npm run check
```

Only the maintainer runs this command. It creates a personal screen folder and
adds the GitHub login to the trusted ownership roster.

## Participant prompt

```text
Read AGENTS.md and src/participants/<slug>/AGENTS.md.
Work only in src/participants/<slug> on branch participant/<slug>.
Design my home, level selection and game scene in Screen.tsx.
Do not change dependencies, App.tsx, shared code or other participants.
Use ASCII text. Run npm run check. Do not push to main or merge.
```

## Checks

```sh
npm run check
```

Includes TypeScript, ESLint, screen flow tests and PR ownership tests.

## Releases

Package and bundle ID: com.sourspark.bilgiedu.
Initial native version: 1.0 (1). See docs/releases.md.
Release configuration, tester addresses, private keys, archives and generated
registries are ignored by Git. No credentials are included in the repository.
