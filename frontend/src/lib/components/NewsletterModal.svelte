<!--
	Newsletter signup dialog, mounted once in +layout.svelte and opened via getNewsletter().setOpen(true).
	Markup-only Mailchimp embedded form: to go live, copy `u` and `id` (and the list-manage host) from
	Mailchimp → Audience → Signup forms → Embedded forms → the form's `action` URL.
	Field names follow Mailchimp's embed: EMAIL is the default merge tag, b_{u}_{id} is its honeypot.
	PRIVACY: create a matching merge field in the audience (or switch to Mailchimp's GDPR fields) before going live.
-->
<script>
	import { fade } from 'svelte/transition'
	import { getNewsletter } from '$lib/stores/newsletter.svelte.js'
	import { useScrollLock } from '$lib/utils/scrollLock.svelte.js'

	const MAILCHIMP = {
		host: 'https://modenafilmfestival.us1.list-manage.com',
		u: 'MAILCHIMP_U',
		id: 'MAILCHIMP_ID',
	}
	const action = `${MAILCHIMP.host}/subscribe/post?u=${MAILCHIMP.u}&id=${MAILCHIMP.id}`

	const newsletter = getNewsletter()
	useScrollLock(() => newsletter.open)

	function close() {
		newsletter.setOpen(false)
	}
	function focusOnOpen(node) {
		node.focus()
	}
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape' && newsletter.open) close() }} />

{#if newsletter.open}
	<div class="backdrop" role="presentation" onclick={close} transition:fade={{ duration: 200 }}></div>
	<div class="modal bg-linen rounded-l" role="dialog" aria-modal="true" aria-labelledby="newsletter-modal-title" transition:fade={{ duration: 200 }}>
		<h1 class="title wb-cd-60 wb-cd-40-mb uppercase">Vuoi rimanere aggiornato?</h1>
		<p class="wb-16 wb-15-mb">Iscriviti alla newsletter di <a class="underline" href="https://www.crispycinemaclub.it/" target="_blank" rel="noopener noreferrer">Crispy Cinema Club</a> per ricevere aggiornamenti su programma, ospiti, eventi e iniziative del Modena Film Festival.</p>
		<form {action} method="post" target="_blank" aria-label="Iscriviti alla newsletter">
			<label class="sr-only" for="mce-EMAIL">Email</label>
			<input class="wb-21 bg-white" type="email" name="EMAIL" id="mce-EMAIL" placeholder="Inserisci la tua email" autocomplete="email" required {@attach focusOnOpen}>
			<label class="consent wb-14 wb-15-mb">
				<input type="checkbox" name="PRIVACY" value="1" required>
				<span>Ho letto e accetto la <a class="underline" href="/privacy" target="_blank">privacy policy</a></span>
			</label>
			<div class="honeypot" aria-hidden="true">
				<input type="text" name="b_{MAILCHIMP.u}_{MAILCHIMP.id}" tabindex="-1" value="">
			</div>
			<button class="btn-l submit bg-black white hover-black hover-bg-white" type="submit">Iscriviti</button>
		</form>
	</div>
{/if}

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 10;
		// prefixed first: the CSS minifier keeps only the last of the two
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	}
	.modal {
		position: fixed;
		z-index: 11;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(500px, calc(100vw - var(--margin) * 2));
		max-height: calc(100dvh - var(--margin) * 2);
		overflow-y: auto;
		padding: var(--margin) var(--gutter) var(--sp-12);
		text-align: center;

		p {
			margin: var(--sp-12) var(--margin) var(--sp-18);
		}
		form {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--sp-12);

			input[type="email"] {
				border: none;
				padding: var(--sp-18) var(--margin);
				width: 100%;
			}
			.consent {
				display: flex;
				align-items: baseline;
				gap: .3em;

				input {
					appearance: auto;
					border-radius: 0;
				}
			}
			.submit {
				width: stretch;
				margin-top: var(--sp-12);
			}
			.honeypot {
				position: absolute;
				left: -5000px;
			}
		}
	}
</style>
