import Page1 from '../page1';
import Page2 from '../page2';
import Counter from '../counter/Counter';

interface RouteProps {
  page: string;
}

export default function Route({ page }: RouteProps) {
  //if in hash mode
  //then replace "#" with "/"
  //NOTE: this workaround is only for AppHash!!
  if (page[0] === '#') {
    page = page.replace(/^#/, '/');
  }
  // Routes are managed here.
  // Note that page3 will do a 404.
  switch (page) {
    case '/page1':
    case '/':
    case '':
      return <Page1 />;
    case '/page2':
      return <Page2 />;
    case '/counter':
      return <Counter />;
    default:
      return <div>404 error</div>;
  }
}
