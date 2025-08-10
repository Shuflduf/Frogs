<script lang="ts">
	import { Vec2 } from '$lib';
	import { onMount } from 'svelte';

	const DELTA = 1000 / 60;

	let frog: HTMLElement;
	let beingDragged: boolean = $state(false);
	let velocity: Vec2 = new Vec2(0.0, 0.0);
	let position: Vec2 = $state(new Vec2(0.0, 0.0));
	let mousePos: Vec2 = $state(new Vec2(0.0, 0.0));
	let mouseVel: Vec2 = $state(new Vec2(0.0, 0.0));

	$effect(() => {
		frog.style.display = 'block';
		frog.style.bottom = `${position.y}px`;
		frog.style.left = `${position.x}px`;
	});

	onMount(() => {
		position.x = Math.random() * (window.innerWidth - 144);
		setInterval(process, DELTA);
		setTimeout(() => setInterval(jump, Math.random() * 5000 + 2000), Math.random() * 2000);
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

	function process() {
		if (isOnFloor()) {
			if (velocity.y < 0.0) {
				velocity.y = 0;
			}
			velocity = new Vec2(velocity.x * 0.9, velocity.y);
		} else {
			velocity.y -= DELTA * 0.005;
		}

		if (position.x < 0.0) {
			velocity = new Vec2(Math.abs(velocity.x) / 1.3, velocity.y);
		} else if (position.x > window.innerWidth - 144) {
			velocity = new Vec2(-Math.abs(velocity.x) / 2, velocity.y);
		}

		position = position.plus(new Vec2(DELTA * velocity.x, DELTA * velocity.y));
		if (beingDragged) {
			position = mousePos;
			velocity = new Vec2(0.0, 0.0);

			if (position.x < 0.0) {
				position.x = 0;
			} else if (position.x > window.innerWidth - 144) {
				position.x = window.innerWidth - 144;
			}
		}

		if (isOnFloor()) {
			position = new Vec2(position.x, 0.0);
		}
	}

	function jump() {
		if (!isOnFloor()) {
			return;
		}

		velocity.y = 1;
		velocity.x = (Math.random() - 0.5) * 1.2;
	}

	function isOnFloor(): boolean {
		return position.y <= 0.0;
	}

	function onMouseMove(e: MouseEvent) {
		const newPos = new Vec2(e.clientX - 72, window.innerHeight - e.clientY - 72);
		mouseVel = newPos.minus(mousePos).multiply(new Vec2(1 / DELTA, 1 / DELTA));
		mousePos = newPos;
	}

	function onMouseDown(_: MouseEvent) {
		console.log('AAA');
		beingDragged = true;
	}

	function onMouseUp(_: MouseEvent) {
		if (beingDragged) {
			velocity = mouseVel;
		}
		beingDragged = false;
	}
</script>

<span
	onmousedown={onMouseDown}
	onmouseup={onMouseUp}
	role="button"
	tabindex="-1"
	class="fixed z-[200] select-none"
	bind:this={frog}
	style="display: none;"
>
	<img src="frog.png" alt="frog" class="pointer-events-none h-36" />
</span>
