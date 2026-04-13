<script>
    import EventCard from '$lib/components/EventCard.svelte';
    import HeadSingle from '$lib/components/HeadSingle.svelte';
    import Title from '$lib/components/Title.svelte';
    import { formatDateHash, formatDayName, formatDayNumber } from '$lib/utils/datetime.js';
    import { replaceState } from '$app/navigation'; // Use replaceState for shallow updates
    import { page } from '$app/state';
    import PreFooter from '$lib/components/PreFooter.svelte';

    let { data } = $props();
    
    // Initialize state from URL, but keep it local to avoid re-running load()
    let activeDay = $state(page.url.searchParams.get('day') || 'all');
    let activeFormat = $state(page.url.searchParams.get('format') || null);

    // Filter logic remains the same, but reacts to local state
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

    // Optimized helper to update filters without triggering Edge Functions
    function updateFilters(key, value) {
        if (key === 'day') activeDay = value || 'all';
        if (key === 'format') activeFormat = value;

        // Update URL hash/params without re-triggering load()
        const params = new URLSearchParams(window.location.search);
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
        replaceState(newUrl, page.state);
    }

    // Event handlers rewritten to use local state
    function handleDayChange(e) {
        updateFilters('day', e.target.value);
    }

    function handleFormatClick(e, slug) {
        e.preventDefault();
        updateFilters('format', slug);
    }

    // Format counts logic (Keep as derived, it's efficient enough on client)
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

	const prefooter = {
		subtitle: "Abbonamenti disponibili",
		title: "Abbonati al festival",
		content: "L'abbonamento MFF2026 consente l'accesso a tutte le proiezioni e gli eventi del Festival. Non include l'evento di pre-apertura, il <em>Cineconcerto Sherlock Jr.</em>* musicato da Samuel, l'evento speciale olfatto.",
		cta: {
			label: 'Vai a: Biglietti',
			href: '/biglietti',
		},
		annotation: "* Gli abbonati hanno diritto a uno sconto di 5€ su questo evento.",
		bg: 'bg-yellow',
		video: '/tickets/abbonamento-verticale-min.mp4',
		poster: '/tickets/abbonamento-verticale-min.webp',
	}
</script>

{#if data.seo}<HeadSingle seo={data.seo} seoSingle={{ seoTitle: 'Programma' }}/>{/if}

<main class="bg-white">
    <Title subtitles={["Tutte le informazioni sull’intero cartellone del festival, dai film in concorso agli eventi speciali"]} size={'s'} />
    
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
            {#each data.program.formats as format}
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

			{#each day.visibleEvents as event}
				<EventCard {event} />
			{/each}
		{:else}
			<div class="no-results wb-18">
				Nessun evento in programma per questi filtri.
			</div>
		{/each}
	</section>
</main>
<PreFooter {prefooter}/>

<style>
	main {
		row-gap: 0;
		#filters {
			grid-column: 1 / span 8;
			display: flex;
			align-items: baseline;
			column-gap: var(--spacing-s);
			row-gap: var(--spacing-xs);
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

			@media screen and (max-width: 600px) {
				flex-direction: column;
				border: none;
			}
		}
		#program {
			grid-column: 1 / span 8;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: start;
			column-gap: var(--gutter);
			row-gap: var(--spacing-s);

			.day-indicator {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				scroll-margin-top: var(--margin);
				padding: var(--margin);
				aspect-ratio: 16/9;

				@media screen and (max-width: 600px) {
					margin: calc(var(--margin)*-1);
					/* color: var(--white) !important; */
					background-color: var(--white) !important;
					border-top: solid 1px var(--black);
					border-bottom: solid 1px var(--black);
					aspect-ratio: unset;
					/* text-align: center; */
					scroll-margin-top: var(--menuHeight);
					position: sticky;
					top: var(--menuHeight);
					z-index: 2;
					flex-direction: row;
					align-items: baseline;

					br { display: none; }
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
					top: calc(100% - var(--margin) - 1.5rem - 2.35em);
					pointer-events: all;
					margin-bottom: var(--margin);
				}
			}

			@media screen and (max-width: 1280px) {
				grid-template-columns: repeat(2, 1fr);
			}
			@media screen and (max-width: 1080px) {
				padding-top: calc(var(--margin)*2);
			}
			@media screen and (max-width: 600px) {
				grid-template-columns: repeat(1, 1fr);
			}
		}
	}
</style>