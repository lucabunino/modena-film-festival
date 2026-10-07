import { getEdition } from '$lib/utils/sanity';
import { resolveEditorial } from '$lib/server/editorial.js';
import { archiveCanonical, placeholderPage } from '$lib/server/edition.js';

export async function load({ setHeaders }) {
	const editorial = await resolveEditorial();
	const content = editorial?.winners && (await getEdition(editorial.winners.slug));
	const seoSingle = { seoTitle: "Vincitori" };
	if (!content?.winners?.length) return { ...placeholderPage(setHeaders), seoSingle };
	return {
		content,
		canonical: archiveCanonical(editorial.winners, 'winners', '/vincitori'),
		seoSingle
	};
}
