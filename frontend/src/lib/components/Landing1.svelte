<script>
    import Marquee from "svelte-fast-marquee";

    let { landing } = $props();
    // Providing fallbacks for nested objects to prevent errors
    let cta = $derived(landing.cta || {});
</script>

<section id="hero" class="bg-pink {landing.layout?.endsWith('-full') ? 'full' : ''}">
    <div>
        <h2 class="wb-12 uppercase">{landing.runningHead}</h2>
        <div class="mobile-only">
            <Marquee speed={100}>
                <p class="wb-cd-110-mb marquee">
                    {@html `${landing.title}&nbsp;${landing.title}&nbsp;${landing.title}&nbsp;`}
                </p>
            </Marquee>
        </div>
        <h1 class="wb-100 wb-28-mb max-w-700">{landing.subtitle}</h1>
        <p class="wb-28 wb-15-mb max-w-600">{landing.abstract}</p>
    </div>
    <div class="desktop-only">
        <Marquee speed={200}>
            <p class="wb-cd-370 marquee">
                {@html `${landing.title}&nbsp;${landing.title}&nbsp;${landing.title}&nbsp;`}
            </p>
        </Marquee>
    </div>
    {#if cta.label}
        <a 
            class="btn-l hover-black hover-bg-linen" 
            href={cta.href} 
            target={cta.blank ? "_blank" : undefined} 
            rel={cta.blank ? "noopener noreferrer" : undefined}
        >
            {cta.label}
        </a>
    {/if}
</section>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	#hero {
		grid-column: 1 / span 8;
		height: var(--heroTall);
		min-height: 600px;

		&.full {
			height: var(--heroFull);
		}
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
		
		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background: url("$lib/assets/media/hero/bg.svg") repeat-x left top;
			background-size: auto 100%;
			pointer-events: none;
			z-index: 0;
		}
		&::after {
			content: "";
			position: absolute;
			inset: 0;
			background: url("$lib/assets/media/hero/fg.svg") repeat-x left top;
			background-size: auto 100%;
			pointer-events: none;
			z-index: 1;
		}
		div:nth-child(1) {
			padding: var(--margin);
			position: relative;
			z-index: 2;
			overflow: hidden;

			h1 {
				margin-top: var(--sp-12);
			}

			p {
				margin-top: var(--sp-12);
				width: 100%;
				max-width: 600px;
			}
		}
		.marquee {
			overflow: hidden;
			z-index: 0;
			user-select: none;
		}
		a {
			position: absolute;
			left: 50%;
			bottom: var(--margin);
			transform-origin: right;
			transform: translateX(-50%);
			z-index: 2;
		}

		@media (width <= #{$lg}) {
			height: auto;
			min-height: unset;
			width: calc(100vw - var(--margin)*2);
			border-radius: 3rem;
			margin: var(--sp-32) var(--margin);
			display: grid;
			align-content: space-between;

			div:nth-child(1) {
				padding: var(--sp-36) 0 var(--margin);

				h2 {
					margin: 0 var(--margin);
				}

				h1 {
					margin: var(--sp-24) var(--margin) 0;
				}

				p {
					margin: var(--sp-96) var(--margin) 0;
					width: stretch;
				}
				.marquee {
					margin: var(--sp-12) 0 0;
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