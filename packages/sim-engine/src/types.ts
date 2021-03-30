import BaseWorld from './worlds/BaseWorld';
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

export interface Renderer {
  render: (w: BaseWorld) => void;
}
