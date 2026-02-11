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
			<h1 class="{size == 'l' ? 'wb-cd-120 wb-cd-50-mb' : size == 'm' ? 'wb-cd-80 wb-cd-30-mb' : size == 's' ? 'wb-cd-60 wb-cd-24-mb': undefined} max-w-600 uppercase">{landing.title}</h1>
		{/if}
		<h2 class="nr-35">{landing.subtitle}</h2>
	</div>
	<div class="bottom">
		<p class="wb-18">{landing.abstract}</p>
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
			z-index: 2;

			h3 {
				margin-bottom: 1rem;
			}

			h2 {
				margin-top: .7em;
			}
		}
		.bottom {
			z-index: 2;
			max-width: 600px;
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

			div:nth-child(1) {
				padding: 3rem 0 var(--margin);

				h2 {
					margin: 0 var(--margin);
				}

				h1 {
					margin: var(--spacing-xs) var(--margin) 0;
				}

				p {
					margin: var(--spacing-m) var(--margin) 0;
					width: stretch;
				}
				.marquee {
					margin: 1rem 0 0;
					max-width: unset;
				}
			}
			a {
				position: relative;
				left: unset;
				margin: 0 var(--margin) var(--margin);
				bottom: unset;
				transform: unset;
				text-align: center;
			}
		}
	}
</style>