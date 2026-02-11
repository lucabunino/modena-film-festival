<script>
    import HeadSingle from "$lib/components/HeadSingle.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
	let { data } = $props()
	let sections = $state([])

	const clusters = [
		{
			title: 'Istituzioni',
			slug: 'institutions',
			partners: [
				{
					title: 'Fondazione di Modena',
					href: 'https://www.fondazionedimodena.it/',
					// abstract: 'Attraverso i suoi interventi la Fondazione di Modena stimola la partecipazione e il protagonismo della società civile e dei cittadini, contribuisce alla crescita di una comunità solidale e favorisce la democrazia. Lo fa attraverso il sostegno a iniziative ideate dai tanti soggetti che animano il Terzo settore e dagli Enti pubblici, o ideando e realizzando autonomamente progetti a beneficio della comunità. La logica che ispira questi interventi è quella dell’1+1=3. Infatti la Fondazione non si limita a sostenere economicamente i progetti ma punta a coinvolgere e rendere protagonisti i cittadini e le organizzazioni della società civile. Grazie a queste pratiche di cooperazione, i soggetti che compongono le comunità generano più valore – e più senso – di quello che avrebbero generato da soli. Dunque la Fondazione di Modena attiva relazioni e genera comunità.',
					logo: '/partners/fondazione-di-modena.png'
				},
				{
					title: 'Comune di Modena',
					href: 'https://www.comune.modena.it/',
					// abstract: 'Il Comune di Modena sostiene il festival promuovendo una visione della cultura come spazio aperto, condiviso e accessibile.  Una collaborazione che valorizza la città, i suoi luoghi e la sua comunità, rendendo possibile un progetto che mette al centro persone, talenti e creatività contemporanea.',
					logo: '/partners/comune-di modena.png'
				},
			]
		},
		{
			title: 'Partner tecnici',
			slug: 'technical-partners',
			partners: [
				{
					title: 'Heroestudio',
					role: 'Social e media partner',
					href: 'https://www.heroestudio.it/',
					// abstract: 'Heroestudio affianca il Modena Film Festival come partner creativo. Con un approccio che unisce comunicazione, immagine e produzione audiovisiva, contribuisce a dare forma all’estetica del festival, creando un immaginario visivo potente, riconoscibile e in dialogo con la città e il pubblico.',
					logo: '/partners/heroestudio.png'
				},
				{
					title: 'Giorgia Sandoni Bellucci',
					role: 'Partner per la strategia e la direzione creativa social',
					href: 'https://www.instagram.com/giorgiasandonibellucci',
					// abstract: 'Creative Director e Brand Strategist, collabora con il Modena Film Festival nella definizione dell’identità creativa e del racconto del progetto. Lavora insieme al team per costruire un festival che unisca visione, esperienza sensoriale e accessibilità.',
					logo: '/partners/giorgia-sandoni-bellucci.png'
				}
			]
		},
	]
	const seoSingle = { seoTitle: 'Partner'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Navigator title="Festival" {sections} cta={{label: 'Diventa sponsor', href: '/partner/sponsor'}}/>
	<Title
	size={'m'}
	subtitles={[
		'Il Modena Film Festival cresce grazie al sostegno di realtà culturali, istituzioni, aziende, associazioni e professionisti che condividono la nostra visione: un cinema più aperto, accessibile e capace di parlare a pubblici diversi.',
		'Collaboriamo con chi crede nel valore delle storie, nella forza dei territori e nell’importanza di rendere la cultura un’esperienza condivisa. Una rete viva che dà forma al festival, lo arricchisce e lo porta oltre lo schermo.'
	]}
	cta={{href:'/partner/sponsor', label: 'Diventa sponsor'}}/>
	{#each clusters as cluster, i}
		<section id={cluster.slug} title={cluster.title} bind:this={sections[i]} class="cluster">
			<h2 class="section-title wb-12 wb-10-mb uppercase">{cluster.title}</h2>
			<div class="partners">
				{#each cluster.partners as partner, j}
					<div class="partner">
						<a class="bg-linen" href={partner.href} target="_blank" rel="noopener noreferrer">
							<img src={partner.logo} alt="Logo di {partner.title}">
						</a>
						<h3 class="wb-24 wb-21-mb">{partner.title}</h3>
						{#if partner.role}<h4 class="wb-12 wb-10-mb">{partner.role}</h4>{/if}
						{#if partner.abstract}<p class="wb-14 wb-15-mb">{partner.abstract}</p>{/if}
					</div>
				{/each}
			</div>
		</section>
	{/each}
</main>

<style>
.partners {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: var(--gutter);
	row-gap: var(--spacing-s);

	@media screen and (max-width: 1512px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
	}

	.partner {
		display: flex;
		flex-direction: column;

		a {
			aspect-ratio: 4/3;
			overflow: hidden;
			transition: var(--transition-s);
			&:hover {
					border-radius: 30px;
			}

			img {
				object-fit: cover;
			}
		}

		h3 {
			margin-top: 1.5rem;
		}
		h4 {
			margin-top: .3rem;
		}
		p {
			margin-top: 2rem;
		}
	}
}
</style>