import React from 'react';

export default (props) => {
  return (
    <svg className={'fill-current text-inherit ' + (props.className || '')} viewBox="0 0 24 24">
      <path d="M13,6V18L21.5,12M4,18L12.5,12L4,6V18Z" />
    </svg>
  );
};
