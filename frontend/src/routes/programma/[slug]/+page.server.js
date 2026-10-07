import { getEvent } from '$lib/utils/sanity';
import { archiveCanonical } from '$lib/server/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ params, setHeaders }) {
	const event = await getEvent(params.slug);
	if (event?.length) {
		// reachable by URL, but kept out of search engines when hidden or not listed in any edition's program
		const hidden = event[0].status == 'hidden' || !event[0].edition;
		if (hidden) setHeaders({ 'x-robots-tag': 'noindex, nofollow' });
		return {
			event,
			// the edition page is canonical for an event that belongs to an edition (unless that program is hidden)
			canonical: event[0].edition && archiveCanonical(event[0].edition, 'program', `/programma/${params.slug}`),
			seoSingle: event[0].seo,
			hidden
		};
	}
	throw error(404, 'Not found');
}
