<script>
	import Winners from '$lib/components/Winners.svelte'
	import Placeholder from '$lib/components/Placeholder.svelte'
	let { data } = $props()
</script>

{#if data.placeholder}
	<Placeholder title="Vincitori" message="I vincitori della prossima edizione saranno annunciati a breve." />
{:else}
	<Winners edition={data.content} current />
{/if}
