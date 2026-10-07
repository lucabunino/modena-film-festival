import { getEdition } from '$lib/utils/sanity';
import { editionLabel } from '$lib/utils/edition.js';
import { archivePage } from '$lib/server/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ parent, setHeaders }) {
	const { edition } = await parent();
	const content = await getEdition(edition.slug);
	if (!content?.winners?.length) throw error(404, 'Not found');
	return {
		content,
		...archivePage(edition, 'winners', setHeaders),
		seoSingle: {
			seoTitle: `Vincitori ${editionLabel(edition)}`,
		}
	};
}
