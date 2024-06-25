/*
This action triggers a custom tooltip component to appear when a given node is hovered. You supply
the component (and any number of props) as input parameters to the action. 

Usage:
  <div
    use=tooltip={{
      component: MyTooltip,
      props: {
        text: 'tooltip text',
        placement: 'top',
				strategy: 'fixed' // or 'absolute',
        ...
      }
    }}
  > Hover me </div>

The action will handle the creation, and destruction of a tooltip when the node is hovered. 

At minimum, the custom tooltip component MUST have the following features. 
See components/Tooltips/TooltipSimple.svelte for example 

<script>
  export let x;
  export let y;
</script>

<div style="top: {y}px; left: {x}px;">
  TOOL TIP CONTENT
</div>

<style>
  .tooltip {
    position: absolute;
  }
</style>
*/

const getCoords = (event, strategy) => {
	/* return the coordinates of the mouse event based on current strategy. 
    strategy: 'fixed' or 'absolute'. 
      'fixed' will return coords at center of node
      'absolute'  is at mouse location

    In both cases, the coordinates are expressed relative to the overall document
  */
	if (strategy === 'fixed') {
		const rect = event.target.getBoundingClientRect();
		return {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2
		};
	} else {
		return {
			x: event.pageX,
			y: event.pageY
		};
	}
};

export const tooltip = (node, params) => {
	const tooltipComponent = params.component;
	const tooltipProps = params.props || {};
	const strategy = tooltipProps.strategy || 'fixed';

	let tooltipRef;
	let nodeTitle;

	const mouseOver = (event) => {
		// --- Create Tooltip
		// remove 'title' from node to prevent default tooltip
		nodeTitle = node.getAttribute('title');
		node.removeAttribute('title');

		// create instance of tooltip component
		let coords = getCoords(event, strategy);
		tooltipRef = new tooltipComponent({
			props: {
				...tooltipProps,
				x: coords.x,
				y: coords.y
			},
			target: document.body
		});
	};

	function mouseMove(event) {
		if (strategy === 'fixed') return; // don't do anything if strategy is fixed
		// update the tooltip position
		let coords = getCoords(event, strategy);
		tooltipRef.$set({
			x: coords.x,
			y: coords.y
		});
	}

	function mouseLeave() {
		node.setAttribute('title', nodeTitle);
		tooltipRef.$destroy();
	}

	node.addEventListener('mouseover', mouseOver);
	node.addEventListener('mouseleave', mouseLeave);
	node.addEventListener('mousemove', mouseMove);

	return {
		destroy() {
			node.removeEventListener('mouseover', mouseOver);
			node.removeEventListener('mouseleave', mouseLeave);
			node.removeEventListener('mousemove', mouseMove);
		}
	};
};
