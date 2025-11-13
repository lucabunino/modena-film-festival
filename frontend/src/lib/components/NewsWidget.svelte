<script>
    let { news } = $props()
	import { register } from 'swiper/element/bundle';register();
	let visible = $state(false)
	let swiperEl = $state(undefined)
	let swiperIndex = $state(0)
	import { getBanner } from '$lib/stores/banner.svelte';
	let banner = getBanner()

	// Lifecycle
	$effect(() => {
		setTimeout(() => {
			visible = true
		}, 50);
	})

	// Functions
	function onSwiperRealIndexChange() {
		swiperIndex = swiperEl.swiper?.realIndex
	}
	function handleClick(i) {
		swiperEl.swiper.slideTo(i);
	}
</script>


<div id="news-widget">
	<swiper-container
	autoplay={{
		delay: 3000,
		disableOnInteraction: true,
	}}
	mousewheel={{
		forceToAxis: true,
	}}
	grabCursor={true}
	loop={true}
	speed={300}
	spaceBetween={30}
	autoHeight={false}
	class="{visible ? 'visible' : ''} {banner.show ? 'banner' : ''}"
	onswiperrealindexchange={() => {onSwiperRealIndexChange()}}
	bind:this={swiperEl}
	>
		{#each news as singleNews, i}
			<swiper-slide class="bg-white rounded-m border-linen">
				<div>
					{#if singleNews.title}<h1 class="wb-21">{@html singleNews.title}</h1>{/if}
					{#if singleNews.abstract}<p class="wb-14">{singleNews.abstract}</p>{/if}
				</div>
				{#if singleNews.ctaLabel && singleNews.ctaHref}
					<a class="btn-xs uppercase" href={singleNews.ctaHref} target={singleNews.ctaBlank ? '_blank' : '_self'} rel={singleNews.ctaBlank ? 'noopener noreferrer' : ''}>{singleNews.ctaLabel}{singleNews.ctaBlank ? ' ↗' : ''}</a>
				{/if}
				<div class="pagination">
					{#each news as singleNews, i}
						<button class="circle {swiperIndex == i ? 'active' : ''}" onclick={() => {handleClick(i)}}></button>
					{/each}
				</div>
			</swiper-slide>
		{/each}
	</swiper-container>
</div>

<style>
	#news-widget {
		position: absolute;
		top: 0;
		right: var(--margin);
		height: stretch;
		width: clamp(300px, 25vw, 400px);
		z-index: 4;
		pointer-events: none;

		swiper-container {
			position: sticky;
			top: var(--margin);
			opacity: 0;
			transition: var(--transition-m);
			transform: translateX(150%);
			transition-property: transform;
			margin: var(--margin) 0;
			pointer-events: all;

			&.visible {
				opacity: 1;
				transform: translateX(0);
			}

			&.banner {
				top: calc(var(--margin) + 200px + .3rem);
			}

			swiper-slide {
				padding: var(--margin) var(--gutter);
				min-height: 150px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				&:not(.swiper-slide-active) {
					box-shadow: none;
				}

				p {
					margin-top: 1rem;
				}
				a {
					display: block;
					margin-top: 3rem;
					width: fit-content;
				}
				
				.pagination {
					display: flex;
					position: absolute;
					right: var(--gutter);
					bottom: var(--margin);
					gap: .2rem;

					.circle {
						border: solid 1px var(--black);
						aspect-ratio: 1;
						width: .7rem;
						border-radius: .7rem;

						&.active {
							background-color: var(--black);
						}
					}
				}
			}
		}
	}
</style>