<script>
	import { editionPages } from '$lib/components/editions/index.js'
	let { data } = $props()
	const Luoghi = $derived(editionPages[data.edition].luoghi)
</script>

<Luoghi />
