import React, { useEffect, useState, useRef, useCallback } from 'react';
import RootStore, { SimulationStatus } from '../../stores';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import Agent from './Agent';
import Food from './Food';

import './liveView.scss';

const LiveView = observer(() => {
  const container = useRef<HTMLElement>(null);
  const liveViewElement = useRef<HTMLElement>(null);

  const sizeBox = useCallback(() => {
    let newMax = Math.min(container.current.clientWidth, container.current.clientHeight);
    liveViewElement.current.style.width = newMax * 0.8 + 'px';
    liveViewElement.current.style.height = newMax * 0.8 + 'px';
  });

  useEffect(() => {
    sizeBox();
    window.addEventListener('resize', sizeBox);
  }, []);

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center items-center"
      ref={container}
    >
      <div className="relative pr-8 pb-8" ref={liveViewElement}>
        <div className="liveView">
          {RootStore.lastTick?.objects.map((food) => (
            <Food
              data={food}
              worldSize={RootStore.worldSide}
              hide={RootStore.status !== SimulationStatus.RUNNING}
            />
          ))}
          {RootStore.lastTick?.agents.map((agent) => (
            <Agent
              data={agent}
              worldSize={RootStore.worldSide}
              hide={RootStore.status !== SimulationStatus.RUNNING}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default LiveView;
