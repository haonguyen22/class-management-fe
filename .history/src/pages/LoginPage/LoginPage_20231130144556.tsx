import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  const { t } = useTranslation();
  return <div className='md:w-1/2 lg:w-1/4 bg-gray-400'>
    <Formik initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email(t('LoginPage.email.invalid')).required(t('LoginPage.email.required')),
        password: Yup.string().required(t('LoginPage.password.required'))
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}>
      <Form>
        <div>
          <label htmlFor="email">{t('LoginPage.email.label')}</label>
          <Field name="email" type="email" />
          <div>
            <ErrorMessage name="email" />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="password">{t('LoginPage.password.label')}</label>
            <Field name="password" type="password" />
          </div>
          <div>
            <ErrorMessage name="password" />
          </div>
        </div>
        <button type="submit">{t('LoginPage.submit.label')}</button>
      </Form>
    </Formik>
  </div>;
}

export default LoginPage;
