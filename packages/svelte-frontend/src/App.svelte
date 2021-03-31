<script lang="ts">
  import { BaseLoop, GeneticDriftWorld, BaseAgent, HungryAgent, PixiRenderer } from '@simulation-engine';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Graph from './components/Graph.svelte';
  export let maxGenerations = 1000;
  let world = new GeneticDriftWorld({x: 20, y: 20, foodPerCycle: 35, initialPopSize: 10});
  let renderer = new PixiRenderer();
  renderer.addSprites([{className: 'Food', url: '/static/strawberry.png'}, {className: 'HungryAgent', url: '/static/bat.png'}]);
  onMount(() => {
    document.getElementById('2drender').appendChild(renderer.app.view);
    renderer.app.resizeTo = document.getElementById('2drender');
    renderer.app.resize();
    loop.start();
  })
  let loop = new BaseLoop({ showTicks: false, fireEvents: true, tickFunc: (f) => window.requestAnimationFrame(f), world, renderer});
  let generations = writable(0);
  let avgSpeed = 0;
  let avgSense = 0;
  let countAgents = 0;
  const historicSenseData = writable([3]);
  const historicSpeedData = writable([1]);
  const historicPopulationData = writable([10]);
  loop.addEventListener('cycle', (entities) => {
    let agents: HungryAgent[] = entities.filter((e) => e instanceof BaseAgent) as HungryAgent[];
    generations.update(x => x +1);
    if($generations === maxGenerations) {
      loop.pause();
    }
    let totalSpeed = 0;
    let totalSense = 0;
    for(const a of agents) {
      totalSpeed += a.speed;
      totalSense += a.detectionRange;
    }
    countAgents = agents.length;
    avgSense = totalSense / countAgents;
    avgSpeed = totalSpeed / countAgents;
    historicSenseData.update(x => [...x, avgSense])
    historicSpeedData.update(x => [...x, avgSpeed]);
    historicPopulationData.update(x => [...x, countAgents]);
  })
  let name = 'wold';


</script>

<main>
  <h1>Hello {name}</h1>
  Generation {$generations}: {countAgents} organisms<br />
  Avg Speed: {avgSpeed} <br />
  Avg Sense: {avgSense} <br />
  <div id='2drender'></div>
  <Graph name="Speed" maxGenerations={$generations} data={historicSpeedData}/>
  <Graph name="Population" maxGenerations={$generations} data={historicPopulationData} />
  <Graph name="Sense" maxGenerations={$generations} data={historicSenseData} />
</main>