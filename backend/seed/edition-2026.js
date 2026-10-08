// Seeds the MFF2026 edition (Festival, Jury, Rules, Locations, Partners), its people and
// organizations, and the Editorial singleton, from the content hardcoded in the frontend.
// Program days and intro are not copied (migrated by hand from the `program` doc).
// Idempotent: fixed _ids, assets deduplicated by Sanity; never touches the edition's days or intro. Run from backend/:
//   npx sanity exec seed/edition-2026.js --with-user-token
import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {rules} from '../../frontend/src/lib/components/editions/2026/rules.js'
import {partners} from '../../frontend/src/lib/components/editions/2026/partners.js'

const client = getCliClient({apiVersion: '2026-04-27'})
const media = resolve(import.meta.dirname ?? __dirname, '../../frontend/src/lib/assets/media')

// --- HTML → Portable Text (only the tags used in the 2026 content) ---

let keyCount = 0
const key = () => `k${(keyCount++).toString(36)}`

const decode = (text) => text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')

/** inline HTML → {children, markDefs} */
function inline(html) {
	const children = []
	const markDefs = []
	const marks = []
	const re = /<(\/?)(a|em|strong|sup|br)\b([^>]*)>/g
	let last = 0
	let m
	const push = (text) => {
		if (text) children.push({_type: 'span', _key: key(), text: decode(text), marks: [...marks]})
	}
	while ((m = re.exec(html))) {
		push(html.slice(last, m.index))
		last = re.lastIndex
		const [, close, tag, attrs] = m
		if (tag === 'br') {
			push('\n')
		} else if (tag === 'sup') {
			// 1<sup>a</sup> → 1ª
			if (!close) {
				const end = html.indexOf('</sup>', last)
				push(html.slice(last, end) === 'a' ? 'ª' : html.slice(last, end))
				re.lastIndex = last = end + '</sup>'.length
			}
		} else if (close) {
			marks.pop()
		} else if (tag === 'a') {
			const href = attrs.match(/href=['"]([^'"]+)/)?.[1]
			const def = {_type: 'link', _key: key(), url: href, blank: /target=['"]_blank/.test(attrs)}
			markDefs.push(def)
			marks.push(def._key)
		} else {
			marks.push(tag)
		}
	}
	push(html.slice(last))
	// merge consecutive spans with the same marks (a '\n' span joins its neighbours)
	const merged = []
	for (const span of children) {
		const prev = merged.at(-1)
		if (prev && prev.marks.join() === span.marks.join()) prev.text += span.text
		else merged.push(span)
	}
	return {children: merged.length ? merged : [{_type: 'span', _key: key(), text: '', marks: []}], markDefs}
}

const block = (html, extra = {}) => ({_type: 'block', _key: key(), style: 'normal', ...inline(html.trim()), ...extra})

/** HTML string(s) → Portable Text blocks: <p>, <h3>, <ul><li>, and loose inline text */
function toBlocks(htmls) {
	const blocks = []
	for (const html of [htmls].flat()) {
		const re = /<(p|h3|ul)\b[^>]*>([\s\S]*?)<\/\1>/g
		let last = 0
		let m
		const loose = (text) => {
			text = text.replace(/^(<br>)+|(<br>)+$/g, '').trim()
			if (text) blocks.push(block(text))
		}
		while ((m = re.exec(html))) {
			loose(html.slice(last, m.index))
			last = re.lastIndex
			const [, tag, inner] = m
			if (tag === 'ul') {
				for (const [, li] of inner.matchAll(/<li>([\s\S]*?)<\/li>/g)) {
					blocks.push(block(li, {listItem: 'bullet', level: 1}))
				}
			} else {
				blocks.push(block(inner, {style: tag === 'h3' ? 'h3' : 'normal'}))
			}
		}
		loose(html.slice(last))
	}
	return blocks
}

const paragraphs = (texts) => texts.map((text) => block(text))

// --- assets ---

const dry = process.env.DRY === '1' // DRY=1: print the edition doc, write nothing
const uploaded = {}
async function image(path) {
	if (dry) return {_type: 'image', asset: {_type: 'reference', _ref: `dry:${path}`}}
	if (!uploaded[path]) {
		const asset = await client.assets.upload('image', createReadStream(`${media}${path}`), {filename: basename(path)})
		uploaded[path] = asset._id
	}
	return {_type: 'image', asset: {_type: 'reference', _ref: uploaded[path]}}
}

const ref = (_ref) => ({_type: 'reference', _ref})
const slugify = (text) =>
	text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// --- content (copied from editions/2026/Festival.svelte and Luoghi.svelte) ---

const jury = [
	{name: 'Elisa', surname: 'Dondi', country: 'Italia', portrait: '/jury/elisa-dondi.webp', bio: [
		'Elisa Dondi (Modena, 1987) vive e lavora a Roma. Nel 2015 si diploma al Centro Sperimentale di Cinematografia di Roma come sceneggiatrice con il cortometraggio La Santa che Dorme, selezionato in concorso al Festival di Cannes 2016, sezione Cinéfondation.',
		'Per il cinema firma la sceneggiatura del film Piccolo Corpo di L. Samani, in concorso alla Semaine de la Critique, Cannes 2021 e del film Un anno di scuola di L. Samani in concorso al Festival di Venezia 2025, sezione Orizzonti.',
		'Ha firmato diverse serie televisive tra le quali Lidia Poet di Matteo Rovere e Letizia Lamartire, ACAB di Michele Alhaique e Storia della mia famiglia di Claudio Cupellini.',
		'Da Marzo 2023 è membro della giuria dell’European Film Accademy.',
	]},
	{name: 'Marco', surname: 'Righi', country: 'Italia', portrait: '/jury/marco-righi.webp', bio: [
		'Marco Righi (Reggio Emilia, 1983) vive e lavora a Reggio Emilia. Ha studiato regia e montaggio e nel 2009 ha fondato 505, studio di comunicazione specializzato in post-produzione video.',
		"I giorni della vendemmia (2010), il suo film d'esordio, ha partecipato a oltre 40 festival internazionali, ottenendo il riconoscimento di interesse culturale del MiC e il riconoscimento d'essai dalla FICE. Nel 2022 ha scritto e diretto Il vento soffia dove vuole, acquisito dal sales agent TVCO al Marché du Film di Cannes 2023 e selezionato come unico titolo italiano in Concorso Ufficiale nella selezione principale del Karlovy Vary International Film Festival.",
	]},
	{name: 'Marino', surname: 'Neri', country: 'Italia', portrait: '/jury/marino-neri.webp', bio: [
		'Marino Neri (Carpi, 1979). Dopo le graphic novel Il re dei fiumi (Kappa edizioni, 2008) e La coda del lupo (Canicola, 2011), tradotti in Francia e Corea, nel 2012 vince il premio “Nuove Strade” di Napoli Comicon e del Centro Fumetto Andrea Pazienza come miglior talento emergente. Ha collaborato con vari quotidiani e riviste, da Il Sole 24 ore, a Internazionale da Le Monde a Linus e con le case editrici Il Saggiatore, La Nave di Teseo, Sellerio, Neri Pozza, Feltrinelli e Solfernino.',
		'Del 2016 Cosmo (Coconino Press Fandango) e del 2018 L’incanto del parcheggio multipiano (Oblomov).',
		'Nel 2019 pubblica Nuno salva la luna (Canicola) il suo primo fumetto per bambini, finalista al premio Andersen 2020 come migliore libro a fumetti. Nel 2022 pubblica La tempesta (Oblomov) edito anche in Francia per Casterman.',
	]},
]

// existing location docs (shared with events); title/address overrides keep the 2026 page wording
const locations = [
	{
		_id: 'bbccd6f9-2cd4-4131-ad82-105de7b1bf3f',
		title: 'Cortile del Leccio e Sala del Leccio',
		adressLabel: 'via Francesco Selmi 67, 41121 Modena',
		adressHref: 'https://maps.app.goo.gl/Ek6N28bWAR6xFGXF6',
		info: "Saremo presenti seguenti giorni e orari: <ul><li>– Martedì 14, mercoledì 15 e giovedì 16 aprile dalle 15 alle 20:30</li><li>– Venerdì 17 e sabato 18 aprile dalle 10 alle 20:30</li><li>– Domenica 19 aprile dalle 10 alle 18</li></ul><br>Qui troverai:<br>✳ Info point, biglietteria<br>✳ Mostra Elevation Tales di Manitou Italia<br>✳ Controllo dell'udito di Ti Ascolto<br>✳ SPOT point",
		position: {lat: 44.64301, lng: 10.92497},
	},
	{
		_id: '02263b30-1692-47c8-b677-9cbbb144701c',
		title: 'Cinema Astra',
		adressLabel: 'via Francesco Rismondo 21, 41121 Modena',
		adressHref: 'https://maps.app.goo.gl/MZffUFhNX3Lc68oF6',
		info: '✳ Sala Rubino — 145 posti<br>✳ Sala Smeraldo — 173 posti<br>✳ Sala Turchese — 484 posti<br><br>Acquisto in loco e riscatto biglietti (per titolari di abbonamento) a partire da 60 minuti prima della proiezione, con servizio bar offerto da Juta.',
		position: {lat: 44.64751, lng: 10.92581},
	},
	{
		_id: '51063cc7-198c-4fbf-b334-d126e2beecc8',
		title: 'Sala Truffaut — 128 posti',
		adressLabel: 'via degli Adelardi 4, 41121 Modena',
		adressHref: 'https://maps.app.goo.gl/aY9Hc8X2cK2BQLyM9',
		info: 'Acquisto in loco e riscatto biglietti (per titolari di abbonamento) a partire da 60 minuti prima della proiezione.',
		position: {lat: 44.64561, lng: 10.92163},
	},
	{
		_id: '80e7f8a6-9ce7-43ab-8ecc-ad0866251b08',
		title: 'Acetaia Giusti',
		adressLabel: 'Strada delle Quattro Ville 52, 41123 Modena',
		adressHref: 'https://maps.app.goo.gl/uLDi2ErcU1NTXQ3B8',
		position: {lat: 44.69044, lng: 10.90069},
	},
]

// --- run ---

const tx = client.transaction()

const juryIds = []
for (const person of jury) {
	const _id = `person-${slugify(`${person.name}-${person.surname}`)}`
	juryIds.push(_id)
	tx.createOrReplace({
		_id,
		_type: 'person',
		name: person.name,
		surname: person.surname,
		slug: {_type: 'slug', current: slugify(`${person.name}-${person.surname}`)},
		country: {_type: 'reference', _ref: `country-${slugify(person.country)}`},
		portrait: await image(person.portrait),
		bio: paragraphs(person.bio),
	})
}

const partnerGroups = []
for (const group of partners) {
	const members = []
	for (const partner of group.partners) {
		const _id = `organization-${slugify(partner.title)}`
		tx.createOrReplace({
			_id,
			_type: 'organization',
			title: partner.title,
			...(partner.href && {href: partner.href}),
			...(partner.logo && {logo: await image(partner.logo)}),
		})
		members.push({_type: 'partner', _key: key(), organization: ref(_id), ...(partner.role && {role: partner.role})})
	}
	partnerGroups.push({
		_type: 'partnerGroup',
		_key: key(),
		title: group.title,
		menuTitle: group.menuTitle,
		slug: {_type: 'slug', current: group.slug},
		partners: members,
	})
}

// add the map data to the shared location docs without touching what events show
for (const location of locations) {
	tx.patch(location._id, (p) => p.setIfMissing({position: {_type: 'geopoint', ...location.position}, adressHref: location.adressHref}))
}

// juries are documents, referenced by the Jury tab and by Awards
const juryDocs = [
	{
		_id: 'jury-2026-premio-del-pubblico',
		title: 'Premio del Pubblico',
		description: 'Ogni film verrà votato dagli spettatori con una valutazione da 1 a 10; i voti verranno raccolti al termine di ogni proiezione.',
	},
	{
		_id: 'jury-2026-premio-degli-studenti-universitari',
		title: 'Premio degli Studenti Universitari',
		description: 'La giuria è composta da Cesare Barbagallo, Giulia Cremonesi e Matilde Rizzello, del corso di Laurea in Lingue e Culture Europee di Unimore.',
	},
	{
		_id: 'jury-2026-premio-della-giuria',
		title: 'Premio della Giuria',
		description: 'La giuria è composta da Elisa Dondi, Marino Neri e Marco Righi.',
	},
]
for (const jury of juryDocs) {
	tx.createIfNotExists({_type: 'jury', ...jury})
	tx.patch(jury._id, (p) => p.setIfMissing({edition: {_type: 'reference', _ref: 'edition-mff2026'}}))
}

// create-if-missing + set: only the seeded fields are overwritten (days and intro are migrated by hand)
tx.createIfNotExists({_id: 'edition-mff2026', _type: 'edition'})
tx.patch('edition-mff2026', (p) => p.set({
	year: 2026,
	title: 'MFF2026',
	slug: {_type: 'slug', current: '2026'},
	status: 'public',
	festivalStatus: 'public',
	programStatus: 'public',
	rulesStatus: 'public',
	locationsStatus: 'public',
	partnersStatus: 'public',
	festivalEvent: paragraphs([
		'Il Modena Film Festival è il nuovo spazio in cui Modena vive il cinema con tutti i sensi.',
		'Cinque giorni di film, incontri, performance, suoni, luci, profumi, conversazioni e luoghi che si trasformano: un’esperienza pensata per chi ama il cinema d’autore, per chi cerca nuove visioni e per chi vuole semplicemente lasciarsi sorprendere.',
		'Tra sale, musei e spazi della città, il festival diventa un punto di incontro aperto e accessibile a tutti, con particolare attenzione a chi vive il cinema attraverso altri sensi e ha esigenze sensoriali specifiche. Un invito a guardare meglio. E a sentire di più.',
	]),
	rulesTeaser: paragraphs([
		'Il regolamento completo del Modena Film Festival, con tutte le modalità di partecipazione alle sezioni, i requisiti tecnici e i criteri di selezione.',
	]),
	juriesIntro: 'Sono tre i premi che verranno assegnati.',
	juries: juryDocs.map(({_id}, i) => ({_type: 'reference', _ref: _id, _key: `j${i}`})),
	jurors: juryIds.map((_id) => ({_type: 'juror', _key: key(), person: ref(_id)})),
	rules: rules.map((rule) => ({_type: 'rule', _key: key(), title: rule.title, body: toBlocks(rule.content)})),
	locations: locations.map((location) => ({
		_type: 'editionLocation',
		_key: key(),
		location: ref(location._id),
		title: location.title,
		adressLabel: location.adressLabel,
		...(location.info && {info: toBlocks(location.info)}),
	})),
	partnerGroups,
}))

// Editorial: today's home (first public landing, news ticked as widget) and every page on MFF2026.
// setIfMissing: never overrides choices already made in the studio.
const landing = await client.fetch(`*[_type == "landing" && status == "public" && !(_id in path('drafts.**'))][0]._id`)
const widgetNews = await client.fetch(`*[_type == "news" && status == 'public' && widget == true && !(_id in path('drafts.**'))] | order(date desc)._id`)
tx.createIfNotExists({_id: 'editorial', _type: 'editorial'})
tx.patch('editorial', (p) =>
	p.setIfMissing({
		landing: ref(landing),
		competition: ref('edition-mff2026'),
		newsWidget: widgetNews.map((_id) => ({...ref(_id), _key: key()})),
		festival: ref('edition-mff2026'),
		program: ref('edition-mff2026'),
		rules: ref('edition-mff2026'),
		locations: ref('edition-mff2026'),
		partners: ref('edition-mff2026'),
	}),
)
// the Editorial replaced the earlier `current` singleton
tx.delete('current')

if (dry) {
	console.log(JSON.stringify(tx.toJSON(), null, 1))
	process.exit(0)
}
const result = await tx.commit()
console.log(`Seeded ${result.results.length} mutations`)
