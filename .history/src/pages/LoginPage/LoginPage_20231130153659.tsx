import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import * as Yup from 'yup';

function LoginPage() {
  const { t } = useTranslation();
  return <div className='md:w-1/2 lg:w-2/6 bg-gray-400 mx-auto'>
    <h1 className='text-4xl font-semibold text-center'>Welcome</h1>
    {/* sign in with google */}
    <div className='flex rounded-md justify-stretch border border-blue-500'>
      {/* icon */}
      <div className='bg-white rounded-l-md text-center'>
        <FcGoogle className='w-6 h-6'/>
      </div>
      {/* text */}
      <div className='text-lg font-semibold px-3 py-2 bg-blue-500 w-full text-center rounded-r-md'>{t('LoginPage.Google.label')}</div>
    </div>

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
      <Form className='font-medium text-lg flex flex-col gap-5 w-full items-center'>
        <div className='w-full'>
          <label htmlFor="email" >{t('LoginPage.email.label')}</label>
          <Field name="email" type="email" className='w-full px-3 py-2 border border-gray-500 rounded-md'/>
          <div className='w-full text-base text-red-500 font-semibold'>
            <ErrorMessage name="email" />
          </div>
        </div>
        <div className='w-full'>
          <label htmlFor="password" >{t('LoginPage.password.label')}</label>
          <Field name="password" type="password" className='w-full px-3 py-2 border border-gray-500 rounded-md'/>
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
