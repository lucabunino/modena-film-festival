<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
	import { urlFor } from '$lib/utils/image.js';
    import { formatEventDate, formatISO } from "$lib/utils/datetime";

    let { event } = $props()

	const cta = event.cta
	const size = event.size
</script>

<section id="hero" class={event.layout}>
	<Breadcrumbs/>
	{#if event.title}
		<h1 class="wb-cd-80 wb-cd-40-mb max-w-800 uppercase">{event.title}</h1>
	{/if}
	{#if event.subtitle}
		<h2 class="nr-35 nr-21-mb max-w-700">{event.subtitle}</h2>
	{/if}
	<div class="info wb-21 wb-15-mb max-w-700">
		{#if event.credits}<p class="credits">{event.credits}</p>{/if}
		{#each event.formats as format, i}
			<span class="tag wb-12 wb-10-mb uppercase bg-linen">{format.title}</span>
		{/each}
		<time class="datetime" datetime={formatISO(event.start, event.end)}>{formatEventDate(event.start, event.end)}</time>{#if event.location}<p class="location">, presso {event.location.title}{#if event.location.subtitle} {@html ' (' + event.location.subtitle + ')'}{/if}</p>{/if}
	</div>
	{#if event.thumbnail}
		<img class="img max-w-700" src={urlFor(event.thumbnail).width(1080)} alt="Immagine di copertina per l'evento “{event.title}”">
	{/if}
</section>

<style>
	#hero {
		h2 {
			margin-top: .6em;
		}
		.info {
			margin-top: var(--spacing-s);
			display: inline-block;
			width: 100%;
			
			.tag {
				position: relative;
				bottom: .3em;

				@media screen and (max-width: 600px) {
					display: block;
					width: fit-content;
					margin-bottom: .6em;
				}

				&+.tag {
					margin-left: .3em;
				}

				&:last-of-type {
					margin-right: 1em;
				}
			}
			.datetime {
				display: inline;
			}
			.location {
				display: inline;
			}
			.credits {
				border-bottom: solid 1px var(--black);
				margin-bottom: var(--gutter);
				padding-bottom: .4em;
			}
		}
		.img {
			aspect-ratio: 16/9;
			object-fit: cover;
			width: 100%;
			margin: var(--gutter) 0 var(--margin);
		}
	}
</style>