<!--
	Adapted from _patterns/media/Media.svelte.
	Three sources, same reveal (fade in once loaded AND in viewport):
	- `media` ({type, image, imageMobile, video, videoMobile, videoPoster}) or `image` (bare Sanity image):
	  srcset + LQIP blur placeholder + palette background
	- `src` (static image file) / `src` + `video` (static mp4 with optional `poster`): fade, plus the same blurred
	  placeholder when an `lqip` image is passed. Static paths are short ('/home/1.webp') and resolved via asset()
	`class` lands on the container, which takes the place of the old <img>/<video> in the layout;
	the inner img/video always fills it with object-fit: cover.
-->
<script>
	import { urlFor } from '$lib/utils/image.js'
	import { asset } from '$lib/utils/assets.js'

	let {
		media = undefined,
		image = undefined,
		src = undefined,
		video = false,
		poster = undefined,
		// static only: small blurred preview, shown until the image/video has loaded (like a Sanity LQIP)
		lqip: staticLqip = undefined,
		alt = '',
		aspectRatio = undefined,
		class: className = '',
		sizes = '100vw',
		loading = 'lazy',
		// false: show immediately, no fade-in (e.g. partner logos)
		reveal = true,
		overlay = undefined,
	} = $props()

	function safely(fn) {
		try { return fn() } catch { return undefined }
	}

	const widths = [400, 800, 1200, 1600, 2000]
	function srcset(img) {
		return widths.map((w) => `${safely(() => urlFor(img)?.width(w).url())} ${w}w`).join(', ')
	}

	const item = $derived(media ?? (image ? { type: 'image', image } : undefined))
	const activeImage = $derived(item?.type === 'video' ? item?.videoPoster : item?.image)
	const dims = $derived(activeImage?.asset?.metadata?.dimensions)
	const lqip = $derived(staticLqip ? asset(staticLqip) : activeImage?.asset?.metadata?.lqip)
	const srcUrl = $derived(asset(src))
	const posterUrl = $derived(asset(poster))
	const palette = $derived(activeImage?.asset?.metadata?.palette?.dominant?.background)
	const finalRatio = $derived(aspectRatio ?? (dims ? dims.width / dims.height : undefined))

	let loaded = $state(false)
	let entered = $state(false)
	const revealed = $derived(!reveal || (loaded && entered) ? 'loaded' : '')
	// a video with a poster shows at once: the poster is what covers the loading (fading the element would hide it)
	const videoRevealed = $derived(poster || item?.videoPoster ? 'loaded' : revealed)

	function observeEntry(node) {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				entered = true
				observer.disconnect()
			}
		})
		observer.observe(node)
		return () => observer.disconnect()
	}

	// a cached image can finish loading before hydration attaches onload
	function checkComplete(node) {
		if (node.complete && node.naturalWidth) loaded = true
	}
</script>

<div
	class="media-container {className}"
	style:aspect-ratio={finalRatio}
	style:background-color={palette}
	{@attach observeEntry}
>
	{#if lqip}
		<div class="placeholder {revealed}" style:background-image="url({lqip})"></div>
	{/if}

	{#if src && video}
		<video class={videoRevealed} src={srcUrl} poster={posterUrl} muted loop autoplay playsinline onloadeddata={() => (loaded = true)}></video>
	{:else if src}
		<img class={revealed} src={srcUrl} {alt} {loading} onload={() => (loaded = true)} {@attach checkComplete} />
	{:else if item?.type === 'video' && item.video}
		<video
			class={videoRevealed}
			autoplay
			muted
			loop
			playsinline
			poster={safely(() => urlFor(item.videoPoster)?.url())}
			onloadeddata={() => (loaded = true)}
		>
			{#if item.videoMobile}
				<source media="(max-width: 768px)" src={item.videoMobile.asset?.url} type="video/mp4" />
			{/if}
			<source src={item.video.asset?.url} type="video/mp4" />
		</video>
	{:else if item?.image}
		<picture>
			{#if item.imageMobile}
				<source media="(max-width: 768px)" srcset={srcset(item.imageMobile)} />
			{/if}
			<img
				class={revealed}
				src={safely(() => urlFor(item.image)?.width(1200).url())}
				srcset={srcset(item.image)}
				{sizes}
				{loading}
				alt={alt || item.image?.asset?.altText || ''}
				onload={() => (loaded = true)}
				{@attach checkComplete}
			/>
		</picture>
	{/if}

	{#if overlay}
		<div class="overlay">
			{@render overlay()}
		</div>
	{/if}
</div>

<style lang="scss">
	.media-container {
		display: block;
		position: relative;
		overflow: hidden;
		isolation: isolate;

		.placeholder {
			position: absolute;
			inset: 0;
			z-index: 1;
			background-size: cover;
			background-position: center;
			transform: scale(1.1); // hides blurred edge artifacts from backdrop-filter
			filter: blur(20px);
			opacity: 1;
			transition: opacity var(--transition-s);

			&.loaded {
				opacity: 0;
			}
		}

		img,
		video {
			position: relative;
			z-index: 2;
			display: block;
			width: 100%;
			height: 100%;
			max-width: 100%;
			object-fit: cover;
			opacity: 0;
			transition: opacity var(--transition-s);

			&.loaded {
				opacity: 1;
			}
		}

		picture {
			display: contents;
		}

		.overlay {
			position: absolute;
			inset: 0;
			z-index: 3;
		}
	}
</style>
