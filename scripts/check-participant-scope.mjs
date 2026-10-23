import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
export function validateScope({ author, branch, files, ownership }) {
  const slug = branch.startsWith('participant/')
    ? branch.slice('participant/'.length)
    : null;
  if (ownership.maintainers.includes(author) && !slug) {
    return [];
  }
  if (
    !slug ||
    !/^[a-z][a-z0-9-]*$/.test(slug) ||
    ownership.participants[author] !== slug
  ) {
    return [
      'PR author and participant branch do not match the trusted ownership roster.',
    ];
  }
  const prefix = 'src/participants/' + slug + '/';
  const paths = files.flatMap(file =>
    [file.filename, file.previous_filename].filter(Boolean),
  );
  return paths
    .filter(path => !path.startsWith(prefix) || path.split('/').includes('..'))
    .map(path => 'Outside assigned directory: ' + path);
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  if (!event.pull_request) {
    throw new Error('A pull request event is required.');
  }
  const ownership = JSON.parse(
    readFileSync(
      new URL('../workshop/ownership.json', import.meta.url),
      'utf8',
    ),
  );
  const pr = event.pull_request;
  const files = [];
  for (let page = 1; ; page++) {
    const response = await fetch(
      'https://api.github.com/repos/' +
        process.env.GITHUB_REPOSITORY +
        '/pulls/' +
        pr.number +
        '/files?per_page=100&page=' +
        page,
      {
        headers: {
          Authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
          Accept: 'application/vnd.github+json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('GitHub files API: ' + response.status);
    }
    const batch = await response.json();
    files.push(...batch);
    if (batch.length < 100) {
      break;
    }
    if (page >= 30) {
      throw new Error('PR file limit exceeded; maintainer review required.');
    }
  }
  const errors = validateScope({
    author: pr.user.login,
    branch: pr.head.ref,
    files,
    ownership,
  });
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log('Participant scope passed.');
  }
}
