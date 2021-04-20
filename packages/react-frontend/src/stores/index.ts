// TODO: Make RootStore.nextGeneration as non-blocking as possible (by releasing to the event loop between ticks)
//       My only current ideas on how to do this involve calling nextTick, but it runs into the concern of setting
//       _tickData over and over, which would cause rerenders in situations where we don't want them.
//       It's theoretically possible to refactor the actual *logic* of nextTick into a seperate function,
//       and leave the assignment in nextTick. - chaines (April 2021)

import { makeAutoObservable, computed, observable } from 'mobx';
import HistoricGeneration from './HistoricGeneration';
import UIStore from './UI';

import BaseLoop, { LoopData } from '@simulation-engine/loops/BaseLoop';
import GeneticDriftWorld from '../sim-engine/GeneticDriftWorld';
import HungryAgent from '../sim-engine/HungryAgent';
import { Agent, Entity } from '@simulation-engine/types';
import TickData from './TickData';

export type SimSettings = {
  worldSize?: number;
  foodPerDay?: number;
  initialPopulation?: number;
  initialAgentSize?: number;
  initialAgentSpeed?: number;
  initialAgentSense?: number;
  agentMutationRate?: number;
  dayLength?: number;
};

export enum SimulationStatus {
  UNINITIALIZED,
  RUNNING,
  WAITING,
  DEAD,
}

const defaults: SimSettings = {
  worldSize: 1000,
  foodPerDay: 50,
  initialPopulation: 50,
  initialAgentSize: 1,
  initialAgentSpeed: 2,
  initialAgentSense: 3,
  agentMutationRate: 1,
  dayLength: 100,
};

class rootStore {
  private _historicGenerationData: HistoricGeneration[] = [];
  private _tickData: TickData = new TickData([], []);
  private _status = SimulationStatus.UNINITIALIZED;
  private _generationCount = 0;
  private _world: GeneticDriftWorld;
  private _loop: BaseLoop;
  private _generator: Generator<LoopData>;
  private _foodPerDay = defaults.foodPerDay;
  private _cycleLength = defaults.dayLength;
  private _worldDimension = Math.ceil(Math.sqrt(defaults.worldSize) - 0.5);
  private _initialPopulation = defaults.initialPopulation;
  private _initialPopSettings = {
    size: defaults.initialAgentSize,
    speed: defaults.initialAgentSpeed,
    detectionRange: defaults.initialAgentSense,
    mutationRate: defaults.agentMutationRate,
  };

  //=========================
  // Getters: 'Computed'
  //=========================
  get status() {
    return this._status;
  }
  get foodPerDay() {
    return this._foodPerDay;
  }
  get worldSize() {
    return this._worldDimension * this._worldDimension;
  }
  get worldSide() {
    return this._worldDimension;
  }
  get initialPopulation() {
    return this._initialPopulation;
  }
  get initialAgentSize() {
    return this._initialPopSettings.size;
  }
  get initialAgentSpeed() {
    return this._initialPopSettings.speed;
  }
  get initialAgentSense() {
    return this._initialPopSettings.detectionRange;
  }
  get agentMutationRate() {
    return this._initialPopSettings.mutationRate;
  }
  get generationCount() {
    return this._generationCount;
  }
  get dayLength() {
    return this._cycleLength;
  }
  get historicGenerationData() {
    return this._historicGenerationData;
  }
  get lastGeneration() {
    return this._historicGenerationData[this._historicGenerationData.length - 1] ?? null;
  }
  get lastTick() {
    return this._tickData;
  }

  get nextTick() {
    if (this._status === SimulationStatus.DEAD || this._status === SimulationStatus.UNINITIALIZED)
      return null;
    let result = this._generator.next();
    if (result.done || result.value.type === 'Dead') {
      this._status = SimulationStatus.DEAD;
      return null;
    }
    if (result.value.type === 'Cycle') {
      this.addHistoricData(result.value);
      this.setTickData(result.value);
      result = this._generator.next();
      if (result.done || result.value.type === 'Dead') {
        this._status = SimulationStatus.DEAD;
        return null;
      } else {
        this._status = SimulationStatus.WAITING;
        return this.lastTick;
      }
    }
    this._status = SimulationStatus.RUNNING;
    this.setTickData(result.value);
    return this.lastTick;
  }

  get nextGeneration() {
    if (this._status === SimulationStatus.DEAD || this._status === SimulationStatus.UNINITIALIZED)
      return null;
    let result = this._generator.next();
    let lastResult = result;
    while (!result.done && result.value.type === 'Tick') {
      lastResult = result;
      result = this._generator.next();
    }
    this.setTickData(lastResult.value);
    this.addHistoricData(result.value);
    if (result.done || result.value.type === 'Dead') {
      this._status = SimulationStatus.DEAD;
    } else {
      this._status = SimulationStatus.WAITING;
    }
    return this.lastGeneration;
  }

  //=========================
  // Setters: 'Actions'
  //=========================

  set worldSize(size: number) {
    this._worldDimension = Math.ceil(Math.sqrt(size) - 0.5);
  }

  constructor() {
    makeAutoObservable(this);
  }

  initialize(settings?: SimSettings) {
    if (this._status !== SimulationStatus.UNINITIALIZED) {
      console.warn(
        'DEPRECATED: Calling initialize on an already initialized store is deprecated. Use `reset()` instead.'
      );
    }
    if (settings) this.reset(settings);
    else {
      this._status = SimulationStatus.WAITING;
      this._world = new GeneticDriftWorld({
        x: this._worldDimension,
        y: this._worldDimension,
        foodPerCycle: this._foodPerDay,
        initialPopSize: this._initialPopulation,
        initialPopSettings: this._initialPopSettings,
      });
      this._loop = new BaseLoop({
        world: this._world,
        cycleLength: this._cycleLength,
      });
      this._generator = this._loop.step();
    }
  }

  reset(settings?: SimSettings) {
    this.worldSize = settings.worldSize ?? this.worldSize;
    this._initialPopSettings = {
      size: settings.initialAgentSize ?? this._initialPopSettings.size,
      speed: settings.initialAgentSpeed ?? this._initialPopSettings.speed,
      detectionRange: settings.initialAgentSense ?? this._initialPopSettings.detectionRange,
      mutationRate: settings.agentMutationRate ?? this._initialPopSettings.mutationRate,
    };
    this._initialPopulation = settings.initialPopulation ?? this._initialPopulation;
    this._foodPerDay = settings.foodPerDay ?? this._foodPerDay;
    this._cycleLength = settings.dayLength ?? this._cycleLength;
    this._world = new GeneticDriftWorld({
      x: this._worldDimension,
      y: this._worldDimension,
      foodPerCycle: this._foodPerDay,
      initialPopSize: this._initialPopulation,
      initialPopSettings: this._initialPopSettings,
    });
    this._loop = new BaseLoop({
      world: this._world,
      cycleLength: this._cycleLength,
    });
    this._generator = this._loop.step();
    this._status = SimulationStatus.WAITING;
  }

  //=========================
  // Private Helper Functions
  //=========================

  private setTickData(data: LoopData) {
    this._tickData = new TickData(
      data.agents.map((a) => a),
      data.entities.filter((e) => !HungryAgent.isAgent(e))
    );
  }

  private addHistoricData(data: LoopData) {
    if (data.type == 'Tick') throw new Error("Day not complete, can't add generation data");
    let totalSpeed = 0;
    let totalSense = 0;
    let totalSize = 0;
    (data.agents as HungryAgent[]).forEach((agent) => {
      totalSpeed += agent.speed;
      totalSense += agent.detectionRange;
      totalSize += agent.size;
    });
    this._historicGenerationData.push(
      new HistoricGeneration({
        agents: data.agents.length,
        avgSpeed: totalSpeed / data.agents.length,
        avgSense: totalSense / data.agents.length,
        avgSize: totalSize / data.agents.length,
      })
    );
    this._generationCount++;
  }
}

const store = new rootStore();

export default store;
