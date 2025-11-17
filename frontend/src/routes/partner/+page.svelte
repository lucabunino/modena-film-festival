<script>
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
	let sections = $state([])

	const clusters = [
		{
			title: 'Istituzioni',
			slug: 'institutions',
			partners: [
				{
					title: 'Fondazione di Modena',
					href: 'https://www.fondazionedimodena.it/',
					abstract: 'Attraverso i suoi interventi la Fondazione di Modena stimola la partecipazione e il protagonismo della società civile e dei cittadini, contribuisce alla crescita di una comunità solidale e favorisce la democrazia. Lo fa attraverso il sostegno a iniziative ideate dai tanti soggetti che animano il Terzo settore e dagli Enti pubblici, o ideando e realizzando autonomamente progetti a beneficio della comunità. La logica che ispira questi interventi è quella dell’1+1=3. Infatti la Fondazione non si limita a sostenere economicamente i progetti ma punta a coinvolgere e rendere protagonisti i cittadini e le organizzazioni della società civile. Grazie a queste pratiche di cooperazione, i soggetti che compongono le comunità generano più valore – e più senso – di quello che avrebbero generato da soli. Dunque la Fondazione di Modena attiva relazioni e genera comunità.',
					logo: '/partners/fondazione-di-modena.png'
				},
				{
					title: 'Comune di Modena',
					href: 'https://www.comune.modena.it/',
					abstract: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
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
					role: 'Media partner',
					href: 'https://www.fondazionedimodena.it/',
					logo: '/partners/heroestudio.png'
				},
				{
					title: 'Giorgia Sandoni Bellucci',
					role: 'Brand strategy',
					href: 'https://www.instagram.com/giorgiasandonibellucci',
					logo: '/partners/giorgia-sandoni-bellucci.png'
				}
			]
		},
	]
</script>

<main class="bg-white">
	<Navigator title="Festival" {sections} cta={{label: 'Diventa sponsor', href: '/partner/sponsor', locked: true}}/>
	<Title subtitle='A ogni sua edizione, il Locarno Film Festival può contare sul solido appoggio dei Partner pubblici e privati. Sono loro, infatti, a permettere alla macchina organizzativa della manifestazione di compiere di anno in anno la sua impresa, portando a Locarno la magia del cinema.' size={'m'}/>
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