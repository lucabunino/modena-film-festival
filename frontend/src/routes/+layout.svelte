<script>
	import '$lib/scss/typography.scss'
	import '$lib/scss/reset.scss'
	import '$lib/scss/main.scss'
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Menu from '$lib/components/Menu.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Head from '$lib/components/Head.svelte';
    import CookieBanner from "$lib/components/CookieBanner.svelte";
    import NewsletterModal from "$lib/components/NewsletterModal.svelte";
    import Alert from "$lib/components/Alert.svelte";
    import { fade, fly, slide } from "svelte/transition";
    import { page } from "$app/state";
    import { innerHeight } from "svelte/reactivity/window";
    import { getResponsive } from "$lib/stores/responsive.svelte.js";
    import { pageIn, pageOut } from "$lib/utils/transitions";
    import { browser, dev } from "$app/environment";
    import { onMount } from "svelte";
	let { data, children } = $props();
	const responsive = getResponsive()
	let scrollY = $state(undefined)

    const transitionIn = (node, params) => {
        if (!browser || responsive.underLg) return;
        return pageIn(node, { ...params, duration: 1000, pageHeight: innerHeight.current });
    };
    const transitionOut = (node, params) => {
        if (!browser || responsive.underLg) return;
        return pageOut(node, { ...params, duration: 1000, scrollY });
    };
</script>

<svelte:window bind:scrollY></svelte:window>
<Head />
<Sidebar menu={data.menu} />
<Menu menu={data.menu} />
{#key page.url.pathname}
	<div id="wrapper" in:transitionIn out:transitionOut>
		{@render children()}
		{#if !page.error}<Footer/>{/if}
	</div>
{/key}
<CookieBanner/>
<NewsletterModal />
<!-- outside the {#key} above, so it stays mounted while browsing an edition's pages -->
{#if page.params.edition}
	<Alert title="Attenzione!" message="Stai visitando l’archivio di un’edizione passata del Modena Film Festival." />
{/if}

<style lang="scss">
#wrapper {
	width: stretch
}
</style>