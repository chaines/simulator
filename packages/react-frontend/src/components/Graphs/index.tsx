import React from 'react';
import Graph from './Graph';
import UIStore from '../../stores/UI';

const GraphsView = () => {
  return (
    <div>
      <Graph
        attribute="agents"
        movingAverage={UIStore.agentGraphTrend}
        raw={UIStore.agentGraphRaw}
      />
      <br />
      <Graph
        attribute="avgSpeed"
        movingAverage={UIStore.speedGraphTrend}
        raw={UIStore.speedGraphRaw}
      />
      <br />
      <Graph
        attribute="avgSense"
        movingAverage={UIStore.senseGraphTrend}
        raw={UIStore.senseGraphRaw}
      />
    </div>
  );
};

export default GraphsView;
