<script>
    let { contact, bg } = $props()
</script>

<div class="contact-card {bg ? bg : 'bg-white'} rounded-l" id={contact.slug} title={contact.title}>
	<div>
		<h2 class="wb-12 wb-10-mb uppercase">{contact.title}</h2>
		<h3 class="wb-21 wb-18-mb">{contact.abstract}</h3>
	</div>
	{#if contact.email}
		<a class="btn-l {bg ? 'bg-white' : 'bg-linen'} hover-white hover-bg-black" href="mailto:{contact.email}">{contact.email}</a>
	{:else if contact.cta}
		<a href={contact.cta.href} class="btn-l {bg ? 'bg-white' : 'bg-linen'} hover-white hover-bg-black" target="_blank" rel="noopener noreferrer">{contact.cta.label}</a>
	{/if}
</div>

<style>
	.contact-card {
		padding: 3rem var(--gutter) var(--gutter);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 250px;

		@media screen and (max-width: 1080px) {
			padding: 3rem var(--margin) var(--margin);
		}

		h3 {
			margin-top: 1rem;
		}

		a {
			text-align: center;
		}
	}
</style>