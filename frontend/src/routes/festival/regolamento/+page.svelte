<script>
	import RegolamentoPage from '$lib/components/RegolamentoPage.svelte'
	import Placeholder from '$lib/components/Placeholder.svelte'
	let { data } = $props()
</script>

{#if data.placeholder}
	<Placeholder title="Regolamento<br>Modena Film Festival" message="Il regolamento della prossima edizione sarà disponibile a breve." />
{:else}
	<RegolamentoPage rules={data.rules} title="Regolamento<br>Modena Film Festival" />
{/if}
