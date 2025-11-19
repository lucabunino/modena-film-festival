<script>
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
	let sections = $state([])
</script>

<main class="policy wb-15 wb-12-mb bg-white">
	<Title title="Privacy Policy" size={'s'}/>
	<Navigator title="Privacy Policy" {sections}/>
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
				<li>Titolare del trattamento dei dati</li>
				<li>Tipologie di dati raccolti</li>
				<li>Finalità del trattamento dei dati</li>
				<li>Base giuridica del trattamento</li>
				<li>Modalità di trattamento e sicurezza</li>
				<li>Conservazione dei dati</li>
				<li>Diritti dell’utente</li>
				<li>Comunicazione dei dati a terze parti</li>
				<li>Modifiche alla presente informativa</li>
			</ul>
		</div>
	</section>

	<section id="controller" title="Titolare" bind:this={sections[1]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Titolare del trattamento dei dati</h2>
		<div class="max-w-600">
			<p>Il titolare del trattamento dei dati personali è:</p>
			<p>Modena Film Festival<br>
			Email: <a href="mailto:info@modenafilmfestival.it">info@modenafilmfestival.it</a></p>
		</div>
	</section>

	<section id="kinds" title="Tipologie" bind:this={sections[2]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Tipologie di dati raccolti</h2>
		<div class="max-w-600">
			<p>Questo sito non raccoglie dati personali direttamente.</p>
			<p>Utilizziamo esclusivamente:</p>
			<ul>
				<li>Cookie tecnici: necessari per garantire il corretto funzionamento e la sicurezza del sito. Non richiedono il consenso dell’utente in quanto non raccolgono dati personali.</li>
			</ul>
		</div>
	</section>
		
	<section id="purposes" title="Finalità" bind:this={sections[3]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Finalità del trattamento dei dati</h2>
		<div class="max-w-600">
			<p>I dati raccolti saranno trattati per le seguenti finalità:
</p><ul><li>Iscrizione alla newsletter: Utilizziamo il nome, cognome e indirizzo email forniti da te per inviarti aggiornamenti e comunicazioni periodiche attraverso la nostra newsletter.</li><li>Funzionamento del sito: Utilizziamo cookie tecnici necessari per garantire il corretto funzionamento e la sicurezza del nostro sito web.</li></ul>
		</div>
	</section>
		
	<section id="legal-basis" title="Base giuridica" bind:this={sections[4]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Base giuridica del trattamento</h2>
		<div class="max-w-600">
			<p>Il trattamento dei tuoi dati personali si basa sulle seguenti condizioni di liceità previste dall’art. 6 del GDPR:</p>
			<ul>
				<li>Esecuzione del contratto: Il trattamento è necessario per inviarti la newsletter a cui ti sei iscritto volontariamente.</li>
				<li>Legittimo interesse: Per quanto riguarda l’uso di cookie tecnici, trattiamo i dati per garantire il corretto funzionamento del sito.</li>
			</ul>
		</div>
	</section>
		
	<section id="methods" title="Modalità" bind:this={sections[5]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Modalità di trattamento e sicurezza</h2>
		<div class="max-w-600">
			<p>I tuoi dati personali saranno trattati con strumenti elettronici e/o manuali, adottando misure di sicurezza adeguate per garantire la protezione dei dati da accessi non autorizzati, perdita o distruzione.</p>
		</div>
	</section>
		
	<section id="retention" title="Conservazione" bind:this={sections[6]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Conservazione dei dati</h2>
		<div class="max-w-600">
			<p>I dati personali raccolti saranno conservati per il tempo necessario a conseguire le finalità per le quali sono stati raccolti:</p>
			<ul>
				<li>Cookie tecnici: I cookie tecnici saranno conservati per il tempo strettamente necessario al funzionamento del sito.</li>
			</ul>
		</div>
	</section>
		
	<section id="rights" title="Diritti" bind:this={sections[7]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Diritti dell'utente</h2>
		<div class="max-w-600">
			<ul>
				<li>In conformità con il GDPR, hai il diritto di:</li>
				<li>Accedere ai tuoi dati personali.</li>
				<li>Richiedere la rettifica o la cancellazione dei tuoi dati.</li>
				<li>Limitare il trattamento dei tuoi dati.</li>
				<li>Opporsi al trattamento.</li>
				<li>Richiedere la portabilità dei dati.</li>
				<li>Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prima della revoca.</li>
			</ul>
			<p>Puoi esercitare i tuoi diritti inviando una richiesta all'indirizzo email: <a href="mailto:info@modenafilmfestival.it">info@modenafilmfestival.it</a>.</p>
		</div>
	</section>
		
	<section id="third-party" title="Terze parti" bind:this={sections[8]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Comunicazione dei dati a terze parti</h2>
		<div class="max-w-600">
			<p>Questo sito non utilizza cookie di terze parti e non integra contenuti esterni che possano raccogliere informazioni di navigazione degli utenti.<br>
			I dati eventualmente raccolti sono trattati esclusivamente dal titolare del sito e non vengono condivisi con soggetti esterni.</p>
		</div>
	</section>
		
	<section id="changes" title="Modifiche" bind:this={sections[9]}>
		<h2 class="section-title wb-12 uppercase wb-10-mb">Modifiche alla presente informativa</h2>
		<div class="max-w-600">
			<p>Ci riserviamo il diritto di aggiornare questa Privacy Policy in qualsiasi momento. Le modifiche verranno comunicate tramite questa pagina e, ove possibile, notificate via email. Ti invitiamo a consultare regolarmente questa pagina per rimanere aggiornato sulle nostre pratiche di protezione dei dati.</p>
			<p>Questa Privacy Policy è redatta in conformità con gli obblighi previsti dal Regolamento Generale sulla Protezione dei Dati (GDPR).</p>
		</div>
	</section>
</main>