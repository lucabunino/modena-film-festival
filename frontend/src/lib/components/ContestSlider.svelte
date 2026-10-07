<script>
	import { page } from '$app/state'
	import { eventHref } from '$lib/utils/edition.js'
	import Media from '$lib/components/Media.svelte'
	// contest: an Edition's films in competition ([{_id, title, director, poster, thumbnail, event: {slug}}])
	let { contest } = $props()
</script>

<section id="contest" class="bg-linen" title="Film in concorso">
	<div class="text-wrapper">
		<h2 class="wb-12 wb-10-mb uppercase">Film in concorso</h2>
		<p class="wb-24 wb-18-mb max-w-600">I cinque sensi rappresentano il nostro primo e più immediato contatto con la realtà: attraverso di essi facciamo esperienza di conoscenza, memoria ed emozione.</p>
	</div>
	<div class="contest-wrapper">
		<div class="contest">
			{#each contest as movie (movie._id)}
				<a class="event white" href={movie.event ? eventHref(movie.event.slug, page.params.edition) : undefined}>
					{#if movie.poster}
						<Media class="img" image={movie.poster} alt="Locandina di {movie.title}" sizes="(width <= 1024px) 100vw, 50vw" />
					{/if}
					{#if movie.title}<h3 class="title wb-28 wb-18-mb">{movie.title}</h3>{/if}
					{#if movie.director}<h4 class="subtitle te-28 te-21-mb">di {movie.director}</h4>{/if}
					<span class="cta btn-m black bg-white hover-black hover-bg-linen">Leggi di più</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	#contest {
		padding-bottom: 0;

		.text-wrapper {
			padding: var(--margin) var(--margin) calc(var(--margin)*2);
			p {
				margin-top: var(--sp-18);
			}
		}
		.contest-wrapper {
			width: 100%;
			overflow-x: scroll;
			-ms-overflow-style: none;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}

			.contest {
				display: flex;
				width: fit-content;

				.event {
					padding: var(--margin);
					width: 23vw;
					min-width: 350px;
					height: auto;
					aspect-ratio: 2/3;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;

					@media (width <= #{$xl}) {
						min-width: 300px;
					}

					@media (width <= #{$lg}) {
						min-width: 250px;
					}

					:global(.img) {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
					.title,
					.subtitle {
						z-index: 1;
					}
					.cta {
						position: absolute;
						left: var(--margin);
						bottom: var(--margin);
					}
					// mouse/trackpad: CTA only on hover; touch keeps it always visible
					@media (pointer: fine) {
						.cta {
							opacity: 0;
						}
						&:hover .cta,
						&:focus-visible .cta {
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
