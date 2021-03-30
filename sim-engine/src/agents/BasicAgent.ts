import { Coordinates, Agent } from '..';
import World from '../worlds/BasicWorld';

class BasicAgent implements Agent {
  hunger: number;
  name: string;
  x: number;
  y: number;
  constructor([x, y]: Coordinates) {
    this.x = x;
    this.y = y;
    this.hunger = 0;
    this.name = 'Basic';
  }

  isAlive() {
    return true;
  }

  isActive() {
    return true;
  }

  act(world: World) {
    do {
      this.x += Math.random() - 0.5;
      this.y += Math.random() - 0.5;
    } while (!world.inBounds([this.x, this.y]));
    const nearby = world.getNearby([this.x, this.y], 5);
    if (nearby.length) {
      console.log('Hello friendo');
    }
  }
}

export default BasicAgent;
