<script>
	import Luoghi from '$lib/components/Luoghi.svelte'
	import Placeholder from '$lib/components/Placeholder.svelte'
	let { data } = $props()
</script>

{#if data.placeholder}
	<Placeholder title="I luoghi del Modena <br>Film Festival" message="I luoghi della prossima edizione saranno disponibili a breve." />
{:else}
	<Luoghi locations={data.locations} />
{/if}
