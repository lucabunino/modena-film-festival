<script>
    import { page } from "$app/state";
	let shaking = $state(false);
	function handleLockedclick(e) {
		e.preventDefault()
		if (shaking) return;
		shaking = true;
		setTimeout(() => (shaking = false), 600);
	}
</script>
<aside class="desktop-only">
	<header>
		<a href="/" class="logo" aria-label="Modena Film Festival">
			<svg width="67" height="47" viewBox="0 0 67 47" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#a)">
					<path d="M23.395 46.998H0V0h23.395v46.998Zm43.605 0h-4.075V0H67v46.998ZM54.301.002l-5.428 46.986L39.38.003H23.395L32.888 47h24.61L62.925.002H54.3Z"/>
				</g>
			</svg>
			<h1 class="wb-28 leading-1">Modena Film <br>Festival</h1>
		</a>
		<a href="/biglietti" class="tickets btn-m locked {shaking ? 'shaking' : ''}" onclick={(e) => {handleLockedclick(e)}}>Biglietti</a>
		<nav class="menu wb-28 leading-1_3" aria-label="Main navigation" menubar aria-orientation="vertical">
			<ul>
				<li><a aria-current={page.url.pathname.startsWith('/festival') ? 'page' : undefined} href="/festival">Festival</a></li>
				<li><a aria-current={page.url.pathname.startsWith('/about') ? 'page' : undefined} href="/about">About</a></li>
				<li><a aria-current={page.url.pathname.startsWith('/partner') ? 'page' : undefined} href="/partner">Partner</a></li>
				<li><a aria-current={page.url.pathname.startsWith('/sostienici') ? 'page' : undefined} href="/sostienici">Sostienici</a></li>
				<li><a aria-current={page.url.pathname.startsWith('/contatti') ? 'page' : undefined} href="/contatti">Contatti</a></li>
			</ul>
		</nav>
	</header>
	<section class="meta">
		<section class="social wb-18" aria-label="Social media">
			<ul class="leading-1">
			<li>
				<a href="https://instagram.com/modenafilmfestival" target="_blank" rel="noopener" aria-label="Instagram">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg> Instagram
				</a>
			</li>
			<li>
				<a href="https://facebook.com/modenafilmfestival" target="_blank" rel="noopener" aria-label="Facebook">
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg> Facebook
				</a>
			</li>
			</ul>
		</section>
		<footer>
			<p>© {new Date().getFullYear()}<br>
			Modena Film Festival<br>
			All rights reserved<br>
			P.IVA 13457550963
			</p>
		</footer>
	</section>
</aside>

<style>
aside {
	position: fixed;
	left: 0;
	top: 0;
	width: var(--sidebarWidth);
	height: 100vh;
	background-color: var(--brown);
	padding: var(--margin) var(--gutter);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 4rem;
	overflow: scroll;

	header {
		h1 {
			margin-top: 1rem;
		}
		.tickets {
			margin-top: 1rem;
		}
		.menu {
			margin-top: 4rem;
			[aria-current] {
				color: var(--white);
			}
		}
	}
}
.meta {
	display: flex;
	flex-direction: column;
	gap: 2rem;

	.social {
		ul {
			display: flex;
			flex-direction: column;
			gap: .3em;
		}
		a {
			display: flex;
			gap: .3em;
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