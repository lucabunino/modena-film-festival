import {DashboardIcon} from '@sanity/icons/Dashboard'
import {InsertBelowIcon} from '@sanity/icons/InsertBelow'

// The Editorial: every editorial choice for a site in one place (see CONTEXT.md, docs/adr/0001).
// One per site, like the Menus (name: main / stage / dev); the frontend falls back dev → stage → main.
// Home: a block driven by a reference is hidden while that reference is empty.
// Pages: one Edition per top-level page, so the next edition goes live page by page; empty → placeholder page.
const pointer = (name, title, description) => ({
	name,
	title,
	type: 'reference',
	to: [{type: 'edition'}],
	group: 'editorial',
	description,
})

export default {
	name: 'editorial',
	title: 'Editorial',
	type: 'document',
	icon: DashboardIcon,
	groups: [
		{name: 'editorial', title: 'Editorial', default: true},
		{name: 'prefooters', title: 'Prefooters'},
	],
	fields: [
		{
			name: 'name',
			type: 'string',
			group: 'editorial',
			description: 'Which site follows it: "main" (production), "stage" (the stage branch) or "dev" (local development)',
			options: {list: ['main', 'stage', 'dev'], layout: 'radio', direction: 'horizontal'},
			initialValue: 'main',
			validation: (Rule) => Rule.required(),
		},
		// Home, in page order
		{
			name: 'landing',
			group: 'editorial',
			type: 'reference',
			to: [{type: 'landing'}],
			description: 'Hero at the top of the home page (empty: no hero)',
		},
		{
			name: 'newsWidget',
			group: 'editorial',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'news'}]}],
			description: 'News highlighted on the home page, in this order (empty: no widget)',
		},
		{
			name: 'specialEvents',
			group: 'editorial',
			type: 'reference',
			to: [{type: 'edition'}],
			description: 'Edition whose special events fill the home\'s Il Festival block (empty: hidden)',
		},
		{
			name: 'competition',
			group: 'editorial',
			type: 'reference',
			to: [{type: 'edition'}],
			description: 'Edition whose films in competition fill the home\'s Film in concorso block (empty: hidden)',
		},

		// Pages
		pointer('festival', 'Festival', '/festival'),
		pointer('program', 'Program', '/programma, plus the program on the home page'),
		pointer('rules', 'Rules', '/festival/regolamento'),
		pointer('locations', 'Locations', '/luoghi'),
		pointer('partners', 'Partners', '/partner'),
		pointer('winners', 'Winners', '/vincitori'),

		// Prefooters: which one each page shows on this site
		{
			name: 'prefooters',
			type: 'array',
			group: 'prefooters',
			description: 'A page shows the first prefooter whose paths include it',
			of: [
				{
					name: 'placement',
					type: 'object',
					icon: InsertBelowIcon,
					fields: [
						{
							name: 'prefooter',
							type: 'reference',
							to: [{type: 'prefooter'}],
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'paths',
							type: 'array',
							of: [{type: 'string'}],
							options: {layout: 'tags'},
							description:
								'Pages that show it, by address: /, /programma, /2026/festival. End with /* for a page and all its subpages (e.g. /news/*)',
							validation: (Rule) =>
								Rule.required()
									.min(1)
									.custom((paths) =>
										(paths ?? []).every((path) => path.startsWith('/')) ? true : 'Each path starts with /',
									),
						},
					],
					preview: {
						select: {title: 'prefooter.name', paths: 'paths', media: 'prefooter.image'},
						prepare: ({title, paths, media}) => ({
							title,
							subtitle: paths?.join(', '),
							media: media || InsertBelowIcon,
						}),
					},
				},
			],
		},
	],
	preview: {
		select: {name: 'name'},
		prepare: ({name}) => ({title: `Editorial: ${name ?? 'main'}`}),
	},
}
