import {CaseIcon} from '@sanity/icons/Case'

export default {
	name: 'organization',
	type: 'document',
	icon: CaseIcon,
	fields: [
		{
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'href',
			type: 'url',
		},
		{
			name: 'logo',
			type: 'image',
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'href',
			media: 'logo',
		},
	},
}
