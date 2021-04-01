<script>
  import HistoricGraph from './Graphs/SingleHistoricGraph.svelte';
  import { getContext } from 'svelte';
  import { maxGenerations } from '../stores';

  const simRunner = getContext('simRunner');

</script>

<HistoricGraph name="Sense"  data={simRunner.historicSenseData} maxX={$maxGenerations + 1} /> 
<HistoricGraph name="Speed" data={simRunner.historicSpeedData} maxX={$maxGenerations + 1} />
<HistoricGraph name="Population" data={simRunner.historicPopulationData} maxX={$maxGenerations + 1} />