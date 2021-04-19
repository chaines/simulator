import Vector2 from '../utils/Vector2';
import { Agent } from '../types';
import Coordinates from '../utils/Coordinates';
import BaseWorld from '../worlds/BaseWorld';

class BaseAgent implements Agent {
  constructor(
    public coords: Coordinates,
    public world?: BaseWorld,
    public name: string = 'Basic',
  ) {}

  isAlive() {
    return true;
  }

  isActive() {
    return true;
  }

  act(cycleTime?: number) {
    this.checkWorld();
    this.world = this.world as BaseWorld;
    let v: Vector2;
    do {
      v = new Vector2(Math.random() - 0.5, Math.random() - 0.5);
    } while (!this.world.inBounds(this.coords.add(v)));
  }

  checkWorld() {
    if (this.world === undefined) {
      throw new Error('No world assigned to agent, cannot proceed');
    }
  }
}

export default BaseAgent;
