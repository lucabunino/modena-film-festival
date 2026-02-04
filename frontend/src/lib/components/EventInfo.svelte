<script>
    import { page } from "$app/state";
    let { event } = $props()
	import { getBanner } from '$lib/stores/banner.svelte';
    import { formatISO, formatLabel } from "$lib/utils/datetime";
    import { onMount } from "svelte";

	let banner = getBanner()
	let visible = $state(false)

	$effect(() => {
		visible = true;
	})
</script>

<nav class="desktop-only">
	<div class="rounded-m wb-21 wb-10-mb bg-linen {visible ? 'visible' : ''} {banner.show ? 'banner' : ''}">
		<h4 class="title wb-12 uppercase">Dove e quando?</h4>
		{#if event.start}
			<time datetime={formatISO(event.start, event.end)}>{formatLabel(event.start, event.end)}</time>
		{/if}
		{#if event.location}
			<p>{event.location.title}</p>
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

<style>
	nav {
		position: absolute;
		right: var(--margin);
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
			p {
				line-height: 1;
				
				a {
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
				}
			}
		}
	}
</style>