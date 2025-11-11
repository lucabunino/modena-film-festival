<script>
    import Title from "$lib/components/Title.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import PreFooter from "$lib/components/PreFooter.svelte";
	import { register } from 'swiper/element/bundle';register();

	let sections = $state([])
	let tiers = $derived([
		{title: 'Amico', price: 10, isCustomPrice: false, abstract: 'Il tuo nome comparirà come  Amico del Festival qui sul sito.'},
		{title: 'Sostenitore', price: 50, isCustomPrice: false, abstract: 'Oltre alla visibilità come Amico, riceverai l’accredito del festival, che ti garantirà l’accesso a tutte  le proiezioni.'},
		{title: 'Promotore', price: 100, isCustomPrice: true, abstract: 'Avrai tutto ciò che spetta ad Amici e Sostenitori. In più il catalogo ufficiale, la t-shirt e la totebag del festival.'},
	])
	const promoters = [
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
		{name: 'Mario', surname: 'Rossi'},
	]
	const supporters = [
		{name: 'Mario', surname: 'Rossi'},
	]
	const friends = [
		{name: 'Mario', surname: 'Rossi'},
	]
	const prefooter = {
		subtitle: "Acquista gli abbonamenti",
		title: "Lorem ipsum eiusque belli 100€",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
		ctaLabel: "Compra ora*",
		ctaLink: "/tickets",
		annotation: '*Lorem ipsum adisciplit esset',
		bg: 'bg-yellow',
		img: '/img/pre-footer-1.png',
	}
</script>

<main class="bg-white">
	<Navigator title="Supporter" {sections}/>
	<Title
	title='Make it <br>happen!'
	subtitle='Scegli la tua fascia di sostegno <br>e aiutaci a realizzare il festival!'
	size={'l'}
	/>
	<section id="become-supporter" title="Diventa supporter" bind:this={sections[0]}>
		<h2 class="section-title wb-12 uppercase">Diventa supporter</h2>
		<p class="wb-24 max-w-600">Puoi donare con boniﬁco o PayPal.* Ti chiediamo soltanto di indicare nella causale il tuo nome e cognome (a meno che tu non preferisca restare anonimo/a). Se non puoi donare, non preoccuparti: puoi aiutarci lo stesso semplicemente  spargendo la voce tra amici e conoscenti!</p>
		<p class="bank-info wb-14">Boniﬁco Bancario:<br>
		Crispy Cinema Club APS<br>
		IT50Y0538766890000004422054</p>
	</section>
	<section id="tiers" title="Tiers">
		<swiper-container
		slides-per-view='auto'
		space-between={18}
		slides-offset-before={36}
		slides-offset-after={36}
		free-mode={true}
		scroll
		>
			{#each tiers as tier, i}
				<swiper-slide class="tier bg-yellow rounded-l">
					<div>
						<h3 class="wb-28 bold">{tier.title}</h3>
						<h4 class="sw-26">{#if tier.isCustomPrice}{@html 'A partire da '}{/if}{tier.price}€</h4>
						<p class="wb-18 max-w-400">{tier.abstract}</p>
					</div>
					<div class="btns">
					<a class="btn-l" href={tier.price} target="_blank" rel="noopener noreferrer">Dona {tier.price}€</a>
						{#if tier.isCustomPrice}
							<button class="wb-21 btn-s">Scegli importo</button>
						{/if}
					</div>
				</swiper-slide>
			{/each}
		</swiper-container>
	</section>
	<section id="promoters" title="Promotori" bind:this={sections[1]}>
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
	</section>
	<section id="friends" title="Amici" bind:this={sections[3]}>
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

	.tier {
		padding: 3rem var(--gutter) var(--gutter);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: calc(100%/4);
		min-width: 500px;
		min-height: 360px;

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
.promoters,
.supporters, 
.friends {
	column-count: 3;
	column-gap: 2rem;
}
.promoter,
.supporter,
.friend {
	break-inside: avoid;
	display: block;
	margin-bottom: 0.2em;
}
</style>