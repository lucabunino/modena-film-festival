/**
 * Attachment: runs `onEnter` / `onExit` as the element crosses the viewport.
 * Usage: <div {@attach viewport(() => visible = true)}>
 * @param {() => void} [onEnter]
 * @param {() => void} [onExit]
 */
export function viewport(onEnter, onExit) {
	return (/** @type {Element} */ node) => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) onEnter?.()
			else onExit?.()
		})
		observer.observe(node)
		return () => observer.disconnect()
	}
}
