// Long rich text of an event or a movie (event page body)
export default function eventBody({name = 'body', group = undefined} = {}) {
	return {
		name,
		group,
		type: 'array',
		of: [
			{
				type: 'block',
				styles: [
					{ value: 'h2', title: 'H2' },
					{ value: 'h3', title: 'H3' },
					{ value: 'h4', title: 'H4' },
					{ value: 'normal', title: 'Normal' },
				],
				lists: [
					{title: 'Bullet', value: 'bullet'}
				],
				marks: {
					decorators: [
						{title: 'Bold', value: 'strong'},
						{title: 'Italic', value: 'em'},
					],
					annotations: [
						{
							name: 'link',
							type: 'object',
							fields: [
								{
									name: 'href',
									type: 'string',
									validation: Rule =>
									Rule.custom(href => {
										if (!href) return true;
										return /^(https?:\/\/|mailto:|tel:)/.test(href)
										? true
										: 'Must be a valid URL, mailto:, or tel: link';
									}),
								},
								{
									title: 'Open in new tab',
									name: 'blank',
									type: 'boolean',
								},
							],
						},
					],
				},
			},
		],
	}
}
