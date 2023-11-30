import { useEffect, useState } from 'react';
import LocaleContext from './context/localeContext';
import Routes from './routes/routes';
import i18n from './i18n';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AuthProvider } from 'react-auth-kit';

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
        <Header />
        <Routes />
        <Footer />
      </AuthProvider>
    </LocaleContext.Provider>
  );
}

export default App;
