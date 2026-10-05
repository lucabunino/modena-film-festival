import { error, redirect } from '@sveltejs/kit';
import { editionSlug } from '$lib/utils/edition.js';

export async function load({ params, parent, url }) {
	const edition = Number(params.edition.slice(3));
	const slug = editionSlug(edition);
	if (params.edition !== slug) redirect(301, url.pathname.replace(params.edition, slug) + url.search);
	const { editions } = await parent();
	if (!editions.includes(edition)) error(404, 'Not found');
	return { edition };
}
