import React from 'react';

const Icon = (props) => (
  <div
    onClick={props.onClick}
    className={`my-4 p-4 cursor-pointer hover:text-${
      props.color
    }-500 dark:hover:bg-gray-700 hover:bg-gray-100 text-gray-900 dark:text-white w-full ${
      props.active
        ? `border-l-4 border-${props.color}-600 text-${props.color}-600 dark:border-${props.color}-400 dark:text-${props.color}-400 dark:bg-gray-700 bg-gray-100`
        : ''
    }`}
  >
    {props.children}

    <div className="text-xs text-center mt-1">{props.text}</div>
  </div>
);

export default Icon;
