import React from 'react';
import { HungryAgentStatus } from '../../sim-engine/HungryAgent';

const Food = ({ data, worldSize, hide }) => (
  <div
    className={
      'liveView__agent' +
      (hide ? ' hide' : '') +
      (data.status === HungryAgentStatus.DEAD ? ' dead' : '')
    }
    style={{
      left: (data.coords.x * 100) / worldSize + '%',
      top: (data.coords.y * 100) / worldSize + '%',
    }}
  ></div>
);

export default Food;
