import {PresentationIcon} from '@sanity/icons/Presentation'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {SparklesIcon} from '@sanity/icons/Sparkles'
import {DocumentVideoIcon} from '@sanity/icons/DocumentVideo'
import {UsersIcon} from '@sanity/icons/Users'
import {InsertBelowIcon} from '@sanity/icons/InsertBelow'
import {SparkleIcon} from '@sanity/icons/Sparkle'
import {MarkerIcon} from '@sanity/icons/Marker'
import {UserIcon} from '@sanity/icons/User'
import {TagIcon} from '@sanity/icons/Tag'
import {AsteriskIcon} from '@sanity/icons/Asterisk'
import {CaseIcon} from '@sanity/icons/Case'
import {DashboardIcon} from '@sanity/icons/Dashboard'
import {MenuIcon} from '@sanity/icons/Menu'
import {TranslateIcon} from '@sanity/icons/Translate'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {SearchIcon} from '@sanity/icons/Search'

/** Plural list item for a document type, with an optional default sort */
function list(S, type, title, icon, ordering) {
	let documents = S.documentTypeList(type).title(title)
	if (ordering) documents = documents.defaultOrdering(ordering)
	return S.listItem().id(type).title(title).icon(icon).schemaType(type).child(documents)
}

const listed = ['editorial', 'about', 'edition', 'organization', 'movie', 'language', 'country', 'jury', 'prefooter', 'landing', 'news', 'event', 'location', 'person', 'format', 'sense', 'menu', 'seo']

export const myStructure = (S) =>
	S.list()
		.title('Content')
		.items([
			// Site
			list(S, 'editorial', 'Editorials', DashboardIcon),
			S.listItem()
				.id('about')
				.title('About')
				.icon(InfoOutlineIcon)
				.child(S.document().schemaType('about').documentId('about')),
			list(S, 'menu', 'Menus', MenuIcon),
			S.divider(),
			list(S, 'landing', 'Landings', PresentationIcon),
			list(S, 'prefooter', 'Prefooters', InsertBelowIcon),
			list(S, 'news', 'Newses', DocumentTextIcon, [{field: 'date', direction: 'desc'}]),
			S.divider(),

			// Festival
			list(S, 'edition', 'Editions', SparklesIcon, [{field: 'year', direction: 'desc'}]),
			list(S, 'event', 'Events', SparkleIcon, [{field: 'start', direction: 'desc'}]),
			list(S, 'movie', 'Movies', DocumentVideoIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'jury', 'Juries', UsersIcon, [{field: 'title', direction: 'asc'}]),
			S.divider(),

			// Taxonomies
			list(S, 'location', 'Locations', MarkerIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'person', 'People', UserIcon, [{field: 'surname', direction: 'asc'}]),
			list(S, 'format', 'Formats', TagIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'sense', 'Senses', AsteriskIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'organization', 'Organizations', CaseIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'language', 'Languages', TranslateIcon, [{field: 'title', direction: 'asc'}]),
			list(S, 'country', 'Countries', EarthGlobeIcon, [{field: 'title', direction: 'asc'}]),
			S.divider(),

			// Settings
			list(S, 'seo', 'SEO', SearchIcon),

			// Media tags/folders
			// ...S.documentTypeListItems().filter((item) => !listed.includes(item.getId())),
		])
