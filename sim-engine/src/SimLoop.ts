import { Agent, Entity } from './types';
import World from './worlds/BasicWorld';
import CEvent from './Event';
import Food from './objects/Food';

const SimLoop = (drawn?: boolean, loopFunc?: (arg0: any) => any) => {
  const agents: Agent[] = [];
  let world = new World(100, 100);
  const loopEvent = new CEvent<Entity>('loop');
  let go = false;

  // Define a default interval function. If we're displaying/rendering the simulation,
  // This should be requestAnimationFrame, otherwise we use setTimeout with no execution time.
  const interval = (f: () => void) => {
    if (loopFunc === undefined) {
      setTimeout(f);
    } else {
      loopFunc(f);
    }
  };

  const loop = () => {
    for (const a of agents) {
      a.act();
    }
    loopEvent.fire(world.entities);
    if (go) interval(loop);
  };

  return {
    addAgent: (agent: Agent) => {
      if (!agents.includes(agent)) {
        agents.push(agent);
        world.addEntity(agent);
      }
    },
    removeAgent: (agent: Agent) => {
      const index = agents.indexOf(agent);
      if (index !== -1) {
        agents.splice(index);
        world.removeEntity(agent);
      }
    },
    getWorld: () => world,
    setWorld: (w: World) => (world = w),
    pause: () => {
      go = false;
    },
    resume: () => {
      go = true;
      loop();
    },
    start: () => {
      go = true;
      loop();
    },
    onLoop: (listener: (arg0: readonly Entity[]) => any) => {
      loopEvent.registerCallback(listener);
    },
  };
};

export default SimLoop;
