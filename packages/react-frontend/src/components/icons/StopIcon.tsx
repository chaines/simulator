import React from 'react';

export default (props) => {
  return (
    <svg className={'fill-current text-inherit ' + (props.className || '')} viewBox="0 0 24 24">
      <path d="M18,18H6V6H18V18Z" />
    </svg>
  );
};
