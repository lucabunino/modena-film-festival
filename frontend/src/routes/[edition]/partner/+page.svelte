<script>
	import PartnerPage from '$lib/components/PartnerPage.svelte'
	let { data } = $props()
</script>

<PartnerPage partners={data.partnerGroups} />
