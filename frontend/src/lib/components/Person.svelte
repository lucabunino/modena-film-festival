<script>
	import Media from '$lib/components/Media.svelte'
    import Breadcrumbs from "./Breadcrumbs.svelte";
    // member: an About team member ({role, person})
    let { member } = $props()
	const person = $derived(member.person ?? {})
	const initials = $derived(`${person.name?.[0] ?? ''}${person.surname?.[0] ?? ''}`.toUpperCase())
</script>

<div class="person">
	{#if person.portrait}
		<Media class="_2_3 rounded-m" image={person.portrait} aspectRatio={2 / 3} alt="Ritratto di {person.name} {person.surname}" sizes="(max-width: 1024px) 50vw, 25vw" />
	{:else}
		<div class="placeholder _1_1 rounded-m gradient-xy-linen-white">
			<span class="initials wb-40">{initials}</span>
		</div>
	{/if}
	<h3 class="wb-24 wb-18-mb">{person.name} {person.surname}</h3>
	{#if member.role}
		<p class="role wb-12 wb-10-mb">{member.role}</p>
	{/if}
</div>

<style lang="scss">
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
			margin-top: var(--sp-8);
		}
		.role {
			margin-top: var(--sp-4);
		}
	}
</style>