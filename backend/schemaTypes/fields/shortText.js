// Short rich text (paragraphs, bullets, bold/italic, links) for abstracts
export default function shortText({name = 'abstract', group = undefined} = {}) {
	return {
		name,
		group,
		type: 'array',
		of: [
			{
				type: 'block',
				styles: [
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
