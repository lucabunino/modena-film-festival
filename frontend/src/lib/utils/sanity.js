import { dev } from '$app/environment';
import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: !dev, // `false` if you want to ensure fresh data
	apiVersion: '2026-01-29', // date of setup
});

const image = `..., asset->{_id, url, altText, metadata{dimensions, lqip, palette}}`

const landing = `...,
	"cta": {
		"label": ctaLabel,
		"href": ctaHref,
		"blank": ctaBlank,
	}`

// an edition as referenced from elsewhere: enough to link to it and know which pages are public
// slug: the archive address (/2026/festival)
const editionRef = `year, title, "slug": slug.current, status, festivalStatus, programStatus, rulesStatus, locationsStatus, partnersStatus, winnersStatus`

const published = `!(_id in path('drafts.**'))`

const prefooterFields = `_id, subtitle, title, content, cta, annotation, color, mediaType,
	image{ ${image} }, video{ asset->{ url } }, poster{ ${image} }`

// an event shows its own thumbnail, credits and body when it has no movie or its customContent is on;
// otherwise (or when its own is empty) the movie's
const ownContent = `(!defined(movie) || customContent == true)`
const eventThumbnail = `select(defined(thumbnail.asset) && ${ownContent} => thumbnail, movie->thumbnail){ ${image} }`

const widgetNews = `title,
	subtitle,
	slug,
	widgetAbstract,
	"widgetCta": {
		"label": widgetCtaLabel,
		"href": widgetCtaHref,
		"blank": widgetCtaBlank,
	}`

/**
 * The Editorial: what the home shows (Landing, highlighted News, special events)
 * and the Edition each top-level page shows (docs/adr/0001). Any reference may be empty.
 * One per site, by name (main / stage / dev), like the Menu: pick it with resolveEditorial() in lib/server/editorial.js.
 */
export async function getEditorial(name = 'main') {
	return await client.fetch(
		`*[_type == "editorial" && coalesce(name, "main") == $name && ${published}][0] {
			landing->{ ${landing} },
			newsWidget[]->{ ${widgetNews} },
			competition->{ ${editionRef} },
			"specialEvents": specialEvents->specialEvents[]->{
				_id,
				title,
				"slug": slug.current,
				status,
				"sense": sense->title,
				"image": ${eventThumbnail}
			},
			festival->{ ${editionRef} },
			program->{ ${editionRef} },
			rules->{ ${editionRef} },
			locations->{ ${editionRef} },
			partners->{ ${editionRef} },
			winners->{ ${editionRef} },
			// which prefooter each page shows on this site (matched against the page's path in the root layout)
			prefooters[defined(prefooter)] {
				paths,
				...prefooter->{ ${prefooterFields} }
			},
		}`, { name }
	);
}
export async function getNewses() {
	return await client.fetch(
		`*[_type == "news" && status == 'public'] | order(date desc) {
			slug,
			title,
			subtitle,
			abstract,
			date,
			thumbnail{ ${image} }
		}`
    );
}
export async function getNews(slug) {
	return await client.fetch(
		`*[_type == "news" && slug.current == $slug] {
			...,
			cover{ ${image} },
			"cta": {
				"label": ctaLabel,
				"href": ctaHref,
				"blank": ctaBlank,
			},
			"seo": {
				"seoTitle": title,
				seoDescription,
				seoImage,
			}
		}`, { slug });
}
// one edition's day-by-day program, by its slug
export async function getProgram(slug) {
	return await client.fetch(
		`*[_type == "edition" && slug.current == $slug && ${published}][0] {
			${editionRef},
			intro,
            days[] {
                date,
                events[]-> {
                    ...,
					"thumbnail": ${eventThumbnail},
					// prizes this edition gave to the film the event screens (chips in the program)
					"awards": *[_type == "edition" && slug.current == $slug][0].winners[movie._ref == ^.movie._ref]{ _key, title, color },
					location->{ title, slug },
					formats[]-> { title, slug },
					sense->{ title },
                }
            },
			"formats": *[_type == "format" && _id in ^.days[].events[]->formats[]._ref] {
				title,
				slug
			},
		}`, { slug }
    );
}
// every edition, newest first (archive routing, sitemap)
export async function getEditions() {
	return await client.fetch(
		`*[_type == "edition" && defined(slug.current) && ${published}] | order(year desc) { ${editionRef} }`
	);
}
// one edition's archive landing: intro, and which subpages have content
export async function getEditionHome(slug) {
	return await client.fetch(
		`*[_type == "edition" && slug.current == $slug && ${published}][0] {
			${editionRef},
			intro,
			"has": {
				"festival": length(pt::text(festivalEvent)) > 0 || count(juries) > 0 || count(jurors) > 0,
				"program": count(days) > 0,
				"locations": count(locations) > 0,
				"partners": count(partnerGroups) > 0,
				"winners": count(winners) > 0
			}
		}`, { slug }
	);
}
// one edition's archive content (everything but the program), by its slug
export async function getEdition(slug) {
	return await client.fetch(
		`*[_type == "edition" && slug.current == $slug && ${published}][0] {
			${editionRef},
			intro,
			festivalEvent,
			rulesTeaser,
			juriesIntro,
			juries[] { _key, ...@->{ title, description } },
			jurors[] {
				_key,
				role,
				person->{ name, surname, country, bio, portrait{ ${image} } }
			},
			winners[] {
				_key,
				title,
				color,
				jury->{ title, description },
				prize{ ${image} },
				movie->{ ${movieCard} }
			},
			rules[] { _key, title, body },
			locations[] {
				_key,
				"title": coalesce(title, location->title),
				"adressLabel": coalesce(adressLabel, location->adressLabel),
				"adressHref": location->adressHref,
				"position": location->position,
				info
			},
			partnerGroups[] {
				_key,
				title,
				"menuTitle": coalesce(menuTitle, title),
				"slug": slug.current,
				partners[] {
					_key,
					role,
					"title": organization->title,
					"href": organization->href,
					"logo": organization->logo{ ${image} }
				}
			}
		}`, { slug }
	);
}
// a movie as shown in a list, with the event screening it in the program of the edition $slug
const movieCard = `_id, title, director, thumbnail{ ${image} }, poster{ ${image} },
	"event": *[_type == "event" && references(^._id) && _id in *[_type == "edition" && slug.current == $slug][0].days[].events[]._ref][0]{ "slug": slug.current }`

// one edition's films in competition, in order
export async function getContest(slug) {
	return await client.fetch(
		`*[_type == "edition" && slug.current == $slug && ${published}][0].competition[]->{ ${movieCard} }`, { slug }
	);
}
// a movie's credits, as typed on events before movies existed:
// "di Alice Douard, Francia, 2025, 97’\nV.O. francese sottotitolata in italiano" (or "Versione in …", "Cinema muto")
const movieCredits = `array::join(array::compact([
	array::join(array::compact([
		"di " + director,
		select(count(countries) > 0 => array::join(countries[]->title, ", ")),
		string(year),
		string(duration) + "’"
	]), ", "),
	select(
		version == "silent" => "Cinema muto",
		count(languages) > 0 => select(version == "translated" => "Versione in ", "V.O. ")
			+ array::join(languages[]->title, ", ")
			+ select(defined(subtitles) => " sottotitolata in " + subtitles->title, "")
	)
]), "\n")`
// the film title as a small title (H4) on top of a movie body shown on an event page
const movieTitleBlock = `{
	"_type": "block", "_key": "movie-title", "style": "h4", "markDefs": [],
	"children": [{ "_type": "span", "_key": "movie-title-text", "text": movie->title, "marks": [] }]
}`

export async function getEvent(slug) {
	return await client.fetch(
		`*[_type == "event" && slug.current == $slug] {
			...,
			"thumbnail": ${eventThumbnail},
			location->{
				title,
				subtitle,
				adressLabel,
				adressHref
			},
			formats[]-> { title, slug },
			sense->{ title },
			// own credits and body (see ownContent); empty ones (a cleared rich text keeps an empty block,
			// hence pt::text) fall back to the film it screens, its body headed by the film title as an H4
			"credits": select(
				length(credits) > 0 && ${ownContent} => credits,
				defined(movie) => movie->{ "credits": ${movieCredits} }.credits
			),
			"body": select(
				length(pt::text(body)) > 0 && ${ownContent} => body,
				length(pt::text(movie->body)) > 0 => [${movieTitleBlock}] + movie->body
			),
			"cta": {
				"label": ctaLabel,
				"href": ctaHref,
				"blank": ctaBlank,
			},
			"seo": {
				"seoTitle": title,
				seoDescription,
				seoImage,
			},
			// latest edition whose program lists this event
			"edition": *[_type == "edition" && ${published} && ^._id in days[].events[]._ref] | order(year desc)[0] { ${editionRef} }
		}`, { slug });
}
// the About singleton: Organigramma (team members with their role)
export async function getAbout() {
	return await client.fetch(
		`*[_id == "about"][0] {
			team[] {
				_key,
				role,
				person->{ name, surname, portrait{ ${image} } }
			}
		}`
	);
}
export async function getSeo() {
	return await client.fetch(
		`*[_type == "seo" && !(_id in path('drafts.**'))][0] {
			seoTitle,
			seoDescription,
			seoImage,
		}`
	);
}
// `name`: "main" | "stage"; a menu saved before names existed counts as "main"
export async function getMenu(name = 'main') {
	return await client.fetch(
		`*[_type == "menu" && !(_id in path('drafts.**')) && coalesce(name, "main") == $name][0] {
			items[] { _key, label, href, openInNewTab, level },
			socials[] { _key, label, href, openInNewTab },
			showNewsletter,
			showCta,
			cta { label, href, openInNewTab }
		}`, { name }
	);
}

// every event listed in an edition's program, with the edition and the event status (for the sitemap)
export async function getProgramEvents() {
	return await client.fetch(
		`*[_type == "edition" && defined(slug.current) && ${published}] | order(year desc) {
			"slug": slug.current,
			programStatus,
			"events": days[].events[]->{ "slug": slug.current, status, _updatedAt }
		}`
	);
}
