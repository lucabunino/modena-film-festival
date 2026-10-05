<script>
	import Media from '$lib/components/Media.svelte'
	let {prefooter} = $props()
	let shaking = $state(false);
	function handleLockedclick(e) {
		e.preventDefault()
		if (shaking) return;
		shaking = true;
		setTimeout(() => (shaking = false), 600);
	}
</script>

<section id="pre-footer" class={prefooter.bg}>
	{#if prefooter.img}
		<Media class="media" src={prefooter.img} />
	{:else if prefooter.video}
		<Media class="media" src={prefooter.video} video poster={prefooter.poster} />
	{/if}
	<div class={prefooter.img || prefooter.video ? 'half' : 'wide'}>
		<div>
			{#if prefooter.subtitle}<h2 class="wb-12 wb-10-mb uppercase">{prefooter.subtitle}</h2>{/if}
			{#if prefooter.title}<h3 class="wb-cd-120 wb-cd-40-mb uppercase max-w-800">{@html prefooter.title}</h3>{/if}
			{#if prefooter.content}<p class="content wb-21 wb-15-mb max-w-600">{@html prefooter.content}</p>{/if}
		</div>
		<div>
			{#if prefooter.cta.label && prefooter.cta.href}
				<a class="btn-l hover-black hover-bg-linen {prefooter.cta.locked ? 'locked' : ''} {shaking ? 'shaking' : ''}" href={prefooter.cta.href}
				onclick={(e) => {prefooter.cta.locked ? handleLockedclick(e) : ''}}
				>{prefooter.cta.label}</a>
			{/if}
			{#if prefooter.annotation}<p class="annotation wb-15 wb-15-mb max-w-600">{@html prefooter.annotation}</p>{/if}
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
		:global(.media) {
			width: 38%;
			height: 100%;
			height: stretch;
			object-fit: cover;
			max-height: 700px;

			@media (width <= #{$md}) {
				width: 100%;
				aspect-ratio: 16/9;
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