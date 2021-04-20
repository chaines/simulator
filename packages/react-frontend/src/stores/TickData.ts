import { makeAutoObservable } from 'mobx';

export default class TickData {
  constructor(public agents, public objects) {
    makeAutoObservable(this);
  }
}
