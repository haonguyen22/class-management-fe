import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useCookies } from 'react-cookie';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { classService } from '../../services/class/ClassService';
import { apiCall } from '../../utils/apiCall';
import { RouteList } from '../../routes/routes';

function JoinClassPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const isAuthenticate = useIsAuthenticated();
  const [, setCookie] = useCookies(['redirectUrl']);
  const location = useLocation();
  const auth = useAuthUser();
  const [studentId, setStudentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticate()) {
      setStudentId(auth()!.user?.studentId ?? '');
    }
  }, [auth]);

  const code = searchParams.get('code');
  const { enqueueSnackbar } = useSnackbar();

  const joinClass = async () => {
    if (!isAuthenticate()) {
      return;
    }

    setIsLoading(true);
    await apiCall(classService.joinClass(code!, studentId!), {
      ifSuccess: (data) => {
        if (data.status === 200) {
          enqueueSnackbar(t('participating.success'), {
            variant: 'success',
          });
          setTimeout(() => {
            window.location.href = `/class/${
              (data.metadata as { id: string }).id
            }/detail`;
          });
          return;
        }
      },
      ifFailed: (err) => {
        enqueueSnackbar(err.response?.data.message, { variant: 'error' });
        console.log(1);
        setTimeout(() => {
          window.location.href = RouteList.home;
        }, 1000);
        return;
      },
      ifCatch: () => {
        setTimeout(() => {
          window.location.href = RouteList.home;
        }, 1000);
        return;
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

      setTimeout(() => {
        window.location.href = RouteList.login;
      }, 1000);
    } else {
      if (auth()?.user.studentId !== '') {
        joinClass();
      } else setIsLoading(false);
    }
  }, [auth()?.user.studentId]);

  return (
    <div className="text-center flex flex-col items-center justify-center">
      {!isLoading ? (
        <>
          <TextField
            id="outlined-classCode-input"
            label={t('studentId')}
            type="text"
            sx={{ width: '30%' }}
            error={studentId === ''}
            helperText={
              studentId === ''
                ? t('requiredStudentId')
                : t('updateStudentIdDescription')
            }
            margin="dense"
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ padding: '10px 30px', marginTop: '20px' }}
            onClick={joinClass}
            disabled={studentId === ''}
          >
            {t('join')}
          </Button>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default JoinClassPage;
