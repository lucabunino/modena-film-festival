import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from '@sanity/color-input'
import {media} from 'sanity-plugin-media'
import {myStructure} from './structure'


// edited only through their desk item, never created, duplicated or deleted
const singletons = ['about']

export default defineConfig({
	name: 'default',
	title: 'Modena Film Festival',

	projectId: '74l2lf69',
	dataset: 'production',

	plugins: [
		structureTool({structure: myStructure}),
		visionTool(),
		colorInput(),
		media(),
	],

	schema: {
		types: schemaTypes,
		// singleton: only reachable through the desk item, never created from the + menu
		templates: (templates) => templates.filter(({schemaType}) => !singletons.includes(schemaType)),
	},

	document: {
		badges: [StatusBadge],
		actions: (actions, {schemaType}) =>
			singletons.includes(schemaType)
				? actions.filter(({action}) => !['duplicate', 'delete', 'unpublish'].includes(action))
				: actions,
	},
})


export function StatusBadge(props) {
  const status = props.published?.status || props.draft?.status
  if (!status) return null

  let color = 'primary'
  if (status === 'public') color = 'success'
  if (status === 'hidden') color = 'warning'

  return {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    title: `Status: ${status}`,
    color,
  }
}