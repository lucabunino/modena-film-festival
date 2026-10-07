import { getAbout } from '$lib/utils/sanity';

export async function load() {
	const about = await getAbout();
	return {
		team: about?.team ?? [],
		seoSingle: {
			seoTitle: "About",
		}
	};
}
