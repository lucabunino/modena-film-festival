import { getEditionHome } from '$lib/utils/sanity';
import { editionLabel, isPublic } from '$lib/utils/edition.js';
import { archivePage } from '$lib/server/edition.js';
import { error } from '@sveltejs/kit';

// the archive's subpages, in order; a box shows when the subpage has content and is public
// (the Regolamento has no box: it is reached from the Festival page)
const subpages = [
	{ part: 'festival', path: 'festival', title: 'Festival', abstract: 'Il Festival, la giuria e i premi', label: 'Scopri il Festival' },
	{ part: 'program', path: 'programma', title: 'Programma', abstract: 'Tutti gli eventi, giorno per giorno', label: 'Vedi il programma' },
	{ part: 'winners', path: 'vincitori', title: 'Vincitori', abstract: 'I film premiati', label: 'Vedi i vincitori' },
	{ part: 'locations', path: 'luoghi', title: 'Luoghi', abstract: 'I luoghi del Festival', label: 'Vedi i luoghi' },
	{ part: 'partners', path: 'partner', title: 'Partner', abstract: 'Chi ha sostenuto il Festival', label: 'Vedi i partner' },
];

export async function load({ parent, setHeaders }) {
	const { edition } = await parent();
	const home = await getEditionHome(edition.slug);
	if (!home) throw error(404, 'Not found');
	return {
		intro: home.intro,
		pages: subpages
			.filter(({ part }) => home.has?.[part] && isPublic(home, part))
			.map(({ part, path, title, abstract, label }) => ({
				slug: part,
				title,
				abstract,
				cta: { href: `/${edition.slug}/${path}`, label, blank: false }
			})),
		...archivePage(edition, undefined, setHeaders),
		seoSingle: {
			seoTitle: editionLabel(edition),
		}
	};
}
