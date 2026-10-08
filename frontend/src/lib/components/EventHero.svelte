<script>
	import { asset } from '$lib/utils/assets.js'
	import Media from '$lib/components/Media.svelte'
    import Breadcrumbs from "./Breadcrumbs.svelte";
    import { formatEventDate, formatISO } from "$lib/utils/datetime";
	
	let shaking = $state(false)
	function handleLockedclick(e) {e.preventDefault(); if (shaking) return; shaking = true; setTimeout(() => (shaking = false), 600); }
	
    let { event } = $props()

	const cta = event.cta
	const size = event.size

	let canBuy = $derived.by(() => {
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
		<h2 class="te-35 te-21-mb max-w-700">{event.subtitle}</h2>
	{/if}
	<div class="info wb-21 wb-15-mb max-w-700">		
		{#if event.webticHref && !event.soldOut && canBuy}
			<a class="cta btn-l bg-linen black hover-black hover-bg-linen {shaking ? 'shaking' : undefined}" href={event.webticHref} target="_blank" rel='noopener noreferrer'
			onclick={(e) => {cta.locked ? handleLockedclick(e) : ''}}
			>Compra su <img class="webtic" src={asset('/logos/webtic.webp')} alt=""></a>
		{/if}
		{#if event.credits}<p class="credits">{event.credits}</p>{/if}
		{#if event.soldOut}
			<span class="tag wb-12 wb-10-mb uppercase white bg-black">Sold out</span>
		{/if}
		{#each event.formats ?? [] as format (format.slug.current)}
			<span class="tag wb-12 wb-10-mb uppercase bg-linen">{format.title}</span>
		{/each}
		<!-- prizes the screened film won in this edition, in the prize's colour (as on the program cards) -->
		{#each event.edition?.awards ?? [] as award (award._key)}
			<span class="tag award wb-12 wb-10-mb uppercase bg-{award.color || 'linen'}">✳ {award.title}</span>
		{/each}
		<time class="datetime" datetime={formatISO(event.start, event.end)}>{formatEventDate(event.start, event.end)}</time>{#if event.location}<p class="location"><span class="comma">{@html ', '}</span>presso {event.location.title}{#if event.location.subtitle} {@html ' (' + event.location.subtitle + ')'}{/if}</p>{/if}
	</div>
	{#if event.thumbnail}
		<Media class="img _16_9 max-w-700" image={event.thumbnail} aspectRatio={16/9} alt="Immagine di copertina per l'evento “{event.title}”" sizes="(width <= 768px) 100vw, 700px" loading="eager" />
	{/if}
</section>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	#hero {
		h2 {
			margin-top: .6em;
		}
		.cta {
			margin-bottom: var(--sp-24);
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
			margin-top: var(--sp-48);
			display: inline-block;
			width: 100%;
			
			.tag {
				position: relative;
				bottom: .3em;

				@media (width <= #{$sm}) {
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

				@media (width <= #{$sm}) {
					display: block;
				}
			}
			.location {
				display: inline;

				@media (width <= #{$sm}) {
					.comma {
						display: none;
					}
				}
			}
			.credits {
				border-bottom: solid 1px var(--black);
				margin-bottom: var(--sp-12);
				padding-bottom: .4em;
			}
		}
		:global(.img) {
			object-fit: cover;
			width: 100%;
			margin: var(--sp-12) 0 var(--margin);
		}
	}
</style>