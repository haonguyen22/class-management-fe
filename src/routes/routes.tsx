import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { RequireAuth } from 'react-auth-kit';
import HomePage from '../pages/HomePage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ConfirmEmailPage from '../pages/Auth/ConfirmEmailPage';
import ResetPassword from '../pages/Auth/ResetPassword';
import Auth from '../pages/Auth';

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
  forgotPassword: '/forgot-password',
  confirm: '/confirm',
  auth: '/auth/success',
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
        <Route
          path={RouteList.forgotPassword}
          element={<ForgotPasswordPage />}
        />
        <Route path={RouteList.resetPassword} element={<ResetPassword />} />
        <Route path={RouteList.confirm} element={<ConfirmEmailPage />} />,
        <Route path={RouteList.auth } element={<Auth />}/>
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default Routes;
