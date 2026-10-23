import { readFile } from 'node:fs/promises';
import { sign } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { localReleasePath } from './release-secrets.mjs';

let signingKey;

// Credentials are read from the environment; neither private keys nor JWTs are logged.
export async function appStoreRequest(method, path, payload) {
  if (!path?.startsWith('/v1/') && !path?.startsWith('/v2/'))
    throw new Error('An App Store Connect API path is required');
  const keyId = process.env.APP_STORE_CONNECT_API_KEY_ID;
  const issuerId = process.env.APP_STORE_CONNECT_ISSUER_ID;
  const keyPath = process.env.APP_STORE_CONNECT_API_KEY_PATH;
  if (!keyId || !issuerId || !keyPath)
    throw new Error('Missing App Store Connect API credentials');
  const now = Math.floor(Date.now() / 1000);
  const encode = value =>
    Buffer.from(JSON.stringify(value)).toString('base64url');
  const unsigned = `${encode({
    alg: 'ES256',
    kid: keyId,
    typ: 'JWT',
  })}.${encode({
    iss: issuerId,
    iat: now,
    exp: now + 900,
    aud: 'appstoreconnect-v1',
  })}`;
  signingKey ??= await readFile(localReleasePath(keyPath));
  const signature = sign('sha256', Buffer.from(unsigned), {
    key: signingKey,
    dsaEncoding: 'ieee-p1363',
  }).toString('base64url');
  const response = await fetch(`https://api.appstoreconnect.apple.com${path}`, {
    signal: AbortSignal.timeout(45000),
    method,
    headers: {
      Authorization: `Bearer ${unsigned}.${signature}`,
      'Content-Type': 'application/json',
    },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
  const body = response.status === 204 ? {} : await response.json();
  if (!response.ok) {
    const error = new Error(
      JSON.stringify({ status: response.status, errors: body.errors }),
    );
    error.status = response.status;
    throw error;
  }
  return body;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const [method = 'GET', path, payload] = process.argv.slice(2);
  try {
    console.log(
      JSON.stringify(
        await appStoreRequest(
          method,
          path,
          payload === undefined ? undefined : JSON.parse(payload),
        ),
        null,
        2,
      ),
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
