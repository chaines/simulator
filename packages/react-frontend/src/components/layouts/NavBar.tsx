import React from 'react';
import GraphIcon from '../icons/GraphIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';
import TableIcon from '../icons/TableIcon';
import SettingsIcon from '../icons/SettingsIcon';
import UIStore, { Pages } from '../../stores/UI';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
  console.log(UIStore.currentPage);
  console.log(Pages['LiveView']);
  return (
    <div className="lg:w-24 bg-gray-300 dark:bg-gray-900 flex lg:flex-col sticky top-0 lg:relative z-10">
      <MagnifyingGlassIcon
        active={UIStore.currentPage === Pages.LiveView}
        onClick={() => (UIStore.currentPage = Pages.LiveView)}
      />
      <GraphIcon
        active={UIStore.currentPage === Pages.Graphs}
        onClick={() => (UIStore.currentPage = Pages.Graphs)}
      />
      <TableIcon
        active={UIStore.currentPage === Pages.Tables}
        onClick={() => (UIStore.currentPage = Pages.Tables)}
      />
      <SettingsIcon
        active={UIStore.currentPage === Pages.Settings}
        onClick={() => (UIStore.currentPage = Pages.Settings)}
      />
    </div>
  );
});

export default NavBar;
