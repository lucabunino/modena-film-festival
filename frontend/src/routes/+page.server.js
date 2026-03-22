import { getLanding, getWidgetNewses, getContest } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const landing = await getLanding();
	const widgetNewses = await getWidgetNewses();
	const contest = await getContest()
	if (landing, widgetNewses, contest) {
		return {
			landing,
			widgetNewses,
			contest
		};
	}
  throw error(404, 'Not found');
}