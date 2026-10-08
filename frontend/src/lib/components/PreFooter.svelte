<script>
	import Media from '$lib/components/Media.svelte'
	import RichText from '$lib/components/RichText.svelte'

	// prefooter: a CMS prefooter (see backend schemaTypes/prefooter.js), chosen by page path in the root layout
	let { prefooter } = $props()

	const hasMedia = $derived(
		(prefooter.mediaType === 'image' && prefooter.image) || (prefooter.mediaType === 'video' && prefooter.video)
	)
	const cta = $derived(prefooter.cta ?? {})
	// title size, the same scale as landings and news (L by default)
	const titleSizes = { l: 'wb-cd-120 wb-cd-40-mb', m: 'wb-cd-80 wb-cd-40-mb', s: 'wb-cd-60 wb-cd-24-mb' }
	const titleSize = $derived(titleSizes[prefooter.size] ?? titleSizes.l)

	let shaking = $state(false);
	function handleLockedclick(e) {
		e.preventDefault()
		if (shaking) return;
		shaking = true;
		setTimeout(() => (shaking = false), 600);
	}
</script>

<section id="pre-footer" class="bg-{prefooter.color || 'linen'}">
	{#if prefooter.mediaType === 'image' && prefooter.image}
		<Media class="media" image={prefooter.image} sizes="(width <= 768px) 100vw, 40vw" />
	{:else if prefooter.mediaType === 'video' && prefooter.video}
		<Media class="media" media={{ type: 'video', video: prefooter.video, videoPoster: prefooter.poster }} />
	{/if}
	<div class={hasMedia ? 'half' : 'wide'}>
		<div>
			{#if prefooter.subtitle}<h2 class="wb-12 wb-10-mb uppercase">{prefooter.subtitle}</h2>{/if}
			{#if prefooter.title}
				<h3 class="title {titleSize} uppercase max-w-800">{prefooter.title}</h3>
			{/if}
			{#if prefooter.content?.length}<div class="content wb-21 wb-15-mb max-w-600"><RichText value={prefooter.content} /></div>{/if}
		</div>
		<div>
			{#if cta.label && cta.href}
				<a class="btn-l hover-black hover-bg-linen {cta.locked ? 'locked' : ''} {shaking ? 'shaking' : ''}" href={cta.href}
				target={cta.blank ? '_blank' : undefined} rel={cta.blank ? 'noopener noreferrer' : undefined}
				onclick={(e) => {cta.locked ? handleLockedclick(e) : ''}}
				>{cta.label}</a>
			{/if}
			{#if prefooter.annotation?.length}<div class="annotation wb-15 wb-15-mb max-w-600"><RichText value={prefooter.annotation} /></div>{/if}
		</div>
	</div>
</section>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	@media (width <= #{$md}) {
		.max-w-600 {
			max-width: unset;
			width: 100%;
		}
	}
	#pre-footer {
		// title: one line per row in the CMS
		.title {
			white-space: pre-line;
		}

		min-height: 650px;
		display: flex;
		margin-left: var(--sidebarWidth);
		width: calc(100% - var(--sidebarWidth));
		position: relative;
		overflow: hidden;

		@media (width <= #{$lg}) {
			min-height: 50vh;
			border-radius: var(--radius-l);
			margin: var(--margin);
			width: stretch;
			display: flex;
		}
		@media (width <= #{$md}) {
			flex-direction: column-reverse;
		}
		// the media fills its box whatever its own shape: Media sets the CMS image's ratio inline, overridden here
		// desktop: a column as tall as the whole band (stretched by the flex row, no height cap)
		:global(.media) {
			width: 38%;
			flex: none;
			align-self: stretch;
			height: auto;
			aspect-ratio: auto !important;
			object-fit: cover;

			@media (width <= #{$md}) {
				width: 100%;
				aspect-ratio: 16/9 !important;
			}
		}
		>div {
			padding:  calc(var(--margin)*1.5) var(--margin);
			@media (width <= #{$lg}) {
				padding: var(--sp-36) var(--margin) var(--margin);
			}
			@media (width <= #{$md}) {
				text-align: center;
			}

			display: flex;
			flex-direction: column;
			gap: var(--sp-36);
			justify-content: space-between;

			// phones: the button is absolutely positioned (on the image), so the gap would only add empty space
			@media (width <= #{$md}) {
				gap: 0;
			}

			&.wide {width: 100%;}
			&.half {
				width: 62%;
				@media (width <= #{$md}) {
					width: 100%;

					>div:nth-child(2) {
						display: flex;

						.btn-l {
							position: absolute;
							bottom: 0;
							left: 0;
							margin: var(--sp-12) var(--gutter);
							width: calc(100% - var(--gutter)*2);
						}
					}
				}
			}

			h3 {
				margin-top: var(--sp-12);
			}
			.content {
				margin-top: var(--sp-36);
				@media (width <= #{$lg}) {
					margin-top: var(--sp-48);
				}
			}
			.annotation {
				margin-top: var(--sp-24);
			}

			a {
				margin-top: var(--sp-48);
				@media (width <= #{$md}) {
					text-align: center;
					position: absolute;
					bottom: 0;
					left: 0;
					margin: var(--sp-12) var(--gutter);
					width: calc(100% - var(--gutter) * 2);
				}
			}
		}
	}
</style>