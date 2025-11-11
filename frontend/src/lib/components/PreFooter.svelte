<script>
	let {prefooter} = $props()
</script>

<section id="pre-footer" class={[prefooter.bg]}>
	{#if prefooter.img}<img src={prefooter.img} alt="">{/if}
	<div>
		<div>
			{#if prefooter.subtitle}<h2 class="wb-12 uppercase">{prefooter.subtitle}</h2>{/if}
			{#if prefooter.title}<h3 class="wb-cd-120 uppercase max-w-800">{prefooter.title}</h3>{/if}
			{#if prefooter.content}<p class="content wb-21 max-w-600">{prefooter.content}</p>{/if}
		</div>
		<div>
			{#if prefooter.ctaLabel && prefooter.ctaLink}
				<a class="btn-l" href={prefooter.ctaLink}>{prefooter.ctaLabel}</a>
			{/if}
			{#if prefooter.annotation}<p class="annotation wb-21 max-w-600">{prefooter.annotation}</p>{/if}
		</div>
	</div>
</section>

<style lang="scss">
	#pre-footer {
		min-height: 650px;
		display: flex;
		margin-left: var(--sidebarWidth);
		width: calc(100% - var(--sidebarWidth));
		position: relative;

		>div {
			padding:  calc(var(--margin)*1.5) var(--margin);
			width: 62%;
			display: flex;
			flex-direction: column;
			gap: 3rem;
			justify-content: space-between;
		}

		img {
			width: 38%;
			height: stretch;
			object-fit: cover;
		}
		h3 {
			margin-top: 1rem;
		}
		.content {
			margin-top: 3rem;
		}
		.annotation {
			margin-top: 2rem;
		}
	}
</style>