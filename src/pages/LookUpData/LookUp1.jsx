import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Helmet } from 'react-helmet';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { citiesList, usStateList, data as initialData } from 'helpers/mock/makedata';
import dayjs from 'dayjs';
import ExportData from 'components/Export/ExportData';

const NearMatchReports = () => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    name: '',
    salary: '',
    age: '',
    city: '',
    state: '',
    hireDate: '',
    arrivalTime: '',
    departureTime: ''
  });
  const [editEntry, setEditEntry] = useState(null);

  const columns = useMemo(
    () => [
      {
        header: 'Status',
        accessorFn: (row) => (row.isActive ? 'true' : 'false'),
        id: 'isActive',
        filterVariant: 'checkbox',
        Cell: ({ cell }) => (cell.getValue() === 'true' ? 'Active' : 'Inactive'),
        size: 200
      },
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text',
        size: 250
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        size: 250,
        enableClickToCopy: true,
        Cell: ({ cell }) =>
          cell.getValue().toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          }),
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive',
        muiFilterSliderProps: {
          marks: true,
          max: 200000,
          min: 30000,
          step: 10000,
          valueLabelFormat: (value) =>
            value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })
        }
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
        filterFn: 'between',
        size: 250
      },
      {
        accessorKey: 'city',
        header: 'City',
        filterVariant: 'select',
        filterSelectOptions: citiesList,
        size: 250
      },
      {
        accessorKey: 'state',
        header: 'State',
        filterVariant: 'multi-select',
        filterSelectOptions: usStateList,
        size: 300
      },
      {
        accessorFn: (row) => (row.hireDate ? dayjs(row.hireDate) : null),
        id: 'hireDate',
        header: 'Hire Date',
        filterVariant: 'date',
        sortingFn: 'datetime',
        Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY'),
        muiFilterDatePickerProps: { format: 'DD/MM/YYYY' },
        size: 250
      },
      {
        accessorFn: (row) => new Date(row.arrivalTime),
        id: 'arrivalTime',
        header: 'Arrival Time',
        filterVariant: 'datetime-range',
        Cell: ({ cell }) => (cell.getValue() ? dayjs(cell.getValue()).format('DD/MM/YYYY HH:mm:ss') : ''),
        size: 380
      },
      {
        accessorFn: (row) => new Date(row.departureTime),
        id: 'departureTime',
        header: 'Departure Time',
        filterVariant: 'time-range',
        Cell: ({ cell }) => (cell.getValue() ? dayjs(cell.getValue()).format('HH:mm:ss') : ''),
        size: 380
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <>
            <IconButton color="primary" onClick={() => handleEdit(row)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => handleDelete(row)}>
              <DeleteIcon />
            </IconButton>
          </>
        )
      }
    ],
    []
  );

  const handleCreate = () => {
    setOpen(true);
  };

  const handleEdit = (row) => {
    setEditEntry(row.original);
    setEditOpen(true);
  };

  const handleDelete = (row) => {
    setData((prevData) => prevData.filter((item) => item.id !== row.original.id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  };

  const handleSave = () => {
    setData((prevData) => [...prevData, { ...newEntry, id: prevData.length + 1, isActive: true }]);
    setOpen(false);
    setNewEntry({
      name: '',
      salary: '',
      age: '',
      city: '',
      state: '',
      hireDate: '',
      arrivalTime: '',
      departureTime: ''
    });
  };

  const handleUpdate = () => {
    setData((prevData) => prevData.map((item) => (item.id === editEntry.id ? { ...editEntry } : item)));
    setEditOpen(false);
    setEditEntry(null);
  };

  return (
    <>
      <Helmet>
        <title>NearMatch Reports</title>
      </Helmet>

      <Button variant="contained" color="primary" onClick={handleCreate} sx={{ marginBottom: 2 }}>
        Add New +
      </Button>

      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection={true} // Enable row selection (checkboxes)
        renderTopToolbarCustomActions={() => (
          <ExportData
            color="primary"
            variant="contained"
            data={data}
            columns={columns}
            exportTypes={['csv', 'excel', 'txt', 'pdf', 'xml', 'json']}
            ExportFileName="YourExport"
            isLoading={false}
            componentVariant="Menu"
          />
        )}
        enableRowNumbers
        rowNumberDisplayMode="original"
        enablePagination
        paginationDisplayMode="pages"
        muiPaginationProps={{
          color: 'secondary',
          rowsPerPageOptions: [10, 25, 50, 100],
          shape: 'rounded',
          variant: 'outlined'
        }}
        enableColumnResizing
        enableColumnDragging
        enableColumnOrdering
        muiTableBodyProps={{
          sx: {
            '& tr:nth-of-type(odd) > td': {
              backgroundColor: '#e6f4ff' // Background color for odd rows
            }
          }
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: '#1976d2', // Background color for headers
            color: 'white' // Text color for headers
          }
        }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Salary"
            type="number"
            fullWidth
            value={newEntry.salary}
            onChange={(e) => setNewEntry({ ...newEntry, salary: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            value={newEntry.age}
            onChange={(e) => setNewEntry({ ...newEntry, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            value={newEntry.city}
            onChange={(e) => setNewEntry({ ...newEntry, city: e.target.value })}
          />
          <TextField
            margin="dense"
            label="State"
            type="text"
            fullWidth
            value={newEntry.state}
            onChange={(e) => setNewEntry({ ...newEntry, state: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Hire Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEntry.hireDate}
            onChange={(e) => setNewEntry({ ...newEntry, hireDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Arrival Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEntry.arrivalTime}
            onChange={(e) => setNewEntry({ ...newEntry, arrivalTime: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Departure Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEntry.departureTime}
            onChange={(e) => setNewEntry({ ...newEntry, departureTime: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleClose}>
        <DialogTitle>Edit Entry</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={editEntry?.name || ''}
            onChange={(e) => setEditEntry({ ...editEntry, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Salary"
            type="number"
            fullWidth
            value={editEntry?.salary || ''}
            onChange={(e) => setEditEntry({ ...editEntry, salary: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            value={editEntry?.age || ''}
            onChange={(e) => setEditEntry({ ...editEntry, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            value={editEntry?.city || ''}
            onChange={(e) => setEditEntry({ ...editEntry, city: e.target.value })}
          />
          <TextField
            margin="dense"
            label="State"
            type="text"
            fullWidth
            value={editEntry?.state || ''}
            onChange={(e) => setEditEntry({ ...editEntry, state: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Hire Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editEntry?.hireDate || ''}
            onChange={(e) => setEditEntry({ ...editEntry, hireDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Arrival Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editEntry?.arrivalTime || ''}
            onChange={(e) => setEditEntry({ ...editEntry, arrivalTime: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Departure Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editEntry?.departureTime || ''}
            onChange={(e) => setEditEntry({ ...editEntry, departureTime: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NearMatchReports;
