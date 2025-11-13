<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
    let { title, subtitle, size } = $props()
</script>

<section id="title">
	<Breadcrumbs/>
	{#if title}
		<h1 class="{size == 'l' ? 'wb-cd-120' : size = 'm' ? 'wb-cd-60' : ''} uppercase">{@html title}</h1>
	{/if}
	{#if subtitle}
		<h2 class="wb-24 max-w-700">{@html subtitle}</h2>
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