import { getEdition } from '$lib/utils/sanity';
import { resolveEditorial } from '$lib/server/editorial.js';
import { archiveCanonical, placeholderPage } from '$lib/server/edition.js';

export async function load({ setHeaders }) {
	const editorial = await resolveEditorial();
	const content = editorial?.festival && (await getEdition(editorial.festival.slug));
	const seoSingle = { seoTitle: "Festival" };
	if (!content) return { ...placeholderPage(setHeaders), seoSingle };
	return {
		content,
		canonical: archiveCanonical(editorial.festival, 'festival', '/festival'),
		seoSingle
	};
}
