<script>
    import Title from "$lib/components/Title.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import Juror from "$lib/components/Juror.svelte";
    import PreFooter from "$lib/components/PreFooter.svelte";
	import { register } from 'swiper/element/bundle';register();
    import { innerWidth } from "svelte/reactivity/window";
	let sections = $state([])
	let visible = $state(false)
	let swiperEl = $state(undefined)	
	const festivalSections = [
		{title: 'Titolo sezione vista', sense: 'Vista', slug: 'vista', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', bg: 'gradient-xy-linen-white'},
		{title: 'Titolo sezione udito', sense: 'Udito', slug: 'udito', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', bg: 'gradient-xy-linen-white'},
		{title: 'Titolo sezione tatto', sense: 'Tatto', slug: 'tatto', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', bg: 'gradient-xy-linen-white'},
		{title: 'Titolo sezione gusto', sense: 'Gusto', slug: 'gusto', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', bg: 'gradient-xy-linen-white'},
		{title: 'Titolo sezione olfatto', sense: 'Vista', slug: 'olfatto', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', bg: 'gradient-xy-linen-white'},
	]
	const jury = [
		{name: 'Federico', surname: 'Fellini', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Monica', surname: 'Vitti', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Vittorio', surname: 'De Sica', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Anna', surname: 'Magnani', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Luchino', surname: 'Visconti', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Gina', surname: 'Lollobrigida', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Roberto', surname: 'Rossellini', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Marcello', surname: 'Mastroianni', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Silvana', surname: 'Mangano', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Nino', surname: 'Manfredi', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Alberto', surname: 'Sordi', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
		{name: 'Sophia', surname: 'Loren', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
	]
	const swiperParams = {
		slidesPerView: 1.25,
		active: true,
		breakpoints: {
			576: {
				slidesPerView: 2.25,
			},
			768: {
				slidesPerView: 3.25,
			},
			768: {
				active: false,
			},
		}
	};
	$effect(() => {
		if (swiperEl) {
			Object.assign(swiperEl, swiperParams);
			swiperEl.initialize();	
		}
	
		setTimeout(() => {
			visible = true
		}, 50);
	})
</script>

{#snippet section(festivalSection, i)}
	<div class="festival-section" title={festivalSection.title}>
		{#if festivalSection.cover}
			<img class="cover _4_3 rounded-m" src={festivalSection.cover} alt="Cover per {festivalSection.title}">
		{:else}
			<div class="placeholder _4_3 rounded-m {festivalSection.bg ? festivalSection.bg : 'gradient-xy-pink-brown'}"></div>
		{/if}
		<span class="tag wb-12 wb-10-mb uppercase">{festivalSection.sense}</span>
		<h3 class="wb-cd-45 wb-cd-24-mb uppercase max-w-400">{festivalSection.title}</h3>
		<p class="max-w-400">{festivalSection.abstract}</p>
		<a class="btn-m" href="/sezioni/{festivalSection.slug}">Leggi di più</a>
	</div>
{/snippet}

<main class="bg-pink">
	<Navigator title="Festival" {sections} cta={{label: 'Diventa sponsor', href: '/partner/sponsor'}}/>
	<Title title='Modena<br>Film Festival<br>2026' size={'l'}/>
	<section id="adiscplit" title="Adisciplit" bind:this={sections[0]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Adisciplit</h2>
		<p class="wb-28 wb-18-mb max-w-800">Da quasi ottant’anni, Locarno è sinonimo di cinema d’autore e di grandi protagonisti del panorama internazionale. Con un programma che unisce il meglio della produzione svizzera e mondiale, il Festival parla a tutti gli amanti del cinema, dal grande pubblico ai cinefili più esigenti. Nel cuore del Festival si trova la Piazza Grande, il più grande cinema all’aperto d’Europa, che accoglie ogni sera migliaia di spettatori.</p>
	</section>
	<section id="festival-sections" title="Sezioni" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Sezioni</h2>
		<p class="wb-18 wb-15-mb max-w-500">Tutto all’insegna della qualità e della varietà: 11 sezioni, 3 concorsi e 20 premi. Questa l’architettura di un Festival che esplora il cinema a 360°. Per scoprire nel presente gli autori e i film destinati ad avere futuro.</p>

		{#if innerWidth.current > 1080}
			<div class="festival-sections">
				{#each festivalSections as festivalSection, i}
						{@render section(festivalSection, i)}
				{/each}
			</div>
		{:else}
			<swiper-container class="festival-sections {visible ? 'visible' : ''}"
			init="false"
			autoplay={{
				delay: 3000,
				disableOnInteraction: true,
			}}
			space-between={10}
			slides-offset-before={15}
			slides-offset-after={15}
			mousewheel={{
				forceToAxis: true,
			}}
			grabCursor={true}
			speed={300}
			bind:this={swiperEl}
			>
				{#each festivalSections as festivalSection, i}
					<swiper-slide>
						{@render section(festivalSection, i)}
					</swiper-slide>
				{/each}
			</swiper-container>
		{/if}
	</section>
	<section id="jury" title="Giuria" bind:this={sections[2]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Giuria</h2>
		<div class="jury">
			{#each jury as juror, i}
				<Juror {juror}/>
			{/each}
		</div>
	</section>
	<section id="regulations" title="Regolamento" bind:this={sections[3]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Regolamento</h2>
		<p class="wb-28 wb-18-mb max-w-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
		<a class="btn-l" href="/festival/regolamento">Regolamento completo</a>
	</section>
</main>

<style>
#festival-sections {
	.festival-sections {
		display: grid;
		margin-top: var(--spacing-s);
		grid-template-columns: repeat(3, 1fr);
		column-gap: var(--gutter);
		row-gap: var(--spacing-s);
		
		.festival-section {
			position: relative;
			.tag {
				position: absolute;
				left: 0;
				top: 0;
				padding: .5em 1em;
				background-color: var(--white);
				left: 10px;
				top: 10px;
			}
			h3 {
				margin-top: 1.2rem;
			}
			p {
				margin-top: 1.5rem;
			}
			a {
				margin-top: 1.5rem;
			}
		}

		@media screen and (max-width: 1440px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media screen and (max-width: 1080px) {
			grid-template-columns: repeat(1, 1fr);
			margin: var(--spacing-s) calc(var(--margin)*-1) 0;
			opacity: 0;

			&.visible {
				opacity: 1;
			}
		}
	}
}
#jury {
	.jury {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: var(--gutter);
		row-gap: var(--spacing-s);

		@media screen and (max-width: 1440px) {
			grid-template-columns: repeat(3, 1fr);
		}
		@media screen and (max-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media screen and (max-width: 392px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}
}
#regulations {
	a {
		margin-top: 2rem;
	}
}
</style>