<script>
    let { partner } = $props()
</script>

<a class="partner hover-shadow rounded-l" href={partner.href} target="_blank" rel="noopener noreferrer">
	<img class="bg" src={partner.cover} alt="Immagine di {partner.title}">
	<img class="logo" src={partner.logo} alt="Logo di {partner.title}3">
</a>

<style>
	.partner {
		position: relative;
		transition: var(--transition);

		.bg {
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