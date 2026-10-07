<script>
	import Media from '$lib/components/Media.svelte'
	import RichText from '$lib/components/RichText.svelte'
	// juror: one of an Edition's jurors ({role, person})
    let { juror } = $props()
	const person = $derived(juror.person ?? {})
</script>

<div class="juror wb-14 wb-12-mb" title="{person.name} {person.surname}">
	{#if person.portrait}
		<Media class="portrait _4_5 rounded-m" image={person.portrait} aspectRatio={4 / 5} alt="Ritratto di {person.name} {person.surname}" sizes="(max-width: 1024px) 50vw, 25vw" />
	{:else}
		<div class="placeholder _4_5 rounded-m gradient-xy-linen-white"></div>
	{/if}
	<h3 class="wb-28 wb-18-mb">{person.name} {person.surname}</h3>
	{#if juror.role || person.country}
		<ul class="info">
			{#if juror.role}
				<li class="uppercase">{juror.role}</li>
			{/if}
			{#if person.country}
				<li>{person.country}</li>
			{/if}
		</ul>
		{#if person.bio?.length}
			<div class="bio">
				<RichText value={person.bio} />
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.juror {
		h3 {
			margin-top: var(--sp-12);
		}
		.info {
			margin-top: var(--sp-6);
		}
		.bio {
			margin-top: var(--sp-12);
			:global(p + p) {
				margin-top: .6em;
			}
		}
	}
</style>