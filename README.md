# SvelteKit Template

A starter template for SvelteKit projects using Svelte 5, SCSS, and D3.

## Features

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`, `$props`)
- **SvelteKit 2** for routing and SSR
- **Vite 6** for fast builds
- **SCSS** preprocessing
- **D3** for data visualization
- **ESLint 9** with flat config + Prettier

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start development server            |
| `npm run build`   | Build for production                |
| `npm run preview` | Preview production build            |
| `npm run lint`    | Check code with ESLint and Prettier |
| `npm run format`  | Auto-fix formatting issues          |

## Project Structure

```
src/
├── lib/
│   ├── actions/       # Svelte actions (tooltip, inView, etc.)
│   ├── assets/        # Images and static assets
│   ├── components/    # Reusable components
│   ├── stores/        # Svelte stores
│   ├── styles/        # Global CSS/SCSS
│   └── utils/         # Utility functions
└── routes/            # SvelteKit routes
```

## Included Components

- **Accordion** - Expandable content sections
- **ButtonWithSlideoutMenu** - Button with dropdown menu
- **SlidingSidebar** - Collapsible sidebar navigation
- **SideMenu** - Responsive side menu (desktop/mobile)
- **Tooltip** - Hover tooltips with positioning
- **ColorSwatches / Legend** - D3 color scale visualizations
- **SearchBar** - Expandable search with filtering
- **PasswordModal** - Simple authentication modal

## Svelte 5 Quick Reference

```svelte
<script>
	// Props
	let { name = 'World', children } = $props();

	// State
	let count = $state(0);

	// Derived
	let doubled = $derived(count * 2);

	// Effects
	$effect(() => {
		console.log('count is now', count);
	});
</script>

<button onclick={() => count++}>
	Clicked {count} times
</button>

{@render children?.()}
```

## Deployment

This template uses `@sveltejs/adapter-auto`. For specific platforms, install the appropriate adapter:

- Vercel: `@sveltejs/adapter-vercel`
- Netlify: `@sveltejs/adapter-netlify`
- Node: `@sveltejs/adapter-node`
- Static: `@sveltejs/adapter-static`

See [SvelteKit adapters documentation](https://svelte.dev/docs/kit/adapters) for more options.
