import { Entity } from '../types';
import Coordinates from '../utils/Coordinates';

class Food implements Entity {
  name: string;
  constructor(public coords: Coordinates) {
    this.name = 'Food';
  }
}

export default Food;
