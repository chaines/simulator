<script>
  import { maxGenerations, visualize, worldSize, tickSpeed, foodPerCycle, initialPopSize, initialSpeed, initialSense, mutationRate} from '../stores';
  import {getContext } from 'svelte';
  let simRunner = getContext('simRunner');
  let reset = getContext('reset');
  const running = simRunner.running;
  const historicPop = simRunner.historicPopulationData;

  const go = (e) => {
    e.preventDefault();
    simRunner.init({
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
    simRunner.setRenderElement(document.getElementById('liveView'));
    simRunner.run();
  }
  const stop = (e) => {
    e.preventDefault();
    simRunner.pause();
  }
  const resume = (e) => {
    e.preventDefault();
    simRunner.run();
  }
</script>

<div class="w-3/12 min-h-screen bg-gray-700 p-10 shadow-md">
  {$maxGenerations + 1}
  {$historicPop.length}
  <div class="bg-white p-10 text-gray-800 border border-gray-900 min-h-full">
    <h1 class="text-black text-center text-2xl">Sim Engine</h1>
    <form>
      <label>Live Rendering: </label>
      <input type="checkbox" bind:checked={$visualize} /><br>
      <label>Max Generations</label>
      <input type=number bind:value={$maxGenerations} class="border border-black"/><br>
      <label>World Size:</label>
      <input type=number bind:value={$worldSize} class="border border-black"/><br>
      <label>Food per Generation: </label>
      <input type=number bind:value={$foodPerCycle} class="border border-black"/><br>
      <label>Initial Population Size: </label>
      <input type=number bind:value={$initialPopSize} class="border border-black"/><br>
      <label>Initial Speed: </label>
      <input type=number bind:value={$initialSpeed} class="border border-black"/><br>
      <label>Initial Sense: </label>
      <input type=number bind:value={$initialSense} class="border border-black"/><br>
      {#if $running} 
      <button on:click={stop} class="bg-red-500 py-5 px-8 block mx-auto text-white text-lg font-extrabold rounded-lg">Stop!</button>
      {:else if $historicPop.length > 1 }
      <button on:click={resume} class="bg-green-500 py-5 px-8 block mx-auto text-white text-lg font-extrabold rounded-lg">Continue</button>
      <button  on:click={go} class="bg-red-500 py-5 px-8 block mx-auto text-white text-lg font-extrabold rounded-lg">Reset</button>
      {:else}
      <button class="bg-green-500 py-5 px-8 block mx-auto text-white text-lg font-extrabold rounded-lg" on:click={go}>Go</button>
      {/if}
    </form>
  </div>
</div>