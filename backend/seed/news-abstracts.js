// Turns news `abstract` from plain text into rich text (one paragraph; line breaks kept).
// Run when stage reaches main (main's code renders abstract as a string). Idempotent. From backend/:
//   npx sanity exec seed/news-abstracts.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-04-27'})
const newses = await client.fetch(`*[_type == "news" && defined(abstract) && !(_id in path('drafts.**'))]{_id, abstract}`)
const tx = client.transaction()
let n = 0
for (const {_id, abstract} of newses) {
	if (typeof abstract !== 'string') continue
	n++
	tx.patch(_id, (p) =>
		p.set({
			abstract: [
				{
					_type: 'block',
					_key: 'a0',
					style: 'normal',
					markDefs: [],
					children: [{_type: 'span', _key: 'a0s', text: abstract, marks: []}],
				},
			],
		}),
	)
}
await tx.commit()
console.log(`${n} abstracts converted`)
