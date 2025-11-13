<script>
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
    import { rules } from "$lib/content/rules";
	let sections = $state([])
</script>

<main class="bg-white">
	<Navigator title="Regolamento" {sections} cta={{label: 'Candida il tuo film', href: '/sponsor', blank: true}}/>
	<Title title='Regolamento<br>Modena Film Festival<br>Edizione 2026' size={'m'}/>
	{#each rules as rule, i}
		<section id={i} title={rule.title} bind:this={sections[i]} class="rule">
			<h2 class="section-title wb-12 uppercase">{rule.title}</h2>
			{#each rule.content as p, j}
				<div class="content wb-18 max-w-800">{@html p}</div>
			{/each}
		</section>
	{/each}
</main>

<style>
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
}
</style>