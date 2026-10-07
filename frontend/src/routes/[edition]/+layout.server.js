import { error } from '@sveltejs/kit';

// any top-level address not taken by a static route lands here: an Edition's slug, else 404
export async function load({ params, parent }) {
	const { editions } = await parent();
	const edition = editions.find((e) => e.slug === params.edition);
	if (!edition) error(404, 'Not found');
	return { edition };
}
