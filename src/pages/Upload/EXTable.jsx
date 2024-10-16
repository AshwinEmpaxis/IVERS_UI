import React, { useMemo, useRef, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Button, Stack, Fade } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe'
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky'
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe'
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio'
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe'
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia'
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy'
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska'
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs'
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina'
  }
];

const Example = () => {
  const csvLinkRef = useRef(null); // Reference for CSVLink component

  // Columns configuration for MaterialReactTable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150
      }
    ],
    []
  );

  // Initialize the table with useMaterialReactTable hook
  const table = useMaterialReactTable({
    columns,
    data // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  // Function to export data to XLSX
  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'table_data.xlsx');
  };

  return (
    <div>
      {/* Export buttons: CSV and XLSX */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: 2 }}
        justifyContent="flex-end" // Align buttons to the right
      >
        {/* CSV Export Button */}
        <Fade in={true} timeout={1000}>
          <Button
            variant="contained"
            startIcon={<SaveAltIcon />}
            color="primary"
            onClick={() => csvLinkRef.current.link.click()} // Use ref to trigger CSV download
          >
            Export CSV
          </Button>
        </Fade>

        {/* XLSX Export Button */}
        <Fade in={true} timeout={1200}>
          <Button variant="contained" startIcon={<SaveAltIcon />} color="secondary" onClick={exportToXLSX}>
            Export XLSX
          </Button>
        </Fade>
      </Stack>

      {/* Invisible CSVLink Component for CSV Export */}
      <CSVLink
        data={data}
        headers={[
          { label: 'First Name', key: 'name.firstName' },
          { label: 'Last Name', key: 'name.lastName' },
          { label: 'Address', key: 'address' },
          { label: 'City', key: 'city' },
          { label: 'State', key: 'state' }
        ]}
        filename="table_data.csv"
        ref={csvLinkRef}
        style={{ display: 'none' }} // Hidden CSVLink component
      />

      {/* Render the MaterialReactTable */}
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Example;
