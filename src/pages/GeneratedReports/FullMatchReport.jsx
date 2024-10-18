import React, { useMemo, useRef, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';

const FullMatch = () => {
  const [data] = useState([
    { FundName: 'Fund A', Ticker: 'AAA' },
    { FundName: 'Fund B', Ticker: 'BBB' },
    { FundName: 'Fund C', Ticker: 'CCC' },
    { FundName: 'Fund D', Ticker: 'DDD' },
    { FundName: 'Fund E', Ticker: 'EEE' }
  ]);

  // CSV export reference
  const csvLinkRef = useRef(null);

  // XLSX export function
  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'table_data.xlsx');
  };

  // Defining columns using useMemo for better performance
  const columns = useMemo(
    () => [
      {
        accessorKey: 'FundName', // key to access the field in data
        header: 'Fund Name',
        size: 200
      },
      {
        accessorKey: 'Ticker',
        header: 'Ticker',
        size: 200
      }
    ],
    []
  );

  return (
    <Box component={Paper} p={2}>
      <Helmet>
        <title>Missing Reports</title>
      </Helmet>

      {/* CSV Export Hidden Link */}
      <CSVLink
        data={data}
        headers={columns.map((col) => ({ label: col.header, key: col.accessorKey }))}
        filename="table_data.csv"
        ref={csvLinkRef}
        style={{ display: 'none' }}
      />

      {/* Material React Table */}
      <MaterialReactTable
        columns={columns}
        data={data}
        enableSorting={true} // Enables sorting on columns
        enableFullScreenToggle={true} // Full screen toggle
        enableTopToolbar={true} // Displays the top toolbar with buttons
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            {/* Export Buttons */}
            <Button variant="contained" startIcon={<SaveAltIcon />} color="primary" onClick={() => csvLinkRef.current.link.click()}>
              Export CSV
            </Button>
            <Button variant="contained" startIcon={<SaveAltIcon />} color="secondary" onClick={exportToXLSX}>
              Export XLSX
            </Button>
          </Stack>
        )}
      />
    </Box>
  );
};

export default FullMatch;
