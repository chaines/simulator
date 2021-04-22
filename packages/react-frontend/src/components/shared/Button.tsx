import React from 'react';

export default (props) => {
  return (
    <button
      onClick={props.onClick}
      className={'px-4 py-2 rounded mx-2 lg:mx-auto lg:w-4/5 lg:my-2 ' + (props.className || '')}
    >
      {props.children}
    </button>
  );
};
