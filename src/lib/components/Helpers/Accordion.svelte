<script>
	/* This is a generic accordion that has a header and body. Clicking the header 
  will toggle the body open and closed. You can use slots to customize the header
  and body to your hearts content
  */
	import { slide } from 'svelte/transition';
	export let isOpen = false;

	const toggleAccordion = () => {
		console.log('toggling accordion');
		isOpen = !isOpen;
	};
</script>

<div class="accordion-container">
	<div
		class="accordion-header"
		on:click={toggleAccordion}
		on:keypress={toggleAccordion}
		role="button"
		tabindex="0"
	>
		<slot name="accordion-header" />
	</div>
	{#if isOpen}
		<div class="accordion-body" transition:slide>
			<slot name="accordion-body" />
		</div>
	{/if}
</div>

<style lang="scss">
	.accordion-container {
		overflow: hidden;
	}
</style>
