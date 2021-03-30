import World from './worlds/BasicWorld';

export type Coordinates = [number, number];

export interface Entity {
  x: number;
  y: number;
  name: string;
}

export interface Agent extends Entity {
  act: (world: World) => void;
  isAlive: () => boolean;
  isActive: () => boolean;
}
