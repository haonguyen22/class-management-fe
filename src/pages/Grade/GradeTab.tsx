import GradeManagementTable from '../../components/Grade/GradeManagementTable';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FormUpload from '../../components/Grade/FormUpload';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTranslation } from 'react-i18next';

const GradeTab = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-3">
        <div className="flex gap-3">
          <Button variant="contained" color="primary">
            <DownloadIcon />
            <span className="ml-2">{t('template')}</span>
          </Button>
          <FormUpload />
        </div>
        <Button variant="text" color="primary">
          <ExitToAppIcon />
          <span className="ml-2">{t('exportGradeBoard')}</span>
        </Button>
      </div>
      <GradeManagementTable />
    </>
  );
};

export default GradeTab;
