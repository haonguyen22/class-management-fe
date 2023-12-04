import { useContext } from 'react';
import localeContext from '../context/localeContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import i18n from '../i18n';
import { RouteList } from '../routes/routes';
import Logo from './Logo';

function Header() {
  const { locale } = useContext(localeContext);
  const { t } = useTranslation();
  const isAuthenticate = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logOut = () => {
    signOut();
    navigate(RouteList.login);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Logo />
          <div className="flex items-center lg:order-2">
            <select
              className={
                'bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500'
              }
              value={locale}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
            </select>
            {isAuthenticate() ? (
              <button
                onClick={logOut}
                className="text-gray-800 dark:text-white hover:bg-gray-200  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none "
              >
                {t('logOut')}
              </button>
            ) : (
              <>
                <Link
                  to={'/login'}
                  className="text-gray-800 dark:text-white hover:bg-gray-200  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none "
                >
                  {t('Login')}
                </Link>
                <Link
                  to={'/signup'}
                  className="text-gray-800 dark:text-white hover:bg-gray-200  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none "
                >
                  {t('Sign up')}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;