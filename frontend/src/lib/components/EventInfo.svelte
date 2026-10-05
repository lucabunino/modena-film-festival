<script>
    import { page } from "$app/state";
    let { event } = $props()
	import { getBanner } from '$lib/stores/banner.svelte';
    import { formatEventDate, formatISO, formatLabel } from "$lib/utils/datetime";
    import { onMount } from "svelte";

	let banner = getBanner()
	let visible = $state(false)

	$effect(() => {
		visible = true;
	})
</script>

<nav class="desktop-only">
	<div class="rounded-m wb-18 wb-10-mb bg-linen {visible ? 'visible' : ''} {banner.show ? 'banner' : ''}">
		<h4 class="title wb-12 uppercase">Dove e quando?</h4>
		{#if event.start}
			<time datetime={formatISO(event.start, event.end)}>{formatEventDate(event.start, event.end)}</time>
		{/if}
		{#if event.location}
			<p>{event.location.title}{#if event.location.subtitle} {@html ' (' + event.location.subtitle + ')'}{/if}</p>
			{#if event.location.subtitle} {/if}
			{#if event.location.adressLabel}
				<p>
					{#if event.location.adressHref}
						<a href={event.location.adressHref} target="_blank" rel="noopener noreferrer">
							{event.location.adressLabel} ↗
						</a>
					{:else}
						<span>{event.location.adressLabel}</span>
					{/if}
				</p>
			{/if}
		{/if}
	</div>
</nav>

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
		min-width: 300px;

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
			p {
				line-height: 1;
				
				a {
					transition: var(--transition-s);
					transition-property: padding;

					@media (width > #{$lg}) {
						&:hover:not(.cta) {
							text-decoration: underline;
						}
						&[aria-current="section"]:not(.cta) {
							color: var(--brown);
						}
					}
				}
			}
		}
	}
</style>