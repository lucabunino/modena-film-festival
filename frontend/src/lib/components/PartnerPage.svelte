<script>
	import Media from '$lib/components/Media.svelte'
    import Navigator from "$lib/components/Navigator.svelte";
    import Title from "$lib/components/Title.svelte";
	// partners: an Edition's partner groups ([{_key, title, menuTitle, slug, partners: [{_key, title, href, logo, role}]}])
	let { partners } = $props()
	let sections = $state([])
</script>


<main class="bg-white">
	<Navigator title="Partner" {sections} cta={{label: 'Diventa sponsor', href: '/partner/diventa-sponsor'}}/>
	<Title
	size="m"
	subtitles={[
		'Il Modena Film Festival cresce grazie al sostegno di realtà culturali, istituzioni, aziende, associazioni e professionisti che condividono la nostra visione: un cinema più aperto, accessibile e capace di parlare a pubblici diversi.',
		'Collaboriamo con chi crede nel valore delle storie, nella forza dei territori e nell’importanza di rendere la cultura un’esperienza condivisa. Una rete viva che dà forma al Festival, lo arricchisce e lo porta oltre lo schermo.'
	]}
	cta={{href:'/partner/diventa-sponsor', label: 'Diventa sponsor'}}/>
	{#each partners as cluster, i (cluster._key)}
		<section id={cluster.slug} title={cluster.menuTitle} bind:this={sections[i]} class="cluster">
			<h2 class="section-title wb-12 wb-10-mb uppercase">{cluster.title}</h2>
			<div class="partners">
				{#each cluster.partners ?? [] as partner (partner._key)}
					<div class="partner">
						<a class="bg-linen" href={partner.href} target="_blank" rel="noopener noreferrer">
							{#if partner.logo}
								<Media class="logo" image={partner.logo} alt="Logo di {partner.title}" reveal={false} background={false} sizes="(max-width: 768px) 50vw, 25vw" />
							{/if}
						</a>
						<h3 class="wb-24 wb-18-mb">{partner.title}</h3>
						{#if partner.role}<h4 class="wb-12 wb-10-mb">{partner.role}</h4>{/if}
					</div>
				{/each}
			</div>
		</section>
	{/each}
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
.partners {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: var(--gutter);
	row-gap: var(--sp-48);

	@container main (width <= #{$xl}) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (width <= #{$md}) {
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

			:global(.logo) {
				width: 100%;
				height: 100%;
			}
		}

		h3 {
			margin-top: var(--sp-18);
		}
		h4 {
			margin-top: var(--sp-4);
		}
		p {
			margin-top: var(--sp-24);
		}
	}
}
</style>