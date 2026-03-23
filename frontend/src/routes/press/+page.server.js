import { getNewses } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const newses = await getNewses();
	if (newses) {
		return {
			newses
		};
	}
  throw error(404, 'Not found');
}