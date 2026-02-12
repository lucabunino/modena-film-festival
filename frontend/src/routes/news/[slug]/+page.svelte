<script>
    import NewsHero from '$lib/components/NewsHero.svelte';
    import PortableTextStyleProject from '$lib/components/portableTextStyles/portableTextStyleProject.svelte';
    import { formatDateNumber, formatISO } from '$lib/utils/datetime.js';
	import {PortableText} from '@portabletext/svelte'

	let { data } = $props()
	let news = $derived(data.news[0])
	let cta = $derived(news.cta)
</script>

<main class="bg-white">
	<NewsHero {news} />
	<section id="content">
		{#if news.abstract}
			<p class="wb-24 wb-18-mb max-w-700">{news.abstract}</p>
		{/if}
		{#if cta.label}
			<a class="cta btn-l bg-linen black hover-white hover-bg-black" href={cta.href} target={cta.blank ? '_blank' : undefined} rel={cta.blank ? 'noopener noreferrer' : undefined}>{cta.label}</a>
		{/if}
		{#if news.date}
			<time class="date wb-12 uppercase" datetime={formatISO(news.date)}>{formatDateNumber(news.date)}</time>
		{/if}
		{#if news.body}
			<div class="body portableText nr-21 max-w-700">
				<PortableText value={news.body}
				components={{
					block: {
						normal: PortableTextStyleProject,
					},
					listItem: PortableTextStyleProject,
					marks: {
						link: PortableTextStyleProject,
					},
				}}/>
			</div>
		{/if}
	</section>
</main>

<style>
	main {
		padding: 0;
		row-gap: 0;

		#content {
			padding: calc(var(--margin)*1.5) var(--margin) var(--spacing-l);

			.cta {
				margin-top: var(--margin);
			}
			.date {
				display: block;
				padding: var(--spacing-m) 0 var(--gutter);
				border-bottom: solid 1px var(--black);
			}
			.body {
				margin-top: var(--gutter);
			}
		}
	}
</style>