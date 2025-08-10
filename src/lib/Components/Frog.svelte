<script lang="ts">
	import { lerp, Vec2 } from '$lib';
	import { onMount } from 'svelte';

	const DELTA = 1000 / 60;

	let frog: HTMLElement;
	let velocity: Vec2 = new Vec2(0.1, 1.0);
	let position: Vec2 = $state(new Vec2(0.0, 100.0));

	$effect(() => {
		// if (!frog) {
		// 	return;
		// }

		frog.style.display = 'block';
		frog.style.bottom = `${position.y}px`;
		frog.style.left = `${position.x}px`;
	});

	onMount(() => {
		position.x = Math.random() * (window.innerWidth - 144);
		setInterval(process, DELTA);
		setTimeout(() => setInterval(jump, Math.random() * 5000 + 2000), Math.random() * 2000);
	});

	function process() {
		// position.y += delta * 100;
		// position = new Vec2(position.x, position.y + DELTA * velocity.y);
		if (isOnFloor()) {
			if (velocity.y < 0.0) {
				velocity.y = 0;
			}
			// const dampedX = lerp(velocity.x, 0.0, DELTA * 10);
			// velocity = new Vec2(dampedX, velocity.y);
			velocity = new Vec2(velocity.x * 0.9, velocity.y);
		} else {
			velocity.y -= DELTA * 0.005;
		}

		if (position.x < 0.0) {
			velocity = new Vec2(Math.abs(velocity.x), velocity.y);
		} else if (position.x > window.innerWidth - 144) {
			velocity = new Vec2(-Math.abs(velocity.x), velocity.y);
		}

		position = position.add(new Vec2(DELTA * velocity.x, DELTA * velocity.y));

		if (isOnFloor()) {
			position = new Vec2(position.x, 0.0);
		}
	}

	function jump() {
		velocity.y = 1;
		velocity.x = (Math.random() - 0.5) * 1.2;
	}

	function isOnFloor(): boolean {
		return position.y <= 0.0;
	}
</script>

<img src="frog.png" alt="frog" style="display: none;" class="fixed h-36" bind:this={frog} />
