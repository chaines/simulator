import React, { useEffect } from 'react';
import GeneticDriftWorld from '../../../packages/sim-engine/worlds/GeneticDriftWorld';
import BaseLoop from '../../../packages/sim-engine/loops/BaseLoop';
import HungryAgent from '../../../packages/sim-engine/agents/HungryAgent';

const App = (props) => {
  useEffect(() => {
    let world = new GeneticDriftWorld({ x: 25, y: 25, foodPerCycle: 200 });
    let loop = new BaseLoop({ fireEvents: true, tickFunc: requestAnimationFrame, world: world });
    let generations = 0;
    console.log = document.getElementById('renderer-output').append;
    loop.addEventListener('cycle', (entities) => {
      let agents: HungryAgent[] = entities.filter((e) => e instanceof BaseAgent) as HungryAgent[];
      generations++;
      console.log(`Gen ${generations}`);
      console.log(agents.length);
      let totalSpeed = 0;
      let totalSense = 0;
      for (const a of agents) {
        totalSpeed += a.speed;
        totalSense += a.detectionRange;
      }
      console.log('Avg Speed: ', totalSpeed / agents.length);
      console.log('Avg Detection Range: ', totalSense / agents.length);
    });
  }, []);
  return (
    <div>
      Hello, World!
      <div id="renderer-output"></div>
    </div>
  );
};

export default App;
