import { AsteriskIcon } from '@sanity/icons'

export default {
	name: 'sense',
	type: 'document',
	icon: AsteriskIcon,
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