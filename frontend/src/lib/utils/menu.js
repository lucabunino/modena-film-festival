/** True when `pathname` is `href` or one of its subpaths ('/' only matches itself) */
export function isCurrent(href, pathname) {
	if (!href?.startsWith('/')) return false
	if (href === '/') return pathname === '/'
	return pathname === href || pathname.startsWith(href + '/')
}

/**
 * Flat CMS list (each item has a level) → level-1 items with their level-2 `children`.
 * `open`: the visitor is on the item or one of its children, so its children are shown.
 * @param {{_key: string, label: string, href: string, openInNewTab?: boolean, level?: number}[]} items
 * @param {string} pathname
 */
export function buildMenu(items = [], pathname) {
	const groups = []
	for (const item of items) {
		if (item.level === 2 && groups.length) groups.at(-1).children.push(item)
		else groups.push({ ...item, children: [] })
	}
	return groups.map((group) => ({
		...group,
		open: isCurrent(group.href, pathname) || group.children.some((child) => isCurrent(child.href, pathname)),
	}))
}
