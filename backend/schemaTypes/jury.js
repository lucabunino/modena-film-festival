import {UsersIcon} from '@sanity/icons/Users'

// Whoever decides one prize in one Edition; listed in the Edition's Jury tab and named by its Awards
export default {
	name: 'jury',
	type: 'document',
	icon: UsersIcon,
	fields: [
		{
			name: 'title',
			type: 'string',
			description: 'The prize this jury decides (e.g. Premio della Giuria)',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'description',
			type: 'text',
			rows: 3,
		},
		{
			name: 'edition',
			type: 'reference',
			to: [{type: 'edition'}],
			validation: (Rule) => Rule.required(),
		},
	],
	preview: {
		select: {title: 'title', edition: 'edition.title', year: 'edition.year'},
		prepare: ({title, edition, year}) => ({
			title,
			subtitle: edition || (year ? `MFF${year}` : undefined),
		}),
	},
}
