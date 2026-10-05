import {MenuIcon} from '@sanity/icons/Menu'
import {link, linkFields} from './fields/link.js'

export default {
	name: 'menu',
	type: 'document',
	icon: MenuIcon,
	fields: [
		{
			name: 'name',
			type: 'string',
			description: 'Which site uses this menu: "main" (production), "stage" (the stage branch) or "dev" (local development)',
			options: {list: ['main', 'stage', 'dev'], layout: 'radio', direction: 'horizontal'},
			initialValue: 'main',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'items',
			type: 'array',
			description: 'Level 2 items are subpages of the closest level 1 item above them, shown only while visiting that section',
			of: [
				{
					name: 'menuItem',
					type: 'object',
					fields: [
						{
							name: 'label',
							type: 'string',
							validation: (Rule) => Rule.required(),
						},
						...linkFields.map((field) =>
							field.name === 'href'
								? {...field, validation: (Rule) => field.validation(Rule).required()}
								: field,
						),
						{
							name: 'level',
							type: 'number',
							options: {
								list: [
									{title: '1 — Top level', value: 1},
									{title: '2 — Subpage', value: 2},
								],
								layout: 'radio',
								direction: 'horizontal',
							},
							initialValue: 1,
							validation: (Rule) => Rule.required(),
						},
					],
					preview: {
						select: {title: 'label', href: 'href', level: 'level'},
						prepare({title, href, level}) {
							return {title: level === 2 ? `↳ ${title}` : title, subtitle: href}
						},
					},
				},
			],
			validation: (Rule) =>
				Rule.custom((items) =>
					items?.[0]?.level === 2 ? 'The first item must be level 1 (a subpage needs a parent above it)' : true,
				),
		},
		{
			name: 'socials',
			type: 'array',
			of: [
				{
					name: 'social',
					type: 'object',
					fields: [
						{
							name: 'label',
							type: 'string',
							options: {list: ['Instagram', 'Facebook']},
							validation: (Rule) => Rule.required(),
						},
						...linkFields,
					],
					preview: {select: {title: 'label', subtitle: 'href'}},
				},
			],
		},
		{
			name: 'showNewsletter',
			title: 'Show newsletter button',
			type: 'boolean',
			description: 'Shown after the socials; opens the newsletter signup',
			initialValue: true,
		},
		{
			...link('cta'),
			title: 'Button',
			description: 'Optional highlighted button (e.g. Biglietti). Leave empty to hide it',
		},
	],
	preview: {
		select: {name: 'name'},
		prepare({name}) {
			return {title: `Menu: ${name ?? 'main'}`}
		},
	},
}
