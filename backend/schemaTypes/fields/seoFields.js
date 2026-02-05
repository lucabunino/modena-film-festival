export default function seoFields() {
	return [
		{
			name: 'SEODescription',
			description: 'Optional. To be used as preview text of the page',
			type: 'text',
			rows: 5,
			group: 'SEO',
		},
		{
			name: 'SEOImage',
			description: 'Optional. To be used as preview image of the page. Suggested dimension is 1200x630px',
			type: 'image',
			group: 'SEO',
		}
	]
}