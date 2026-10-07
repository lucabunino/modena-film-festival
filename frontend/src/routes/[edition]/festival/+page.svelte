<script>
	import Festival from '$lib/components/Festival.svelte'
	let { data } = $props()
</script>

<Festival edition={data.content} />
