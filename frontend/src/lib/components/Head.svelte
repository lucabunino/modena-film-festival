<script>
    import { page } from "$app/state";
    import { browser } from "$app/environment";
    import { urlFor } from "$lib/utils/image";

    let { seo } = $props();
	
    const globalImageUrl = $derived(
        seo?.seoImage 
            ? urlFor(seo.seoImage).width(1200).height(630).fit('crop').auto('format').url() 
            : undefined
    );
</script>

<svelte:head>
    {#if browser}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="3e32a832-2bf2-438c-bbc1-f295f745e1d3"></script>
    {/if}

    <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon/site.webmanifest" />

    {#if seo?.seoTitle}
        <title>{seo.seoTitle}</title>
        <meta name="title" content={seo.seoTitle} />
        <meta property="og:title" content={seo.seoTitle} />
        <meta name="twitter:title" content={seo.seoTitle} />
        <meta property="og:site_name" content={seo.seoTitle} />
    {/if}

    {#if seo?.seoDescription}
        <meta name="description" content={seo.seoDescription} />
        <meta property="og:description" content={seo.seoDescription} />
        <meta name="twitter:description" content={seo.seoDescription} />
    {/if}

    {#if globalImageUrl}
        <meta property="og:image" content={globalImageUrl} />
        <meta name="twitter:image" content={globalImageUrl} />
    {/if}

    <meta property="og:type" content="website" />
    <meta property="og:url" content={page.url.href} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={page.url.href} />

    <link rel="canonical" href={page.url.href} />
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
</svelte:head>