// src/SamplePage.js

import React, { useState } from 'react';
import { Typography, Box, Grid, Button, LinearProgress } from '@mui/material';
import MainCard from 'components/MainCard';
import FilesDropzone from 'components/FilesDropzone/FilesDropzone';
import FileCard from 'components/FilesDropzone/FileCard';
import Example from './EXTable';

function Upload() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFilesAdded = (newFiles) => {
    const validFiles = newFiles.map((file) => ({
      mimeType: file.type,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
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

  const handleUpload = () => {
    console.log('Uploading files:', files);

    // Simulating upload progress
    files.forEach((file, index) => {
      setTimeout(
        () => {
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: 100
          }));
        },
        (index + 1) * 1000
      );
    });
  };

  return (
    <MainCard title="File Upload">
      <Typography variant="body1" gutterBottom>
        Upload your files by dragging and dropping them into the area below or by clicking to select files.
      </Typography>
      <FilesDropzone
        onFilesAdded={handleFilesAdded}
        accept={['.csv', '.pdf', '.xls', '.xlsx']}
        maxSize={5 * 1024 * 1024} // 5 MB
        multiple={false}
      />
      {files.length > 0 && (
        <Box mt={3}>
          <Grid container spacing={2}>
            {files.map((file) => (
              <Grid item xs={12} sm={6} md={4} key={file.name}>
                <FileCard file={file} onRemove={handleRemoveFile} />
                {uploadProgress[file.name] !== undefined && (
                  <Box mt={1}>
                    <LinearProgress variant="determinate" value={uploadProgress[file.name] || 0} />
                    <Typography variant="body2" color="textSecondary">
                      {`${uploadProgress[file.name] || 0}%`}
                    </Typography>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleUpload} color="primary" variant="contained" sx={{ mr: 2 }}>
              Upload
            </Button>
            <Button onClick={handleRemoveAll} color="error" variant="contained">
              Remove All
            </Button>
          </Box>
        </Box>
      )}
      <Box>
        <Example />
      </Box>
    </MainCard>
  );
}

export default Upload;
