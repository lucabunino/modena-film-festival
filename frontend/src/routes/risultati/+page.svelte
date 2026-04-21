<script>
    import ContactCard from "$lib/components/ContactCard.svelte";
    import Title from "$lib/components/Title.svelte";
	import HeadSingle from "$lib/components/HeadSingle.svelte";
	let { data } = $props()
	let seoSingle = $derived(data.seoSingle)
	let sections = $state([])

	const prizes = [
        {
            name: "Miglior film",
            logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>`,
            movieTitle: "Simón della Montagna (Simón de la Montaña)",
            director: "Federico Luis",
            link: "/programma/simon-della-montagna"
        },
        {
            name: "Menzione speciale",
            logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" /><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" /></svg>`,
            movieTitle: "Battiti Urbani",
            director: "Luca Ferrari",
            link: "/programma/lo-spirito-delle-stagioni"
        },
        {
            name: "Giuria studenti",
            logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>`,
            movieTitle: "Love Letters (Des preuves d’amour)",
            director: "Alice Douard",
            link: "/programma/love-letters"
        },
        {
            name: "Premio del pubblico",
            logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>`,
            movieTitle: "Love Letters (Des preuves d’amour)",
            director: "Alice Douard",
            link: "/programma/love-letters"
        }
    ];
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-linen">
	<Title title='I risultati del Modena Film Festival 2026' size={'m'} subtitles={['Per informazioni, collaborazioni, accrediti o domande sul Festival, puoi scriverci quando vuoi. Ti risponderemo il prima possibile.']}/>
	<section class="prizes" title="Risultati" bind:this={sections[0]}>
		{#each prizes as prize}
			<div class="prize">
				<div class="">
					<div class="logo">
						{@html prize.logo}
					</div>
					<div class="info">
						<span class="name wb-12 uppercase">{prize.name}</span>
						<h3 class="title wb-cd-35 wb-cd-24-mb uppercase">{prize.movieTitle}</h3>
						<p class="subtitle nr-24">di {prize.director}</p>
						<a href={prize.link} class="btn-m">Scopri il film</a>
					</div>
				</div>
			</div>
		{/each}
	</section>
</main>

<style lang="scss">
	.prizes {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--gutter);
	}
</style>