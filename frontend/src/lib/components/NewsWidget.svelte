<script>
	import bp from '$lib/scss/breakpoints.module.scss'
    let { newses } = $props()
	import { register } from 'swiper/element/bundle';register();
	let visible = $state(false)
	let swiperEl = $state(undefined)
	let swiperIndex = $state(0)
	import { getBanner } from '$lib/stores/banner.svelte';
    import { getResponsive } from '$lib/stores/responsive.svelte.js';
    const responsive = getResponsive()
	let banner = getBanner()

	// Lifecycle
	const swiperParams = {
		slidesPerView: newses.length > 1 ? 1.25 : 1,
		spaceBetween: 10,
		slidesOffsetBefore: 15,
		slidesOffsetAfter: 15,
		loop: false,
		...(newses.length > 1 && {
			autoplay: {
				delay: 3000,
				disableOnInteraction: true
			}
		}),
		breakpoints: {
			576: {
				slidesPerView: newses.length > 1 ? 1.75 : 1,
				spaceBetween: 10,
				slidesOffsetBefore: 15,
				slidesOffsetAfter: 15,
				loop: false,
			},
			[parseInt(bp.md)]: {
				slidesPerView: newses.length > 1 ? 2.25 : 1,
				spaceBetween: 10,
				slidesOffsetBefore: 15,
				slidesOffsetAfter: 15,
				loop: false,
			},
			[parseInt(bp.lg)]: {
				slidesPerView: 1,
				spaceBetween: 30,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
				loop: true,
			}
		}
	};
	$effect(() => {
		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();
	
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


<section id="news-widget">
	<swiper-container
	init="false"
	mousewheel={{
		forceToAxis: true,
	}}
	grabCursor={true}
	speed={300}
	autoHeight={false}
	class="{visible ? 'visible' : ''} {banner.show ? 'banner' : ''}"
	onswiperrealindexchange={() => {onSwiperRealIndexChange()}}
	bind:this={swiperEl}
	>
		{#each newses as news, i (news.slug.current)}
			<swiper-slide class="{responsive.overLg ? 'bg-white' : 'bg-linen'} rounded-m border-linen">
				<div>
					{#if news.title}<h1 class="wb-21 wb-15-mb">{@html news.title}</h1>{/if}
					{#if news.widgetAbstract}<p class="wb-14 wb-12-mb">{@html news.widgetAbstract}</p>{/if}
				</div>
				{#if news.widgetCta.label}
					{#if news.widgetCta.blank}
						<a class="btn-xs uppercase" href={news.widgetCta.href} target="_blank" rel="noopener noreferrer">{news.widgetCta.label} ↗</a>
					{:else}
						<a class="btn-xs uppercase" href={news.widgetCta.href}>{news.widgetCta.label}</a>
					{/if}
				{:else}
					<a class="btn-xs uppercase" href="/news/{news.slug.current}">Leggi di più</a>
				{/if}
				{#if newses.length > 1}
					<div class="pagination">
						{#each newses as news, i (news.slug.current)}
							<button aria-label="bullet" class="circle {swiperIndex == i ? 'active' : ''}" onclick={() => {handleClick(i)}}></button>
						{/each}
					</div>
				{/if}
			</swiper-slide>
		{/each}
	</swiper-container>
</section>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	#news-widget {
		position: absolute;
		top: 0;
		right: var(--margin);
		height: stretch;
		width: clamp(300px, 25vw, 400px);
		z-index: 4;
		pointer-events: none;
		grid-column: unset;
		// not the global main > section top padding: the slider's own margin puts it level with the cookie banner
		padding-top: 0;

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
				top: calc(var(--margin) + 200px + var(--sp-4));
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
					margin-top: var(--sp-12);
				}
				a {
					display: block;
					margin-top: var(--sp-36);
					width: fit-content;
				}
				
				.pagination {
					display: flex;
					position: absolute;
					right: var(--gutter);
					bottom: var(--margin);
					gap: var(--sp-2);

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

		@media (width <= #{$lg}) {
			position: relative;
			width: 100vw;
			height: auto;
			top: unset;
			right: unset;
			padding: 0;
			overflow: hidden;

			swiper-container {
				width: 100%;
				margin: 0;
				transform: translateX(0);

				swiper-slide {
					width: 100%;
				}
			}
		}
	}
</style>