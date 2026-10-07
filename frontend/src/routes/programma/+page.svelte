<script>
	import Programma from '$lib/components/Programma.svelte'
	import Placeholder from '$lib/components/Placeholder.svelte'
	let { data } = $props()
</script>

{#if data.placeholder}
	<Placeholder title="Programma" message="Il programma della prossima edizione sarà disponibile a breve." />
{:else}
	<Programma {data} />
{/if}
