<script>
    let { 
        portableText,
        children 
    } = $props();

    const value = $derived(portableText.value);
    const style = $derived(value?.style);
    const listItem = $derived(value?.listItem);
</script>

{#if value._type === 'link'}
    <a href={value?.url} target={value?.blank ? '_blank' : undefined}>
        {@render children()}
    </a>
{:else if style === 'h4'}
	<h4 class="wb-12 wb-10-mb uppercase">{@render children()}</h4>
{:else if style === 'normal'}
    <p>{@render children()}</p>
{:else}
    {@render children()}
{/if}

<style>
    :global(#event .portableText p + p) {
        margin-top: 1.1em;
    }
	:global(#event .portableText ul) {
        margin: 0;
		list-style: none;
		padding: none;
    }
	:global(#event .portableText ul li) {
        position: relative;
        padding: 0 0 .2em 1em;
    }
	:global(#event .portableText ul li::before) {
        content: "✳";
        position: absolute;
        left: 0;
    }
	h4 {
		margin-bottom: 2em;
	}
</style>