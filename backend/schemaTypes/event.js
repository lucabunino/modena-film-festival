import seoFields from './fields/seoFields.js'
import colorOptions from './fields/colorOptions.js'
import { SparkleIcon } from '@sanity/icons'

export default {
	name: 'event',
	type: 'document',
	icon: SparkleIcon,
	groups: [
		{name: 'Event'},
		{name: 'Style'},
		{name: 'Homepage'},
		{name: 'Related'},
		{name: 'SEO'},
	],
	fieldsets: [
		{name: 'Homepage'},
		{name: 'Cta'},
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
			name: 'credits',
			type: 'text',
			rows: 4,
			group: 'Event',
		},
		{
			name: 'abstract',
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
			name: 'body',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [
						{ value: 'h2', title: 'H2' },
						{ value: 'h3', title: 'H3' },
						{ value: 'h4', title: 'H4' },
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
			name: 'thumbnail',
			type: 'image',
			group: 'Event',
		},
		{
			name: 'homepageTitle',
			title: 'Title',
			type: 'string',
			fieldset: 'Homepage',
			group: 'Homepage',
		},
		{
			name: 'homepageSubtitle',
			title: 'Subtitle',
			type: 'string',
			fieldset: 'Homepage',
			group: 'Homepage',
		},
		{
			name: 'homepageThumbnail',
			title: 'Thumbnail',
			type: 'image',
			fieldset: 'Homepage',
			group: 'Homepage',
		},
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
        },
        prepare(selection) {
            const {title, subtitle, media} = selection

            return {
                title: title,
                subtitle: subtitle,
                media: media,
            }
        }
    }
};