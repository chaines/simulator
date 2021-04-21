import React from 'react';
import LiveView from '../LiveView';
import TablesView from '../Tables';
import SettingsView from '../Settings';
import GraphsView from '../Graphs';
import UIStore, { Pages } from '../../stores/UI';
import { observer } from 'mobx-react-lite';

const PAGE_TITLES = ['Live View', 'Graphs', 'Tables', 'Settings'];

const Content = observer(() => {
  console.log(UIStore.currentPage);
  return (
    <div className="flex-1 dark:bg-gray-700 bg-gray-100 p-10 relative flex flex-col max-h-full">
      <h2 className="w-full text-xl font-bold">{PAGE_TITLES[UIStore.currentPage]}</h2>
      {UIStore.currentPage === Pages.LiveView && <LiveView />}
      {UIStore.currentPage === Pages.Graphs && <GraphsView />}
      {UIStore.currentPage === Pages.Settings && <SettingsView />}
      {UIStore.currentPage === Pages.Tables && <TablesView />}
    </div>
  );
});

export default Content;
