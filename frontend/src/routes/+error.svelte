<script>
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	let seconds = $state(3)
	onMount(() => {
		if (page.status !== 404) return
		const interval = setInterval(() => {
			seconds -= 1
			if (seconds > 0) return
			clearInterval(interval)
			goto('/')
		}, 1000)
		return () => clearInterval(interval)
	})
</script>

<main id="error">
	<section>
		<h2 class="wb-12 wb-10-mb uppercase">Errore</h2>
		<h1 class="wb-cd-120 wb-cd-60-mb">{page.status}</h1>
		{#if page.status === 404}
			<p class="wb-21 wb-15-mb">Pagina non trovata. Verrai reindirizzato alla home in {seconds}…</p>
		{:else}
			<p class="wb-21 wb-15-mb">{page.error?.message}</p>
		{/if}
		<a class="btn-m bg-black white hover-black hover-bg-linen" href="/">Torna alla home</a>
	</section>
</main>

<style lang="scss">
#error {
	section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--sp-12);
	}
}
</style>
