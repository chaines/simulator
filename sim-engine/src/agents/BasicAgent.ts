import Vector2 from '../utils/Vector2';
import { Agent } from '..';
import Coordinates from '../utils/Coordinates';
import BasicWorld from '../worlds/BasicWorld';

class BasicAgent implements Agent {
  hunger: number;
  name: string;
  constructor(public coords: Coordinates, public world?: BasicWorld) {
    this.hunger = 0;
    this.name = 'Basic';
  }

  isAlive() {
    return true;
  }

  isActive() {
    return true;
  }

  act() {
    if (this.world === undefined) {
      return;
    }
    let v: Vector2;
    do {
      v = new Vector2(Math.random() - 0.5, Math.random() - 0.5);
    } while (!this.world.inBounds(this.coords.add(v)));
  }
}

export default BasicAgent;
