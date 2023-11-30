import { useTranslation } from 'react-i18next';import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  const { t } = useTranslation();
  return <h1 className='text-3xl'>{t('Welcome to React')}</h1>;
}

export default LoginPage;
