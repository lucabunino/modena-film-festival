import { getNewses, getEditions, getProgramEvents } from '$lib/utils/sanity';
import { resolveMenu } from '$lib/server/menu.js';
import { editionPages } from '$lib/components/editions/index.js';
import { editionSlug } from '$lib/utils/edition.js';

const base = 'https://www.modenafilmfestival.it';

// pages reached from the footer or other pages rather than the menu
const alwaysListed = ['/', '/festival/regolamento', '/partner/diventa-sponsor', '/privacy', '/cookies'];
// top-level pages whose canonical is their current edition copy (listed below with the edition)
const canonicalElsewhere = new Set(['/festival', '/programma', '/luoghi']);

const day = (date) => new Date(date).toISOString().split('T')[0];

export async function GET() {
	const [menu, editions, programs, newses] = await Promise.all([resolveMenu(), getEditions(), getProgramEvents(), getNewses()]);

	/** @type {Map<string, {priority: number, lastmod?: string}>} path → entry; first entry for a path wins */
	const urls = new Map();
	const add = (path, priority, lastmod) => {
		if (!urls.has(path)) urls.set(path, { priority, lastmod });
	};

	add('/', 1.0);

	// menu: internal pages only (no external links, anchors, or pages canonical elsewhere)
	for (const item of menu?.items ?? []) {
		const path = item.href?.split(/[?#]/)[0];
		if (!path?.startsWith('/') || path.startsWith('//') || canonicalElsewhere.has(path)) continue;
		add(path, item.level === 2 ? 0.6 : 0.8);
	}

	for (const path of alwaysListed) add(path, 0.5);

	// editions: landing, programma and the hardcoded per-edition pages
	for (const edition of editions ?? []) {
		const slug = editionSlug(edition);
		add(`/${slug}`, 0.8);
		add(`/${slug}/programma`, 0.8);
		for (const page of ['festival', 'luoghi', 'partner']) {
			if (editionPages[edition]?.[page]) add(`/${slug}/${page}`, 0.7);
		}
		if (editionPages[edition]?.regolamento) add(`/${slug}/festival/regolamento`, 0.5);
	}

	// events: canonical URL under their latest edition (programs are newest first, so the first one wins)
	for (const program of programs ?? []) {
		for (const event of program.events ?? []) {
			if (event?.slug && event.status !== 'hidden') add(`/${editionSlug(program.edition)}/programma/${event.slug}`, 0.6, day(event._updatedAt));
		}
	}

	for (const news of newses ?? []) {
		add(`/news/${news.slug.current}`, 0.7, day(news.date));
	}

	const body = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${[...urls].map(([path, { priority, lastmod }]) => `	<url>
			<loc>${base}${path === '/' ? '/' : path}</loc>${lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : ''}
			<priority>${priority.toFixed(1)}</priority>
		</url>`).join('\n')}
	</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			// cache for an hour at the edge to limit Sanity requests
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
