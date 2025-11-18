<script>
    import ContactCard from "$lib/components/ContactCard.svelte";
    import Title from "$lib/components/Title.svelte";
	let sections = $state([]);
	const contacts = [
		{
			title: "Sponsor",
			slug: "sponsor",
			abstract: "Per proporre una collaborazione",
			email: "alice@modenafilmfestival.it"
		}
	]
</script>

<main>
	<Title
	size={'m'}
	subtitles={[
		'Sponsorizzare il nostro festival è un’opportunità strategica per le aziende che desiderano rafforzare la propria presenza sul territorio e avvicinarsi alle persone, posizionandosi come un brand attento, affidabile e sensibile ai temi sociali.',
		'Il nostro team di esperti di marketing e comunicazione accompagnerà ogni azienda nella scelta della soluzione più adatta ai propri obiettivi.'
	]}/>
	<section class="contacts" title="Contatti" bind:this={sections[0]}>
		{#each contacts as contact}
			<ContactCard {contact} bg={'bg-linen'} />
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