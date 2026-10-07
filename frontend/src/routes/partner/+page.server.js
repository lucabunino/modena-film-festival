import { getEdition } from '$lib/utils/sanity';
import { resolveEditorial } from '$lib/server/editorial.js';
import { placeholderPage } from '$lib/server/edition.js';

export async function load({ setHeaders }) {
	const editorial = await resolveEditorial();
	const content = editorial?.partners && (await getEdition(editorial.partners.slug));
	const seoSingle = { seoTitle: "Partner" };
	if (!content?.partnerGroups?.length) return { ...placeholderPage(setHeaders), seoSingle };
	return {
		partnerGroups: content.partnerGroups,
		seoSingle
	};
}
