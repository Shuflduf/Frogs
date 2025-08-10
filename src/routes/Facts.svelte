<script lang="ts">
	import { onMount } from 'svelte';

	const BUTTON_STYLE =
		'absolute bottom-1/2 h-12 w-12 font-bold text-xl text-[#D4E09B] translate-y-1/2 bg-[#A44A3F] opacity-0 transition group-hover:opacity-100 font-[Phantom_Sans] rounded-full z-20';
	let list: HTMLDivElement;
	let data: Promise<any> = $state(Promise.resolve(null));

	function scrollList(dir: number) {
		list.scrollBy({ left: dir * 528, behavior: 'smooth' });
	}
	onMount(async () => {
		data = fetch('/cool_frog_facts.json');
		data = (await data).json();
		// console.log(res.text());
	});
</script>

<div class="group relative">
	<button class="{BUTTON_STYLE} left-4" onclick={() => scrollList(-1)}> &lt </button>
	<button class="{BUTTON_STYLE} right-4" onclick={() => scrollList(1)}>&gt</button>
	<div class="flex flex-row gap-4 overflow-x-auto" bind:this={list}>
		{#await data}
			{#each Array(5)}
				<div class="h-80 min-w-lg rounded-3xl bg-[#9CB380]"></div>
			{/each}
		{:then value}
			{#each value as fact}
				<div
					class="relative z-10 h-80 min-w-lg overflow-clip rounded-3xl bg-[#9CB380] p-4 text-[#361134]"
				>
					<h1 class="z-10 mb-2 w-1/2 text-center font-[Phantom_Sans] text-3xl">
						{fact.title}
					</h1>
					<p class="z-10 w-1/2 text-lg leading-8">
						{fact.description}
					</p>
					<img
						src={fact.image}
						alt={fact.title}
						class="pointer-events-none absolute top-0 -z-[5] h-full w-full mask-l-to-80% object-cover"
					/>
				</div>
			{/each}
			<!-- {JSON.stringify(value)} -->
		{/await}
	</div>
</div>
