<script>
	import PartnerPage from '$lib/components/PartnerPage.svelte'
	import Placeholder from '$lib/components/Placeholder.svelte'
	let { data } = $props()
</script>

{#if data.placeholder}
	<Placeholder title="Partner" message="I partner della prossima edizione saranno disponibili a breve." />
{:else}
	<PartnerPage partners={data.partnerGroups} />
{/if}
