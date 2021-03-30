import { Agent } from '.';
class CEvent<T> {
  name: string;
  callbacks: ((arg0: readonly T[]) => any | void)[];

  constructor(name: string) {
    this.name = name;
    this.callbacks = [];
  }

  registerCallback(callback: (arg0: readonly T[]) => any | void) {
    this.callbacks.push(callback);
  }

  fire(data: T[]) {
    this.callbacks.forEach((cb) => cb(data));
  }
}

export default CEvent;
