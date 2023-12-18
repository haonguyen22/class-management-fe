import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { useCookies } from 'react-cookie';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { classService } from '../../services/class/ClassService';
import { apiCall } from '../../utils/apiCall';

function JoinClassPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const isAuthenticate = useIsAuthenticated();
  const [, setCookie] = useCookies(['redirectUrl']);
  const location = useLocation();

  const code = searchParams.get('code');
  const { enqueueSnackbar } = useSnackbar();

  const joinClass = async () => {
    await apiCall(classService.joinClass(code!), {
      ifSuccess: (data) => {
        if (data.status === 200) {
          enqueueSnackbar(t('participating.success'), {
            variant: 'success',
          });
          window.location.href = `/class/${
            (data.metadata as { id: string }).id
          }/detail`;
        }
      },
      ifFailed: (err) => {
        enqueueSnackbar(err.response?.data.message, { variant: 'error' });
        window.location.href = '/';
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

      window.location.href = '/login';
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
