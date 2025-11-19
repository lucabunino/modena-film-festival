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
    import { pageIn, pageOut } from "$lib/utils/transitions";
    import { browser, dev } from "$app/environment";
	let { children } = $props();
	let scrollY = $state(undefined)
	const seo = {
		SEOTitle: 'Modena Film Festival',
		SEODescription: 'TBD',
		SEOImage: '/img/placeholder.png',
	}

	const transitionIn = (node, params) => {
		return innerWidth.current > 1080 ? pageIn(node, { ...params, duration: 750, delay: 0, pageHeight: innerHeight.current }) : '';
	};
	const transitionOut = (node, params) => {
		return innerWidth.current > 1080 ? pageOut(node, { ...params, duration: 750, delay: 0, scrollY: scrollY }) : '';
	};
</script>

<svelte:window bind:scrollY></svelte:window>

<svelte:head>
	{#if browser}
		<script defer src="https://cloud.umami.is/script.js" data-website-id="3e32a832-2bf2-438c-bbc1-f295f745e1d3"></script>
	{/if}
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
	<div id="wrapper" in:transitionIn out:transitionOut>
		{@render children()}
		<Footer/>
	</div>
{/key}
<CookieBanner/>

<style>
#wrapper {
	width: stretch
}
</style>