<script>
	let { data } = $props()

	import Marquee from 'svelte-fast-marquee';
    import SectionsDesktop from '$lib/components/SectionsDesktop.svelte';
    import SectionsMobile from '$lib/components/SectionsMobile.svelte';
    import PreFooter from '$lib/components/PreFooter.svelte';
    import NewsWidget from '$lib/components/NewsWidget.svelte';
    import { innerWidth } from 'svelte/reactivity/window';
    import Landing1 from '$lib/components/Landing1.svelte';
    import Landing2 from '$lib/components/Landing2.svelte';
    import HeadSingle from '$lib/components/HeadSingle.svelte';
    import LandingTickets from '$lib/components/LandingTickets.svelte';
    import { urlFor } from '$lib/utils/image.js';
    import { page } from '$app/state';
    import EventCard from '$lib/components/EventCard.svelte';
    import { formatDateHash, formatDayName, formatDayNumber } from '$lib/utils/datetime.js';

	const sections = [
		{ name: 'Vista', slug: 'il-cieco-che-non-voleva-vedere-titanic', gradient: 'gradient-y-brown-cyan', img: '/home/1.webp', title: "Il cieco che non voleva vedere titanic" },
		{ name: 'Udito', slug: 'cineconcerto-sherlock-jr', gradient: 'gradient-y-brown-yellow', img: '/home/3.webp', title: "Cineconcerto Sherlock Jr." },
		{ name: 'Tatto', slug: 'thelma-e-louise', gradient: 'gradient-y-brown-red', img: '/home/5.webp', title: "Thelma e Louise" },
		{ name: 'Gusto', slug: 'la-citta-incantata', gradient: 'gradient-y-brown-pink', img: '/home/2.webp', title: "La città incantata" },
		{ name: 'Olfatto', slug: 'odorama-the-truman-show', gradient: 'gradient-y-brown-iris', img: '/home/4.webp', title: "Odorama. The Truman Show" }
	];
	// const sections = [
	// 	{ name: 'Vista', slug: 'vista', gradient: 'gradient-y-brown-cyan', title: "Maggiori info a breve" },
	// 	{ name: 'Udito', slug: 'udito', gradient: 'gradient-y-brown-yellow', title: "Maggiori info a breve" },
	// 	{ name: 'Tatto', slug: 'tatto', gradient: 'gradient-y-brown-red', title: "Maggiori info a breve" },
	// 	{ name: 'Gusto', slug: 'gusto', gradient: 'gradient-y-brown-pink', title: "Maggiori info a breve" },
	// 	{ name: 'Olfatto', slug: 'olfatto', gradient: 'gradient-y-brown-iris', title: "Maggiori info a breve" }
	// ];

	const prefooter = {
		subtitle: "Abbonamenti disponibili",
		title: "Abbonati al festival",
		content: "L'abbonamento MFF2026 consente l'accesso a tutte le proiezioni e gli eventi del Festival. Non include l'evento di pre-apertura <em>Cineconcerto Grand Tour Italiano</em>, il <em>Cineconcerto Sherlock Jr.</em>* e <em>Odorama. The Truman Show</em>.",
		cta: {
			label: 'Vai a: Biglietti',
			href: '/biglietti',
		},
		annotation: "* Gli abbonati hanno diritto a uno sconto di 5€ su questo evento.",
		bg: 'bg-yellow',
		video: '/tickets/abbonamento-verticale-min.mp4',
		poster: '/tickets/abbonamento-verticale-min.webp',
	}
	const news = [
		{
			title: 'Open Call<br>Modena Film Festival 2026', subtitle: '',
			abstract: 'Avviata la call ufficiale per le candidature al Modena Film Festival 2026.',
			cta: {
				label: 'Candida il tuo film',
				href: 'https://filmfreeway.com/festivals/93026?utm_campaign=Modena+Film+Festival&utm_medium=External&utm_source=Submission+Button',
				blank: true
			}
		},
	]
	let shaking = $state(false);
	function handleLockedclick(e) {e.preventDefault(); if (shaking) return; shaking = true; setTimeout(() => (shaking = false), 600); }

	const activeDay = $derived(page.url.searchParams.get('day') || (data.program?.days?.[0] ? formatDateHash(data.program.days[0].date) : null));
    let activeFormat = $derived(page.url.searchParams.get('format'));
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

	function handleDayChange(e) {
        const value = e.target.value;
        const newUrl = getFilterUrl('day', value === 'all' ? null : value);
        goto(newUrl, { noscroll: true, keepfocus: true });
    }
    function getFilterUrl(key, value) {
        const params = new URLSearchParams(page.url.searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        const queryString = params.toString();
        return queryString ? `?${queryString}` : page.url.pathname;
    }
</script>

<HeadSingle seo={data.seo} seoSingle={false}/>

<main>
	<!-- {#if data.landing?.layout == '1'}
		<Landing1 landing={data.landing} />
	{:else if data.landing?.layout == '2'}
		<Landing2 landing={data.landing} />
	{/if} -->
	<LandingTickets />
	<NewsWidget newses={data.widgetNewses}/>
	<section id="sections" title="Il Festival" class="bg-white">
		<div>
			<h2 class="wb-12 wb-10-mb uppercase">Il Festival</h2>
			<h3 class="wb-cd-60 wb-cd-40-mb uppercase">Un Festival <br>dedicato <br>ai cinque sensi</h3>
			<SectionsMobile {sections}/>
			<p class="wb-18 wb-15-mb">Opere che coinvolgono lo spettatore in esperienze sensoriali innovative, che riflettono sul cinema stesso come arte visiva e sonora, o che utilizzano i sensi come metafora per esplorare tematiche contemporanee.</p>
			<a class="btn-m white bg-black hover-black hover-bg-linen" href="/programma">Vedi il programma</a>
		</div>
		<SectionsDesktop {sections}/>
	</section>
	<section id="contest" class="bg-linen" title="Film in concorso">
		<div class="text-wrapper">
			<h2 class="wb-12 wb-10-mb uppercase">Film in concorso</h2>
			<p class="wb-24 wb-18-mb max-w-600">I cinque sensi rappresentano il nostro primo e più immediato contatto con la realtà: attraverso di essi facciamo esperienza di conoscenza, memoria ed emozione.</p>
		</div>
		<div class="contest-wrapper">
			<div class="contest">
				{#each data.contest as event, i}
					<a class="event white" href="/programma/{event.slug.current}">
						{#if event.homepageThumbnail}
							<img class="img" src="{urlFor(event.homepageThumbnail).height(1920)}" alt="Copertina di {event.homepageTitle}">
						{/if}
						{#if event.homepageTitle}<h3 class="title wb-28 wb-18-mb">{event.homepageTitle}</h3>{/if}
						{#if event.homepageSubtitle}<h4 class="subtitle nr-28 nr-21-mb">{event.homepageSubtitle}</h4>{/if}
						<span class="cta btn-m black bg-white hover-bg-linen">Leggi di più</span>
					</a>
				{/each}
			</div>
		</div>
	</section>
	<section id="program" class="bg-white" title="Programma">
		<div class="text-wrapper">
			<h2 class="wb-12 wb-10-mb uppercase">Programma</h2>
			<p class="wb-24 wb-18-mb max-w-600">Tutte le informazioni sull’intero cartellone del festival, dai film in concorso agli eventi speciali.</p>
			<div class="days wb-12 wb-10-mb uppercase">
				<span>Giorni: </span>
				{#each data.program.days as day, i}
					<a href={getFilterUrl('day', formatDateHash(day.date))} class="filter btn-m {activeDay === formatDateHash(day.date) ? 'bg-black white' : 'bg-linen'} hover-bg-black" data-sveltekit-noscroll>{formatDayName(day.date).substring(0, 3)} {formatDayNumber(day.date)}</a>
				{/each}
			</div>
		</div>
		{#each filteredDays as day, i}
			{#key day}
				<p class="day-title wb-cd-170 desktop-only">{formatDayName(day.date)} {formatDayNumber(day.date)}</p>
				<div class="day-wrapper">
					<div class="day">
						{#each day.visibleEvents as event, j}
							<div class="event-wrapper">
								<EventCard {event} />
							</div>
						{/each}
					</div>
				</div>
			{/key}
		{/each}
		<a class="cta btn-xs uppercase" href="/programma">Vedi il programma completo →</a>
	</section>
</main>
<PreFooter {prefooter}/>


<style>
	main {
		padding: 0;
		row-gap: 0;

		section {
			grid-column: 1 / span 8;
		}

		@media screen and (max-width: 1080px) {
			margin-top: calc(var(--menuHeight) + var(--spacing-xs));
		}
	}
	#sections {
		padding: var(--spacing-l) var(--spacing-m);
		position: relative;
		overflow: hidden;

		>div:nth-child(1) {
			max-width: 500px;
			position: relative;
			z-index: 2;
			pointer-events: none;

			h3 {
				margin-top: 1rem;
			}

			p {
				margin-top: 6rem;
			}

			a {
				margin-top: 2rem;
				pointer-events: all;
			}
		}

		@media screen and (max-width: 1080px) {
			padding: var(--spacing-m) 0;
			width: 100%;
			
			>div:nth-child(1) {
				max-width: unset;
				pointer-events: all;

				h2 {
					padding: 0 var(--margin);
				}
				h3 {
					padding: 0 var(--margin);

					br {
						display: none;
					}
				}

				p {
					padding: 0 var(--margin);
					margin-top: var(--spacing-s);
				}

				a {
					margin: 2rem var(--margin) 0;
				}
			}
		}
	}
	#contest {
		padding-bottom: 0;
		
		.text-wrapper {
			padding: var(--margin) var(--margin) calc(var(--margin)*2);
			p {
				margin-top: 1.5rem;
			}
		}
		.contest-wrapper {
			width: 100%;
			overflow-x: scroll;
			-ms-overflow-style: none;
			scrollbar-width: none; 

			&::-webkit-scrollbar {
				display: none;
			}


			.contest {
				display: flex;
				width: fit-content;
				
				.event {
					padding: var(--margin);
					width: 23vw;
					min-width: 350px;
					height: auto;
					aspect-ratio: 2/3;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;

					@media screen and (max-width: 1280px) {
						min-width: 300px;
					}

					@media screen and (max-width: 1080px) {
						min-width: 250px;
					}
					
					.img {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
					.title,
					.subtitle {
						z-index: 1;
					}
					.cta {
						position: absolute;
						left: var(--margin);
						bottom: var(--margin);
					}
				}
			}
		}
	}
	#program {
		padding-bottom: var(--margin);

		.text-wrapper {
			padding: var(--margin) var(--margin) var(--gutter);
			p {
				margin-top: 1.5rem;
				margin-bottom: 1.5rem;
			}
		}
		.days {
			display: flex;
			flex-wrap: wrap;
			column-gap: .2em;
			row-gap: .4em;
			align-items: baseline;

			span {
				margin-right: 1em;
			}
		}
		.day-title {
			margin: 0 var(--margin);
			padding: var(--margin) 0;
			border-bottom: solid 1px var(--black);
		}
		.day-wrapper {
			overflow-x: scroll;
			-ms-overflow-style: none;
			scrollbar-width: none; 

			&::-webkit-scrollbar {
				display: none;
			}

			.day {
				display: flex;
				padding: var(--margin);
				width: fit-content;
				gap: var(--gutter);

				.event-wrapper {
					width: 26vw;
					min-width: 350px;

					@media screen and (max-width: 1280px) {
						min-width: 300px;
					}

					@media screen and (max-width: 1080px) {
						min-width: 250px;
					}
				}
			}
		}
		.cta {
			margin: var(--spacing-m) var(--margin) var(--margin);

			@media screen and (max-width: 1080px) {
				margin: var(--spacing-xs) var(--margin) var(--margin);
			}
		}
	}
</style>