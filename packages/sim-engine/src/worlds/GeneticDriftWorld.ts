import BaseWorld from './BaseWorld';
import { Entity } from '../types';
import HungryAgent from '../agents/HungryAgent';
import Food from '../objects/Food';

export type GeneticDriftWorldOptions = {
  x: number;
  y: number;
  foodPerCycle?: number;
  initialPopSize?: number;
  initialPopSettings?: HungryPopSettings;
  initialize?: boolean;
};

export type HungryPopSettings = {
  size?: number;
  speed?: number;
  detectionRange?: number;
  mutationRate?: number;
};
class GeneticDriftWorld extends BaseWorld {
  public foodPerCycle: number;
  private initialPopSize: number;
  private initialPopSettings: {};
  constructor({ x, y, foodPerCycle, initialPopSize, initialPopSettings, initialize = true }: GeneticDriftWorldOptions) {
    super({ x, y });
    this.foodPerCycle = foodPerCycle || 20;
    this.initialPopSize = initialPopSize || 10;
    this.initialPopSettings = {
      size: initialPopSettings?.size ?? 1,
      speed: initialPopSettings?.speed ?? 1,
      detectionRange: initialPopSettings?.detectionRange ?? 3,
      mutationRate: initialPopSettings?.mutationRate ?? 1,
    };
    if (initialize) {
      this.init();
    }
  }

  init() {
    let newEntities: Entity[] = [];
    for (let i = 0; i < this.initialPopSize; i++) {
      newEntities.push(new HungryAgent({ coords: this.generateSpawnPoint(), ...this.initialPopSettings }, this));
    }
    for (let i = 0; i < this.foodPerCycle; i++) {
      newEntities.push(new Food(this.generateRandomPoint()));
    }

    this.entities = newEntities;
  }

  cycle() {
    let newEntities: Entity[] = [];
    for (const entity of this.entities) {
      if (entity instanceof HungryAgent) {
        entity.endCycle();
        switch (entity.nextStatus) {
          case HungryAgent.ALIVE:
            newEntities.push(entity);
            break;
          case HungryAgent.BREED:
            newEntities.push(entity);
            newEntities.push(entity.spawnChild());
            break;
          case HungryAgent.DEAD:
          default:
            break;
        }
      }
    }

    for (let i = 0; i < this.foodPerCycle; i++) {
      newEntities.push(new Food(this.generateRandomPoint()));
    }

    this.entities = newEntities;
  }
}

export default GeneticDriftWorld;
