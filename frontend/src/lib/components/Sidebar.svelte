<script>
	import { slide } from "svelte/transition";
    import { page } from "$app/state";
	import SocialRow from "$lib/components/SocialRow.svelte";
	import Marquee from "svelte-fast-marquee";
	import { buildMenu, isCurrent } from "$lib/utils/menu.js";
	let { menu } = $props();
	const groups = $derived(buildMenu(menu?.items, page.url.pathname));
	function current(href) {
		return page.url.pathname === href ? "page" : isCurrent(href, page.url.pathname) ? "true" : undefined;
	}

	// Opened and closed only by the icon in its top-right corner; collapsed, a strip stays visible to reopen it
	let collapsed = $state(false)
	function toggle(e) {
		e.stopPropagation() // don't let the strip click below reopen it right away
		collapsed = !collapsed
	}
	// collapsed: a click anywhere on the strip reopens it (the icon stays the keyboard route)
	function reopen() {
		if (collapsed) collapsed = false
	}
	// --sidebarWidth (and so the content offset) is driven from <html>
	$effect(() => {
		document.documentElement.classList.toggle("sidebar-collapsed", collapsed)
		return () => document.documentElement.classList.remove("sidebar-collapsed")
	})
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<aside class="desktop-only {collapsed ? 'collapsed' : ''}" onclick={reopen}>
	<button type="button" class="collapse" aria-label={collapsed ? "Apri il menu" : "Chiudi il menu"} aria-expanded={!collapsed} onclick={toggle}>
		<svg width="18" height="13" viewBox="0 0 18 13" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path d="M2.92823 6.408L9.33623 -3.40949e-07L12.9122 -1.84637e-07L7.53623 5.136L17.1362 5.136L17.1362 7.68L7.53623 7.68L12.9362 12.84L9.36023 12.84L2.92823 6.408ZM0.000228882 -7.49038e-07L2.08823 -6.57769e-07L2.08823 12.84L0.000228321 12.84L0.000228882 -7.49038e-07Z"/>
		</svg>
	</button>
	<!-- collapsed strip: horizontal marquee (patterns/marquee/simple) rotated -90deg into the strip -->
	<div class="marquee" aria-hidden="true">
		<div class="rotator">
			<Marquee speed={15} gap="var(--sp-24)" autoFill={true}>
				<span class="item wb-24">
					Modena Film Festival
					<svg viewBox="0 0 67 47" xmlns="http://www.w3.org/2000/svg"><path d="M23.395 46.998H0V0h23.395v46.998Zm43.605 0h-4.075V0H67v46.998ZM54.301.002l-5.428 46.986L39.38.003H23.395L32.888 47h24.61L62.925.002H54.3Z"/></svg>
				</span>
			</Marquee>
		</div>
	</div>
	<header inert={collapsed}>
		<a href="/" class="logo" aria-label="Modena Film Festival">
			<svg width="67" height="47" viewBox="0 0 67 47" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#a)">
					<path d="M23.395 46.998H0V0h23.395v46.998Zm43.605 0h-4.075V0H67v46.998ZM54.301.002l-5.428 46.986L39.38.003H23.395L32.888 47h24.61L62.925.002H54.3Z"/>
				</g>
			</svg>
			<h1 class="wb-24 leading-1">Modena <br>Film Festival</h1>
		</a>
		{#if menu?.cta?.href}
			<a href={menu.cta.href} class="tickets btn-m" target={menu.cta.openInNewTab ? "_blank" : undefined} rel={menu.cta.openInNewTab ? "noopener noreferrer" : undefined}>{menu.cta.label}</a>
		{/if}
		<nav class="menu wb-24 leading-1_3" aria-label="Main navigation">
			<ul>
				{#each groups as item (item._key)}
					<li>
						<a aria-current={current(item.href) ?? (item.open ? "true" : undefined)} href={item.href} target={item.openInNewTab ? "_blank" : undefined} rel={item.openInNewTab ? "noopener noreferrer" : undefined}>{item.label}</a>
						{#if item.open && item.children.length}
							<ul class="children wb-18" transition:slide={{ duration: 300 }}>
								{#each item.children as child (child._key)}
									<li><a aria-current={current(child.href)} href={child.href} target={child.openInNewTab ? "_blank" : undefined} rel={child.openInNewTab ? "noopener noreferrer" : undefined}>{child.label}</a></li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</header>
	<section class="meta wb-14" inert={collapsed}>
		<SocialRow socials={menu?.socials} showNewsletter={menu?.showNewsletter} />
		<footer>
			<p>© {new Date().getFullYear()}<br>
			Modena Film Festival<br>
			All rights reserved</p>
		</footer>
	</section>
</aside>

<style lang="scss">
aside {
	position: fixed;
	z-index: 5;
	top: 0;
	left: 0;
	width: var(--sp-222);
	height: 100vh;
	// slides in lockstep with the content (same timing as main/footer margins): offset = how much of --sidebarWidth is gone
	transform: translateX(calc(var(--sidebarWidth) - var(--sp-222)));
	transition: transform var(--transition-s);
	padding: var(--margin) var(--gutter);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: var(--sp-36);
	overflow: scroll;
	user-select: none;
	background-color: var(--brown);

	// toggle top-aligned with the logo, --gutter from the right edge: on hover while open, always while collapsed
	.collapse {
		position: absolute;
		top: var(--margin);
		right: var(--gutter);
		z-index: 2; // above the marquee and its fade
		opacity: 0;

		svg {
			display: block;
		}
	}
	&:hover .collapse,
	&.collapsed .collapse,
	.collapse:focus-visible {
		opacity: 1;
	}
	.collapse:hover svg {
		fill: var(--white);
	}

	// collapsed strip: full-height marquee; a brown-to-transparent fade keeps the toggle area clear
	.marquee {
		position: absolute;
		inset: 0 0 0 auto;
		width: var(--sp-36);
		overflow: hidden;
		background-color: var(--brown);
		display: none;

		&::before {
			content: "";
			position: absolute;
			z-index: 1;
			inset: 0 0 auto;
			height: calc(var(--margin) * 2 + 13px + var(--sp-48));
			background: linear-gradient(var(--brown) 50%, transparent);
		}
		// pivot at the bottom-left corner: width becomes the strip height, reading bottom to top
		// the library box is overflow-x: hidden, so the wheel would scroll it sideways (rotated); ignore the pointer
		// (clicks land on .marquee and still reopen the sidebar)
		.rotator {
			pointer-events: none;
			position: absolute;
			left: 0;
			top: 100%;
			width: 100vh;
			height: var(--sp-36);
			display: flex;
			align-items: center;
			transform-origin: top left;
			rotate: -90deg;
		}
		.item {
			display: flex;
			align-items: center;
			gap: var(--sp-24);
			white-space: nowrap;

			svg {
				width: auto;
				height: .9em;
			}
		}
	}
	&.collapsed {
		cursor: pointer;
		overflow: hidden; // nothing to scroll in the strip

		.collapse svg {
			rotate: 180deg; // arrow points right: "open"
		}
		.marquee {
			display: block;
		}
	}

	header {
		h1 {
			margin-top: var(--sp-12);
		}
		.tickets {
			margin-top: var(--sp-12);
		}
		.menu {
			margin-top: var(--sp-36);
		}
		.children {
			padding-left: var(--sp-24);
			margin: var(--sp-2) 0 var(--sp-8);
		}
		[aria-current] {
			color: var(--white);
		}
	}
	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--sp-12);
	}
	svg {
		fill: var(--black);
	}
	a:hover:not(.logo) {
		color: var(--white);

		svg {
			fill: var(--white);
		}
	}
}
</style>
