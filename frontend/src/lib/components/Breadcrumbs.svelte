<script>
    import { page } from "$app/state";
    let { showSingle = true, typeColor = undefined } = $props();
    let allSegments = $derived(page.url.pathname.split('/').filter(Boolean));
    let visibleSegments = $derived.by(() => {
        return showSingle ? allSegments : allSegments.slice(0, -1);
    });
</script>

<nav aria-label="Breadcrumb" class="wb-12 uppercase" style={typeColor ? `--bgColor: ${typeColor.hex}` : undefined}>
    <ol>
        {#each visibleSegments as segment, i}
            <li>
                {#if i < visibleSegments.length - 1}
                    <a class="hover-underline {typeColor ? 'typeColor' : undefined}" href={"/" + allSegments.slice(0, i + 1).join("/")}>
                        {segment.replace(/-/g, " ")}
                    </a><span class="divider">/</span>
                {:else}
                    {#if showSingle}
                        <span aria-current="page">
                            {segment.replace(/-/g, " ")}
                        </span>
                    {:else}
                        <a class="hover-underline {typeColor ? 'typeColor' : undefined}" href={"/" + allSegments.slice(0, i + 1).join("/")}>
                            {segment.replace(/-/g, " ")}
                        </a>
                    {/if}
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
        list-style: none;
        padding: 0;
        
        .divider {
            margin: 0 .4em;
            pointer-events: none;
            user-select: none;
        }
    }
</style>