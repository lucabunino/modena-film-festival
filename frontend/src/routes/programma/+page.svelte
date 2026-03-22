<script>
    import EventCard from '$lib/components/EventCard.svelte';
    import HeadSingle from '$lib/components/HeadSingle.svelte';
    import Title from '$lib/components/Title.svelte';
    import { formatDateHash, formatDateNumber, formatDayName, formatDayNumber, formatISO, formatISONextDay } from '$lib/utils/datetime.js';
    import { urlFor } from '$lib/utils/image.js';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { data } = $props()
	const seoSingle = { seoTitle: 'Programma'}
	let activeDay = $derived($page.url.searchParams.get('day'));
    let activeFormat = $derived($page.url.searchParams.get('format'));

	let filteredDays = $derived.by(() => {
        const seenEventIds = new Set();
        const isFilteringSpecificDay = activeDay && activeDay !== 'all';

        return data.program.days
            .filter(day => {
                if (!isFilteringSpecificDay) return true;
                return formatDateHash(day.date) === activeDay;
            })
            .map(day => {
                const visibleEvents = day.events.filter(event => {
                    const matchesFormat = !activeFormat || event.formats?.some(f => {
                        const slugValue = typeof f.slug === 'object' ? f.slug.current : f.slug;
                        return slugValue === activeFormat;
                    });

                    if (!matchesFormat) return false;
                    if (isFilteringSpecificDay) return true;
                    if (seenEventIds.has(event._id)) return false;
                    
                    seenEventIds.add(event._id);
                    return true;
                });

                return { ...day, visibleEvents };
            })
            .filter(day => day.visibleEvents.length > 0);
    });
	const getCount = (slug) => formatCounts.find(c => c.slug === slug)?.count || 0;
	const formatCounts = $derived(
		data.program.formats.map(f => {
			const slug = f.slug?.current || f.slug;
			const count = data.program.days.reduce((acc, day) => {
				const matches = day.events.filter(event => 
					event.formats?.some(ef => (ef.slug?.current || ef.slug) === slug)
				);
				return acc + matches.length;
			}, 0);
			return { slug, count };
		})
	);
	const totalEvents = $derived(
		data.program.days.reduce((acc, day) => acc + day.events.length, 0)
	);
	
	function eventMatchesFormat(event) {
        if (!activeFormat) return true;
        return event.formats?.some(f => f.slug === activeFormat);
    }
	function scrollToDay(e, date) {
        e.preventDefault();
        const id = formatDateHash(date);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
            });
            history.pushState(null, null, `#${id}`);
        }
    }
	function handleDayChange(e) {
        const value = e.target.value;
        const newUrl = getFilterUrl('day', value === 'all' ? null : value);
        goto(newUrl, { noscroll: true, keepfocus: true });
    }
    function getFilterUrl(key, value) {
        const params = new URLSearchParams($page.url.searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        const queryString = params.toString();
        return queryString ? `?${queryString}` : $page.url.pathname;
    }
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Title
	subtitles={["At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi"]}
	size={'s'}
	/>
	<section id="filters" class="wb-12 uppercase">
		<div class="formats">
			<span>Format: </span>
			<a href={getFilterUrl('format', null)} class="filter btn-m { !$page.url.searchParams.get('format') ? 'bg-black white' : 'bg-linen'} hover-bg-black" data-sveltekit-noscroll>Tutto ({totalEvents})</a>
			{#each data.program.formats as format, i}
				<a href={getFilterUrl('format', format.slug.current)} class="filter btn-m {$page.url.searchParams.get('format') === format.slug.current ? 'bg-black white' : 'bg-linen'} hover-bg-black" data-sveltekit-noscroll>{format.title} ({getCount(format.slug.current)})</a>
			{/each}
		</div>
		<div class="days">
			<span>Giorni: </span>
			<select class="day filter btn-m bg-linen hover-bg-black" onchange={handleDayChange} value={$page.url.searchParams.get('day') || 'all'}>
				<option value="all">Tutti i giorni
				</option>
				{#each data.program.days as day}
					<option value={formatDateHash(day.date)}>
						{formatDayName(day.date)} {formatDayNumber(day.date)}
					</option>
				{/each}
			</select>
		</div>
	</section>
	<section id="program">
		{#each filteredDays as day, i}
			{#if !$page.url.searchParams.get('format')}
				<div class="day-indicator bg-linen" id={formatDateHash(day.date)}>
					<h2 class="wb-cd-60">{formatDayName(day.date)}<br>{formatDayNumber(day.date)}</h2>
					{#if i + 1 < data.program.days.length}
						{@const nextDay = data.program.days[i + 1]}
						<a class="wb-12 uppercase" href="#{formatDateHash(nextDay.date)}" onclick={(e) => scrollToDay(e, nextDay.date)}>
							Vai a {formatDayName(nextDay.date)}
						</a>
					{/if}
				</div>
			{/if}
			{#each day.visibleEvents as event, j}
				<EventCard {event} />
			{/each}
		{:else}
            <div class="no-results wb-18">
                Nessun evento in programma per questi filtri.
            </div>
		{/each}
		<div id="links">
			<a class="link btn-l border-linen hover-border-black hover-bg-black" href="/biglietti">Biglietti</a>
			<a class="link btn-l border-linen hover-border-black hover-bg-black" href="/biglietti">Scarica PDF ⤓</a>
		</div>
	</section>
</main>

<style>
	main {
		row-gap: 0;
		#filters {
			grid-column: 1 / span 8;
			display: flex;
			align-items: baseline;
			column-gap: var(--spacing-s);
			padding: var(--spacing-s) 0 var(--margin);
			border-bottom: solid 1px var(--black);

			.days {
				display: flex;
				column-gap: .2em;
				row-gap: .4em;
				align-items: baseline;

				span {
					margin-right: 1em;
				}
				
				.day {
					display: inline-block;
					text-align: center;
					border: none;
					cursor: pointer;
				}
			}

			.formats {
				display: flex;
				flex-wrap: wrap;
				column-gap: .2em;
				row-gap: .4em;
				align-items: baseline;

				span {
					margin-right: 1em;
				}
			}
		}
		#program {
			grid-column: 1 / span 8;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: start;
			column-gap: var(--gutter);
			row-gap: 5rem;

			.day-indicator {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				scroll-margin-top: var(--margin);
				padding: var(--margin);
				aspect-ratio: 16/9;
			}

			.event {

			}

			#links {
				position: absolute;
				top: 0;
				right: var(--margin);
				height: 100%;
				pointer-events: none;

				.link {
					position: sticky;
					top: calc(100% - var(--margin) - 1.5rem - 2.35em);
					pointer-events: all;
				}
			}

			@media screen and (max-width: 1080px) {

			}

			@media screen and (max-width: 600px) {

			}
		}
	}
</style>