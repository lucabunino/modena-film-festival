/**
 * The prefooter shown on `pathname`: the first whose paths list it.
 * A path matches exactly ("/programma"), or with a trailing "/*" also all its subpages ("/news/*").
 */
export function prefooterFor(prefooters, pathname) {
	const path = pathname.replace(/\/+$/, '') || '/'
	return prefooters?.find((prefooter) =>
		prefooter.paths?.some((p) => {
			if (p.endsWith('/*')) {
				const base = p.slice(0, -2).replace(/\/+$/, '')
				return path === (base || '/') || path.startsWith(`${base}/`)
			}
			return path === (p.replace(/\/+$/, '') || '/')
		})
	)
}
