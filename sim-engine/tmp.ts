import SimLoop, { Agent } from './src';
import BasicAgent from './src/agents/BasicAgent';

const loop = SimLoop(true, (f) => setTimeout(f, 50));

for (let i = 0; i < 10; i++) {
  let x = Math.floor(Math.random() * 100);
  let y = Math.floor(Math.random() * 100);
  const a = new BasicAgent([x, y]);
  loop.addAgent(a);
}

let day = 0;
const onLoop = (arg0: readonly Agent[]) => {
  day++;
  console.log(`Day ${day}:`);
  for (let agent of arg0) {
    console.log(agent.x + ', ' + agent.y);
  }
};

loop.onLoop(onLoop);
loop.start();
