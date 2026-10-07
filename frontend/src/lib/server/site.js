import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

const CHAIN = ['dev', 'stage', 'main'];

/**
 * Which site this deployment is, then the ones to fall back to: ["dev", "stage", "main"], ["stage", "main"] or ["main"].
 * SITE (or the older MENU) overrides; local dev → "dev"; stage branch deploy (Vercel sets VERCEL_GIT_COMMIT_REF) → "stage";
 * else "main". Per-site CMS documents (Menu, Editorial) use the first that exists, so nothing is ever empty.
 */
export function siteChain() {
	const preferred = env.SITE || env.MENU || (dev ? 'dev' : env.VERCEL_GIT_COMMIT_REF === 'stage' ? 'stage' : 'main');
	return [...new Set([preferred, ...CHAIN.slice(CHAIN.indexOf(preferred) + 1)])];
}
