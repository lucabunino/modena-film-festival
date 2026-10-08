<script>
    import EventCard from '$lib/components/EventCard.svelte';
    import Title from '$lib/components/Title.svelte';
    import { formatDateHash, formatDayName, formatDayNumber } from '$lib/utils/datetime.js';
    import { replaceState } from '$app/navigation'; // Use replaceState for shallow updates
    import { page } from '$app/state';

    let { data } = $props();
    
    let activeDay = $state(page.url.searchParams.get('day') || 'all');
    let activeFormat = $state(page.url.searchParams.get('format') || null);

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

	let canBuy = $derived.by(() => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        const now = new Date();
        const oneHourPastEvent = eventDate.getTime() + (60 * 60 * 1000);
        return now.getTime() >= oneHourPastEvent;
    });

    function updateFilters(key, value) {
        if (key === 'day') activeDay = value || 'all';
        if (key === 'format') activeFormat = value;

        const params = new URLSearchParams(window.location.search);
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
        replaceState(newUrl, page.state);
    }

    function handleDayChange(e) {
        updateFilters('day', e.target.value);
    }

    function handleFormatClick(e, slug) {
        e.preventDefault();
        updateFilters('format', slug);
    }

    const formatCounts = $derived(
        data.program.formats.map(f => {
            const slug = f.slug?.current || f.slug;
            const uniqueIds = new Set();
            data.program.days.forEach(day => {
                day.events.forEach(event => {
                    const hasFormat = event.formats?.some(ef => (ef.slug?.current || ef.slug) === slug);
                    if (hasFormat) uniqueIds.add(event._id);
                });
            });
            return { slug, count: uniqueIds.size };
        })
    );

    const totalEvents = $derived.by(() => {
        const uniqueTotalIds = new Set();
        data.program.days.forEach(day => {
            day.events.forEach(event => uniqueTotalIds.add(event._id));
        });
        return uniqueTotalIds.size;
    });

    const getCount = (slug) => formatCounts.find(c => c.slug === slug)?.count || 0;

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

</script>


<main class="bg-white">
    <Title subtitles={["Tutte le informazioni sull’intero cartellone del Festival, dai film in concorso agli eventi speciali"]} size="s" />
    
    <section id="filters" class="wb-12 wb-10-mb uppercase">
        <div class="formats">
            <span>Format: </span>
            <a 
                href="?" 
                onclick={(e) => handleFormatClick(e, null)}
                class="filter btn-m { !activeFormat ? 'bg-black white' : 'bg-linen'} hover-bg-black"
            >
                Tutto ({totalEvents})
            </a>
            {#each data.program.formats as format (format.slug.current)}
                {@const slug = format.slug.current}
                <a 
                    href="?format={slug}" 
                    onclick={(e) => handleFormatClick(e, slug)}
                    class="filter btn-m {activeFormat === slug ? 'bg-black white' : 'bg-linen'} hover-bg-black"
                >
                    {format.title} ({getCount(slug)})
                </a>
            {/each}
        </div>

        <div class="days">
            <span>Giorni: </span>
            <select class="day filter btn-m bg-linen hover-bg-black" onchange={handleDayChange} value={activeDay}>
                <option value="all">Tutti i giorni</option>
                {#each data.program.days as day (day.date)}
                    <option value={formatDateHash(day.date)}>
                        {formatDayName(day.date)} {formatDayNumber(day.date)}
                    </option>
                {/each}
            </select>
        </div>
    </section>

    <section id="program">
		{#each filteredDays as day, i (day.date)}
			{#if !activeFormat || (activeDay && activeDay !== 'all')}
				<div class="day-indicator bg-linen" id={formatDateHash(day.date)}>
					<h2 class="wb-cd-60 wb-cd-30-mb">
						{formatDayName(day.date)} <br>{formatDayNumber(day.date)}
					</h2>
					
					{#if i + 1 < data.program.days.length}
						{@const nextDay = data.program.days[i + 1]}
						{#if activeDay === 'all' || !activeDay}
							<a 
								class="wb-12 wb-10-mb uppercase" 
								href="#{formatDateHash(nextDay.date)}" 
								onclick={(e) => scrollToDay(e, nextDay.date)}
							>
								Vai a {formatDayName(nextDay.date)}
							</a>
						{/if}
					{/if}
				</div>
			{/if}

			{#each day.visibleEvents as event (event._id)}
				<EventCard {event} />
			{/each}
		{:else}
			<div class="no-results wb-18">
				Nessun evento in programma per questi filtri.
			</div>
		{/each}
	</section>
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	main {
		row-gap: 0;
		#filters {
			grid-column: 1 / span 8;
			display: flex;
			align-items: baseline;
			column-gap: var(--sp-48);
			row-gap: var(--sp-24);
			padding: var(--sp-48) 0 var(--margin);

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

			@media (width <= #{$lg}) {
				padding: var(--sp-32) 0;
				row-gap: var(--sp-32);
			}
			@media (width <= #{$sm}) {
				flex-direction: column;
				border: none;
			}
		}
		#program {
			grid-column: 1 / span 8;
			margin-inline: calc(var(--margin) * -1); // full-bleed: cancel main's side padding
			padding-top: 0; // starts right under the filters
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			align-items: start;
			column-gap: 0; // images touch; the card text carries its own --margin padding
			row-gap: 0;

			// event cards fill their cell so the hover background spans the full row height
			// (day boxes stay at the top, keeping their 3/2)
			> :global(.card) {
				align-self: stretch;
			}

			.day-indicator {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				scroll-margin-top: var(--margin);
				// top/bottom match the EventCard tags inset
				padding: var(--sp-14) var(--margin);
				aspect-ratio: 3/2; // matches the event card images

				@media (width <= #{$sm}) {
					background-color: var(--white) !important;
					border-top: solid 1px var(--black);
					border-bottom: solid 1px var(--black);
					aspect-ratio: unset;
					scroll-margin-top: var(--menuHeight);
					position: sticky;
					top: var(--menuHeight);
					z-index: 5; // above the fixed Alert (4), below the mobile menu (6): the stuck day header covers the Alert
					flex-direction: row;
					align-items: baseline;

					br { display: none; }
				}
			}

			.no-results {
				margin: var(--sp-36) var(--margin);

				@media (width <= #{$lg}) {
					margin: 0 var(--margin);
				}
			}

			#links {
				position: absolute;
				top: 0;
				right: var(--margin);
				height: 100%;
				pointer-events: none;

				.link {
					position: sticky;
					top: calc(100% - var(--margin) - var(--sp-18) - 2.35em);
					pointer-events: all;
					margin-bottom: var(--margin);
				}
			}

			// e.g. 14" laptop: 3 columns with the Sidebar collapsed, 2 with it open
			@container main (width <= #{$xxl}) {
				grid-template-columns: repeat(3, 1fr);
			}
			@container main (width <= #{$xl}) {
				grid-template-columns: repeat(2, 1fr);
			}
			@media (width <= #{$sm}) {
				grid-template-columns: repeat(1, 1fr);
			}
		}
	}
</style>