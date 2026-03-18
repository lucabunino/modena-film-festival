<script>
    import EventHero from '$lib/components/EventHero.svelte';
    import EventInfo from '$lib/components/EventInfo.svelte';

	let { data } = $props()
	const event = data.event[0]
	let seoSingle = $derived(event.seo)

	$inspect(data)
</script>

<!-- {#if seoSingle}
	<HeadSingle seo={data.seo[0]} {seoSingle} hidden={project.hidden} />
{/if} -->

<main>
	<EventHero {event} />
	<EventInfo {event} />
	{event.title}
</main>

<style>
	main {
		padding: 0;
	}
</style>