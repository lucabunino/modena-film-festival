<script>
	import { page } from '$app/state'
	import EventCard from '$lib/components/EventCard.svelte'
	import { formatDateHash, formatDayName, formatDayNumber } from '$lib/utils/datetime.js'

	let { program, href = '/programma' } = $props()

	const activeDay = $derived(page.url.searchParams.get('day') || (program?.days?.[0] ? formatDateHash(program.days[0].date) : null))
	const activeFormat = $derived(page.url.searchParams.get('format'))
	const filteredDays = $derived.by(() => {
		const seenEventIds = new Set()
		const isFilteringSpecificDay = activeDay && activeDay !== 'all'

		return (program?.days ?? [])
			.filter(day => !isFilteringSpecificDay || formatDateHash(day.date) === activeDay)
			.map(day => {
				const visibleEvents = (day.events ?? []).filter(event => {
					const matchesFormat = !activeFormat || event.formats?.some(f => {
						const slugValue = typeof f.slug === 'object' ? f.slug.current : f.slug
						return slugValue === activeFormat
					})
					if (!matchesFormat) return false
					if (isFilteringSpecificDay) return true
					if (seenEventIds.has(event._id)) return false
					seenEventIds.add(event._id)
					return true
				})
				return { ...day, visibleEvents }
			})
			.filter(day => day.visibleEvents.length > 0)
	})

	function getFilterUrl(key, value) {
		const params = new URLSearchParams(page.url.searchParams)
		if (value) params.set(key, value)
		else params.delete(key)
		const queryString = params.toString()
		return queryString ? `?${queryString}` : page.url.pathname
	}
</script>

<section id="program" class="bg-white" title="Programma">
	<div class="text-wrapper">
		<h2 class="wb-12 wb-10-mb uppercase">Programma</h2>
		<p class="wb-24 wb-18-mb max-w-600">Tutte le informazioni sull’intero cartellone del festival, dai film in concorso agli eventi speciali.</p>
		<div class="days wb-12 wb-10-mb uppercase">
			<span>Giorni: </span>
			{#each program.days as day (day.date)}
				<a href={getFilterUrl('day', formatDateHash(day.date))} class="filter btn-m {activeDay === formatDateHash(day.date) ? 'bg-black white' : 'bg-linen'} hover-bg-black" data-sveltekit-noscroll>{formatDayName(day.date).substring(0, 3)} {formatDayNumber(day.date)}</a>
			{/each}
		</div>
	</div>
	{#each filteredDays as day (day.date)}
		{#key day}
			<div class="day-head desktop-only">
				<p class="day-title wb-cd-170">{formatDayName(day.date)} {formatDayNumber(day.date)}</p>
			</div>
			<div class="day-wrapper">
				<div class="day">
					{#each day.visibleEvents as event (event._id)}
						<div class="event-wrapper">
							<EventCard {event} />
						</div>
					{/each}
				</div>
			</div>
		{/key}
	{/each}
	<a class="cta btn-xs uppercase" {href}>Vedi il programma completo →</a>
</section>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	#program {
		padding-bottom: var(--sp-72); // white space after the last row (also overrides main's last-section spacing)

		.cta {
			margin: var(--sp-24) var(--margin) 0;
		}

		.text-wrapper {
			padding: var(--margin) var(--margin) var(--sp-24);
			p {
				margin-top: var(--sp-18);
				margin-bottom: var(--sp-18);
			}
		}
		.days {
			display: flex;
			flex-wrap: wrap;
			column-gap: .2em;
			row-gap: .4em;
			align-items: baseline;

			span {
				margin-right: 1em;
			}
		}
		// big day name (desktop)
		.day-head {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			gap: var(--margin);
			margin: 0 var(--margin);
			padding: 0 0 var(--margin);
		}
		.day-wrapper {
			overflow-x: scroll;
			-ms-overflow-style: none;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}

			.day {
				display: flex;
				padding: 0; // full-bleed row, flush with the day title
				width: fit-content;
				gap: 0; // images touch; the card text carries its own --gutter padding

				.event-wrapper {
					width: 32.5vw; // ~25% bigger than the original 26vw
					min-width: 440px;

					@media (width <= #{$xl}) {
						min-width: 375px;
					}

					@media (width <= #{$lg}) {
						min-width: 312px;
					}
				}
			}
		}
	}
</style>
