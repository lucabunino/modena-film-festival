<script>
	import Media from '$lib/components/Media.svelte'
    import Title from "$lib/components/Title.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import Juror from "$lib/components/Juror.svelte";
    import RichText from "$lib/components/RichText.svelte";
	import { register } from 'swiper/element/bundle';register();
    import { getResponsive } from "$lib/stores/responsive.svelte.js";
    const responsive = getResponsive()
	// edition: the Edition's archive content (getEdition)
	// current: rendered as the current-edition /festival (no jury, no year in the title; regulations link to the current page)
	let { edition, current = false } = $props()
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
	const showJury = $derived(!current && (edition.juries?.length > 0 || edition.jurors?.length > 0))
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
			<Media class="cover _4_3 rounded-m" src={festivalSection.cover} alt="Cover per {festivalSection.title}" />
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
	<Navigator title="Festival" {sections} cta={{label: 'Diventa sponsor', href: '/partner/diventa-sponsor'}}/>
	<Title title={current ? 'Modena<br>Film Festival' : `Modena<br>Film Festival<br>${edition.year}`} size="l"/>
	<section id="event" title="Evento" bind:this={sections[0]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Evento</h2>
		<RichText value={edition.festivalEvent} block="wb-28 wb-18-mb max-w-800" />
	</section>
	<!-- SEZIONI
	<section id="festival-sections" title="Sezioni" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Sezioni</h2>
		<p class="wb-28 wb-18-mb max-w-800">Tutto all’insegna della qualità e della varietà: 11 sezioni, 3 concorsi e 20 premi. Questa l’architettura di un Festival che esplora il cinema a 360°. Per scoprire nel presente gli autori e i film destinati ad avere futuro.</p>
		<p class="wb-18 wb-15-mb max-w-500">Tutto all’insegna della qualità e della varietà: 11 sezioni, 3 concorsi e 20 premi. Questa l’architettura di un Festival che esplora il cinema a 360°. Per scoprire nel presente gli autori e i film destinati ad avere futuro.</p>
		{#if responsive.overLg}
			<div class="festival-sections">
				{#each festivalSections as festivalSection, i (festivalSection.slug)}
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
				{#each festivalSections as festivalSection, i (festivalSection.slug)}
					<swiper-slide>
						{@render section(festivalSection, i)}
					</swiper-slide>
				{/each}
			</swiper-container>
		{/if}
	</section> -->
	{#if showJury}
	<section id="jury" title="Giuria" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Giuria</h2>
		{#if edition.juriesIntro}
			<p class="wb-24 wb-18-mb max-w-800">{edition.juriesIntro}</p>
		{/if}
		{#each edition.juries ?? [] as jury (jury._key)}
			<p class="wb-24 wb-18-mb max-w-800">✳ <em>{jury.title}</em>{#if jury.description}<br>{jury.description}{/if}</p>
		{/each}
		<div class="jury">
			{#each edition.jurors ?? [] as juror (juror._key)}
				<Juror {juror}/>
			{/each}
		</div>
	</section>
	{/if}
	<!-- current /festival has no Giuria, so Regolamento moves up one slot in the Navigator -->
	{#if edition.rulesTeaser?.length}
	<section id="regulations" title="Regolamento" bind:this={sections[showJury ? 2 : 1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Regolamento</h2>
		<RichText value={edition.rulesTeaser} block="wb-28 wb-18-mb max-w-800" />
		<a class="btn-l" href={current ? '/festival/regolamento' : `/${edition.slug}/festival/regolamento`}>Leggi il regolamento</a>
	</section>
	{/if}
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
#event {
	:global(p + p) {
		margin-top: .6em;
	}
}
#festival-sections {
	.festival-sections {
		display: grid;
		margin-top: var(--sp-48);
		grid-template-columns: repeat(3, 1fr);
		column-gap: var(--gutter);
		row-gap: var(--sp-48);
		
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
				margin-top: var(--sp-14);
			}
			p {
				margin-top: var(--sp-18);
			}
			a {
				margin-top: var(--sp-18);
			}
		}

		@container main (width <= #{$xl}) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (width <= #{$lg}) {
			grid-template-columns: repeat(1, 1fr);
			margin: var(--sp-48) calc(var(--margin)*-1) 0;
			opacity: 0;

			&.visible {
				opacity: 1;
			}
		}
	}
}
#jury {
	p + p {
		margin-top: .6em;
	}
	.jury {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		column-gap: var(--gutter);
		row-gap: var(--sp-48);
		margin-top: var(--sp-48);

		@container main (width <= #{$xl}) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (width <= #{$md}) {
			grid-template-columns: repeat(1, 1fr);
		}
	}
}
#regulations {
	a {
		margin-top: var(--sp-24);
	}
}
</style>