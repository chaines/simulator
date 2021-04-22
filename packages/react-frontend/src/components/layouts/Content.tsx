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
    <div className="flex-1 dark:bg-gray-700 bg-gray-100 p-10 relative flex flex-col max-h-full order-last lg:order-none">
      <div className="h-full overflow-y-auto">
        {UIStore.currentPage === Pages.LiveView && <LiveView />}
        {UIStore.currentPage === Pages.Graphs && <GraphsView />}
        {UIStore.currentPage === Pages.Settings && <SettingsView />}
        {UIStore.currentPage === Pages.Tables && <TablesView />}
      </div>
    </div>
  );
});

export default Content;
