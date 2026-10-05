<!-- Fixed bottom-right alert: slides in like the cookie banner, minifies to an icon on scroll, expands on hover -->
<script>
	// title: first line (always shown when expanded); message: the text below it
	let { title, message } = $props()

	// slides in from the right like the cookie banner
	let visible = $state(false)
	$effect(() => {
		const t = setTimeout(() => (visible = true), 0)
		return () => clearTimeout(t)
	})

	// shrinks to a square icon once the page is scrolled; hover expands it again
	let minified = $state(false)

</script>

<svelte:window onscroll={() => (minified = window.scrollY > 50)} />

<aside class="alert wb-14 rounded-m bg-black white {visible ? 'visible' : ''} {minified ? 'minified' : ''}" aria-label={title}>
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
</aside>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	// sequenced: collapse = text out → height → width → icon in; expand = icon out → width → height → text in
	$d: 300ms;
	$ease: cubic-bezier(.77, 0, .175, 1);

	// fixed bottom right; mounted once in the root layout, so it persists across an edition's pages
	.alert {
		--square: calc(1rem * 1.2 + var(--gutter) * 2); // one wb-14 line + padding
		position: fixed;
		z-index: 3; // below the footer (4), which scrolls over it
		right: var(--gutter);
		bottom: var(--margin);
		width: clamp(300px, 25vw, 400px); // same as the cookie banner
		padding: var(--sp-12) var(--gutter);
		overflow: hidden;
		opacity: 0;
		transform: translateX(150%);
		// expanding
		transition:
			transform var(--transition-m),
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

		// collapsing
		&.minified:not(:hover) {
			width: var(--square);
			transition:
				transform var(--transition-m),
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

		@media (width <= #{$lg}) {
			width: calc(100% - var(--gutter) * 2);
			// clear the Navigator's fixed bottom bar when the page has one (0 otherwise)
			bottom: calc(var(--margin) + var(--navigatorHeight, 0px));
		}
	}
</style>
