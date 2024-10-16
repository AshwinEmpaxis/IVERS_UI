import React, { useState, useEffect } from 'react';
import { Box, Paper, Snackbar, Alert } from '@mui/material';
import { Helmet } from 'react-helmet';
import SharedTableComponent from './../../utils/DynamicTable';
import axios from 'axios';

const FullMatch = ({ error }) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  // Define static columns for the table
  const columns = [
    {
      accessorKey: 'FundName',
      header: 'Fund Name',
      size: 200
    },
    {
      accessorKey: 'Ticker',
      header: 'Ticker',
      size: 200
    }
  ];

  useEffect(() => {
    // Fetch data from API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        const responseData = response.data;

        // Assuming responseData is an array of objects matching the required structure
        setData(responseData);
      } catch (err) {
        setFetchError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <Box component={Paper}>
      <Helmet>
        <title>Break Recon Data</title>
      </Helmet>
      <SharedTableComponent data={data} columns={columns} />
      {(error || fetchError) && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">{error || fetchError}</Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default FullMatch;
