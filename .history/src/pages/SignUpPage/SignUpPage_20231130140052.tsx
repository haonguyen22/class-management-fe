import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignUpPage() {
  const { t } = useTranslation();

  return <>
    <Formik initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    }} validationSchema={Yup.object({
      

  </>;
}

export default SignUpPage;
