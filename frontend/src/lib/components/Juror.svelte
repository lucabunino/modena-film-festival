<script>
    let { juror } = $props()
</script>

<div class="juror wb-12">
	<img src={juror.portrait} alt="">
	<h3 class="wb-28">{juror.name} {juror.surname}</h3>
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
		img {
			aspect-ratio: 2/3;
		}
		h3 {
			margin-top: 1rem;
		}
		.info {
			margin-top: 1rem;
		}
	}
</style>