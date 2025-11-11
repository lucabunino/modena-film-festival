<script>
    import Title from "$lib/components/Title.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import Juror from "$lib/components/Juror.svelte";
    import PreFooter from "$lib/components/PreFooter.svelte";
	let sections = $state([])
	const festivalSections = [
		{title: 'Titolo sezione vista', sense: 'Vista', slug: 'vista', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', cover: '/img/placeholder.png'},
		{title: 'Titolo sezione udito', sense: 'Udito', slug: 'udito', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', cover: '/img/placeholder.png'},
		{title: 'Titolo sezione gusto', sense: 'Gusto', slug: 'gusto', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', cover: '/img/placeholder.png'},
		{title: 'Titolo sezione olfatto', sense: 'Vista', slug: 'olfatto', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', cover: '/img/placeholder.png'},
		{title: 'Titolo sezione tatto', sense: 'Tatto', slug: 'tatto', abstract: 'Lorem ispum adisciplit esset eiusque belli rarum caso est', cover: '/img/placeholder.png'},
	]
	const jury = [
		{name: 'Federico', surname: 'Fellini', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Monica', surname: 'Vitti', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Vittorio', surname: 'De Sica', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Anna', surname: 'Magnani', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Luchino', surname: 'Visconti', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Gina', surname: 'Lollobrigida', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Roberto', surname: 'Rossellini', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Marcello', surname: 'Mastroianni', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Silvana', surname: 'Mangano', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Nino', surname: 'Manfredi', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Alberto', surname: 'Sordi', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
		{name: 'Sophia', surname: 'Loren', role: 'Presidente di giuria', profession: 'Regista', country: 'Italia', portrait: '/img/placeholder.png'},
	]
</script>

<main class="bg-pink">
	<Navigator title="Festival" {sections} cta={{label: 'Diventa sponsor', href: '/sponsor'}}/>
	<Title title='Modena<br>Film Festival<br>2026' size={'l'}/>
	<section id="adiscplit" title="Adisciplit" bind:this={sections[0]}>
		<h2 class="section-title wb-12 uppercase">Adisciplit</h2>
		<p class="wb-28 max-w-800">Da quasi ottant’anni, Locarno è sinonimo di cinema d’autore e di grandi protagonisti del panorama internazionale. Con un programma che unisce il meglio della produzione svizzera e mondiale, il Festival parla a tutti gli amanti del cinema, dal grande pubblico ai cinefili più esigenti. Nel cuore del Festival si trova la Piazza Grande, il più grande cinema all’aperto d’Europa, che accoglie ogni sera migliaia di spettatori.</p>
	</section>
	<section id="festival-sections" title="Sezioni" bind:this={sections[1]}>
		<h2 class="section-title wb-12 uppercase">Sezioni</h2>
		<p class="wb-18 max-w-500">Tutto all’insegna della qualità e della varietà: 11 sezioni, 3 concorsi e 20 premi. Questa l’architettura di un Festival che esplora il cinema a 360°. Per scoprire nel presente gli autori e i film destinati ad avere futuro.</p>
		<div class="festival-sections">
			{#each festivalSections as festivalSection, i}
				<div class="festival-section">
					<img src={festivalSection.cover} alt="">
					<span class="tag wb-12 uppercase">{festivalSection.sense}</span>
					<h3 class="wb-cd-45 uppercase max-w-400">{festivalSection.title}</h3>
					<p class="max-w-400">{festivalSection.abstract}</p>
					<a class="btn-m" href="/sezioni/{festivalSection.slug}">Leggi di più</a>
				</div>
			{/each}
		</div>
	</section>
	<section id="jury" title="Giuria" bind:this={sections[2]}>
		<h2 class="section-title wb-12 uppercase">Giuria</h2>
		<div class="jury">
			{#each jury as juror, i}
				<Juror {juror}/>
			{/each}
		</div>
	</section>
	<section id="regulations" title="Regolamento" bind:this={sections[3]}>
		<h2 class="section-title wb-12 uppercase">Regolamento</h2>
		<p class="wb-28 max-w-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
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
			img {
				aspect-ratio: 4/3;
			}
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
	}
}
#jury {
	.jury {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: var(--gutter);
		row-gap: var(--spacing-s);
	}	
}
#regulations {
	a {
		margin-top: 2rem;
	}
}
</style>