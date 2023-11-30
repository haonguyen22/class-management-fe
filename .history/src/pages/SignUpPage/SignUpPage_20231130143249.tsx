import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignUpPage() {
  const { t } = useTranslation();

  return <h1>{t('Welcome to React')}</h1>;
}

export default SignUpPage;
