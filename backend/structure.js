import {HeartIcon} from '@sanity/icons/Heart'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {SparkleIcon} from '@sanity/icons/Sparkle'
import {MarkerIcon} from '@sanity/icons/Marker'
import {UserIcon} from '@sanity/icons/User'
import {EmptyIcon} from '@sanity/icons/Empty'
import {AsteriskIcon} from '@sanity/icons/Asterisk'
import {CaseIcon} from '@sanity/icons/Case'
import {MenuIcon} from '@sanity/icons/Menu'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'

/** Plural list item for a document type, with an optional default sort */
function list(S, type, title, icon, ordering) {
	let documents = S.documentTypeList(type).title(title)
	if (ordering) documents = documents.defaultOrdering(ordering)
	return S.listItem().id(type).title(title).icon(icon).schemaType(type).child(documents)
}

const listed = ['landing', 'news', 'program', 'event', 'location', 'person', 'format', 'sense', 'section', 'menu', 'seo']

export const myStructure = (S) =>
	S.list()
		.title('Content')
		.items([
			// Site
			list(S, 'landing', 'Landings', HeartIcon),
			list(S, 'news', 'News', EnvelopeIcon, [{field: 'date', direction: 'desc'}]),
			S.divider(),

			// Festival
			list(S, 'program', 'Programs', CalendarIcon, [{field: 'edition', direction: 'desc'}]),
			list(S, 'event', 'Events', SparkleIcon, [{field: 'start', direction: 'desc'}]),
			list(S, 'location', 'Locations', MarkerIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'person', 'People', UserIcon, [{field: 'surname', direction: 'asc'}]),
			S.divider(),

			// Taxonomies
			list(S, 'format', 'Formats', EmptyIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'sense', 'Senses', AsteriskIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'section', 'Sections', CaseIcon, [{field: 'title', direction: 'asc'}]),
			S.divider(),

			// Settings
			list(S, 'menu', 'Menus', MenuIcon),
			list(S, 'seo', 'SEO', EarthGlobeIcon),

			// any type added later but not listed above still shows up here
			...S.documentTypeListItems().filter((item) => !listed.includes(item.getId())),
		])
