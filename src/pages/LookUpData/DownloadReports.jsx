import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import axios from 'axios';
// import Loader from '../../FMAD/FMADGenerateReport/Loader';
import { API } from 'config';

const GenerateReport = () => {
  const [blobFileLoading, setBlobFileLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = API.BASE_URL;

  const fetchBlobFile = async () => {
    try {
      setBlobFileLoading(true);
      setError(null);
      //EndPoint
      const response = await axios.post(`${API_URL}/ReviewPrice_generateReport`, {}, { responseType: 'blob' });

      const blobFile = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadUrl = URL.createObjectURL(blobFile);
      const fileName = 'All_Calc_Generated_Report.xlsx';
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setBlobFileLoading(false);
    } catch (error) {
      console.error('Error downloading the report:', error);
      setError('There was an error downloading the report. Please try again.');
      setBlobFileLoading(false);
    }
  };

  return (
    <>
      {/* {blobFileLoading && <Loader />} */}
      {error && (
        <Box color="error.main" mb={1}>
          {error}
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="primary" onClick={fetchBlobFile} disabled={blobFileLoading}>
          {blobFileLoading ? 'Downloading...' : 'Download Report'}
        </Button>
      </Box>
    </>
  );
};

export default GenerateReport;
