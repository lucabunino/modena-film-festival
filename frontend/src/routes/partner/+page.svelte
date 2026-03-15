<script>
    import HeadSingle from "$lib/components/HeadSingle.svelte";
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
	import { partners } from "$lib/content/partners.js";
	let { data } = $props()
	let sections = $state([])
	const seoSingle = { seoTitle: 'Partner'}
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-white">
	<Navigator title="Partner" {sections} cta={{label: 'Diventa sponsor', href: '/partner/diventa-sponsor'}}/>
	<Title
	size={'m'}
	subtitles={[
		'Il Modena Film Festival cresce grazie al sostegno di realtà culturali, istituzioni, aziende, associazioni e professionisti che condividono la nostra visione: un cinema più aperto, accessibile e capace di parlare a pubblici diversi.',
		'Collaboriamo con chi crede nel valore delle storie, nella forza dei territori e nell’importanza di rendere la cultura un’esperienza condivisa. Una rete viva che dà forma al festival, lo arricchisce e lo porta oltre lo schermo.'
	]}
	cta={{href:'/partner/diventa-sponsor', label: 'Diventa sponsor'}}/>
	{#each partners as cluster, i}
		<section id={cluster.slug} title={cluster.menuTitle} bind:this={sections[i]} class="cluster">
			<h2 class="section-title wb-12 wb-10-mb uppercase">{cluster.title}</h2>
			<div class="partners">
				{#each cluster.partners as partner, j}
					<div class="partner">
						<a class="bg-linen" href={partner.href} target="_blank" rel="noopener noreferrer">
							<img src={partner.logo} alt="Logo di {partner.title}">
						</a>
						<h3 class="wb-24 wb-18-mb">{partner.title}</h3>
						{#if partner.role}<h4 class="wb-12 wb-10-mb">{partner.role}</h4>{/if}
					</div>
				{/each}
			</div>
		</section>
	{/each}
</main>

<style>
.partners {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: var(--gutter);
	row-gap: var(--spacing-s);

	@media screen and (max-width: 1512px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media screen and (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
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