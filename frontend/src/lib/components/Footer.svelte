<script>
	import { asset } from '$lib/utils/assets.js'
	import { getNewsletter } from '$lib/stores/newsletter.svelte.js'
	import { page } from '$app/state'
	const newsletter = getNewsletter()
	// the menu's "Show newsletter" switch also hides the footer's newsletter block
	const showNewsletter = $derived(page.data.menu?.showNewsletter !== false)
</script>

<footer aria-label="Footer">
	<section id="contacts" aria-labelledby="contact-title">
		<h3 id="contact-title" class="title wb-12 wb-10-mb uppercase">Contattaci</h3>
		<p class="wb-14 wb-15-mb">Per informazioni sul Festival, accreditamenti o altro</p>
		<ul class="contact-list" aria-label="Indirizzi email di contatto">
			<!-- <li>
				<a class="email btn-m bg-linen hover-bg-black" href="mailto:press@modenafilmfestival.it">
					press@modenafilmfestival.it
				</a>
			</li> -->
			<li>
				<a class="email btn-m bg-linen hover-bg-black" href="mailto:info@modenafilmfestival.it">
					info@modenafilmfestival.it
				</a>
			</li>
		</ul>
	</section>
	{#if showNewsletter}
	<section id="newsletter" aria-labelledby="newsletter-title">
		<h3 id="newsletter-title" class="title wb-12 wb-10-mb uppercase">Newsletter</h3>
		<p class="wb-cd-60 wb-cd-40-mb uppercase">Vuoi rimanere aggiornato?</p>
		<p class="wb-14 wb-15-mb">Iscriviti per ricevere aggiornamenti su programma, ospiti, eventi e iniziative del Modena Film Festival.</p>
		<button class="subscribe btn-l bg-linen black hover-white hover-bg-black" type="button" onclick={() => newsletter.setOpen(true)}>Iscriviti alla newsletter</button>
	</section>
	{/if}
	<section id="project" aria-labelledby="project-title" class="wb-12 wb-10-mb">
		<div>
			<h3 id="project-title">Un progetto organizzato da</h3>
			<div class="logos">
				<a href="https://www.instagram.com/crispycinemaclub/" target="_blank" rel="noopener noreferrer">
					<img src={asset('/logos/crispy.svg')} alt="Logo di Crispy Cinema Club APS">
				</a>
				<a href="https://www.longtake.it/" target="_blank" rel="noopener noreferrer">
					<img src={asset('/logos/longtake.svg')} alt="Logo di longtake">
				</a>
			</div>
		</div>
		<div>
			<h3 id="newsletter-title">Sostenuto da</h3>
			<div class="logos">
				<a href="https://www.fondazionedimodena.it/" target="_blank" rel="noopener noreferrer">
					<img src={asset('/logos/fondazione-di-modena.svg')} alt="Logo di longtake">
				</a>
			</div>
		</div>
		<div>
			<h3 id="newsletter-title">Con il patrocinio di</h3>
			<div class="logos">
				<a href="https://www.comune.modena.it/" target="_blank" rel="noopener noreferrer">
					<img src={asset('/logos/comune-di-modena.svg')} alt="Logo di longtake">
				</a>
				<a href="https://modenafuturacreativa.it/" target="_blank" rel="noopener noreferrer">
					<img src={asset('/logos/modena-media-arts.svg')} alt="Logo di longtake">
				</a>
				<a href="https://www.regione.emilia-romagna.it/" target="_blank" rel="noopener noreferrer">
					<img src={asset('/logos/regione-emilia-romagna.svg')} alt="Logo di longtake">
				</a>
			</div>
		</div>
	</section>
	<section id="credits" aria-label="Crediti" class="wb-12 wb-10-mb">
		<div>
			<p>Progettazione grafica e sviluppo: <a class="btn-xs" href="https://giuliabenedetti.eu/" target="_blank" rel="noopener noreferrer">Giulia Benedetti</a> e <a class="hover-underline" href="https://www.lucabunino.com/" target="_blank" rel="noopener noreferrer">Luca Bunino</a></p>
			<!-- <p>Social e media partner: <a class="btn-xs" href="https://www.heroestudio.it/" target="_blank" rel="noopener noreferrer">Heroestudio</a> e <a class="btn-xs" href="https://www.instagram.com/giorgiasandonibellucci" target="_blank" rel="noopener noreferrer">Giorgia Sandoni Bellucci</a></p>
			<p>Ufficio stampa: <a class="btn-xs" href="https://nevent.it/" target="_blank" rel="noopener noreferrer">Nevent</a></p>
			<p>Media partner: <a class="btn-xs" href="https://www.instagram.com/spotmodena" target="_blank" rel="noopener noreferrer">SPOT Modena</a></p> -->
		</div>
		<div>
			<div>
				<a href="/privacy" class="btn-xs">Privacy policy</a>
				<a href="/cookies" class="btn-xs">Cookie policy</a>
			</div>
			<button class="btn-xs desktop-s-only" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Torna su ↑</button>
		</div>
	</section>
	<p class="mobile-s-only wb-12 wb-10-mb">© {new Date().getFullYear()}<br>
	Modena Film Festival<br>
	All rights reserved</p>
</footer>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	footer {
		margin-left: var(--sidebarWidth);
		width: calc(100% - var(--sidebarWidth));
		padding: calc(var(--margin)*1.5) var(--margin) var(--margin);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		column-gap: var(--gutter);
		row-gap: var(--sp-48);
		position: relative;
		z-index: 4; // the fixed Alert shares 4 but comes later in the page, so it stays above the footer
		background-color: var(--white);

		#contacts {
			grid-column: 1 / span 5;

			p:not(.title) {
				max-width: 500px;
				margin-top: var(--sp-18);
			}
			ul {
				margin-top: var(--sp-14);
				.email {
					display: block;
					width: fit-content;
					margin-top: var(--sp-4);
				}
			}
		}

		#newsletter {
			grid-column: 6 / span 3;

			p {
				margin-top: var(--sp-18);
			}

			.subscribe {
				margin-top: var(--sp-24);
			}
		}

		#project {
			grid-column: 1 / span 5;
			display: flex;
			column-gap: var(--sp-48);

			.logos {
				display: flex;
				column-gap: var(--margin);
				margin-top: var(--sp-24);

				img {
					height: 4vw;
					width: auto;
				}
			}
		}

		#credits {
			grid-column: 6 / span 3;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			div:nth-child(2) {
				display: flex;
				justify-content: space-between;
				
				div {
					display: flex;
					column-gap: var(--gutter);
				}
			}

			p+p {
				margin-top: .2em;
			}
		}

		@media (width <= #{$lg}) {
			background-color: var(--brown);
			z-index: 4;
			position: relative;
		}

		@media (width <= #{$md}) {
			grid-template-columns: repeat(1, 1fr);

			#contacts {
				grid-column: 1 / span 1;
			}

			#newsletter {
				grid-column: 1 / span 1;
			}

			#project {
				grid-column: 1 / span 1;
				flex-direction: column;
				row-gap: var(--sp-24);

				.logos {
					margin-top: var(--sp-12);

					img {
						height: 15vw;
						width: auto;
					}
				}
			}

			#credits {
				grid-column: 1 / span 1;
				row-gap: var(--sp-24);
			}
		}
	}
</style>