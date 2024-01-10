import { useEffect, useState } from 'react';
import Routes from './routes/routes';
import i18n from './i18n';
import { AuthProvider } from 'react-auth-kit';
import { GlobalContext } from './context/GlobalContext';
import { ClassRole, IClass } from './models/IClass';
import { apiCall } from './utils/apiCall';
import { classService } from './services/class/ClassService';
import LocaleContext from './context/LocaleContext';
import { SnackbarProvider } from 'notistack';
import { userService } from './services/user/UserService';
import { INotification } from './models/User';

function App() {
  const [locale, setLocale] = useState(i18n.language);
  const [classes, setClasses] = useState<Array<IClass>>([]);
  const [classRoles, setClassRoles] = useState<ClassRole>({
    studentClass: [],
    teacherClass: [],
  });
  const [isFetchingClasses, setIsFetchingClasses] = useState(false);
  
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isFetchingNotifications, setIsFetchingNotifications] = useState(false);

  useEffect(() => {
    i18n.on('languageChanged', () => {
      setLocale(i18n.language);
    });
  }, []);

  const fetchClasses = async () => {
    setIsFetchingClasses(true);
    setClasses([]);
    await apiCall(classService.getAllClass(), {
      ifSuccess: (data) => {
        Array.isArray(data?.metadata) &&
          setClasses(data?.metadata?.map((item: IClass) => item));
      },
      ifFailed: (err) => {
        console.log(err.message);
      },
    });

    await fetchClassRoles();

    setIsFetchingClasses(false);
  };

  const fetchClassRoles = async () => {
    await apiCall(classService.classWithRole(), {
      ifSuccess: (data) => {
        setClassRoles(data.metadata as ClassRole);
      },
      ifFailed: (err) => {
        console.log(err.message);
      },
    });
  };


  const fetchNotifications = async () => {
    setIsFetchingNotifications(true);
    await apiCall(userService.getAllNotifications(), {
      ifSuccess: (data) => {
        setNotifications(
          (data.metadata as { notifications: INotification[] }).notifications,
        );
      },
      ifFailed: (err) => {
        console.log(err.message);
      },
    });
    setIsFetchingNotifications(false);
  };

  return (
    <SnackbarProvider>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <GlobalContext.Provider
          value={{
            classes,
            setClasses,
            fetchClasses,
            isFetchingClasses,
            classRoles,
            setNotifications,
            notifications,
            fetchNotifications,
            isFetchingNotifications,
          }}
        >
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
    </SnackbarProvider>
  );
}

export default App;
