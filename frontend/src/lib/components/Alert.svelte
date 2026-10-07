<!-- Fixed top-right alert, stacked under the Navigator (or the cookie banner) like the Navigator stacks under the banner;
     on mobile below the header. Slides in like the cookie banner, minifies to an icon on first scroll, then expands only on hover -->
<script>
	import { getBanner } from '$lib/stores/banner.svelte'
	import { getNavigator } from '$lib/stores/navigator.svelte.js'

	// title: first line (always shown when expanded); message: the text below it
	let { title, message } = $props()
	const banner = getBanner()
	const navigatorPanel = getNavigator()
	// room taken by the Navigator panel above (its height + gap), 0 without one
	const navigatorStack = $derived(navigatorPanel.height ? `calc(${navigatorPanel.height}px + var(--sp-4))` : '0px')

	// slides in from the right like the cookie banner
	let visible = $state(false)
	$effect(() => {
		const t = setTimeout(() => (visible = true), 0)
		return () => clearTimeout(t)
	})

	// shrinks to a square icon the first time the page is scrolled and stays so (also across an edition's pages,
	// the alert stays mounted): from then on only hover opens it, and leaving closes it again (desktop and mobile)
	let minified = $state(false)
	// tapped open (toggled by tap/click while minified); on hover devices hovering opens it too
	let open = $state(false)

	function toggle() {
		if (minified) open = !open
	}

</script>

<svelte:window onscroll={() => { if (window.scrollY > 50) minified = true }} />

<div
	class="alert wb-14 rounded-m bg-black white {visible ? 'visible' : ''} {minified ? 'minified' : ''} {open ? 'open' : ''} {banner.show ? 'banner' : ''}"
	style:--navigatorStack={navigatorStack}
	role="button"
	tabindex="0"
	aria-label={title}
	aria-expanded={!minified || open}
	onclick={toggle}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle())}
>
	<div class="text">
		<p class="uppercase">{title}</p>
		<div class="more">
			<p>{message}</p>
		</div>
	</div>
	<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M10.3 3.9 1.8 18.5a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
		<line x1="12" y1="9.5" x2="12" y2="13.5" />
		<line x1="12" y1="17.2" x2="12" y2="17.2" />
	</svg>
</div>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	// sequenced: collapse = text out → height → width → icon in; expand = icon out → width → height → text in
	$d: 300ms;
	$ease: cubic-bezier(.77, 0, .175, 1);

	// the minified (icon) state
	@mixin collapsed {
		width: var(--square);
		transition:
			transform var(--transition-m),
			top $d $ease,
			width $d $ease $d,
			opacity $d;

		.text {
			grid-template-rows: auto 0fr;
			opacity: 0;
			transition:
				opacity 150ms,
				grid-template-rows $d $ease;
		}
		.icon {
			opacity: 1;
			transition: opacity 150ms $d * 2;
		}
	}

	// fixed top right, under the Navigator when the page has one (--navigatorStack: its height + gap, from stores/navigator), else at the
	// top margin or under the cookie banner; mounted once in the root layout, so it persists across an edition's pages
	.alert {
		--square: calc(1rem * 1.2 + var(--gutter) * 2); // one wb-14 line + padding
		position: fixed;
		z-index: 5; // above the footer (4), like the cookie banner
		right: var(--gutter);
		top: calc(var(--margin) + var(--navigatorStack, 0px));

		&.banner {
			top: calc(var(--margin) + 200px + var(--sp-4) + var(--navigatorStack, 0px));
		}
		width: clamp(300px, 25vw, 400px); // same as the cookie banner
		padding: var(--sp-12) var(--gutter);
		overflow: hidden;
		cursor: pointer;
		opacity: 0;
		transform: translateX(150%);
		// expanding; top glides when the Navigator above appears, goes or changes height
		transition:
			transform var(--transition-m),
			top $d $ease,
			width $d $ease,
			opacity $d;

		&.visible {
			opacity: 1;
			transform: translateX(0);
		}

		.text {
			display: grid;
			grid-template-rows: auto 1fr;
			white-space: nowrap; // first line stays one line, so the minified box stays square
			transition:
				grid-template-rows $d $ease $d,
				opacity $d $d * 2;

			.more {
				overflow: hidden;
				min-height: 0;
				white-space: normal;

				p {
					padding-top: var(--sp-6);
				}
			}
		}
		.icon {
			position: absolute;
			inset: 0;
			margin: auto;
			width: 1.5rem;
			height: 1.5rem;
			opacity: 0;
			transition: opacity 150ms;
		}

		// collapsing: minified and not open (tap); on hover devices hovering also keeps it open
		@media (hover: hover) {
			&.minified:not(.open):not(:hover) {
				@include collapsed;
			}
		}
		@media (hover: none) {
			&.minified:not(.open) {
				@include collapsed;
			}
		}

		@media (width <= #{$lg}) {
			width: min(clamp(300px, 25vw, 400px), calc(100% - var(--gutter) * 2));
			// mobile: top right corner below the header, its first line level with the breadcrumbs
			// (they sit main's --sp-32 below the header; the alert's own top padding is --sp-12)
			top: calc(var(--menuHeight) + var(--sp-32) - var(--sp-12));

			&.banner {
				top: calc(var(--menuHeight) + var(--sp-32) - var(--sp-12));
			}
		}
	}
</style>
