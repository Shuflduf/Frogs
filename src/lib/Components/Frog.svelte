<script lang="ts">
	import { lerp, Vec2 } from '$lib';
	import { onMount } from 'svelte';

	const DELTA = 1000 / 60;

	let frog: HTMLElement;
	let beingDragged: boolean = $state(false);
	let velocity: Vec2 = new Vec2(0.1, 1.0);
	let position: Vec2 = $state(new Vec2(0.0, 100.0));
	let mousePos: Vec2 = $state(new Vec2(0.0, 0.0));
	let mouseVel: Vec2 = $state(new Vec2(0.0, 0.0));

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
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
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

		position = position.plus(new Vec2(DELTA * velocity.x, DELTA * velocity.y));
		if (beingDragged) {
			// console.log(window.)
			position = mousePos;
			velocity = new Vec2(0.0, 0.0);
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
		// if (beingDragged) {
		// 	position = new Vec2(e.clientX - 72, window.innerHeight - e.clientY - 72);
		// 	velocity = new Vec2(0, 0);
		// 	console.log(e.clientY);
		// }
	}

	function onMouseDown(e: MouseEvent) {
		console.log('AAA');
		beingDragged = true;
	}

	function onMouseUp(e: MouseEvent) {
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
	class="fixed select-none"
	bind:this={frog}
	style="display: none;"
>
	<img src="frog.png" alt="frog" class="pointer-events-none h-36" />
</span>
