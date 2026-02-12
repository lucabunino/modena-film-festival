import { getNews } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({params}) {
	const news = await getNews(params.slug);
	if (news) {
		return {
			news,
			seoSingle: news[0].seo,
			hidden: news[0].seo?.status == 'hidden'
		};
	}
  throw error(404, 'Not found');
}