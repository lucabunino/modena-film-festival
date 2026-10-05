/** Edition URLs: /mff2026, /mff2026/programma (any casing matches; the layout redirects to lowercase) */
export function match(param) {
	return /^mff\d{4}$/i.test(param)
}
