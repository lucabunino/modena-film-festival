<script>
    let { seo } = $props();
    import { browser, dev } from "$app/environment";
    import { page } from "$app/state";
    import { urlFor } from '$lib/utils/image.js';

    const canonicalUrl = $derived(page.url.origin + page.url.pathname);

    const rawDesc = $derived(seo?.seoDescription || '');
    const displayDesc = $derived(rawDesc.length > 157 ? rawDesc.slice(0, 157) + '...' : rawDesc);

    const socialImageUrl = $derived(
        seo?.seoImage
            ? urlFor(seo.seoImage).width(1200).height(630).fit('crop').quality(70).format('jpg').url()
            : undefined
    );
</script>

<svelte:head>
    {#if !dev && browser}
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
        <meta name="apple-mobile-web-app-title" content={seo.seoTitle} />
        <meta property="og:title" content={seo.seoTitle} />
        <meta property="og:site_name" content={seo.seoTitle} />
        <meta name="twitter:title" content={seo.seoTitle} />
    {/if}

    {#if displayDesc}
        <meta name="description" content={displayDesc} />
        <meta property="og:description" content={displayDesc} />
        <meta name="twitter:description" content={displayDesc} />
    {/if}

    {#if socialImageUrl}
        <meta property="og:image" content={socialImageUrl} />
        <meta property="og:image:secure_url" content={socialImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={socialImageUrl} />
    {/if}

    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:locale" content="it_IT" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href={canonicalUrl} />
    <meta name="robots" content="index, follow" />
</svelte:head>