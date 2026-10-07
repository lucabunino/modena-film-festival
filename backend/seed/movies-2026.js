// Creates `movie` docs from the MFF2026 events that screen a film,
// links them (event.movie), and fills edition-mff2026's Competition and Special events.
// Film data comes from each event's `credits` ("di X, Paese, 2025, 97’\nV.O. …"); the classics shown at
// special events have no credits, so their data is filled in here (check it).
// Idempotent: fixed _ids, create-if-missing + set. Run from backend/:
//   npx sanity exec seed/movies-2026.js --with-user-token   (DRY=1 to print only)
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-04-27'})
const dry = process.env.DRY === '1'

// event slug → film; `title` overrides the event's homepage title / title
const films = {
	'urchin-di-harris-dickinson': {},
	'le-lac': {},
	'lo-spirito-delle-stagioni': {},
	'love-letters': {},
	'yes': {},
	'simon-della-montagna': {},
	'resurrection-kuangye-shidai': {},
	'omaggio-a-frederick-wiseman': {title: 'Menus-Plaisirs – Les Troisgros'},
	'oltre-il-confine-le-immagini-di-mimmo-e-francesco-jodice': {},
	// special events: no credits on the event
	'il-cieco-che-non-voleva-vedere-titanic': {title: 'Il cieco che non voleva vedere Titanic', director: 'Teemu Nikki', country: 'Finlandia', year: 2021, duration: 82},
	'cineconcerto-sherlock-jr': {title: 'Sherlock Jr.', director: 'Buster Keaton', country: 'USA', year: 1924, duration: 45, version: 'silent'},
	'thelma-e-louise': {title: 'Thelma & Louise', director: 'Ridley Scott', country: 'USA', year: 1991, duration: 130},
	'la-citta-incantata': {title: 'La città incantata', director: 'Hayao Miyazaki', country: 'Giappone', year: 2001, duration: 125},
	'odorama-the-truman-show': {title: 'The Truman Show', director: 'Peter Weir', country: 'USA', year: 1998, duration: 103},
}
// the home's five senses cards, in order (Vista, Udito, Tatto, Gusto, Olfatto)
const specialEvents = ['il-cieco-che-non-voleva-vedere-titanic', 'cineconcerto-sherlock-jr', 'thelma-e-louise', 'la-citta-incantata', 'odorama-the-truman-show']

/** "di Bi Gan, Cina, Francia, 2025, 156’,\nV.O. cinese …" → {director, country, year, duration, language} */
function parseCredits(credits) {
	const [first = '', second = ''] = (credits ?? '').split('\n')
	const m = first.match(/^di (.+?), (.+), (\d{4}), (\d+)’/)
	if (!m) return {}
	return {
		director: m[1],
		country: m[2],
		year: Number(m[3]),
		duration: Number(m[4]),
		...(second.startsWith('V.O.') && {language: second.replace(/[,\s]+$/, '').trim()}),
	}
}

const events = await client.fetch(
	`*[_type == "event" && slug.current in $slugs && !(_id in path('drafts.**'))] | order(start asc) {
		_id, title, homepageTitle, credits, start, "slug": slug.current,
		"inCompetition": "in-concorso" in formats[]->slug.current,
		thumbnail,
		"poster": homepageThumbnail,
		"posterDimensions": homepageThumbnail.asset->metadata.dimensions
	}`,
	{slugs: Object.keys(films)},
)

const image = (source) => ({_type: 'image', asset: source.asset, ...(source.hotspot && {hotspot: source.hotspot, crop: source.crop})})
const ref = (_ref, _key) => ({_type: 'reference', _ref, ...(_key && {_key})})
const slugify = (text) =>
	text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const tx = client.transaction()
// movie languages are `language` docs ("francese"); "V.O. francese sottotitolata in italiano" → languages + subtitles
const languageIds = new Set()
function language(title) {
	const _id = `language-${slugify(title)}`
	if (!languageIds.has(_id)) {
		languageIds.add(_id)
		tx.createIfNotExists({_id, _type: 'language', title})
	}
	return ref(_id)
}
function languageFields(text) {
	const match = text.match(/^V\.O\. (.+?)(?: sottotitolata in (.+))?$/)
	if (!match) return {}
	return {
		version: 'original',
		languages: [{...language(match[1]), _key: 'l0'}],
		...(match[2] && {subtitles: language(match[2])}),
	}
}

// movie countries are `country` docs: "USA e Francia" / "Francia, Cipro" → one reference each
const countryIds = new Set()
function countries(text) {
	return text.split(/, | e /).map((title) => title.trim()).filter(Boolean).map((title) => {
		const _id = `country-${slugify(title)}`
		if (!countryIds.has(_id)) {
			countryIds.add(_id)
			tx.createIfNotExists({_id, _type: 'country', title})
		}
		return {...ref(_id), _key: _id}
	})
}
const competition = []
const movieOf = {}

for (const event of events) {
	const override = films[event.slug]
	const _id = `movie-${event.slug}`
	movieOf[event.slug] = _id
	const {language: languageTitle, country: countryText, ...credits} = {...parseCredits(event.credits), ...override}
	const movie = {
		title: override.title ?? event.homepageTitle ?? event.title,
		slug: {_type: 'slug', current: slugify(override.title ?? event.homepageTitle ?? event.title)},
		...credits,
		...(languageTitle && languageFields(languageTitle)),
		...(countryText && {countries: countries(countryText)}),
		...(event.thumbnail?.asset && {thumbnail: image(event.thumbnail)}),
		// the old vertical homepage thumbnail becomes the poster
		...(event.poster?.asset && event.posterDimensions?.height > event.posterDimensions?.width && {poster: image(event.poster)}),
	}
	tx.createIfNotExists({_id, _type: 'movie'})
	tx.patch(_id, (p) => p.set(movie).unset(['image', 'country', 'language']))
	tx.patch(event._id, (p) => p.set({movie: ref(_id)}).unset(['movies']))
	if (event.inCompetition) competition.push(ref(_id, `c${competition.length}`))
	if (dry) console.log(event.slug, '→', JSON.stringify({...movie, thumbnail: !!movie.thumbnail, poster: !!movie.poster}))
}

const bySlug = Object.fromEntries(events.map((e) => [e.slug, e._id]))
tx.patch('edition-mff2026', (p) =>
	p.set({
		competition,
		specialEvents: specialEvents.map((slug, i) => ref(bySlug[slug], `s${i}`)),
	}),
)

if (dry) {
	console.log('competition:', competition.map((c) => c._ref))
	process.exit(0)
}
const result = await tx.commit()
console.log(`Seeded ${result.results.length} mutations`)
