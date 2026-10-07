// Seeds the prefooters that were hardcoded in the frontend (home: Sponsor; program pages: Abbonamenti).
// Where they show is set per site in the Editorial (Prefooters tab).
// Idempotent (fixed _ids, create-if-missing + set). Run from backend/:
//   npx sanity exec seed/prefooters.js --with-user-token
import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-04-27'})
const media = resolve(import.meta.dirname ?? __dirname, '../../frontend/src/lib/assets/media')

async function upload(type, path) {
	const asset = await client.assets.upload(type, createReadStream(`${media}${path}`), {filename: basename(path)})
	return {_type: type, asset: {_type: 'reference', _ref: asset._id}}
}

/** "text <br>more <em>x</em>" → one Portable Text paragraph (line breaks kept, <em> as italic) */
function paragraph(html, key) {
	const children = []
	let i = 0
	for (const part of html.split(/(<em>.*?<\/em>)/)) {
		if (!part) continue
		const em = part.match(/^<em>(.*)<\/em>$/)
		const text = (em ? em[1] : part).replace(/\s*<br>\s*/g, '\n')
		children.push({_type: 'span', _key: `${key}s${i++}`, text, marks: em ? ['em'] : []})
	}
	return [{_type: 'block', _key: key, style: 'normal', markDefs: [], children}]
}

const prefooters = [
	{
		_id: 'prefooter-sponsor',
		name: 'Sponsor',
		subtitle: 'Diventa sponsor',
		title: 'Sponsorizza\nil Modena Film Festival 2027',
		content: paragraph(
			"Unisciti alla visione del Modena Film Festival. <br>Sostenere il Festival significa legare il proprio brand alla cultura, all'innovazione e al territorio, garantendo visibilità esclusiva e accesso a un network unico di professionisti e appassionati.",
			'c',
		),
		cta: {label: 'Diventa sponsor', href: '/partner/diventa-sponsor', blank: false, locked: false},
		color: 'red',
		mediaType: 'image',
		image: await upload('image', '/img/_1hs1706.webp'),
	},
	{
		_id: 'prefooter-abbonamenti',
		name: 'Abbonamenti',
		subtitle: 'Abbonamenti disponibili',
		title: 'Abbonati al Festival',
		content: paragraph(
			"L'abbonamento MFF2026 consente l'accesso a tutte le proiezioni e gli eventi del Festival. Non include l'evento di pre-apertura, il <em>Cineconcerto Sherlock Jr.</em>* musicato da Samuel, l'evento speciale olfatto.",
			'c',
		),
		cta: {label: 'Vai a: Biglietti', href: '/biglietti', blank: false, locked: false},
		annotation: paragraph('* Gli abbonati hanno diritto a uno sconto di 5€ su questo evento.', 'a'),
		color: 'yellow',
		mediaType: 'video',
		video: await upload('file', '/tickets/abbonamento-verticale-min.mp4'),
		poster: await upload('image', '/tickets/abbonamento-verticale-min.webp'),
	},
]

const tx = client.transaction()
for (const {_id, ...fields} of prefooters) {
	tx.createIfNotExists({_id, _type: 'prefooter'})
	tx.patch(_id, (p) => p.set(fields))
}
const result = await tx.commit()
console.log(`Seeded ${result.results.length} mutations`)
