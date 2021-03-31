<script lang="ts">
  import { BaseLoop, GeneticDriftWorld, BaseAgent, HungryAgent, PixiRenderer } from '@simulation-engine';
  import { onMount } from 'svelte';
  let world = new GeneticDriftWorld({x: 25, y: 25, foodPerCycle: 35});
  let renderer = new PixiRenderer();
  renderer.addSprites([{className: 'Food', url: 'static/strawberry.png'}, {className: 'HungryAgent', url: 'static/bat.png'}]);
  onMount(() => {
    document.getElementById('2drender').appendChild(renderer.app.view);
    loop.start();
  })
  let loop = new BaseLoop({ fireEvents: true, tickFunc: (f) => window.setTimeout(f), world, renderer});
  let generations = 0;
  let avgSpeed = 0;
  let avgSense = 0;
  let countAgents = 0;
  loop.addEventListener('cycle', (entities) => {
    let agents: HungryAgent[] = entities.filter((e) => e instanceof BaseAgent) as HungryAgent[];
    generations++;
    let totalSpeed = 0;
    let totalSense = 0;
    for(const a of agents) {
      totalSpeed += a.speed;
      totalSense += a.detectionRange;
    }
    countAgents = agents.length;
    avgSense = totalSense / countAgents;
    avgSpeed = totalSpeed / countAgents;
  })
  let name = 'wold';


</script>

<main>
  <h1>Hello {name}</h1>
  Generation {generations}: {countAgents} organisms<br />
  Avg Speed: {avgSpeed} <br />
  Avg Sense: {avgSense} <br />
  <div id='2drender'></div>
</main>