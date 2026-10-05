<script>
	import { getNewsletter } from '$lib/stores/newsletter.svelte.js'

	// `onnavigate`: lets the mobile Menu close itself when a link/button is used
	let { socials = [], showNewsletter = false, onnavigate = undefined } = $props()
	const newsletter = getNewsletter()

	const icons = {
		Instagram: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3',
		// just the "f" of the Facebook logo; its stem runs past the bottom and is clipped by the circle
		Facebook: 'M10 24V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v9z',
	}
</script>

{#if socials?.length || showNewsletter}
	<ul class="social-row" aria-label="Social media e newsletter">
		{#each socials ?? [] as social (social._key)}
			<li>
				<a class="icon {social.label === 'Facebook' ? 'facebook' : ''}" href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} onclick={() => onnavigate?.()}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d={icons[social.label]} /></svg>
				</a>
			</li>
		{/each}
		{#if showNewsletter}
			<li class="newsletter">
				<button class="btn-xxs" type="button" onclick={() => { onnavigate?.(); newsletter.setOpen(true) }}>Newsletter</button>
			</li>
		{/if}
	</ul>
{/if}

<style lang="scss">
	.social-row {
		display: flex;
		align-items: center;
		gap: var(--sp-6);

		li {
			flex-shrink: 0;
		}
		// circle height = btn-xxs height (wb-14 line box + vertical padding), so they line up
		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			// default = btn-xxs height; the mobile Menu sets --iconSize to match its Biglietti button
			width: var(--iconSize, calc(1rem * 1.2 + var(--sp-5) * 2));
			aspect-ratio: 1;
			border-radius: 50%;
			overflow: hidden;
			--circle: var(--white);
			--symbol: var(--black);
			background-color: var(--circle);

			svg {
				width: 75%;
				height: 75%;
				fill: var(--symbol);
			}
			// same geometry as the original logo: its circle spans 20/24 of the viewBox, so scale it to the button edge
			&.facebook svg {
				width: 100%;
				height: 100%;
				transform: scale(1.2);
			}
			@media (hover: hover) {
				&:hover {
					--circle: var(--black);
					--symbol: var(--white);
				}
			}
		}
		.newsletter button {
			white-space: nowrap;
		}
	}
</style>
