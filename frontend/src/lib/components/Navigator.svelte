<script>
    import { page } from "$app/state";
    let { title, sections, cta, bg } = $props()
	import { getBanner } from '$lib/stores/banner.svelte';
    import { onMount } from "svelte";
    import { getResponsive } from "$lib/stores/responsive.svelte.js";
    import { getNavigator } from "$lib/stores/navigator.svelte.js";
	let banner = getBanner()
	let visible = $state(false)
	let shaking = $state(false);
	function handleLockedclick(e) {e.preventDefault(); if (shaking) return; shaking = true; setTimeout(() => (shaking = false), 600); }
	let activeSection = $state(false)
	let panel = $state()
	const responsive = getResponsive()

	// mobile: the bar scrolls sideways so the current section's link is the first on the left
	$effect(() => {
		if (!responsive.underLg || activeSection === false || !panel) return
		const link = panel.querySelectorAll('li a')[activeSection]
		if (link) panel.scrollTo({ left: link.offsetLeft, behavior: 'smooth' })
	})

	// the Alert stacks below the panel on desktop: register its height (see stores/navigator)
	const navigatorPanel = getNavigator()
	$effect(() => {
		const disconnect = observeSections();
		visible = true;
		return disconnect
	})
	function observeSections() {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter(e => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0) {
					const index = sections.indexOf(visible[0].target);
					if (index !== -1) activeSection = index;
				}
			},
			{
				root: null,
				threshold: 0,
				rootMargin: "-20% 0px -80% 0px"
			}
		);

		sections.filter(Boolean).forEach(el => observer.observe(el));
		return () => observer.disconnect()
	}
	function scrollIntoView(e, i) {
		e.preventDefault()
		sections[i].scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
</script>

{#if sections}
	<nav>
		<div class="rounded-m wb-21 wb-10-mb {bg ? bg : 'bg-linen'} {visible ? 'visible' : ''} {banner.show ? 'banner' : ''}" bind:this={panel} {@attach navigatorPanel.track}>
			{#if title}
				<button class="title wb-12 uppercase desktop-only" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{title}</button>
			{/if}
			<ol>
				{#each sections as section, i (section ?? i)}
					<li>
						<a aria-current={activeSection == i ? 'section' : undefined} href="#{section.id}" onclick={(e) => {scrollIntoView(e, i)}}>{section.title}</a>
					</li>
				{/each}
				{#if cta}
					<li>
						<a class="cta wb-10-mb btn-m {cta.bg ? cta.bg : undefined} {cta.locked ? 'locked' : undefined} {shaking ? 'shaking' : undefined}" href={cta.href} target={cta.blank ? '_blank' : ''} rel={cta.blank ? 'noopener noreferrer' : ''}
						onclick={(e) => {cta.locked ? handleLockedclick(e) : ''}}
						>{cta.label}</a>
					</li>
				{/if}
			</ol>
		</div>
	</nav>
{/if}

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	nav {
		position: absolute;
		right: calc(var(--gutter) - var(--margin)); // pull out of main's --margin padding: panel sits --gutter from the edge
		grid-column: 7 / span 2;
		height: 100%;
		width: stretch;
		z-index: 4;
		pointer-events: none;

		div {
			padding: var(--margin);
			position: sticky;
			top: var(--margin);
			// no top margin: the panel starts where it sticks (main's padding = --margin), so it never moves
			// and the Alert can stack below it in plain CSS
			margin: 0 0 var(--margin);
			pointer-events: all;
			transform: translateX(150%);
			transition: var(--transition-m);
			transition-property: transform;

			&.visible {
				transform: translateX(0);
			}

			&.banner {
				top: calc(var(--margin) + 200px + var(--sp-4));
			}

			.title {
				margin-bottom: var(--sp-24);
				cursor: pointer;
			}
			ol {
				li {
					a {
						line-height: 1;
						transition: var(--transition-s);
						transition-property: padding;

						@media (width > #{$lg}) {
							&:hover:not(.cta) {
								padding-left: var(--sp-12);
							}
							&[aria-current="section"]:not(.cta) {
								color: var(--brown);
							}
						}
						@media (width <= #{$lg}) {
							&:hover:not(.cta) {
								background-color: var(--white) !important;
							}
							&:hover.cta {
								background-color: var(--brown) !important;
							}
							&[aria-current="section"]:not(.cta) {
								color: var(--white) !important;
								background-color: var(--black) !important;
							}
						}
					}
				}
				.cta {
					width: 100%;
					text-align: center;
					margin-top: var(--sp-24);
				}
			}
		}

		// mobile: a bar stuck to the bottom of the screen while the page content scrolls by; at the end of the
		// content it stays there (sticky inside the full-height nav), so it never covers the footer
		@media (width <= #{$lg}) {
			top: 0;
			bottom: -1px; // overlap the footer by 1px: no hairline gap from sub-pixel rounding when the bar settles
			left: 0;
			right: 0;
			height: auto;
			width: auto;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			div {
				margin: 0;
				position: sticky;
				bottom: 0;
				top: unset !important;
				width: 100%;
				border-radius: 0;
				padding: 0;
				overflow-x: scroll;
				transform: unset;
				-ms-overflow-style: none;
    			scrollbar-width: none;
				
				&::-webkit-scrollbar {
					width: 0;
					height: 0;
				}

				ol {
					display: flex;
					align-items: baseline;

					li {
						a {
							padding: var(--sp-12) var(--margin);
							background-color: var(--linen);
							font-size: .833rem;
							text-transform: uppercase;
							display: block;
							white-space: pre;
						}
					}
					
					.cta {
						margin: 0;
						background-color: var(--white);
						border-radius: 0;
					}
				}
			}
		}
	}
</style>