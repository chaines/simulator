<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import SimRunner from './simRunner';
  import HistoricGraph from './components/Graphs/SingleHistoricGraph.svelte';
  import { maxGenerations, visualize, worldSize, foodPerCycle, initialPopSize, initialSense, initialSpeed, mutationRate } from './stores';
  import { defaultSimRunnerSettings } from './settings';
  import Visualizations from './components/Visualizations.svelte';
  import SidePanel from './components/SidePanel.svelte';

  let simRunner = new SimRunner({
      maxGenerations: $maxGenerations,
      render: $visualize,
      worldSize: $worldSize,
      foodPerCycle: $foodPerCycle,
      initialPopSize: $initialPopSize,
      initialPopSettings: {
        speed: $initialSpeed,
        detectionRange: $initialSense,
        mutationRate: $mutationRate
      }
    });

    worldSize.subscribe(x => simRunner.worldSize = x);
    maxGenerations.subscribe(x => simRunner.maxGenerations = x);
    foodPerCycle.subscribe(x => simRunner.foodPerCycle = x);
    initialPopSize.subscribe(x => simRunner.initialPopSize = x);
    initialSpeed.subscribe(x => simRunner.initialPopSettings.speed = x);
    initialSense.subscribe(x => simRunner.initialPopSettings.detectionRange = x);
    mutationRate.subscribe(x => simRunner.initialPopSettings.mutationRate = x);

  setContext('simRunner', simRunner);
  visualize.subscribe((v) => {
    console.log( typeof v);
    if(v && simRunner) {
      simRunner.render(true);
    } else if (!v && simRunner) {
      simRunner.render(false);
    }
  });

  onMount(() => {
      //simRunner.run();
  })


</script>

<main class="text-gray-100 mx-auto font-sans h-screen overflow-hidden flex">
  <SidePanel />
  <Visualizations/>
</main>