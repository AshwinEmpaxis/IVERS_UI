import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Card, CardContent, Typography, Button, Paper, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ExportButton from 'utils/ExportButton';
const API_URL = 'http://localhost:55411/Service.svc';

const DynamicDashboard = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${API_URL}/countLoadedDataService`);
      const formattedData = response.data.map((item) => {
        const key = item[0].Key; // Table name (e.g., "RPS", "AlphaDesk")
        const [records, lastUpdated] = item[0].Value.split('#');

        return {
          TableName: key,
          Records: records || '0',
          LastUpdatedDate: lastUpdated || 'N/A'
        };
      });

      setTables(formattedData);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  // Fetch data for a specific table when "View Data" button is clicked
  const fetchDataForTable = async (tableName) => {
    setLoading(true);
    setSelectedTable(null);
    try {
      const response = await axios.post(
        `${API_URL}/showLoadedDataServivce`,
        { flag: tableName },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const responseDataKey = Object.keys(response.data.response).find((key) => key.toLowerCase().includes(tableName.toLowerCase()));
      const responseData = responseDataKey ? response.data.response[responseDataKey] : [];

      setSelectedTable({
        name: tableName,
        data: responseData
      });

      setFilteredData(responseData); // Initialize filtered data
    } catch (error) {
      console.error(`Error fetching data for table ${tableName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch table data on component mount
  useEffect(() => {
    fetchTables();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = selectedTable.data.filter((row) =>
      Object.values(row).some((value) => value.toString().toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  // Define columns for DataGrid (Dynamic columns based on table data)
  const columns = selectedTable
    ? Object.keys(selectedTable.data[0] || {}).map((col) => ({
        field: col,
        headerName: col.toUpperCase(),
        flex: 1,
        sortable: true
      }))
    : [];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        View loaded Raw Data
      </Typography>

      {/* Quick Access Cards (generated dynamically) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {tables.length > 0 ? (
          tables.map((table, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  backgroundColor: '#87CEEB',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                    {table.TableName} {/* Table Name */}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', my: 2 }}>
                    {table.Records} {/* Record Count */}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Last Updated: {table.LastUpdatedDate} {/* Last Updated Date */}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: '#fff',
                      color: '#3f51b5',
                      '&:hover': {
                        backgroundColor: '#e0e0e0'
                      }
                    }}
                    onClick={() => fetchDataForTable(table.TableName)} // Fetch data for the selected table
                  >
                    View Data
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No tables found</Typography>
        )}
      </Grid>

      {/* Selected Table Data */}
      {selectedTable ? (
        <>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            {selectedTable.name} Data
          </Typography>

          {/* Search and Export Buttons  */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            {/* Search Input */}
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              sx={{
                width: '300px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '5px'
              }}
              size="small"
            />

            <ExportButton data={filteredData} columns={columns} enableCSV={true} enableExcel={true} />
          </Box>

          {/* DataGrid Table */}
          <Paper sx={{ height: 400, width: '100%', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <DataGrid
              rows={filteredData.map((row, index) => ({ id: index, ...row }))}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 25]}
              checkboxSelection
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar // Adds built-in toolbar for additional features like filtering, exporting, etc.
              }}
              getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'striped-row' : '')}
              loading={loading}
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none'
                },
                '& .MuiDataGrid-row': {
                  '&:nth-of-type(odd)': {
                    backgroundColor: '#f0f4f8' // Lighter blue for alternate row
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: '#fff' // White for even rows
                  }
                }
              }}
            />
          </Paper>
        </>
      ) : (
        <Typography variant="body1">Select a table to view data.</Typography>
      )}
    </Box>
  );
};

export default DynamicDashboard;
