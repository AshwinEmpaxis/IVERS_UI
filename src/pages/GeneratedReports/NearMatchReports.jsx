import React from 'react';
import { Box, Paper, Snackbar, Alert } from '@mui/material';
import { Helmet } from 'react-helmet';
import SharedTableComponent from './../../utils/DynamicTable';

const BreakRecon = ({ error }) => {
  // Static mock data for now
  const data = [
    { FundName: 'Fund A', Ticker: 'AAA' },
    { FundName: 'Fund B', Ticker: 'BBB' },
    { FundName: 'Fund C', Ticker: 'CCC' },
    { FundName: 'Fund D', Ticker: 'DDD' },
    { FundName: 'Fund E', Ticker: 'EEE' }
  ];

  // Add unique IDs to the static data
  const dataWithIds = data.map((row, index) => ({ id: index + 1, ...row }));

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

  return (
    <Box component={Paper}>
      <Helmet>
        <title>Static Price Preview</title>
      </Helmet>
      <SharedTableComponent data={dataWithIds} columns={columns} />
      {error && (
        <Snackbar open autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default BreakRecon;
