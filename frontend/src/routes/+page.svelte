<script>
	let { data } = $props()

	import Marquee from 'svelte-fast-marquee';
    import SectionsDesktop from '$lib/components/SectionsDesktop.svelte';
    import SectionsMobile from '$lib/components/SectionsMobile.svelte';
    import NewsWidget from '$lib/components/NewsWidget.svelte';
    import { innerWidth } from 'svelte/reactivity/window';
    import Landing1 from '$lib/components/Landing1.svelte';
    import Landing2 from '$lib/components/Landing2.svelte';
    import LandingTickets from '$lib/components/LandingTickets.svelte';
    import { page } from '$app/state';
    import ContestSlider from '$lib/components/ContestSlider.svelte';
    import ProgramSection from '$lib/components/ProgramSection.svelte';
	
	// the Editorial's special events, one card per sense; a hidden event is a locked card with its own coming-soon image
	const gradients = ['gradient-y-brown-cyan', 'gradient-y-brown-yellow', 'gradient-y-brown-red', 'gradient-y-brown-pink', 'gradient-y-brown-iris'];
	const sections = $derived(data.specialEvents.map((event, i) => {
		const locked = event.status === 'hidden';
		return {
			name: event.sense,
			slug: event.slug,
			gradient: gradients[i % gradients.length],
			image: event.image,
			// no image: generic placeholder photo while locked, sense gradient once public
			img: locked && !event.image ? '/img/mff-placeholder.webp' : undefined,
			lqip: locked && !event.image ? '/img/mff-placeholder-lqip.webp' : undefined,
			title: locked ? 'Coming soon' : event.title,
			event: event.title,
			locked,
		};
	}));

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


	// const newses = [
	// 	{
	// 		title: "Cineconcerto live con Samuel",
	// 		widgetAbstract: "Nell’evento speciale dedicato all’udito <em>Sherlock Jr.</em> di Buster Keaton e la musica contemporanea si fondono in un dialogo potente e sorprendente.",
	// 		widgetCta: {
	// 			label: "Scopri di più",
	// 			href: "/programma/cineconcerto-sherlock-jr",
	// 			blank: false
	// 		}
	// 	},
	// ]
</script>


<main>
	<!-- landing layout: '1' / '2' (tall) or '1-full' / '2-full' (whole screen) -->
	{#if data.landing?.layout?.startsWith('1')}
		<Landing1 landing={data.landing} />
	{:else if data.landing?.layout?.startsWith('2')}
		<Landing2 landing={data.landing} />
	{/if}
	<!-- <LandingTickets /> -->
	{#if data.newsWidget.length}
	 	<NewsWidget newses={data.newsWidget}/>
	{/if}
	{#if sections.length}
	<section id="sections" title="Il Festival" class="bg-white">
		<div>
			<h2 class="wb-12 wb-10-mb uppercase">Il Festival</h2>
			<h3 class="wb-cd-60 wb-cd-40-mb uppercase">Un Festival <br>dedicato <br>ai cinque sensi</h3>
			<SectionsMobile {sections}/>
			<p class="wb-18 wb-15-mb">Opere che coinvolgono lo spettatore in esperienze sensoriali innovative, che riflettono sul cinema stesso come arte visiva e sonora, o che utilizzano i sensi come metafora per esplorare tematiche contemporanee.</p>
			{#if data.program?.days?.length}
				<a class="btn-m white bg-black hover-black hover-bg-linen" href="/programma">Vedi il programma</a>
			{/if}
		</div>
		<SectionsDesktop {sections}/>
	</section>
	{/if}
	{#if data.contest?.length}
		<ContestSlider contest={data.contest} />
	{/if}
	{#if data.program?.days?.length}
		<ProgramSection program={data.program} />
	{/if}
</main>


<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	main {
		padding: 0;
		row-gap: 0;

		> :global(section) {
			grid-column: 1 / span 8;
		}
	}
	#sections {
		padding: var(--sp-144) var(--sp-96);
		position: relative;
		overflow: hidden;

		>div:nth-child(1) {
			max-width: 500px;
			position: relative;
			z-index: 2;
			pointer-events: none;

			h3 {
				margin-top: var(--sp-12);
			}

			p {
				margin-top: var(--sp-72);
			}

			a {
				margin-top: var(--sp-24);
				pointer-events: all;
			}
		}

		@media (width <= #{$lg}) {
			padding: var(--sp-96) 0;
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
					margin-top: var(--sp-48);
				}

				a {
					margin: var(--sp-24) var(--margin) 0;
				}
			}
		}
	}
</style>