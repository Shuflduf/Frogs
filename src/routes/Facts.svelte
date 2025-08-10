<script lang="ts">
	let list: HTMLDivElement;

	function scrollList(dir: number) {
		list.scrollBy({ left: dir * 528, behavior: 'smooth' });
	}
</script>

<div class="group relative">
	<button
		class="absolute bottom-1/2 left-4 h-12 w-12 translate-y-1/2 bg-blue-500 opacity-0 transition group-hover:opacity-100"
		onclick={() => scrollList(-1)}
	>
		&lt
	</button>
	<button
		onclick={() => scrollList(1)}
		class="absolute right-4 bottom-1/2 h-12 w-12 translate-y-1/2 bg-blue-500 opacity-0 transition group-hover:opacity-100"
		>&gt</button
	>
	<div class="flex flex-row gap-4 overflow-x-auto" bind:this={list}>
		{#each Array(5)}
			<div class="h-80 min-w-lg bg-red-400"></div>
		{/each}
	</div>
</div>
