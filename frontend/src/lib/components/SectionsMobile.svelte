<script>
	import Media from '$lib/components/Media.svelte'
	import { register } from 'swiper/element/bundle';register();
	let {sections} = $props()
	let rotations = $state([1, 3, -2, 4, -3])
	let swiperEl = $state(undefined)
	let swiperIndex = $state(0)
	let visible = $state(false)

	const swiperParams = {
		slidesPerView: 1.75,
		// fractional slides per view: keep extra looped slides ready so no gap/jump shows at the loop point
		loopAdditionalSlides: 2,
		breakpoints: {
			576: {
				slidesPerView: 2.75,
			},
			768: {
				slidesPerView: 3.75,
			},
		}
	};
	$effect(() => {
		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();
	
		setTimeout(() => {
			visible = true
		}, 50);
	})
	let shaking = $state([]);
	function handleLockedclick(e, i) {e.preventDefault(); if (shaking[i]) return; shaking[i] = true; setTimeout(() => (shaking[i] = false), 600); }
	function onSwiperRealIndexChange() {
		swiperIndex = swiperEl.swiper?.realIndex
	}
</script>

{#snippet Slide(section, i)}
	<swiper-slide class="section {swiperIndex % sections.length == i ? `active` : ``} {sections.length == i+1 ? `last` : ``}">
		<a href={`/programma/${section.slug}`}
		class="{section.locked ? `locked` : ``} {shaking[i] ? `shaking` : ``}"
		onclick={(e) => { if (section.locked) handleLockedclick(e, i) }}
		style="--rotate: {rotations[i]}deg;">
			<div class="outer">
				<div class="inner">
					<div class="front rounded-m">
						<h4 class="wb-10-mb uppercase">{section.name}</h4>
						{#if section.image}
							<Media class="img" image={section.image} alt="Copertina per {section.event}" sizes="(max-width: 768px) 80vw, 25vw" />
						{:else if section.img}
							<Media class="img" src={section.img} lqip={section.lqip} alt="Copertina per {section.event}" />
						{:else}
							<div class="img {section.gradient}"></div>
						{/if}
						<h5 class="wb-cd-24-mb uppercase white bg-black">{section.title}</h5>
					</div>
					<div class="back rounded-m gradient-y-linen-white"></div>
				</div>
			</div>
		</a>
	</swiper-slide>
{/snippet}

<swiper-container class="sections mobile-only {visible ? 'visible' : ''}"
init="false"
autoplay={{
	active: false,
	delay: 3000,
	disableOnInteraction: true,
}}
loop={true}
speed={300}
autoHeight={false}
space-between={15}
onswiperrealindexchange={() => {onSwiperRealIndexChange()}}
bind:this={swiperEl}
>
	{#each sections as section, i (section.slug)}
		{@render Slide(section, i)}
	{/each}
	<!-- second set: enough slides for the loop at 3.75 per view -->
	{#each sections as section, i (section.slug)}
		{@render Slide(section, i)}
	{/each}
</swiper-container>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	.sections {
		// side inset as padding, not Swiper slide offsets: in Swiper 14 offsets shrink the cards and jump at the loop point
		padding-inline: 15px;

		@media (width <= #{$lg}) {
			display: flex;
			position: relative;
			left: 0;
			top: 0;
			width: 100%;
			height: stretch;
			margin-top: var(--sp-48);
			opacity: 0;

			// reserve the final height before Swiper initialises (no vertical shift): one 3:4 card tall.
			// card width = (screen - 2 × 15px padding - gaps) / cards per view; per-view steps mirror the
			// Swiper breakpoints in the script (576 / 768px, raw values on purpose to match them exactly)
			--perView: 1.75;
			min-height: calc((100vw - 30px - (var(--perView) - 1) * 15px) / var(--perView) * 4 / 3);

			@media (width >= 576px) {
				--perView: 2.75;
			}
			@media (width >= 768px) {
				--perView: 3.75;
			}

			&.visible {
				opacity: 1;

				.section {
					transition: var(--transition-s);
				}
			}

			&::part(container) {
				overflow: visible;
			}

			.section {
				display: block;
				aspect-ratio: 3/4;
				transform-style: preserve-3d;
				transform-style: preserve-3d;
				transform-origin: center;

				&.active {
					.outer {
						.inner {
							transform: rotateZ(var(--rotate)) rotateY(0);
							.front {
								box-shadow: 10px 5px 15px rgba(0, 0, 0, .1);
							}
						}
					}
				}

				.outer {
					display: block;
					width: 100%;
					height: 100%;
					.inner {
						width: 100%;
						height: 100%;
						perspective: 10000px;
						transform-style: preserve-3d;
						transition: var(--transition-s);
						transform: rotateY(180deg);
						will-change: transform;
						.front,
						.back {
							position: absolute;
							inset: 0;
							backface-visibility: hidden;
							box-shadow: 0 0 0 1px var(--linen);
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							text-align: center;
							width: 100%;
							height: 100%;
							h4 {
								position: absolute;
								z-index: 1; // above the <Media> image, which is itself positioned
								top: var(--sp-12);
								width: 100%;
								color: var(--white);
								text-align: center;
							}
							// <Media> and the gradient fallback div
							.img, :global(.media-container.img) {
								height: stretch;
								width: 100%;
								object-fit: cover;
							}
							h5 {
								padding: .4em .6em;
								width: 100%;
							}
						}
						.back {
							transform: rotateY(180deg);
						}
					}
				}
			}
		}
	}
</style>