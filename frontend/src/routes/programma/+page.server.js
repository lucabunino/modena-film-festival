import { getProgram } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ setHeaders }) {
    const program = await getProgram();
    setHeaders({
        'cache-control': 'public, max-age=3600, stale-while-revalidate=86400'
    });
    if (program) {
		return {
			program
		};
	}
  throw error(404, 'Not found');
}