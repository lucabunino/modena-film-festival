<script>
    import HeadSingle from '$lib/components/HeadSingle.svelte';
    import Title from '$lib/components/Title.svelte';
    import { formatDateHash, formatDateNumber, formatDayName, formatDayNumber, formatISO, formatISONextDay } from '$lib/utils/datetime.js';
    import { urlFor } from '$lib/utils/image.js';

	let { data } = $props()
	$inspect(data)
	const seoSingle = { seoTitle: 'Programma'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Title
	title='Programma'
	size={'s'}
	/>
	<section id="program">
		{#each data.program.days as day, i}
			<div class="day bg-linen" id={formatDateHash(day.date)}>
				<h2 class="wb-cd-60">{formatDayName(day.date)}<br>{formatDayNumber(day.date)}</h2>
				{#if i + 1 < data.program.days.length}
					{@const nextDay = data.program.days[i + 1]}
					<a class="wb-12 uppercase" href="#{formatDateHash(nextDay.date)}">
						Vai a {formatDayName(nextDay.date)}
					</a>
				{/if}
			</div>

			{#each day.events as event, j}
				<!-- <EventCard {event} /> -->
				 {event.title}
			{/each}
		{/each}
		<!-- {#each data.newses as news, i}
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
		{/each} -->
	</section>
</main>

<style>
	main {
		#program {
			grid-column: 1 / span 8;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: start;
			column-gap: var(--gutter);

			.day {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: var(--margin);
				aspect-ratio: 16/9;
			}

			.event {

			}

			@media screen and (max-width: 1080px) {

			}

			@media screen and (max-width: 600px) {

			}
		}
	}
</style>