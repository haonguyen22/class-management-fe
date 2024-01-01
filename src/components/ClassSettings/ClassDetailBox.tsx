import { TextField } from '@mui/material';
import SettingFrameLayout from './SettingFrameLayout';
import { useTranslation } from 'react-i18next';

function ClassDetailBox() {
  const { t } = useTranslation();
  return (
    <SettingFrameLayout title="Class Details"  >
      <TextField
        id="filled-basic"
        label={t('className')}
        variant="filled"
        required
        name="name"
        sx={{ padding: '0px', margin: '8px' }}
      />
      <TextField
        id="filled-basic"
        label={t('description')}
        variant="filled"
        required
        name="name"
        sx={{ padding: '0px', margin: '8px' }}
      />
      <TextField
        id="filled-basic"
        label={t('subject')}
        variant="filled"
        required
        name="name"
        sx={{ padding: '0px', margin: '8px' }}
      />
    </SettingFrameLayout>
  );
}

export default ClassDetailBox;
