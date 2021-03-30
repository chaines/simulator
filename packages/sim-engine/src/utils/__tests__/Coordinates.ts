import Coordinates from '../Coordinates';
import Vector2 from '../Vector2';

describe('Coordinates', () => {
  const c1 = new Coordinates(20, 25);
  const c2 = new Coordinates(25, 25);
  const c3 = new Coordinates(0, 0);
  const c4 = new Coordinates(-15, 45);
  const c5 = new Coordinates(20, 0);
  describe('distanceTo', () => {
    it('accurately calculates distance along one axis', () => {
      let d1 = c1.distanceTo(c5);
      let d2 = c1.distanceTo(c2);
      expect(d1).toBe(25);
      expect(d2).toBe(5);
    });
    it('accurately calculates distance along multiple axes', () => {
      let d1 = c1.distanceTo(c3);
      let d2 = c1.distanceTo(c4);
      expect(d1).toBe(Math.sqrt(1025));
      expect(d2).toBe(Math.sqrt(35 * 35 + 400));
    });
  });

  describe('add', () => {
    it('returns the appropriate translated position', () => {
      const c = c1.add(new Vector2(1, 1));
      const i = c2.add(new Vector2(-12, 4));
      expect(c.x).toBe(21);
      expect(c.y).toBe(26);
      expect(i.x).toBe(13);
      expect(i.y).toBe(29);
    });
    it("doesn't mutate the original coordinate", () => {
      const c = c1.add(new Vector2(1, 1));
      expect(c1.x).toBe(20);
      expect(c1.y).toBe(25);
    });
  });
  describe('moveX', () => {
    it('properly shifts the x value', () => {
      const c = c1.moveX(15);
      expect(c.x).toBe(35);
      expect(c.y).toBe(25);
    });

    it("doesn't mutate the original coordinate", () => {
      const c = c1.moveX(12);
      expect(c1.x).toBe(20);
      expect(c1.y).toBe(25);
    });
  });

  describe('moveY', () => {
    it('properly shifts the y value', () => {
      const c = c1.moveY(-5);
      expect(c.x).toBe(20);
      expect(c.y).toBe(20);
    });

    it("doesn't mutate the original coordinate", () => {
      const c = c1.moveY(42);
      expect(c1.x).toBe(20);
      expect(c1.y).toBe(25);
    });
  });
});
