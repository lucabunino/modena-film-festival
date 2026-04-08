<script>
    import HeadSingle from '$lib/components/HeadSingle.svelte';
    import Map from '$lib/components/Map.svelte';
    import Title from '$lib/components/Title.svelte';

	let { data } = $props()

	const locations = [
		{
			id: "1",
			title: "<span class='location-indicator'>❶</span> Cortile del Leccio e Sala del Leccio",
			address: "via Francesco Selmi 67, 41121 Modena",
			info: "Troverai:<br>✳ Info point, biglietteria<br>✳ Mostra Elevation Tales di Manitou Italia<br>✳ Controllo dell'udito di Ti Ascolto<br>✳ SPOT point",
			position: { lat: 44.6436, lng: 10.9274 }
		},
		{
			id: "2",
			title: "<span class='location-indicator'>❷</span> Cinema Astra",
			address: "via Francesco Rismondo 21, 41121 Modena",
			info: "✳ Sala Rubino — 145 posti<br>✳ Sala Smeraldo — 173 posti<br>✳ Sala Turchese — 484 posti<br>Acquisto in loco e riscatto biglietti (per titolari di abbonamento) a partire da 60 minuti prima della proiezione.",
			position: { lat: 44.6416, lng: 10.9202 }
		},
		{
			id: "3",
			title: "<span class='location-indicator'>❸</span> Sala Truffaut — 128 posti",
			address: "via degli Adelardi 4, 41121 Modena",
			info: "Acquisto in loco e riscatto biglietti (per titolari di abbonamento) a partire da 60 minuti prima della proiezione.",
			position: { lat: 44.6456, lng: 10.9216 }
		},
		{
			id: "4",
			title: "<span class='location-indicator'>❹</span> Acetaia Giusti",
			address: "Strada delle Quattro Ville 52, 41123 Modena",
			position: { lat: 44.7003, lng: 10.8926 }
		}
	]
	const seoSingle = { seoTitle: 'Luoghi'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-pink">
	<Title
	title='I luoghi del Modena <br>Film Festival 2026'
	size={'m'}
	/>
	<section id="locations" class="wb-21">
		<div class="locations">
			{#each locations as loc}
				<div class="location wb-18 max-w-500">
					<h3 class="title wb-28">{@html loc.title}</h3>
					<h4 class="adress">{@html loc.address}</h4>
					{#if loc.info}
					<p class="info">{@html loc.info}</p>
						
					{/if}
				</div>
			{/each}
		</div>
        <Map {locations}/>
    </section>
</main>

<style>
main {
	row-gap: 0;
	
	#locations {
		grid-column: 1 / span 8;
		padding-top: var(--spacing-m);
		display: flex;
		column-gap: var(--margin);

		@media screen and (max-width: 1080px) {
			padding-top: var(--spacing-s);
			flex-direction: column-reverse;
			row-gap: var(--spacing-s);
		}

		.locations {
			width: 100%;
		
			.location {
				margin-bottom: 2.5rem;
				:global(.location-indicator) {
					display: inline-block;
					font-size: 2rem;
				}
				.adress {
					margin-top: .3em;
				}
				.info {
					margin-top: 1em;
				}
			}
		}
		
		form {
			.fields {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: .2em;

				@media screen and (max-width: 600px) {
					display: flex;
					flex-direction: column;
				}

				input {
					border: none;
					padding: .5em 1em;
				}

				input[type="email"] {
					grid-column: span 2;
				}
			}
			
			button[type="submit"] {
				display: block;
				margin-top: var(--spacing-xs);
			}
		}
	}
}
</style>