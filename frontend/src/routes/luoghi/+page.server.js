import { getEdition } from '$lib/utils/sanity';
import { resolveEditorial } from '$lib/server/editorial.js';
import { archiveCanonical, placeholderPage } from '$lib/server/edition.js';

export async function load({ setHeaders }) {
	const editorial = await resolveEditorial();
	const content = editorial?.locations && (await getEdition(editorial.locations.slug));
	const seoSingle = { seoTitle: "Luoghi" };
	if (!content?.locations?.length) return { ...placeholderPage(setHeaders), seoSingle };
	return {
		locations: content.locations,
		canonical: archiveCanonical(editorial.locations, 'locations', '/luoghi'),
		seoSingle
	};
}
