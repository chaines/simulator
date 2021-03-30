class Vector2 {
  readonly x: number;
  readonly y: number;
  static UNIT_VECTOR: Vector2 = new Vector2(1, 0);
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector2 | number) {
    if (v instanceof Vector2) {
      return new Vector2(this.x + v.x, this.y + v.y);
    } else {
      return new Vector2(this.x + v, this.y + v);
    }
  }

  subtract(v: Vector2 | number) {
    if (v instanceof Vector2) {
      return new Vector2(this.x - v.x, this.y - v.y);
    } else {
      return new Vector2(this.x - v, this.y - v);
    }
  }

  multiply(magnitude: number) {
    return new Vector2(this.x * magnitude, this.y * magnitude);
  }

  dot(v: Vector2) {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: Vector2) {
    return this.x * v.y - this.y * v.x;
  }

  magnitude() {
    return Math.sqrt(this.dot(this));
  }

  normalize() {
    // This one gets a bit less elegant with immutability.
    // We can get pretty close with multiply(1/this.magnitude())
    // But floating point precision can get tricky, I would assume.
    return this.multiply(1 / this.magnitude());
  }

  /**
   * @returns the angle from 0 in radians.
   */
  direction() {
    return Math.atan2(this.y, this.x);
  }

  rotate(rads: number) {
    const newDir = this.direction() + rads;
    const magnitude = this.magnitude();
    return new Vector2(Math.cos(newDir) * magnitude, Math.sin(newDir) * magnitude);
  }
}

export default Vector2;
