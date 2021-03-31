<script lang="ts">
  import { BaseLoop, GeneticDriftWorld, BaseAgent, HungryAgent, PixiRenderer } from '@simulation-engine';
  import { onMount } from 'svelte';
  import { writable, Writable } from 'svelte/store';
  import HistoricGraph from './components/SingleHistoricGraph.svelte';
  import ScatterPlot from './components/ScatterPlot.svelte';
  export let maxGenerations = 1000;
  export let visualize = false;
  export let running: Writable<boolean> = writable(true);
  let world = new GeneticDriftWorld({x: 80, y: 60, foodPerCycle: 140, initialPopSize: 50, initialPopSettings: { mutationRate: 1, detectionRange: 3 }});
  let renderer: PixiRenderer | null = null;
  if(visualize) {
    renderer = new PixiRenderer();
    renderer.app.renderer.backgroundColor = 0x333333;
    renderer.addSprites([{className: 'Food', url: '/static/strawberry.png'}, {className: 'HungryAgent', url: '/static/bat.png'}]);
    onMount(() => {
      document.getElementById('2drender').appendChild(renderer.app.view);
      renderer.app.resizeTo = document.getElementById('2drender');
      renderer.app.resize();
    })
  }
  onMount(() => {
    loop.start();
  })
  let loop = new BaseLoop({ showTicks: visualize, fireEvents: true, tickFunc: (f) => window.requestAnimationFrame(f), world, renderer});
  let generations = writable(0);
  let avgSpeed = 0;
  let avgSense = 0;
  let countAgents = 0;

  let start = Date.now();
  const historicSenseData = writable([3]);
  const historicSpeedData = writable([1]);
  const historicPopulationData = writable([25]);
  const speedVsSense: Writable<[number, number][]> = writable([[1,1]]);
  loop.addEventListener('cycle', (entities) => {
    let currSpeeds: number[] = [];
    let currSenses: number[] = [];
    let agents: HungryAgent[] = entities.filter((e) => e instanceof BaseAgent) as HungryAgent[];
    generations.update(x => x +1);
    if($generations === maxGenerations) {
      let stop = Date.now();
      console.log(`Time to ${$generations} generations: ${Math.floor((stop - start)/10)/100}s`);
      running.set(false);
    }
    let totalSpeed = 0;
    let totalSense = 0;
    for(const a of agents) {
      currSpeeds.push(a.speed);
      currSenses.push(a.detectionRange);
      totalSpeed += a.speed;
      totalSense += a.detectionRange;
    }
    let tmp: [number, number][] = []
    for(let i = 0; i < currSpeeds.length; i++) {
      tmp.push([currSpeeds[i], currSenses[i]]);
    }
    speedVsSense.set(tmp);
    countAgents = agents.length;
    if(countAgents === 0) {
      avgSense = 0;
      avgSpeed = 0;
    } else {
      avgSense = totalSense / countAgents;
      avgSpeed = totalSpeed / countAgents;
    }
    historicSenseData.update(x => [...x, avgSense])
    historicSpeedData.update(x => [...x, avgSpeed]);
    historicPopulationData.update(x => [...x, countAgents]);
  })

  running.subscribe((val) => {
    if(!val) {
      loop.pause();
    } else {
      loop.resume();
    }
  })


</script>

<main>
  Generation {$generations}: {countAgents} organisms<br />
  Avg Speed: {avgSpeed} <br />
  Avg Sense: {avgSense} <br />
  {#if visualize} 
  <div id='2drender'></div>
  {/if}
    <HistoricGraph name="Sense" maxGenerations={maxGenerations} data={historicSenseData} liveGraph={true}/> 
    <HistoricGraph name="Population" maxGenerations={maxGenerations} data={historicPopulationData} liveGraph={false}/>
    <HistoricGraph name="Speed" maxGenerations={maxGenerations} data={historicSpeedData} liveGraph={false} />
  <!-- 
  -->
</main>