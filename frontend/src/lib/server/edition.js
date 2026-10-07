import { isPublic } from '$lib/utils/edition.js';

/** Data for an archive page of `edition`: hidden parts are served, but kept out of search engines */
export function archivePage(edition, part, setHeaders) {
	const hidden = !isPublic(edition, part);
	if (hidden) setHeaders({ 'x-robots-tag': 'noindex, nofollow' });
	return { hidden };
}

/** Canonical of a top-level page: its archive copy, unless that copy is hidden (then the page itself) */
export function archiveCanonical(edition, part, path) {
	return isPublic(edition, part) ? `/${edition.slug}${path}` : undefined;
}

/** Data for a top-level page whose Editorial pointer is empty (or points to an Edition without that content) */
export function placeholderPage(setHeaders) {
	setHeaders({ 'x-robots-tag': 'noindex, nofollow' });
	return { placeholder: true, hidden: true };
}
