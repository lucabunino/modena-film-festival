# Context

Modena Film Festival website — SvelteKit frontend + Sanity v3 backend, aligned to the conventions of studio-obelo / all-visibile-objects (see `/Users/lucabunino/Sites/_patterns/`).

## Glossary

### Edition
One yearly instance of the festival (2026 = the first). Identified by its four-digit year. Named **MFF** + year everywhere: displayed as MFF2026, addressed in lowercase as /mff2026, /mff2026/programma (no "archive" prefix).
_Avoid_: MFF26 (short-year form) A Program belongs to exactly one Edition.
_Avoid_: year, season

### Current edition
The latest public Edition. The top-level pages (Festival, Programma, Luoghi) always show it; they are not tied to a specific year.

### Archive
The per-Edition collector: a landing page for one Edition (intro, films in competition, its program) plus that Edition's own Festival, Programma and Luoghi subpages. An Edition's archive persists after the next Edition becomes current; while an Edition is still current, its archive and the top-level pages show the same content.
_Avoid_: past editions, history

### Margin
The site's primary layout spacing: page-edge padding, the column gap of the page grid, and the separation between major blocks. Responsive — it shrinks on mobile. Named on the spacing scale, not a free value.
_Avoid_: padding, spacing (as names for this unit)

### Gutter
The smaller, fixed **horizontal** spacing between related elements inside a block (columns of a grid, side insets, inline groups). Same size on every screen — it does not shrink on mobile like [[Margin]]. Vertical spacing never uses the Gutter; it uses plain [[Spacing scale]] steps.
_Avoid_: gap (as a name for this unit)

### Menu
The site navigation, one list edited in the CMS and shown identically in the desktop sidebar and the mobile menu. Each entry is a Menu item.

### Menu item
A label, a destination, and a **level**. Level 1 is a top-level entry; an item with a higher level than the one before it is a subpage of that preceding item, shown indented and smaller beneath it. There is no separate "secondary" list — everything is a Menu item at some level. Subpages are only visible while the visitor is on their parent or on one of those subpages; elsewhere the parent appears alone.
_Avoid_: secondary menu, submenu list (as separate concepts)

### Sidebar
The desktop navigation panel on the left. It **collapses** (slides out to the left, leaving only a narrow strip of itself visible — the festival name and logo scrolling through it — while the page content widens into the freed space) and **expands** only through the collapse icon in its top-right corner. While open the icon shows only when the pointer is over the sidebar; while collapsed it stays visible in the strip. Scrolling never changes it. The logo inside the sidebar links home. Mobile has no sidebar; it uses the Menu overlay instead.
_Avoid_: header, drawer

### Newsletter signup
A single site-wide signup dialog (not a page). Opened from the Newsletter button next to the socials in the Menu, and from the "Iscriviti" button in the footer — both open the same dialog.
_Avoid_: newsletter page, newsletter form (as something embedded inline)

### Media reveal
Every photo or video on the site appears with a fade once it has loaded and entered the viewport — never pops in. CMS-managed images additionally show a blurred preview of themselves until then; static (non-CMS) photos and videos show the same blurred preview only when one is provided alongside them, otherwise just the fade. Logos and icons are not media and never reveal.
_Avoid_: lazy image

### Spacing scale
The single numbered scale every spacing value comes from; one step is a fixed fraction of the root font size, so spacing scales with the fluid root type. [[Margin]] and [[Gutter]] are named aliases onto this scale — the only two named aliases. No other named spacing sizes (the old xs…xl sizes are retired in favour of plain scale steps).
