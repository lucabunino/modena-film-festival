<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
    let { person } = $props()
</script>

<div class="person">
	<div class="portrait rounded-m gradient-xy-pink-brown"></div>
	<h3 class="wb-24">{person.name} {person.surname}</h3>
	{#if person.role}
		<p class="role wb-12">{person.role}</p>
	{/if}
</div>

<style>
	.person {
		.portrait {
			aspect-ratio: 1;
		}
		h3 {
			margin-top: .7rem;
		}
		.role {
			margin-top: .3rem;
		}
	}
</style>