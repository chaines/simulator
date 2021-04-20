import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import RootStore from '../stores';

import LiveView from './LiveView';

const App = observer((props) => {
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(undefined);

  useEffect(() => {
    RootStore.initialize();
  }, []);

  const handleClick = () => {
    RootStore.nextGeneration;
    RootStore.nextTick;
  };

  const nextTick = () => RootStore.nextTick;

  const run = () => {
    if (running) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setRunning(false);
    } else {
      setIntervalId(setInterval(tick, 2000 / RootStore.dayLength));
      setRunning(true);
    }
  };

  const turboRun = () => {
    if (running) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setRunning(false);
    } else {
      setIntervalId(setInterval(() => RootStore.nextGeneration, 0));
      setRunning(true);
    }
  };

  const tick = () => {
    let nextTick = RootStore.nextTick;
  };
  return (
    <div>
      Cycle Count: {RootStore.generationCount}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-3"
        onClick={handleClick}
      >
        Click
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-3"
        onClick={nextTick}
      >
        Next Tick
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-3"
        onClick={run}
      >
        {running ? 'Stop' : 'Run'}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-3"
        onClick={turboRun}
      >
        {running ? 'Stop' : 'Turbo'}
      </button>
      {RootStore.lastTick && (
        <LiveView generationCount={RootStore.generationCount} tickData={RootStore.lastTick} />
      )}
    </div>
  );
});

export default App;
