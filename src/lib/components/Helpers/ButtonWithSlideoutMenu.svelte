<script>
	/* Generic Buttons with Slideout Menu Component
Menu slides out from the button when clicked. You can feed 
it slots for "button" and "menu" for custom content. 
*/
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import closeButtonIcon from '$lib/assets/icons/icon_closeButton.svg';

	// Props
	export let isOpen = false;
	export let menuWidth = 200;
	export let menuHeight = null; // null defaults to 'auto'
	export let position = 'bottom'; // 'left', 'right', 'top', 'bottom'
	export let transitionDuration = 300;
	export let closeOnClickOutside = true;
	export let gap = '8px'; // Gap between button and menu
	export let isMobile = true; // For mobile view

	let slideOutMenuContentRef;
	let buttonRef;

	const dispatch = createEventDispatcher();

	function toggleMenu() {
		isOpen = !isOpen;
		dispatch('toggle', { isOpen });
	}

	function handleClickOutside(event) {
		if (!isOpen) return;

		// If click is outside the menu and outside the button
		if (
			closeOnClickOutside &&
			slideOutMenuContentRef &&
			!slideOutMenuContentRef.contains(event.target) &&
			buttonRef &&
			!buttonRef.contains(event.target)
		) {
			isOpen = false;
			dispatch('toggle', { isOpen });
		}
	}

	// Compute fly transition parameters based on position
	function getFlyParams() {
		const params = { duration: transitionDuration, x: 0, y: 0 };

		if (!isMobile) {
			switch (position) {
				case 'left':
					params.x = 20;
					break;
				case 'right':
					params.x = -20;
					break;
				case 'top':
					params.y = 20;
					break;
				case 'bottom':
					params.y = -20;
					break;
			}
		}

		return params;
	}

	// Get menu position styles based on position prop
	function getMenuPositionStyle() {
		if (isMobile) {
			return `
							position: fixed;
							top: 0;
							left: 0;
							width: 100%;
							height: 100vh;
							z-index: 100;
							border-radius: 0;
							background-color: white;
							overflow-y: auto;
					`;
		}

		const styles = {
			width: `${menuWidth}px`,
			height: menuHeight ? `${menuHeight}px` : 'auto'
		};

		switch (position) {
			case 'left':
				styles.right = `calc(100% + ${gap})`;
				styles.top = '0';
				break;
			case 'right':
				styles.left = `calc(100% + ${gap})`;
				styles.top = '0';
				break;
			case 'top':
				styles.bottom = `calc(100% + ${gap})`;
				styles.left = '50%';
				styles.transform = 'translateX(-50%)';
				break;
			case 'bottom':
				styles.top = `calc(100% + ${gap})`;
				styles.left = '50%';
				styles.transform = 'translateX(-50%)';
				break;
		}

		return Object.entries(styles)
			.map(([key, value]) => `${key}: ${value}`)
			.join('; ');
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="slideout-menu-container" class:vertical={position === 'top' || position === 'bottom'}>
	<div id="slideout-menu-button" class="menu-button" on:click={toggleMenu} bind:this={buttonRef}>
		<slot name="button">
			<button>Menu</button>
		</slot>
	</div>

	{#if isOpen}
		<div
			id="slideout-menu-content"
			class="menu-content"
			class:mobile={isMobile}
			class:top={position === 'top' && !isMobile}
			class:bottom={position === 'bottom' && !isMobile}
			class:left={position === 'left' && !isMobile}
			class:right={position === 'right' && !isMobile}
			style={getMenuPositionStyle()}
			transition:fly={getFlyParams()}
			bind:this={slideOutMenuContentRef}
		>
			<!-- Add close button to mobile-->
			{#if isMobile}
				<div class="mobile-menu-header">
					<div class="mobile-close-button" on:click={toggleMenu}>
						<img src={closeButtonIcon} alt="Close menu" />
					</div>
				</div>
			{/if}
			<slot name="menu">
				<!-- Default menu content if none provided -->
				<ul>
					<li>Menu Item 1</li>
					<li>Menu Item 2</li>
					<li>Menu Item 3</li>
				</ul>
			</slot>
		</div>
	{/if}
</div>

<style lang="scss">
	.slideout-menu-container {
		position: relative;
		display: inline-flex;
		align-items: center;
	}

	.slideout-menu-container.vertical {
		flex-direction: column;
	}

	.menu-button {
		z-index: 1;
		position: relative;
		cursor: pointer;
	}

	.menu-content {
		position: absolute;
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		padding: 10px;
		z-index: 10;
		max-height: 80vh;
		overflow-y: auto;
	}

	.mobile-menu-header {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		cursor: pointer;

		img {
			width: 60px;
			height: 60px;
		}
	}

	.menu-content.mobile {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		border-radius: 0;
		box-shadow: none;
		padding: 20px;
		max-height: none;
		overflow-y: auto;
		z-index: 100;
	}
</style>
