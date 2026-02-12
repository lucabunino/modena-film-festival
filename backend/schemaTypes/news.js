import seoFields from './fields/seoFields.js'
import colorOptions from './fields/colorOptions.js'
import { EnvelopeIcon } from '@sanity/icons'

export default {
	name: 'news',
	type: 'document',
	icon: EnvelopeIcon,
	groups: [
		{name: 'News'},
		{name: 'Widget'},
		{name: 'Style'},
		{name: 'Related'},
		{name: 'SEO'},
	],
	fieldsets: [
		{name: 'Cta'},
		{name: 'Widget'},
	],
	fields: [
		{
			name: 'title',
			type: 'string',
			group: 'News',
		},
		{
			name: 'subtitle',
			type: 'string',
			group: 'News',
		},
		{
			name: 'slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'title',
				maxLength: 96,
			},
			group: 'News',
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
			group: 'News',
		},
		{
			name: 'date',
			type: 'date',
			validation: (Rule) => Rule.required(),
			group: 'News',
		},
		{
			name: 'ctaLabel',
			title: 'Label',
			type: 'string',
			group: 'News',
			fieldset: 'Cta',
		},
		{
			name: 'ctaHref',
			title: 'Href',
			type: 'url',
			group: 'News',
			fieldset: 'Cta',
		},
		{
			name: 'ctaBlank',
			title: 'Blank',
			type: 'boolean',
			initialValue: false,
			group: 'News',
			fieldset: 'Cta',
		},
		{
			name: 'widget',
			type: 'boolean',
			group: 'Widget',
			fieldset: 'Widget',
			initialValue: false,
		},
		{
			name: 'widgetAbstract',
			title: 'Abstract',
			type: 'text',
			rows: 2,
			group: 'Widget',
			fieldset: 'Widget',
		},
		{
			name: 'widgetCtaLabel',
			title: 'Label',
			type: 'string',
			group: 'Widget',
			fieldset: 'Widget',
		},
		{
			name: 'widgetCtaHref',
			title: 'Href',
			type: 'url',
			group: 'Widget',
			fieldset: 'Widget',
		},
		{
			name: 'widgetCtaBlank',
			title: 'Blank',
			type: 'boolean',
			initialValue: false,
			group: 'Widget',
			fieldset: 'Widget',
		},
		{
			name: 'abstract',
			type: 'text',
			group: 'News',
			rows: 3,
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
			group: 'News',
		},
		{
			name: 'layout',
			type: 'string',
			options: {
				list: [
					{ title: 'Img tall', value: 'imgTall' },
					{ title: 'Img short', value: 'imgShort' },
					{ title: 'No img', value: 'noImg' },
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