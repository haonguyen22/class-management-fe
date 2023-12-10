import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPlusLg } from 'react-icons/bs';
import CustomizedMenus from '../common/CustomizedMenus';

function CreateClassDialog() {
  const { t } = useTranslation();
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [isOpenJoinDialog, setIsOpenJoinDialog] = useState(false);

  const handleClickOpenCreateDialog = () => {
    setIsOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setIsOpenCreateDialog(false);
  };

  const handleClickOpenJoinDialog = () => {
    setIsOpenJoinDialog(true);
  };

  const handleCloseJoinDialog = () => {
    setIsOpenJoinDialog(false);
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
            label: t('myClass'),
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
            type="text"
            fullWidth
            margin="dense"
          />
          <TextField
            id="outlined-section-input"
            label={t('section')}
            type="text"
            fullWidth
            margin="dense"
          />
          <TextField
            id="outlined-subject-input"
            label={t('subject')}
            type="text"
            fullWidth
            margin="dense"
          />

          <TextField
            id="outlined-room-input"
            label={t('room')}
            type="text"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog} color="info">
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseCreateDialog}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJoinDialog} color="info">
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseJoinDialog}
            color="success"
          >
            {t('Join')}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default CreateClassDialog;
