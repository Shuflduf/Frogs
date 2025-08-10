export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vec2) {
    let newVec = new Vec2(this.x, this.y)
    newVec.x += other.x;
    newVec.y += other.y;
    return newVec
  }
}

export function lerp(start: number, end: number, amount: number): number {
  return start * (1 - amount) + end * amount;
}
