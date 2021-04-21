import BaseWorld from '@simulation-engine/worlds/BaseWorld';
import { Entity } from '@simulation-engine/types';
import HungryAgent, { HungryAgentStatus } from './HungryAgent';
import { Food } from '@simulation-engine/objects';

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
  public _foodPerCycle: number;
  private _initialPopSize: number;
  private _initialPopSettings: {};

  constructor({
    x,
    y,
    foodPerCycle,
    initialPopSize,
    initialPopSettings,
    initialize = true,
  }: GeneticDriftWorldOptions) {
    super({ x, y });
    this._foodPerCycle = foodPerCycle ?? 20;
    this._initialPopSize = initialPopSize ?? 10;
    this._initialPopSettings = {
      size: initialPopSettings?.size ?? 1,
      speed: initialPopSettings?.speed ?? 1,
      detectionRange: initialPopSettings?.detectionRange ?? 3,
      mutationRate: initialPopSettings?.mutationRate ?? 1,
    };

    if (initialize) this.init();
  }

  init() {
    let newEntities: Entity[] = [];
    for (let i = 0; i < this._initialPopSize; i++) {
      newEntities.push(
        new HungryAgent({ coords: this.generateSpawnPoint(), ...this._initialPopSettings }, this)
      );
    }
    for (let i = 0; i < this._foodPerCycle; i++) {
      newEntities.push(new Food(this.generateRandomPoint()));
    }

    this.entities = newEntities;
  }

  cycle() {
    let newEntities: Entity[] = [];
    (this.entities.filter((e) => HungryAgent.isAgent(e)) as HungryAgent[]).forEach((agent) => {
      agent.endCycle();
      switch (agent.status) {
        case HungryAgentStatus.ALIVE:
          newEntities.push(agent);
          break;
        case HungryAgentStatus.BREED:
          newEntities.push(agent);
          newEntities.push(agent.spawnChild());
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < this._foodPerCycle; i++) {
      newEntities.push(new Food(this.generateRandomPoint()));
    }

    this.entities = newEntities;
  }
}

export default GeneticDriftWorld;
