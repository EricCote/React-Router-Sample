import { createBrowserRouter, defer, redirect } from 'react-router-dom';
import Compteur from '../compteur/Compteur';
import Page1 from '../page1';
import Page2 from '../page2';
import FilmsRouter, {
  loaderSimple,
  loaderWithErrorHandling,
} from '../marvel/reactrouter/RouteWithLoader';
import FilmsServer, { loaderWithServerSort } from '../marvel/serverside';
import Thrones, { loaderSimpleThrones } from '../thrones';
import Root from './Root';
// import Root from './Animated-Root';
import ErrorBoundary from './ErrorBoundary';
import ContactApi, { actionContact } from '../contacts/ContactsApi';
import Contacts from '../contacts';
import Details, { ContactWithDetails } from '../contacts/Details';
import FilmsReact from '../marvel/reactstate/FilterSort';
import FilmsDefer, { loaderDefer } from '../marvel/reactrouter/RouteWithDefer';
import FilmsSimple from '../marvel/reactstate/Simple1';
import FilmsRoutingUrl from '../marvel/reactrouter/indexWithRoutingUrl';

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
        path: '/marvel/simplereact',
        element: <FilmsSimple />,
      },
      {
        path: '/marvel/classic',
        element: <FilmsReact />,
      },
      {
        path: '/marvel/router',
        element: <FilmsRouter />,
        loader: loaderSimple,
      },
      {
        path: '/marvel/url',
        element: <FilmsRoutingUrl />,
        loader: loaderWithErrorHandling,
      },
      {
        path: '/marvel/defer',
        element: <FilmsDefer />,
        loader: loaderDefer,
      },
      {
        path: '/marvel/server/:page?',
        element: <FilmsServer />,
        loader: loaderWithServerSort,
      },

      {
        path: '/thrones',
        element: <Thrones />,
        loader: loaderSimpleThrones,
      },
      {
        path: '/contacts',
        element: <Contacts />,
        loader: ContactApi.getAllContacts,
      },
      {
        path: '/contacts/details/:id',
        element: <Details />,
        loader: async ({ params }) => {
          let data = (await ContactApi.getContact(
            params.id ?? ''
          )) as ContactWithDetails;
          data.formErrors = {};
          return data;
        },
        action: actionContact,
      },
      {
        path: '/contacts/details/create',
        element: <Page2 />, // <Details />,
        // loader: () => {
        //   let data = {
        //     id: 0,
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     formErrors: {},
        //   };
        //   return data;
        // },
        // action: actionContact,
      },
    ],
  },
]);

export default router;

// async function loaderSimple() {
//   return fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50');
// }
