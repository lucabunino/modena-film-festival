<script>
    import Title from "$lib/components/Title.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import Partner from "$lib/components/Partner.svelte";
    import Person from "$lib/components/Person.svelte";
	let sections = $state([])
	const partners = [
		{title: 'Crispy', href: 'https://www.instagram.com/crispycinemaclub/', cover: '/img/crispy.webp', logo: '/logos/crispy-white.svg'},
		{title: 'Longtake', href: 'https://www.longtake.it/', cover: '/img/longtake.webp', logo: '/logos/longtake-white.svg'},
	]
	const people = [
		{name: 'Gabriele', surname: 'Malagoli', initials: 'GM', role: 'Direzione artistica'},
		{name: 'Massimo', surname: 'Bondioli', initials: 'MB', role: 'Direzione organizzativa'},
		{name: 'Alice', surname: 'Morelli', initials: 'AM', role: 'Direzione marketing e partnership'},
		{name: 'Martina', surname: 'Dell’Utri', initials: 'MD', role: 'Produzione'},
		{name: 'Giulia', surname: 'Benedetti', initials: 'GB', role: 'Direzione creativa e graphic design'},
		{name: 'Luca', surname: 'Bunino', initials: 'LB', role: 'Direzione creativa e graphic design'},
		{name: 'Andrea', surname: 'Chimento', initials: 'AC', role: 'Ideazione'},
	]
</script>

<main class="bg-white">
	<Navigator title="About" {sections}/>
	<Title
	title='Siamo quelli <br>che il cinema lo vivono'
	size={'m'}
	subtitles={['Lo studiano, lo discutono, lo amano senza misura. E che da questo amore hanno creato un progetto vicino, inclusivo, fatto per tutti.']}
	/>
	<section id="partners">
		{#each partners as partner, i}
			<Partner {partner}/>
		{/each}
	</section>
	<section id="who-we-are" title="Chi siamo" bind:this={sections[0]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Chi siamo</h2>
		<p class="wb-21 wb-18-mb max-w-700">Il Modena Film Festival è un progetto ideato da Crispy Cinema Club e realizzato in collaborazione con Longtake, due realtà diverse ma complementari, unite dalla stessa visione: rendere il cinema un luogo vivo, accessibile e condiviso.</p>
		<p class="wb-21 wb-18-mb max-w-700">Da un lato Crispy Cinema Club, che porta energia, comunità e un modo diretto e contemporaneo di avvicinarsi ai film.<br>Dall’altro Longtake, che da anni coltiva un approccio critico, approfondito e curioso verso il cinema d’autore.</p>
		<p class="wb-21 wb-18-mb max-w-700">Insieme abbiamo immaginato un festival che unisce queste due anime: pop e curata, sensibile e rigorosa, attenta allo sguardo del pubblico e al lavoro degli autori. Un progetto costruito da persone che il cinema lo vivono ogni giorno, per farlo vivere anche a chi lo incontra qui, a Modena.</p>
	</section>
	<section id="chart" title="Organigramma" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Organigramma</h2>
		<div class="chart">
			{#each people as person}
				<Person {person}/>
			{/each}
		</div>
	</section>
</main>

<style>
#partners {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: var(--gutter);
	margin-top: -4rem;

	@media screen and (max-width: 516px) {
		grid-template-columns: repeat(1, 1fr);
		margin-top: -2rem;
	}
}
#who-we-are {
	p + p {
		margin-top: 1.1em;
	}
}
#chart {
	.chart {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		row-gap: var(--spacing-s);
		column-gap: var(--gutter);

		@media screen and (max-width: 1512px) {
			grid-template-columns: repeat(3, 1fr);
		}
		@media screen and (max-width: 516px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media screen and (max-width: 374px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}
}
</style>