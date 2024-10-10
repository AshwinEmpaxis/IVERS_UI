// src/components/FilesDropzone/FilesDropzone.js

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, useTheme, Alert } from '@mui/material';
import UploadFileImg from 'assets/images/upload-file.svg';
import bytesToSize from 'utils/bytesToSize';

function FilesDropzone({ onFilesAdded, accept, maxSize, ...rest }) {
  const theme = useTheme();
  const [errorMessages, setErrorMessages] = useState([]);

  const handleDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      const errors = [];

      if (fileRejections.length > 0) {
        fileRejections.forEach(({ errors: fileErrors, file: rejectedFile }) => {
          fileErrors.forEach((e) => {
            if (e.code === 'file-too-large') {
              errors.push(`${rejectedFile.name} exceeds the size limit of ${bytesToSize(maxSize)}.`);
            } else if (e.code === 'file-invalid-type') {
              errors.push(`${rejectedFile.name} is not an accepted file type.`);
            } else {
              errors.push(`${rejectedFile.name}: ${e.message}`);
            }
          });
        });
      }

      setErrorMessages(errors);

      if (acceptedFiles.length > 0) {
        onFilesAdded(acceptedFiles);
      }
    },
    [onFilesAdded, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize
  });

  return (
    <Box {...rest} sx={{ padding: theme.spacing(2) }}>
      <Box
        {...getRootProps()}
        sx={{
          border: `2px dashed ${theme.palette.divider}`,
          padding: theme.spacing(5),
          borderRadius: theme.shape.borderRadius,
          textAlign: 'center',
          backgroundColor: isDragActive ? theme.palette.action.hover : 'transparent',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }}
      >
        <input {...getInputProps()} />
        <img alt="Select file" style={{ width: 100, marginBottom: theme.spacing(2) }} src={UploadFileImg} />
        <Typography variant="h6">{isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select files'}</Typography>
        <Typography variant="body2" color="textSecondary">
          {accept ? `Accepted file types: ${accept}` : 'Any file type is accepted'}
        </Typography>
        {maxSize && (
          <Typography variant="body2" color="textSecondary">
            {`Maximum file size: ${bytesToSize(maxSize)}`}
          </Typography>
        )}
      </Box>

      {errorMessages.length > 0 && (
        <Box mt={2}>
          {errorMessages.map((message, index) => (
            <Alert severity="error" key={index} sx={{ mb: 1 }}>
              {message}
            </Alert>
          ))}
        </Box>
      )}
    </Box>
  );
}

FilesDropzone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  accept: PropTypes.string,
  maxSize: PropTypes.number
};

FilesDropzone.defaultProps = {
  accept: '',
  maxSize: null
};

export default FilesDropzone;
