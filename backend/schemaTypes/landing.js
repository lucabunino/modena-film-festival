import colorOptions from './fields/colorOptions.js'
import { HeartIcon } from '@sanity/icons'

// Regex per permettere URL assoluti (http/https), mailto, tel e URL relativi (/, #)
const relativeOrAbsoluteRegex = /^(https?:\/\/|mailto:|tel:|\/|#)/;

export default {
    name: 'landing',
    type: 'document',
    icon: HeartIcon,
    groups: [
        {name: 'Landing'},
        {name: 'Style'},
    ],
    fieldsets: [
        {name: 'Cta', options: {collapsible: true, collapsed: false}},
    ],
    fields: [
        {
            name: 'runningHead',
            type: 'string',
            group: 'Landing',
        },
        {
            name: 'title',
            type: 'string',
            group: 'Landing',
        },
        {
            name: 'subtitle',
            type: 'string',
            group: 'Landing',
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
            group: 'Landing',
        },
        {
            name: 'abstract',
            type: 'text',
            rows: 3,
            group: 'Landing',
        },
        {
            name: 'ctaLabel',
            title: 'Label',
            type: 'string',
            group: 'Landing',
            fieldset: 'Cta',
        },
        {
            name: 'ctaHref',
            title: 'Href',
            type: 'string',
            group: 'Landing',
            fieldset: 'Cta',
            validation: Rule => Rule.custom(href => {
                if (!href) return true;
                return relativeOrAbsoluteRegex.test(href)
                    ? true
                    : 'Inserisci un URL valido (http://...), un percorso relativo (/...) o mailto:';
            }),
        },
        {
            name: 'ctaBlank',
            title: 'Blank',
            type: 'boolean',
            initialValue: false,
            group: 'Landing',
            fieldset: 'Cta',
        },
        {
            name: 'layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Layout 1', value: '1' },
                    { title: 'Layout 2', value: '2' },
                ],
            },
            initialValue: '1',
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