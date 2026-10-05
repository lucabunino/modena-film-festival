<!-- Plain <li> for Portable Text list items (same output as the library default, without the v4 "unknown list item style" warning) -->
<script>
	let { children } = $props()
</script>

<li>{@render children?.()}</li>
