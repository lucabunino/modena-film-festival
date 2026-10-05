<script>
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
    // rules: current list (lib/content) or a frozen edition copy (lib/components/editions/<year>)
    let { rules, title } = $props()
	let sections = $state([])
</script>

<main class="bg-white">
	<Navigator title="Regolamento" {sections} cta={{label: 'Candida il tuo film', href: 'https://filmfreeway.com/festivals/93026?utm_campaign=Modena+Film+Festival&utm_medium=External&utm_source=Submission+Button', blank: true}}/>
	<Title {title} size="m"/>
	{#each rules as rule, i (rule.title)}
		<section id={i} title={rule.title} bind:this={sections[i]} class="rule">
			<h2 class="section-title wb-12 wb-10-mb uppercase">{rule.title}</h2>
			{#each rule.content as p, j (p)}
				<div class="content wb-18 wb-15-mb max-w-800">{@html p}</div>
			{/each}
		</section>
	{/each}
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
main {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	min-height: 80vh;
	.content {
		line-height: 1.2;
		&:not(:first-of-type) {
			margin-top: .6em;
		}
		:global(a) {
			text-decoration: underline;
		}
		:global(ul) {
			padding: .6em 0 .6em 2.4em;
			list-style: disc;
		}
		:global(h3) {
			margin-top: 1.2em;
		}
	}
	@media (width <= #{$lg}) {
		display: flex;
		flex-direction: column;
	}
}
</style>