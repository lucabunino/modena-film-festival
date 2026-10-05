<script>
	import Media from '$lib/components/Media.svelte'
    let { juror } = $props()
</script>

<div class="juror wb-14 wb-12-mb" title="{juror.name} {juror.surname}">
	{#if juror.portrait}
		<Media class="portrait _4_5 rounded-m" src={juror.portrait} />
	{:else}
		<div class="placeholder _4_5 rounded-m gradient-xy-linen-white"></div>
	{/if}
	<h3 class="wb-28 wb-18-mb">{juror.name} {juror.surname}</h3>
	{#if juror.role || juror.profession || juror.country}
		<ul class="info">
			{#if juror.role}
				<li class="uppercase">{juror.role}</li>
			{/if}
			{#if juror.profession}
				<li>{juror.profession}</li>
			{/if}
			{#if juror.country}
				<li>{juror.country}</li>
			{/if}
		</ul>
		{#if juror.bio}
			<div class="bio">
				{#each juror.bio as p (p)}
				<p>{p}</p>
				{/each}
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
			p+p {
				margin-top: .6em;
			}
		}
	}
</style>