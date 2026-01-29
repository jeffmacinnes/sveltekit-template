<script>
	/* Menu that slides up from the bottom of the screen */
	import { onMount } from 'svelte';

	let { containerH = 100, topPadding = 50, toggleButtonH = 45, children } = $props();

	const toggleMenu = () => {
		menuOpen = !menuOpen;
		translateH = menuOpen ? topPadding : containerH - toggleButtonH;
	};

	let menuOpen = $state(false);
	let mobile_spacing = 0;
	let isPhone = $state(false);

	let bottomOffset = $derived(isPhone ? mobile_spacing : 0);
	let translateH = $derived(menuOpen ? topPadding : containerH - toggleButtonH - bottomOffset);

	onMount(() => {
		let screenWidth = window.innerWidth;
		isPhone = screenWidth < 480;

		const handleResize = () => {
			screenWidth = window.innerWidth;
			isPhone = screenWidth < 480;
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<article class="menu-wrapper">
	<div
		class="menu-container"
		style="height: {containerH - topPadding}px; transform: translateY({translateH}px"
	>
		<div class="controls-container" style="height: {toggleButtonH}px">
			<button class="menu-button" onclick={toggleMenu}>
				{menuOpen ? 'Close Menu' : 'Open Menu'}
			</button>
		</div>
		{#if isPhone && !menuOpen}
			<div class="spacer" style="height: {mobile_spacing}px"></div>
		{/if}
		<div class="menu-content" style="height: calc(100% - {toggleButtonH}px)">
			{@render children?.()}
		</div>
	</div>
</article>

<style lang="scss">
	.menu-wrapper {
		position: fixed;
		width: calc(100% - 4rem);
		left: 50%;
		transform: translate(-50%, 0%);
		height: 100%;
		pointer-events: none;
	}

	.menu-container {
		width: 100%;
		background: white;
		padding: 0 2rem;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		transition: transform 0.3s ease-in-out;
		pointer-events: auto;
		box-shadow: var(--shadow-pse-dark);
		border: solid 1px black;
	}

	.controls-container {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 10px 0;
	}

	.menu-button {
		padding: 1rem 2rem;
		pointer-events: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: uppercase;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;
		color: var(--color-white);
		background-color: var(--color-green4);
		border: solid 1px black;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.menu-content {
		overflow: auto;
	}

	.spacer {
		width: 100%;
	}

	@media (max-width: 768px) {
		.menu-wrapper {
			width: calc(100% - 2rem);
		}
	}

	@media (max-width: 600px) {
		.menu-container {
			padding: 0 0rem;
		}
	}
</style>
