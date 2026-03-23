import { getLanding, getWidgetNewses, getContest, getProgram } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const landing = await getLanding();
	const widgetNewses = await getWidgetNewses();
	const contest = await getContest()
	const program = await getProgram()
	if (landing, widgetNewses, contest) {
		return {
			landing,
			widgetNewses,
			contest,
			program
		};
	}
  throw error(404, 'Not found');
}