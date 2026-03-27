import { getSeo } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load() {
	const seo = await getSeo();
	if (seo) {
		return {
			seo
		};
	}
  throw error(404, 'Not found');
}