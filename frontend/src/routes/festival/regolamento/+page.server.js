import { getEdition } from '$lib/utils/sanity';
import { resolveEditorial } from '$lib/server/editorial.js';
import { placeholderPage } from '$lib/server/edition.js';

export async function load({ setHeaders }) {
	const editorial = await resolveEditorial();
	const content = editorial?.rules && (await getEdition(editorial.rules.slug));
	const seoSingle = { seoTitle: "Regolamento" };
	if (!content?.rules?.length) return { ...placeholderPage(setHeaders), seoSingle };
	return {
		rules: content.rules,
		seoSingle
	};
}
