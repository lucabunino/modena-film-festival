<script>
	import { getBanner } from '$lib/stores/banner.svelte';
	let banner = getBanner()
	let visible = $state(false)

	$effect(() => {
		if (localStorage.getItem('cookieConsent') === 'accepted') {
			banner.setShow(false);
		} else {
			banner.setShow(true);
		}
		setTimeout(() => {
			visible = true
		}, 0);
	})

	function acceptCookies() {
		localStorage.setItem('cookieConsent', 'accepted');
		banner.setShow(false);
		cookieAccepted = true;
	}
	function rejectCookies() {
		localStorage.setItem('cookieConsent', 'rejected');
		banner.setShow(false);
		cookieAccepted = false;
	}
</script>

{#if banner.show}
	<div id="cookie-banner" class="wb-14 rounded-m bg-white {visible ? 'visible' : ''}">
		<p>Questo sito utilizza esclusivamente cookie tecnici, necessari al suo corretto funzionamento. Non vengono utilizzati cookie di profilazione o di terze parti. Per maggiori dettagli, consulta la nostra <a href="/cookies" class="underline">cookie policy</a>.</p>
		<div id="cookie-btns">
			<button id="accept-cookies" onclick={acceptCookies} class="btn-xs uppercase">Ok, ho capito ✓</button>
		</div>
	</div>
{/if}

<style>
#cookie-banner {
	position: fixed;
	top: var(--margin);
	right: var(--margin);
	z-index: 5;
	padding: var(--margin) var(--gutter);
	min-height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: clamp(300px, 25vw, 400px);
	transition: var(--transition-m);
	transition-property: transform;
	opacity: 0;
	transform: translateX(150%);
	border: solid 1px var(--linen);

	&.visible {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>