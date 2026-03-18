<script>
    let { seo, seoSingle = undefined, hidden = false } = $props();
    import { page } from "$app/state";
</script>

<svelte:head>
    {#if seo?.seoTitle && seoSingle?.seoTitle}
        <title>{seo?.seoTitle} | {seoSingle.seoTitle}</title>
        <meta name="title" content={seoSingle.seoTitle} />
        <meta name="apple-mobile-web-app-title" content={seoSingle.seoTitle} />
        <meta property="og:title" content={seoSingle.seoTitle} />
        <meta name="twitter:title" content={seoSingle.seoTitle} />
	{:else if seo?.seoTitle}
		<title>{seo.seoTitle}</title>
        <meta name="title" content={seo.seoTitle} />
        <meta name="apple-mobile-web-app-title" content={seo.seoTitle} />
        <meta property="og:title" content={seo.seoTitle} />
        <meta property="og:site_name" content={seo.seoTitle} />
        <meta name="twitter:title" content={seo.seoTitle} />
    {/if}

    {#if seo?.seoDescription}
        <meta name="description" content={seoSingle.seoDescription} />
        <meta property="og:description" content={seoSingle.seoDescription} />
        <meta name="twitter:description" content={seoSingle.seoDescription} />
    {/if}

    {#if seo?.seoImage}
        <meta property="og:image" content={seoSingle.seoImage} />
        <meta name="twitter:image" content={seoSingle.seoImage} />
    {/if}

    <link rel="canonical" href={page.url} />

    {#if hidden}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
    {:else}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
    {/if}
</svelte:head>