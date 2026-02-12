<script>
    import { page } from "$app/state";
    import { urlFor } from "$lib/utils/image";

    let { seo, seoSingle = undefined, hidden = false } = $props();

    // 1. Title Logic: "Single Title | General Title" or just "General Title"
    const displayTitle = $derived(
        seoSingle?.seoTitle && seo?.seoTitle 
            ? `${seoSingle.seoTitle} | ${seo.seoTitle}` 
            : (seoSingle?.seoTitle || seo?.seoTitle)
    );

    // 2. Description Logic: Single takes priority, General is fallback
    const displayDesc = $derived(seoSingle?.seoDescription || seo?.seoDescription);

    // 3. Image Logic: Single takes priority, General is fallback
    const seoImgObj = $derived(seoSingle?.seoImage || seo?.seoImage);
    const socialImageUrl = $derived(
        seoImgObj 
            ? urlFor(seoImgObj).width(1200).height(630).fit('crop').auto('format').url() 
            : undefined
    );
</script>

<svelte:head>
    {#if displayTitle}
        <title>{displayTitle}</title>
        <meta name="title" content={displayTitle} />
        <meta property="og:title" content={displayTitle} />
        <meta name="twitter:title" content={displayTitle} />
    {/if}

    {#if displayDesc}
        <meta name="description" content={displayDesc} />
        <meta property="og:description" content={displayDesc} />
        <meta name="twitter:description" content={displayDesc} />
    {/if}

    {#if socialImageUrl}
        <meta property="og:image" content={socialImageUrl} />
        <meta name="twitter:image" content={socialImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
    {/if}

    <link rel="canonical" href={page.url.href} />

    {#if hidden}
        <meta name="robots" content="noindex, nofollow" />
    {:else}
        <meta name="robots" content="index, follow" />
    {/if}
</svelte:head>