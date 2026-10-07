/** An Edition's display label (tab title, archive title): its title, else MFF + year */
export function editionLabel(edition) {
	return edition?.title || `MFF${edition?.year}`
}

/**
 * Archive pages of an Edition are public or hidden one by one (hidden: reachable, but noindex and not in the sitemap).
 * part: 'festival' | 'program' | 'rules' | 'locations' | 'partners' | 'winners', or omitted for the archive landing page
 */
export function isPublic(edition, part) {
	return edition?.[part ? `${part}Status` : 'status'] === 'public'
}

/** Event page URL: inside an edition's tree when browsing one (/2026/…), else the current-edition /programma */
export function eventHref(slug, editionParam) {
	return editionParam ? `/${editionParam}/programma/${slug}` : `/programma/${slug}`
}
