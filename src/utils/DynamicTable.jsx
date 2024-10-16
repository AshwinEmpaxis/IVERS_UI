import React, { useMemo, useRef } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Button, Stack, Fade } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';

const SharedTableComponent = ({ data, columns }) => {
  const csvLinkRef = useRef(null); // Reference for CSVLink component

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
        headers={columns.map((col) => ({ label: col.header, key: col.accessorKey }))}
        filename="table_data.csv"
        ref={csvLinkRef}
        style={{ display: 'none' }} // Hidden CSVLink component
      />

      {/* Render the MaterialReactTable with alternate row colors */}
      <MaterialReactTable
        table={table}
        getRowProps={(row) => ({
          style: {
            backgroundColor: row.index % 2 === 0 ? '#f5f5f5' : '#ffffff'
          }
        })}
      />
    </div>
  );
};

SharedTableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default SharedTableComponent;
