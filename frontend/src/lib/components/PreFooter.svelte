<script>
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
		<img class="media" src={prefooter.img} alt="">
	{:else if prefooter.video}
		<video class="media" src={prefooter.video} poster={prefooter.poster ? prefooter.poster : undefined} muted loop autoplay playsinline></video>
	{/if}
	<div class={prefooter.img ? 'half' : 'wide'}>
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
	@media screen and (max-width: 768px) {
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

		@media screen and (max-width: 1080px) {
			min-height: 50vh;
			border-radius: var(--radius-l);
			margin: var(--margin);
			width: stretch;
			display: flex;
		}
		@media screen and (max-width: 768px) {
			flex-direction: column-reverse;
		}
		.media {
			width: 38%;
			height: 100%;
			height: stretch;
			object-fit: cover;
			max-height: 700px;

			@media screen and (max-width: 768px) {
				width: 100%;
				aspect-ratio: 16/9;
			}
		}
		>div {
			padding:  calc(var(--margin)*1.5) var(--margin);
			@media screen and (max-width: 1080px) {
				padding: 3rem var(--margin) var(--margin);
			}
			@media screen and (max-width: 768px) {
				text-align: center;
			}

			display: flex;
			flex-direction: column;
			gap: 3rem;
			justify-content: space-between;

			&.wide {width: 100%;}
			&.half {
				width: 62%;
				@media screen and (max-width: 768px) {
					width: 100%;

					>div:nth-child(2) {
						display: flex;

						.btn-l {
							position: absolute;
							bottom: 0;
							left: 0;
							margin: var(--gutter);
							width: calc(100% - var(--gutter)*2);
						}
					}
				}
			}

			h3 {
				margin-top: 1rem;
			}
			.content {
				margin-top: 3rem;
				@media screen and (max-width: 1080px) {
					margin-top: var(--spacing-s);
				}
			}
			.annotation {
				margin-top: 2rem;
			}

			a {
				margin-top: var(--spacing-s);
				@media screen and (max-width: 768px) {
					text-align: center;
					position: absolute;
					bottom: 0;
					left: 0;
					margin: var(--gutter);
					width: calc(100% - var(--gutter) * 2);
				}
			}
		}
	}
</style>