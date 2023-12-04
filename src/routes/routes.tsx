import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { RequireAuth } from 'react-auth-kit';
import HomePage from '../pages/HomePage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export const RouteList = {
  home: '/',
  login: '/login',
  signup: '/signup',
  resetPassword: '/reset-password',
};

function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route
          path={RouteList.home}
          element={
            <RequireAuth loginPath={RouteList.login}>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path={RouteList.login} element={<LoginPage />} />,
        <Route path={RouteList.signup} element={<SignUpPage />} />,
        <Route path={RouteList.resetPassword} element={<ForgotPasswordPage />} />,
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default Routes;
