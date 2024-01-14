import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Echo-D Docs',
			favicon: 'public/favicon.ico',
			// logo: {
			// 	src: './public/echo-d-dolphin.png',
			// },
			customCss: [
				// Path to your Tailwind base styles:
				'./src/tailwind.css',
				'./src/custom.css'
			],
			social: {
				github: 'https://github.com/rolandpoulter/echo-d',
			},
			plugins: [
				// Generate the documentation.
				starlightTypeDoc({
					entryPoints: [
						'../ecmascript/src/index.ts',
						// '../ecmascript/src/actions/*.ts',
						// '../ecmascript/src/*.ts'
					],
					tsconfig: '../ecmascript/tsconfig.json',
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
		tailwind({
			// Disable the default base styles:
			applyBaseStyles: false,
		}),
	],
});
