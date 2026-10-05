import { innerWidth } from 'svelte/reactivity/window'
import bp from '$lib/scss/breakpoints.module.scss'

// `<=` (not `<`) so JS flips on the same pixel as `@media (width <= #{$bp})` in the SCSS
export function getResponsive() {
	const width = $derived(innerWidth.current ?? 0)

	const underXxs = $derived(width <= parseInt(bp.xxs))
	const underXs = $derived(width <= parseInt(bp.xs))
	const underSm = $derived(width <= parseInt(bp.sm))
	const underMd = $derived(width <= parseInt(bp.md))
	const underLg = $derived(width <= parseInt(bp.lg))
	const underXl = $derived(width <= parseInt(bp.xl))
	const underXxl = $derived(width <= parseInt(bp.xxl))
	const underXxxl = $derived(width <= parseInt(bp.xxxl))

	return {
		get underXxs() { return underXxs },
		get overXxs() { return !underXxs },
		get underXs() { return underXs },
		get overXs() { return !underXs },
		get underSm() { return underSm },
		get overSm() { return !underSm },
		get underMd() { return underMd },
		get overMd() { return !underMd },
		get underLg() { return underLg },
		get overLg() { return !underLg },
		get underXl() { return underXl },
		get overXl() { return !underXl },
		get underXxl() { return underXxl },
		get overXxl() { return !underXxl },
		get underXxxl() { return underXxxl },
		get overXxxl() { return !underXxxl }
	}
}
