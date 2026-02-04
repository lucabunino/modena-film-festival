import { UserIcon } from '@sanity/icons'

export default {
	name: 'person',
	type: 'document',
	icon: UserIcon,
	fields: [
		{
			name: 'name',
			type: 'string',
		},
		{
			name: 'surname',
			type: 'string',
		},
		{
			name: 'alias',
			type: 'string',
		},
		{
			name: 'slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: (doc) => `${doc.name}-${doc.surname}`,
				maxLength: 96,
			},
		},
		{
			name: 'portrait',
			type: 'image',
		},
		{
			name: 'occupation',
			type: 'string',
			hidden: ({ parent }) => parent?.isAuthor !== true,
		},
	],
	orderings: [
		{
			title: 'Surname',
			name: 'surnameAsc',
			by: [
				{ field: 'surname', direction: 'asc' },
			],
		},
		{
			title: 'Name',
			name: 'nameAsc',
			by: [
				{ field: 'name', direction: 'asc' },
			],
		},
	],
	preview: {
		select: {
			name: 'name',
			surname: 'surname',
			alias: 'alias',
			media: 'portrait',
		},
		prepare(selection) {
			const {name, surname, alias, media} = selection;
			return {
				title: `${name ? name : ``} ${surname ? surname : ``} ${alias ? `(${alias})` : ``}`,
				media: media ? media : UserIcon
			};
		}
	}
};