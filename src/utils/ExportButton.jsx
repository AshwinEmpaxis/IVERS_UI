import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';

const ExportButton = ({ data, columns, enableCSV = true, enableExcel = true }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Handle Menu Open/Close
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'exported_data.xlsx');
    handleClose();
  };

  // Prepare data for CSV
  const csvHeaders = columns.map((col) => ({
    label: col.headerName,
    key: col.field
  }));

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick} sx={{ mb: 2 }}>
        Export Data
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'export-button'
        }}
      >
        {enableCSV && (
          <MenuItem onClick={handleClose}>
            <CSVLink data={data} headers={csvHeaders} filename="exported_data.csv" style={{ textDecoration: 'none', color: 'inherit' }}>
              Export to CSV
            </CSVLink>
          </MenuItem>
        )}
        {enableExcel && <MenuItem onClick={exportToExcel}>Export to Excel (XLSX)</MenuItem>}
      </Menu>
    </>
  );
};

export default ExportButton;
