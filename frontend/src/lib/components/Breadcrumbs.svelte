<script>
    import { page } from "$app/state";
	let segments = $derived(page.url.pathname.split('/').filter(Boolean))
</script>

<nav aria-label="Breadcrumb" class="wb-12 uppercase">
	<ol>
		{#each segments as segment, i}
			<li>
				{#if i < segments.length - 1}
					<a class="hover-underline" href={"/" + segments.slice(0, i + 1).join("/")}>
						{segment.replace(/-/g, " ")}
					</a><span class="divider">/</span>
				{:else}
					<span aria-current="page">
						{segment.replace(/-/g, " ")}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>



<style>
	nav {
		margin-bottom: 1rem;
	}
	ol {
		display: flex;		
		.divider {
			margin: 0 .4em;
			pointer-events: none;
			user-select: none;
		}
	}
</style>