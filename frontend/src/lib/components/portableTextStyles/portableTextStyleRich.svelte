<!-- Blocks, lists and links of RichText.svelte, with the classes passed through its context -->
<script>
	let { portableText, children } = $props()

	const value = $derived(portableText.value)
	const context = $derived(portableText.global.context)
</script>

{#if value._type === 'link'}
	<a class={context.link} href={value.url ?? value.href} target={value.blank ? '_blank' : undefined} rel={value.blank ? 'noopener noreferrer' : undefined}>{@render children?.()}</a>
{:else if context.wrap}
	<div class={context.wrap}>{@render node()}</div>
{:else}
	{@render node()}
{/if}

{#snippet node()}
	{#if value.listItem}
		<ul>{@render children?.()}</ul>
	{:else if value.style === 'h3'}
		<h3 class={context.h3}>{@render children?.()}</h3>
	{:else}
		<p class={context.block}>{@render children?.()}</p>
	{/if}
{/snippet}
