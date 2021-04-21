import React from 'react';
import Icon from './Icon';

const TableIcon = ({ active = false, onClick }) => (
  <Icon active={active} onClick={onClick} color="green" text="Tables">
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-inherit mx-auto">
      <path d="m18.25 9h-7.25v4h7.25c.41 0 .75-.34.75-.75v-2.5c0-.41-.34-.75-.75-.75zm-13.25.75v2.5c0 .41.34.75.75.75h3.25v-4h-3.25c-.41 0-.75.34-.75.75z" />
      <path d="m18.25 15h-7.25v4h7.25c.41 0 .75-.34.75-.75v-2.5c0-.41-.34-.75-.75-.75zm-13.25.75v2.5c0 .41.34.75.75.75h3.25v-4h-3.25c-.41 0-.75.34-.75.75z" />
      <path d="m21 1h-18c-1.654 0-3 1.346-3 3v16c0 1.654 1.346 3 3 3h18c1.654 0 3-1.346 3-3v-16c0-1.654-1.346-3-3-3zm0 20h-18c-.551 0-1-.448-1-1v-14h20v14c0 .552-.449 1-1 1z" />
    </svg>
  </Icon>
);

export default TableIcon;
