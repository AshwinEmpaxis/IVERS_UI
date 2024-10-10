// src/components/FilesDropzone/FilesDropzone.js
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, useTheme, Alert } from '@mui/material';
import UploadFileImg from 'assets/images/upload-file.svg';
import bytesToSize from 'utils/bytesToSize';

function FilesDropzone({ onFilesAdded, accept = [], maxSize = null, multiple = true, ...rest }) {
  const theme = useTheme();
  const [errorMessages, setErrorMessages] = useState([]);

  const getMimeType = (ext) => {
    switch (ext) {
      case '.csv':
        return 'text/csv';
      case '.xls':
        return 'application/vnd.ms-excel';
      case '.xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case '.pdf':
        return 'application/pdf';
      case '.png':
        return 'image/png';
      case '.svg':
        return 'image/svg+xml';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.gif':
        return 'image/gif';
      case '.txt':
        return 'text/plain';
      case '.mp4':
        return 'video/mp4';
      case '.avi':
        return 'video/x-msvideo';
      case '.mov':
        return 'video/quicktime';
      case '.mp3':
        return 'audio/mpeg';
      case '.wav':
        return 'audio/wav';
      case '.json':
        return 'application/json';
      case '.xml':
        return 'application/xml';
      default:
        return ext;
    }
  };

  const acceptedMimeTypes = accept.map(getMimeType);

  const handleDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      const errors = [];
      const validFiles = [];

      acceptedFiles.forEach((file) => {
        if (!acceptedMimeTypes.includes(file.type)) {
          errors.push(`${file.name} is not an accepted file type.`);
        } else {
          validFiles.push(file);
        }
      });

      if (fileRejections.length > 0) {
        fileRejections.forEach(({ errors: fileErrors, file: rejectedFile }) => {
          fileErrors.forEach((e) => {
            if (e.code === 'file-too-large') {
              errors.push(`${rejectedFile.name} exceeds the size limit of ${bytesToSize(maxSize)}.`);
            } else {
              errors.push(`${rejectedFile.name}: ${e.message}`);
            }
          });
        });
      }

      setErrorMessages(errors);

      if (validFiles.length > 0) {
        if (!multiple && validFiles.length > 1) {
          setErrorMessages(['Only one file can be uploaded at a time.']);
        } else {
          onFilesAdded(validFiles);
        }
      }
    },
    [onFilesAdded, maxSize, multiple, acceptedMimeTypes]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: acceptedMimeTypes.join(','),
    maxSize,
    multiple
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
          {accept.length > 0 ? `Accepted file types: ${accept.join(', ')}` : 'Any file type is accepted'}
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
  accept: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
  multiple: PropTypes.bool
};

export default FilesDropzone;

// accept={['.csv', '.pdf', '.xls', '.xlsx', '.png', '.svg', '.jpg', '.jpeg', '.gif', '.txt', '.mp4', '.avi', '.mov', '.mp3', '.wav', '.json', '.xml']}
