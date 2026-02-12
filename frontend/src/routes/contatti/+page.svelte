<script>
    import ContactCard from "$lib/components/ContactCard.svelte";
    import HeadSingle from "$lib/components/HeadSingle.svelte";
    import Title from "$lib/components/Title.svelte";
	let { data } = $props()
	let sections = $state([])

	const contacts = [
		{
			title: "Info",
			slug: "info",
			abstract: "Per informazioni sul festival, accreditamenti o altro",
			email: "info@modenafilmfestival.it"
		},
		{
			title: "Sponsor",
			slug: "sponsor",
			abstract: "Per partnership e sponsorizzazioni",
			email: "alice@modenafilmfestival.it"
		},
		{
			title: "Social media",
			slug: "social",
			abstract: "Per rimanere aggiornato/a seguici su Instagram",
			cta: {
				label: '@modenafilmfestival', href: 'https://www.instagram.com/modenafilmfestival'
			}
		}
	]
	const seoSingle = { seoTitle: 'Contatti'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-linen">
	<Title title='Siamo qui per te' size={'m'} subtitles={['Per informazioni, collaborazioni, accrediti o domande sul festival, puoi scriverci quando vuoi. Ti risponderemo il prima possibile.']}/>
	<section class="contacts-grid" title="Contatti" bind:this={sections[0]}>
		{#each contacts as contact}
			<ContactCard {contact} />
		{/each}
	</section>
</main>