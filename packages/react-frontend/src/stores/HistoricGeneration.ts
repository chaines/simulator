import { makeAutoObservable } from 'mobx';
import uuid from 'node-uuid';

export type HistoricGenerationData = {
  agents: number;
  avgSpeed: number;
  avgSize: number;
  avgSense: number;
};

export default class HistoricGeneration {
  agents: number;
  avgSpeed: number;
  avgSense: number;
  avgSize: number;

  constructor({ agents, avgSpeed, avgSense, avgSize }) {
    makeAutoObservable(this);
    this.agents = agents;
    this.avgSpeed = avgSpeed;
    this.avgSense = avgSense;
    this.avgSize = avgSize;
  }
}
