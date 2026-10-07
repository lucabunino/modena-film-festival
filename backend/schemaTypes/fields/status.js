// Public/hidden switch. Hidden pages still exist and open by their address,
// but are kept out of search engines (noindex, not in the sitemap).
export default function status({name = 'status', group = undefined, description = undefined} = {}) {
	return {
		name,
		title: 'Status',
		type: 'string',
		group,
		description,
		options: {
			list: [
				{title: 'Public', value: 'public'},
				{title: 'Hidden', value: 'hidden'},
			],
			layout: 'radio',
			direction: 'horizontal',
		},
		initialValue: 'hidden',
	}
}
