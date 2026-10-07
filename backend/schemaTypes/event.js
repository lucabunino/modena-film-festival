import seoFields from './fields/seoFields.js'
import eventBody from './fields/eventBody.js'
import shortText from './fields/shortText.js'
import colorOptions from './fields/colorOptions.js'
import {SparkleIcon} from '@sanity/icons/Sparkle'

export default {
	name: 'event',
	type: 'document',
	icon: SparkleIcon,
	groups: [
		{name: 'Event'},
		{name: 'Style'},
		{name: 'Related'},
		{name: 'SEO'},
	],
	fieldsets: [
		{name: 'Cta'},
		{name: 'Webtic'},
		{name: 'Tag'},
	],
	fields: [
		{
			name: 'title',
			type: 'text',
			rows: 2,
			group: 'Event',
		},
		{
			name: 'subtitle',
			type: 'string',
			group: 'Event',
		},
		{
			name: 'slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'title',
				maxLength: 96,
			},
			group: 'Event',
		},
		{
			name: 'status',
			type: 'string',
			options: {
				list: [
					{ title: 'Public', value: 'public' },
					{ title: 'Hidden', value: 'hidden' },
				],
				layout: 'radio'
			},
			initialValue: 'public',
			group: 'Event',
		},
		{
			name: 'formats',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{type: 'format'},]
				}
			],
			group: 'Event',
		},
		{
			name: 'sense',
			type: 'reference',
			to: [{type: 'sense'},],
			group: 'Event',
		},
		{
			name: 'start',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
			group: 'Event',
		},
		{
			name: 'end',
			type: 'datetime',
			group: 'Event',
		},
		// {
		// 	name: 'people',
		// 	type: 'array',
		// 	of: [
		// 		{
		// 			name: 'person',
		// 			type: 'reference',
		// 			to: [{ type: 'person' }],
		// 		},
		// 	],
		// 	group: 'Event',
		// },
		{
			name: 'location',
			type: 'reference',
			to: [{type: 'location'},],
			group: 'Event',
		},
		{
			name: 'webticHref',
			title: 'Href',
			type: 'url',
			group: 'Event',
			fieldset: 'Webtic',
		},
		{
			name: 'soldOut',
			type: 'boolean',
			group: 'Event',
			fieldset: 'Webtic',
		},
		// {
		// 	name: 'ctaLabel',
		// 	title: 'Label',
		// 	type: 'string',
		// 	group: 'Event',
		// 	fieldset: 'Cta',
		// },
		// {
		// 	name: 'ctaHref',
		// 	title: 'Href',
		// 	type: 'url',
		// 	group: 'Event',
		// 	fieldset: 'Cta',
		// },
		// {
		// 	name: 'ctaBlank',
		// 	title: 'Blank',
		// 	type: 'boolean',
		// 	initialValue: false,
		// 	group: 'Event',
		// 	fieldset: 'Cta',
		// },
		{
			name: 'program',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [
						{ value: 'normal', title: 'Normal' },
					],
					lists: [
						{title: 'Bullet', value: 'bullet'}
					],
					marks: {
						decorators: [
							{title: 'Bold', value: 'strong'},
							{title: 'Italic', value: 'em'},
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								fields: [
									{
										name: 'href',
										type: 'string',
										validation: Rule =>
										Rule.custom(href => {
											if (!href) return true;
											return /^(https?:\/\/|mailto:|tel:)/.test(href)
											? true
											: 'Must be a valid URL, mailto:, or tel: link';
										}),
									},
									{
										title: 'Open in new tab',
										name: 'blank',
										type: 'boolean',
									},
								],
							},
						],
					},
				},
			],
			group: 'Event',
		},
		shortText({group: 'Event'}),
		{
			name: 'description',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [
						{ value: 'normal', title: 'Normal' },
					],
					lists: [
						{title: 'Bullet', value: 'bullet'}
					],
					marks: {
						decorators: [
							{title: 'Bold', value: 'strong'},
							{title: 'Italic', value: 'em'},
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								fields: [
									{
										name: 'href',
										type: 'string',
										validation: Rule =>
										Rule.custom(href => {
											if (!href) return true;
											return /^(https?:\/\/|mailto:|tel:)/.test(href)
											? true
											: 'Must be a valid URL, mailto:, or tel: link';
										}),
									},
									{
										title: 'Open in new tab',
										name: 'blank',
										type: 'boolean',
									},
								],
							},
						],
					},
				},
			],
			group: 'Event',
		},
		{
			name: 'movie',
			type: 'reference',
			to: [{type: 'movie'}],
			description: 'Film screened at this event: the page shows its thumbnail, credits and body',
			group: 'Event',
		},
		{
			name: 'customContent',
			title: 'Custom thumbnail, credits and body',
			type: 'boolean',
			description: 'Use this event\'s own instead of the movie\'s',
			initialValue: false,
			hidden: ({document}) => !document?.movie,
			group: 'Event',
		},
		{
			name: 'credits',
			type: 'text',
			rows: 4,
			description: 'Empty: the movie\'s',
			hidden: ({document}) => Boolean(document?.movie) && document?.customContent !== true,
			group: 'Event',
		},
		{
			...eventBody({group: 'Event'}),
			description: 'Empty: the movie\'s',
			hidden: ({document}) => Boolean(document?.movie) && document?.customContent !== true,
		},
		{
			name: 'thumbnail',
			type: 'image',
			description: 'Empty: the movie\'s',
			hidden: ({document}) => Boolean(document?.movie) && document?.customContent !== true,
			group: 'Event',
		},
		// {
		// 	name: 'layout',
		// 	type: 'string',
		// 	options: {
		// 		list: [
		// 			{ title: 'Main', value: 'main' },
		// 			{ title: 'Secondary', value: 'secondary' },
		// 		],
		// 	},
		// 	initialValue: 'main',
		// 	group: 'Style',
		// },
		// {
		// 	name: 'size',
		// 	type: 'string',
		// 	options: {
		// 		list: [
		// 			{ title: 'S', value: 's' },
		// 			{ title: 'M', value: 'm' },
		// 			{ title: 'L', value: 'l' },
		// 		],
		// 	},
		// 	initialValue: 'm',
		// 	group: 'Style',
		// },
		{
			name: 'related',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{type: 'event'}],
				}
			],
			group: 'Related',
		},
		...seoFields(),
	],
	orderings: [
        {
            title: 'Start',
            name: 'startDateAsc',
            by: [
                {field: 'start', direction: 'asc'}
            ]
        },
    ],
	preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
            media: 'thumbnail',
            movie: 'movie._ref',
            customContent: 'customContent',
            movieThumbnail: 'movie.thumbnail',
        },
        prepare(selection) {
            const {title, subtitle, media, movie, customContent, movieThumbnail} = selection
            const own = !movie || customContent === true

            return {
                title: title,
                subtitle: subtitle,
                // same rule as the site: the event's own thumbnail only without a movie or with custom content
                media: media?.asset && own ? media : movieThumbnail || media,
            }
        }
    }
};