/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		preload: ({ type }) => {
		// Preload font files, plus the default js/css
		return type === 'font' || type === 'js' || type === 'css';
		}
	});

  	return response;
}
