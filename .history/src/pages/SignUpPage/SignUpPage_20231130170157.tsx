import { useTranslation } from 'react-i18next';
import { Formik,Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function SignUpPage() {
  const { t } = useTranslation();

  return <div className='sm:w-1/2 sm:mx-auto  md:w-2/4 mdLg:w-1/2 lg:w-2/5 mx-5 min-w-max'>
    <Formik initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email(t('email.invalid'))
          .required(t('email.required')),
        password: Yup.string()
          .required(t('password.required'))
      })}
      onSubmit={(values) => {
        console.log(values);
      }}>
      <Form className='font-medium text-lg flex flex-col gap-5 w-full items-center'>
        <div className='w-full'>
          <label htmlFor='email' >{t('email.label')}</label>
          <Field name='email' type='email' placeholder={t('email.label')} className='w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all'/>
          <div className='w-full text-base text-red-500 font-semibold'>
            <ErrorMessage name='email' />
          </div>
        </div>
        <div className='w-full'>
          <label htmlFor='password' >{t('password.label')}</label>
          <Field name='password' type='password' placeholder={t('password.label')} className='w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all'/>
          <div className='w-full text-base text-red-500 font-semibold'>
            <ErrorMessage name='password' />
          </div>
        </div>
        <button type='submit' className='px-3 py-2 w-full bg-green-500 hover:bg-green-600 rounded-md text-white'>{t('LoginPage.submit.label')}</button>
      </Form>
    </Formik>
  </div>;
}

export default SignUpPage;
