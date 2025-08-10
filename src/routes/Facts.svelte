<script lang="ts">
	const BUTTON_STYLE =
		'absolute bottom-1/2 h-12 w-12 font-bold text-xl text-[#D4E09B] translate-y-1/2 bg-[#A44A3F] opacity-0 transition group-hover:opacity-100 font-[Phantom_Sans]';
	let list: HTMLDivElement;

	function scrollList(dir: number) {
		list.scrollBy({ left: dir * 528, behavior: 'smooth' });
	}
</script>

<div class="group relative">
	<button class="{BUTTON_STYLE} left-4" onclick={() => scrollList(-1)}> &lt </button>
	<button class="{BUTTON_STYLE} right-4" onclick={() => scrollList(1)}>&gt</button>
	<div class="flex flex-row gap-4 overflow-x-auto" bind:this={list}>
		{#each Array(5)}
			<div class="h-80 min-w-lg bg-[#9CB380]"></div>
		{/each}
	</div>
</div>
