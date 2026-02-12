import { EarthGlobeIcon } from "@sanity/icons";

export default {
  name: 'seo',
  title: 'SEO',
  type: 'document',
  icon: EarthGlobeIcon,
  fieldsets: [

  ],
  fields: [
    {
      name: 'seoTitle',
	  title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
	  title: 'SEO Description',
      type: 'text',
      rows: 5,
    },
    {
      name: 'seoImage',
	  title: 'SEO Image',
	  description: 'Optional. To be used as preview image of the page on social media and share links. Suggested dimension is 1200x630px',
      type: 'image',
	  description: 'Reccomended size: 1200×630'
    },
  ],
}