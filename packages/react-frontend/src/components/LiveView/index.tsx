import React, { useEffect, useState } from 'react';
import RootStore, { SimulationStatus } from '../../stores';
import { observer } from 'mobx-react-lite';
import Agent from './Agent';
import Food from './Food';

import './liveView.scss';

const LiveView = observer(({ generationCount, tickData }) => {
  return (
    <div className="bg-gray-700 absolute liveView__container">
      <div className="liveView">
        {tickData.objects.map((food) => (
          <Food
            data={food}
            worldSize={RootStore.worldSide}
            hide={RootStore.status !== SimulationStatus.RUNNING}
          />
        ))}
        {tickData.agents.map((agent) => (
          <Agent
            data={agent}
            worldSize={RootStore.worldSide}
            hide={RootStore.status !== SimulationStatus.RUNNING}
          />
        ))}
      </div>
    </div>
  );
});

export default LiveView;
