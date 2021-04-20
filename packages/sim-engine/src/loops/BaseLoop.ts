import { BaseAgent } from '../agents';
import { Agent, Entity, World } from '../types';

const isAgent = BaseAgent.isAgent;

export type LoopData = {
  type: 'Tick' | 'Cycle' | 'Dead';
  agents: readonly Agent[];
  entities: readonly Entity[];
};

export type BaseLoopOptions = {
  world?: World;
  cycleLength?: number;
};

class BaseLoop {
  private world: World | null;
  private agents: Agent[];
  private cycleLength: number;
  private currStep: number;
  private static NO_WORLD_ERROR = 'No world assigned to loop, cannot proceed';

  constructor(options: BaseLoopOptions) {
    this.world = options.world ?? null;
    this.cycleLength = options.cycleLength ?? 60;
    this.currStep = 0;
    this.agents = [];
    if (this.world !== null) {
      this.agents = this.world.entities.filter(e => isAgent(e)) as Agent[];
    }
    console.log('Loop agents: ', this.agents);
  }

  public *step(): Generator<LoopData> {
    if (this.world === null) {
      throw new Error(BaseLoop.NO_WORLD_ERROR);
    }
    console.log(this.agents.length);

    while (this.agents.length !== 0) {
      do {
        yield {
          type: 'Tick',
          agents: this.agents,
          entities: this.world.entities,
        };
        const cycleTime = this.currStep / this.cycleLength;
        this.agents.forEach(agent => agent.act(cycleTime));
        this.currStep++;
      } while (this.currStep % this.cycleLength !== 0);
      this.currStep = 0;
      this.world.cycle();
      this.agents = this.world.entities.filter(e => isAgent(e)) as Agent[];
      yield {
        type: 'Cycle',
        agents: this.agents,
        entities: this.world.entities,
      };
    }
    return {
      type: 'Dead',
      agents: this.agents,
      entities: this.world.entities,
    };
  }

  public getAgents(): readonly Agent[] {
    return this.agents;
  }
}

export default BaseLoop;
