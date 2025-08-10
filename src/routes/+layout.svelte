<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ZooBanner from '$lib/Components/ZooBanner.svelte';
	import Frog from '$lib/Components/Frog.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ZooBanner></ZooBanner>
{@render children?.()}
{#each Array(5)}
	<Frog />
{/each}
