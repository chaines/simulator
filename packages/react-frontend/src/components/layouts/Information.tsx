import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import RootStore from '../../stores';

const Information = observer(() => {
  const tick = useCallback(() => {
    RootStore.nextTick;
  }, []);
  const generationTick = useCallback(() => {
    RootStore.nextGeneration;
    RootStore.nextTick;
  }, []);
  const runGenerations = useCallback(() => {
    if (RootStore.UIStore.running) {
      clearInterval(RootStore.UIStore.intervalId);
      RootStore.UIStore.running = false;
    } else {
      RootStore.UIStore.running = true;
      RootStore.UIStore.intervalId = Number(setInterval(() => RootStore.nextGeneration, 0));
    }
  }, []);
  const runTicks = useCallback(() => {
    if (RootStore.UIStore.running) {
      clearInterval(RootStore.UIStore.intervalId);
      RootStore.UIStore.running = false;
    } else {
      RootStore.UIStore.running = true;
      RootStore.UIStore.intervalId = Number(
        setInterval(() => {
          RootStore.nextTick;
        }, 50)
      );
    }
  }, []);

  const reset = useCallback(() => {
    RootStore.reset();
  }, []);

  return (
    <div className="w-3/12 p-10 bg-gray-200 dark:bg-gray-800">
      <h2 className="text-center text-lg font-bold border-b border-black dark:border-white">
        Information
      </h2>
      <div>Generation Count: {RootStore.generationCount}</div>
      <h2 className="text-center text-lg font-bold border-b border-black dark:border-white">
        Controls
      </h2>
      <div className="flex flex-col mb-4">
        {RootStore.UIStore.running ? (
          <button onClick={runGenerations} className="w-4/5 py-2 bg-red-500 rounded mx-auto my-2">
            Stop
          </button>
        ) : (
          <>
            <button
              onClick={generationTick}
              className="w-4/5 py-2 bg-blue-500 rounded mx-auto my-2"
            >
              Next Generation
            </button>

            <button onClick={runTicks} className="w-4/5 py-2 bg-blue-500 rounded mx-auto my-2">
              Run
            </button>
            <button
              onClick={runGenerations}
              className="w-4/5 py-2 bg-blue-500 rounded mx-auto my-2"
            >
              TURBO
            </button>
            {!!RootStore.generationCount && (
              <button onClick={reset} className="w-4/5 py-2 bg-red-500 rounded mx-auto my-2">
                Reset
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default Information;
