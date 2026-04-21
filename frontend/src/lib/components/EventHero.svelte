<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
	import { urlFor } from '$lib/utils/image.js';
    import { formatEventDate, formatISO } from "$lib/utils/datetime";
	
	let shaking = $state(false)
	function handleLockedclick(e) {e.preventDefault(); if (shaking) return; shaking = true; setTimeout(() => (shaking = false), 600); }
	
    let { event } = $props()

	const cta = event.cta
	const size = event.size

	const canBuy = $derived.by(() => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        const now = new Date();
        const oneHourPastEvent = eventDate.getTime() + (60 * 60 * 1000);
        return now.getTime() >= oneHourPastEvent;
    });
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
		{#if event.webticHref && !event.soldOut && canBuy}
			<a class="cta btn-l bg-linen black {shaking ? 'shaking' : undefined}" href={event.webticHref} target="_blank" rel='noopener noreferrer'
			onclick={(e) => {cta.locked ? handleLockedclick(e) : ''}}
			>Compra su <img class="webtic" src="/logos/webtic.webp" alt=""></a>
		{/if}
		{#if event.credits}<p class="credits">{event.credits}</p>{/if}
		{#if event.soldOut}
			<span class="tag wb-12 wb-10-mb uppercase white bg-black">Sold out</span>
		{/if}
		{#each event.formats as format, i}
			<span class="tag wb-12 wb-10-mb uppercase bg-linen">{format.title}</span>
		{/each}
		<time class="datetime" datetime={formatISO(event.start, event.end)}>{formatEventDate(event.start, event.end)}</time>{#if event.location}<p class="location"><span class="comma">{@html ', '}</span>presso {event.location.title}{#if event.location.subtitle} {@html ' (' + event.location.subtitle + ')'}{/if}</p>{/if}
	</div>
	{#if event.thumbnail}
		<img class="img _16_9 max-w-700" src={urlFor(event.thumbnail).width(1080)} alt="Immagine di copertina per l'evento “{event.title}”">
	{/if}
</section>

<style>
	#hero {
		h2 {
			margin-top: .6em;
		}
		.cta {
			margin-bottom: 2rem;
			&:hover {
				filter: invert(1);
			}
			.webtic {
				display: inline-block;
				position: relative;
				top: .25em;
				height: 1.25em;
				margin-top: -.5em;
				width: auto;
			}
		}
		.info {
			margin-top: var(--spacing-s);
			display: inline-block;
			width: 100%;
			
			.tag {
				position: relative;
				bottom: .3em;

				@media screen and (max-width: 600px) {
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

				@media screen and (max-width: 600px) {
					display: block;
				}
			}
			.location {
				display: inline;

				@media screen and (max-width: 600px) {
					.comma {
						display: none;
					}
				}
			}
			.credits {
				border-bottom: solid 1px var(--black);
				margin-bottom: var(--gutter);
				padding-bottom: .4em;
			}
		}
		.img {
			object-fit: cover;
			width: 100%;
			margin: var(--gutter) 0 var(--margin);
		}
	}
</style>