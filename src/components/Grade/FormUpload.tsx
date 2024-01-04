import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiCall } from '../../utils/apiCall';
import { useParams } from 'react-router-dom';
import { gradeService } from '../../services/grade/GradeService';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import PreviewFile from './PreviewFile';

const FormUpload = () => {
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(event.target.files!));
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);

      const b = new ClipboardEvent('').clipboardData || new DataTransfer();
      for (const file of newFiles) b.items.add(file);
      const input = document.getElementById('file-input') as HTMLInputElement;
      input.files = b.files;

      return newFiles;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if(selectedFiles.length === 0) return;

    const formData = new FormData();
    formData.append('file', selectedFiles[0]);

    await apiCall(gradeService.uploadStudentList(parseInt(id!), formData), {
      ifSuccess: (data) => {
        enqueueSnackbar(data.message, {
          variant: 'success',
        });
        setIsLoading(false);
      },
      ifFailed(err) {
        enqueueSnackbar(err?.message ?? err.response?.data?.message, {
          variant: 'error',
        });
      },
    });
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <FileUploadIcon />
        <span className="ml-2">{t('uploadStudent')}</span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">{t('FormUpload.titleStudentList')}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Input
            id="file-input"
            type="file"
            onChange={handleFileChange}
          />
          {selectedFiles.length > 0 && (
            <List dense>
              {selectedFiles.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={file.name}
                    secondary={
                      <Typography variant="body2">{file.size} bytes</Typography>
                    }
                  />
                  <IconButton onClick={() => handleFileRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
          {selectedFiles.length > 0 && <PreviewFile selectedFiles={selectedFiles} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} />
             : t('upload')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormUpload;
