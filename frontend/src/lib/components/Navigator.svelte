<script>
    import { page } from "$app/state";
    let { title, sections, cta } = $props()
	let scrollY = $state()
</script>

<svelte:window bind:scrollY></svelte:window>

{#if sections}
	<nav>
		<div class="rounded-m bg-linen wb-21">
			{#if title}
				<h1 class="wb-12 uppercase" onclick={() => {scrollY = 0}}>{title}</h1>
			{/if}
			<ol>
				{#each sections as section, i}
					<li>
						<a href="#{section.id}">{section.title}</a>
					</li>
				{/each}
				{#if cta}
					<li>
						<a class="cta btn-m" href={cta.href} target={cta.blank ? '_blank' : ''} rel={cta.blank ? 'noopener noreferrer' : ''}>{cta.label}</a>
					</li>
				{/if}
			</ol>
		</div>
	</nav>
{/if}

<style>
	nav {
		position: absolute;
		right: 0;
		grid-column: 7 / span 2;
		height: stretch;
		width: stretch;
		min-width: 250px;
		z-index: 2;
		pointer-events: none;

		div {
			padding: var(--margin);
			position: sticky;
			top: var(--margin);
			margin: var(--margin) 0;
			pointer-events: all;

			h1 {
				margin-bottom: 2rem;
				cursor: pointer;
			}

			.cta {
				width: 100%;
				text-align: center;
				margin-top: 2rem;
			}
		}
	}
</style>