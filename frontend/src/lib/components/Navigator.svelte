<script>
    import { page } from "$app/state";
    let { title, sections, cta, bg } = $props()
	let scrollY = $state()
	import { getBanner } from '$lib/stores/banner.svelte';
	let banner = getBanner()
	let visible = $state(false)
	let shaking = $state(false);
	$effect(() => {
		visible = true
	})
	function handleLockedclick(e) {
		e.preventDefault()
		if (shaking) return;
		shaking = true;
		setTimeout(() => (shaking = false), 600);
	}
</script>

<svelte:window bind:scrollY></svelte:window>

{#if sections}
	<nav>
		<div class="rounded-m wb-21 wb-10-mb {bg ? bg : 'bg-linen'} {visible ? 'visible' : ''} {banner.show ? 'banner' : ''}">
			{#if title}
				<h1 class="wb-12 uppercase desktop-only" onclick={() => {scrollY = 0}}>{title}</h1>
			{/if}
			<ol>
				{#each sections as section, i}
					<li>
						<a href="#{section.id}">{section.title}</a>
					</li>
				{/each}
				{#if cta}
					<li>
						<a class="cta wb-10-mb btn-m {cta.bg ? cta.bg : ''} {cta.locked ? 'locked' : ''} {shaking ? 'shaking' : ''}" href={cta.href} target={cta.blank ? '_blank' : ''} rel={cta.blank ? 'noopener noreferrer' : ''}
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

			h1 {
				margin-bottom: 2rem;
				cursor: pointer;
			}
			ol {
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
				top: calc(100svh - 2.833rem + 1px);
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