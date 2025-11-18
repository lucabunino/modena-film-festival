<script>
	import "../scss/typography.scss";
	import "../scss/reset.scss";
	import "../scss/main.scss";
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Menu from '$lib/components/Menu.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import CookieBanner from "$lib/components/CookieBanner.svelte";
    import { fade, fly, slide } from "svelte/transition";
    import { page } from "$app/state";
    import { innerHeight, innerWidth } from "svelte/reactivity/window";
	let { children } = $props();
	const transitionOut = (node, params) => {
		return innerWidth.current > 1080 ? slide(node, { ...params, duration: 800 }) : '';
	};
	const seo = {
		SEOTitle: 'Modena Film Festival',
		SEODescription: 'TBD',
		SEOImage: '/img/placeholder.png',
	}
</script>

<svelte:head>
	{#if seo.SEOTitle}<title>{seo.SEOTitle}</title>{/if}
	{#if seo.SEODescription}<meta name="description" content={seo.SEODescription}>{/if}
	<link rel="canonical" href={page.url}>
	<meta name="robots" content="index,follow">
	<meta name="googlebot" content="index,follow">
	{#if seo.SEOTitle}<meta property="og:title" content={seo.SEOTitle}>{/if}
	{#if seo.SEODescription}<meta property="og:description" content={seo.SEODescription}>{/if}
	{#if seo.SEOImage}<meta property="og:image" content={seo.SEOImage}>{/if}
	<meta property="og:url" content={page.url}>
	<meta property="og:type" content="website">
	{#if seo.SEOTitle}<meta property="og:site_name" content={seo.SEOTitle}>{/if}
</svelte:head>

<Sidebar/>
<Menu/>
{#key page.url.pathname}
	<div out:transitionOut>
		{@render children()}
	</div>
{/key}
<Footer/>
<CookieBanner/>

<style>
	main {
		margin-left: var(--sidebarWidth);
		width: calc(100% - var(--sidebarWidth));
		position: relative;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
	}
</style>