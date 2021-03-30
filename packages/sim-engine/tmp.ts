import GeneticDriftWorld from './src/worlds/GeneticDriftWorld';
import BaseLoop from './src/loops/BaseLoop';
import ConsoleRenderer from './src/renderers/ConsoleRenderer';
import BaseAgent from './src/agents/BaseAgent';
import HungryAgent from './src/agents/HungryAgent';

let world = new GeneticDriftWorld({ x: 25, y: 25, foodPerCycle: 200 });
let renderer = new ConsoleRenderer();
let loop = new BaseLoop({ fireEvents: true, tickFunc: setTimeout, world: world });
let generations = 0;
loop.addEventListener('cycle', (entities) => {
  let agents: HungryAgent[] = entities.filter((e) => e instanceof BaseAgent) as HungryAgent[];
  generations++;
  console.log(`Gen ${generations}`);
  console.log(agents.length);
  let totalSpeed = 0;
  let totalSize = 0;
  let totalSense = 0;
  for (const a of agents) {
    totalSpeed += a.speed;
    totalSize += a.size;
    totalSense += a.detectionRange;
  }
  console.log('Avg Speed: ', totalSpeed / agents.length);
  console.log('Avg Detection Range: ', totalSense / agents.length);
});
loop.start();
