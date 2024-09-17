<script>
	import { page } from '$app/stores';

	export let title = 'Home';
	export let description = 'Description of your website';
	export let url = 'https://example.com';
	export let image = 'https://example.com/your-logo.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og_site_name" content={title} />
	<meta property="og:url" content={`${url}${$page.url.pathname.toString()}`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="“example.com" />
	<meta property="twitter:url" content={`${url}${$page.url.pathname.toString()}`} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
