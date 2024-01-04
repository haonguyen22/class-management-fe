import GradeManagementTable from '../../components/Grade/GradeManagementTable';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FormUpload from '../../components/Grade/FormUpload';

const GradeTab = () => {
  return (
    <>
      <div className="flex gap-3 mb-3">
        <Button variant="contained" color="primary">
          <DownloadIcon />
          <span className="ml-2">Template</span>
        </Button>
        <FormUpload />
      </div>
      <GradeManagementTable />
    </>
  );
};

export default GradeTab;
