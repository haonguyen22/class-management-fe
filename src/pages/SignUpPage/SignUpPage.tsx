import { useTranslation } from 'react-i18next';
import { Formik,Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../../services/auth/AuthService';
import { IResponse, ISignup } from '../../utils/interface';

function SignUpPage() {
  const { t } = useTranslation();

  const handleSignUpClick = async (value: ISignup) => {
    try {
      const res = await authService.signup(value);
      const temp = res as IResponse;
      if(temp.status === 200) {
        window.location.href = '/login';
      }

    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return <div className='sm:w-1/2 sm:mx-auto  md:w-2/4 mdLg:w-1/2 lg:w-2/5 mx-5 min-w-max'>
    <h1 className='text-4xl font-bold text-center py-10'>{t('Sign up')}</h1>
    <Formik initialValues={{
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      address: '',
      acceptTerms: false }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required(t('name.required')),
        email: Yup.string()
          .email(t('email.invalid'))
          .required(t('email.required')),
        password: Yup.string()
          .min(8, t('password.min'))
          .required(t('password.required')),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], t('confirmPassword.notMatch'))
          .required(t('confirmPassword.required')),
        phone: Yup.string()
        .matches( /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, t('phone.invalid'))
          .required(t('phone.required')),
        address: Yup.string()
          .required(t('address.required')),
        acceptTerms: Yup.boolean()
          .required(t('acceptTerms.required'))
          .oneOf([true], t('acceptTerms.required'))
      })}
      onSubmit={(values) => {
        const data: ISignup = values;
        console.log(data);
        handleSignUpClick(data);
      }}>
      {({ isSubmitting }) => (
        <Form className='font-medium text-lg flex flex-col gap-5 w-full items-center' autoComplete='off'>
          <div className='w-full'>
            <label htmlFor='name' >{t('name.label')}</label>
            <Field name='name' type='text' placeholder={t('name.label')} className='w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all'/>
            <div className='w-full text-base text-red-500 font-semibold'>
              <ErrorMessage name='name' />
            </div>
          </div>
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
          <div className='w-full'>
            <label htmlFor='confirmPassword' >{t('confirmPassword.label')}</label>
            <Field name='confirmPassword' type='password' placeholder={t('confirmPassword.label')} className='w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all'/>
            <div className='w-full text-base text-red-500 font-semibold'>
              <ErrorMessage name='confirmPassword' />
            </div>
          </div>
          <div className='w-full'>
            <label htmlFor='phone' >{t('phone.label')}</label>
            <Field name='phone' type='text' placeholder={t('phone.label')} className='w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all'/>
            <div className='w-full text-base text-red-500 font-semibold'>
              <ErrorMessage name='phone' />
            </div>
          </div>
          <div className='w-full'>
            <label htmlFor='address' >{t('address.label')}</label>
            <Field name='address' type='text' placeholder={t('address.label')} className='w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all'/>
            <div className='w-full text-base text-red-500 font-semibold'>
              <ErrorMessage name='address' />
            </div>
          </div>
          <div className='w-full flex items-center'>
            <Field name='acceptTerms' type='checkbox' className='w-5 h-5 mr-3'/>
            <label htmlFor='acceptTerms' className='text-base'>{t('acceptTerms.label')}</label>
          </div>
          <button type='submit' className='px-3 py-2 w-full bg-green-500 hover:bg-green-600 rounded-md text-white'>{
            isSubmitting ?
            <div className='flex justify-center items-center'>
              <div className='animate-spin rounded-full h-7 w-7 border-[3px] border-b-transparent border-white'></div>
            </div> :
            t('submit.label') }
            </button>
        </Form>
      )}
    </Formik>
  </div>;
}

export default SignUpPage;
