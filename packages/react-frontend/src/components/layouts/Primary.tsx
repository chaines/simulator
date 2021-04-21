import React from 'react';
import NavBar from './NavBar';
import Content from './Content';
import Information from './Information';

const PrimaryLayout = () => {
  return (
    <main className="w-full h-screen max-h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 flex flex-col text-lg">
      <div className="w-full h-16 bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 p-4 font-bold text-lg">
        Simulation Engine
      </div>
      <div className="w-full flex-1 flex min-h-0">
        <NavBar />
        <Content />
        <Information />
      </div>
      <div className="w-full h-12 bg-gray-800 text-white text-center leading-10">
        Copyright 2021 Cody Haines
      </div>
    </main>
  );
};

export default PrimaryLayout;
