import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
const [slug, name, github] = process.argv.slice(2);
if (
  !slug ||
  !/^[a-z][a-z0-9-]*$/.test(slug) ||
  !name ||
  /[^\x20-\x7e]/.test(name) ||
  !github ||
  !/^[a-z0-9-]+$/i.test(github)
) {
  throw new Error(
    'Usage: npm run participant:add -- <slug> "ASCII Name" <github-login>',
  );
}
const root = resolve(import.meta.dirname, '..');
const target = join(root, 'src/participants', slug);
if (existsSync(target)) {
  throw new Error('Participant already exists: ' + slug);
}
const rosterFile = join(root, 'workshop/ownership.json');
const roster = JSON.parse(readFileSync(rosterFile, 'utf8'));
if (
  roster.participants[github] ||
  Object.values(roster.participants).includes(slug)
) {
  throw new Error('GitHub login or slug already assigned');
}
mkdirSync(target, { recursive: true });
const screen = readFileSync(
  join(root, 'workshop/template/Screen.tsx.template'),
  'utf8',
)
  .replaceAll('{{SLUG}}', slug.toUpperCase())
  .replaceAll('{{NAME}}', name);
writeFileSync(join(target, 'Screen.tsx'), screen);
writeFileSync(
  join(target, 'participant.json'),
  JSON.stringify(
    { id: slug, name, gameTitle: 'Ilk Oyunum', accent: '#B7F36B' },
    null,
    2,
  ) + '\n',
);
writeFileSync(
  join(target, 'AGENTS.md'),
  '# Assigned workspace: ' +
    slug +
    '\n\nEdit only src/participants/' +
    slug +
    '/**.\nUse branch participant/' +
    slug +
    '. Read root AGENTS.md.\nUse ASCII. Do not edit shared or native code or dependencies.\n',
);
roster.participants[github] = slug;
writeFileSync(rosterFile, JSON.stringify(roster, null, 2) + '\n');
execFileSync(
  process.execPath,
  [join(root, 'scripts/generate-participants.mjs')],
  { stdio: 'inherit' },
);
console.log('Participant ready: ' + slug);
