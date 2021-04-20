import { Agent, Entity, World } from '../types';
import Coordinates from '../utils/Coordinates';

class BaseAgent implements Agent {
  constructor(public coords: Coordinates, public world?: World, public name: string = 'Basic') {}

  isAlive() {
    return true;
  }

  isActive() {
    return true;
  }

  act(cycleTime?: number) {
    if (!this.checkWorld()) {
      throw new Error('No world assigned to agent!');
    }
  }

  checkWorld(): this is { world: World } {
    return this.world !== undefined;
  }

  static isAgent(a: Entity): a is Agent {
    return 'act' in a;
  }
}

export default BaseAgent;
