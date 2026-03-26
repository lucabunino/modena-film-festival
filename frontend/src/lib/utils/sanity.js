import { dev } from '$app/environment';
import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: true, // `false` if you want to ensure fresh data
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
			}
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





// export async function getInfo() {
// 	return await client.fetch(
// 		`
// 		*[_type == "info" && !(_id in path('drafts.**'))][0] {
// 			...,
// 		}
// 		`
// 	);
// }
// export async function getPolicies() {
// 	return await client.fetch(
// 		`
// 		*[_type == "policy" && !(_id in path('drafts.**'))] {
// 			...,
// 		}
// 		`
// 	);
// }
// export async function getHomepage() {
// 	return await client.fetch(
// 		`*[_type == "homepage" && !(_id in path('drafts.**'))][0] {
// 			marquee,
// 			marqueeHref,
// 			marqueeExternal,
// 			images[] {
// 				cover {
// 					asset->{
// 						_ref, _id, _type, title, description, altText, metadata {dimensions, lqip}
// 					},
// 				},
// 				size,
// 				positionX,
// 				positionY,	
// 				project->{slug}
// 			}
// 		}`
// 	);
// }
// export async function getPortfolio() {
// 	return await client.fetch(
// 		`*[_type == "project" && status == "public" && !(_id in path('drafts.**'))] {
// 			title,
// 			subtitle,
// 			slug,
// 			date,
// 			client->{title},
// 			categories[]->{title, slug},
// 			cover {
// 				${media}
// 			},
// 		}|order(date desc)`
// 	);
// }
// export async function getPortfolioCategories() {
// 	return await client.fetch(
// 		`
// 		*[_type == "category" &&
// 			count(
// 				*[
// 					_type == "project" &&
// 					status == "public" &&
// 					references(^._id)
// 				]
// 			) > 0
// 		] | order(title asc) {
// 			title,
// 			slug
// 		}
// 		`
// 	);
// }
// export async function getProject(slug) {
// 	return await client.fetch(`
// 		*[_type == "project" && slug.current == $slug] {
// 			title,
// 			subtitle,
// 			date,
// 			opening {
// 				${media}
// 			},
// 			media[] {
// 				...,
// 				items[] {
// 					${media}
// 				}
// 			},
// 			categories->{
// 				title,
// 			},
// 			client->{
// 				title,
// 			},
// 			related[]->{
// 				title,
// 				slug,
// 				cover {
// 					${media}
// 				}
// 			},
// 			"seo": {
// 				"seoTitle": title,
// 				seoDescription,
// 				seoImage,
// 			}
// 		}`, { slug });
// }
// export async function getStudio() {
// 	return await client.fetch(
// 		`*[_type == "studio" && !(_id in path('drafts.**'))][0] {
// 			...,
// 			image {
// 				${media}
// 			},
// 			related[]->{
// 				title,
// 				slug,
// 				cover {
// 					${media}
// 				}
// 			}
// 		}`
// 	);
// }
// export async function getClients() {
// 	return await client.fetch(
// 		`*[_type == "client" && !(_id in path('drafts.**'))][0] {
// 			...,
// 		}`
// 	);
// }
// export async function getCategories() {
// 	return await client.fetch(
// 		`*[_type == "category" && !(_id in path('drafts.**'))][0] {
// 			title
// 		}`
// 	);
// }
// export async function getContact() {
// 	return await client.fetch(
// 		`*[_type == "contact" && !(_id in path('drafts.**'))][0] {
// 			...,
// 			services[]-> {
// 				title
// 			},
// 			clients[]-> {
// 				title
// 			}
// 		}`
// 	);
// }










// // export async function getProjects() {
// // 	return await client.fetch(
// // 		`
// // 		*[_type == "homepage" && !(_id in path('drafts.**'))][0].projects[] {
// // 			video {
// // 				mp4 {
// // 					asset-> {url}
// // 				},
// // 				cover {
// // 					asset {
// // 						_ref, _id, _type
// // 					},
// // 					"info": asset->{
// // 						title, description, altText, metadata {dimensions, lqip}
// // 					},
// // 				},
// // 			},
// // 			desktop {
// // 				asset {
// // 					_ref, _id, _type
// // 				},
// // 				"info": asset->{
// // 					title, description, altText, metadata {dimensions, lqip}
// // 				},
// // 			},
// // 			mobile {
// // 				asset {
// // 					_ref, _id, _type
// // 				},
// // 				"info": asset->{
// // 					title, description, altText, metadata {dimensions, lqip}
// // 				},
// // 			},
// // 			reference->{
// // 				_type,
// // 				title,
// // 				slug,
// // 				description,
// // 				media[] {
// // 				mp4 {
// // 					asset-> {url}
// // 				},
// // 				cover {
// // 					type,
// // 					image {
// // 						asset {
// // 							_ref, _id, _type
// // 						},
// // 						"info": asset->{
// // 							title, description, altText, metadata {dimensions, lqip}
// // 						},
// // 					}
// // 				},
// // 			},
// // 			},
// // 		}
// // 		`
// // 	);
// // }


// export async function getWorks() {
// 	return await client.fetch(
// 		`
// 		*[_type == "work" && !(_id in path('drafts.**')) && status == "public"]|order(orderRank) {
// 			...,
// 			media[] {
// 				mp4 {
// 					asset-> {url}
// 				},
// 				cover {
// 					asset {
// 						_ref, _id, _type
// 					},
// 					"info": asset->{
// 						title, description, altText, metadata {dimensions, lqip}
// 					},
// 				},
// 				asset {
// 					_ref, _id, _type
// 				},
// 				"info": asset->{
// 					title, description, altText, metadata {dimensions, lqip}
// 				},
// 			},
// 			tags[]->{title, slug, colour, orderRank}
// 		}
// 		`
// 	);
// }
// export async function getTags() {
// 	return await client.fetch(
// 		`
// 		*[_type == "work" && !(_id in path('drafts.**'))]|order(orderRank) {
// 			tags[]->{title, slug, colour, orderRank}
// 		}
// 		`
// 	);
// }
// export async function getWork(slug) {
// 	return await client.fetch(
// 		`
// 		*[_type == "work" && slug.current == $slug] {
// 			slug,
// 			title,
// 			description,
// 			media[] {
// 				mp4 {
// 					asset-> {url}
// 				},
// 				cover {
// 					asset {
// 						_ref, _id, _type
// 					},
// 					"info": asset->{
// 						title, description, altText, metadata {dimensions, lqip}
// 					},
// 				},
// 				asset {
// 					_ref, _id, _type
// 				},
// 				"info": asset->{
// 					title, description, altText, metadata {dimensions, lqip}
// 				},
// 			},
// 			tags[]->{title},
// 			orderRank,
// 			"prev": *[_type == "work" && orderRank < ^.orderRank] | order(orderRank desc)[0] { title, slug, media[] {type} },
//       "next": *[_type == "work" && orderRank > ^.orderRank] | order(orderRank asc)[0] { title, slug }
// 		}
// 		`, { slug });
// }
// export async function getWorkIndexes() {
// 	return await client.fetch(
// 		`
// 		*[_type == "work" && !(_id in path('drafts.**')) && status == "public"]|order(orderRank) {
// 			slug,
// 			media[] {
// 				_key,
// 			},
// 		}
// 		`
// 	);
// }
// export async function getThings() {
// 	return await client.fetch(
// 		`
// 		*[_type == "thing" && !(_id in path('drafts.**')) && status == "public"]|order(orderRank) {
// 			...,
// 			media[] {
// 				mp4 {
// 					asset-> {url}
// 				},
// 				cover {
// 					asset {
// 						_ref, _id, _type
// 					},
// 					"info": asset->{
// 						title, description, altText, metadata {dimensions, lqip}
// 					},
// 				},
// 				asset {
// 					_ref, _id, _type
// 				},
// 				"info": asset->{
// 					title, description, altText, metadata {dimensions, lqip}
// 				},
// 			},
// 			tags[]->{title}
// 		}
// 		`
// 	);
// }
// export async function getThing(slug) {
// 	return await client.fetch(
// 		`
// 		*[_type == "thing" && slug.current == $slug] {
// 			priceInfo,
// 			linkExternalUrl,
// 			externalUrl,
// 			showShipping,
// 			slug,
// 			title,
// 			description,
// 			media[] {
// 				mp4 {
// 					asset-> {url}
// 				},
// 				cover {
// 					asset {
// 						_ref, _id, _type
// 					},
// 					"info": asset->{
// 						title, description, altText, metadata {dimensions, lqip}
// 					},
// 				},
// 				asset {
// 					_ref, _id, _type
// 				},
// 				"info": asset->{
// 					title, description, altText, metadata {dimensions, lqip}
// 				},
				
// 			},
// 			tags[]->{title},
// 			moreInfo,
// 			orderRank,
// 			"prev": *[_type == "thing" && orderRank < ^.orderRank] | order(orderRank desc)[0] { title, slug, media[] {type} },
//       		"next": *[_type == "thing" && orderRank > ^.orderRank] | order(orderRank asc)[0] { title, slug }
// 		}
// 		`, { slug });
// }
// export async function getThingIndexes() {
// 	return await client.fetch(
// 		`
// 		*[_type == "thing" && !(_id in path('drafts.**')) && status == "public"]|order(orderRank) {
// 			slug,
// 			media[] {
// 				_key,
// 			},
// 		}
// 		`
// 	);
// }