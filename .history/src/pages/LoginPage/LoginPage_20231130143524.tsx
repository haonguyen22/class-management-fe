import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  const { t } = useTranslation();
  return <>
    <Formik initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}>
      <Form>
        <div>
          <label htmlFor="email">{t('Email Address')}</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
        </div>
        <label htmlFor="password">{t('Password')}</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />
        <button type="submit">{t('Submit')}</button>
      </Form>
    </Formik>
  </>;
}

export default LoginPage;
