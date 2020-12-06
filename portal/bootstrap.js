
// import React from 'react';
import { registerApplication, start } from 'single-spa'

// const Bootstrap = () => {

  registerApplication(
    // Name of our single-spa application
    'home',
    // Our loading function
    () => import('./src/home/home.app.js'),
    // activityFunction
    (location) => location.pathname === "" || 
      location.pathname === "/" || 
      location.pathname.startsWith('/home')
  );

  // registerApplication(
  //   // Name of our single-spa application
  //   'app3',
  //   // Our loading function
  //   () => import('app3/App3'),
  //   // activityFunction
  //   (location) => location.pathname === "/app3"
  // );

  start();

// }

// export default Bootstrap;