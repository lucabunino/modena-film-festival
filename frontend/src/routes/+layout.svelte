<script>
	import "../scss/typography.scss";
	import "../scss/reset.scss";
	import "../scss/main.scss";
	import favicon from '$lib/assets/favicon.svg';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Banner from "$lib/components/Banner.svelte";
    import { fade, fly, slide } from "svelte/transition";
    import { page } from "$app/state";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<Sidebar/>
{#key page.url.pathname}
	<div out:slide={{duration: 800}}>
		{@render children()}
	</div>
{/key}
<Footer/>
<Banner/>

<style>
	main {
		margin-left: var(--sidebarWidth);
		width: calc(100% - var(--sidebarWidth));
		position: relative;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
	}
</style>