<script>
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
	let sections = $state([])
</script>

<main class="bg-linen">
	<Title title='Siamo qui per te' size={'m'} subtitles={['Per informazioni, collaborazioni, accrediti o domande sul festival, puoi scriverci quando vuoi. Ti risponderemo il prima possibile.']}/>
	<!-- <Navigator title="Contatti" {sections} bg={'bg-white'}/> -->
	<section class="contacts" title="Contatti" bind:this={sections[0]}>
		<div id="press" title="Press">
			<h2 class="section-title wb-12 wb-10-mb uppercase">Per comunicazione, stampa e media</h2>
			<a class="btn-l" href="mailto:press@modenafilmfestival.it">press@modenafilmfestival.it</a>
		</div>
		<div id="info" title="Info">
			<h2 class="section-title wb-12 wb-10-mb uppercase">Per tutte le altre richieste</h2>
			<a class="btn-l" href="mailto:info@modenafilmfestival.it">info@modenafilmfestival.it</a>
		</div>
	</section>
</main>
	
<style>
.contacts {
	grid-column: 1 / span 6;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: var(--margin);

	.section-title {
		margin-bottom: var(--spacing-xs);
	}
}
</style>