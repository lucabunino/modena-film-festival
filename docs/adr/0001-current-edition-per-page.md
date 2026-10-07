# Current edition is chosen per page, by hand

The next Edition never goes live all at once: its Regolamento and open call come out months before its Program. So there is no single "current edition" (and it is not "the latest year"): the Editorial singleton holds one Edition pointer per top-level page (Festival, Programma, Luoghi, Partner, Regolamento), switched by hand one at a time, next to the home's other editorial choices. A pointer may be empty: the page then shows a placeholder (noindex) and the home hides what depends on it.

## Considered Options

- **Latest public edition** — rejected: all-or-nothing, an unfinished Program would go live with the Regolamento.
- **Per-tab publish toggles on the Edition** (top-level page shows the newest Edition whose tab is public) — rejected in favour of one place that holds every editorial switch for the live site.

## Consequences

Edition visibility (`status` per tab) only controls indexing of the `/<slug>/…` archive pages; it does not decide what the top-level pages show. A pointer can target an Edition whose archive tab is hidden.
