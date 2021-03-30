import Vector2 from '../Vector2';

describe('Vector2', () => {
  let vector1 = new Vector2(1, 1);
  let vector2 = new Vector2(2, 2);
  let vector3 = new Vector2(-1, 1);
  let vector4 = new Vector2(0, 1);

  describe('add', () => {
    it('adds the two vectors properly', () => {
      const v = vector1.add(vector2);
      expect(v.x).toBe(3);
      expect(v.y).toBe(3);
    });

    it('is commutative', () => {
      const v1 = vector1.add(vector2);
      const v2 = vector2.add(vector1);
      expect(v1.x).toBe(v2.x);
      expect(v1.y).toBe(v2.y);
    });

    it('has the identity property', () => {
      const v1 = vector1.add(new Vector2(0, 0));
      expect(v1.x).toBe(vector1.x);
      expect(v1.y).toBe(vector1.y);
    });

    it('is associative', () => {
      const v1 = vector1.add(vector2).add(vector3);
      const v2 = vector3.add(vector1).add(vector2);
      expect(v1.x).toBe(v2.x);
      expect(v2.x).toBe(v1.x);
    });

    it('handles magnitude inputs', () => {
      const v1 = vector1.add(4);
      expect(v1.x).toBe(5);
      expect(v1.y).toBe(5);

      const v2 = vector1.add(-1);
      expect(v2.x).toBe(0);
      expect(v2.y).toBe(0);
    });

    it("doesn't mutate inputs", () => {
      const v1 = vector1.add(vector2);
      expect(vector1.x).toBe(1);
      expect(vector1.y).toBe(1);
      expect(vector2.x).toBe(2);
      expect(vector2.y).toBe(2);
    });
  });

  describe('subtract', () => {
    it('properly subtracts vectors', () => {
      const v1 = vector2.subtract(vector1);
      expect(v1.x).toBe(1);
      expect(v1.y).toBe(1);
    });

    it('is NOT commutative', () => {
      const v1 = vector2.subtract(vector1);
      const v2 = vector1.subtract(vector2);
      expect(v1.x).not.toBe(v2.x);
      expect(v1.y).not.toBe(v2.y);
    });

    it('has identity property', () => {
      const v1 = vector1.subtract(new Vector2(0, 0));
      expect(v1.x).toBe(vector1.x);
      expect(v1.y).toBe(vector1.y);
    });
  });

  describe('multiply', () => {
    it('appropriately multiplies the vector by a magnitude', () => {
      const v1 = vector1.multiply(2);
      const v2 = vector1.multiply(5);
      const v3 = vector1.multiply(-4);
      expect(v1.x).toBe(2);
      expect(v1.y).toBe(2);
      expect(v2.x).toBe(5);
      expect(v2.y).toBe(5);
      expect(v3.x).toBe(-4);
      expect(v3.y).toBe(-4);
    });
  });

  describe('dot', () => {
    it('appropriately calculates the dot product', () => {
      const d1 = vector1.dot(vector2);
      const d2 = vector2.dot(vector1);
      const d3 = vector3.dot(vector2);
      const d4 = vector4.dot(vector3);
      expect(d1).toBe(4);
      expect(d2).toBe(4);
      expect(d3).toBe(0);
      expect(d4).toBe(1);
    });
  });

  describe('cross', () => {
    it('appropriately calculates the cross product', () => {
      const c1 = vector1.cross(vector2);
      const c2 = vector2.cross(vector1);
      const c3 = vector4.cross(vector3);
      const c4 = vector3.cross(vector4);

      expect(c1).toBe(c2);
      expect(c3).toBe(1);
      expect(c4).toBe(-1);
    });
  });

  describe('magnitude', () => {
    it('appropriately applies the distance formula to calc the magnitude of a vector', () => {
      expect(vector1.magnitude()).toBe(Math.sqrt(2));
      expect(vector2.magnitude()).toBe(Math.sqrt(8));
      expect(vector3.magnitude()).toBe(Math.sqrt(2));
      expect(vector4.magnitude()).toBe(Math.sqrt(1));
    });
  });

  describe('normalize', () => {
    it('returns a vector with same direction and magnitude of 1', () => {
      const n1 = vector1.normalize();
      const n2 = vector2.normalize();
      const n3 = vector3.normalize();
      const n4 = vector4.normalize();
      expect(n1.x).toBe(1 / Math.sqrt(2));
      expect(n1.y).toBe(1 / Math.sqrt(2));
      expect(n4.x).toBe(0);
      expect(n4.y).toBe(1);
      expect(n1.magnitude()).toBeCloseTo(1);
      expect(n2.magnitude()).toBeCloseTo(1);
      expect(n3.magnitude()).toBeCloseTo(1);
      expect(n4.magnitude()).toBe(1);
    });
  });

  describe('direction', () => {
    it('returns the angle of a vector in quadrant I', () => {
      expect(vector1.direction()).toBeCloseTo(Math.PI / 4);
      expect(vector2.direction()).toBeCloseTo(Math.PI / 4);
      expect(vector4.direction()).toBeCloseTo(Math.PI / 2);
    });
    it('returns the angle of a vector in quadrant II', () => {
      expect(vector3.direction()).toBeCloseTo((3 * Math.PI) / 4);
    });
    it('returns the angle of a vector in quadrant III', () => {
      expect(new Vector2(-1, -1).direction()).toBeCloseTo((-3 / 4) * Math.PI);
    });
    it('returns the angle of a vector in quadrant IV', () => {
      expect(new Vector2(1, -1).direction()).toBeCloseTo(-Math.PI / 4);
    });
  });
});
