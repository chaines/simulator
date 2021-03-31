import BaseAgent from '../agents/BaseAgent';
import { Entity, Renderer } from '../types';
import BaseWorld from '../worlds/BaseWorld';
import CEvent from '../utils/Event';

export type BaseLoopOptions = {
  fireEvents?: boolean;
  tickFunc?: (arg0: any) => any;
  world?: BaseWorld;
  cycleLength?: number;
  renderer?: Renderer;
  showTicks?: boolean;
};

class BaseLoop {
  public fireEvents: boolean;
  public tickFunc: (arg0: any) => any;
  private world: BaseWorld | null;
  private agents: BaseAgent[];
  private running: boolean = false;
  private tickEvent: CEvent<Entity>;
  private cycleEvent: CEvent<Entity>;
  private cycleLength: number;
  private currStep: number;
  private renderer: Renderer | null;
  private _showTicks: boolean;
  private static NO_WORLD_ERROR = 'No world assigned to loop, cannot proceed';

  constructor({ fireEvents, tickFunc, world, cycleLength, renderer, showTicks }: BaseLoopOptions) {
    this.fireEvents = fireEvents || false;
    this.tickFunc = tickFunc === undefined ? setTimeout : tickFunc;
    this.world = world || null;
    this.agents = [];
    if (this.world !== null) {
      this.world.entities.forEach((e) => {
        if (e instanceof BaseAgent) {
          this.agents.push(e);
        }
      });
    }
    this.tickEvent = new CEvent<Entity>('tick');
    this.cycleEvent = new CEvent<Entity>('cycle');
    this.cycleLength = cycleLength || 60;
    this.currStep = 0;
    this.renderer = renderer || null;
    this._showTicks = showTicks ?? true;
  }

  private loop() {
    if (this.world === null) {
      throw new Error(BaseLoop.NO_WORLD_ERROR);
    }
    const cycleTime = this.currStep / this.cycleLength;
    for (const agent of this.agents) {
      agent.act(cycleTime);
    }
    if (this.renderer !== null) {
      this.renderer.render(this.world);
    }
    if (this.fireEvents) {
      this.tickEvent.fire(this.world.entities);
    }
    this.currStep++;
    if (this.currStep % this.cycleLength === 0) {
      // We've reached the end of the cycle
      this.currStep = 0;
      this.world.cycle();
      const newAgents: BaseAgent[] = [];
      for (let e of this.world.entities) {
        if (e instanceof BaseAgent) {
          newAgents.push(e);
        }
      }
      this.agents = newAgents;
      if (this.agents.length === 0) {
        this.running = false;
      }
      if (this.fireEvents) {
        this.cycleEvent.fire(this.world.entities);
      }
    }
    // We want to complete the 'cycle' before stopping.
    if (this.running || this.currStep) {
      this.tickFunc(this.loop.bind(this));
    }
  }

  private loopWithoutTick() {
    if (this.world === null) {
      throw new Error(BaseLoop.NO_WORLD_ERROR);
    }
    while (this.currStep !== this.cycleLength) {
      const cycleTime = this.currStep / this.cycleLength;
      for (const agent of this.agents) {
        agent.act(cycleTime);
      }
      this.currStep++;
    }
    this.currStep = 0;
    this.world.cycle();
    const newAgents: BaseAgent[] = [];
    for (let e of this.world.entities) {
      if (e instanceof BaseAgent) {
        newAgents.push(e);
      }
    }
    this.agents = newAgents;
    if (this.agents.length === 0) {
      this.running = false;
    }
    if (this.fireEvents) {
      this.cycleEvent.fire(this.world.entities);
    }
    if (this.running) {
      this.tickFunc(this.loopWithoutTick.bind(this));
    }
  }

  public addAgent(agent: BaseAgent) {
    if (!this.agents.includes(agent)) {
      this.agents.push(agent);
      this.world?.addEntity(agent);
    }
  }

  public removeAgent(agent: BaseAgent) {
    const index = this.agents.indexOf(agent);
    if (index !== -1) {
      this.agents.splice(index, 1);
      this.world?.removeEntity(agent);
    }
  }

  public getWorld() {
    return this.world;
  }

  public setWorld(w: BaseWorld) {
    this.world = w;
    for (const agent of this.agents) {
      w.addEntity(agent);
    }
  }

  public addEventListener(type: string, listener: (arg0: readonly Entity[]) => any) {
    switch (type) {
      case 'tick':
        this.tickEvent.registerCallback(listener);
        break;
      case 'cycle':
        this.cycleEvent.registerCallback(listener);
        break;
    }
  }

  public showTicks(val: boolean) {
    this._showTicks = val;
  }

  public pause() {
    this.running = false;
  }

  public resume() {
    this.start();
  }

  public start() {
    if (this.world !== null) {
      if (!this.running) {
        this.running = true;
        if (this._showTicks) {
          this.loop();
        } else {
          this.loopWithoutTick();
        }
      }
    } else {
      throw new Error(BaseLoop.NO_WORLD_ERROR);
    }
  }
}

export default BaseLoop;
