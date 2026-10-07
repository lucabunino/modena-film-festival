<script>
	import Luoghi from '$lib/components/Luoghi.svelte'
	let { data } = $props()
</script>

<Luoghi locations={data.locations} year={data.edition.year} />
