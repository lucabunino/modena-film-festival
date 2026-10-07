import {TranslateIcon} from '@sanity/icons/Translate'

export default {
	name: 'language',
	type: 'document',
	icon: TranslateIcon,
	fields: [
		{
			name: 'title',
			type: 'string',
			description: 'Lowercase, as it reads in the credits (e.g. francese, cinese mandarino)',
			validation: (Rule) => Rule.required(),
		},
	],
}
