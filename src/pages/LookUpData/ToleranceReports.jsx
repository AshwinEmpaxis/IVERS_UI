import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Helmet } from 'react-helmet';
import { citiesList, usStateList, data } from 'helpers/mock/makedata';
import dayjs from 'dayjs';
import ExportData from 'components/Export/ExportData';

const NearMatchReports = () => {
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
      }
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>NearMatch Reports</title>
      </Helmet>

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
    </>
  );
};

export default NearMatchReports;
