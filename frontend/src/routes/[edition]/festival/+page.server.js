import { getEdition } from '$lib/utils/sanity';
import { editionLabel } from '$lib/utils/edition.js';
import { archivePage } from '$lib/server/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ parent, setHeaders }) {
	const { edition } = await parent();
	const content = await getEdition(edition.slug);
	if (!content) throw error(404, 'Not found');
	return {
		content,
		...archivePage(edition, 'festival', setHeaders),
		seoSingle: {
			seoTitle: `Festival ${editionLabel(edition)}`,
		}
	};
}
