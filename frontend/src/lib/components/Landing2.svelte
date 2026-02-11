<script>
    import { rules } from "$lib/content/rules";
    import { urlFor } from "$lib/utils/image";
    import Marquee from "svelte-fast-marquee";

	let { landing } = $props()
	let cta = $derived(landing.cta)
	let size = $derived(landing.size)
</script>

<section id="hero" class="bg-linen white" style={landing.thumbnail ? `background-image: url(${urlFor(landing.thumbnail).width(1920)})` : undefined}>
	<div class="top">
		<h3 class="wb-12 uppercase">{landing.runningHead}</h3>
		{#if landing.title}
			<h1 class="{size == 'l' ? 'wb-cd-120 wb-cd-40-mb' : size == 'm' ? 'wb-cd-80 wb-cd-40-mb' : size == 's' ? 'wb-cd-60 wb-cd-24-mb': undefined} max-w-600 uppercase">{landing.title}</h1>
		{/if}
		{#if landing.subtitle}<h2 class="nr-35 nr-21-mb">{landing.subtitle}</h2>{/if}
	</div>
	<div class="bottom">
		{#if landing.abstract}
			<p class="wb-18 wb-15-mb max-w-600">{landing.abstract}</p>
		{/if}
		{#if cta.label}
			<a class="cta btn-l {landing.typeColor ? '' : 'bg-linen'} black hover-white hover-bg-black" style="{landing.typeColor ? `background-color: ${landing.typeColor.hex};` : undefined}" href={cta.href} target={cta.blank ? '_blank' : undefined} rel={cta.blank ? 'noopener noreferrer' : undefined}>{cta.label}</a>
		{/if}
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
			display: grid;

			.top {
				padding: 3rem 0 var(--margin);
			}
			.bottom {
				padding: 3rem 0 var(--margin);

				p {
					margin-top: var(--spacing-m);
				}
			}
		}

		@media screen and (max-width: 768px) {
			/* text-align: center; */

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