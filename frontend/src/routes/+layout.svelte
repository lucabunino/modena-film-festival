<script>
	import "../scss/typography.scss";
	import "../scss/reset.scss";
	import "../scss/main.scss";
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Menu from '$lib/components/Menu.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Head from '$lib/components/Head.svelte';
    import CookieBanner from "$lib/components/CookieBanner.svelte";
    import { fade, fly, slide } from "svelte/transition";
    import { page } from "$app/state";
    import { innerHeight, innerWidth } from "svelte/reactivity/window";
    import { pageIn, pageOut } from "$lib/utils/transitions";
    import { browser, dev } from "$app/environment";
	let { data, children } = $props();
	let scrollY = $state(undefined)

	const transitionIn = (node, params) => {
		return innerWidth.current > 1080 ? pageIn(node, { ...params, duration: 750, delay: 0, pageHeight: innerHeight.current }) : '';
	};
	const transitionOut = (node, params) => {
		return innerWidth.current > 1080 ? pageOut(node, { ...params, duration: 750, delay: 0, scrollY: scrollY }) : '';
	};
</script>

<svelte:window bind:scrollY></svelte:window>
<Head seo={data.seo} />
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