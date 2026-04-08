<script>
	let { seo, seoSingle = undefined, hidden = false } = $props();
	import { page } from "$app/state";
	import { urlFor } from '$lib/utils/image.js';

	const canonicalUrl = $derived(page.url.origin + page.url.pathname);

	const displayTitle = $derived(
		seoSingle?.seoTitle
			? `${seoSingle.seoTitle} | ${seo?.seoTitle || ''}`
			: (seo?.seoTitle || '')
	);

	const rawDesc = $derived(seoSingle?.seoDescription || seo?.seoDescription || '');
	const displayDesc = $derived(rawDesc.length > 157 ? rawDesc.slice(0, 157) + '...' : rawDesc);

	const seoImgObj = $derived(seoSingle?.seoImage || seo?.seoImage);
	const socialImageUrl = $derived(
		seoImgObj
			? urlFor(seoImgObj).width(1200).height(630).fit('crop').quality(70).format('jpg').url()
			: undefined
	);
</script>

<svelte:head>
	{#if displayTitle}
		<title>{displayTitle}</title>
		<meta name="title" content={displayTitle} />
		<meta property="og:title" content={displayTitle} />
		<meta name="twitter:title" content={displayTitle} />
		<meta property="og:site_name" content={seo?.seoTitle} />
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

	{#if hidden}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}
</svelte:head>