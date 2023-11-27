import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Page } from '../models/Page';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

export const pages: Page[] = [
  {
    path: '/',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/about',
    exact: true,
    component: SignUpPage,
  },
];

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route key={path} component={component} path={path} exact={exact} />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
