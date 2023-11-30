import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { FaSquareFacebook } from 'react-icons/fa6';
import * as Yup from 'yup';

function LoginPage() {
  const { t } = useTranslation();
  return <div className='sm:w-1/2 sm:mx-auto  md:w-2/4 mdLg:w-1/2 lg:w-2/5 mx-5 min-w-max'>
    <h1 className='text-4xl font-bold text-center py-10'>{t('Login')}</h1>
    {/* sign in with google */}
    <div className='flex rounded-md justify-stretch border border-red-500 mb-5 min-w-fit cursor-pointer'>
      <div className='bg-white rounded-l-md w-12 items-center justify-center flex'>
        <FcGoogle className='w-6 h-6'/>
      </div>
      <div className='text-lg text-white font-semibold px-3 py-2 bg-red-500 w-full text-center rounded-r-md min-w-fit'>{t('Google.label')}</div>
    </div>
    {/* sign in with facebook */}
    <div className='flex rounded-md justify-stretch border border-blue-500 mb-5 min-w-fit cursor-pointer'>
      <div className='bg-white rounded-l-md w-12 items-center justify-center flex'>
        <FaSquareFacebook className='w-6 h-6'/>
      </div>
      <div className='text-lg text-white font-semibold px-3 py-2 bg-blue-500 w-full text-center rounded-r-md min-w-fit'>{t('Facebook.label')}</div>
    </div>

    <div className='flex items-center mb-4'>
      <hr className='flex-grow bg-gray-500 h-1 rounded-sm'/>
      <div className='mx-4 text-gray-500'>{t('Other')}</div>
      <hr className='flex-grow bg-gray-500 h-1 rounded-sm'/>
    </div>

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
        <button type='submit' className='px-3 py-2 w-full bg-green-500 hover:bg-green-600 rounded-md text-white'>{t('submit.label')}</button>
      </Form>
    </Formik>
  </div>;
}

export default LoginPage;
