# Context

Modena Film Festival website — SvelteKit frontend + Sanity v3 backend, aligned to the conventions of studio-obelo / all-visibile-objects (see `/Users/lucabunino/Sites/_patterns/`).

## Glossary

### Edition
One yearly instance of the festival (2026 = the first). Identified by its four-digit year. Has a title chosen by hand (e.g. MFF2026), which may change; its year does not. Addressed by its year: /2026, /2026/programma (no "archive" prefix).
Everything that changes year by year (its Festival texts, Program, Jury, Regolamento, Luoghi, Partners) belongs to its Edition.
_Avoid_: MFF26 (short-year form), year, season

### Program
The day-by-day schedule of one Edition: its days and the events on each. Part of an Edition, not a thing of its own.
_Avoid_: calendar, schedule

### Jury
Whoever decides one prize in one Edition (e.g. the jury of the Premio della Giuria, the university students of the Premio degli Studenti Universitari). An Edition has several. A Jury may have no named members when the prize is decided by the audience (Premio del Pubblico). A person's role in a Jury (e.g. president) belongs to that Edition only; the same person may sit on Juries in other Editions. Shown in Italian as **Giuria**.
_Avoid_: judges, panel

### Winner
A prize actually won in one Edition: the Movie, the prize, and the Jury that chose it (a special mention may have no Jury). One Movie can be a Winner more than once. Winners are the results, Juries are who decides them. Shown in Italian as **Vincitori**.
_Avoid_: award, result, risultati

### Movie
A film as a work (title, director, country, year, duration, language), independent of when it is shown. Events screen Movies; an Edition's Competition and its Winners name Movies. The same Movie can be screened in several events or Editions.
_Avoid_: film (as the entity name), event (a screening is an event, the work is a Movie)

### Competition
The Movies in competition in one Edition ("Film in concorso"), in order. Each links to the event screening it in that Edition's Program.
_Avoid_: contest, concorso (in code and docs)

### Special event
One of the five events an Edition puts forward, one per sense, shown as cards in the home's Il Festival block. A Special event not yet announced is a hidden event: it still has its own coming-soon image and shows as a locked card.
_Avoid_: section (the old name for these cards)

### Location
A place where the festival happens (a cinema, a courtyard, an acetaia). The same Location is shared by events and by every Edition that uses it. What is true only for one year (opening hours, services offered there) belongs to that Edition's Luoghi, not to the Location. Shown in Italian as **Luoghi**.
_Avoid_: venue, place

### Organization
Any company, institution or body the festival deals with (Comune di Modena, a sponsor, a distributor). Exists once, independent of any Edition; it can appear as a Partner in several Editions and, later, elsewhere (e.g. on events).
_Avoid_: company, brand, sponsor (as the name of the thing itself)

### Partner
An Organization in the role of supporting one Edition, listed under a partner group of that Edition (e.g. "Con il patrocinio di", "Sponsor"). Being a Partner is per Edition; the Organization is not.
_Avoid_: sponsor (as a synonym — "Sponsor" is one partner group)

### Current edition
The Edition the [[Editorial]] assigns to a top-level page (Festival, Programma, Luoghi, Partner, Regolamento). Not one edition for the whole site: each page is pointed at an Edition by hand, so the next year can go live page by page (e.g. the new Regolamento in January while Programma still shows last year). A page may have no Current edition for a while. The top-level pages are not tied to a specific year in their address.
_Avoid_: latest edition (it is a choice, not the newest year)

### Editorial
The single set of editorial choices for the live site: what the home shows (which [[Landing]], which News are highlighted, whose Special events) and which Edition each top-level page shows. Changing it changes the site; the content itself lives in Editions, Landings and News. Each site version (live, stage, local development) has its own Editorial, like its own Menu, so choices can be tried on stage first.
_Avoid_: settings, homepage, current edition (as the name of this)

### Landing
The hero at the top of the home page. Several Landings are kept side by side; the [[Editorial]] chooses which one the home shows.
_Avoid_: hero, homepage (as names for this)

### Prefooter
The promotional band just before the footer (e.g. "Diventa sponsor", "Abbonati al Festival"), with a call to action. Each Prefooter lists, by address, the pages that show it; a page shows at most one.
_Avoid_: banner (the cookie banner is something else), CTA block

### Archive
The per-Edition collector: a landing page for one Edition (intro, films in competition, its program) plus that Edition's own Festival, Programma, Luoghi, Partner and Regolamento subpages. Every Edition has its archive pages, the current one included; while an Edition is still current, its archive and the top-level pages show the same content. An archive appears in the Menu only when added there by hand.

### Hidden
A page that exists and opens by its address, but is kept out of search engines (not indexed, not in the sitemap). Each archive subpage of an Edition is hidden or public on its own (e.g. MFF2027's Programma hidden while its Regolamento is public).
_Avoid_: unpublished, draft (the page is live, just not indexed)
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
