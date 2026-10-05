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

export async function getLanding() {
	return await client.fetch(
		`*[_type == "landing" && status == "public" && !(_id in path('drafts.**'))][0] {
			...,
			"cta": {
				"label": ctaLabel,
				"href": ctaHref,
				"blank": ctaBlank,
			},
		}`
	);
}
export async function getWidgetNewses() {
    return await client.fetch(
        `*[_type == "news" && status == 'public' && widget == true] | order(date desc) {
            title,
            subtitle,
            slug,
            widgetAbstract,
            "widgetCta": {
                "label": widgetCtaLabel,
                "href": widgetCtaHref,
                "blank": widgetCtaBlank,
            },
        }`
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
// edition omitted → current (latest public) edition
export async function getProgram(edition) {
	return await client.fetch(
		`*[_type == "program" && status == 'public' && (!defined($edition) || edition == $edition)] | order(edition desc) [0] {
			title,
            edition,
			intro,
            days[] {
                date,
                events[]-> {
                    ...,
					thumbnail{ ${image} },
					location->{ title, slug },
					formats[]-> { title, slug },
					sense->{ title },
                }
            },
			"formats": *[_type == "format" && count(*[_type == "program" && status == 'public' && ^._id in days[].events[]->formats[]._ref]) > 0] {
				title,
				slug
			},
			webticHref,
			soldOut
		}`, { edition: edition ?? null }
    );
}
export async function getEditions() {
	return await client.fetch(
		`*[_type == "program" && status == 'public' && !(_id in path('drafts.**'))] | order(edition desc).edition`
	);
}
// edition given → only that edition's films (events referenced by its program)
export async function getContest(edition) {
	return await client.fetch(
		`*[_type == "event" && status == "public" && "in-concorso" in formats[]->slug.current && !(_id in path('drafts.**'))
			&& (!defined($edition) || _id in *[_type == "program" && edition == $edition][0].days[].events[]._ref)] | order(start asc) {
            slug,
			homepageTitle,
			homepageSubtitle,
			homepageThumbnail{ ${image} }
        }`, { edition: edition ?? null }
	);
}
export async function getEvent(slug) {
	return await client.fetch(
		`*[_type == "event" && slug.current == $slug] {
			...,
			thumbnail{ ${image} },
			location->{
				title,
				subtitle,
				adressLabel,
				adressHref
			},
			formats[]-> { title, slug },
			sense->{ title },
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
			// latest public edition whose program lists this event
			"edition": *[_type == "program" && status == 'public' && ^._id in days[].events[]._ref] | order(edition desc)[0].edition
		}`, { slug });
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
			cta { label, href, openInNewTab }
		}`, { name }
	);
}

// every event listed in a public program, with its edition and status (for the sitemap)
export async function getProgramEvents() {
	return await client.fetch(
		`*[_type == "program" && status == 'public' && !(_id in path('drafts.**'))] | order(edition desc) {
			edition,
			"events": days[].events[]->{ "slug": slug.current, status, _updatedAt }
		}`
	);
}
