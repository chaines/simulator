import React, { useEffect } from 'react';
import PrimaryLayout from './layouts/Primary';
import RootStore from '../stores';
import { observer } from 'mobx-react-lite';

const App = observer((props) => {
  useEffect(() => {
    RootStore.initialize();
  }, []);

  useEffect(() => {
    console.log('triggered');
    if (RootStore.UIStore.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [RootStore.UIStore.darkMode]);

  return (
    <div className="w-screen mx-auto">
      <PrimaryLayout />
    </div>
  );
});

export default App;
