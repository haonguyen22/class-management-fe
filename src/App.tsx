import { useEffect, useState } from 'react';
import Routes from './routes/routes';
import i18n from './i18n';
import { AuthProvider } from 'react-auth-kit';
import { LocaleContext } from './context/LocaleContext';

function App() {
  const [locale, setLocale] = useState(i18n.language);

  useEffect(() => {
    i18n.on('languageChanged', () => {
      setLocale(i18n.language);
    });
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <AuthProvider
        authName={'_auth'}
        authType={'cookie'}
        cookieDomain={window.location.hostname}
        cookieSecure={true}
      >
        <Routes />
      </AuthProvider>
    </LocaleContext.Provider>
  );
}

export default App;
