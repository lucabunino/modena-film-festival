<script>
	import Marquee from 'svelte-fast-marquee';
    import SectionsDesktop from '$lib/components/SectionsDesktop.svelte';
    import PreFooter from '$lib/components/PreFooter.svelte';

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
</script>

<main>
	<section id="hero" class="bg-pink">
		<div>
			<h2 class="wb-12 uppercase">Iscrizioni aperte</h2>
			<h1 class="wb-100">15—19.4.2026</h1>
			<p class="wb-28">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.</p>
		</div>
		<Marquee speed=200 spac>
			<p class="wb-cd-370">{@html 'Open Call Open Call Open Call&nbsp;'}</p>
		</Marquee>
		<a class="btn-l hover-shadow hover-black hover-bg-pink" href="http://" target="_blank" rel="noopener noreferrer">Candida il tuo film</a>
	</section>
	<section id="sections" class="bg-white">
		<div>
			<h2 class="wb-12 uppercase">Titoletto di sezione</h2>
			<h3 class="wb-cd-60 uppercase">Un festival<br>dedicato<br>ai cinque sensi</h3>
			<p class="wb-18">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint.</p>
			<a class="btn-m white bg-black hover-black hover-bg-linen" href="/about">Leggi di più</a>
		</div>
		<SectionsDesktop {sections}/>
	</section>
</main>
<PreFooter {prefooter}/>


<style>
	main {
		padding: 0;
		row-gap: 0;
	}
	section {
		grid-column: 1 / span 8;
	}
	section:last-of-type {
		padding-bottom: unset;
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
			z-index: 0;
		}
		div:nth-child(1) h1 {
			margin-top: 1rem;
		}
		div:nth-child(1) p {
			margin-top: 1rem;
			max-width: 600px;
		}
		p {
			overflow: hidden;
			z-index: 0;
		}
		a {
			position: absolute;
			left: 50%;
			bottom: var(--margin);
			transform: translateX(-50%);
			z-index: 2;
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
		}
		>div:nth-child(1) h3 {
			margin-top: 1rem;
		}
		>div:nth-child(1) p {
			margin-top: 6rem;
		}
		>div:nth-child(1) a {
			margin-top: 2rem;
			pointer-events: all;
		}
	}
</style>