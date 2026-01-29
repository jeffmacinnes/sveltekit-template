<script>
	/* Menu that slides up from the bottom of the screen */
	import { fly } from 'svelte/transition';

	let { side = 'left', desktopW = 250, children } = $props();

	let transitionMag = side === 'left' ? -desktopW : desktopW;
</script>

<div
	class="desktop-menu"
	class:left={side === 'left'}
	class:right={side === 'right'}
	transition:fly={{ x: transitionMag, duration: 300 }}
	style={`width: ${desktopW}px`}
>
	{@render children?.()}
</div>

<style lang="scss">
	/* Desktop menu styles */
	.desktop-menu {
		position: absolute;
		height: 100%;
		padding: 10px;
		overflow-y: auto;
		background-color: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		z-index: 100;

		&.left {
			left: 0;
			border-right: 1px solid #ddd;
		}

		&.right {
			right: 0;
			border-left: 1px solid #ddd;
		}
	}

	.menu-content {
		padding: 15px;
	}
</style>
