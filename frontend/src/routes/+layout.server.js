import { getSeo } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const seo = await getSeo();
	if (seo) {
		return {
			seo
		};
	}
  throw error(404, 'Not found');
}