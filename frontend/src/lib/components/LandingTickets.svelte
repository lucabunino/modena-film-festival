<script>
    import { rules } from "$lib/content/rules";
    import { urlFor } from "$lib/utils/image";
</script>

<section id="hero" class="bg-linen white">
	<video class="bg" src="/tickets/abbonamento-min.mp4" poster="/tickets/abbonamento-min.webp" muted loop autoplay playsinline></video>
	<div class="top">
		<h3 class="wb-12 uppercase">Abbonamenti disponibili</h3>
		<h1 class="wb-cd-120 wb-cd-40-mb max-w-600 uppercase">Abbonati al festival</h1>
	</div>
	<div class="bottom">
		<a class="cta btn-l black hover-black hover-bg-linen" href="/biglietti">Vai a: Biglietti</a>
	</div>
</section>

<style>
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

		.bg {
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
				margin-bottom: 1rem;
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
				margin-top: var(--spacing-xs);
			}
		}

		@media screen and (max-width: 1080px) {
			height: auto;
			width: calc(100vw - var(--margin)*2);
			border-radius: 3rem;
			margin: var(--spacing-xs) var(--margin);
			padding-top: 0;
			display: flex;
			min-height: 450px;

			.top {
				padding: 3rem 0 var(--margin);
			}
			.bottom {
				margin-bottom: 0;
				padding: 0;

				p {
					margin-top: var(--spacing-m);
				}
			}
		}

		@media screen and (max-width: 768px) {
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