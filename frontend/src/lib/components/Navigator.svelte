<script>
    import { page } from "$app/state";
    let { title, sections, cta, bg } = $props()
	import { getBanner } from '$lib/stores/banner.svelte';
    import { onMount } from "svelte";
	let banner = getBanner()
	let visible = $state(false)
	let shaking = $state(false);
	function handleLockedclick(e) {e.preventDefault(); if (shaking) return; shaking = true; setTimeout(() => (shaking = false), 600); }
	let activeSection = $state(false)

	// publish the panel height (on mobile it's a fixed bottom bar) so other fixed UI, e.g. Alert, can sit above it
	function publishHeight(node) {
		const root = document.documentElement
		const ro = new ResizeObserver(() => root.style.setProperty('--navigatorHeight', `${node.offsetHeight}px`))
		ro.observe(node)
		return () => {
			ro.disconnect()
			root.style.removeProperty('--navigatorHeight')
		}
	}
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
		<div class="rounded-m wb-21 wb-10-mb {bg ? bg : 'bg-linen'} {visible ? 'visible' : ''} {banner.show ? 'banner' : ''}" {@attach publishHeight}>
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
			margin: var(--margin) 0;
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

		@media (width <= #{$lg}) {
			height: stretch;

			div {
				margin: 0;
				position: fixed;
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