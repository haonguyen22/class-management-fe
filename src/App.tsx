import { useEffect, useState } from 'react';
import LocaleContext from './context/localeContext';
import Routes from './routes/routes';
import i18n from './i18n';
import { AuthProvider } from 'react-auth-kit';
// import LocaleContext from './context/LocaleContext';
import { GlobalContext } from './context/ClassContext';
import { IClass } from './models/IClass';
import { handleAxiosReponse } from './utils/handleReponse';
import { classService } from './services/class/ClassService';

function App() {
  const [locale, setLocale] = useState(i18n.language);
  const [classes, setClasses] = useState<Array<IClass>>([]);

  useEffect(() => {
    i18n.on('languageChanged', () => {
      setLocale(i18n.language);
    });
  }, []);

  const fetchClasses = async (token: string) => {
    setClasses([]);
    const res = await classService.getAllClass(token);
    handleAxiosReponse(res, {
      ifSuccess: (data) => {
        console.log(data?.data?.metadata);
        Array.isArray(data?.data?.metadata) &&
          setClasses(data?.data?.metadata?.map((item: IClass) => item));
      },
      ifFailed: (err) => {
        console.log(err.message);
      },
    });
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <GlobalContext.Provider value={{ classes, setClasses, fetchClasses }}>
        <AuthProvider
          authName={'_auth'}
          authType={'cookie'}
          cookieDomain={window.location.hostname}
          cookieSecure={true}
        >
          <Routes />
        </AuthProvider>
      </GlobalContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
