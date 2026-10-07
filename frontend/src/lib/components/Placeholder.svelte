<!-- A top-level page with no Current edition yet (its Editorial pointer is empty) -->
<script>
	import Title from '$lib/components/Title.svelte'
	let { title, message } = $props()
</script>

<main class="bg-white">
	<Title {title} subtitles={[message]} size="m" />
</main>
