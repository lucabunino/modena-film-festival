<script>
	import Media from '$lib/components/Media.svelte'
    import Title from '$lib/components/Title.svelte';
    import { formatDateNumber, formatISO } from '$lib/utils/datetime.js';

	import { page } from '$app/state';

	let { data } = $props()

	// year filter, like the Programma filters; kept in the URL (?year=2026), latest year by default
	const yearOf = (news) => new Date(news.date).getFullYear()
	const years = $derived([...new Set(data.newses.map(yearOf))].sort((a, b) => b - a))
	const activeYear = $derived(Number(page.url.searchParams.get('year')) || years[0])
	const newses = $derived(data.newses.filter((news) => yearOf(news) === activeYear))
</script>


<main class="bg-white">
	<Title subtitles={["Novità, annunci e aggiornamenti dal Festival: ospiti, programma, iniziative e tutto quello che bolle in pentola."]} size="s" />
	<section id="filters" class="wb-12 wb-10-mb uppercase">
		<div class="years">
			<span>Anno: </span>
			{#each years as year (year)}
				<a href="?year={year}" data-sveltekit-noscroll data-sveltekit-replacestate class="filter btn-m {activeYear === year ? 'bg-black white' : 'bg-linen'} hover-bg-black">{year}</a>
			{/each}
		</div>
	</section>
	<section id="newses">
		{#each newses as news, i (news.slug.current)}
			<a href="/news/{news.slug.current}" class="news">
				<time class="date wb-28 wb-12-mb uppercase" datetime={formatISO(news.date)}>{formatDateNumber(news.date)}</time>
				<div class="text max-w-500">
					<h1 class="wb-28">{news.title}</h1>
					{#if news.subtitle}<h2 class="nr-28">{news.subtitle}</h2>{/if}
					{#if news.abstract}
						<p class="abstract wb-16">{news.abstract}</p>
					{/if}
				</div>
				<Media class="thumbnail max-w-400" image={news.thumbnail} aspectRatio={16/9} alt="Thumbnail della news “{news.title}”" sizes="(width <= 1024px) 100vw, 40vw" />
			</a>
		{/each}
	</section>
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	main {
		row-gap: 0; // as in Programma: spacing comes from the sections themselves

		// same look as the Programma filters
		#filters {
			grid-column: 1 / span 8;
			padding: var(--sp-48) 0 var(--margin);

			.years {
				display: flex;
				flex-wrap: wrap;
				column-gap: .2em;
				row-gap: .4em;
				align-items: baseline;

				span {
					margin-right: 1em;
				}
			}

			@media (width <= #{$lg}) {
				padding: var(--sp-32) 0;
				row-gap: var(--sp-32);
			}
		}
		#newses {
			grid-column: 1 / span 8;
			padding-top: 0 !important; // the filters above already end with --margin; override main's section spacing
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			align-items: start;
			column-gap: var(--gutter);

			.news {
				display: grid;
				grid-template-columns: repeat(8, 1fr);
				column-gap: var(--gutter);
				border-top: solid 1px var(--black);
				padding: var(--sp-12) 0;
				

				&:hover {
					:global(.thumbnail) {
						border-radius: 30px;
					}
				}

				.date {
					grid-column: 1 / span 1;
				}

				.text {
					grid-column: 2 / span 4;

					.abstract {
						margin-top: var(--sp-12);
					}
				}

				:global(.thumbnail) {
					grid-column: 6 / span 3;
					aspect-ratio: 16/9;
					width: 100%;
    				height: auto;
					margin-left: auto;
					transition: var(--transition-s);
				}
			}

			@media (width <= #{$lg}) {
				grid-template-columns: repeat(2, 1fr);

				.news {
					padding: 0 0 var(--sp-48);
					border-top: unset;
					
					.date {
						grid-column: 1 / span 8;
						grid-row: 1;
						font-weight: 700;
						padding-bottom: var(--sp-12);
						border-bottom: solid 1px var(--black);
					}

					.text {
						grid-column: 1 / span 8;
						grid-row: 3;
					}

					:global(.thumbnail) {
						grid-column: 1 / span 8;
						grid-row: 2;
						margin-left: unset;
						max-width: unset;
						margin: var(--sp-12) 0;
					}
				}
			}

			@media (width <= #{$sm}) {
				grid-template-columns: repeat(1, 1fr);
			}
		}
	}
</style>