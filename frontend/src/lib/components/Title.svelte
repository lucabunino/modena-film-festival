<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
    let { title, subtitles, size, cta } = $props()
	let shaking = $state(false);
</script>

<section id="title">
	<Breadcrumbs/>
	{#if title}
		<h1 class="{size == 'l' ? 'wb-cd-120 wb-cd-40-mb' : size == 'm' ? 'wb-cd-80 wb-cd-40-mb' : size == 's' ? 'wb-cd-60 wb-cd-24-mb': ''} uppercase">{@html title}</h1>
	{/if}
	{#if subtitles}
		{#each subtitles as subtitle, i}
			<h2 class="wb-24 wb-18-mb max-w-700">{@html subtitle}</h2>
		{/each}
	{/if}
	{#if cta}
		<a class="cta btn-l bg-black white hover-black hover-bg-linen {cta.bg ? cta.bg : undefined} {cta.locked ? 'locked' : undefined} {shaking ? 'shaking' : undefined}" href={cta.href} target={cta.blank ? '_blank' : ''} rel={cta.blank ? 'noopener noreferrer' : ''}
		onclick={(e) => {cta.locked ? handleLockedclick(e) : ''}}
		>{cta.label}</a>
	{/if}
</section>

<style>
section {
	grid-column: 1 / span 6;

	h2 {
		margin-top: 2rem;

		&+h2 {
			margin-top: 1.2em;
		}
	}

	.cta {
		margin-top: 2rem;
	}
}
</style>