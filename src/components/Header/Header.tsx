import { useContext } from 'react';
import localeContext from '../../context/LocaleContext';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from 'react-auth-kit';
import i18n from '../../i18n';
import Logo from '../../common/Logo';
import AddClassButton from '../Class/AddClassButton';
import AccountMenu from './AccountMenu';
// import localeContext from '../context/LocaleContext';

function Header() {
  const { locale } = useContext(localeContext);
  const { t } = useTranslation();
  const isAuthenticate = useIsAuthenticated();
  const location = useLocation();

  return (
    <div>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Logo />
          <div className="flex items-center lg:order-2">
            {location.pathname === '/' && <AddClassButton />}

            <select
              className={
                'bg-gray-50 mx-2 border border-gray-300 text-gray-900 text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500'
              }
              value={locale}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="vi">Việt nam</option>
            </select>

            {isAuthenticate() ? (
              <AccountMenu />
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
                  {t('signUp')}
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
