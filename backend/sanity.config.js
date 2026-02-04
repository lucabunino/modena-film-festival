import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from '@sanity/color-input'


export default defineConfig({
	name: 'default',
	title: 'Modena Film Festival',

	projectId: '74l2lf69',
	dataset: 'production',

	plugins: [
		structureTool(),
		visionTool(),
		colorInput(),
	],

	schema: {
		types: schemaTypes,
	},

	document: {
		badges: [StatusBadge]
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