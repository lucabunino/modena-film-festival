// NEW — not extracted from a sibling project. Written to unify every
// link-shaped field across this stack (nav items, footer items, socials,
// collaborations, the wysiwyg link annotation) under one name and one
// validation rule, per the CLAUDE.md rule "always call it href, always use
// label for the visible string."
//
// WHY a single `href` string instead of a Sanity reference to a page
// document: a reference forces every link target to be an internal page,
// which breaks for external URLs, mailto:/tel:, or hardcoded routes that
// aren't page documents at all (e.g. `/work`, `/shop`). A plain string
// handles all of those uniformly — the cost is that renaming a page's slug
// doesn't auto-update links pointing at it, which is an accepted trade-off
// for this stack's project sizes (small enough that a stale link is easy to
// spot and fix by hand).
//
// `openInNewTab` is an editor-controlled boolean, not auto-derived from the
// href scheme (e.g. "external → new tab") — some internal links legitimately
// want a new tab (e.g. a PDF route) and some external links don't.
//
// REQUIRED: the href regex accepts `https://`, `http://`, `mailto:`, `tel:`,
// OR a leading `/` (internal relative path). Anything else fails validation —
// this is what stops an editor pasting a bare "example.com" that silently
// 404s, or a page slug typed without the leading slash.
//
// linkFields (bare array, no `label`) is exported separately for embedding
// inside the wysiwyg rich-text link annotation, where the visible text is
// already supplied by the selected span — see wysiwyg.js.
//
// Usage in a document schema:
//   import {link} from './fields/link.js'
//   fields: [ {...link('navLinks'), type: 'array', of: [link('navLink')]} ]

export const HREF_PATTERN = /^(https?:\/\/|mailto:|tel:|\/)/

export function validateHref(Rule) {
	return Rule.custom((href) => {
		if (!href) return true
		return HREF_PATTERN.test(href) ? true : 'Must be a URL, mailto:, tel:, or an internal path starting with /'
	})
}

export const linkFields = [
	{
		name: 'href',
		type: 'string',
		description: 'External URL, mailto:, tel:, or an internal path (e.g. /work/foo)',
		validation: validateHref,
	},
	{
		name: 'openInNewTab',
		title: 'Open in new tab',
		type: 'boolean',
		initialValue: false,
	},
]

/**
 * @param {string} name
 * @param {{requireLabel?: boolean}} [opts]
 */
export function link(name, {requireLabel = false} = {}) {
	return {
		name,
		type: 'object',
		fields: [
			{
				name: 'label',
				type: 'string',
				validation: requireLabel ? (Rule) => Rule.required() : undefined,
			},
			...linkFields,
		],
		preview: {
			select: {title: 'label', href: 'href'},
			prepare({title, href}) {
				return {title: title || href || 'Untitled link', subtitle: title ? href : undefined}
			},
		},
	}
}
