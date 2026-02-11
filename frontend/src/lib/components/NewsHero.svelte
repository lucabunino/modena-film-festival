<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
	import { urlFor } from '$lib/utils/image.js';

    let { news } = $props()
	const size = news.size
</script>

{#if news.layout === 'imgTall' || news.layout === 'imgShort'}
	<section id="hero" class={news.layout} style="{news.cover ? `background-image: url(${urlFor(news.cover).width(2560)});` : undefined} {news.typeColor ? `color: ${news.typeColor.hex}` : undefined}">
		<Breadcrumbs showSingle={false} typeColor={news.typeColor ? news.typeColor : undefined}/>
		{#if news.title}
			<h1 class="{size == 'l' ? 'wb-cd-120 wb-cd-50-mb' : size == 'm' ? 'wb-cd-80 wb-cd-50-mb' : size == 's' ? 'wb-cd-60 wb-cd-24-mb': undefined} max-w-800 uppercase">{news.title}</h1>
		{/if}
		{#if news.subtitle}
			<h2 class="{size == 'l' ? 'nr-35 nr-21-mb' : size == 'm' ? 'nr-35 nr-21-mb' : size == 's' ? 'nr-28 nr-21-mb': undefined} max-w-700">{news.subtitle}</h2>
		{/if}
	</section>
{/if}

<style>
	#hero {
		width: 100%;
		position: relative;

		&.imgTall {
			grid-column: 1 / span 8;
			padding: var(--margin);
			min-height: 600px;
			height: 80vh;
			background-size: cover;
			background-position: center;

			@media screen and (max-width: 768px) {
				padding: 5rem var(--margin);
				min-height: 300px;
				height: 35vh;
			}
		}

		&.imgShort {
			grid-column: 1 / span 8;
			padding: var(--margin);
			min-height: 300px;
			height: 50vh;
			background-size: cover;
			background-position: center;

			@media screen and (max-width: 768px) {
				padding: 5rem var(--margin);
				min-height: 300px;
				height: 35vh;
			}
		}

		h1 {
			max-width: 600px;
		}

		h2 {
			max-width: 600px;
			margin-top: .7em;
		}
	}
</style>