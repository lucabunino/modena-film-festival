import { getProgram } from '$lib/utils/sanity';
import { editionLabel } from '$lib/utils/edition.js';
import { archivePage } from '$lib/server/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ parent, setHeaders }) {
	const { edition } = await parent();
	const program = await getProgram(edition.slug);
	if (!program?.days?.length) throw error(404, 'Not found');
	return {
		program,
		...archivePage(edition, 'program', setHeaders),
		seoSingle: {
			seoTitle: `Programma ${editionLabel(edition)}`,
		}
	};
}
