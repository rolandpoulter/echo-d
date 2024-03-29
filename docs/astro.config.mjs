import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	site: 'https://echo-d.net',
	integrations: [
		starlight({
			title: 'Echo-D',
			favicon: 'public/favicon.ico',
			pagination: true,
			lastUpdated: true,
			logo: {
				src: './src/assets/dolphin/echo-d-dolphin-logo.png'
			},
			customCss: [
				// Path to your Tailwind base styles:
				'./src/assets/tailwind.css',
				'./src/assets/landing.css',
				'./src/assets/nettop.css',
			],
			editLink: {
				baseUrl: 'https://github.com/rolandpoulter/echo-d/edit/main/docs/'
			},
			social: {
				github: 'https://github.com/rolandpoulter/echo-d'
			},
			components: {
				Footer: './src/components/Footer.astro',
			},
			plugins: [
				// Generate the documentation.
				starlightTypeDoc({
					entryPoints: ['../ecmascript/src/index.ts'
						// '../ecmascript/src/actions/*.ts',
						// '../ecmascript/src/*.ts'
					],
					tsconfig: '../ecmascript/tsconfig.json',
					pagination: true,
					// output: 'api-multiple-entrypoints',
					// output: '_api',
					sidebar: {
						label: 'API (auto-generated)',
						collapsed: true
					},
					typeDoc: {
						// readme: undefined,
					}
				})
			],
			sidebar: [{
				label: 'Guides',
				collapsed: true,
				items: [
					// Each item here is one entry in the navigation menu.
					{
						label: 'Quick Start',
						link: '/guides/quick_start/'
					},
					// { label: 'Configuration', link: '/guides/configuration/' },
					{
						label: 'Networking',
						link: '/guides/networking/'
					},
					// { label: 'Performance', link: '/guides/performance/' },
					{
						label: 'Storage Adapters',
						link: '/guides/storage_adapters/'
					}
					// { label: 'Common Issues', link: '/guides/common_issues/' },
				]
				// autogenerate: { directory: 'guides' },
			}, {
				label: 'Example',
				collapsed: true,
				items: [{
					label: 'Setup',
					link: '/example/setup/'
				}, {
					label: 'Host',
					link: '/example/host/'
				}, {
					label: 'Client',
					link: '/example/client/'
				}, {
					label: 'Demo',
					link: '/example/demo/'
				}]
			}, {
				label: 'Specification',
				link: '/spec/'
			}, {
				label: 'Reference',
				collapsed: true,
				autogenerate: {
					directory: 'reference'
				}
			},
			// Add the generated sidebar group to the sidebar.
			typeDocSidebarGroup]
		}),
		tailwind({
			// Disable the default base styles:
			applyBaseStyles: false
		}),
		react()
	]
});