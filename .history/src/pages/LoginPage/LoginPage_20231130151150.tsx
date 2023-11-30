import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  const { t } = useTranslation();
  return <div className='md:w-1/2 lg:w-2/6 bg-gray-400'>
    <Formik initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email(t('LoginPage.email.invalid'))
          .required(t('LoginPage.email.required')),
        password: Yup.string()
          .required(t('LoginPage.password.required'))
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}>
      <Form className='font-medium text-lg flex flex-col gap-5 w-full items-center mx-auto'>
        <div className='w-full'>
          <div className='flex items-center'>
            <label htmlFor="email" className='inline-block w-1/4'>{t('LoginPage.email.label')}</label>
            <Field name="email" type="email" className='w-full px-3 py-2 border border-gray-500 rounded-md'/>
          </div>
          <div className='w-full text-base text-red-500 font-semibold'>
            <ErrorMessage name="email" />
          </div>
        </div>
        <div className='w-full'>
          <div className='flex items-center'>
            <label htmlFor="password" className='inline-block w-1/4'>{t('LoginPage.password.label')}</label>
            <Field name="password" type="password" className='w-full px-3 py-2 border border-gray-500 rounded-md'/>
          </div>
          <div className='w-full text-base text-red-500 font-semibold'>
            <ErrorMessage name="password" />
          </div>
        </div>
        <button type="submit" className='px-3 py-2 w-full bg-blue-500 rounded-md text-white'>{t('LoginPage.submit.label')}</button>
      </Form>
    </Formik>
  </div>;
}

export default LoginPage;
