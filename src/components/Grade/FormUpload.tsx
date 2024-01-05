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
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewFile from './PreviewFile';
import { useTranslation } from 'react-i18next';

const FormUpload = ({
  handleSubmit,
  titleForm,
  open,
  setOpen,
}: {
  handleSubmit: (file: File) => void;
  titleForm: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">{titleForm}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Input id="file-input" type="file" onChange={handleFileChange} />
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
          {selectedFiles.length > 0 && (
            <PreviewFile selectedFiles={selectedFiles} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            disabled={
              selectedFiles[0]?.type !==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ??
              true
            }
            onClick={() => {
              setIsLoading(true);
              if (selectedFiles.length === 0) return;

              handleSubmit(selectedFiles[0]);

              setIsLoading(false);
              handleClose();
            }}
            color="primary"
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ color: 'white' }} />
            ) : (
              t('upload')
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormUpload;
