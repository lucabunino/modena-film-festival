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
	const SubscriptionHref = "https://www.webtic.it/app/shop?action=loadSubscriptions&localId=7348"
	const SherlockHref = "https://secure.webtic.it/angwt/webtic.aspx?pu=aHR0cHM6Ly93d3cud2VidGljLml0L2FwcC9zaG9wcGluZy9sb2FkTG9jYWwvTU8vNzM0OA==&rnd=0.187350648676209&lng=it&lid=7348&tpl=blue&lvs=bnVsbA==&kid=33&cc=WyJuZWNlc3NhcnkiXQ==#/event/it/33/7348/2514"
	const OdoramaHref = "https://www.webtic.it/app/shopping/loadEvent/MO/7348/10081730/2456"
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Navigator title="Biglietti" {sections}/>
	<Title
	subtitles={[
		"Biglietti e abbonamento MFF2026 sono acquistabili online, sulla piattaforma Webtic.",
		"L'abbonamento MFF2026 consente l'accesso a tutte le proiezioni e gli eventi del Festival. Non include l'evento di pre-apertura <em>Cineconcerto Grand Tour Italiano</em>, il <em>Cineconcerto Sherlock Jr.</em> e <em>Odorama. The Truman Show</em>.",
		"Per poter accedere in sala, è richiesta la prenotazione ai singoli eventi, anche per i possessori dell'abbonamento.",
		]}
	size={'l'}
	cta={{href: WebticHref, label: 'Singoli eventi', blank: true, webtic: true}}
	/>
	<section id="buy" title="Compra" bind:this={sections[0]}>
		<a class="ticket x2 rounded-l white" href={SubscriptionHref} target="_blank" rel="noopener noreferrer"
		onmousemove={handleMouseMove}
		onmouseenter={() => isHovering = true}
		onmouseleave={() => isHovering = false}
		>
			<video class="bg" src="/tickets/abbonamento-min.mp4" poster="/tickets/abbonamento-min.webp" muted loop autoplay playsinline></video>
			<div>
				<h3 class="wb-cd-80 wb-cd-40-mb uppercase">Abbonamento</h3>
				<div class="tags wb-12 uppercase">
					<label class="tag black bg-white">33€</label>
					<label class="tag black bg-white">Richiesta prenotazione singoli eventi</label>
				</div>
				<h4 class="date bolder wb-18 wb-15-mb">15–19 aprile 2026</h4>
			</div>
			<div class="wb-18 wb-15-mb max-w-600">
				<p>L'abbonamento MFF2026 consente l'accesso a tutte le proiezioni e gli eventi del Festival. Non include l'evento di pre-apertura <em>Cineconcerto Grand Tour Italiano</em>, il <em>Cineconcerto Sherlock Jr.</em> e <em>Odorama. The Truman Show</em>.</p>
			</div>
		</a>
		<a class="ticket x1 rounded-l white {shakingItems['sherlock'] ? 'shaking' : undefined}" href={SherlockHref} target="_blank" rel="noopener noreferrer"
		onmousemove={handleMouseMove}
		onmouseenter={() => isHovering = true}
		onmouseleave={() => isHovering = false}
		>
			<img class="bg" src="/tickets/sherlock.webp" alt="">
			<div>
				<h3 class="wb-cd-60 wb-cd-40-mb uppercase max-w-500">Cineconcerto Sherlock Jr.</h3>
				<div class="tags wb-12 uppercase">
					<label class="tag black bg-white">20&#8202;€</label>
					<label class="tag black bg-white">Codice sconto 25% con abbonamento</label>
				</div>
				<h4 class="date bolder wb-18 wb-15-mb">Con Samuel Umberto Romano<br>Giovedì 16 aprile alle 21:00</h4>
			</div>
			<p class="wb-18 wb-15-mb max-w-600">Nella giornata dedicata all’udito, cinema muto e musica contemporanea si incontrano: Samuel sonorizza dal vivo Sherlock Jr. (1924) di Buster Keaton. Un dialogo potente tra immagini e suono.</p>
		</a>
		<a class="ticket locked x1 rounded-l white blurred {shakingItems['odorama'] ? 'shaking' : undefined}" href={OdoramaHref} target="_blank" rel="noopener noreferrer"
		onclick={(e) => {handleLockedclick(e, 'odorama')}}
		>
			<img class="bg" src="/tickets/odorama.webp" alt="">
			<div>
				<h3 class="wb-cd-60 wb-cd-40-mb uppercase max-w-500">Odorama. The Truman Show</h3>
				<div class="tags wb-12 uppercase">
					<label class="tag white bg-black">Sold out</label>
					<label class="tag black bg-white">5&#8202;€</label>
					<label class="tag black bg-white">Capienza limitata</label>
				</div>
				<h4 class="date bolder wb-18 wb-15-mb">Proiezione con tavoletta olfattiva<br>Domenica 19 aprile alle 19:00</h4>
			</div>
			<p class="wb-18 wb-15-mb max-w-600">Avete mai respirato un film? Con Odorama di Accademia del Profumo la proiezione diventa multisensoriale: fragranze accompagnano le scene e amplificano le emozioni.</p>
		</a>
		{#if isHovering && mousePos.x}
			<p class="cursor desktop-only btn-l bg-linen black" transition:slide={{duration: 200, axis: 'x'}}
			style="left: {mousePos.x}px; top: {mousePos.y}px; display: {isHovering ? 'inline-block' : 'none'}; transform: translate({side === 'left' ? '-100%' : '0%'}, -50%);"
			>Compra su <img class="webtic" src="/logos/webtic.webp" alt=""></p>
		{/if}
	</section>
	<section id="how-it-works" title="Come funziona" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase leading_105">Come funziona</h2>
		<div class="wb-21 wb-15-mb max-w-700">
			<p>L'abbonamento MFF2026 consente l'accesso a tutte le proiezioni e a tutti gli eventi del Festival, fatta eccezione per:</p>
			<ul>
				<li>Evento di pre-apertura <em>Cineconcerto Grand Tour Italiano</em></li>
				<li><em>Cineconcerto Sherlock Jr.*</em></li>
				<li><em>Odorama. The Truman Show</em></li>
			</ul>
			<p>*Gli abbonati hanno diritto a uno sconto del 25% sull'evento Cineconcerto Sherlock Jr., selezionando l'opzione di acquisto RIDOTTO ABBONAMENTO WEB. All'ingresso potrà essere verificato il possesso dell'abbonamento.</p>
			<p>I biglietti sono acquistabili online in qualsiasi momento, accedendo alla tua area personale Webtic, o cartacei presso la biglietteria della Sala del Leccio, nei giorni e negli orari sotto riportati, e presso le casse del Cinema Astra e della Sala Truffaut, a partire 60 minuti prima di ogni proiezione.</p>
			<p>L’abbonamento è acquistabile solamente online e, per ogni film che vuoi vedere o evento a cui vuoi assistere, fatta eccezione per quelli sopra indicati, dovrai riscattare il biglietto in anticipo direttamente dalla tua area personale Webtic, inserendo codice abbonamento e pin.</p>
			<p>Non ti preoccupare: se hai bisogno di aiuto, all’infopoint presso la Sala del Leccio saremo a disposizione per seguirti nei passaggi necessari!</p>
			<p>N.B. Acquistare singolarmente ciascun evento ha un costo unitario maggiore rispetto a quello garantito dall'abbonamento.</p>
			<p>Ti ricordiamo che l'ingresso in sala è soggetto alla disponibilità dei posti, quindi ti consigliamo di acquistare i biglietti per tempo! All’ingresso della sala dovrai mostrare il tuo biglietto, dallo schermo del tuo smartphone o in versione cartacea.</p>
			<p>PPresenta la prova di acquisto dell'abbonamento al Cortile del Leccio, in <a class="underline" href="https://share.google/15w19rJ5QGejKBXGb" target="_blank" rel="noopener noreferrer">via Francesco Selmi 67</a>, a Modena, nei seguenti giorni e orari:</p>
			<ul>
				<li>Martedì 14, mercoledì 15 e giovedì 16 aprile dalle 15 alle 21</li>
				<li>Venerdì 17 e sabato 18 aprile dalle 10 alle 21</li>
				<li>Domenica 19 aprile dalle 10 alle 18</li>
			</ul>
			<p>Riceverai la tote bag ufficiale e il badge, che ti darà diritto a sconti esclusivi presso tutti i locali convenzionati con il Modena Film Festival.</p>
		</div>
	</section>
	<section id="prices" title="Prezzi" bind:this={sections[2]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase leading_105">Prezzi</h2>
		<div class="wb-21 wb-15-mb max-w-700">
			<p><span class="uppercase">Abbonamento</span><br>
				Acquistabile solamente online 33&#8202;€<br>
				È richiesta la prenotazione ai singoli eventi
			</p>
			<p><span class="uppercase">Singole proiezioni</span><br>
				Biglietto unico 8&#8202;€<br>
				Biglietto unico web 8&#8202;€ + 1&#8202;€ di commissioni
			</p>
			<p><span class="uppercase">Cineconcerto Sherlock Jr.</span><br>
				Intero 20&#8202;€<br>
				Intero web 20&#8202;€ + 1&#8202;€ di commissioni<br>
				✳ Ridotto per abbonati 15&#8202;€<br>
				✳ Ridotto per abbonati web 15&#8202;€ + 1&#8202;€ di commissioni<br>
			</p>
			<p><span class="uppercase">Odorama. The Truman Show</span><br>
				Biglietto unico 5&#8202;€
			</p>
			<p><span class="uppercase">Cineconcerto Grand Tour Italiano</span><br>
				Biglietto unico 8&#8202;€<br>
				Biglietto unico web 8&#8202;€ + 1&#8202;€ di commissioni
			</p>				
		</div>
	</section>
	<section id="conditions" title="Condizioni di vendita" bind:this={sections[3]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase leading_105">Condizioni di vendita</h2>
		<div class="wb-21 wb-15-mb max-w-700">
			<p>L'abbonamento è strettamente personale e non cedibile. All'ingresso potranno essere effettuati controlli per verificare la titolarità dell’accredito.</p>
			<p>Se sei titolare di abbonamento, per ogni film che vuoi vedere dovrai riscattare il biglietto, direttamente dalla tua area personale Webtic o presso le biglietterie. Nelle biglietterie dei cinema potrai riscattare il biglietto da 60 minuti prima di ogni proiezione. Ti ricordiamo che l'ingresso in sala è soggetto alla disponibilità dei posti, quindi ti consigliamo di riscattare i biglietti per tempo!</p>
			<p>È possibile anche acquistare singolarmente ciascun evento, a un costo unitario maggiore rispetto a quello garantito dall'abbonamento.</p>
			<p>Le proiezioni e la presenza degli ospiti indicati in programma sono passibili di modifiche indipendenti dalla volontà del Festival</p>
		</div>
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
#how-it-works,
#conditions {
	p + p {
		margin-top: .6em;
	}
	ul {
		margin: 1.1em 0 1.1em 2em;
		list-style: disc;
	}
}
#prices {
	p + p {
		margin-top: 1.2em;
	}
}
</style>