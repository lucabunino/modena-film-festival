<script>
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
	import HeadSingle from "$lib/components/HeadSingle.svelte";
	let { data } = $props()
	let sections = $state([])
	const formLink = "https://forms.gle/zfY5EMbdBwVQwhG67"
	const seoSingle = { seoTitle: 'Entra nello staff'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Navigator title="Staff" {sections} cta={{label: 'Unisciti a noi', href: formLink, blank: true}}/>
	<Title
	size={'m'}
	title="Entra nello staff della prima edizione del Modena Film Festival"
	subtitles={[
		'Cinque giorni di film, incontri, performance, suoni, luci, profumi, conversazioni e luoghi che si trasformano: un’esperienza pensata per chi ama il cinema d’autore, per chi cerca nuove visioni e per chi vuole semplicemente lasciarsi sorprendere.',
		'Tra sale, musei e spazi della città, il festival diventa un punto di incontro aperto e accessibile a tutti, con particolare attenzione a chi vive il cinema attraverso altri sensi e ha esigenze sensoriali specifiche. Un invito a guardare meglio. E a sentire di più.'
	]}
	cta={{href: formLink, label: 'Unisciti a noi', blank: true}}/>
	<section id="contribution" title="Mansioni" bind:this={sections[0]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">In cosa consisterà il tuo contributo?</h2>
		<div class="text wb-21 wb-18-mb max-w-700">
			<p>Nei giorni che precedono il festival potremmo aver bisogno di un aiuto logistico, sicuramente ci saranno da preparare i luoghi e i materiali in modo che tutto sia pronto in tempo. Una vera immersione nel backstage. Se sai le lingue potremmo anche avere bisogno di un aiuto per realizzare i sottotitoli dei film.</p>
			<p>Nei giorni di festival invece avremo bisogno di un supporto per:</p>
			<ul>
				<li>accoglienza pubblico nelle sale di proiezione e aiuto nella gestione degli incontri</li>
				<li>info point</li>
				<li>accoglienza ospiti</li>
				<li>logistica tra le varie sedi</li>
			</ul>
			<p>Lavorerai sempre in connessione con lo staff del MFF, con l’obiettivo di rendere ogni momento del festival fluido, caloroso e memorabile per chi partecipa.</p>
		</div>
	</section>
	<section id="requirements" title="Requisiti" bind:this={sections[1]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Requisiti</h2>
		<div class="text wb-21 wb-18-mb max-w-700">
			<p>Spirito di squadra e attitudine alle relazioni; voglia di mettersi in gioco e di inserirsi in un team giovane e dinamico; disponibilità a partecipare a uno o due incontri preparatori e di conoscenza presumibilmente nella settimana dal 23 al 27 marzo.</p>
		</div>
	</section>
	<section id="gifts" title="Riceverai" bind:this={sections[2]}>
		<h2 class="section-title wb-12 wb-10-mb uppercase">Ogni volontario riceverà</h2>
		<div class="text wb-21 wb-18-mb max-w-700">
			<ul>
				<li>L’abbonamento MFF per accedere a tutte le proiezioni e gli eventi per l’intera durata del festival</li>
				<li>la T-shirt MFF</li>
				<li>la shopper MFF</li>
				<li>buoni pasto.</li>
			</ul>
			<p>Hai voglia di unirti a noi? compila il <a href={formLink} target="_blank" rel="noopener noreferrer">form</a> fino al 13 marzo.<br>Se hai dubbi o vuoi chiarimenti scrivi a <a href="mailto:info@modenafestival.it">info@modenafestival.it</a></p>
			<p>Il team dei volontari sarà di circa 15 persone per permetterci di seguire tutti in maniera efficace, se ricevessimo maggiori candidature sarà fatta una selezione.</p>
		</div>
	</section>
</main>

<style>

</style>