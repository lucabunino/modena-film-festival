import { getSeo, getEditions } from '$lib/utils/sanity';
import { resolveMenu } from '$lib/server/menu.js';
import { error } from '@sveltejs/kit';

export async function load() {
	const [seo, editions, menu] = await Promise.all([getSeo(), getEditions(), resolveMenu()]);
	if (seo) {
		return {
			seo,
			// newest first; editions[0] is the current edition
			editions: editions ?? [],
			menu
		};
	}
  throw error(404, 'Not found');
}
