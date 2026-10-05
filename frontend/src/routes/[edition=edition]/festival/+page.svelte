<script>
	import { editionPages } from '$lib/components/editions/index.js'
	let { data } = $props()
	const Festival = $derived(editionPages[data.edition].festival)
</script>

<Festival />
