import { useTranslation } from 'react-i18next';

function SignUpPage() {
  const { t } = useTranslation();

  return <h1>{t('Welcome to React')}</h1>;
}

export default SignUpPage;
