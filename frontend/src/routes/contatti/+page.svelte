<script>
    import ContactCard from "$lib/components/ContactCard.svelte";
    import Title from "$lib/components/Title.svelte";
	let sections = $state([])

	const contacts = [
		{
			title: "Info",
			slug: "info",
			abstract: "Per informazioni sul festival, accreditamenti, partnership o proposte",
			email: "info@modenafilmfestival.it"
		},
		{
			title: "Sponsor",
			slug: "sponsor",
			abstract: "Per proporre una collaborazione",
			email: "alice@modenafilmfestival.it"
		},
		{
			title: "Social media",
			slug: "social",
			abstract: "Seguici su instagram per rimanere aggiornato/a",
			cta: {
				label: '@modenafilmfestival', href: 'https://www.instagram.com/modenafilmfestival'
			}
		}
	]
</script>

<main class="bg-linen">
	<Title title='Siamo qui per te' size={'m'} subtitles={['Per informazioni, collaborazioni, accrediti o domande sul festival, puoi scriverci quando vuoi. Ti risponderemo il prima possibile.']}/>
	<section class="contacts" title="Contatti" bind:this={sections[0]}>
		{#each contacts as contact}
			<ContactCard {contact} />
		{/each}
	</section>
</main>
	
<style>
.contacts {
	grid-column: 1 / span 6;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: var(--margin);
	row-gap: var(--margin);

	@media screen and (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>