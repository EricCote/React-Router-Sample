import { createBrowserRouter } from 'react-router-dom';
import Compteur from '../compteur/Compteur';
import Page1 from '../page1';
import Page2 from '../page2';
import Films from '../films';
import Root from './Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Page1 />,
      },
      {
        path: '/page1',
        element: <Page1 />,
      },
      {
        path: '/page2',
        element: <Page2 />,
      },
      {
        path: '/compteur',
        element: <Compteur />,
      },
      {
        path: '/films',
        element: <Films />,
      },
      {
        element: <div>Erreur 404</div>,
      },
    ],
  },
]);

export default router;
