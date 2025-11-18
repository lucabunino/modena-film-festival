<script>
	let email = $state()
	let scrollY = $state()
</script>

<svelte:window bind:scrollY></svelte:window>

<footer aria-label="Footer">
	<section id="contacts" aria-labelledby="contact-title">
		<h3 id="contact-title" class="title wb-12 wb-10-mb uppercase">Contattaci</h3>
		<p class="wb-14 wb-15-mb">Per informazioni sul festival, accreditamenti, partnership o proposte</p>
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
	<!-- <section id="newsletter" aria-labelledby="newsletter-title">
		<h3 id="newsletter-title" class="title wb-12 wb-10-mb uppercase">Newsletter</h3>
		<p class="wb-cd-60 wb-cd-40-mb uppercase">Vuoi rimanere aggiornato?</p>
		<p class="wb-14 wb-15-mb">Iscriviti per ricevere aggioramentii su programma, ospiti, eventi e iniziative del Modena Film Festival.</p>
		<form action="/newsletter" method="post" aria-label="Iscriviti alla newsletter">
			<input class="wb-21 wb-10-mb-s bg-linen" type="email" name="email" id="email" placeholder="Inserisci la tua email" required bind:value={email}>
			<button class="btn-m" type="submit" class:email>Iscriviti</button>
		</form>
	</section> -->
	<section id="project" aria-labelledby="project-title" class="wb-12 wb-10-mb">
		<div>
			<h3 id="project-title">Un progetto a cura di</h3>
			<div class="logos">
				<a href="https://www.instagram.com/crispycinemaclub/" target="_blank" rel="noopener noreferrer">
					<img src="/logos/crispy.svg" alt="Logo di Crispy Cinema Club APS">
				</a>
				<a href="https://www.longtake.it/" target="_blank" rel="noopener noreferrer">
					<img src="/logos/longtake.svg" alt="Logo di longtake">
				</a>
			</div>
		</div>
		<div>
			<h3 id="newsletter-title">Sostenuto da</h3>
			<div class="logos">
				<a href="https://www.fondazionedimodena.it/" target="_blank" rel="noopener noreferrer">
					<img src="/logos/fondazione-di-modena.svg" alt="Logo di longtake">
				</a>
			</div>
		</div>
		<div>
			<h3 id="newsletter-title">Con il patrocinio di</h3>
			<div class="logos">
				<a href="https://www.comune.modena.it/" target="_blank" rel="noopener noreferrer">
					<img src="/logos/comune-di-modena.svg" alt="Logo di longtake">
				</a>
			</div>
		</div>
	</section>
	<section id="credits" aria-label="Crediti" class="wb-12 wb-10-mb">
		<div>
			<p>Progettazione e sviluppo: <a class="btn-xs" href="https://giuliabenedetti.eu/" target="_blank" rel="noopener noreferrer">Giulia Benedetti</a> e <a class="hover-underline" href="https://www.lucabunino.com/" target="_blank" rel="noopener noreferrer">Luca Bunino</a></p>
			<p>Media partner: <a class="btn-xs" href="https://www.heroestudio.it/" target="_blank" rel="noopener noreferrer">Heroestudio</a></p>
		</div>
		<div>
			<div>
				<a href="/privacy" class="btn-xs">Privacy policy</a>
				<a href="/cookies" class="btn-xs">Cookie policy</a>
			</div>
			<button class="btn-xs desktop-s-only" onclick={() => {scrollY = 0}}>Scroll to top ↑</button>
		</div>
	</section>
	<p class="mobile-s-only wb-12 wb-10-mb">© {new Date().getFullYear()}<br>
	Modena Film Festival<br>
	All rights reserved<br>
	P.IVA 13457550963
	</p>
</footer>

<style>
	footer {
		margin-left: var(--sidebarWidth);
		width: calc(100% - var(--sidebarWidth));
		padding: calc(var(--margin)*1.5) var(--margin) var(--margin);
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		column-gap: var(--gutter);
		row-gap: var(--spacing-s);

		#contacts {
			grid-column: 1 / span 5;

			p:not(.title) {
				max-width: 500px;
				margin-top: 1.5rem;
			}
			ul {
				margin-top: 1.2rem;
				.email {
					display: block;
					width: fit-content;
					margin-top: .3rem;
				}
			}
		}

		#newsletter {
			grid-column: 6 / span 3;

			p {
				margin-top: 1.5rem;
			}

			form {
				position: relative;
				padding: 1.5rem 0;

				input[type="email"] {
					border: none;
					padding: 1.5rem var(--margin);
					width: 100%;
				}

				button[type="submit"] {
					position: absolute;
					right: var(--gutter);
					top: 50%;
					transform: translateY(-50%);
					visibility: hidden;

					&.email {
						visibility: visible;
					}
				}
			}
		}

		#project {
			grid-column: 1 / span 5;
			display: flex;
			column-gap: 6rem;

			.logos {
				display: flex;
				column-gap: var(--margin);
				margin-top: var(--spacing-xs);

				img {
					height: 5vw;
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

		@media screen and (max-width: 1080px) {
			background-color: var(--brown);
			padding-bottom: 5rem;
		}

		@media screen and (max-width: 768px) {
			grid-template-columns: repeat(1, 1fr);

			#contacts {
				grid-column: 1 / span 1;
			}

			#newsletter {
				grid-column: 1 / span 1;

				form {
					input[type="email"] {
						text-transform: uppercase;
					}
				}
			}

			#project {
				grid-column: 1 / span 1;
				flex-direction: column;
				row-gap: var(--spacing-xs);

				.logos {
					margin-top: 1rem;

					img {
						height: 15vw;
						width: auto;
					}
				}
			}

			#credits {
				grid-column: 1 / span 1;
				row-gap: var(--spacing-xs);
			}
		}
	}
</style>