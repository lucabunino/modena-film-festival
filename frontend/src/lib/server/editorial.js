import { getEditorial } from '$lib/utils/sanity';
import { siteChain } from '$lib/server/site.js';

/** The Editorial this deployment follows, by name like the Menu (a missing one falls back dev → stage → main) */
export async function resolveEditorial() {
	for (const name of siteChain()) {
		const editorial = await getEditorial(name);
		if (editorial) return editorial;
	}
	return null;
}
