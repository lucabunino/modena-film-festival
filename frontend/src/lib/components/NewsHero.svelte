<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
	import Media from '$lib/components/Media.svelte';
	import { urlFor } from '$lib/utils/image.js';

    let { news } = $props()
	const size = news.size
</script>

<!-- imgTall / imgShort: title over the cover; imgFramed: title, then the cover as wide as the content;
     noImg (or no layout): title alone, no background -->
{#if news.layout === 'imgTall' || news.layout === 'imgShort'}
	<section id="hero" class={news.layout} style="{news.cover ? `background-image: url(${urlFor(news.cover).width(2560)});` : undefined} {news.typeColor ? `color: ${news.typeColor.hex}` : undefined}">
		<Breadcrumbs showSingle={false} typeColor={news.typeColor ? news.typeColor : undefined}/>
		{@render heading()}
	</section>
{:else}
	<section id="hero" class="noImg">
		<Breadcrumbs showSingle={false}/>
		{@render heading()}
		{#if news.layout === 'imgFramed' && news.cover}
			<Media class="cover" image={news.cover} alt="Immagine di copertina per la news “{news.title}”" sizes="100vw" loading="eager" />
		{/if}
	</section>
{/if}

{#snippet heading()}
		{#if news.title}
			<h1 class="{size == 'l' ? 'wb-cd-120 wb-cd-40-mb' : size == 'm' ? 'wb-cd-80 wb-cd-40-mb' : size == 's' ? 'wb-cd-60 wb-cd-24-mb': undefined} max-w-700 uppercase">{news.title}</h1>
		{/if}
		{#if news.subtitle}
			<h2 class="{size == 'l' ? 'te-35 te-21-mb' : size == 'm' ? 'te-35 te-21-mb' : size == 's' ? 'te-28 te-21-mb': undefined} max-w-700">{news.subtitle}</h2>
		{/if}
{/snippet}

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	#hero {
		width: 100%;
		position: relative;

		&.imgTall {
			grid-column: 1 / span 8;
			padding: var(--margin);
			min-height: 600px;
			height: var(--heroTall); // as tall as a landing hero
			background-size: cover;
			background-position: top;

			@media (width <= #{$md}) {
				padding: var(--sp-32) var(--margin);
				min-height: 300px;
				height: 40vh;
			}
		}

		&.imgShort {
			grid-column: 1 / span 8;
			padding: var(--margin);
			min-height: 400px;
			height: var(--heroShort);
			background-size: cover;
			background-position: top;

			@media (width <= #{$md}) {
				padding: var(--sp-60) var(--margin);
				min-height: 300px;
				height: 40vh;
			}
		}
		&.noImg {
			grid-column: 1 / span 6; // like #content below, so the framed cover matches the line under the date
			padding: var(--margin) var(--margin) 0;

			// as wide as the content below (the line under the date): same side padding as #content
			:global(.cover) {
				width: 100%;
				margin-top: calc(var(--margin) * 1.5);
			}
		}
		h2 {
			margin-top: .7em;
		}
	}
</style>