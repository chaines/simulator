import React from 'react';

const Food = ({ data, worldSize, hide }) => (
  <div
    className="liveView__object--food"
    style={{
      left: (data.coords.x * 100) / worldSize + '%',
      top: (data.coords.y * 100) / worldSize + '%',
      opacity: hide ? 0 : 1,
    }}
  >
    <div className="blueberry"></div>
  </div>
);

export default Food;
