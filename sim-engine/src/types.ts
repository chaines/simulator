import World from './worlds/BasicWorld';
import Coordinates from './utils/Coordinates';

export interface Entity {
  coords: Coordinates;
  name: string;
}

export interface Agent extends Entity {
  act: () => void;
  isAlive: () => boolean;
  isActive: () => boolean;
}
