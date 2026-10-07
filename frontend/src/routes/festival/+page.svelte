<script>
	import Festival from '$lib/components/Festival.svelte'
	import Placeholder from '$lib/components/Placeholder.svelte'
	let { data } = $props()
</script>

{#if data.placeholder}
	<Placeholder title="Modena<br>Film Festival" message="Le informazioni sulla prossima edizione saranno disponibili a breve." />
{:else}
	<Festival edition={data.content} current />
{/if}
