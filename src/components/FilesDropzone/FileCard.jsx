// src/components/FilesDropzone/FileCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, IconButton, Typography, Box, Tooltip } from '@mui/material';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import bytesToSize from 'utils/bytesToSize';

function FileCard({ file, onRemove }) {
  const isImage = file.mimeType.startsWith('image/');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      {isImage ? (
        <CardMedia component="img" height="140" image={file.url} alt={file.name} />
      ) : (
        <Box
          sx={{
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Typography variant="h1">
            <i className="far fa-file" />
          </Typography>
        </Box>
      )}
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
          <Typography variant="subtitle1" noWrap>
            {file.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {bytesToSize(file.size)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Download">
            <IconButton onClick={handleDownload} aria-label="download">
              <DownloadOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove">
            <IconButton onClick={() => onRemove(file.name)} aria-label="delete">
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

FileCard.propTypes = {
  file: PropTypes.shape({
    mimeType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  }).isRequired,
  onRemove: PropTypes.func.isRequired
};

export default FileCard;
