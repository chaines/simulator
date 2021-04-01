<script>
  import { getContext } from 'svelte';
  import { Tabs, TabList, TabPanel, Tab } from './TabbedContainer';
  import TrendGraphs from './TrendGraphs.svelte';
  import ScatterPlot from './Graphs/ScatterPlot.svelte';
  import LiveView from './LiveView.svelte';

  const simRunner = getContext('simRunner');
</script>

<div class="w-9/12 min-h-screen">
  <Tabs>
    <TabList>
      <Tab>Live View</Tab>
      <Tab>Trend Graphs</Tab>
      <Tab>Scatter Plot</Tab>
    </TabList>
  
    <TabPanel>
      <LiveView />
    </TabPanel>
  
    <TabPanel>
      
      <TrendGraphs />
    </TabPanel>
  
    <TabPanel>
      <ScatterPlot name="Speed Vs Sense" data={simRunner.currGenData} />
    </TabPanel>
  </Tabs>
</div>
