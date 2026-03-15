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
    function handleMouseMove(e) {
        mousePos = { x: e.clientX, y: e.clientY };
    }
	const seoSingle = { seoTitle: 'Biglietti'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Navigator title="Biglietti" {sections}/>
	<Title
	subtitles={['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']}
	size={'l'}
	cta={{href:'https://www.webtic.it/app/main/home', label: 'Compra su', blank: true, webtic: true}}
	/>
	<section id="buy" title="Compra" bind:this={sections[0]}>
		<a class="ticket x2 rounded-l white" href="https://www.webtic.it/app/main/home" target="_blank" rel="noopener noreferrer"
		onmousemove={handleMouseMove}
		onmouseenter={() => isHovering = true}
		onmouseleave={() => isHovering = false}
		>
			<img class="bg" src="/tickets/abbonamento.webp" alt="">
			<div>
				<h3 class="wb-cd-80 wb-cd-40-mb uppercase">Abbonamento</h3>
				<div class="tags wb-12 uppercase">
					<label class="tag black bg-white">30€</label>
					<label class="tag black bg-white">Richiesta prenotazione singoli eventi</label>
				</div>
				<h4 class="date bolder wb-18 wb-15-mb">15–19 aprile 2026</h4>
			</div>
			<div class="wb-18 wb-15-mb max-w-600">
				<p>Vedi tutti i film in concorso e partecipa a 3 eventi speciali.</p>
				<p>Non comprende l'evento di pre-apertura <em>Cineconcerto Grand Tour</em>, lo speciale udito <em>Cineconcerto Sherlock Jr.</em> e lo speciale olfatto, che vanno acquistati separatamente.</p>
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
				<h4 class="date bolder wb-18 wb-15-mb">Con Samuel Umberto Romano<br>17 aprile alle 21:30</h4>
			</div>
			<p class="wb-18 wb-15-mb max-w-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
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
		{#if isHovering}
			<p class="cursor desktop-only btn-l bg-linen black" transition:slide={{duration: 200, axis: 'x'}}
			style="left: {mousePos.x}px; top: {mousePos.y}px; display: {isHovering ? 'inline-block' : 'none'};"
			>Compra su <img class="webtic" src="/logos/webtic.webp" alt=""></p>
		{/if}
	</section>
	<section id="become-supporter" title="Come funziona" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Come funziona</h2>
		<p class="wb-24 wb-18-mb max-w-700">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
		<p class="wb-24 wb-18-mb max-w-700">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
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

		@media screen and (max-width: 1080px) {
			min-height: 400px;
			text-align: center;

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
				transform: scale(1.05);
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
	transform: translate(-50%, -50%);
	display: block;
	overflow: hidden;
	width: max-content;
	white-space: nowrap;

	.webtic {
		display: inline-block;
		position: relative;
		top: .25em;
		height: 1.25em;
		margin-top: -.5em;
		width: auto;
	}
}
</style>