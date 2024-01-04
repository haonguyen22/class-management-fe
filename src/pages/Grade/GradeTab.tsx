import GradeManagementTable from '../../components/Grade/GradeManagementTable';
import { Button, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FormUpload from '../../components/Grade/FormUpload';
import { useParams } from 'react-router-dom';
import { apiCall } from '../../utils/apiCall';
import { gradeService } from '../../services/grade/GradeService';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const GradeTab = () => {
  const { id } = useParams<{id: string}>();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleStudenListTemplate = async () => {
    setIsLoading(true);
    await apiCall(gradeService.downloadStudentListTemplate(parseInt(id!)), {
      ifSuccess: (data) => {
        const blob = data as unknown as Blob;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student-list-template.xlsx';
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
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


  return (
    <>
      <div className="flex gap-3 mb-3">
        <Button variant="contained" color="primary" onClick={!isLoading ? handleStudenListTemplate : undefined}>
          {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} />:
            <>
              <DownloadIcon />
              <span className="ml-2">Template</span>
            </>
          }
        </Button>
        <FormUpload />
      </div>
      <GradeManagementTable />
    </>
  );
};

export default GradeTab;
