import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../../services/auth/AuthService';
import { IError, IErrorResponse, IResponse } from '../../models/IAxiosResponse';
import { useEffect, useState } from 'react';
import BackToHome from '../../components/BackToHome/BackToHome';

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (error != '') {
      setMessage('');
    }
  }, [error]);

  useEffect(() => {
    if (message != '') {
      setError('');
    }
  }, [message]);

  return (
    <div className="sm:w-1/2 sm:mx-auto  md:w-2/4 mdLg:w-1/2 lg:w-2/5 mx-5 min-w-max">
      <h1 className="text-4xl font-bold text-center py-10">
        {t('forgotPassword')}
      </h1>
      <p className="text-lg font-bold text-center pb-10 text-gray-500">
        {t('weWillSendYouResetPassword')}
      </p>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(t('email.invalid'))
            .required(t('email.required')),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await authService.resetPassword(values.email);
            const temp = res as IResponse;
            let response;
            if (temp.status === undefined || temp.data === undefined) {
              response = res as IError<IErrorResponse>;
              setError(response?.response?.data?.message ?? response?.message);
            } else {
              response = temp;
              if (response.status === 200) {
                setMessage(response.data.message as string);
              }
            }
            setSubmitting(false);
          } catch (error) {
            console.error('Error calling API:', error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className="font-medium text-lg flex flex-col gap-5 w-full items-center"
            autoComplete="off"
          >
            <div className="w-full">
              <label htmlFor="email">{t('email.label')}</label>
              <Field
                name="email"
                type="email"
                placeholder={t('email.label')}
                className="w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all"
              />
              <div className="w-full text-base text-red-500 font-semibold">
                <ErrorMessage name="email" />
              </div>
            </div>

            {message != '' && (
              <div className="w-full text-center text-green-500 font-semibold">
                {message}
              </div>
            )}

            {error != '' && (
              <div className="w-full text-center text-red-500 font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="px-3 py-2 w-full bg-green-500 hover:bg-green-600 rounded-md text-white"
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-7 w-7 border-[3px] border-b-transparent border-white"></div>
                </div>
              ) : (
                t('resetPassword')
              )}
            </button>
          </Form>
        )}
      </Formik>
      <BackToHome />
    </div>
  );
}

export default ForgotPasswordPage;
