import { EmptyIcon } from '@sanity/icons'

export default {
	name: 'format',
	type: 'document',
	icon: EmptyIcon,
	fields: [
		{
			name: 'title',
			type: 'string',
		},
		{
			name: 'slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'title',
				maxLength: 96,
			},
		},
	],
};