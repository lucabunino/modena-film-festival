<!--
	CMS rich text (the body() field) rendered as the site's own markup.
	block: class on each paragraph · h3: class on headings · link: class on links
	wrap: class of a div around each block and list (e.g. one div per paragraph)
-->
<script>
	import { PortableText } from '@portabletext/svelte'
	import Rich from '$lib/components/portableTextStyles/portableTextStyleRich.svelte'
	import ListItem from '$lib/components/portableTextStyles/portableTextListItem.svelte'

	let { value, block = undefined, h3 = undefined, link = undefined, wrap = undefined } = $props()
</script>

{#if value?.length}
	<PortableText
		{value}
		context={{ block, h3, link, wrap }}
		components={{
			block: { normal: Rich, h3: Rich },
			list: { bullet: Rich },
			listItem: { bullet: ListItem },
			marks: { link: Rich },
		}}
	/>
{/if}
