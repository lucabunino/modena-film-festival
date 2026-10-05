import { getProgram } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import { editionSlug } from '$lib/utils/edition.js';

export async function load() {
	const program = await getProgram();
	if (program) {
		return {
			program,
			canonical: `/${editionSlug(program.edition)}/programma`,
			seoSingle: {
				seoTitle: "Programma",
			}
		};
	}
	throw error(404, 'Not found');
}
