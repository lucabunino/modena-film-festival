<script>
	import RegolamentoPage from '$lib/components/RegolamentoPage.svelte'
	import { editionPages } from '$lib/components/editions/index.js'
	let { data } = $props()
	const rules = $derived(editionPages[data.edition].regolamento)
</script>

<RegolamentoPage {rules} title="Regolamento<br>Modena Film Festival<br>Edizione {data.edition}" />
