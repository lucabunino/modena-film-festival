<script>
	import { asset } from '$lib/utils/assets.js'
	import { page } from '$app/state'
	import { eventHref } from '$lib/utils/edition.js'
	import Media from '$lib/components/Media.svelte'
    import { formatEventDate, formatISO } from "$lib/utils/datetime";

    let { event } = $props()

	let canBuy = $derived.by(() => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        const now = new Date();
        const oneHourPastEvent = eventDate.getTime() + (60 * 60 * 1000);
        return now.getTime() >= oneHourPastEvent;
    });
</script>

<div class="card">
	<a class="event" href={eventHref(event.slug.current, page.params.edition)}>
		<div class="visual">
			{#if event.thumbnail}
				<Media class="img _3_2 bg-linen" image={event.thumbnail} aspectRatio={3/2} sizes="(width <= 1024px) 100vw, 33vw" />
			{:else}
				<div class="img _3_2 bg-brown"></div>
			{/if}
			{#if event.formats}
				<div class="tags wb-12 wb-10-mb uppercase">
					{#if event.soldOut}
						<span class="tag white bg-black">Sold out</span>
					{/if}
					{#each event.formats as format, i (format.slug.current)}
						<span class="tag bg-white">{format.title}</span>
					{/each}
				</div>
			{/if}
			<!-- caption on the image, white over a dark gradient -->
			<div class="caption white">
				<div class="info wb-12 uppercase">
					<time class="datetime" datetime={formatISO(event.start, event.end)}>{formatEventDate(event.start, event.end)}</time>
					{#if event.location}<p class="location">{event.location.title}</p>{/if}
				</div>
				<h2 class="title wb-24 wb-21-mb bold">{event.title}</h2>
				{#if event.subtitle}<h3 class="subtitle nr-24">{event.subtitle}</h3>{/if}
			</div>
		</div>
	</a>
	{#if event.webticHref && !event.soldOut && canBuy}
		<a class="cta buy btn-m black bg-linen hover-black hover-bg-linen" href={event.webticHref} target="_blank" rel='noopener noreferrer'
		>Compra su <img class="webtic" src={asset('/logos/webtic.webp')} alt=""></a>
	{/if}
</div>

<style lang="scss">
	.card {
		@media (hover: hover) {
			&:hover {
				background-color: var(--linen);
			}
		}
	}
	.event {
		display: flex;
		flex-direction: column;
		position: relative;
		scroll-margin-top: var(--margin);

		// image with its overlays: tags on top, caption (title, subtitle, date + venue) at the bottom
		.visual {
			// fixed inset (same on mobile): above/left of the tags, below/left of the caption
			--inset: var(--sp-14);
			position: relative;
			overflow: hidden; // hides the caption while it sits below the image

			:global(.img) {
				width: 100%;
				object-fit: cover;
			}
			.tags {
				position: absolute;
				z-index: 1;
				top: 0;
				left: 0;
				margin: var(--inset);
				width: stretch;
			}
			.caption {
				position: absolute;
				z-index: 1;
				inset: auto 0 0;
				padding: var(--sp-24) var(--margin) var(--inset) var(--margin);
				background: linear-gradient(transparent, rgba(0, 0, 0, .45));
				transition: transform var(--transition-xs);

				// progressive blur: full strength at the bottom, masked out towards the top
				&::before {
					content: "";
					position: absolute;
					inset: 0;
					z-index: -1;
					backdrop-filter: blur(4px);
					-webkit-backdrop-filter: blur(4px);
					-webkit-mask-image: linear-gradient(transparent, black 70%);
					mask-image: linear-gradient(transparent, black 70%);
				}

				.info {
					display: flex;
					column-gap: var(--margin);
					margin-bottom: var(--sp-6);
				}
				.subtitle {
					margin-top: var(--sp-2);
				}
				// mouse/trackpad: parked below the image, slides up on hover
				@media (hover: hover) {
					transform: translateY(100%);
				}
				// touch: original layout, plain text below the image (no overlay)
				@media (hover: none) {
					position: static;
					padding: var(--sp-20) var(--margin) var(--sp-48);
					background: none;
					color: var(--black);

					&::before {
						display: none;
					}
				}
			}
		}
		@media (hover: hover) {
			&:hover .visual .caption,
			&:focus-visible .visual .caption {
				transform: none;
			}
		}
	}
	.cta {
		margin-left: var(--margin);
		margin-bottom: var(--sp-20); // same bottom space as the text block, visible on the hover background
		width: fit-content;
		&.buy:hover {
			filter: invert(1);
		}
		.webtic {
			display: inline-block;
			position: relative;
			top: .15em;
			height: 1.25em;
			margin-top: -.5em;
			width: auto;
		}
	}
</style>