<script>
    import Breadcrumbs from "./Breadcrumbs.svelte";
    let { person } = $props()
</script>

<div class="person">
	{#if person.portrait}
		<img class="_2_3 rounded-m" src={person.portrait} alt="Ritratto di {person.portrait}">
	{:else}
		<div class="placeholder _1_1 rounded-m gradient-xy-linen-white">
			<span class="initials wb-40">{person.initials}</span>
		</div>
	{/if}
	<h3 class="wb-24 wb-18-mb">{person.name} {person.surname}</h3>
	{#if person.role}
		<p class="role wb-12 wb-10-mb">{person.role}</p>
	{/if}
</div>

<style>
	.person {
		.placeholder {
			position: relative;
			.initials {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
			}
		}
		h3 {
			margin-top: .7rem;
		}
		.role {
			margin-top: .3rem;
		}
	}
</style>