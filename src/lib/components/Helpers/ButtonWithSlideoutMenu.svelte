<script>
	/* Generic Buttons with Slideout Menu Component
Menu slides out from the button when clicked. You can feed
it snippets for "button" and "menu" for custom content. On mobile,
the menu takes the full screen and appears at top of DOM
*/
	import { fly } from 'svelte/transition';
	import closeButtonIcon from '$lib/assets/icon_closeButton.svg';

	let {
		isOpen = $bindable(false),
		isMobile = false,
		menuWidth = 200,
		menuHeight = null,
		position = 'bottom',
		transitionDuration = 300,
		closeOnClickOutside = true,
		gap = '8px',
		button: buttonSnippet,
		menu: menuSnippet,
		ontoggle
	} = $props();

	let slideOutMenuContentRef = $state();
	let buttonRef = $state();
	let screenW = $state();
	let mobileMenuContainer = $state();

	const createMobileMenuPortal = () => {
		if (!mobileMenuContainer) {
			mobileMenuContainer = document.createElement('div');
			mobileMenuContainer.id = 'mobile-menu-portal';
			mobileMenuContainer.style.position = 'relative';
			mobileMenuContainer.style.zIndex = '99999';
			document.body.appendChild(mobileMenuContainer);
		}
		return mobileMenuContainer;
	};

	const addToPortal = (node) => {
		if (isMobile && isOpen) {
			const portal = createMobileMenuPortal();
			portal.appendChild(node);

			return {
				destroy() {
					if (node.parentNode === portal) {
						portal.removeChild(node);
					}
				}
			};
		}
	};

	const toggleMenu = () => {
		isOpen = !isOpen;
		ontoggle?.({ isOpen });
	};

	const handleClickOutside = (event) => {
		if (!isOpen) return;

		if (
			closeOnClickOutside &&
			slideOutMenuContentRef &&
			!slideOutMenuContentRef.contains(event.target) &&
			buttonRef &&
			!buttonRef.contains(event.target)
		) {
			isOpen = false;
			ontoggle?.({ isOpen });
		}
	};

	const getFlyParams = () => {
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
		} else {
			params.y = 20;
		}

		return params;
	};

	const checkMenuPosition = () => {
		if (!isMobile && slideOutMenuContentRef && isOpen) {
			const menuRect = slideOutMenuContentRef.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const windowWidth = window.innerWidth;

			if (position === 'left' || position === 'right') {
				if (menuRect.bottom > windowHeight) {
					const adjustment = menuRect.bottom - windowHeight;
					slideOutMenuContentRef.style.top = `calc(0px - ${adjustment}px)`;
				} else if (menuRect.top < 0) {
					slideOutMenuContentRef.style.top = '0px';
				}
			} else if (position === 'top' || position === 'bottom') {
				if (menuRect.right > windowWidth) {
					const adjustment = menuRect.right - windowWidth;
					slideOutMenuContentRef.style.left = `calc(50% - ${adjustment}px)`;
				} else if (menuRect.left < 0) {
					slideOutMenuContentRef.style.left = '0px';
					slideOutMenuContentRef.style.transform = 'none';
				}
			}
		}
	};

	const getMenuPositionStyle = () => {
		if (isMobile) {
			return `
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				z-index: 99999;
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
	};

	$effect(() => {
		if (isOpen) {
			setTimeout(() => {
				checkMenuPosition();
			}, 50);
		}
	});

	const handleResize = () => {
		if (isOpen) {
			checkMenuPosition();
		}
	};
</script>

<svelte:window onclick={handleClickOutside} bind:innerWidth={screenW} onresize={handleResize} />

<div class="slideout-menu-container" class:vertical={position === 'top' || position === 'bottom'}>
	<!-- BUTTON TO OPEN/CLOSE MENU -->
	<div id="slideout-menu-button" class="menu-button" onclick={toggleMenu} bind:this={buttonRef}>
		{#if buttonSnippet}
			{@render buttonSnippet()}
		{:else}
			<button>Menu</button>
		{/if}
	</div>

	<!-- MENU CONTENTS -->
	{#if isOpen}
		<div
			class="menu-content"
			class:mobile={isMobile}
			class:top={position === 'top' && !isMobile}
			class:bottom={position === 'bottom' && !isMobile}
			class:left={position === 'left' && !isMobile}
			class:right={position === 'right' && !isMobile}
			style={getMenuPositionStyle()}
			transition:fly={getFlyParams()}
			bind:this={slideOutMenuContentRef}
			use:addToPortal={isMobile}
		>
			<div class="close-button" onclick={toggleMenu}>
				<img src={closeButtonIcon} alt="Close menu" />
			</div>

			{#if menuSnippet}
				{@render menuSnippet()}
			{:else}
				<p>Default Menu Content</p>
			{/if}
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
		z-index: 10;
		max-height: 80vh;
		overflow-y: auto;

		&.mobile {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 0;
			box-shadow: none;
			padding: 20px;
			max-height: none;
			overflow-y: auto;
			z-index: 99999;
		}
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 12px;
		height: 12px;
		cursor: pointer;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
</style>
