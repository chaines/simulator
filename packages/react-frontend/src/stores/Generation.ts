import { makeAutoObservable } from 'mobx';
import uuid from 'node-uuid';

export class GenerationStore {
  constructor(public rootStore) {
    makeAutoObservable(this);
  }
}
export default class Generation {
  constructor(store, id = uuid.v4()) {
    makeAutoObservable(this);
  }
}
