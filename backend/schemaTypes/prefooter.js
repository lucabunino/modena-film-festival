import {InsertBelowIcon} from '@sanity/icons/InsertBelow'
import shortText from './fields/shortText.js'
import {HREF_PATTERN} from './fields/link.js'

// The band before the footer. Which pages show it is set per site in the Editorial (Prefooters tab)
export default {
	name: 'prefooter',
	type: 'document',
	icon: InsertBelowIcon,
	groups: [
		{name: 'content', title: 'Content', default: true},
		{name: 'style', title: 'Style'},
	],
	fields: [
		{
			name: 'name',
			type: 'string',
			group: 'content',
			description: 'Only in the studio (e.g. Sponsor, Abbonamenti)',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'subtitle',
			type: 'string',
			group: 'content',
			description: 'Small line above the title (e.g. Diventa sponsor)',
		},
		{
			name: 'title',
			type: 'text',
			rows: 3,
			group: 'content',
			description: 'One line per row',
		},
		shortText({name: 'content', group: 'content'}),
		{
			name: 'cta',
			title: 'Button',
			type: 'object',
			group: 'content',
			options: {collapsible: true, collapsed: false},
			fields: [
				{name: 'label', type: 'string'},
				{
					name: 'href',
					type: 'string',
					description: 'Internal path (/biglietti) or URL',
					validation: (Rule) =>
						Rule.custom((href) => (!href || HREF_PATTERN.test(href) ? true : 'Must be a URL or a path starting with /')),
				},
				{name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false},
				{
					name: 'locked',
					type: 'boolean',
					description: 'Shown but not clickable: it shakes instead (e.g. tickets not on sale yet)',
					initialValue: false,
				},
			],
		},
		{
			...shortText({name: 'annotation', group: 'content'}),
			description: 'Small print under the button (e.g. * Gli abbonati hanno diritto…)',
		},
		{
			name: 'color',
			title: 'Background',
			type: 'string',
			group: 'style',
			options: {
				list: ['white', 'linen', 'pink', 'yellow', 'iris', 'red', 'cyan', 'brown', 'gray'],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'linen',
		},
		{
			name: 'mediaType',
			title: 'Media',
			type: 'string',
			group: 'style',
			description: 'With media the text takes half the width, without it the whole band',
			options: {
				list: [
					{title: 'None', value: 'none'},
					{title: 'Image', value: 'image'},
					{title: 'Video', value: 'video'},
				],
				layout: 'radio',
				direction: 'horizontal',
			},
			initialValue: 'none',
		},
		{
			name: 'image',
			type: 'image',
			group: 'style',
			options: {hotspot: true},
			hidden: ({document}) => document?.mediaType !== 'image',
		},
		{
			name: 'video',
			type: 'file',
			group: 'style',
			options: {accept: 'video/mp4'},
			hidden: ({document}) => document?.mediaType !== 'video',
		},
		{
			name: 'poster',
			type: 'image',
			group: 'style',
			description: 'Shown while the video loads',
			hidden: ({document}) => document?.mediaType !== 'video',
		},
	],
	preview: {
		select: {title: 'name', subtitle: 'subtitle', image: 'image', poster: 'poster'},
		prepare: ({title, subtitle, image, poster}) => ({
			title,
			subtitle,
			media: image || poster || InsertBelowIcon,
		}),
	},
}
