<script>
	import Media from '$lib/components/Media.svelte'
    import { urlFor } from "$lib/utils/image";
</script>

<section id="hero" class="bg-linen white">
	<Media class="bg" src="/tickets/abbonamento-min.mp4" video poster="/tickets/abbonamento-min.webp" />
	<div class="top">
		<h3 class="wb-12 uppercase">Abbonamenti disponibili</h3>
		<h1 class="wb-cd-120 wb-cd-40-mb max-w-600 uppercase">Abbonati al Festival</h1>
	</div>
	<div class="bottom">
		<a class="cta btn-l black hover-black hover-bg-linen" href="/biglietti">Vai a: Biglietti</a>
	</div>
</section>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	#hero {
		grid-column: 1 / span 8;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		position: relative;
		padding: var(--margin);
		background-position: center;
		background-size: cover;
		overflow: hidden;

		:global(.bg) {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.thumbnail {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
		.top {
			width: stretch;
			z-index: 2;

			h3 {
				margin-bottom: var(--sp-12);
			}

			h2 {
				margin-top: .7em;
			}
		}
		.bottom {
			width: stretch;
			z-index: 2;

			margin-bottom: var(--margin);
			
			p {
				width: 100%;
			}
			.cta {
				margin-top: var(--sp-24);
			}
		}

		@media (width <= #{$lg}) {
			height: auto;
			width: calc(100vw - var(--margin)*2);
			border-radius: 3rem;
			margin: var(--sp-24) var(--margin);
			padding-top: 0;
			display: flex;
			min-height: 450px;

			.top {
				padding: var(--sp-36) 0 var(--margin);
			}
			.bottom {
				margin-bottom: 0;
				padding: 0;

				p {
					margin-top: var(--sp-96);
				}
			}
		}

		@media (width <= #{$md}) {
			text-align: center;

			.top {
				h1 {
					max-width: unset;
				}
			}

			.bottom {
				p {
					max-width: unset;
				}

				.cta {
					width: 100%;
					text-align: center;
				}
			}
		}
	}
</style>