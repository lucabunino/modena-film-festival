<script>
	import "../scss/reset.scss";
	import "../scss/typography.scss";
	import "../scss/main.scss";
	import favicon from '$lib/assets/favicon.svg';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<Sidebar/>
	{@render children()}
<Footer/>

<style>
	main {
		margin-left: var(--sidebarWidth);
		width: calc(100% - var(--sidebarWidth));
		position: relative;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
	}
</style>