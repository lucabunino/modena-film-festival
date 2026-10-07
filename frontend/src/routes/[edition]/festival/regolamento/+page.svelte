<script>
	import RegolamentoPage from '$lib/components/RegolamentoPage.svelte'
	let { data } = $props()
</script>

<RegolamentoPage rules={data.rules} title="Regolamento<br>Modena Film Festival<br>Edizione {data.edition.year}" />
