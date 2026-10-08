<script>
	import { editionLabel } from '$lib/utils/edition.js'
	import Luoghi from '$lib/components/Luoghi.svelte'
	let { data } = $props()
</script>

<Luoghi locations={data.locations} label={editionLabel(data.edition)} />
