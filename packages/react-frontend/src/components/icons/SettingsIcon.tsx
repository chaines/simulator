import React from 'react';
import Icon from './Icon';

const SettingsIcon = ({ active = false, onClick }) => (
  <Icon active={active} onClick={onClick} color="blue" text="Settings">
    <svg viewBox="0 0 512 512" className="h-8 w-8 fill-current text-inherit mx-auto">
      <g>
        <g>
          <g>
            <path
              d="M207,200c0-11.046-8.954-20-20-20h-80c-11.046,0-20,8.954-20,20v35.878H0v40h87V310c0,11.046,8.954,20,20,20h80
				c11.046,0,20-8.954,20-20v-34.122h305v-40H207V200z M167,290h-40v-70h40V290z"
            />
            <path
              d="M431,382c0-11.046-8.954-20-20-20h-80c-11.046,0-20,8.954-20,20v35H0v40h311v35c0,11.046,8.954,20,20,20h80
				c11.046,0,20-8.954,20-20v-35h81v-40h-81V382z M391,472h-40v-70h40V472z"
            />
            <path
              d="M433,56V20c0-11.046-8.954-20-20-20h-80c-11.046,0-20,8.954-20,20v36H0v40h313v34c0,11.046,8.954,20,20,20h80
				c11.046,0,20-8.954,20-20V96h79V56H433z M393,110h-40V40h40V110z"
            />
          </g>
        </g>
      </g>
    </svg>
  </Icon>
);

export default SettingsIcon;
