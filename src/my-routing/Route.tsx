import Page1 from '../page1';
import Page2 from '../page2';

interface RouteProps {
  page: string;
}

export default function Route({ page }: RouteProps) {
  //Si nous sommes en mode hash
  //alors on remplace "#" avec "/"
  //NOTE: Ce workaround est seulement pour AppHash!!
  if (page[0] === '#') {
    page = page.replace(/^\#/, '/');
  }
  // Routes sont gérées ici
  switch (page) {
    case '/page1':
    case '/':
    case '':
      return <Page1 />;
    case '/page2':
      return <Page2 />;
    default:
      return <>404 error</>;
  }
}
