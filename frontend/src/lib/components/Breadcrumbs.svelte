<script>
    import { page } from "$app/state";
    let { showSingle = true, typeColor = undefined } = $props();
    let allSegments = $derived(page.url.pathname.split('/').filter(Boolean));
    // an edition's slug segment reads as its title (2026 → MFF26)
    const label = (segment) =>
        page.params.edition && segment === page.params.edition && page.data.edition?.title
            ? page.data.edition.title
            : segment.replace(/-/g, " ");
    let visibleSegments = $derived.by(() => {
        return showSingle ? allSegments : allSegments.slice(0, -1);
    });
</script>

<nav aria-label="Breadcrumb" class="wb-12 uppercase" style={typeColor ? `--bgColor: ${typeColor.hex}` : undefined}>
    <ol>
        {#each visibleSegments as segment, i (allSegments.slice(0, i + 1).join('/'))}
            <li>
                {#if i < visibleSegments.length - 1}
                    <a class="hover-underline {typeColor ? 'typeColor' : undefined}" href={"/" + allSegments.slice(0, i + 1).join("/")}>
                        {label(segment)}
                    </a><span class="divider">/</span>
                {:else}
                    {#if showSingle}
                        <span aria-current="page">
                            {label(segment)}
                        </span>
                    {:else}
                        <a class="hover-underline {typeColor ? 'typeColor' : undefined}" href={"/" + allSegments.slice(0, i + 1).join("/")}>
                            {label(segment)}
                        </a>
                    {/if}
                {/if}
            </li>
        {/each}
    </ol>
</nav>

<style lang="scss">
    nav {
        margin-bottom: var(--sp-12);
    }
    ol {
        display: flex;
        list-style: none;
        padding: 0;
        
        .divider {
            margin: 0 .4em;
            pointer-events: none;
            user-select: none;
        }
    }
</style>