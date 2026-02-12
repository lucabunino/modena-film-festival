<script>
    import ContactCard from "$lib/components/ContactCard.svelte";
    import Title from "$lib/components/Title.svelte";
	import HeadSingle from "$lib/components/HeadSingle.svelte";
	let { data } = $props()
	let sections = $state([]);
	const contacts = [
		{
			title: "Sponsor",
			slug: "sponsor",
			abstract: "Proponi una partnership o una collaborazione",
			email: "alice@modenafilmfestival.it"
		}
	]
	const seoSingle = { seoTitle: 'Sponsor'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Title
	size={'m'}
	subtitles={[
		'Sponsorizzare il nostro festival è un’opportunità strategica per le aziende che desiderano rafforzare la propria presenza sul territorio e avvicinarsi alle persone, posizionandosi come un brand attento, affidabile e sensibile ai temi sociali.',
		'Il nostro team di esperti di marketing e comunicazione accompagnerà ogni azienda nella scelta della soluzione più adatta ai propri obiettivi.'
	]}/>
	<section class="contacts-grid" title="Contatti" bind:this={sections[0]}>
		{#each contacts as contact}
			<ContactCard {contact} bg={'bg-linen'} />
		{/each}
	</section>
</main>