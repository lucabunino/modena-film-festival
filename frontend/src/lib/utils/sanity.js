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
			thumbnail
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
export async function getProgram() {
	return await client.fetch(
		`*[_type == "program" && status == 'public'] | order(edition desc) [0] {
			title,
            edition,
            days[] {
                date,
                events[]-> {
                    ...,
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
		}`
    );
}
export async function getContest() {
	return await client.fetch(
		`*[_type == "event" && status == "public" && "in-concorso" in formats[]->slug.current && !(_id in path('drafts.**'))] | order(start asc) {
            slug,
			homepageTitle,
			homepageSubtitle,
			homepageThumbnail
        }`
	);
}
export async function getEvent(slug) {
	return await client.fetch(
		`*[_type == "event" && slug.current == $slug] {
			...,
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
			}
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