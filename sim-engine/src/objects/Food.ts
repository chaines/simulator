import { Coordinates, Entity } from '../types';

class Food implements Entity {
  x: number;
  y: number;
  name: string;
  constructor([x, y]: Coordinates) {
    this.x = x;
    this.y = y;
    this.name = 'Food';
  }
}

export default Food;
