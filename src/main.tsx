import React from 'react';
import { createRoot } from 'react-dom/client';
import './custom.scss';

//import App from './my-routing/AppSpa';
//import App from './my-routing/AppNaif';
//import App from './my-routing/AppHash';
//import App from './my-routing/AppHistory';
//import App from './my-routing/AppNavigate';

import App from './react-router/App';

document.documentElement.setAttribute('data-bs-theme', 'dark');

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);