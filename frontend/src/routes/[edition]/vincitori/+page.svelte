<script>
	import Winners from '$lib/components/Winners.svelte'
	let { data } = $props()
</script>

<Winners edition={data.content} />
