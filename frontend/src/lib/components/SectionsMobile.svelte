<script>
	import viewport from '$lib/utils/useViewportAction';
	import { register } from 'swiper/element/bundle';register();
	let {sections} = $props()
	let rotations = $state([1, 3, -2, 4, -3])
	let swiperEl = $state(undefined)
	let swiperIndex = $state(0)
	let visible = $state(false)

	const swiperParams = {
		slidesPerView: 1.75,
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
	let shaking = $state(false);
	function handleLockedclick(e) {e.preventDefault(); if (shaking) return; shaking = true; setTimeout(() => (shaking = false), 600); }
	function onSwiperRealIndexChange() {
		swiperIndex = swiperEl.swiper?.realIndex
	}
</script>

{#snippet Slide(section, i)}
	<swiper-slide class="section locked {shaking[i] ? `shaking` : ``} {swiperIndex % sections.length == i ? `active` : ``} {sections.length == i+1 ? `last` : ``}">
		<a href={`/sezioni/${section.slug}`}
		onclick={(e) => {handleLockedclick(e, i)}}
		style="--rotate: {rotations[i]}deg;">
			<div class="outer">
				<div class="inner">
					<div class="front rounded-m">
						<h4 class="wb-10-mb uppercase">{section.name}</h4>
						<div class={section.gradient}></div>
						<h5 class="wb-cd-24-mb uppercase white bg-black">Maggiori info a breve</h5>
					</div>
					<div class="back rounded-m bg-white"></div>
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
slides-offset-before={15}
slides-offset-after={15}
onswiperrealindexchange={() => {onSwiperRealIndexChange()}}
bind:this={swiperEl}
>
	{#each sections as section, i}
		{@render Slide(section, i)}
	{/each}
	{#each sections as section, i}
		{@render Slide(section, i)}
	{/each}
</swiper-container>

<style>
	.sections {
		@media screen and (max-width: 1080px) {
			display: flex;
			position: relative;
			left: 0;
			top: 0;
			width: 100%;
			height: stretch;
			margin-top: var(--spacing-s);
			opacity: 0;

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
								top: 1rem;
								width: 100%;
								color: var(--white);
								text-align: center;
							}
							div {
								height: 100%;
								width: 100%;
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