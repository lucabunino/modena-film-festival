<script>
	import viewport from '$lib/utils/useViewportAction';

	let {sections} = $props()
	let activeSectionEl = $state(undefined);
	let mouse = $state({ x: undefined, y: undefined });
	let sectionEls = $state([]);
	let visibleSections = $state(false);
	let rotations =  $state(Array(sections.length).fill({ x: 0, y: 0 }));
	let translations =  $state(Array(sections.length).fill({ x: 0, y: 0 }));
	const multipliers = [11, 8, 10, 7, 12]
	function updateTilt(index) {
		const el = sectionEls[index];
		if (!el || !mouse.x || !mouse.y) {
			rotations[index] = { x: 0, y: 0 };
			translations[index] = { x: 0, y: 0 };
			return;
		}

		const rect = el.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = (mouse.x - cx) / rect.width;
		const dy = (mouse.y - cy) / rect.height;

		const rx = -dy * multipliers[index];
		const ry = dx * multipliers[index];
		rotations[index] = { x: rx, y: ry };

		const tx = (dx / cx) * multipliers[index] * 500;
		const ty = (dy / cy) * multipliers[index] * 500;
		translations[index] = { x: tx, y: ty };
	}

	let shaking = $state([]);
	$inspect(shaking)
	function handleLockedclick(e, i) {
		e.preventDefault()
		if (shaking[i]) return;
		shaking[i] = true;
		setTimeout(() => (shaking[i] = false), 600);
	}
</script>

<svelte:window
onmousemove={(e) => {mouse = {x: e.clientX, y: e.clientY}; sectionEls.forEach((_, i) => updateTilt(i))}}
></svelte:window>

<div class="sections" use:viewport onenterViewport={() => visibleSections = true}>
	{#each sections as section, i}
		<a href={`/sezioni/${section.slug}`}
		class="section {activeSectionEl !== i ? `scattered${activeSectionEl}` : ``} {activeSectionEl === i ? `active` : ``} {visibleSections ? `visible` : ``} locked {shaking[i] ? `shaking` : ``}"
		onmouseenter={() => {activeSectionEl = i}}
		onmouseleave={() => {activeSectionEl = undefined}}
		onfocusin={() => {activeSectionEl = i}}
		onfocusout={() => {activeSectionEl = undefined}}
		onclick={(e) => {handleLockedclick(e, i)}}
		style="
			--rotateX: {rotations[i].x}deg;
			--rotateY: {rotations[i].y}deg;
			--translateX: {translations[i].x}%;
			--translateY: {translations[i].y}%;
			--delay: {200 + 50*i}ms;
		">
			<div class="outer">
				<div class="inner">
					<div class="front rounded-m">
						<h4 class="wb-10 uppercase">{section.name}</h4>
						<div class={section.gradient}></div>
						<h5 class="wb-cd-24 uppercase white bg-black">Maggiori info a breve</h5>
					</div>
					<div class="back rounded-m bg-white"></div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.sections {
		display: flex;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: stretch;

		&:hover {
			.section {
				transition-delay: 0ms;
				transition-duration: 400ms;
			}
		}

		.section {
			display: block;
			position: absolute;
			width: 12vw;
			height: 15vw;
			transform-style: preserve-3d;
			transform-style: preserve-3d;
			transition: var(--transition);
			transition-duration: 1000ms;
			transition-delay: var(--delay);
			z-index: 0;
			transform-origin: center;
			will-change: transform;
			opacity: 0;

			&:nth-child(1) { transform: rotateY(180deg) rotateZ(-2deg) translateY(100%); opacity: 0; left: 46%; top: calc(var(--spacing-l) + 1vw); }
			&:nth-child(2) { transform: rotateY(180deg) rotateZ(1deg) translateY(100%); opacity: 0; left: 63%; top: calc(var(--spacing-l) - 2vw); }
			&:nth-child(3) { transform: rotateY(180deg) rotateZ(-1deg) translateY(100%); opacity: 0; left: 80%; top: calc(var(--spacing-l) + 3vw); }
			&:nth-child(4) { transform: rotateY(180deg) rotateZ(2deg) translateY(100%); opacity: 0; left: 53%; top: calc(var(--spacing-l) + 8vw); }
			&:nth-child(5) { transform: rotateY(180deg) rotateZ(3deg) translateY(100%); opacity: 0; left: 70%; top: calc(var(--spacing-l) + 10vw); }
			&:nth-child(1).visible { transform: rotateY(0) rotateZ(-2deg); opacity: 1; left: 46%; top: calc(var(--spacing-l) + 1vw); }
			&:nth-child(2).visible { transform: rotateY(0) rotateZ(1deg); opacity: 1; left: 63%; top: calc(var(--spacing-l) - 2vw); }
			&:nth-child(3).visible { transform: rotateY(0) rotateZ(-1deg); opacity: 1; left: 80%; top: calc(var(--spacing-l) + 3vw); }
			&:nth-child(4).visible { transform: rotateY(0) rotateZ(2deg); opacity: 1; left: 53%; top: calc(var(--spacing-l) + 8vw); }
			&:nth-child(5).visible { transform: rotateY(0) rotateZ(3deg); opacity: 1; left: 70%; top: calc(var(--spacing-l) + 10vw); }

			&.scattered0:nth-child(1) { left: 44%; top: calc(var(--spacing-l) + 2vw); }
			&.scattered0:nth-child(2) { left: 61%; top: calc(var(--spacing-l) - 1vw); }
			&.scattered0:nth-child(3) { left: 78%; top: calc(var(--spacing-l) + 5vw); }
			&.scattered0:nth-child(4) { left: 55%; top: calc(var(--spacing-l) + 9vw); }
			&.scattered0:nth-child(5) { left: 72%; top: calc(var(--spacing-l) + 11vw); }

			&.scattered1:nth-child(1) { left: 45%; top: calc(var(--spacing-l) + 0vw); }
			&.scattered1:nth-child(2) { left: 65%; top: calc(var(--spacing-l) - 3vw); }
			&.scattered1:nth-child(3) { left: 83%; top: calc(var(--spacing-l) + 2vw); }
			&.scattered1:nth-child(4) { left: 52%; top: calc(var(--spacing-l) + 10vw); }
			&.scattered1:nth-child(5) { left: 68%; top: calc(var(--spacing-l) + 12vw); }

			&.scattered2:nth-child(1) { left: 43%; top: calc(var(--spacing-l) + 1vw); }
			&.scattered2:nth-child(2) { left: 62%; top: calc(var(--spacing-l) - 1vw); }
			&.scattered2:nth-child(3) { left: 80%; top: calc(var(--spacing-l) + 4vw); }
			&.scattered2:nth-child(4) { left: 54%; top: calc(var(--spacing-l) + 8vw); }
			&.scattered2:nth-child(5) { left: 71%; top: calc(var(--spacing-l) + 9vw); }

			&.scattered3:nth-child(1) { left: 48%; top: calc(var(--spacing-l) + 2vw); }
			&.scattered3:nth-child(2) { left: 60%; top: calc(var(--spacing-l) - 1vw); }
			&.scattered3:nth-child(3) { left: 79%; top: calc(var(--spacing-l) + 3vw); }
			&.scattered3:nth-child(4) { left: 56%; top: calc(var(--spacing-l) + 7vw); }
			&.scattered3:nth-child(5) { left: 69%; top: calc(var(--spacing-l) + 10vw); }

			&.scattered4:nth-child(1) { left: 47%; top: calc(var(--spacing-l) + 1vw); }
			&.scattered4:nth-child(2) { left: 64%; top: calc(var(--spacing-l) - 2vw); }
			&.scattered4:nth-child(3) { left: 82%; top: calc(var(--spacing-l) + 4vw); }
			&.scattered4:nth-child(4) { left: 53%; top: calc(var(--spacing-l) + 9vw); }
			&.scattered4:nth-child(5) { left: 71%; top: calc(var(--spacing-l) + 11vw); }

			.outer {
				width: 100%;
				height: 100%;
				will-change: transform;
				/* transform: rotateX(var(--rotateX)) rotateY(var(--rotateY)) translateX(var(--translateX)) translateY(var(--translateY)); */
				.inner {
					width: 100%;
					height: 100%;
					perspective: 10000px;
					transform-style: preserve-3d;
					transition: var(--transition);
					transform: rotateY(180deg);
					will-change: transform;
					.front,
					.back {
						position: absolute;
						inset: 0;
						backface-visibility: hidden;
						box-shadow: 0 0 0 1px rgba(0, 0, 0, 1);
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						text-align: center;
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
						}
					}
					.back {
						transform: rotateY(180deg);
					}
				}
			}

			&.active {
				z-index: 3;
				transition-duration: 400ms;
				transform: rotateZ(0) scale(1.2) !important;
				.inner {
					transform: rotateY(0);
					.front {
						box-shadow: 10px 5px 15px rgba(0, 0, 0, .1);
					}
				}
			}
		}
	}
</style>