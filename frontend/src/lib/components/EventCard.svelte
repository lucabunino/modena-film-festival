<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
	import { urlFor } from '$lib/utils/image.js';
    import { formatEventDate, formatISO } from "$lib/utils/datetime";
	import {PortableText} from '@portabletext/svelte'
	import portableTextStylePlain from '$lib/components/portableTextStyles/portableTextStylePlain.svelte';

    let { event } = $props()
</script>


<a class="event" href="/programma/{event.slug.current}">
	{#if event.formats}
		<div class="tags wb-12 wb-10-mb uppercase">
			{#if event.soldOut}
				<span class="tag white bg-black">Sold out</span>
			{/if}
			{#each event.formats as format, i}
				<span class="tag bg-white">{format.title}</span>
			{/each}
		</div>
	{/if}
	{#if event.thumbnail}
		<img class="img _16_9 bg-linen" src={urlFor(event.thumbnail).width(1080)} alt="">
	{:else}
		<div class="img _16_9 bg-brown"></div>
	{/if}
	<div class="info wb-12 uppercase">
		<time class="datetime" datetime={formatISO(event.start, event.end)}>{formatEventDate(event.start, event.end)}</time>
		{#if event.location}<p class="location">{event.location.title}</p>{/if}
	</div>
	<h2 class="title wb-cd-35 wb-cd-24-mb uppercase">{event.title}</h2>
	{#if event.subtitle}<h3 class="subtitle nr-24">{event.subtitle}</h3>{/if}
	{#if event.credits}<h4 class="credits wb-12 uppercase">{event.credits}</h4>{/if}
	{#if event.abstract}
		<div class="abstract portableText wb-14">
			<PortableText value={event.abstract}
			components={{
				block: {
					normal: portableTextStylePlain,
				},
				marks: {
					link: portableTextStylePlain,
				},
			}}/>
		</div>
	{/if}
	<span class="cta white bg-black hover-black hover-bg-linen btn-m">Leggi di più</span>
</a>

<style>
	.event {
		display: flex;
		flex-direction: column;
		position: relative;
		scroll-margin-top: var(--margin);

		@media (hover: hover) {
			&:hover {
				.img {
					border-radius: 30px;
				}
			}
		}
		.tags {
			position: absolute;
			top: 0;
			left: 0;
			margin: var(--gutter);
			width: stretch;
		}
		.img {
			width: 100%;
			object-fit: cover;
			transition: var(--transition-s);
		}
		.info {
			margin: .8rem 0;
			display: flex;
			column-gap: var(--margin);
		}
		.subtitle {
			margin-top: .7rem;
		}
		.credits {
			margin-top: 1rem;
		}
		.abstract {
			margin-top: 1.5rem;
			padding-right: var(--margin);
		}
		.cta {
			margin-top: 2.5rem;
			width: fit-content;
		}
	}
</style>