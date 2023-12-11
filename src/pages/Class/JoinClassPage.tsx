import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { classService } from '../../services/class/ClassService';
import { handleAxiosReponse } from '../../utils/handleReponse';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

function JoinClassPage() {
  const { t } = useTranslation();
  const useHeader = useAuthHeader();
  const [searchParams] = useSearchParams();
  const isAuthenticate = useIsAuthenticated();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['redirectUrl']);
  const location = useLocation();

  const token = useHeader()?.replace('Bearer ', '');
  const code = searchParams.get('code');
  const { enqueueSnackbar } = useSnackbar();

  const joinClass = async () => {
    const res = await classService.joinClass(token!, code!);
    handleAxiosReponse(res, {
      ifSuccess: (data) => {
        if (data.status === 200) {
          enqueueSnackbar(t('participating.success'), {
            variant: 'success',
          });
          navigate('/');
        }
      },
      ifFailed: (err) => {
        enqueueSnackbar(err.response?.data.message, { variant: 'error' });
        navigate('/');
      },
    });
  };

  useEffect(() => {
    if (!isAuthenticate()) {
      setCookie('redirectUrl', location.search, {
        path: '/',
        expires: new Date(Date.now() + 900000),
      });
      enqueueSnackbar(t('participating.login'), { variant: 'error' });

      navigate('/login');
    } else {
      joinClass();
    }
  }, []);

  return (
    <div>
      <CircularProgress />
    </div>
  );
}

export default JoinClassPage;
