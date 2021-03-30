import { Entity } from '..';
import Coordinates from '../utils/Coordinates';

/**
 * Worlds are simple 2 dimensional planes of existence, on which agents and objects can exist.
 * Worlds must implement a getNearby() function that, given coordinates and a magnitude, returns all
 * entities in range.
 */

class World {
  x: number;
  y: number;
  entities: Entity[];
  /**
   * Creates a new generic world object
   * @param {number} x - The horizontal size of the world
   * @param {number} y - The vertical size of the world
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.entities = [];
  }

  /**
   * Adds an entity to the world, ensuring only one copy of the entity exists in the world.
   *
   * @returns true if successfully added, false otherwise
   */
  addEntity(e: Entity) {
    if (!this.entities.includes(e)) {
      this.entities.push(e);
      return true;
    }
    return false;
  }

  removeEntity(e: Entity) {
    const index = this.entities.indexOf(e);
    if (index !== -1) {
      this.entities.splice(index);
      return true;
    }
    return false;
  }

  getNearby(coords: Coordinates, range: number): Entity[] {
    const nearby: Entity[] = [];
    for (const e of this.entities) {
      const distance = coords.distanceTo(e.coords);
      if (distance <= range) {
        nearby.push(e);
      }
    }
    return nearby;
  }

  inBounds(coords: Coordinates): boolean {
    return coords.x <= this.x && coords.x >= 0 && coords.y <= this.y && coords.y >= 0;
  }
}

export default World;
