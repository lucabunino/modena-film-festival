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
	$effect(() => {
		observeSections();
		visible = true;
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

		sections.forEach(el => observer.observe(el));
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
		<div class="rounded-m wb-21 wb-10-mb {bg ? bg : 'bg-linen'} {visible ? 'visible' : ''} {banner.show ? 'banner' : ''}">
			{#if title}
				<button class="title wb-12 uppercase desktop-only" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{title}</button>
			{/if}
			<ol>
				{#each sections as section, i}
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

<style>
	nav {
		position: absolute;
		right: 0;
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
				top: calc(var(--margin) + 200px + .3rem);
			}

			.title {
				margin-bottom: 2rem;
				cursor: pointer;
			}
			ol {
				li {
					a {
						line-height: 1;
						transition: var(--transition-s);
						transition-property: padding;

						@media screen and (min-width: 1081px) {
							&:hover:not(.cta) {
								padding-left: 1rem;
							}
							&[aria-current="section"]:not(.cta) {
								color: var(--brown);
							}
						}
						@media screen and (max-width: 1080px) {
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
					margin-top: 2rem;
				}
			}
		}

		@media screen and (max-width: 1080px) {
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
							padding: 1rem var(--margin);
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