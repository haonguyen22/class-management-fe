import { useTranslation } from 'react-i18next';

function LoginPage() {
  // return <div>Login Page</div>;
  const { t } = useTranslation();
  return <h1>{t('Welcome to React')}</h1>;
}

export default LoginPage;
