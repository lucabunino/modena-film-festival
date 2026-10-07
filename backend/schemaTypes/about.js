import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {UserIcon} from '@sanity/icons/User'

export default {
	name: 'about',
	type: 'document',
	icon: InfoOutlineIcon,
	fields: [
		{
			name: 'team',
			title: 'Organigramma',
			type: 'array',
			of: [
				{
					name: 'member',
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
	],
	preview: {
		prepare: () => ({title: 'About'}),
	},
}
