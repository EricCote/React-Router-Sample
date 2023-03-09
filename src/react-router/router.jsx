import { createBrowserRouter, defer } from 'react-router-dom';
import Compteur from '../compteur/Compteur';
import Page1 from '../page1';
import Page2 from '../page2';
import Films from '../films/indexWithSort';
import Root from './Root';
import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,

    errorElement: <ErrorBoundary />,

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
        loader: loaderSimple,
      },
    ],
  },
]);

export default router;

async function loaderSimple({ request }) {
  return fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50');
}

async function loaderWithErrorHandling({ request }) {
  let res;
  try {
    res = await fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50', {
      signal: request.signal,
    });
  } catch {
    throw new Response('Service Unavailable', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
  if (!res.ok) {
    throw new Response(res.statusText, {
      status: res.status,
      statusText: res.statusText,
    });
  }
  return res.json();
}

async function loaderWithDefer({ request }) {
  let res;
  try {
    res = await fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50', {
      signal: request.signal,
    });
  } catch {
    throw new Response('Service Unavailable', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
  if (!res.ok) {
    throw new Response(res.statusText, {
      status: res.status,
      statusText: res.statusText,
    });
  }
  return defer({ films: res.json() });
}
