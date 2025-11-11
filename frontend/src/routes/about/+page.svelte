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
		{name: 'Gabriele', surname: 'Malagoli', role: 'Direzione artistica'},
		{name: 'Massimo', surname: 'Bondioli', role: 'Direzione organizzativa'},
		{name: 'Alice', surname: 'Morelli', role: 'Direzione marketing e partnership'},
		{name: 'Martina', surname: 'Dell’Utri', role: 'Produzione'},
		{name: 'Giulia', surname: 'Benedetti', role: 'Direzione artistica e graphic design'},
		{name: 'Luca', surname: 'Bunino', role: 'Direzione artistica e graphic design'},
		{name: 'Andrea', surname: 'Chimento', role: 'Ideazione'},
	]
</script>

<main class="bg-white">
	<Navigator title="About" {sections}/>
	<Title
	title='Lorem ipsum dolor sit amet, consectetur adipiscing elit incididunt ut labore.'
	subtitle='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.'
	size={'m'}
	/>
	<section id="partners">
		{#each partners as partner, i}
			<Partner {partner}/>
		{/each}
	</section>
	<section id="who-we-are" title="Chi siamo" bind:this={sections[0]}>
		<h2 class="section-title wb-12 uppercase">Chi siamo</h2>
		<p class="wb-21 max-w-800">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
		<p class="wb-21 max-w-800">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
	</section>
	<section id="chart" title="Organigramma" bind:this={sections[1]}>
		<h2 class="section-title wb-12 uppercase">Organigramma</h2>
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
	}
}
</style>