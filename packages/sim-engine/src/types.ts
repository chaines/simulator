import { Coordinates } from './utils';

export interface Entity {
  coords: Coordinates;
  name: string;
}

export interface Agent extends Entity {
  act: () => void;
  isAlive: () => boolean;
  isActive: () => boolean;
}
