import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authService } from '../../services/auth/AuthService';
import { handleAxiosReponse } from '../../utils/handleReponse';
import BackToHome from '../../components/BackToHome/BackToHome';
import { useTranslation } from 'react-i18next';

function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function confirmEmail() {
    try {
      const res = await authService.confirmEmail(token ?? '');
      handleAxiosReponse(res, {
        ifSuccess: (response) => {
          setMessage(response.data.message as string);
        },
        ifFailed: (err) => {
          setError(err?.response?.data.message ?? err.message);
        },
      });
    } catch (error) {
      setError('Something went wrong. Please try again');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    confirmEmail();
  }, []);

  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-t-4 border-b-4 border-green-500 rounded-full animate-spin"></div>
          <div className="text-xl font-semibold mt-5">
            {t('verify.loading')}.
          </div>
        </div>
      ) : (
        <>
          {message != '' && (
            <div className="w-full text-center text-green-500 font-semibold">
              {message}
            </div>
          )}

          {error != '' && (
            <div className="w-full text-center text-red-500 font-semibold">
              <h2 className="text-2xl">{t('verify.fail')}</h2>
              <h2>{t('error', { message: error })}</h2>
            </div>
          )}
          <BackToHome />
        </>
      )}
    </div>
  );
}

export default ConfirmEmailPage;
