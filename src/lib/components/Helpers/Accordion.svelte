<script>
	/* This is a generic accordion that has a header and body. Clicking the header
  will toggle the body open and closed. You can use snippets to customize the header
  and body to your hearts content
  */
	import { slide } from 'svelte/transition';

	let {
		isOpen = false,
		isDisabled = false,
		'accordion-header': accordionHeader,
		'accordion-body': accordionBody
	} = $props();

	let open = $state(isOpen);

	const toggleAccordion = () => {
		open = !open;
	};
</script>

<div class="accordion-container">
	<div
		class="accordion-header"
		class:disabled={isDisabled}
		onclick={toggleAccordion}
		onkeypress={toggleAccordion}
		role="button"
		tabindex="0"
	>
		{@render accordionHeader?.()}
	</div>
	{#if open}
		<div class="accordion-body" transition:slide>
			{@render accordionBody?.()}
		</div>
	{/if}
</div>

<style lang="scss">
	.accordion-container {
		overflow: hidden;
	}

	.accordion-header {
		&.disabled {
			pointer-events: none;
			cursor: default;
			opacity: 0.25;

			* {
				pointer-events: none;
				cursor: default;
			}
		}
	}

	.accordion-body {
		overflow: auto;
		height: auto;
	}
</style>
