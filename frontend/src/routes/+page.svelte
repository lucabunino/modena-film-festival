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

	const sections = [
		{ name: 'Vista', slug: 'vista', gradient: 'gradient-y-brown-cyan' },
		{ name: 'Udito', slug: 'udito', gradient: 'gradient-y-brown-yellow' },
		{ name: 'Tatto', slug: 'tatto', gradient: 'gradient-y-brown-red' },
		{ name: 'Gusto', slug: 'gusto', gradient: 'gradient-y-brown-pink' },
		{ name: 'Olfatto', slug: 'olfatto', gradient: 'gradient-y-brown-iris' }
	];

	const prefooter = {
		subtitle: "Diventa volontaria o volontario",
		title: "Entra nello staff MFF",
		content: "Dal 15 al 19 aprile 2026 abbiamo bisogno di te per realizzare il nuovo imperdibile festival in cui Modena vive il cinema con tutti i sensi.",
		cta: {
			label: 'Scopri di più',
			href: '/staff',
		},
		// annotation: '*Lorem ipsum adisciplit esset',
		bg: 'bg-iris',
		// img: '/img/pre-footer-1.png',
		// video: '/img/staff.mp4',
		// poster: '/img/staff.webp',
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

<main>
	{#if data.landing?.layout == '1'}
		<Landing1 landing={data.landing} />
	{:else if data.landing?.layout == '2'}
		<Landing2 landing={data.landing} />
	{/if}
	<NewsWidget newses={data.widgetNewses}/>
	<section id="sections" class="bg-white">
		<div>
			<h2 class="wb-12 wb-10-mb uppercase">Il Festival</h2>
			<h3 class="wb-cd-60 wb-cd-40-mb uppercase">Un Festival <br>dedicato <br>ai cinque sensi</h3>
			<SectionsMobile {sections}/>
			<p class="wb-18 wb-15-mb">Opere che coinvolgono lo spettatore in esperienze sensoriali innovative, che riflettono sul cinema stesso come arte visiva e sonora, o che utilizzano i sensi come metafora per esplorare tematiche contemporanee.</p>
			<a class="btn-m white bg-black hover-black hover-bg-linen" href="/festival">Leggi di più</a>
		</div>
		<SectionsDesktop {sections}/>
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
</style>