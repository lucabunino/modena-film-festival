<script>
    import { page } from "$app/state";
    import { fade } from "svelte/transition";
	let open = $state(false);
	let shaking = $state(false);
	function handleLockedclick(e) {
		e.preventDefault()
		if (shaking) return;
		shaking = true;
		setTimeout(() => (shaking = false), 600);
	}
</script>

<header class="mobile-only {open ? 'open bg-pink' : 'bg-white'}">
	<section class="main">
		<a href="/" class="logo" aria-label="Modena Film Festival" onclick={() => {open = false}}>
			<svg width="453" height="90" viewbox="0 0 453 90" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="m102.626.004-10.26 89.118L74.426.005h-30.21l17.94 89.14h46.509l10.26-89.14h-16.299Zm24 89.136h-7.701V0h7.701v89.14Zm-82.41 0H0V0h44.215v89.14ZM445.827 89.145v-39.27h6.6v39.27h-6.6ZM424.163 89.804c-6.215 0-10.835-3.52-10.835-9.185 0-6.49 5.115-7.975 11-8.91l9.13-1.54v-1.43c0-3.355-2.035-5.28-6.05-5.28-3.905 0-6.27 1.815-6.49 4.895h-6.49c.165-5.995 4.84-9.295 13.035-9.295 6.27 0 9.9 1.595 11.495 4.895.605 1.265.935 3.025.935 4.73v13.53c0 3.135.055 3.905.33 6.93h-6.435l-.055-2.805h-.165c-1.54 1.705-4.51 3.465-9.405 3.465Zm1.705-4.4c4.4 0 7.755-2.695 7.755-6.93v-4.125l-7.92 1.485c-3.135.55-5.665 1.65-5.665 4.675 0 3.08 2.475 4.895 5.83 4.895ZM394.476 89.144l-11.055-29.425h6.82l4.345 12.375c1.485 4.235 2.585 7.7 3.465 11.165h.22c.935-3.52 1.98-6.93 3.465-11.165l4.4-12.375h6.82l-11.11 29.425h-7.37ZM373.647 89.145V59.72h6.6v29.425h-6.6Zm-.165-33.275v-5.995h6.985v5.995h-6.985ZM364.65 89.145c-4.895 0-7.15-1.375-7.15-6.6v-18.37h-4.18V59.72h4.18v-7.15h6.6v7.15h5.445v4.455H364.1V81.83c0 1.76.66 2.585 2.255 2.585h2.915v4.73h-4.62ZM338.906 89.804c-7.865 0-12.54-3.19-12.76-9.625h6.6c.33 3.52 2.64 5.17 6.27 5.17 3.85 0 6.325-1.485 6.325-4.07 0-2.475-1.705-3.3-5.445-4.07l-2.695-.55c-6.82-1.375-10.505-3.135-10.505-8.69 0-5.115 5.225-8.91 12.21-8.91 6.93 0 12.1 2.86 12.32 8.855h-6.6c-.165-2.97-2.86-4.4-5.83-4.4-3.025 0-5.665 1.375-5.665 3.74s1.705 3.135 5.17 3.85l2.695.55c6.71 1.375 10.78 2.97 10.78 8.91 0 5.5-5.17 9.24-12.87 9.24ZM309.562 89.804c-9.515 0-14.63-5.5-14.63-15.4 0-9.955 6.27-15.345 14.74-15.345 9.295 0 13.97 5.555 13.97 15.895v.825h-22.22c.33 6.16 3.19 9.405 8.25 9.405 3.465 0 6.215-1.705 6.93-5.17h6.545c-.825 6.325-6.71 9.79-13.585 9.79Zm7.48-18.425c-.495-5.225-3.135-7.81-7.535-7.81s-7.205 2.695-7.975 7.81h15.51ZM267.2 89.145v-39.27h25.905v5.665h-19.03v11.22h17.93v5.665h-17.93v16.72H267.2ZM206.303 89.144V64.229l-.11-4.51h6.6l.11 3.795h.165c1.155-2.695 5.005-4.455 8.36-4.455 4.62 0 7.59 2.09 8.855 5.005h.11c1.595-3.245 5.28-5.005 9.515-5.005 5.94 0 10.01 3.52 10.01 10.175v19.91h-6.6v-18.92c0-4.95-3.025-6.215-5.61-6.215-2.695 0-6.325 1.815-6.325 7.755v17.38h-6.6v-18.92c0-4.95-2.97-6.215-5.555-6.215-2.695 0-6.325 1.815-6.325 7.755v17.38h-6.6ZM193.396 89.145v-39.27h6.6v39.27h-6.6ZM180.598 89.145V59.72h6.6v29.425h-6.6Zm-.165-33.275v-5.995h6.985v5.995h-6.985ZM150.626 89.145v-39.27h25.905v5.665h-19.03v11.22h17.93v5.665h-17.93v16.72h-6.875ZM336.094 40.804c-6.215 0-10.835-3.52-10.835-9.185 0-6.49 5.115-7.975 11-8.91l9.13-1.54v-1.43c0-3.355-2.035-5.28-6.05-5.28-3.905 0-6.27 1.815-6.49 4.895h-6.49c.165-5.995 4.84-9.295 13.035-9.295 6.27 0 9.9 1.595 11.495 4.895.605 1.265.935 3.025.935 4.73v13.53c0 3.135.055 3.905.33 6.93h-6.435l-.055-2.805h-.165c-1.54 1.705-4.51 3.465-9.405 3.465Zm1.705-4.4c4.4 0 7.755-2.695 7.755-6.93v-4.125l-7.92 1.485c-3.135.55-5.665 1.65-5.665 4.675 0 3.08 2.475 4.895 5.83 4.895ZM294.404 40.144v-24.75l-.11-4.675h6.6l.11 4.29h.165c1.265-2.53 4.675-4.95 9.295-4.95 6.435 0 10.725 4.015 10.725 10.89v19.195h-6.6v-18.26c0-4.4-2.31-6.82-6.16-6.82-4.62 0-7.425 3.465-7.425 8.525v16.555h-6.6ZM275.839 40.804c-9.515 0-14.63-5.5-14.63-15.4 0-9.955 6.27-15.345 14.74-15.345 9.295 0 13.97 5.555 13.97 15.895v.825h-22.22c.33 6.16 3.19 9.405 8.25 9.405 3.465 0 6.215-1.705 6.93-5.17h6.545c-.825 6.325-6.71 9.79-13.585 9.79Zm7.48-18.425c-.495-5.225-3.135-7.81-7.535-7.81s-7.205 2.695-7.975 7.81h15.51ZM240.719 40.805c-8.14 0-13.2-5.72-13.2-15.4 0-10.395 6.105-15.345 13.475-15.345 4.015 0 7.59 2.145 9.02 4.18h.055V.875h6.6v32.12l.165 7.15h-6.6l-.165-4.07h-.055c-1.265 2.53-4.84 4.73-9.295 4.73Zm1.595-4.895c5.225 0 8.085-4.29 8.085-10.505 0-6.27-2.915-10.45-8.085-10.45-5.17 0-8.195 4.235-8.195 10.45 0 6.27 3.025 10.505 8.195 10.505ZM209.909 40.804c-9.13 0-14.74-5.83-14.74-15.4 0-9.625 5.61-15.345 14.74-15.345 9.185 0 14.74 5.775 14.74 15.345 0 9.625-5.555 15.4-14.74 15.4Zm0-4.785c5.335 0 8.14-4.125 8.14-10.615 0-6.545-2.86-10.56-8.14-10.56-5.335 0-8.14 4.07-8.14 10.56 0 6.545 2.805 10.615 8.14 10.615ZM150.736 40.145V.875h8.8l8.03 22.99c1.265 3.685 1.98 6.27 2.97 9.955h.22c.99-3.74 1.705-6.27 2.915-9.955l7.865-22.99h8.8v39.27h-6.49v-19.47c0-3.685.055-6.105.165-9.68h-.22c-.88 2.75-1.595 5.005-2.86 8.69l-7.04 20.46h-6.71l-7.205-20.46c-.99-2.86-1.815-5.555-2.75-8.69h-.22c.11 2.86.22 6.05.22 9.68v19.47h-6.49Z" fill="#000"/>
			</svg>
		</a>
		<button class="switch " onclick={() => {open = !open}}>
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
		</button>
	</section>
	{#if open}
		<nav in:fade={{duration: 200, delay: 200}} class="menu wb-36-mb" aria-label="Main navigation" menubar aria-orientation="vertical">
			<ul>
				<li><a aria-current={page.url.pathname.startsWith('/festival') ? 'page' : undefined} href="/festival" onclick={() => {open = false}}>Festival</a></li>
				<li><a aria-current={page.url.pathname.startsWith('/about') ? 'page' : undefined} href="/about" onclick={() => {open = false}}>About</a></li>
				<li><a aria-current={page.url.pathname.startsWith('/partner') ? 'page' : undefined} href="/partner" onclick={() => {open = false}}>Partner</a></li>
				<li><a aria-current={page.url.pathname.startsWith('/sostienici') ? 'page' : undefined} href="/sostienici" onclick={() => {open = false}}>Sostienici</a></li>
				<li><a aria-current={page.url.pathname.startsWith('/contatti') ? 'page' : undefined} href="/contatti" onclick={() => {open = false}}>Contatti</a></li>
			</ul>
		</nav>
		<section in:fade={{duration: 200, delay: 200}} class="social" aria-label="Social media">
			<ul>
				<li>
					<a href="https://instagram.com/modenafilmfestival" target="_blank" rel="noopener" aria-label="Instagram">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
					</a>
				</li>
				<li>
					<a href="https://facebook.com/modenafilmfestival" target="_blank" rel="noopener" aria-label="Facebook">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg>
					</a>
				</li>
				<li>
					<a href="/tickets" class="tickets btn-m locked {shaking ? 'shaking' : ''}" onclick={(e) => {handleLockedclick(e)}}>Tickets</a>
				</li>
			</ul>
		</section>
	{/if}
</header>

<style>
/* Header */
header {
	@media screen and (max-width: 1080px) {
		background-color:  var(--white);
		position: fixed;
		top: 0;
		display: block;
		width: 100%;
		z-index: 6;
		height: var(--menuHeight);
		transition: var(--transition-xs);

		&.open {
			height: 100dvh;

			.main {
				.switch {
					.line {					
						&:nth-child(1) {
							top: 50%;
							transform: scaleX(0);
						}
						&:nth-child(2) {
							width: 80%;
							left: 10%;
							transform: rotate(25deg);
						}
						&:nth-child(3) {
							width: 80%;
							left: 10%;
							transform: scaleX(1) rotate(-25deg);
						}
						&:nth-child(4) {
							top: 50%;
							transform: scaleX(0);
						}
					}
				}
			}

			.social {
			}
		}

		.main {
			border-bottom: solid 1px var(--black);
			padding: var(--margin);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.logo {
				left: var(--margin);
				top: var(--margin);

				svg {
					transition: var(--transition-xs);
					height: clamp(30px, 8vw, 50px);
					width: auto;
				}
			}

			.switch {
				transition: var(--transition-xs);
				width: clamp(45px, 12vw, 80px);
				height: clamp(15px, 4vw, 25px);
				position: relative;

				.line {
					height: 2px;
					width: 100%;
					background-color: var(--black);
					position: absolute;
					left: 0;
					transition: var(--transition-xs);

					@media screen and (max-width: 600px) {
						height: 1.5px;
					}
					@media screen and (max-width: 400px) {
						height: 1px;
					}

					&:nth-child(1) {
						top: 0%;
					}
					&:nth-child(2) {
						top: 50%;
					}
					&:nth-child(3) {
						top: 50%;
						transform: scaleX(0);
					}
					&:nth-child(4) {
						top: 100%;
					}
				}
			}
		}

		.menu {
			position: absolute;
			width: 100%;
			height: stretch;
			line-height: 1.3;
			padding-bottom: var(--spacing-s);
			
			ul {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
			}
		}

		.social {
			width: 100%;
			position: absolute;
			bottom: 0;
			padding: var(--margin);

			ul {
				display: flex;
				align-items: center;
				gap: .5rem;
				
				li:nth-child(1),
				li:nth-child(2) {
					aspect-ratio: 1;
					height: 2.95rem;
				}

				li:nth-child(3) {
					width: 100%;
				}

				a {
					width: 100%;
					text-align: center;

					svg {
						width: 100%;
						height: 100%;
						transform: scale(1.15);
					}
				}
			}
		}
	}
}
svg {
	fill: var(--black);
}
a:hover:not(.logo) {
	color: var(--white);
}
a:hover:not(.logo) svg {
	fill: var(--white);
}
</style>