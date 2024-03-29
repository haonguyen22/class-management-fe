import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import SignUpPage from '../pages/Auth/SignUpPage';
import { RequireAuth, useIsAuthenticated } from 'react-auth-kit';
import HomePage from '../pages/Home/HomePage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ConfirmEmailPage from '../pages/Auth/ConfirmEmailPage';
import ResetPassword from '../pages/Auth/ResetPassword';
import SocialAuth from '../pages/Auth/SocialAuthPage';
import LayoutLarge from '../common/Layout/MarginLarge';
import ClassDetail from '../pages/Class/ClassDetail';
import ClassMember from '../pages/Class/ClassMember';
import MiniDrawer from '../pages/Drawer/MiniDrawer';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import JoinClassPage from '../pages/Class/JoinClassPage';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { ClassDetailNav } from '../components/ClassDetail/ClassDetailNav';
import GradeReviewList from '../pages/Grade/GradeReview';
import GradeReviewDetail from '../pages/Grade/GradeReviewDetail';
import ClassSettingsPage from '../pages/Class/ClassSettingsPage';
import HomeworkList from '../pages/Homework/HomeworkList';
import CreateHomework from '../pages/Homework/CreateHomework';
import UserProfilePage from '../pages/User/UserProfile';
import GradeTab from '../pages/Grade/GradeTab';
import UserManagementAdminPage from '../pages/Admin/UserManagement';
import ClassManagementAdminPage from '../pages/Admin/ClassManagement';
import ClassDetailManagementPage from '../pages/Admin/ClassDetailManagement';

export const RouteList = {
  home: '/',
  login: '/login',
  signup: '/signup',
  profile: '/profile',
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
  gradeReview: '/grade',
  gradeReviewDetail: '/grade/:id',
  classSettings: '/class/:id/settings',
  classHomeworks: '/class/:id/homeworks',
  createClassHomworks: '/class/:id/homeworks/create',

  adminUsers: '/admin/users',
  adminClasses: '/admin/classes',
  adminClassDetail: '/admin/classes/:id',
};

function Routes() {
  const { fetchClasses } = useContext(GlobalContext);
  const isAuthenticate = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticate()) {
      fetchClasses();
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
              <MiniDrawer>
                <Outlet />
              </MiniDrawer>
            </RequireAuth>
          }
        >
          <Route path={RouteList.profile} element={<UserProfilePage />} />
          <Route path={RouteList.home} element={<HomePage />} />
          <Route
            element={
              <ClassDetailNav>
                <LayoutLarge>
                  <Outlet />
                </LayoutLarge>
              </ClassDetailNav>
            }
          >
            <Route path={RouteList.classDetail} element={<ClassDetail />} />
            <Route path={RouteList.classMembers} element={<ClassMember />} />
            <Route path={RouteList.classScores} element={<GradeTab />} />
            <Route path={RouteList.classHomeworks} element={<HomeworkList />} />
            <Route
              path={RouteList.createClassHomworks}
              element={<CreateHomework />}
            />
            <Route
              path={RouteList.classSettings}
              element={<ClassSettingsPage />}
            />
            <Route
              path={RouteList.classSettings}
              element={<ClassSettingsPage />}
            />
          </Route>
          <Route path={RouteList.gradeReview}>
            <Route path="" element={<GradeReviewList />} />
            <Route
              path={RouteList.gradeReviewDetail}
              element={<GradeReviewDetail />}
            />
          </Route>
          <Route
            path={RouteList.adminUsers}
            element={<UserManagementAdminPage />}
          />
          <Route
            path={RouteList.adminClasses}
            element={<ClassManagementAdminPage />}
          />
          <Route
            path={RouteList.adminClassDetail}
            element={<ClassDetailManagementPage />}
          />
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
