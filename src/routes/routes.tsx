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

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />,
        <Route path="/signup" element={<SignUpPage />} />,
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default Routes;
