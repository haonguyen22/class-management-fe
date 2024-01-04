import { TextField } from '@mui/material';
import SettingFrameLayout from './SettingFrameLayout';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ClassContext } from '../../context/ClassContext';

function ClassDetailBox() {
  const { classDetail } = useContext(ClassContext);
  const { t } = useTranslation();

  return (
    <SettingFrameLayout title={t('classDetail')}>
      <TextField
        id="filled-basic"
        label={t('className')}
        variant="filled"
        required
        InputProps={{
          readOnly: true,
        }}
        name="name"
        value={classDetail?.name ?? ''}
        sx={{ padding: '0px', margin: '8px' }}
      />
      <TextField
        id="filled-basic"
        label={t('description')}
        variant="filled"
        required
        InputProps={{
          readOnly: true,
        }}
        name="description"
        value={classDetail?.description ?? ''}
        sx={{ padding: '0px', margin: '8px' }}
      />
      <TextField
        id="filled-basic"
        label={t('owner')}
        variant="filled"
        required
        InputProps={{
          readOnly: true,
        }}
        name="owner"
        value={classDetail?.owner?.email ?? ''}
        sx={{ padding: '0px', margin: '8px' }}
      />
    </SettingFrameLayout>
  );
}

export default ClassDetailBox;
