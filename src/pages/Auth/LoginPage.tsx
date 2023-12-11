import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { FaSquareFacebook } from 'react-icons/fa6';
import * as Yup from 'yup';
import { authService } from '../../services/auth/AuthService';
import { ILogin } from '../../models/IAxiosResponse';
import { Link, useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { useEffect, useState } from 'react';
import { RouteList } from '../../routes/routes';
import { handleAxiosReponse } from '../../utils/handleReponse';
import { useCookies } from 'react-cookie';

function LoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const signIn = useSignIn();
  const isAuthenticate = useIsAuthenticated();
  const [cookies, setCookie, removeCookie] = useCookies(['redirectUrl']);

  useEffect(() => {
    if (isAuthenticate()) {
      navigate('/');
    }
  }, []);

  const handleGoogleSignInClick = async () => {
    try {
      window.location.href = authService.getGoogleSignInUrl();
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleFacebookSignInClick = async () => {
    try {
      window.location.href = authService.getFacebookSignInUrl();
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleLogin = async (
    values: ILogin,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const res = await authService.login(values);
      handleAxiosReponse(res, {
        ifSuccess: (response) => {
          if (response.status === 200) {
            const token = response.data.metadata as { token: string };
            signIn({
              token: token.token,
              tokenType: 'Bearer',
              expiresIn: 3600,
              authState: { email: values.email },
            });
            // Check is have redirect url
            if (cookies.redirectUrl) {
              navigate(RouteList.joinClass + cookies.redirectUrl);
              removeCookie('redirectUrl', { path: '/' });
            } else {
              navigate('/');
            }
          }
        },
        ifFailed: (err) => {
          setError(err?.response?.data?.message ?? err?.message);
        },
      });
      setSubmitting(false);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div className="sm:w-1/2 sm:mx-auto  md:w-2/4 mdLg:w-1/2 lg:w-2/5 mx-5 min-w-max">
      <h1 className="text-4xl font-bold text-center py-10">{t('Login')}</h1>
      {/* sign in with google */}
      <Formik
        initialValues={{ email: 'hieu@gmail.com', password: '12345678' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(t('email.invalid'))
            .required(t('email.required')),
          password: Yup.string().required(t('password.required')),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values, {
            setSubmitting,
          });
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
            <div className="w-full">
              <label htmlFor="password">{t('password.label')}</label>
              <Field
                name="password"
                type="password"
                placeholder={t('password.label')}
                className="w-full px-3 py-2 border ring-1 border-gray-500 rounded-md focus:outline-none focus:ring-green-300 transition-all"
              />
              <div className="w-full text-base text-red-500 font-semibold">
                <ErrorMessage name="password" />
              </div>
            </div>
            {/* Forgot password */}
            <div className="w-full flex items-center justify-between ">
              <Link
                to={RouteList.forgotPassword}
                className="text-sm text-blue-500"
              >
                {t('forgotPassword')}
              </Link>
              <Link to={RouteList.signup} className="text-sm text-blue-500">
                {t('notHaveAccount')}
              </Link>
            </div>

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
                t('Login')
              )}
            </button>
          </Form>
        )}
      </Formik>

      <div className="flex items-center my-6">
        <hr className="flex-grow bg-gray-500 h-1 rounded-sm" />
        <div className="mx-4 text-gray-500">{t('Other')}</div>
        <hr className="flex-grow bg-gray-500 h-1 rounded-sm" />
      </div>
      <div className="flex items-center justify-center">
        <div
          className="flex rounded-md justify-stretch border bg-red-200 p-2 min-w-fit cursor-pointer mr-2 hover:bg-red-300"
          onClick={handleGoogleSignInClick}
        >
          <FcGoogle className="w-8 h-8" />
        </div>
        {/* sign in with facebook */}
        <div
          className="flex rounded-md justify-stretch border bg-blue-200 p-2 min-w-fit cursor-pointer ml-2 hover:bg-blue-300"
          onClick={handleFacebookSignInClick}
        >
          <FaSquareFacebook className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
