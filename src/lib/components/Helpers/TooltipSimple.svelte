<script>
	import { onMount } from 'svelte';
	export let x; // x,y will be reactive, updated from the tooltip action
	export let y;
	export let text = 'This is the text that will show up in the tooltip';
	export let placement = 'bottom'; // 'top', 'bottom', 'left', 'right
	export let offset = {
		x: 20,
		y: 20
	};

	let winW;
	let winH;
	let top = 0;
	let left = 0;
	let ref;

	const positionTooltip = () => {
		if (!ref) return;
		console.log('positioning tooltip');
		let bbox = ref.getBoundingClientRect();
		console.log('bbox', bbox);

		// try to position the tooltip at desired location
		switch (placement) {
			case 'top':
				top = y - bbox.height - offset.y;
				left = x - bbox.width / 2;
				break;
			case 'bottom':
				top = y + offset.y;
				left = x - bbox.width / 2;
				break;
			case 'left':
				top = y - bbox.height / 2;
				left = x - bbox.width - offset.x;
				break;
			case 'right':
				top = y - bbox.height / 2;
				left = x + offset.x;
				break;
		}

		// check if tooltip is out of bounds, flip to other side if so
		if (top < 0) {
			// if extends off top of screen, flip to bottom
			top = y + offset.y;
		} else if (top + bbox.height > winH) {
			// if extends off bottom of screen, flip to top
			top = y - bbox.height - offset.y;
		} else if (left < 0) {
			// if extends off left of screen, flip to right
			left = x + offset.x;
		} else if (left > winW) {
			left = x - bbox.width - offset.x;
		}
	};

	onMount(() => {
		positionTooltip();
	});

	$: x, y, positionTooltip();
</script>

<svelte:window bind:innerHeight={winH} bind:innerWidth={winW} />
<div id="tooltip" class="tooltip-wrapper" bind:this={ref} style="top: {top}px; left: {left}px;">
	{text}
</div>

<style>
	.tooltip-wrapper {
		width: 100%;
		max-width: 200px;
		background-color: white;
		padding: 10px;
		position: absolute;
		z-index: 1000;
	}
</style>
