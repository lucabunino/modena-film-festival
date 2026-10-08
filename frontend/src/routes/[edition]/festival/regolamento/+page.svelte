<script>
	import { editionLabel } from '$lib/utils/edition.js'
	import RegolamentoPage from '$lib/components/RegolamentoPage.svelte'
	let { data } = $props()
</script>

<RegolamentoPage rules={data.rules} title="Regolamento<br>{editionLabel(data.edition)}" />
