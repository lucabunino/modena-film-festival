/** 2026 → 'MFF2026' (display label, tab title) */
export function editionLabel(edition) {
	return `MFF${edition}`
}

/** 2026 → 'mff2026' (URL segment) */
export function editionSlug(edition) {
	return `mff${edition}`
}

/** Event page URL: inside an edition's tree when browsing one (/mff2026/…), else the current-edition /programma */
export function eventHref(slug, editionParam) {
	return editionParam ? `/${editionParam}/programma/${slug}` : `/programma/${slug}`
}
