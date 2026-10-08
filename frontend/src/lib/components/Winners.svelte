<!--
	An Edition's Winners (the Vincitori page): a full-height horizontal scroll of 2:3 posters, one per winning Movie.
	Each poster has a bar at the bottom (title, director, prize images); on hover its award cards open below it, pushing the bar up,
	and "Scopri il film" appears at the bottom-left corner of the visible image. Touch screens show the cards open.
-->
<script>
	import { editionLabel } from '$lib/utils/edition.js'
	import Media from '$lib/components/Media.svelte'
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte'
	import Title from '$lib/components/Title.svelte'

	// edition: {year, slug, winners}; current: the top-level /vincitori (event links stay outside the archive)
	let { edition, current = false } = $props()

	// winners grouped by movie (one film can win several prizes), in the order each movie first appears
	const movies = $derived.by(() => {
		const groups = []
		for (const award of edition.winners ?? []) {
			if (!award.movie) continue
			let group = groups.find((g) => g.movie._id === award.movie._id)
			if (!group) groups.push((group = { movie: award.movie, awards: [] }))
			group.awards.push(award)
		}
		return groups
	})

	const eventHref = (movie) =>
		movie.event && (current ? `/programma/${movie.event.slug}` : `/${edition.slug}/programma/${movie.event.slug}`)
</script>

<main id="winners">
	<!-- desktop: breadcrumbs over the first poster; mobile: the page title (breadcrumbs included) -->
	<div class="crumbs desktop-only">
		<Breadcrumbs />
	</div>
	<div class="heading mobile-only">
		<Title title="I film vincitori<br>del {editionLabel(edition)}" size="m" />
	</div>
	<ul class="movies">
		{#each movies as { movie, awards } (movie._id)}
			<li class="movie">
				<div class="visual">
					{#if movie.poster}
						<Media class="poster" image={movie.poster} aspectRatio={2 / 3} alt="Locandina di {movie.title}" sizes="(width <= 1024px) 100vw, 67vh" />
					{:else}
						<div class="poster bg-linen"></div>
					{/if}
					<!-- mobile: the horizontal thumbnail instead (the hidden image isn't loaded: lazy + display none) -->
					{#if movie.thumbnail}
						<Media class="thumbnail" image={movie.thumbnail} aspectRatio={16 / 9} alt="Immagine di {movie.title}" sizes="100vw" />
					{/if}
					<!-- mobile: the CTA sits on the image (desktop has it in the panel, shown on hover) -->
					{#if eventHref(movie)}
						<a class="cta-image btn-m bg-white black hover-white hover-bg-black" href={eventHref(movie)}>Scopri il film</a>
					{/if}
				</div>
				<div class="panel">
					{#if eventHref(movie)}
						<a class="cta btn-m bg-white black hover-white hover-bg-black" href={eventHref(movie)}>Scopri il film</a>
					{/if}
					<div class="head">
						<div class="text">
							<h3 class="title wb-24 wb-18-mb">{movie.title}</h3>
							{#if movie.director}<p class="director te-24 te-21-mb">di {movie.director}</p>{/if}
						</div>
						<div class="prizes">
							{#each awards as award (award._key)}
								{#if award.prize}
									<Media class="prize" image={award.prize} alt={award.title} reveal={false} background={false} sizes="120px" />
								{/if}
							{/each}
						</div>
					</div>
					<!-- award cards: closed (0 height) at rest, open on hover -->
					<div class="cards">
						<ul>
							{#each awards as award (award._key)}
								<li class="card rounded-m bg-{award.color || 'linen'}">
									<h4 class="name wb-12 uppercase">{award.title}</h4>
									{#if award.jury?.description}<p class="description wb-14">{award.jury.description}</p>{/if}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	#winners {
		// full-height strip instead of the page grid
		display: block;
		padding: 0;
		position: relative;
		--movieHeight: 100svh;

		@media (width <= #{$lg}) {
			--movieHeight: calc(100svh - var(--menuHeight));
		}

		.crumbs {
			position: absolute;
			z-index: 3;
			color: var(--white); // over the first poster (black on mobile, below)
			top: var(--margin);
			left: var(--margin);
			pointer-events: none;

			// mobile: where the other pages have them (main's top padding)
			@media (width <= #{$lg}) {
				top: var(--sp-32);
			}

			:global(a) {
				pointer-events: all;
			}
		}
	}
	.movies {
		display: flex;
		height: var(--movieHeight);
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: contain;
		scroll-snap-type: x proximity;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}
	.movie {
		position: relative;
		flex: none;
		height: 100%;
		aspect-ratio: 2 / 3;
		overflow: hidden;
		scroll-snap-align: start;

		.visual {
			position: relative;
			height: 100%;
		}
		:global(.poster) {
			width: 100%;
			height: 100%;
		}
		.cta-image,
		:global(.thumbnail) {
			display: none;
		}
	}
	// bar at the bottom of the poster; grows upwards when the cards open
	.panel {
		position: absolute;
		z-index: 2;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to right, var(--white) 75%, var(--linen)); // white, then linen over the last 25% on the right

		.cta {
			position: absolute;
			left: var(--margin);
			bottom: calc(100% + var(--margin));
			opacity: 0;
		}
		.cards {
			display: grid;
			grid-template-rows: 0fr;
			transition: grid-template-rows var(--transition-s);

			ul {
				min-height: 0;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				gap: var(--sp-6);
				padding: 0 var(--gutter);
			}
			.card {
				display: grid;
				grid-template-columns: 1fr 1.5fr;
				column-gap: var(--gutter);
				padding: var(--gutter) var(--gutter) var(--sp-24);

				&:last-child {
					margin-bottom: var(--gutter);
				}
			}
		}
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: var(--gutter);
			padding: var(--sp-14) var(--margin);

			.prizes {
				display: flex;
				align-items: center;
				gap: var(--gutter);
				flex: none;

				:global(.prize) {
					height: var(--sp-40);
					width: auto;
					aspect-ratio: auto;

					@media (width <= #{$lg}) {
						height: calc(var(--sp-40) * .95);
					}

					:global(img) {
						object-fit: contain;
					}
				}
			}
		}
	}
	// open: the cards rise from the bottom bar, the CTA shows over the image
	@media (hover: hover) {
		.movie:hover .panel,
		.movie:focus-within .panel {
			.cards {
				grid-template-rows: 1fr;
			}
			.cta {
				opacity: 1;
			}
		}
	}
	@media (hover: none) {
		.panel {
			.cards {
				grid-template-rows: 1fr;
			}
			.cta {
				opacity: 1;
			}
		}
	}
	// phones, tablets: films stacked vertically: title, director and prizes, then a rounded horizontal thumbnail
	// (CTA on it), then the award cards (always open); a page title above
	@media (width <= #{$lg}) {
		#winners {
			padding: var(--sp-32) var(--margin) var(--sp-96);

			.heading {
				display: block;
				margin-bottom: var(--sp-36);
			}
		}
		.movies {
			flex-direction: column;
			height: auto;
			overflow: visible;
			gap: var(--sp-48);
			margin-top: var(--sp-12);
		}
		// order: title, director and prizes; then the image (CTA on it); then the award cards
		.movie {
			height: auto;
			aspect-ratio: auto;
			overflow: visible;
			display: flex;
			flex-direction: column;

			.visual {
				order: 2;
				height: auto;
				border-radius: var(--radius-m);
				overflow: hidden;
			}
			:global(.poster) {
				display: none;
			}
			:global(.thumbnail) {
				display: block;
				width: 100%;
			}
			.cta-image {
				display: inline-block;
				position: absolute;
				z-index: 2;
				left: var(--gutter);
				bottom: var(--gutter);
			}
		}
		.panel {
			// its parts join the film's column, so they can sit before and after the image
			display: contents;
			position: static;
			background: none;

			.cta {
				display: none;
			}
			.head {
				order: 1;
				padding: 0 0 var(--sp-14);
			}
			.cards {
				order: 3;
				margin-top: var(--sp-6); // same as between the award cards
				grid-template-rows: 1fr;

				// award title above its description
				.card {
					display: block;

					.description {
						margin-top: var(--sp-6);
					}
				}

				ul {
					padding: 0;
				}
			}
		}
	}
</style>
