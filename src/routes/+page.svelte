<script>
	import { H1_STYLE, H2_STYLE } from '$lib/styles';
	import Facts from './Facts.svelte';
</script>

<div class="mb-8 flex w-full items-center justify-center">
	<img src="frog.svg" alt="frog" class="w-1/4" />
	<img src="rocket.svg" alt="rocket" class="w-1/4" />
</div>
<h1 class="{H1_STYLE} !text-7xl">Frog Appreciation Site</h1>
<h2 class={H2_STYLE}>i really like frogs</h2>

<div class="m-8 mb-16"><Facts /></div>
<div class="mx-auto h-32 max-w-4xl">
	<h1 class="{H1_STYLE} ">Favourite Frogs</h1>
	<h2 class={H2_STYLE}>some of my favourite frogs of all time</h2>
</div>
