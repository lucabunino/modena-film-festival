<script>
	import PartnerPage from '$lib/components/PartnerPage.svelte'
	import { editionPages } from '$lib/components/editions/index.js'
	let { data } = $props()
	const partners = $derived(editionPages[data.edition].partner)
</script>

<PartnerPage {partners} />
