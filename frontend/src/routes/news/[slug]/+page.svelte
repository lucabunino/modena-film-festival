<script>
	import RichText from '$lib/components/RichText.svelte'
    import NewsHero from '$lib/components/NewsHero.svelte';
    import { formatDateNumber, formatISO } from '$lib/utils/datetime.js';
	import {PortableText} from '@portabletext/svelte'
    import PortableTextStyleProject from '$lib/components/portableTextStyles/portableTextStyleProject.svelte';

	let { data } = $props()
	let news = $derived(data.news[0])
	let cta = $derived(news.cta)
</script>


<main class="bg-white">
	<NewsHero {news} />
	<section id="content">
		{#if news.abstract}
			<!-- plain text until the abstract migration (seed/news-abstracts.js), rich text after -->
			{#if typeof news.abstract === 'string'}
				<p class="wb-24 wb-18-mb max-w-700">{news.abstract}</p>
			{:else}
				<RichText value={news.abstract} block="wb-24 wb-18-mb max-w-700" />
			{/if}
		{/if}
		{#if cta.label}
			<a class="cta btn-l bg-linen black hover-white hover-bg-black" href={cta.href} target={cta.blank ? '_blank' : undefined} rel={cta.blank ? 'noopener noreferrer' : undefined}>{cta.label}</a>
		{/if}
		{#if news.date}
			<time class="date wb-12 uppercase" datetime={formatISO(news.date)}>{formatDateNumber(news.date)}</time>
		{/if}
		{#if news.body}
			<div class="body portableText te-21 max-w-700">
				<PortableText value={news.body}
				components={{
					block: {
						normal: PortableTextStyleProject,
						h4: PortableTextStyleProject,
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

<style lang="scss">
	main {
		padding: 0;
		row-gap: 0;

		#content {
			padding: calc(var(--margin)*1.5) var(--margin) var(--sp-144);

			.cta {
				margin-top: var(--margin);
			}
			.date {
				display: block;
				padding: var(--sp-96) 0 var(--sp-12);
				border-bottom: solid 1px var(--black);
			}
			.body {
				margin-top: var(--sp-12);
			}
		}
	}
</style>