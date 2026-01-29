<script>
	import { tooltip } from '$lib/actions/tooltip';
	import tooltipIcon from '$lib/assets/icon_tooltip.svg';
	import TooltipPopup from '$lib/components/ToolTips/TooltipSimple.svelte';

	let { text = '', placement = 'right', iconSize = '1.5rem' } = $props();

	let tooltipProps = $derived({
		component: TooltipPopup,
		props: {
			text,
			placement,
			strategy: 'fixed'
		}
	});
</script>

<img
	src={tooltipIcon}
	alt="Tooltip"
	style={`width: ${iconSize}; height: ${iconSize};`}
	use:tooltip={tooltipProps}
/>

<style lang="scss">
	img {
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}
	}
</style>
