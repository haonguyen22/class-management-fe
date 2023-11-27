import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function SignUpPage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('vi');
  }, [i18n]);

  return <h1>{t('Welcome to React')}</h1>;
}

export default SignUpPage;
