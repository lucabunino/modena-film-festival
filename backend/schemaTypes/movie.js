import {DocumentVideoIcon} from '@sanity/icons/DocumentVideo'
import eventBody from './fields/eventBody.js'
import seoFields from './fields/seoFields.js'

export default {
	name: 'movie',
	type: 'document',
	icon: DocumentVideoIcon,
	groups: [
		{name: 'Movie', default: true},
		{name: 'SEO'},
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			group: 'Movie',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'slug',
			type: 'slug',
			group: 'Movie',
			options: {source: 'title', maxLength: 96},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'thumbnail',
			group: 'Movie',
			type: 'image',
			description: 'Horizontal, like event thumbnails',
			options: {hotspot: true},
		},
		{
			name: 'poster',
			group: 'Movie',
			type: 'image',
			description: 'Vertical (e.g. Film in concorso)',
			options: {hotspot: true},
		},
		{
			name: 'director',
			group: 'Movie',
			type: 'string',
		},
		{
			name: 'countries',
			group: 'Movie',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'country'}]}],
			validation: (Rule) => Rule.unique(),
		},
		{
			name: 'year',
			group: 'Movie',
			type: 'number',
			validation: (Rule) => Rule.integer().min(1880).max(2100),
		},
		{
			name: 'duration',
			group: 'Movie',
			type: 'number',
			description: 'Minutes',
			validation: (Rule) => Rule.integer().positive(),
		},
		{
			name: 'version',
			group: 'Movie',
			type: 'string',
			description: 'How the credits read: "V.O. francese…", "Versione in italiano…" or "Cinema muto"',
			options: {
				list: [
					{title: 'V.O.', value: 'original'},
					{title: 'Not V.O.', value: 'translated'},
					{title: 'Cinema muto', value: 'silent'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'original',
		},
		{
			name: 'languages',
			title: 'Languages',
			group: 'Movie',
			type: 'array',
			of: [{type: 'reference', to: [{type: 'language'}]}],
			description: 'Spoken in this version (e.g. francese)',
			validation: (Rule) => Rule.unique(),
			hidden: ({document}) => document?.version === 'silent',
		},
		{
			name: 'subtitles',
			group: 'Movie',
			type: 'reference',
			to: [{type: 'language'}],
			description: 'Empty: no subtitles (e.g. a film in italiano)',
			hidden: ({document}) => document?.version === 'silent',
		},
		eventBody({group: 'Movie'}),
		...seoFields(),
	],
	orderings: [{title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
	preview: {
		select: {title: 'title', director: 'director', year: 'year', media: 'poster', thumbnail: 'thumbnail'},
		prepare: ({title, director, year, media, thumbnail}) => ({
			title,
			subtitle: [director, year].filter(Boolean).join(', '),
			media: media || thumbnail || DocumentVideoIcon,
		}),
	},
}
