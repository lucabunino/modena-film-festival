<script>
    import { page } from "$app/state";
    let { title, sections, cta, bg } = $props()
	let scrollY = $state()
	import { getBanner } from '$lib/stores/banner.svelte';
	let banner = getBanner()
	let visible = $state(false)

	$effect(() => {
		visible = true
	})
</script>

<svelte:window bind:scrollY></svelte:window>

{#if sections}
	<nav>
		<div class="rounded-m wb-21 {bg ? bg : 'bg-linen'} {visible ? 'visible' : ''} {banner.show ? 'banner' : ''}">
			{#if title}
				<h1 class="wb-12 uppercase" onclick={() => {scrollY = 0}}>{title}</h1>
			{/if}
			<ol>
				{#each sections as section, i}
					<li>
						<a href="#{section.id}">{section.title}</a>
					</li>
				{/each}
				{#if cta}
					<li>
						<a class="cta btn-m {cta.bg ? cta.bg : ''}" href={cta.href} target={cta.blank ? '_blank' : ''} rel={cta.blank ? 'noopener noreferrer' : ''}>{cta.label}</a>
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
		min-width: 250px;
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

			.cta {
				width: 100%;
				text-align: center;
				margin-top: 2rem;
			}
		}
	}
</style>