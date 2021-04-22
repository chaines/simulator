import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import RootStore from '../../stores';
import PlayIcon from '../icons/PlayIcon';
import FastForwardIcon from '../icons/FastForwardIcon';
import StepForwardIcon from '../icons/StepForwardIcon';
import StopIcon from '../icons/StopIcon';
import RestartIcon from '../icons/RestartIcon';
import Button from '../shared/Button';

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
    <div className="w-full lg:w-3/12 p-4 lg:p-10 bg-gray-200 dark:bg-gray-800">
      <h2 className="hidden lg:block text-center text-lg font-bold border-b border-black dark:border-white">
        Information
      </h2>
      <div className="text-center lg:text-left">Generation Count: {RootStore.generationCount}</div>
      <h2 className="text-center text-lg font-bold border-b border-black dark:border-white hidden lg:block">
        Controls
      </h2>
      <div className="flex w-full py-4 lg:px-4 -mx-4 box-content bg-gray-200 dark:bg-gray-800 fixed z-50 bottom-0 lg:relative justify-center lg:justify-start lg:flex-col lg:mb-4 text-white">
        {RootStore.UIStore.running ? (
          <Button onClick={runGenerations} className="bg-red-500">
            <StopIcon className="w-8 h-8 inline-block" />
          </Button>
        ) : (
          <>
            <Button onClick={generationTick} className="bg-blue-500">
              <StepForwardIcon className="w-8 h-8 inline-block" />
            </Button>

            <Button onClick={runTicks} className=" bg-green-500">
              <PlayIcon className="w-8 h-8 inline-block" />
            </Button>
            <Button onClick={runGenerations} className="bg-yellow-500">
              <FastForwardIcon className="w-8 h-8 inline-block" />
            </Button>
            {!!RootStore.generationCount && (
              <Button onClick={reset} className="bg-red-500">
                <RestartIcon className="w-8 h-8 inline-block" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default Information;
