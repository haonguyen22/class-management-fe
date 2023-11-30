import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignUpPage() {
  const { t } = useTranslation();

  return <>
    <Formik initialValues={{ email: '', password: '' }} validationSchema={Yup.object({
      
  </>;
}

export default SignUpPage;
