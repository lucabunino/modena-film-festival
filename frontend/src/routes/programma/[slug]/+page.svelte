<script>
    import EventHero from '$lib/components/EventHero.svelte';
    import EventInfo from '$lib/components/EventInfo.svelte';
    import HeadSingle from '$lib/components/HeadSingle.svelte';
	import { PortableText } from "@portabletext/svelte";
	import portableTextStylePlain from '$lib/components/portableTextStyles/portableTextStylePlain.svelte';
	import portableTextStyleEvent from '$lib/components/portableTextStyles/portableTextStyleEvent.svelte';

	let { data } = $props()
	const event = data.event[0]
	let seoSingle = $derived(event.seo)
</script>

{#if seoSingle}
	<HeadSingle seo={data.seo[0]} {seoSingle} hidden={event.hidden} />
{/if}

<main id="event" class="bg-white">
	<EventInfo {event} />
	<EventHero {event} />
	<section id="content" class="max-w-700 {!event.thumbnail ? 'mt' : undefined}">
		{#if event.program}
			<div class="program portableText wb-21">
				<PortableText value={event.program}
				components={{
					block: {
						normal: portableTextStyleEvent,
					},
					marks: {
						link: portableTextStyleEvent,
					},
				}}/>
			</div>
		{/if}
		{#if event.description}
			<div class="description portableText wb-21">
				<PortableText value={event.description}
				components={{
					block: {
						normal: portableTextStyleEvent,
					},
					marks: {
						link: portableTextStyleEvent,
					},
				}}/>
			</div>
		{/if}
		{#if event.body}
			<div class="body portableText wb-16 max-w-700">
				<PortableText value={event.body}
				components={{
					block: {
						normal: portableTextStyleEvent,
						h4: portableTextStyleEvent,
					},
					marks: {
						link: portableTextStyleEvent,
					},
				}}/>
			</div>
		{/if}
	</section>
	<div id="links">
		<a class="link btn-l bg-linen hover-bg-black" href="/biglietti">Biglietti</a>
		<!-- <a class="link btn-l border-linen hover-border-black hover-bg-black" href="/biglietti">Scarica PDF ⤓</a> -->
	</div>
</main>

<style>
	main {
		row-gap: 0;
		#content {
			padding: 0 0 var(--spacing-l);

			&.mt {
				margin-top: var(--margin);
			}

			.program {
				padding-bottom: var(--spacing-s);
			}
			.body {
				border-top: solid 1px var(--black);
				padding-top: 1rem;
				padding-right: var(--spacing-xs);
				margin-top: var(--spacing-xs);

			}
		}
		#links {
			position: absolute;
			top: 0;
			right: var(--margin);
			height: 100%;
			pointer-events: none;

			.link {
				position: sticky;
				top: calc(100% - var(--margin) - 1.5rem - 2.35em);
				pointer-events: all;
				margin-bottom: var(--margin);
			}
		}
	}
</style>