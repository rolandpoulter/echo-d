import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'ECHO-D Documentation',
			social: {
				github: 'https://github.com/rolandpoulter/echo-d',
			},
			plugins: [
				// Generate the documentation.
				starlightTypeDoc({
					entryPoints: [
						'../src/index.ts',
						// '../src/actions/*.ts',
						// '../src/*.ts'
					],
					tsconfig: '../tsconfig.json',
					pagination: true,
					// output: 'api-multiple-entrypoints',
					// output: '_api',
					sidebar: {
						label: 'API (auto-generated)',
						collapsed: true,
					},
					typeDoc: {
						// readme: undefined,
					},
				}),
			],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				// Add the generated sidebar group to the sidebar.
				typeDocSidebarGroup,
			],
		}),
	],
});
