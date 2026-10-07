import { getSeo, getEditions } from '$lib/utils/sanity';
import { resolveEditorial } from '$lib/server/editorial.js';
import { resolveMenu } from '$lib/server/menu.js';
import { error } from '@sveltejs/kit';

export async function load() {
	const [seo, editions, menu, editorial] = await Promise.all([getSeo(), getEditions(), resolveMenu(), resolveEditorial()]);
	if (seo) {
		return {
			seo,
			// newest first; what the top-level pages show comes from this site's Editorial, not from here
			editions: editions ?? [],
			menu,
			// prefooter placements of this site's Editorial ({paths, ...prefooter})
			prefooters: editorial?.prefooters ?? []
		};
	}
  throw error(404, 'Not found');
}
