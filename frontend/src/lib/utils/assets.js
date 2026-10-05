// Site media live in src/lib/assets/media (bundled and hashed by Vite) instead of /static.
// Data keeps short paths like '/partners/coop.png'; asset() turns them into the built URL.
const files = import.meta.glob('../assets/media/**/*', { eager: true, query: '?url', import: 'default' })

/** '/partners/coop.png' → built URL; anything else (external URLs, unknown paths) is returned unchanged */
export function asset(path) {
	if (!path || typeof path !== 'string' || !path.startsWith('/')) return path
	return files[`../assets/media${path}`] ?? path
}
