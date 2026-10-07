import {SparklesIcon} from '@sanity/icons/Sparkles'
import {DocumentVideoIcon} from '@sanity/icons/DocumentVideo'
import {NumberIcon} from '@sanity/icons/Number'
import {SparkleIcon} from '@sanity/icons/Sparkle'
import {StarIcon} from '@sanity/icons/Star'
import {UserIcon} from '@sanity/icons/User'
import {UsersIcon} from '@sanity/icons/Users'
import {MarkerIcon} from '@sanity/icons/Marker'
import {CaseIcon} from '@sanity/icons/Case'
import {StackIcon} from '@sanity/icons/Stack'
import {TextIcon} from '@sanity/icons/Text'
import body from './fields/body.js'
import status from './fields/status.js'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default {
	name: 'edition',
	type: 'document',
	icon: SparklesIcon,
	groups: [
		{name: 'edition', title: 'Edition', default: true},
		{name: 'festival', title: 'Festival'},
		{name: 'program', title: 'Program'},
		{name: 'competition', title: 'Competition'},
		{name: 'specialEvents', title: 'Special events'},
		{name: 'jury', title: 'Jury'},
		{name: 'winners', title: 'Winners'},
		{name: 'rules', title: 'Rules'},
		{name: 'locations', title: 'Locations'},
		{name: 'partners', title: 'Partners'},
	],
	fields: [
		// Edition
		{
			name: 'title',
			type: 'string',
			group: 'edition',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'year',
			type: 'number',
			group: 'edition',
			description: 'Orders the editions and appears in page titles (e.g. Modena Film Festival 2026)',
			validation: (Rule) =>
				Rule.required()
					.integer()
					.custom(async (year, {document, getClient}) => {
						if (!year) return true
						const id = document._id.replace(/^drafts\./, '')
						const taken = await getClient({apiVersion: '2026-04-27'}).fetch(
							`count(*[_type == "edition" && year == $year && !(_id in [$id, "drafts." + $id])])`,
							{year, id},
						)
						return taken ? 'Another edition already has this year' : true
					}),
		},
		{
			name: 'slug',
			type: 'slug',
			group: 'edition',
			description: 'Archive address: /2026, /2026/programma',
			options: {source: (doc) => (doc.year ? String(doc.year) : ''), maxLength: 32},
			validation: (Rule) => Rule.required(),
		},
		status({group: 'edition', description: 'Archive landing page (/2026)'}),
		{
			...body(),
			name: 'intro',
			group: 'edition',
			description: 'Intro text on this edition\'s archive landing page',
		},

		// Festival
		status({name: 'festivalStatus', group: 'festival'}),
		{
			...body(),
			name: 'festivalEvent',
			title: 'Event',
			group: 'festival',
		},

		// Program
		status({name: 'programStatus', group: 'program'}),
		{
			name: 'days',
			type: 'array',
			group: 'program',
			of: [
				{
					type: 'object',
					name: 'day',
					icon: NumberIcon,
					fields: [
						{
							name: 'date',
							type: 'date',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'events',
							type: 'array',
							of: [{type: 'reference', to: [{type: 'event'}], icon: SparkleIcon}],
							validation: (Rule) => Rule.required(),
						},
					],
					preview: {
						select: {date: 'date', events: 'events'},
						prepare({date, events}) {
							const count = events ? events.length : 0
							let title = 'No date'
							if (date) {
								const d = new Date(date)
								title = `${days[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}`
							}
							return {
								title,
								subtitle: `${count} ${count === 1 ? 'event' : 'events'}`,
								media: NumberIcon,
							}
						},
					},
				},
			],
		},

		// Competition (Film in concorso)
		{
			name: 'competition',
			type: 'array',
			group: 'competition',
			description: 'Films in competition, in order. Each links to the event screening it in this edition\'s program',
			of: [{type: 'reference', to: [{type: 'movie'}], icon: DocumentVideoIcon}],
			validation: (Rule) => Rule.unique(),
		},

		// Special events (the five senses cards in the home's Il Festival block)
		{
			name: 'specialEvents',
			type: 'array',
			group: 'specialEvents',
			description: 'One event per sense, in order. A hidden event is shown locked, with its own (coming soon) image',
			of: [{type: 'reference', to: [{type: 'event'}], icon: SparkleIcon}],
			validation: (Rule) => Rule.max(5).unique(),
		},

		// Jury (shown on the archive Festival page only)
		{
			name: 'juriesIntro',
			type: 'text',
			rows: 2,
			group: 'jury',
		},
		{
			name: 'juries',
			type: 'array',
			group: 'jury',
			description: 'One per prize, with who decides it',
			of: [
				{
					type: 'reference',
					to: [{type: 'jury'}],
					icon: UsersIcon,
					options: {
						// only this edition's juries
						filter: ({document}) => ({
							filter: 'edition._ref == $id',
							params: {id: document._id.replace(/^drafts\./, '')},
						}),
					},
				},
			],
			validation: (Rule) => Rule.unique(),
		},
		{
			name: 'jurors',
			type: 'array',
			group: 'jury',
			description: 'Shown as cards after the juries',
			of: [
				{
					name: 'juror',
					type: 'object',
					icon: UserIcon,
					fields: [
						{
							name: 'person',
							type: 'reference',
							to: [{type: 'person'}],
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'role',
							type: 'string',
							description: 'Role in this edition only (e.g. jury president)',
						},
					],
					preview: {
						select: {name: 'person.name', surname: 'person.surname', role: 'role', media: 'person.portrait'},
						prepare: ({name, surname, role, media}) => ({
							title: [name, surname].filter(Boolean).join(' '),
							subtitle: role,
							media: media || UserIcon,
						}),
					},
				},
			],
		},

		// Winners (the Vincitori page)
		status({name: 'winnersStatus', group: 'winners'}),
		{
			name: 'winners',
			type: 'array',
			group: 'winners',
			of: [
				{
					name: 'winner',
					type: 'object',
					icon: StarIcon,
					fields: [
						{
							name: 'title',
							type: 'string',
							description: 'e.g. Miglior film, Menzione speciale',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'jury',
							type: 'reference',
							to: [{type: 'jury'}],
							description: 'Who gave it (one of this edition\'s juries)',
							options: {
								filter: ({document}) => ({
									filter: 'edition._ref == $id',
									params: {id: document._id.replace(/^drafts\./, '')},
								}),
							},
						},
						{
							name: 'prize',
							type: 'image',
							description: 'The prize object (e.g. a transparent PNG)',
						},
						{
							name: 'color',
							type: 'string',
							description: 'Background of its card (site palette)',
							options: {
								list: ['linen', 'pink', 'yellow', 'iris', 'red', 'cyan', 'brown', 'gray'],
								layout: 'radio',
								direction: 'horizontal',
							},
							initialValue: 'linen',
						},
						{
							name: 'movie',
							type: 'reference',
							to: [{type: 'movie'}],
							description: 'Links to the event screening it in this edition\'s program',
							validation: (Rule) => Rule.required(),
						},
					],
					preview: {
						select: {title: 'title', movie: 'movie.title', jury: 'jury.title', media: 'prize'},
						prepare: ({title, movie, jury, media}) => ({
							title: [title, movie].filter(Boolean).join(' — '),
							subtitle: jury,
							media: media || StarIcon,
						}),
					},
				},
			],
		},

		// Rules
		status({name: 'rulesStatus', group: 'rules'}),
		{
			...body(),
			name: 'rulesTeaser',
			title: 'Teaser',
			group: 'rules',
			description: 'Shown on the Festival page with a link to the rules (empty: not shown)',
		},
		{
			name: 'rules',
			type: 'array',
			group: 'rules',
			of: [
				{
					name: 'rule',
					type: 'object',
					icon: TextIcon,
					fields: [
						{
							name: 'title',
							type: 'string',
							description: 'e.g. Art. 1',
							validation: (Rule) => Rule.required(),
						},
						body(),
					],
					preview: {select: {title: 'title'}},
				},
			],
		},

		// Locations
		status({name: 'locationsStatus', group: 'locations'}),
		{
			name: 'locations',
			type: 'array',
			group: 'locations',
			description: 'Order sets the marker numbers on the map',
			of: [
				{
					name: 'editionLocation',
					type: 'object',
					icon: MarkerIcon,
					fields: [
						{
							name: 'location',
							type: 'reference',
							to: [{type: 'location'}],
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'title',
							type: 'string',
							description: 'Overrides the location title on this page (defaults to the location\'s)',
						},
						{
							name: 'adressLabel',
							title: 'Address',
							type: 'string',
							description: 'Overrides the location address on this page (defaults to the location\'s)',
						},
						{
							...body(),
							name: 'info',
							description: 'What is there this year (hours, services)',
						},
					],
					preview: {
						select: {title: 'title', locationTitle: 'location.title', subtitle: 'location.adressLabel'},
						prepare: ({title, locationTitle, subtitle}) => ({title: title || locationTitle, subtitle, media: MarkerIcon}),
					},
				},
			],
		},

		// Partners
		status({name: 'partnersStatus', group: 'partners'}),
		{
			name: 'partnerGroups',
			type: 'array',
			group: 'partners',
			of: [
				{
					name: 'partnerGroup',
					type: 'object',
					icon: StackIcon,
					fields: [
						{
							name: 'title',
							type: 'string',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'menuTitle',
							type: 'string',
							description: 'Shorter label in the page navigator (defaults to title)',
						},
						{
							name: 'slug',
							type: 'slug',
							options: {source: (doc, {parent}) => parent?.title, maxLength: 96},
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'partners',
							type: 'array',
							of: [
								{
									name: 'partner',
									type: 'object',
									icon: CaseIcon,
									fields: [
										{
											name: 'organization',
											type: 'reference',
											to: [{type: 'organization'}],
											validation: (Rule) => Rule.required(),
										},
										{
											name: 'role',
											type: 'string',
											description: 'Role in this edition only (e.g. Media partner)',
										},
									],
									preview: {
										select: {title: 'organization.title', subtitle: 'role', media: 'organization.logo'},
									},
								},
							],
						},
					],
					preview: {
						select: {title: 'title', partners: 'partners'},
						prepare: ({title, partners}) => ({
							title,
							subtitle: `${partners?.length || 0} partners`,
							media: StackIcon,
						}),
					},
				},
			],
		},
	],
	orderings: [{title: 'Year', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]}],
	preview: {
		select: {title: 'title', year: 'year', slug: 'slug.current'},
		prepare: ({title, year, slug}) => ({
			title: title || (year ? `MFF${year}` : 'New edition'),
			subtitle: slug ? `/${slug}` : undefined,
			media: SparklesIcon,
		}),
	},
}
