<script>
    import Title from "$lib/components/Title.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import PreFooter from "$lib/components/PreFooter.svelte";
	import { register } from 'swiper/element/bundle';register();

	let sections = $state([])
	let tiers = $derived([
		{title: 'Amico', price: 10, isCustomPrice: false, abstract: 'Il tuo nome comparirà come Amico del Festival qui sul sito.'},
		{title: 'Sostenitore', price: 50, isCustomPrice: false, abstract: 'Oltre alla visibilità come Amico, riceverai l’accredito del festival, che ti garantirà l’accesso a tutte  le proiezioni.'},
		{title: 'Promotore', price: 100, isCustomPrice: true, abstract: 'Avrai tutto ciò che spetta ad Amici e Sostenitori. In più il catalogo ufficiale, la t-shirt e la totebag del festival.'},
	])
	const promoters = [
		{name: 'Mario', surname: 'Rossi'},
	]
	const supporters = [
		{name: 'Mario', surname: 'Rossi'},
	]
	const friends = [
		{name: 'Anna', surname: 'Giovani'},
		{name: 'Alessandro', surname: 'Romagnoli'},
		{name: 'Giulietta', surname: 'Malagoli'},
		{name: 'Irene', surname: 'Malagoli'},
		{name: 'Laura', surname: 'Malagoli'},
		{name: 'Marino', surname: 'Linguiti'},
		{name: 'Teresa', surname: 'Tinti'},
		{name: 'Vanna', surname: 'Bortolamasi'},
	]
	const prefooter = {
		subtitle: "Abbonamenti",
		title: "Acquista gli abbonamenti",
		content: "Stiamo preparando biglietti singoli e abbonamento per permetterti di vivere il Modena Film Festival come preferisci: una proiezione per volta o l’intera esperienza. <br>A breve troverai qui tutte le opzioni, i prezzi e le modalità di acquisto.",
		cta: {href: '/tickets', label: 'Acquista*', locked: true},
		annotation: '*Gli abbonamenti saranno disponibili online prima dell’inizio del festival.',
		bg: 'bg-yellow',
	}

	let swiperEl = $state(undefined)
	let swiperIndex = $state(0)
	let visible = $state(false)
	const swiperParams = {
		spaceBetween: 10,
		slidesOffsetBefore: 15,
		slidesOffsetAfter: 15,
		freeMode: false,
		breakpoints: {
			1080: {
				spaceBetween: 14,
				slidesOffsetBefore: 28,
				slidesOffsetAfter: 28,
				freeMode: true,
			}
		}
	};
	$effect(() => {
		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();
	
		setTimeout(() => {
			visible = true
		}, 50);
	})
</script>

<main class="bg-white">
	<Navigator title="Sostienici" {sections}/>
	<Title
	title='Sostieni <br>il festival!'
	subtitles={['Scegli la tua fascia di sostegno e aiutaci a realizzare il festival!']}
	size={'l'}
	/>
	<section id="become-supporter" title="Diventa sostenitore" bind:this={sections[0]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Diventa sostenitore</h2>
		<p class="wb-24 wb-18-mb max-w-700">Puoi donare con bonifico o PayPal.* Ti chiediamo soltanto di indicare nella causale il tuo nome e cognome (a meno che tu non preferisca restare anonimo/a). Se non puoi donare, non preoccuparti: puoi aiutarci lo stesso semplicemente  spargendo la voce tra amici e conoscenti!</p>
		<p class="bank-info wb-14 wb-12-mb">Bonifico Bancario:<br>
		Crispy Cinema Club APS<br>
		IT50Y0538766890000004422054</p>
	</section>
	<section id="tiers" title="Tiers">
		<swiper-container class={visible ? 'visible' : undefined}
		init="false"
		mousewheel={{
			forceToAxis: true,
		}}
		grabCursor={true}
		direction='horizontal'
		slides-per-view='auto'
		bind:this={swiperEl}
		>
			{#each tiers as tier, i}
				<swiper-slide class="tier bg-yellow rounded-l" title={tier.title}>
					<div>
						<h3 class="wb-28 wb-21-mb">{tier.title}</h3>
						<h4 class="nr-28 nr-21-mb">{#if tier.isCustomPrice}{@html 'A partire da '}{/if}{tier.price}€</h4>
						<p class="wb-18 wb-15-mb max-w-400">{tier.abstract}</p>
					</div>
					<div class="btns">
					<a class="btn-l" href="https://paypal.me/CrispyCinemaClubAPS/{tier.price}" target="_blank" rel="noopener noreferrer">Dona {tier.price}€</a>
						{#if tier.isCustomPrice}
							<a class="btn-s" href="https://paypal.me/CrispyCinemaClubAPS/" target="_blank" rel="noopener noreferrer">Scegli importo</a>
						{/if}
					</div>
				</swiper-slide>
			{/each}
		</swiper-container>
	</section>
	<!-- <section id="promoters" title="Promotori" bind:this={sections[1]}>
		<h2 class="section-title wb-12 uppercase">Promotori</h2>
		<div class="promoters">
			{#each promoters as promoter, i}
				<h3 class="promoter wb-28">{promoter.name} {promoter.surname}</h3>
			{/each}
		</div>
	</section>
	<section id="supporters" title="Sostenitori" bind:this={sections[2]}>
		<h2 class="section-title wb-12 uppercase">Sostenitori</h2>
		<div class="supporters">
			{#each supporters as supporter, i}
				<h3 class="supporter wb-28">{supporter.name} {supporter.surname}</h3>
			{/each}
		</div>
	</section> -->
	<section id="friends" title="Amici" bind:this={sections[1]}>
		<h2 class="section-title wb-12 uppercase">Amici</h2>
		<div class="friends">
			{#each friends as friend, i}
				<h3 class="friend wb-28">{friend.name} {friend.surname}</h3>
			{/each}
		</div>
	</section>
</main>
<PreFooter {prefooter}/>

<style>
#become-supporter {
	margin-top: -4rem;

	.bank-info {
		margin-top: var(--spacing-xs);
	}
}
#tiers {
	grid-column: 1 / span 8;
	margin: calc(var(--margin)*-1);

	swiper-container {
		opacity: 0;
		display: flex;

		&.visible {
			opacity: 1;
		}

		.tier {
			padding: 3rem var(--gutter) var(--gutter);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: calc(100%/4);
			min-width: 500px;
			min-height: 360px;

			@media screen and (max-width: 1080px) {
				min-width: unset;
				width: 75vw;
				padding: 3rem var(--margin) var(--margin);
			}

			p {
				margin-top: 2rem;
			}
			.btns {
				display: flex;
				align-items: baseline;
				gap: var(--spacing-xs);

				a {
					width: fit-content;
				}
			}
		}
	}
}
.promoters,
.supporters, 
.friends {
	column-count: 3;
	column-gap: 2rem;

	@media screen and (max-width: 1512px) {
		column-count: 2;
	}

	@media screen and (max-width: 768px) {
		column-count: 1;
	}
}
.promoter,
.supporter,
.friend {
	break-inside: avoid;
	display: block;
	margin-bottom: 0.2em;
}
</style>