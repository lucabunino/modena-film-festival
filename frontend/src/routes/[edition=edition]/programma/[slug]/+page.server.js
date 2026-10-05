import { getEvent } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params, parent, setHeaders }) {
	const { edition } = await parent();
	const event = await getEvent(params.slug);
	// only events listed in this edition's program live under it
	if (!event?.length || event[0].edition !== edition) throw error(404, 'Not found');
	// in this edition's program by definition (else 404 above); only the status can hide it
	const hidden = event[0].status == 'hidden';
	if (hidden) setHeaders({ 'x-robots-tag': 'noindex, nofollow' });
	return {
		event,
		seoSingle: event[0].seo,
		hidden
	};
}
