import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPlusLg } from 'react-icons/bs';
import CustomizedMenus from '../common/CustomizedMenus';
import { ICreateCLass } from '../models/IClass';
import { useAuthHeader } from 'react-auth-kit';
import { handleAxiosReponse } from '../utils/handleReponse';
import { GlobalContext } from '../context/GlobalContext';
import { httpStatus } from '../constants/httpStatus';
import { classService } from '../services/Class/ClassService';

function CreateClassDialog() {
  const initCreateClass: ICreateCLass = {
    name: '',
    description: '',
    subject: '',
  };
  const auth = useAuthHeader();
  const token = auth()!.substring(7);
  const { fetchClasses } = useContext(GlobalContext);

  const { t } = useTranslation();
  const [createClass, setCreateClass] = useState<ICreateCLass>(initCreateClass);
  const [joinClassId, setJoinClassId] = useState<string>('');

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);

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
    console.log(typeof e);
    const { name, value } = e.target;
    setCreateClass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitCreateClass = async () => {
    const res = await classService.createClass(token, createClass);
    handleAxiosReponse(res, {
      ifSuccess: (data) => {
        if (data.status === httpStatus.CREATED) {
          fetchClasses(token);
        }
      },
      ifFailed: (err) => {
        console.log(err.message);
      },
    });
    handleCloseCreateDialog();
  };

  const submitJoinClass = async () => {
    const res = await classService.joinClass(token, joinClassId);
    handleAxiosReponse(res, {
      ifSuccess: (data) => {
        if (data.status === httpStatus.OK) {
          fetchClasses(token);
        }
      },
      ifFailed: (err) => {
        console.log(err.message);
      },
    });
    handleCloseJoinDialog();
  };

  return (
    <Fragment>
      <CustomizedMenus
        label={<BsPlusLg className="w-6 h-6 text-black font-bold" />}
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
            margin="dense"
            value={createClass.name}
            onChange={handleChangeClassName}
          />
          <TextField
            id="outlined-section-input"
            label={t('description')}
            type="text"
            fullWidth
            name="description"
            value={createClass.description}
            onChange={handleChangeClassName}
            margin="dense"
          />
          <TextField
            id="outlined-subject-input"
            label={t('subject')}
            type="text"
            fullWidth
            name="subject"
            value={createClass.subject}
            onChange={handleChangeClassName}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog} color="info">
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={submitCreateClass}
            color="success"
          >
            {t('create')}
          </Button>
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
            margin="dense"
            name="joinClassId"
            value={joinClassId}
            onChange={(e) => setJoinClassId(e.target.value)}
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
