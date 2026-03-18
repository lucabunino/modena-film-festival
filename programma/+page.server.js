import { getProgram } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const program = await getProgram();
	if (program) {
		return {
			program
		};
	}
  throw error(404, 'Not found');
}