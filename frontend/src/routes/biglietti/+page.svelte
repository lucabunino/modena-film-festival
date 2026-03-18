<script>
    import Title from "$lib/components/Title.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import PreFooter from "$lib/components/PreFooter.svelte";
	import { register } from 'swiper/element/bundle';register();
	import HeadSingle from "$lib/components/HeadSingle.svelte";
    import { fade, slide } from "svelte/transition";
	let { data } = $props()
	let shakingItems = $state({});
	function handleLockedclick(e, id) {
		e.preventDefault();
		if (shakingItems[id]) return;
		shakingItems[id] = true;
		setTimeout(() => {
			shakingItems[id] = false;
		}, 600);
	}
	let sections = $state([])
	let mousePos = $state({ x: 0, y: 0 });
    let isHovering = $state(false);
	let side = $state(undefined);
    function handleMouseMove(e) {
        mousePos = { x: e.clientX, y: e.clientY };
		side = e.clientX > (window.innerWidth / 2) ? 'left' : 'right';
    }
	const seoSingle = { seoTitle: 'Biglietti'}
	const WebticHref = "https://www.webtic.it/app/shopping/loadLocal/MO/7348"
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Navigator title="Biglietti" {sections}/>
	<Title
	subtitles={["L'abbonamento MFF2026 è acquistabile online sulla piattaforma Webtic, nella sezione abbonamenti.", "Dal 24 marzo potrai prenotare il tuo posto agli eventi in programma e acquistare l'ingresso agli eventi esclusi dall'abbonamento."]}
	size={'l'}
	cta={{href: WebticHref, label: 'Compra su', blank: true, webtic: true}}
	/>
	<section id="buy" title="Compra" bind:this={sections[0]}>
		<a class="ticket x2 rounded-l white" href={WebticHref} target="_blank" rel="noopener noreferrer"
		onmousemove={handleMouseMove}
		onmouseenter={() => isHovering = true}
		onmouseleave={() => isHovering = false}
		>
			<video class="bg" src="/tickets/abbonamento-min.mp4" poster="abbonamento-min.webp" muted loop autoplay playsinline></video>
			<div>
				<h3 class="wb-cd-80 wb-cd-40-mb uppercase">Abbonamento</h3>
				<div class="tags wb-12 uppercase">
					<label class="tag black bg-white">33€</label>
					<label class="tag black bg-white">Richiesta prenotazione singoli eventi</label>
				</div>
				<h4 class="date bolder wb-18 wb-15-mb">15–19 aprile 2026</h4>
			</div>
			<div class="wb-18 wb-15-mb max-w-600">
				<p>L'abbonamento MFF2026 consente l'accesso a tutte le proiezioni e gli eventi del Festival. Non include l'evento di pre-apertura, il <em>Cineconcerto Sherlock Jr.</em> musicato da Samuel, l'evento speciale olfatto.</p>
			</div>
		</a>
		<a class="ticket x1 rounded-l white locked {shakingItems['sherlock'] ? 'shaking' : undefined}" target="_blank" rel="noopener noreferrer"
		onclick={(e) => handleLockedclick(e, 'sherlock')}
		>
			<img class="bg" src="/tickets/sherlock3.webp" alt="">
			<div>
				<h3 class="wb-cd-60 wb-cd-40-mb uppercase max-w-500">Cineconcerto Sherlock Jr.</h3>
				<div class="tags wb-12 uppercase">
					<label class="tag black bg-white">A breve disponibile</label>
					<!-- <label class="tag black bg-white">20€</label>
					<label class="tag black bg-white">Codice sconto 5€ con abbonamento</label> -->
				</div>
				<h4 class="date bolder wb-18 wb-15-mb">Con Samuel Umberto Romano<br>16 aprile alle 21:00</h4>
			</div>
			<p class="wb-18 wb-15-mb max-w-600">Nella giornata dedicata all’udito, cinema muto e musica contemporanea si incontrano: Samuel sonorizza dal vivo Sherlock Jr. (1924) di Buster Keaton. Un dialogo potente tra immagini e suono.</p>
		</a>
		<a class="ticket x1 rounded-l white blurred locked {shakingItems['odorama'] ? 'shaking' : undefined}" target="_blank" rel="noopener noreferrer"
		onclick={(e) => handleLockedclick(e, 'odorama')}
		>
			<img class="bg" src="/tickets/odorama.webp" alt="">
			<div>
				<h3 class="wb-cd-60 wb-cd-40-mb uppercase max-w-500">Speciale olfatto</h3>
				<div class="tags wb-12 uppercase">
					<label class="tag black bg-white">Maggiori info a breve</label>
					<!-- <label class="tag black bg-white">5€</label>
					<label class="tag black bg-white">150 posti</label> -->
				</div>
				<!-- <h4 class="date bolder wb-18 wb-15-mb">TBD</h4> -->
			</div>
		</a>
		{#if isHovering && mousePos.x}
			<p class="cursor desktop-only btn-l bg-linen black" transition:slide={{duration: 200, axis: 'x'}}
			style="left: {mousePos.x}px; top: {mousePos.y}px; display: {isHovering ? 'inline-block' : 'none'}; transform: translate({side === 'left' ? '-100%' : '0%'}, -50%);"
			>Compra su <img class="webtic" src="/logos/webtic.webp" alt=""></p>
		{/if}
	</section>
	<section id="become-supporter" title="Come funziona" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Come funziona</h2>
		<p class="wb-24 wb-18-mb max-w-700">L'abbonamento MFF2026 consente l'accesso a tutte le proiezioni e gli eventi del Festival. Non include l'evento di pre-apertura, il <em>Cineconcerto Sherlock Jr.</em>, l'evento speciale olfatto, che vanno acquistati separatamente.</p>
		<p class="wb-24 wb-18-mb max-w-700">Gli abbonati hanno diritto a uno sconto di 5€ sull'evento <em>Cineconcerto Sherlock Jr.</em>, selezionando l'opzione di acquisto RIDOTTO ABBONAMENTO WEB. All'ingresso potrà essere verificato il possesso dell'abbonamento.</p>
		<p class="wb-24 wb-18-mb max-w-700">Per ogni film che vuoi vedere dovrai redimere il biglietto in anticipo, direttamente dalla tua area personale Webtic. Ti ricordiamo che l'ingresso in sala è soggetto alla disponibilità dei posti, quindi ti consigliamo di redimerlo per tempo!</p>
		<p class="wb-24 wb-18-mb max-w-700">Il tuo badge personale potrà essere ritirato durante il festival presso l'ufficio accrediti al Cortile del Leccio, in <a class="underline" href="https://share.google/15w19rJ5QGejKBXGb" target="_blank" rel="noopener noreferrer">via Francesco Selmi 67</a>, a Modena. Tienilo sempre con te: ti darà diritto a sconti esclusivi presso tutti i locali convenzionati con Modena Film Festival.</p>
		<p class="wb-24 wb-18-mb max-w-700">Sarà possibile anche acquistare singolarmente ciascun evento, a un costo unitario maggiore rispetto a quello garantito dall'abbonamento.</p>
		<p class="wb-24 wb-18-mb max-w-700">L'abbonamento è strettamente personale e non cedibile. All'ingresso potranno essere effettuati controlli per verificare la titolarità dell'accredito.</p>
	</section>
</main>
<!-- <PreFooter {prefooter}/> -->

<style>
#buy {
	grid-column: 1 / span 8;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: var(--margin);
	row-gap: var(--margin);
	
	.ticket {
		display: block;
		padding: 2rem var(--gutter) 3rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-size: cover;
		background-position: center;
		position: relative;
		min-height: 450px;
		z-index: 1;

		@media screen and (max-width: 768px) {
			min-height: 400px;
			text-align: center;
			align-items: center;

			.tags {
				justify-content: center;
			}
		}
		
		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			object-fit: cover;
			transition: var(--transition-s);
		}

		&:not(.locked):hover {
			.bg {
				transform: scale(1.03);
			}
		}

		&.x1 { 
			grid-column: span 1;
			
			@media screen and (max-width: 1080px) {
				grid-column: span 2;
			}
		}
		&.x2 { grid-column: span 2;}

		h3 {
			margin-bottom: 1rem;
		}
		h4 {
			margin-top: 2rem;
		}
	}
}
.cursor {
	position: fixed;
	pointer-events: none;
	z-index: 999;
	display: block;
	overflow: hidden;
	width: max-content;
	white-space: nowrap;
	transition: var(--transition-s);
	transition-property: transform;
	margin-top: 4rem;

	.webtic {
		display: inline-block;
		position: relative;
		top: .25em;
		height: 1.25em;
		margin-top: -.5em;
		width: auto;
	}
}
#become-supporter {
	p + p {
		margin-top: .6em;
	}
}
</style>