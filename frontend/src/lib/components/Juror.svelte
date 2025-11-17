<script>
    let { juror } = $props()
</script>

<div class="juror wb-12 wb-10-mb" title="{juror.name} {juror.surname}">
	{#if juror.portrait}
		<img class="portrait _1_1 rounded-m" src={juror.portrait} alt="">
	{:else}
		<div class="placeholder _1_1 rounded-m gradient-xy-linen-white"></div>
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
	{/if}
</div>

<style>
	.juror {
		h3 {
			margin-top: 1rem;
		}
		.info {
			margin-top: 1rem;
		}
	}
</style>