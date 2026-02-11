<script>
    import Marquee from "svelte-fast-marquee";
</script>

<section id="hero" class="bg-pink">
	<div>
		<h2 class="wb-12 uppercase">Iscrizioni aperte</h2>
		<div class="mobile-only">
			<Marquee speed=100>
				<p class="wb-cd-110-mb marquee">{@html 'Open Call Open Call Open Call&nbsp;'}</p>
			</Marquee>
		</div>
		<h1 class="wb-100 wb-28-mb">15—19.4.2026</h1>
		<p class="wb-28 wb-15-mb">Una visione diversa: è in arrivo un nuovo Festival! Vuoi candidare il tuo film? Invia la tua submission tramite FilmFreeway cliccando qui sotto.</p>
	</div>
	<div class="desktop-only">
		<Marquee speed=200>
			<p class="wb-cd-370 marquee">{@html 'Open Call Open Call Open Call&nbsp;'}</p>
		</Marquee>
	</div>
	<a class="btn-l hover-black hover-bg-linen" href="https://filmfreeway.com/festivals/93026?utm_campaign=Modena+Film+Festival&utm_medium=External&utm_source=Submission+Button" target="_blank" rel="noopener noreferrer">Candida il tuo film</a>
</section>

<style>
	#hero {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
		
		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background: url("/hero/bg.svg") repeat-x left center;
			background-size: auto 100%;
			pointer-events: none;
			z-index: 0;
		}
		&::after {
			content: "";
			position: absolute;
			inset: 0;
			background: url("/hero/fg.svg") repeat-x left center;
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
				margin-top: 1rem;
			}

			p {
				margin-top: 1rem;
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