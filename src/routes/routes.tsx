import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import { RequireAuth, useAuthHeader } from 'react-auth-kit';
import HomePage from '../pages/Home/HomePage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ConfirmEmailPage from '../pages/Auth/ConfirmEmailPage';
import ResetPassword from '../pages/Auth/ResetPassword';
import SocialAuth from '../pages/Auth/SocialAuthPage';
import Navigation from '../components/Navigation';
import LayoutLarge from '../common/Layout/MarginLarge';
import ClassDetail from '../pages/Class/ClassDetail';
import ClassMember from '../pages/Class/ClassMember';
import ListUser from '../components/ListUser';
import MiniDrawer from '../pages/Drawer/MiniDrawer';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

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
  class: '/class',
  classDetail: '/class/:id/detail',
  classMembers: '/class/:id/members',
  classScores: '/class/:id/scores',
};

function Routes() {
  const { fetchClasses } = useContext(GlobalContext);
  const useHeader = useAuthHeader();
  const token = useHeader().replace('Bearer ', '');
  useEffect(() => {
    fetchClasses(token);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={RouteList.login} element={<LoginPage />} />,
        <Route path={RouteList.signup} element={<SignUpPage />} />,
        <Route
          element={
            <RequireAuth loginPath={RouteList.login}>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path={RouteList.home} element={<HomePage />} />
          <Route
            element={
              <Navigation>
                <LayoutLarge>
                  <Outlet />
                </LayoutLarge>
              </Navigation>
            }
          >
            <Route path={RouteList.classDetail} element={<ClassDetail />} />
            <Route path={RouteList.classMembers} element={<ClassMember />} />
            <Route path={RouteList.classScores} element={<></>} />
          </Route>
          <Route path="test" element={<ListUser />} />
        </Route>
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
