import React from 'react';
import { createRoot } from 'react-dom/client';
import './custom.scss';
import App from './AppReactRouter';
//import reportWebVitals from './reportWebVitals';

//document.documentElement.setAttribute('data-bs-theme', 'dark');

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
