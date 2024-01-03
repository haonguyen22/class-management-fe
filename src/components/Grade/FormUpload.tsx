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
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const FormUpload = () => {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = Array.from(event.target.files!).filter(
        (file) => !prevFiles.some((f) => f.name === file.name),
      );
      return [...prevFiles, ...newFiles];
    });
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);

      const b = new ClipboardEvent("").clipboardData || new DataTransfer()
      for (const file of newFiles) b.items.add(file);
      const input = document.getElementById('file-input') as HTMLInputElement;
      input.files = b.files;

      return newFiles;
    });
  };


  const handleSubmit = () => {
    console.log(selectedFiles);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <FileUploadIcon />
        <span className="ml-2">Upload</span>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
        <DialogTitle id="form-dialog-title">Upload Grade</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload multiple files
          </DialogContentText>
          <Input
            id="file-input"
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleFileChange}
          />
          {selectedFiles.length > 0 && (
            <List dense>
              {selectedFiles.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={file.name}
                    secondary={<Typography variant="body2">{file.size} bytes</Typography>}
                  />
                  <IconButton onClick={() => handleFileRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormUpload;
