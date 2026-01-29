<script>
	/* Generic Menu Wrapper. Places menu on side of screen for desktop, and then
  collaposes to a bottom menu for mobile */
	import DesktopMenu from './DesktopMenu.svelte';
	import MobileMenu from './MobileMenu.svelte';

	let {
		containerW = 100,
		containerH = 100,
		isMobile = false,
		desktopW = 250,
		side = 'left',
		children
	} = $props();
</script>

<div class="menu-wrapper" style:width={`${containerW}px`} style:height={`${containerH}px`}>
	{#if !isMobile}
		<DesktopMenu {side} {desktopW}>
			{@render children?.()}
		</DesktopMenu>
	{:else}
		<MobileMenu {containerH} topPadding={20} toggleButtonH={50}>
			{@render children?.()}
		</MobileMenu>
	{/if}
</div>

<style>
	.menu-wrapper {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
