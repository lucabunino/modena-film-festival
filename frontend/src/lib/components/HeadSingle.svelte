<script>
    import { page } from "$app/state";
    let { seo, seoSingle = {}, hidden = false } = $props();

    const finalTitle = seoSingle?.seoTitle 
        ? `${seoSingle.seoTitle} | ${seo?.seoTitle || ''}` 
        : (seo?.seoTitle || 'Titolo Default');

    const finalDesc = seoSingle?.seoDescription || seo?.seoDescription;
    const finalImage = seoSingle?.seoImage || seo?.seoImage;
</script>

<svelte:head>
    <title>{finalTitle}</title>
    <meta name="title" content={finalTitle} />
    <meta name="apple-mobile-web-app-title" content={finalTitle} />
    <meta property="og:title" content={finalTitle} />
    <meta name="twitter:title" content={finalTitle} />

    {#if finalDesc}
        <meta name="description" content={finalDesc} />
        <meta property="og:description" content={finalDesc} />
        <meta name="twitter:description" content={finalDesc} />
    {/if}

    {#if finalImage}
        <meta property="og:image" content={finalImage} />
        <meta name="twitter:image" content={finalImage} />
        <meta name="twitter:card" content="summary_large_image" />
    {/if}

    <link rel="canonical" href={page.url.href} />

    {#if hidden}
        <meta name="robots" content="noindex, nofollow" />
    {:else}
        <meta name="robots" content="index, follow" />
    {/if}
</svelte:head>