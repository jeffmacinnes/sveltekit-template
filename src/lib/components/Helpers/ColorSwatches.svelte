<script>
	import { fade } from 'svelte/transition';

	let { colorScale, show = false } = $props();

	let labels = $derived(colorScale.domain());
	let colors = $derived(colorScale.range());
</script>

<div class="wrapper">
	{#if show}
		<div class="legend-container">
			{#each colors as color, i (i)}
				<div transition:fade|global class="swatch-wrapper">
					<div class="swatch" style:background-color={color}></div>
					<div class="label" style:color>{labels[i]}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		min-height: 50px;
		max-height: 50px;
		overflow: none;
	}
	.legend-container {
		width: 100%;
		padding: 10px 40px;
		height: 50px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.swatch-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;
		height: 100%;

		.swatch {
			width: 50px;
			height: 90%;
			border: solid 1px white;
		}

		.label {
			font-family: 'Saira Semi Condensed';
			font-weight: 700;
			font-size: 18px;
		}
	}
</style>
