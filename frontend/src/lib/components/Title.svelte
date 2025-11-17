<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
    let { title, subtitle, size } = $props()
</script>

<section id="title">
	<Breadcrumbs/>
	{#if title}
		<h1 class="{size == 'l' ? 'wb-cd-120 wb-cd-50-mb' : size = 'm' ? 'wb-cd-60 wb-cd-30-mb' : ''} uppercase">{@html title}</h1>
	{/if}
	{#if subtitle}
		<h2 class="wb-24 wb-18-mb max-w-700">{@html subtitle}</h2>
	{/if}
</section>

<style>
section {
	grid-column: 1 / span 6;
}
h2 {
	margin-top: 2rem;
}
</style>