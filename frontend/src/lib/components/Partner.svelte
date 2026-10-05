<script>
	import { asset } from '$lib/utils/assets.js'
	import Media from '$lib/components/Media.svelte'
    let { partner } = $props()
</script>

<a class="partner hover-shadow rounded-l" href={partner.href} target="_blank" rel="noopener noreferrer">
	<Media class="bg" src={partner.cover} alt="Immagine di {partner.title}" reveal={false} />
	<img class="logo" src={asset(partner.logo)} alt="Logo di {partner.title}3">
</a>

<style lang="scss">
	.partner {
		position: relative;
		transition: var(--transition-s);

		:global(.bg) {
			aspect-ratio: 4/3;
			object-fit: cover;
		}
		.logo {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			height: 70%;
			width: auto;

		}
		&:hover {
			transform: rotate(-10deg) scale(1.05);
			z-index: 2;
		}
	}

</style>