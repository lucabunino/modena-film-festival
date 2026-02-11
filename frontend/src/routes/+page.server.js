import { getLanding, getWidgetNewses } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const landing = await getLanding();
	const widgetNewses = await getWidgetNewses();
	if (landing, widgetNewses) {
		return {
			landing,
			widgetNewses
		};
	}
  throw error(404, 'Not found');
}