import { getProgram } from '$lib/utils/sanity';
import { editionLabel } from '$lib/utils/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ parent }) {
	const { edition } = await parent();
	const program = await getProgram(edition);
	if (!program) throw error(404, 'Not found');
	return {
		program,
		seoSingle: {
			seoTitle: `Programma ${editionLabel(edition)}`,
		}
	};
}
