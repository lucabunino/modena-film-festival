<script>
	let { data } = $props()
	$inspect(data)

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
    import { urlFor } from '$lib/utils/image';

	const sections = [
		{ name: 'Vista', slug: 'il-cieco-che-non-voleva-vedere-titanic', gradient: 'gradient-y-brown-cyan', img: '/home/1.webp', title: "Il cieco che non voleva vedere titanic" },
		{ name: 'Udito', slug: 'cineconcerto-sherlock-jr', gradient: 'gradient-y-brown-yellow', img: '/home/3.webp', title: "Cineconcerto Sherlock Jr." },
		{ name: 'Tatto', slug: 'thelma-e-louise', gradient: 'gradient-y-brown-red', img: '/home/5.webp', title: "Thelma e Louise" },
		{ name: 'Gusto', slug: 'la-citta-incantata', gradient: 'gradient-y-brown-pink', img: '/home/2.webp', title: "La città incantata" },
		{ name: 'Olfatto', slug: 'odorama-the-truman-show', gradient: 'gradient-y-brown-iris', img: '/home/4.webp', title: "Odorama. The Truman Show" }
	];

	// const prefooter = {
	// 	subtitle: "Diventa volontaria o volontario",
	// 	title: "Entra nello staff MFF",
	// 	content: "Dal 15 al 19 aprile 2026 abbiamo bisogno di te per realizzare il nuovo imperdibile festival in cui Modena vive il cinema con tutti i sensi.",
	// 	cta: {
	// 		label: 'Scopri di più',
	// 		href: '/staff',
	// 	},
	// 	// annotation: '*Lorem ipsum adisciplit esset',
	// 	bg: 'bg-iris',
	// 	// img: '/img/pre-footer-1.png',
	// 	// video: '/img/staff.mp4',
	// 	// poster: '/img/staff.webp',
	// }
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
		// img: '/tickets/abbonamento.webp',
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
		<div class="text">
			<h2 class="wb-12 wb-10-mb uppercase">Film in concorso</h2>
			<p class="wb-24 wb-18-mb max-w-600">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.</p>
		</div>
		<div class="contest-wrapper">
			<div class="contest">
				{#each data.contest as event, i}
				{$inspect(event)}
					<a class="event white" href="/programma/{event.slug.current}">
						{#if event.homepageThumbnail}
							<img class="img" src="{urlFor(event.homepageThumbnail).height(1920)}" alt="Copertina di {event.homepageTitle}">
						{/if}
						{#if event.homepageTitle}<h3 class="title wb-28 wb-18-mb">{event.homepageTitle}</h3>{/if}
						{#if event.homepageSubtitle}<h4 class="subtitle nr-28 nr-18-mb">{event.homepageSubtitle}</h4>{/if}
						<span class="cta btn-m black bg-white hover-white hover-bg-black">Leggi di più</span>
					</a>
				{/each}
			</div>
		</div>
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
		
		.text {
			padding: var(--margin) var(--margin) calc(var(--margin)*2);
			p {
				margin-top: 1.5rem;
			}
		}
		.contest-wrapper {
			width: 100%;
			overflow-x: scroll;

			.contest {
				display: flex;
				width: fit-content;
				
				.event {
					padding: var(--margin);
					width: 23vw;
					height: auto;
					aspect-ratio: 2/3;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					
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
</style>