import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import { RequireAuth } from 'react-auth-kit';
import HomePage from '../pages/Home/HomePage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ConfirmEmailPage from '../pages/Auth/ConfirmEmailPage';
import ResetPassword from '../pages/Auth/ResetPassword';
import SocialAuth from '../pages/Auth';
import MiniDrawer from '../pages/Drawer/MiniDrawer';

function Layout() {
  return (
    <MiniDrawer>
      <Outlet />
    </MiniDrawer>
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
        <Route path={RouteList.auth} element={<SocialAuth />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default Routes;
