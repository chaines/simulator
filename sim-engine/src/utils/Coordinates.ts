import Vector2 from './Vector2';

class Coordinates {
  constructor(public readonly x: number, public readonly y: number) {}

  distanceTo(c: Coordinates) {
    return this.vectorTo(c).magnitude();
  }

  vectorTo(c: Coordinates) {
    return new Vector2(c.x - this.x, c.y - this.y);
  }

  add(v: Vector2) {
    return new Coordinates(this.x + v.x, this.y + v.y);
  }

  moveX(x: number) {
    return new Coordinates(this.x + x, this.y);
  }

  moveY(y: number) {
    return new Coordinates(this.x, this.y + y);
  }
}

export default Coordinates;
