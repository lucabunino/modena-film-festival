import { getContest, getProgram } from '$lib/utils/sanity';
import { resolveEditorial } from '$lib/server/editorial.js';
import { error } from '@sveltejs/kit';

export async function load() {
	const editorial = await resolveEditorial();
	if (!editorial) throw error(404, 'Not found');
	// Film in concorso and program each follow their own Editorial edition; none → that block is hidden
	const [contest, program] = await Promise.all([
		editorial.competition ? getContest(editorial.competition.slug) : [],
		editorial.program ? getProgram(editorial.program.slug) : null
	]);
	return {
		landing: editorial.landing,
		newsWidget: editorial.newsWidget ?? [],
		specialEvents: editorial.specialEvents ?? [],
		contest,
		program
	};
}
