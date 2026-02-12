<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
	import { urlFor } from '$lib/utils/image.js';

    let { event } = $props()

	const cta = event.cta
	const size = event.size
</script>

{#if event.layout === 'main'}
	<section id="hero" class={event.layout} style="{event.cover ? `background-image: url(${urlFor(event.cover).width(2560)});` : undefined} {event.typeColor ? `color: ${event.typeColor.hex}` : undefined}">
		<Breadcrumbs/>
		{#if event.title}
			<h1 class="{size == 'l' ? 'wb-cd-120 wb-cd-40-mb' : size == 'm' ? 'wb-cd-80 wb-cd-40-mb' : size == 's' ? 'wb-cd-60 wb-cd-24-mb': undefined} max-w-800 uppercase">{event.title}</h1>
		{/if}
		{#if event.subtitle}
			<h2 class="{size == 'l' ? 'nr-35' : size == 'm' ? 'nr-28' : size == 's' ? 'nr-21': undefined} max-w-700">{event.subtitle}</h2>
		{/if}
		{#if cta.label}
			<a class="cta btn-l {event.typeColor ? '' : 'bg-linen'} black hover-black hover-bg-linen" style="{event.typeColor ? `background-color: ${event.typeColor.hex};` : undefined}" href={cta.href} target={cta.blank ? '_blank' : undefined} rel={cta.blank ? 'noopener noreferrer' : undefined}>{cta.label}</a>
		{/if}
	</section>
{:else if event.layout === 'secondary'}
	<section id="hero" class={event.layout}>
		<Breadcrumbs/>
		{#if event.title}
			<h1 class="{size == 'l' ? 'wb-cd-120 wb-cd-40-mb' : size == 'm' ? 'wb-cd-80 wb-cd-40-mb' : size == 's' ? 'wb-cd-60 wb-cd-24-mb': undefined} max-w-800 uppercase">{event.title}</h1>
		{/if}
		{#if event.subtitle}
			<h2 class="{size == 'l' ? 'nr-35' : size == 'm' ? 'nr-28' : size == 's' ? 'nr-21': undefined} max-w-700">{event.subtitle}</h2>
		{/if}
		{#if cta.label}
			<a class="cta btn-l bg-linen black hover-black hover-bg-linen" href={cta.href} target={cta.blank ? '_blank' : undefined} rel={cta.blank ? 'noopener noreferrer' : undefined}>{cta.label}</a>
		{/if}
		{#if event.cover}
			<img src={urlFor(event.cover).width(1080)} alt="Immagine di copertina per l'evento “{event.title}”">
		{/if}
	</section>
{/if}

<style>
	#hero {
		width: 100%;
		position: relative;

		&.main {
			grid-column: 1 / span 8;
			padding: var(--margin);
			aspect-ratio: 16/9;
			min-height: 600px;
			background-size: cover;
			
			.cta {
				display: block;
				position: absolute;
				bottom: var(--spacing-s);
			}
		}

		&.secondary {
			padding: var(--margin);
			
			.cta {
				display: block;
				width: fit-content;
			}

			img {
				aspect-ratio: 16/9;
			}
		}

		h2 {
			margin-top: 1.1em;
		}
	}
</style>