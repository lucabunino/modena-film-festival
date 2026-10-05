<script>
	import { asset } from '$lib/utils/assets.js'
    import Breadcrumbs from "./Breadcrumbs.svelte";
    let { title, subtitles, size, cta } = $props()
	let shaking = $state(false);
</script>

<section id="title">
	<Breadcrumbs/>
	{#if title}
		<h1 class="{
		size == 'l' ? 'wb-cd-120 wb-cd-40-mb'
		: size == 'm' ? 'wb-cd-80 wb-cd-40-mb'
		: size == 's' ? 'wb-cd-60 wb-cd-24-mb'
		: size == 'xs' ? 'wb-cd-40 wb-cd-24-mb'
		: ''} uppercase">{@html title}</h1>
	{/if}
	{#if subtitles}
		{#each subtitles as subtitle, i (subtitle)}
			<h2 class="wb-24 wb-18-mb max-w-700">{@html subtitle}</h2>
		{/each}
	{/if}
	{#if cta}
		{#if cta.webtic}
		<a class="cta btn-l bg-linen black hover-black hover-bg-linen" href="https://www.webtic.it/app/shop?action=loadSubscriptions&localId=7348" target='_blank' rel='noopener noreferrer'
		onclick={(e) => {cta.locked ? handleLockedclick(e) : ''}}
		>Abbonamento</a>
		{/if}
		<a class="cta btn-l {cta.webtic ? 'bg-linen black hover-black hover-bg-linen' : 'bg-black white hover-black hover-bg-linen'} {cta.bg ? cta.bg : undefined} {cta.locked ? 'locked' : undefined} {shaking ? 'shaking' : undefined}" href={cta.href} target={cta.blank ? '_blank' : ''} rel={cta.blank ? 'noopener noreferrer' : ''}
		onclick={(e) => {cta.locked ? handleLockedclick(e) : ''}}
		>{cta.label}
		<!-- {#if cta.webtic}
			<img class="webtic" src={asset('/logos/webtic.webp')} alt="">
		{/if} -->
		</a>
	{/if}
</section>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
section {
	grid-column: 1 / span 6;

	h2 {
		margin-top: var(--sp-12);

		&+h2 {
			margin-top: .6em;
		}
	}

	.cta {
		margin-top: var(--sp-24);
		&:hover {
			filter: invert(1);
		}
		.webtic {
			display: inline-block;
			position: relative;
			top: .25em;
			height: 1.25em;
			margin-top: -.5em;
			width: auto;
		}

		@media (width <= #{$sm}) {
			width: 100%;
			text-align: center;
		}
	}
	.cta+.cta {
		margin-top: var(--sp-6);
	}
}
</style>