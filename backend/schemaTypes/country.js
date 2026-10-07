import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'

export default {
	name: 'country',
	type: 'document',
	icon: EarthGlobeIcon,
	fields: [
		{
			name: 'title',
			type: 'string',
			description: 'In Italian, as shown in the credits (e.g. Francia)',
			validation: (Rule) => Rule.required(),
		},
	],
}
