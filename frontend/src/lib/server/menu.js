import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { getMenu } from '$lib/utils/sanity';

const CHAIN = ['dev', 'stage', 'main'];

/**
 * The menu document this deployment shows (used by the layout and the sitemap).
 * MENU overrides; local dev → "dev"; stage branch deploy (Vercel sets VERCEL_GIT_COMMIT_REF) → "stage"; else "main".
 * A missing menu falls back down the chain (dev → stage → main), so the navigation is never empty.
 */
export async function resolveMenu() {
	const preferred = env.MENU || (dev ? 'dev' : env.VERCEL_GIT_COMMIT_REF === 'stage' ? 'stage' : 'main');
	const chain = [...new Set([preferred, ...CHAIN.slice(CHAIN.indexOf(preferred) + 1)])];
	for (const name of chain) {
		const menu = await getMenu(name);
		if (menu) return menu;
	}
	return null;
}
