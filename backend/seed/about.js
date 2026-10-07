// Seeds the About singleton's Organigramma (team), with a `person` per member, from the content
// hardcoded in frontend/src/routes/about/+page.svelte. Idempotent (fixed _ids). Run from backend/:
//   npx sanity exec seed/about.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-04-27'})

const team = [
	{name: 'Gabriele', surname: 'Malagoli', role: 'Direttore artistico'},
	{name: 'Massimo', surname: 'Bondioli', role: 'Direttore organizzativo'},
	{name: 'Alice', surname: 'Morelli', role: 'Direttrice marketing e partnership'},
	{name: 'Martina', surname: 'Dell’Utri', role: 'Organizzatrice di Produzione e Print Traffic'},
	{name: 'Giulia', surname: 'Benedetti', role: 'Direttore creativo e designer grafico'},
	{name: 'Luca', surname: 'Bunino', role: 'Direttore creativo e designer grafico'},
	{name: 'Andrea', surname: 'Chimento', role: 'Ideatore'},
]

const slugify = (text) =>
	text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const tx = client.transaction()
const members = team.map((member, i) => {
	const slug = slugify(`${member.name}-${member.surname}`)
	const _id = `person-${slug}`
	tx.createIfNotExists({_id, _type: 'person'})
	tx.patch(_id, (p) => p.set({name: member.name, surname: member.surname, slug: {_type: 'slug', current: slug}}))
	return {_type: 'member', _key: `t${i}`, person: {_type: 'reference', _ref: _id}, role: member.role}
})
tx.createIfNotExists({_id: 'about', _type: 'about'})
tx.patch('about', (p) => p.setIfMissing({team: members}))

const result = await tx.commit()
console.log(`Seeded ${result.results.length} mutations`)
