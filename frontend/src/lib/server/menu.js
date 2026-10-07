import { getMenu } from '$lib/utils/sanity';
import { siteChain } from '$lib/server/site.js';

/** The menu document this deployment shows (used by the layout and the sitemap): see siteChain() */
export async function resolveMenu() {
	for (const name of siteChain()) {
		const menu = await getMenu(name);
		if (menu) return { ...menu, items: resolveSubpageHrefs(menu.items ?? []) };
	}
	return null;
}

/**
 * A level 2 item's href may be relative to its level 1 parent: "regolamento" under "/festival" → "/festival/regolamento".
 * Full paths, URLs, mailto: and tel: are left as they are.
 */
function resolveSubpageHrefs(items) {
	let parent;
	return items.map((item) => {
		if (item.level !== 2) {
			parent = item.href;
			return item;
		}
		const relative = item.href && !/^(https?:\/\/|mailto:|tel:|\/|#)/.test(item.href);
		if (!relative || !parent?.startsWith('/')) return item;
		return { ...item, href: `${parent.replace(/\/+$/, '')}/${item.href.replace(/^\/+/, '')}` };
	});
}
