import seoFields from './fields/seoFields.js'
import colorOptions from './fields/colorOptions.js'
import { CalendarIcon, UserIcon } from '@sanity/icons'

export default {
	name: 'event',
	type: 'document',
	icon: CalendarIcon,
	groups: [
		{name: 'Info'},
		{name: 'Style'},
		{name: 'Related'},
		{name: 'SEO'},
	],
	fieldsets: [
		{name: 'Cta'},
		{name: 'Tag'},
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			group: 'Info',
		},
		{
			name: 'subtitle',
			type: 'string',
			group: 'Info',
		},
		{
			name: 'slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'title',
				maxLength: 96,
			},
			group: 'Info',
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
			group: 'Info',
		},
		{
			name: 'start',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
			group: 'Info',
		},
		{
			name: 'end',
			type: 'datetime',
			group: 'Info',
		},
		{
			name: 'section',
			type: 'reference',
			to: [{type: 'section'},],
			validation: (Rule) => Rule.required(),
			group: 'Info',
		},
		{
			name: 'people',
			type: 'array',
			of: [
				{
					name: 'person',
					type: 'reference',
					to: [{ type: 'person' }],
				},
			],
			group: 'Info',
		},
		{
			name: 'location',
			type: 'reference',
			to: [{type: 'location'},],
			group: 'Info',
		},
		{
			name: 'ctaLabel',
			title: 'Label',
			type: 'string',
			group: 'Info',
			fieldset: 'Cta',
		},
		{
			name: 'ctaHref',
			title: 'Href',
			type: 'url',
			group: 'Info',
			fieldset: 'Cta',
		},
		{
			name: 'ctaBlank',
			title: 'Blank',
			type: 'boolean',
			initialValue: false,
			group: 'Info',
			fieldset: 'Cta',
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
			group: 'Info',
		},
		{
			name: 'layout',
			type: 'string',
			options: {
				list: [
					{ title: 'Main', value: 'main' },
					{ title: 'Secondary', value: 'secondary' },
				],
			},
			initialValue: 'main',
			group: 'Style',
		},
		{
			name: 'size',
			type: 'string',
			options: {
				list: [
					{ title: 'S', value: 's' },
					{ title: 'M', value: 'm' },
					{ title: 'L', value: 'l' },
				],
			},
			initialValue: 'm',
			group: 'Style',
		},
		{
			name: 'thumbnail',
			type: 'image',
			group: 'Style',
		},
		{
			name: 'cover',
			type: 'image',
			group: 'Style',
		},
		{
			name: 'accentColor',
			type: 'color',
			options: colorOptions,
			group: 'Style',
		},
		{
			name: 'typeColor',
			type: 'color',
			options: colorOptions,
			group: 'Style',
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