import {TagIcon} from '@sanity/icons/Tag'

export default {
	name: 'format',
	type: 'document',
	icon: TagIcon,
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