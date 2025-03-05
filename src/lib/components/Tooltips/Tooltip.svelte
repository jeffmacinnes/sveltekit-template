<script>
	/* Generic Tooltip that shows an icon and displays a component on hover */
	import { tooltip } from '$lib/actions/tooltip';
	import tooltipIcon from '$lib/assets/icons/icon_tooltip.svg';
	import TooltipPopup from './TooltipSimple.svelte';

	export let text = '';
	export let placement = 'right';
	export let iconSize = '1.5rem';
</script>

<img
	src={tooltipIcon}
	alt="Tooltip"
	style={`width: ${iconSize}; height: ${iconSize};`}
	use:tooltip={{
		component: TooltipPopup,
		props: {
			text,
			placement,
			strategy: 'fixed'
		}
	}}
/>

<style lang="scss">
	img {
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}
	}
</style>
