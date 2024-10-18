import React, { useRef, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
// import { citiesList, usStateList, data as dummyData } from 'helpers/mock/makedata';

const MissingReports = () => {
  // const [data1, setData1] = useState(dummyData);
  // console.log('data dummyData', data1);

  const csvLinkRef = useRef(null);

  const data = [
    { FundName: 'Fund A', Ticker: 'AAA' },
    { FundName: 'Fund B', Ticker: 'BBB' },
    { FundName: 'Fund C', Ticker: 'CCC' },
    { FundName: 'Fund D', Ticker: 'DDD' },
    { FundName: 'Fund E', Ticker: 'EEE' }
  ];

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

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'table_data.xlsx');
  };

  const table = useMaterialReactTable({
    columns,
    data,
    renderTopToolbarCustomActions: () => (
      <>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<SaveAltIcon />} color="primary" onClick={() => csvLinkRef.current.link.click()}>
            Export CSV
          </Button>
          <Button variant="contained" startIcon={<SaveAltIcon />} color="secondary" onClick={exportToXLSX}>
            Export XLSX
          </Button>
        </Stack>
      </>
    )
  });

  return (
    <Box component={Paper}>
      <Helmet>
        <title>Static Price Preview</title>
      </Helmet>

      <CSVLink
        data={data}
        headers={columns.map((col) => ({ label: col.header, key: col.accessorKey }))}
        filename="table_data.csv"
        ref={csvLinkRef}
        style={{ display: 'none' }}
      />

      <MaterialReactTable table={table} />
    </Box>
  );
};

export default MissingReports;
