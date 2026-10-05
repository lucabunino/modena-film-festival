/** @param {() => boolean} condition */
export function useScrollLock(condition) {
	$effect(() => {
		if (!condition()) return
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
		document.body.style.setProperty('--scrollbarWidth', `${scrollbarWidth}px`)
		// lock html as well: with overflow-x: clip on html (reset.scss), html is the element that scrolls the page
		document.documentElement.classList.add('scroll-locked')
		document.body.classList.add('scroll-locked')
		return () => {
			document.documentElement.classList.remove('scroll-locked')
			document.body.classList.remove('scroll-locked')
		}
	})
}
