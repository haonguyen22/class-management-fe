import GradeManagementTable from '../../components/Grade/GradeManagementTable';
import { Button, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FormUpload from '../../components/Grade/FormUpload';
import { useParams } from 'react-router-dom';
import { apiCall } from '../../utils/apiCall';
import { gradeService } from '../../services/grade/GradeService';
import { useSnackbar } from 'notistack';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { downloadFileXlsx } from '../../utils/xlsx';
import { ClassContext } from '../../context/ClassContext';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const GradeTab = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { classDetail } = useContext(ClassContext);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleStudenListTemplate = async () => {
    setIsLoading(true);
    await apiCall(gradeService.downloadStudentListTemplate(parseInt(id!)), {
      ifSuccess: (data) => {
        downloadFileXlsx({
          data: data as unknown as Blob,
          fileName: `${classDetail?.name}-student-list-template`,
        });

        enqueueSnackbar('Download success', {
          variant: 'success',
        });
        setIsLoading(false);
      },
      ifFailed: (err) => {
        enqueueSnackbar(err?.message ?? err.response?.data?.message, {
          variant: 'error',
        });
      },
    });
  };

  const onSubmitStudentListFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    await apiCall(gradeService.uploadStudentList(parseInt(id!), formData), {
      ifSuccess: (data) => {
        enqueueSnackbar(data.message, {
          variant: 'success',
        });
      },
      ifFailed(err) {
        enqueueSnackbar(err?.message ?? err.response?.data?.message, {
          variant: 'error',
        });
      },
    });
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="flex gap-3 mb-3">
          <Button
            variant="contained"
            color="primary"
            onClick={!isLoading ? handleStudenListTemplate : undefined}
          >
            <>
              <DownloadIcon />
              <span className="ml-2">{t('studentTemplate')}</span>
            </>
          </Button>

          <Button variant="contained" color="primary" onClick={handleOpen}>
            <FileUploadIcon />
            <span className="ml-2">{t('uploadStudent')}</span>
          </Button>
          <Button variant="contained" color="primary">
            <ExitToAppIcon />
            <span className="ml-2">{t('exportGradeBoard')}</span>
          </Button>
          <FormUpload
            handleSubmit={onSubmitStudentListFile}
            titleForm={t('FormUpload.titleStudentList')}
            open={open}
            setOpen={setOpen}
          />
        </div>
        {/* Loading */}
        {isLoading && <CircularProgress size={30} />}
      </div>
      <GradeManagementTable setLoading={setIsLoading} />
    </>
  );
};

export default GradeTab;
