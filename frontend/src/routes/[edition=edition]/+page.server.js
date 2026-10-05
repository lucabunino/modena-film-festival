import { getProgram, getContest } from '$lib/utils/sanity';
import { editionLabel } from '$lib/utils/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ parent }) {
	const { edition } = await parent();
	const [program, contest] = await Promise.all([getProgram(edition), getContest(edition)]);
	if (!program) throw error(404, 'Not found');
	return {
		program,
		contest,
		seoSingle: {
			seoTitle: editionLabel(edition),
		}
	};
}
