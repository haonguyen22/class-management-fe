import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../../services/auth/AuthService';
import { IError, IErrorResponse } from '../../models/IAxiosResponse';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { handleAxiosReponse } from '../../utils/handleReponse';
import BackToHome from '../../components/BackToHome/BackToHome';

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticate = useIsAuthenticated();
  const [searchParams] = useSearchParams();

  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const token = searchParams.get('token');

  useEffect(() => {
    if (token == null) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (isAuthenticate()) {
      navigate('/');
    }
  }, [isAuthenticate, navigate]);

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

  const submitChangePassword = async (
    value: string,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const res = await authService.resetPassword(token!, value);

      handleAxiosReponse(res, {
        ifSuccess: (response) => {
          if (response.status === 200) {
            setMessage(response.data.message as string);
          }
        },
        ifFailed: (err) => {
          const response = err as IError<IErrorResponse>;
          setError(response?.response?.data?.message ?? response?.message);
        },
      });

      setSubmitting(false);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div className="sm:w-1/2 sm:mx-auto  md:w-2/4 mdLg:w-1/2 lg:w-2/5 mx-5 min-w-max">
      <h1 className="text-4xl font-bold text-center py-10">
        {t('changePassword')}
      </h1>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, t('password.min'))
            .required(t('password.required')),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('confirmPassword.notMatch'))
            .required(t('confirmPassword.required')),
        })}
        onSubmit={(values, { setSubmitting }) => {
          submitChangePassword(values.password, { setSubmitting });
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className="font-medium text-lg flex flex-col gap-5 w-full items-center"
            autoComplete="off"
          >
            <div className="w-full">
              <label htmlFor="password">{t('newPassword')}</label>
              <Field
                name="password"
                type="password"
                placeholder={t('newPassword')}
                className="w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all"
              />
              <div className="w-full text-base text-red-500 font-semibold">
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="confirmPassword">{t('confirmNewPassword')}</label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder={t('confirmNewPassword')}
                className="w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all"
              />
              <div className="w-full text-base text-red-500 font-semibold">
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>

            {error === '' && message === '' ? (
              <>
                <button
                  type="submit"
                  className="px-3 py-2 w-full bg-green-500 hover:bg-green-600 rounded-md text-white"
                >
                  {isSubmitting ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-7 w-7 border-[3px] border-b-transparent border-white"></div>
                    </div>
                  ) : (
                    t('changePassword')
                  )}
                </button>
              </>
            ) : (
              <>
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
                <BackToHome />
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResetPassword;
