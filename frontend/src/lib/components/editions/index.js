// Per-edition page content that isn't in Sanity (hardcoded markup).
// Add an entry per new edition so older archives keep their own content.
import Festival2026 from './2026/Festival.svelte'
import Luoghi2026 from './2026/Luoghi.svelte'
import { partners as partners2026 } from './2026/partners.js'
import { rules as rules2026 } from './2026/rules.js'

export const editionPages = {
	2026: { festival: Festival2026, luoghi: Luoghi2026, partner: partners2026, regolamento: rules2026 },
}
