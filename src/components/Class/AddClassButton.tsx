import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPlusLg } from 'react-icons/bs';
import CustomizedMenus from '../../common/CustomizedMenus';
import { ICreateCLass } from '../../models/IClass';
import { apiCall } from '../../utils/apiCall';
import { GlobalContext } from '../../context/GlobalContext';
import { httpStatus } from '../../constants/httpStatus';
import { classService } from '../../services/class/ClassService';
import { enqueueSnackbar } from 'notistack';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

function CreateClassDialog() {
  const initCreateClass: ICreateCLass = {
    name: '',
    description: '',
    subject: '',
  };
  const { fetchClasses } = useContext(GlobalContext);

  const { t } = useTranslation();
  const [createClass, setCreateClass] = useState<ICreateCLass>(initCreateClass);
  const [joinClassId, setJoinClassId] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const auth = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    setStudentId(auth()!.user?.studentId ?? '');
  }, [auth]);

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const handleClickOpenCreateDialog = () => {
    setCreateClass(initCreateClass);
    setIsOpenCreateDialog(true);
  };
  const handleCloseCreateDialog = () => {
    setIsOpenCreateDialog(false);
  };
  const handleClickOpenJoinDialog = () => {
    setJoinClassId('');
    setIsOpenJoinDialog(true);
  };
  const handleCloseJoinDialog = () => {
    setIsOpenJoinDialog(false);
  };

  const handleChangeClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateClass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitCreateClass = async () => {
    if (
      createClass.name === '' ||
      createClass.description === '' ||
      createClass.subject === ''
    )
      return;
    await apiCall(classService.createClass(createClass), {
      ifSuccess: (data) => {
        console.log(data);
        if (
          data.status === httpStatus.CREATED ||
          data.status === httpStatus.OK
        ) {
          enqueueSnackbar(t('createClassSuccess'), { variant: 'success' });
          navigate(`/class/${(data.metadata as { id: string }).id}/detail`);
          fetchClasses();
        }
      },
      ifFailed: (err) => {
        enqueueSnackbar(t('createClassFailed'), { variant: 'error' });
        console.log(err.message);
      },
    });
    handleCloseCreateDialog();
  };

  const submitJoinClass = async () => {
    if (joinClassId === '' || studentId === '') return;
    setIsLoadingCreate(true);
    await apiCall(classService.joinClass(joinClassId, studentId), {
      ifSuccess: (data) => {
        enqueueSnackbar(t('participating.success'), { variant: 'success' });
        navigate(`/class/${(data.metadata as { id: string }).id}/detail`);
        if (data.status === httpStatus.OK) {
          fetchClasses();
        }
      },
      ifFailed: (err) => {
        console.log(err.message);
      },
    });
    setIsLoadingCreate(false);
    handleCloseJoinDialog();
  };

  return (
    <Fragment>
      <CustomizedMenus
        label={
          <BsPlusLg className="w-6 h-6 text-black font-bold dark:text-white" />
        }
        options={[
          {
            label: t('createClass'),
            onClick: handleClickOpenCreateDialog,
          },
          {
            label: t('joinClass'),
            onClick: handleClickOpenJoinDialog,
          },
        ]}
      />

      {/* Create class dialog */}
      <Dialog open={isOpenCreateDialog} onClose={handleCloseCreateDialog}>
        <DialogTitle>{t('createClass')}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-classname-input"
            label={t('className')}
            name={'name'}
            type="text"
            fullWidth
            error={createClass.name === ''}
            margin="dense"
            helperText={createClass.name === '' ? t('required') : ''}
            value={createClass.name}
            onChange={handleChangeClassName}
          />
          <TextField
            id="outlined-section-input"
            label={t('description')}
            type="text"
            error={createClass.description === ''}
            fullWidth
            name="description"
            helperText={createClass.description === '' ? t('required') : ''}
            value={createClass.description}
            onChange={handleChangeClassName}
            margin="dense"
          />
          <TextField
            id="outlined-subject-input"
            label={t('subject')}
            type="text"
            error={createClass.subject === ''}
            fullWidth
            name="subject"
            helperText={createClass.subject === '' ? t('required') : ''}
            value={createClass.subject}
            onChange={handleChangeClassName}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog} color="info">
            {t('cancel')}
          </Button>
          {isLoadingCreate ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              onClick={submitCreateClass}
              color="success"
            >
              {t('create')}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Join class */}
      <Dialog open={isOpenJoinDialog} onClose={handleCloseJoinDialog}>
        <DialogTitle>{t('joinClass')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('joinClassDescription')}</DialogContentText>
          <TextField
            id="outlined-classCode-input"
            label={t('classCode')}
            type="text"
            fullWidth
            error={joinClassId === ''}
            helperText={joinClassId === '' ? t('required') : ''}
            margin="dense"
            name="joinClassId"
            value={joinClassId}
            onChange={(e) => setJoinClassId(e.target.value)}
          />
          <TextField
            id="outlined-classCode-input"
            label={t('studentId')}
            type="text"
            fullWidth
            disabled={auth()!.user?.studentId !== ''}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJoinDialog} color="info">
            {t('cancel')}
          </Button>
          <Button variant="contained" onClick={submitJoinClass} color="success">
            {t('Join')}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default CreateClassDialog;
