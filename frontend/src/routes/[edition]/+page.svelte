<script>
	import { PortableText } from '@portabletext/svelte'
	import Title from '$lib/components/Title.svelte'
	import ContactCard from '$lib/components/ContactCard.svelte'
	import PortableTextStyleProject from '$lib/components/portableTextStyles/portableTextStyleProject.svelte'
	import { editionLabel } from '$lib/utils/edition.js'

	let { data } = $props()
</script>

<main id="archive">
	<div class="head bg-white">
		<Title title={editionLabel(data.edition)} size="l" />
		{#if data.intro?.length}
			<div class="intro wb-24 wb-18-mb max-w-700">
				<PortableText value={data.intro}
				components={{
					block: {
						normal: PortableTextStyleProject,
						h4: PortableTextStyleProject,
					},
					listItem: PortableTextStyleProject,
					marks: {
						link: PortableTextStyleProject,
					},
				}}/>
			</div>
		{/if}
	</div>
	{#if data.pages.length}
		<section class="pages contacts-grid bg-white" title="Pagine">
			{#each data.pages as page (page.slug)}
				<ContactCard contact={page} bg="bg-linen" />
			{/each}
		</section>
	{/if}
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	main {
		padding: 0;
		row-gap: 0;

		> :global(section),
		.head {
			grid-column: 1 / span 8;
		}

		@media (width <= #{$lg}) {
			margin-top: var(--menuHeight);
		}
	}
	.pages {
		padding: 0 var(--margin) var(--sp-144);

		@media (width <= #{$lg}) {
			padding-bottom: var(--sp-96);
		}
	}
	.head {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		column-gap: var(--margin);
		padding: var(--margin) var(--margin) var(--sp-96);

		.intro {
			grid-column: 1 / span 6;
			margin-top: var(--sp-24);
		}

		@media (width <= #{$lg}) {
			display: block;
			padding: var(--sp-32) var(--margin) var(--sp-48);
		}
	}
</style>
