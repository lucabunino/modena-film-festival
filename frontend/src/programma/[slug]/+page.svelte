<script>
    import EventHero from '$lib/components/EventHero.svelte';
    import EventInfo from '$lib/components/EventInfo.svelte';

	let { data } = $props()
	const event = data.event[0]
</script>

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