import React from 'react';

export default (props) => {
  return (
    <svg className={'fill-current text-inherit ' + (props.className || '')} viewBox="0 0 24 24">
      <path d="M5,5V19H8V5M10,5V19L21,12" />
    </svg>
  );
};
