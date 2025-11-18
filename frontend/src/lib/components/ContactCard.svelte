<script>
    let { contact } = $props()
</script>

<div class="contact-card bg-white rounded-l" id={contact.slug} title={contact.title}>
	<div>
		<h2 class="wb-12 wb-10-mb uppercase">{contact.title}</h2>
		<h3 class="wb-21 wb-18-mb">{contact.abstract}</h3>
	</div>
	<a class="btn-l bg-linen hover-black" href="mailto:{contact.email}">{contact.email}</a>
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