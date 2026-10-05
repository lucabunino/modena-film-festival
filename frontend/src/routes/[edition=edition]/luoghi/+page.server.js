import { editionPages } from '$lib/components/editions/index.js';
import { editionLabel } from '$lib/utils/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ parent }) {
	const { edition } = await parent();
	if (!editionPages[edition]?.luoghi) throw error(404, 'Not found');
	return {
		seoSingle: {
			seoTitle: `Luoghi ${editionLabel(edition)}`,
		}
	};
}
