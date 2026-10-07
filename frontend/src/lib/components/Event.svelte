<script>
    import EventHero from '$lib/components/EventHero.svelte';
    import EventInfo from '$lib/components/EventInfo.svelte';
	import { PortableText } from "@portabletext/svelte";
	import portableTextStylePlain from '$lib/components/portableTextStyles/portableTextStylePlain.svelte';
	import portableTextStyleEvent from '$lib/components/portableTextStyles/portableTextStyleEvent.svelte';
	import portableTextListItem from '$lib/components/portableTextStyles/portableTextListItem.svelte';

	let { data } = $props()
	let event = $derived(data.event[0])
</script>


<main id="event" class="bg-white">
	<EventInfo {event} />
	<EventHero {event} />
	<section id="content" class="max-w-700 {!event.thumbnail ? 'mt' : undefined}">
		{#if event.program}
			<div class="program portableText wb-21 wb-15-mb">
				<PortableText value={event.program}
				components={{
					listItem: portableTextListItem,
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
			<div class="description portableText wb-21 wb-15-mb">
				<PortableText value={event.description}
				components={{
					listItem: portableTextListItem,
					block: {
						normal: portableTextStyleEvent,
					},
					marks: {
						link: portableTextStyleEvent,
					},
				}}/>
			</div>
		{/if}
		{#if event.body?.length}
			<div class="body portableText te-18 max-w-700">
				<PortableText value={event.body}
				components={{
					listItem: portableTextListItem,
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
	<!-- <div id="links">
		<a class="link btn-l bg-linen hover-bg-black" href="/biglietti">Biglietti</a>
		<a class="link btn-l border-linen hover-border-black hover-bg-black" href="/biglietti">Scarica PDF ⤓</a>
	</div> -->
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	main {
		row-gap: 0;
		#content {
			padding: 0 0 var(--sp-144);

			&.mt {
				margin-top: var(--margin);
			}

			.program {
				padding-bottom: var(--sp-48);
			}
			.body {
				border-top: solid 1px var(--black);
				padding-top: var(--sp-12);
				padding-right: var(--sp-24);
				margin-top: var(--sp-24);
				
				@media (width <= #{$sm}) {
					padding-right: 0;
				}
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
				top: calc(100% - var(--margin) - var(--sp-18) - 2.35em);
				pointer-events: all;
				margin-bottom: var(--margin);
			}
		}
	}
</style>