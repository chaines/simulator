import { Entity } from '../types';
import Coordinates from '../utils/Coordinates';

class Food implements Entity {
  name: string = 'Food';
  constructor(public coords: Coordinates) {}
}

export default Food;
