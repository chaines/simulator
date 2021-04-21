import React from 'react';
import Icon from './Icon';

const GraphIcon = ({ active = false, onClick }) => (
  <Icon active={active} onClick={onClick} text="Graphs" color="purple">
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      className="w-8 h-8  fill-current text-inherit mx-auto"
    >
      <g>
        <g>
          <path
            d="M484.295,445.96v-0.215H111.034c-30.647,0-55.495-24.762-55.624-55.409v-352c0-15.291-12.413-27.705-27.705-27.705
			S0,23.044,0,38.336v352c0,61.315,49.718,111.034,111.034,111.034h373.262c15.291,0,27.705-12.413,27.705-27.705
			S499.587,445.96,484.295,445.96z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M450.792,127.678c-12.285-9.192-29.681-6.701-38.872,5.584l-64.43,92.349l-91.06-68.51
			c-12.22-9.192-29.595-6.744-38.787,5.477c-0.022,0.043-0.043,0.064-0.086,0.107L138.309,276.51
			c-9.256,12.177-6.872,29.573,5.305,38.83c4.66,3.544,10.33,5.519,16.172,5.627c0,0,0,0.644,0,0.644
			c8.483-0.236,16.408-4.36,21.477-11.168l64.43-92.349l91.06,68.51c12.22,9.192,29.595,6.744,38.787-5.477
			c0.021-0.043,0.043-0.064,0.086-0.107l80.752-114.47C465.568,154.266,463.077,136.87,450.792,127.678z"
          />
        </g>
      </g>
    </svg>
  </Icon>
);

export default GraphIcon;