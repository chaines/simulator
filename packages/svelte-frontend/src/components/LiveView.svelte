<script>
  import { getContext, onMount } from 'svelte';
  import { visualize } from '../stores';

  let simRunner = getContext('simRunner');
  let running = simRunner.running;
  let histPop = simRunner.historicPopulationData;

  onMount(() => {
    simRunner.setRenderElement(document.getElementById('liveView'));
  })

</script>

<div class="flex w-full min-h-full justify-center items-center relative">
  <div class="relative">
    {#if !$visualize}
      <div class="absolute w-full h-full text-center flex justify-center items-center">
        You don't currently have live rendering enabled. You can enable it in the side panel
      </div>
    {/if}
    <div id="liveView" class="liveView"></div>
    {#if $running}
      Current organisms: ${$histPop[$histPop.length - 1]}
    {/if}
  </div>
</div>

<style>
  .liveView {
    min-width: 40vw;
    min-height: 40vw;
  }

  .liveView-container { 
    display: flex;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }
</style>