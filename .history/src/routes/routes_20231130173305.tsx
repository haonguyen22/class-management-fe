import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { PrivateRoute } from 'react-auth-kit';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <PrivateRoute loginPath="/login">
          <Route path="/" exact component={LoginPage} />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
