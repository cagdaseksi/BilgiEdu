import test from 'node:test';
import assert from 'node:assert/strict';
import { validateScope } from './check-participant-scope.mjs';
const ownership = {
  maintainers: ['teacher'],
  participants: { alice: 'alice' },
};
const check = (files, extra = {}) =>
  validateScope({
    author: 'alice',
    branch: 'participant/alice',
    ownership,
    files,
    ...extra,
  });
test('allows only the assigned directory', () => {
  assert.deepEqual(
    check([{ filename: 'src/participants/alice/Screen.tsx' }]),
    [],
  );
  assert.equal(
    check([{ filename: 'src/participants/bob/Screen.tsx' }]).length,
    1,
  );
  assert.equal(check([{ filename: 'App.tsx' }]).length, 1);
});
test('rejects impersonation, traversal, workflow changes and cross-folder renames', () => {
  assert.ok(check([], { branch: 'participant/bob' }).length);
  assert.ok(check([], { author: 'mallory' }).length);
  assert.ok(
    check([{ filename: 'src/participants/alice/../bob/Screen.tsx' }]).length,
  );
  assert.ok(
    check([{ filename: '.github/workflows/participant-scope.yml' }]).length,
  );
  assert.ok(
    check([
      {
        filename: 'src/participants/alice/Screen.tsx',
        previous_filename: 'src/participants/bob/Screen.tsx',
      },
    ]).length,
  );
});
test('allows maintainer infrastructure branches', () => {
  assert.deepEqual(
    check([{ filename: 'App.tsx' }], {
      author: 'teacher',
      branch: 'infra/setup',
    }),
    [],
  );
});
