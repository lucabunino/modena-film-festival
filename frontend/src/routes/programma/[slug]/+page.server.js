import { getEvent } from '$lib/utils/sanity';
import { editionSlug } from '$lib/utils/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ params, setHeaders }) {
	const event = await getEvent(params.slug);
	if (event?.length) {
		// reachable by URL, but kept out of search engines when hidden or not listed in any public program
		const hidden = event[0].status == 'hidden' || !event[0].edition;
		if (hidden) setHeaders({ 'x-robots-tag': 'noindex, nofollow' });
		return {
			event,
			// the edition page is canonical for an event that belongs to an edition
			canonical: event[0].edition ? `/${editionSlug(event[0].edition)}/programma/${params.slug}` : undefined,
			seoSingle: event[0].seo,
			hidden
		};
	}
	throw error(404, 'Not found');
}
