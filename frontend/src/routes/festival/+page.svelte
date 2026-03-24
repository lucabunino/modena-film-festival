<script>
    import Title from "$lib/components/Title.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import Juror from "$lib/components/Juror.svelte";
    import PreFooter from "$lib/components/PreFooter.svelte";
	import { register } from 'swiper/element/bundle';register();
    import { innerWidth } from "svelte/reactivity/window";
	import HeadSingle from "$lib/components/HeadSingle.svelte";
	let { data } = $props()
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
		{name: 'Elisa', surname: 'Dondi', country: 'Italia', portrait: '/jury/elisa-dondi.webp', bio: [
			"Elisa Dondi (Modena, 1987) vive e lavora a Roma. Nel 2015 si diploma al Centro Sperimentale di Cinematografia di Roma come sceneggiatrice con il cortometraggio La Santa che Dorme, selezionato in concorso al Festival di Cannes 2016, sezione Cinéfondation.",
			"Per il cinema firma la sceneggiatura del film Piccolo Corpo di L. Samani, in concorso alla Semaine de la Critique, Cannes 2021 e del film Un anno di scuola di L. Samani in concorso al Festival di Venezia 2025, sezione Orizzonti.",
			"Ha firmato diverse serie televisive tra le quali Lidia Poet di Matteo Rovere e Letizia Lamartire, ACAB di Michele Alhaique e Storia della mia famiglia di Claudio Cupellini.",
			"Da Marzo 2023 è membro della giuria dell’European Film Accademy."
		]},
		{name: 'Marco', surname: 'Righi', country: 'Italia', portrait: '/jury/marco-righi.webp', bio: [
			"Marco Righi (Reggio Emilia, 1983) vive e lavora a Reggio Emilia. Ha studiato regia e montaggio e nel 2009 ha fondato 505, studio di comunicazione specializzato in post-produzione video.",
			"I giorni della vendemmia (2010), il suo film d'esordio, ha partecipato a oltre 40 festival internazionali, ottenendo il riconoscimento di interesse culturale del MiC e il riconoscimento d'essai dalla FICE. Nel 2022 ha scritto e diretto Il vento soffia dove vuole, acquisito dal sales agent TVCO al Marché du Film di Cannes 2023 e selezionato come unico titolo italiano in Concorso Ufficiale nella selezione principale del Karlovy Vary International Film Festival."
		]},
		{name: 'Marino', surname: 'Neri', country: 'Italia', portrait: '/jury/marino-neri.webp', bio: [
			"Marino Neri (Carpi, 1979). Dopo le graphic novel Il re dei fiumi (Kappa edizioni, 2008) e La coda del lupo (Canicola, 2011), tradotti in Francia e Corea, nel 2012 vince il premio “Nuove Strade” di Napoli Comicon e del Centro Fumetto Andrea Pazienza come miglior talento emergente. Ha collaborato con vari quotidiani e riviste, da Il Sole 24 ore, a Internazionale da Le Monde a Linus e con le case editrici Il Saggiatore, La Nave di Teseo, Sellerio, Neri Pozza, Feltrinelli e Solfernino.",
			"Del 2016 Cosmo (Coconino Press Fandango) e del 2018 L’incanto del parcheggio multipiano (Oblomov).",
			"Nel 2019 pubblica Nuno salva la luna (Canicola) il suo primo fumetto per bambini, finalista al premio Andersen 2020 come migliore libro a fumetti. Nel 2022 pubblica La tempesta (Oblomov) edito anche in Francia per Casterman."
		]},
		// {name: 'Monica', surname: 'Vitti', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia'},
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
	const seoSingle = { seoTitle: 'Festival'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

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
	<section id="event" title="Evento" bind:this={sections[0]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Evento</h2>
		<p class="wb-28 wb-18-mb max-w-800">Il Modena Film Festival è il nuovo spazio in cui Modena vive il cinema con tutti i sensi.</p>
		<p class="wb-28 wb-18-mb max-w-800">Cinque giorni di film, incontri, performance, suoni, luci, profumi, conversazioni e luoghi che si trasformano: un’esperienza pensata per chi ama il cinema d’autore, per chi cerca nuove visioni e per chi vuole semplicemente lasciarsi sorprendere.</p>
		<p class="wb-28 wb-18-mb max-w-800">Tra sale, musei e spazi della città, il festival diventa un punto di incontro aperto e accessibile a tutti, con particolare attenzione a chi vive il cinema attraverso altri sensi e ha esigenze sensoriali specifiche. Un invito a guardare meglio. E a sentire di più.</p>
	</section>
	<!-- SEZIONI
	<section id="festival-sections" title="Sezioni" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Sezioni</h2>
		<p class="wb-28 wb-18-mb max-w-800">Tutto all’insegna della qualità e della varietà: 11 sezioni, 3 concorsi e 20 premi. Questa l’architettura di un Festival che esplora il cinema a 360°. Per scoprire nel presente gli autori e i film destinati ad avere futuro.</p>
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
	</section> -->
	<section id="jury" title="Giuria" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Giuria</h2>
		<p class="wb-24 wb-18-mb max-w-800">Sono tre i premi che verranno assegnati.</p>
		<p class="wb-24 wb-18-mb max-w-800">✳ <em>Premio del Pubblico</em><br>Ogni film verrà votato dagli spettatori con una valutazione da 1 a 10; i voti verranno raccolti al termine di ogni proiezione.</p>
		<p class="wb-24 wb-18-mb max-w-800">✳ <em>Premio degli Studenti Universitari</em><br>La giuria è composta da Cesare Barbagallo, Giulia Cremonesi e Matilde Rizzello, del corso di Laurea in Lingue e Culture Europee di Unimore.</p>
		<p class="wb-24 wb-18-mb max-w-800">✳ <em>Premio della Giuria</em><br>La giuria è composta da Elisa Dondi, Marino Neri e Marco Righi.</p>
		<div class="jury">
			{#each jury as juror, i}
				<Juror {juror}/>
			{/each}
		</div>
	</section>
	<section id="regulations" title="Regolamento" bind:this={sections[2]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Regolamento</h2>
		<p class="wb-28 wb-18-mb max-w-800">Il regolamento completo del Modena Film Festival, con tutte le modalità di partecipazione alle sezioni, i requisiti tecnici e i criteri di selezione.</p>
		<a class="btn-l" href="/festival/regolamento">Leggi il regolamento</a>
	</section>
</main>

<style>
#event {
	p + p {
		margin-top: .6em;
	}
}
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
	p + p {
		margin-top: .6em;
	}
	.jury {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		column-gap: var(--gutter);
		row-gap: var(--spacing-s);
		margin-top: var(--spacing-s);

		@media screen and (max-width: 1440px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media screen and (max-width: 768px) {
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