<script>
    import Title from '$lib/components/Title.svelte';
    import { formatDateNumber, formatISO } from '$lib/utils/datetime.js';
    import { urlFor } from '$lib/utils/image.js';

	let { data } = $props()
</script>

<main class="bg-white">
	<Title
	title='News'
	size={'m'}
	/>
	<section id="newses">
		{#each data.newses as news, i}
			<a href="/news/{news.slug.current}" class="news">
				<time class="date wb-28 wb-12-mb uppercase" datetime={formatISO(news.date)}>{formatDateNumber(news.date)}</time>
				<div class="text max-w-500">
					<h1 class="wb-28">{news.title}</h1>
					{#if news.subtitle}<h2 class="nr-28">{news.subtitle}</h2>{/if}
					{#if news.abstract}
						<p class="abstract wb-18">{news.abstract}</p>
					{/if}
				</div>
				<img class="thumbnail max-w-400" src={urlFor(news.thumbnail).width(1080)} alt="Thumbnail della news “{news.title}”">
			</a>
		{/each}
	</section>
</main>

<style>
	main {
		#newses {
			grid-column: 1 / span 8;
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			align-items: start;
			column-gap: var(--gutter);

			.news {
				display: grid;
				grid-template-columns: repeat(8, 1fr);
				column-gap: var(--gutter);
				border-top: solid 1px var(--black);
				padding: var(--gutter) 0;

				.date {
					grid-column: 1 / span 1;
				}

				.text {
					grid-column: 2 / span 4;

					.abstract {
						margin-top: var(--gutter);
					}
				}

				.thumbnail {
					grid-column: 6 / span 3;
					aspect-ratio: 16/9;
					width: 100%;
    				height: auto;
					margin-left: auto;
				}
			}

			@media screen and (max-width: 1080px) {
				grid-template-columns: repeat(2, 1fr);

				.news {
					padding: 0 0 var(--spacing-s);
					border-top: unset;
					
					.date {
						grid-column: 1 / span 8;
						grid-row: 1;
						font-weight: 700;
						padding-bottom: var(--gutter);
						border-bottom: solid 1px var(--black);
					}

					.text {
						grid-column: 1 / span 8;
						grid-row: 3;
					}

					.thumbnail {
						grid-column: 1 / span 8;
						grid-row: 2;
						margin-left: unset;
						max-width: unset;
						margin: var(--gutter) 0;
					}
				}
			}

			@media screen and (max-width: 600px) {
				grid-template-columns: repeat(1, 1fr);
			}
		}
	}
</style>