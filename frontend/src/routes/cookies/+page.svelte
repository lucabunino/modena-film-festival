<script>
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
	let sections = $state([])
</script>

<main class="policy wb-15 wb-12-mb bg-white">
	<Title title="Cookie Policy" size={'s'}/>
	<Navigator title="Cookie Policy" {sections}/>
	<section>
		<div class="max-w-600">
			<p>Ultimo aggiornamento 19.11.2026</p>
			<p>Siamo Modena Film Festival. Questa Cookie Policy descrive come raccogliamo, utilizziamo e gestiamo i cookie, oltre a fornirti informazioni sui tuoi diritti e sulle tue scelte riguardo l'uso dei cookie.</p>
			<p>Puoi contattarci all'indirizzo email: <a href="mailto:info@modenafilmfestival.it">info@modenafilmfestival.it</a>.</p>
		</div>
	</section>

	<section id="table-of-contents" title="Indice" bind:this={sections[0]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Indice</h2>
		<div class="max-w-600">
			<ul>
				<li>Introduzione</li>
				<li>Informazioni di contatto</li>
				<li>Attività strettamente necessarie per il funzionamento di questo sito e la fornitura del servizio</li>
				<li>Contenuti di terze parti e cookie esterni</li>
				<li>Come gestire le preferenze e fornire o ritirare il consenso</li>
				<li>Definizioni e riferimenti legali</li>
			</ul>
		</div>
	</section>
		
	<section id="introduction" title="Introduzione" bind:this={sections[1]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Introduzione</h2>
		<div class="max-w-600">
			<h3 class="wb-18 wb-15-mb">Di cosa tratta questa policy?</h3>
			<p>Questo documento ti informa riguardo alle tecnologie di tracciamento ("tracker") utilizzate per le finalità indicate.</p>
			<h3 class="wb-18 wb-15-mb">Cosa sono i tracker?</h3>
			<p>I tracker sono tecnologie come i cookie, utilizzate per facilitare la navigazione e migliorare la tua esperienza sul sito. In questo documento, ci riferiamo specificamente ai "cookie", che sono piccoli file salvati sul tuo dispositivo.<br>
			Alcuni tracker potrebbero richiedere il tuo consenso. Quando questo è il caso, il consenso può essere revocato in qualsiasi momento seguendo le istruzioni presenti in questo documento.</p>
			<p>Questo sito web utilizza solo cookie tecnici, gestiti direttamente da noi ("cookie di prima parte"), necessari per il funzionamento del sito e la fornitura del servizio. I cookie non raccolgono informazioni personali che ti identificano.</p>
		</div>
	</section>
	
	<section id="contact" title="Contatti" bind:this={sections[2]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Informazioni di contatto</h2>
		<div class="max-w-600">
			<p>Se desideri maggiori informazioni sull'uso dei cookie e dei tracker su questo sito, puoi contattarci ai seguenti recapiti:</p>
			<p>Modena Film Festival
			<br>Email: <a href="mailto:info@modenafilmfestival.it">info@modenafilmfestival.it</a></p>
		</div>
	</section>

	<section id="necessary-activities" title="Attività necessarie" bind:this={sections[3]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Attività strettamente necessarie per il funzionamento del sito</h2>
		<div class="max-w-600">
			<p>Questo sito utilizza solo cookie tecnici propri (di prima parte) per garantire il corretto funzionamento del sito.
			<br>Questi cookie non raccolgono dati personali e non sono utilizzati per finalità di profilazione.</p>
			<p>Esempi:</p>
			<ul>
				<li>memorizzazione delle preferenze di visualizzazione</li>
				<li>mantenimento della sessione attiva</li>
				<li>supporto alla navigazione responsiva</li>
			</ul>
		</div>
	</section>

	<section id="third-party" title="Terze parti" bind:this={sections[4]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Contenuti di terze parti e cookie esterni</h2>
		<div class="max-w-600">
			<p>Questo sito non utilizza cookie di profilazione né incorpora contenuti di terze parti (es. video, mappe, widget esterni).
			<br>La navigazione avviene quindi senza l’installazione di cookie esterni né la condivisione di dati con servizi terzi.</p>
		</div>
	</section>

	<section id="preferences" title="Preferenze" bind:this={sections[5]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Come gestire le preferenze e fornire o ritirare il consenso</h2>
		<div class="max-w-600">
			<p>Poiché questo sito utilizza solo cookie tecnici di prima parte, non è richiesto il consenso preventivo per il loro utilizzo.</p>
			<p>Per quanto riguarda i contenuti di terze parti, nessun cookie verrà impostato da Vimeo o Mapbox fino a tua interazione esplicita.</p>
			<p>Ecco alcuni link utili per gestire i cookie nei browser più diffusi:</p>
			<ul>
				<li>
					<a class="btn-xs uppercase" href="https://support.google.com/accounts/answer/32050?hl=it" target="_blank" rel="noopener noreferrer">Google Chrome<sup> ↗</sup></a>
				</li>
				<li>
					<a class="btn-xs uppercase" href="https://support.mozilla.org/it/kb/Eliminare%20i%20cookie" target="_blank" rel="noopener noreferrer">Mozilla Firefox<sup> ↗</sup></a>
				</li>
				<li>
					<a class="btn-xs uppercase" href="http://windows.microsoft.com/it-it/internet-explorer/delete-manage-cookies#ie=ie-11" target="_blank" rel="noopener noreferrer">Microsoft Edge<sup> ↗</sup></a>
				</li>
				<li>
					<a class="btn-xs uppercase" href="https://support.apple.com/it-it/HT201265" target="_blank" rel="noopener noreferrer">Safari<sup> ↗</sup></a>
				</li>
			</ul>
		</div>
	</section>

	<section id="definitions" title="Definizioni" bind:this={sections[6]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Definizioni e riferimenti legali</h2>
		<div class="max-w-600">
			<ul>
				<li>Cookie: Piccoli file di dati memorizzati nel tuo browser che aiutano il sito a ricordare informazioni su di te.</li>
				<li>Tracker: Qualsiasi tecnologia che consente di tracciare e raccogliere informazioni sull’utente, come cookie e altri identificatori unici.</li>
				<li>Unione Europea (UE): Quando si fa riferimento all’Unione Europea, si intende l’insieme degli Stati membri attuali dell’UE e dello Spazio Economico Europeo.</li>
			</ul>
			<p>Questa policy è stata redatta in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR) e altre normative pertinenti.</p>
		</div>
	</section>
</main>

<style>
.policy {
	section {
		h3 {
			margin-top: 1em;
			margin-bottom: .5em;
		}
		ul {
			list-style: inside;
		}
	}
}
</style>