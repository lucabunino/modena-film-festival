<script>
	import Marquee from 'svelte-fast-marquee';
    import SectionsDesktop from '$lib/components/SectionsDesktop.svelte';
    import SectionsMobile from '$lib/components/SectionsMobile.svelte';
    import PreFooter from '$lib/components/PreFooter.svelte';
    import NewsWidget from '$lib/components/NewsWidget.svelte';
    import { innerWidth } from 'svelte/reactivity/window';

	const sections = [
		{ name: 'Vista', slug: 'vista', gradient: 'gradient-y-brown-cyan' },
		{ name: 'Udito', slug: 'udito', gradient: 'gradient-y-brown-yellow' },
		{ name: 'Tatto', slug: 'tatto', gradient: 'gradient-y-brown-red' },
		{ name: 'Gusto', slug: 'gusto', gradient: 'gradient-y-brown-pink' },
		{ name: 'Olfatto', slug: 'olfatto', gradient: 'gradient-y-brown-iris' }
	];

	const prefooter = {
		subtitle: "Acquista gli abbonamenti",
		title: "Lorem ipsum eiusque belli 100€",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
		ctaLabel: "Compra ora*",
		ctaLink: "/tickets",
		annotation: '*Lorem ipsum adisciplit esset',
		bg: 'bg-iris',
		img: '/img/pre-footer-1.png',
	}
	const news = [
		{
			title: 'Open Call<br>Modena Film Festival 2026', subtitle: '',
			abstract: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
			ctaLabel: 'Candida il tuo film', ctaHref: 'https://www.google.com/', ctaBlank: true,
		},
		{
			title: 'Open Call<br>Modena Film Festival 2025', subtitle: '',
			ctaLabel: 'Candida il tuo film', ctaHref: 'https://www.google.com/', ctaBlank: true,
		},
		{
			title: 'Open Call<br>Modena Film Festival 2024', subtitle: '',
			abstract: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
			ctaLabel: 'Candida il tuo film', ctaHref: 'https://www.google.com/', ctaBlank: true,
		},
	]
</script>

<main>
	<section id="hero" class="bg-pink">
		<div>
			<h2 class="wb-12 uppercase">Iscrizioni aperte</h2>
			<div class="mobile-only">
				<Marquee speed=100>
					<p class="wb-cd-110-mb marquee">{@html 'Open Call Open Call Open Call&nbsp;'}</p>
				</Marquee>
			</div>
			<h1 class="wb-100 wb-28-mb">15—19.4.2026</h1>
			<p class="wb-28 wb-15-mb">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.</p>
		</div>
		<div class="desktop-only">
			<Marquee speed=200>
				<p class="wb-cd-370 marquee">{@html 'Open Call Open Call Open Call&nbsp;'}</p>
			</Marquee>
		</div>
		<a class="btn-l hover-black hover-bg-linen" href="https://www.google.com/" target="_blank" rel="noopener noreferrer">Candida il tuo film</a>
	</section>
	<NewsWidget {news}/>
	<section id="sections" class="bg-white">
		<div>
			<h2 class="wb-12 wb-10-mb uppercase">Titoletto di sezione</h2>
			<h3 class="wb-cd-60 wb-cd-40-mb uppercase">Un festival <br>dedicato <br>ai cinque sensi</h3>
			<SectionsMobile {sections}/>
			<p class="wb-18 wb-15-mb">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint.</p>
			<a class="btn-m white bg-black hover-black hover-bg-linen" href="/festival">Leggi di più</a>
		</div>
		<SectionsDesktop {sections}/>
	</section>
</main>
<!-- <PreFooter {prefooter}/> -->


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
	#hero {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
		
		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background: url("/hero/bg.svg") repeat-x left center;
			background-size: auto 100%;
			pointer-events: none;
			z-index: 0;
		}
		&::after {
			content: "";
			position: absolute;
			inset: 0;
			background: url("/hero/fg.svg") repeat-x left center;
			background-size: auto 100%;
			pointer-events: none;
			z-index: 1;
		}
		div:nth-child(1) {
			padding: var(--margin);
			position: relative;
			z-index: 2;
			overflow: hidden;

			h1 {
				margin-top: 1rem;
			}

			p {
				margin-top: 1rem;
				width: 100%;
				max-width: 600px;
			}
		}
		.marquee {
			overflow: hidden;
			z-index: 0;
			user-select: none;
		}
		a {
			position: absolute;
			left: 50%;
			bottom: var(--margin);
			transform: translateX(-50%);
			z-index: 2;
		}

		@media screen and (max-width: 1080px) {
			height: auto;
			width: calc(100vw - var(--margin)*2);
			border-radius: 3rem;
			margin: var(--spacing-xs) var(--margin);
			display: grid;

			div:nth-child(1) {
				padding: 3rem 0 var(--margin);

				h2 {
					margin: 0 var(--margin);
				}

				h1 {
					margin: var(--spacing-xs) var(--margin) 0;
				}

				p {
					margin: var(--spacing-m) var(--margin) 0;
					width: stretch;
				}
				.marquee {
					margin: 1rem 0 0;
					max-width: unset;
				}
			}
			a {
				position: relative;
				left: unset;
				margin: 0 var(--margin) var(--margin);
				bottom: unset;
				transform: unset;
				text-align: center;
			}
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