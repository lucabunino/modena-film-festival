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
    import LandingTickets from '$lib/components/LandingTickets.svelte';
    import { page } from '$app/state';
    import ContestSlider from '$lib/components/ContestSlider.svelte';
    import ProgramSection from '$lib/components/ProgramSection.svelte';
	
	const sections = [
		{ name: 'Vista', slug: 'il-cieco-che-non-voleva-vedere-titanic', gradient: 'gradient-y-brown-cyan', img: '/img/mff-placeholder.webp', lqip: '/img/mff-placeholder-lqip.webp', title: "Coming soon", locked: true },
		{ name: 'Udito', slug: 'cineconcerto-sherlock-jr', gradient: 'gradient-y-brown-yellow', img: '/img/mff-placeholder.webp', lqip: '/img/mff-placeholder-lqip.webp', title: "Coming soon", locked: true },
		{ name: 'Tatto', slug: 'thelma-e-louise', gradient: 'gradient-y-brown-red', img: '/img/mff-placeholder.webp', lqip: '/img/mff-placeholder-lqip.webp', title: "Coming soon", locked: true },
		{ name: 'Gusto', slug: 'la-citta-incantata', gradient: 'gradient-y-brown-pink', img: '/img/mff-placeholder.webp', lqip: '/img/mff-placeholder-lqip.webp', title: "Coming soon", locked: true },
		{ name: 'Olfatto', slug: 'odorama-the-truman-show', gradient: 'gradient-y-brown-iris', img: '/img/mff-placeholder.webp', lqip: '/img/mff-placeholder-lqip.webp', title: "Coming soon", locked: true }
	];

	const prefooter = {
		subtitle: "Diventa sponsor",
		title: "Sponsorizza <br>il Modena Film Festival 2027",
		content: "Unisciti alla visione del Modena Film Festival. <br>Sostenere il Festival significa legare il proprio brand alla cultura, all'innovazione e al territorio, garantendo visibilità esclusiva e accesso a un network unico di professionisti e appassionati.",
		cta: {
			label: 'Diventa sponsor',
			href: '/partner/diventa-sponsor',
		},
		// annotation: "* Gli abbonati hanno diritto a uno sconto di 5€ su questo evento.",
		bg: 'bg-red',
		// video: '/tickets/abbonamento-verticale-min.mp4',
		img: '/img/_1hs1706.webp',
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
	{#if data.landing?.layout == '1'}
		<Landing1 landing={data.landing} />
	{:else if data.landing?.layout == '2'}
		<Landing2 landing={data.landing} />
	{/if}
	<!-- <LandingTickets /> -->
	{#if data.widgetNewses}
	 	<NewsWidget newses={data.widgetNewses}/>
	{/if}
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
	<ContestSlider contest={data.contest} />
	<ProgramSection program={data.program} />
</main>
<PreFooter {prefooter}/>


<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	main {
		padding: 0;
		row-gap: 0;

		> :global(section) {
			grid-column: 1 / span 8;
		}

		@media (width <= #{$lg}) {
			margin-top: calc(var(--menuHeight) + var(--sp-24));
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