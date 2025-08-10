<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ZooBanner from '$lib/ZooBanner.svelte';
	import Frog from '$lib/Frog.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ZooBanner />
{@render children?.()}
{#each Array(5)}
	<Frog />
{/each}
