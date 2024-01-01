import { TextField } from '@mui/material';
import SettingFrameLayout from './SettingFrameLayout';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { IClass } from '../../models/IClass';
import { apiCall } from '../../utils/apiCall';
import { classService } from '../../services/class/ClassService';
import { useParams } from 'react-router-dom';

function ClassDetailBox() {
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();
  const [data, setData] = useState<IClass>();

  const getClassDetail = async () => {
    await apiCall(classService.getClassInfo(id!), {
      ifSuccess: (data) => {
        setData(data.metadata as IClass);
      },
      ifFailed: () => {},
    });
  };

  useEffect(() => {
    getClassDetail();
  }, []);

  return (
    <SettingFrameLayout title={t('classDetail')}>
      <TextField
        id="filled-basic"
        label={t('className')}
        variant="filled"
        required
        disabled
        name="name"
        value={data?.name ?? ''}
        sx={{ padding: '0px', margin: '8px' }}
      />
      <TextField
        id="filled-basic"
        label={t('description')}
        variant="filled"
        required
        disabled
        name="description"
        value={data?.description ?? ''}
        sx={{ padding: '0px', margin: '8px' }}
      />
      <TextField
        id="filled-basic"
        label={t('owner')}
        variant="filled"
        required
        disabled
        name="owner"
        value={data?.owner?.email ?? ''}
        sx={{ padding: '0px', margin: '8px' }}
      />
    </SettingFrameLayout>
  );
}

export default ClassDetailBox;
