import { getProgram } from '$lib/utils/sanity';
import { resolveEditorial } from '$lib/server/editorial.js';
import { archiveCanonical, placeholderPage } from '$lib/server/edition.js';

export async function load({ setHeaders }) {
	const editorial = await resolveEditorial();
	const program = editorial?.program && (await getProgram(editorial.program.slug));
	const seoSingle = { seoTitle: "Programma" };
	if (!program?.days?.length) return { ...placeholderPage(setHeaders), seoSingle };
	return {
		program,
		canonical: archiveCanonical(editorial.program, 'program', '/programma'),
		seoSingle
	};
}
