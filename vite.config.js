import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	css: {
		postcss: {
			plugins: [autoprefixer]
		},
		preprocessorOptions: {
			scss: {
				additionalData: `@use './src/lib/styles/mixins.scss' as *;`
			}
		}
	}
});
