import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import { RequireAuth, useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import HomePage from '../pages/Home/HomePage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ConfirmEmailPage from '../pages/Auth/ConfirmEmailPage';
import ResetPassword from '../pages/Auth/ResetPassword';
import SocialAuth from '../pages/Auth/SocialAuthPage';
import LayoutLarge from '../common/Layout/MarginLarge';
import ClassDetail from '../pages/Class/ClassDetail';
import ClassMember from '../pages/Class/ClassMember';
import MiniDrawer from '../pages/Drawer/MiniDrawer';
import React, { useContext, useEffect } from 'react';
import { ClassContext, GlobalContext } from '../context/GlobalContext';
import JoinClassPage from '../pages/Class/JoinClassPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

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
  authGoogle: '/auth/success',
  authFacebook: '/auth/success',
  auth: '/auth/success',
  class: '/class',
  classDetail: '/class/:id/detail',
  classMembers: '/class/:id/members',
  classScores: '/class/:id/scores',
  joinClass: '/class/join',
};

function Routes() {
  const [id, setId] = React.useState<string>();
  const { fetchClasses } = useContext(GlobalContext);
  const useHeader = useAuthHeader();
  const token = useHeader().replace('Bearer ', '');
  const isAuthenticate = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticate()) {
      fetchClasses(token);
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path={RouteList.login} element={<LoginPage />} />,
          <Route path={RouteList.signup} element={<SignUpPage />} />,
          <Route path={RouteList.resetPassword} element={<ResetPassword />} />
          <Route path={RouteList.confirm} element={<ConfirmEmailPage />} />,
          <Route path={RouteList.authGoogle} element={<SocialAuth />} />
          <Route path={RouteList.authFacebook} element={<SocialAuth />} />
          <Route path={RouteList.joinClass} element={<JoinClassPage />} />
        </Route>
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
              <ClassContext.Provider value={{ id, setId }}>
                <Nav>
                  <LayoutLarge>
                    <Outlet></Outlet>
                  </LayoutLarge>
                </Nav>
              </ClassContext.Provider>
            }
          >
            <Route path={RouteList.classDetail} element={<ClassDetail />} />
            <Route path={RouteList.classMembers} element={<ClassMember />} />
            <Route path={RouteList.classScores} element={<></>} />
          </Route>
          <Route path="test" element={<></>} />
        </Route>
        <Route
          path={RouteList.forgotPassword}
          element={<ForgotPasswordPage />}
        />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default Routes;
