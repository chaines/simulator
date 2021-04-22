import React from 'react';

export default (props) => {
  return (
    <svg className={'fill-current text-inherit ' + (props.className || '')} viewBox="0 0 24 24">
      <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>
  );
};
