import { useState } from 'react';
import LocaleContext from './context/localeContext';
import Routes from './routes/routes';
import i18n from './i18n';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on('languageChanged', () => {
    setLocale(i18n.language);
  });

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Header />
      <Routes />
      <Footer />
    </LocaleContext.Provider>
  );
}

export default App;
