import React from 'react';
import RootStore from '../../stores';
import UIStore from '../../stores/UI';
import { observer } from 'mobx-react-lite';

const SettingsView = observer(() => {
  const toggleDarkMode = () => {
    UIStore.toggleDarkMode();
  };
  return (
    <div className="mt-4 overflow-auto -mx-4 p-4">
      <aside className="bg-gray-50 border border-gray-400 rounded-lg mx-auto my-6 p-6">
        <span className="font-bold">A NOTE:</span> All settings changes will happen immediately as
        you update this form. There is no save button, just change and go!
      </aside>
      <button
        className="px-4 mb-4 py-2 text-sm bg-blue-800 text-white dark:bg-yellow-600 dark:text-yellow-200"
        onClick={toggleDarkMode}
      >
        {UIStore.darkMode ? 'Day Mode' : 'Night Mode'}
      </button>
      <h3 className="ml-2 font-semibold">Simulation Settings</h3>
      <div className="border p-4 mb-4">
        <h4>Initial Simulation Settings</h4>
        <aside className="w-9/10 mx-auto my-4 bg-yellow-100 border border-yellow-300 p-4 rounded-lg text-yellow-700">
          These settings are applied when a simulation first begins. Any changes to these values
          will cause the simulation to restart
        </aside>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="initialPopulation"
            >
              Initial Population Size
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="initialPopulation"
              type="number"
              value={RootStore.initialPopulation}
              onChange={(e) => (RootStore.initialPopulation = Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="agentMutationRate"
            >
              Mutation Rate
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="agentMutationRate"
              type="number"
              value={RootStore.agentMutationRate}
              onChange={(e) => (RootStore.agentMutationRate = Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="initialSpeed"
            >
              Initial Speed
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="initialSpeed"
              type="number"
              value={RootStore.initialAgentSpeed}
              onChange={(e) => (RootStore.initialAgentSpeed = Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="initialSense"
            >
              Initial Sense
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="initialSense"
              type="number"
              value={RootStore.initialAgentSense}
              onChange={(e) => (RootStore.initialAgentSense = Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="worldSize"
            >
              World Size
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="worldSize"
              type="number"
              value={RootStore.worldSize}
              onChange={(e) => (RootStore.worldSize = Number(e.target.value))}
            />
          </div>
        </div>
        <h4>Live Simulation Settings</h4>
        <aside className="bg-gray-50 border border-gray-400 rounded-lg mx-auto my-6 p-6">
          These settings can be modified mid-simulation, though it is still recommended to stop the
          simulation while you adjust, and then resume it.
        </aside>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="foodPerDay"
            >
              Food Per Day
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="foodPerDay"
              type="number"
              value={RootStore.foodPerDay}
              onChange={(e) => (RootStore.foodPerDay = Number(e.target.value))}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="dayLength"
            >
              Day Length
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="dayLength"
              type="number"
              value={RootStore.dayLength}
              onChange={(e) => (RootStore.dayLength = Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <h3 className="ml-2 font-semibold">Graph Settings</h3>
      <div className="border p-4 mb-4">
        <aside className="bg-gray-50 border border-gray-400 rounded-lg mx-auto my-6 p-6">
          These setting affect how graphs will be rendered. Lower values will tend towards better
          performance.
        </aside>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="graphSize"
            >
              Generations in Live Graph
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="foodPerDay"
              type="number"
              value={UIStore.graphSize}
              onChange={(e) => (UIStore.graphSize = Number(e.target.value))}
            />
          </div>
          <div className="w-full flex flex-wrap p-4 my-8">
            <label
              className="w-8/12 md:w-4/12 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-right"
              htmlFor="agentTrendGraph"
            >
              Agents Trend Line
            </label>
            <input
              type="checkbox"
              id="agentTrendGraph"
              checked={UIStore.agentGraphTrend}
              onChange={(e) => (UIStore.agentGraphTrend = e.target.checked)}
              className="w-4/12 md:w-2/12"
            />
            <label
              className="w-8/12 md:w-4/12 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-right"
              htmlFor="agentRawGraph"
            >
              Agents Raw Data
            </label>
            <input
              type="checkbox"
              id="agentRawGraph"
              checked={UIStore.agentGraphRaw}
              onChange={(e) => (UIStore.agentGraphRaw = e.target.checked)}
              className="w-4/12 md:w-2/12"
            />
            <label
              className="w-8/12 md:w-4/12 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-right"
              htmlFor="speedTrendGraph"
            >
              Speed Trend Line
            </label>
            <input
              type="checkbox"
              id="speedTrendGraph"
              checked={UIStore.speedGraphTrend}
              onChange={(e) => (UIStore.speedGraphTrend = e.target.checked)}
              className="w-4/12 md:w-2/12"
            />
            <label
              className="w-8/12 md:w-4/12 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-right"
              htmlFor="speedGraphRaw"
            >
              Speed Raw Data
            </label>
            <input
              type="checkbox"
              id="speedGraphRaw"
              checked={UIStore.speedGraphRaw}
              onChange={(e) => (UIStore.speedGraphRaw = e.target.checked)}
              className="w-4/12 md:w-2/12"
            />
            <label
              className="w-8/12 md:w-4/12 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-right"
              htmlFor="senseGraphTrend"
            >
              Sense Trend Line
            </label>
            <input
              type="checkbox"
              id="senseGraphTrend"
              checked={UIStore.senseGraphTrend}
              onChange={(e) => (UIStore.senseGraphTrend = e.target.checked)}
              className="w-4/12 md:w-2/12"
            />
            <label
              className="w-8/12 md:w-4/12 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-right"
              htmlFor="senseGraphRaw"
            >
              Sense Raw Data
            </label>
            <input
              type="checkbox"
              id="senseGraphRaw"
              checked={UIStore.senseGraphRaw}
              onChange={(e) => (UIStore.senseGraphRaw = e.target.checked)}
              className="w-4/12 md:w-2/12"
            />
          </div>
        </div>
      </div>
      <h3 className="ml-2 font-semibold">Table Settings</h3>
      <div className="border p-4 mb-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="tableSize"
            >
              Maximum Table Rows
            </label>
            <input
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:bg-white focus:border-gray-500"
              id="tableSize"
              type="number"
              value={UIStore.tableSize}
              onChange={(e) => (UIStore.tableSize = Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default SettingsView;
