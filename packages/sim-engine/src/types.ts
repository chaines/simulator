import { Coordinates } from './utils';

export interface Entity {
  coords: Coordinates;
  name: string;
}

export interface Agent extends Entity {
  act: (cycleTime?: number) => void;
  isAlive: () => boolean;
  isActive: () => boolean;
}

export interface Object extends Entity {}

export interface World {
  x: number;
  y: number;
  entities: Entity[];
  center: Coordinates;
  addEntity: (e: Entity) => boolean;
  removeEntity: (e: Entity) => boolean;
  getNearby: (coords: Coordinates, range: number) => Entity[];
  inBounds: (coords: Coordinates) => boolean;
  generateSpawnPoint: () => Coordinates;
  generateRandomPoint: () => Coordinates;
  cycle: () => void;
}
