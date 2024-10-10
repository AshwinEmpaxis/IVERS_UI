// src/SamplePage.js

import React, { useState } from 'react';
import { Typography, Box, Grid, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import FilesDropzone from 'components/FilesDropzone/FilesDropzone';
import FileCard from 'components/FilesDropzone/FileCard';

function SamplePage() {
  const [files, setFiles] = useState([]);

  const handleFilesAdded = (newFiles) => {
    const mappedFiles = newFiles.map((file) => ({
      mimeType: file.type,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
  };

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => {
        if (file.name === fileName) {
          URL.revokeObjectURL(file.url);
          return false;
        }
        return true;
      });
      return updatedFiles;
    });
  };

  const handleRemoveAll = () => {
    files.forEach((file) => {
      URL.revokeObjectURL(file.url);
    });
    setFiles([]);
  };

  return (
    <MainCard title="File Upload">
      <Typography variant="body1" gutterBottom>
        Upload your files by dragging and dropping them into the area below or by clicking to select files.
      </Typography>
      <FilesDropzone
        onFilesAdded={handleFilesAdded}
        accept="image/*,application/pdf"
        maxSize={5 * 1024 * 1024} // 5 MB
      />
      {files.length > 0 && (
        <Box mt={3}>
          <Grid container spacing={2}>
            {files.map((file) => (
              <Grid item xs={12} sm={6} md={4} key={file.name}>
                <FileCard file={file} onRemove={handleRemoveFile} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleRemoveAll} color="error" variant="contained">
              Remove All
            </Button>
          </Box>
        </Box>
      )}
    </MainCard>
  );
}

export default SamplePage;
