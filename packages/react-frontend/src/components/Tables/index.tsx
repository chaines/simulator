import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import RootStore from '../../stores';

import './tables.scss';

const formatNumber = (n: number): string => {
  let s = Math.floor(n * 1000) / 1000 + '';
  let [int, decimal] = s.split('.');
  decimal ??= '';
  decimal = decimal.padEnd(3, '0');
  return int + '.' + decimal;
};

const TablesView = observer(() => {
  const indexOffset = Math.max(RootStore.generationCount - RootStore.UIStore.tableSize, 0);
  const data = RootStore.historicGenerationData.slice(indexOffset).reverse();

  return (
    <div className="h-full w-full max-h-64 lg:max-h-full overflow-auto relative">
      <div className="flex sticky top-0 dark:bg-gray-700 bg-gray-100">
        <div className="flex-1">Generation</div>
        <div className="flex-1">Agents</div>
        <div className="flex-1">Speed</div>
        <div className="flex-1">Sense</div>
      </div>
      {data.map((data, i) => (
        <div className="flex border-b border-black dark:border-gray-300 bg-white dark:bg-gray-800">
          <div className="flex-1">{RootStore.generationCount - i}</div>
          <div className="flex-1">{data.agents}</div>
          <div className="flex-1">{formatNumber(data.avgSpeed)}</div>
          <div className="flex-1">{formatNumber(data.avgSense)}</div>
        </div>
      ))}
    </div>
  );
});

export default TablesView;
