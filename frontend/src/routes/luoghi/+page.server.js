import { editionSlug } from '$lib/utils/edition.js';

export async function load({ parent }) {
	const { editions } = await parent();
	return {
		edition: editions[0],
		canonical: `/${editionSlug(editions[0])}/luoghi`,
		seoSingle: {
			seoTitle: "Luoghi",
		}
	};
}
