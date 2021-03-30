import { Entity } from '..';
import Coordinates from '../utils/Coordinates';

export type BaseWorldOptions = {
  x: number;
  y: number;
};
/**
 * Worlds are simple 2 dimensional planes of existence, on which agents and objects can exist.
 * Worlds must implement a getNearby() function that, given coordinates and a magnitude, returns all
 * entities in range.
 */

class BaseWorld {
  public x: number;
  public y: number;
  public entities: Entity[];
  public center: Coordinates;
  /**
   * Creates a new generic world object
   * @param {number} x - The horizontal size of the world
   * @param {number} y - The vertical size of the world
   */
  constructor({ x, y }: BaseWorldOptions) {
    this.x = x;
    this.y = y;
    this.center = new Coordinates(x / 2, y / 2);
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
      this.entities.splice(index, 1);
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

  /**
   * By default, this method will generate a random point on the edge of the world. I can't
   * guarantee a truly even distribution, but it should be close enough as to not skew results.
   *
   * @returns A coordinate pair on the edge of the map
   */
  generateSpawnPoint(): Coordinates {
    let spawnGen = Math.random();
    if (spawnGen >= 0.75) {
      //Left spawn
      // The idea here is we're getting a random value between 0 and .25, multiplying it by 4 to
      // get a random value between 0 and 1, and then using that as a percentage offset for the
      // spawn point on the left side of the map.
      return new Coordinates(0, Math.max((spawnGen - 0.75) * 4 * this.y - 1, 0));
    } else if (spawnGen >= 0.5) {
      //Top spawn
      return new Coordinates(Math.max((spawnGen - 0.5) * 4 * this.x - 1, 0), 0);
    } else if (spawnGen >= 0.25) {
      //Right spawn
      return new Coordinates(this.x - 1, Math.max((spawnGen - 0.25) * 4 * this.y - 1, 0));
    } else {
      // Bottom Spawn
      return new Coordinates(Math.max(spawnGen * 4 * this.x - 1, 0), this.y - 1);
    }
  }

  generateRandomPoint(): Coordinates {
    return new Coordinates(Math.random() * this.x, Math.random() * this.y);
  }

  cycle() {
    /**
     * This is where you should implement any sort of 'reset' logic that would be necessary.
     */
  }
}

export default BaseWorld;
