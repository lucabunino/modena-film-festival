<script>
	import { PortableText } from '@portabletext/svelte'
	import Title from '$lib/components/Title.svelte'
	import ContestSlider from '$lib/components/ContestSlider.svelte'
	import ProgramSection from '$lib/components/ProgramSection.svelte'
	import PortableTextStyleProject from '$lib/components/portableTextStyles/portableTextStyleProject.svelte'
	import { editionLabel, editionSlug } from '$lib/utils/edition.js'

	let { data } = $props()
</script>

<main id="archive">
	<div class="head bg-white">
		<Title title={editionLabel(data.edition)} size="l" />
		{#if data.program.intro}
			<div class="intro wb-24 wb-18-mb max-w-700">
				<PortableText value={data.program.intro}
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
	{#if data.contest?.length}
		<ContestSlider contest={data.contest} />
	{/if}
	<ProgramSection program={data.program} href="/{editionSlug(data.edition)}/programma" />
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
