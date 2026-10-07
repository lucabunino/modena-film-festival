import { getEvent } from '$lib/utils/sanity';
import { isPublic } from '$lib/utils/edition.js';
import { error } from '@sveltejs/kit';

export async function load({ params, parent, setHeaders }) {
	const { edition } = await parent();
	const event = await getEvent(params.slug);
	// only events listed in this edition's program live under it
	if (!event?.length || event[0].edition?.slug !== edition.slug) throw error(404, 'Not found');
	// in this edition's program by definition (else 404 above); its status or a hidden program can hide it
	const hidden = event[0].status == 'hidden' || !isPublic(edition, 'program');
	if (hidden) setHeaders({ 'x-robots-tag': 'noindex, nofollow' });
	return {
		event,
		seoSingle: event[0].seo,
		hidden
	};
}
