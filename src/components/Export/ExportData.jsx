import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  CircularProgress,
  Stack,
  ButtonGroup,
  LinearProgress,
  Chip,
  Tooltip,
  IconButton
} from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CsvIcon, ExcelIcon, PdfIcon, JsonIcon, TxtIcon, XmlIcon } from './MuiSvgIcons';
import Crypto from 'utils/Crypto';
import Swal from 'sweetalert2';

const ExportData = ({
  data,
  columns,
  ExportFileName = 'Export',
  isLoading,
  useApiForExport = false,
  apiEndpoint,
  apiParams = {},
  style,
  className,
  customOnClick,
  componentVariant,
  exportTypes,
  ...others
}) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [exportProgress, setExportProgress] = useState(0);
  const [currentExportSize, setCurrentExportSize] = useState(0);
  const [totalExportSize, setTotalExportSize] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [exportType, setExportType] = useState('');

  const handleCloseMenu = () => setAnchorElement(null);

  const getColumnValue = (item, column) => {
    if (column.accessorFn) {
      return column.accessorFn(item);
    } else if (column.accessorKey) {
      return item[column.accessorKey];
    }
    return '';
  };

  const handleExport = (fileExtension) => {
    const exportOption = exportOptions.find((option) => option.fileExtension === fileExtension);
    const fileName = `${ExportFileName}.${fileExtension}`;

    setExportType(fileExtension);
    setExportProgress(0);
    setCurrentExportSize(0);
    setTotalExportSize(0);
    setEstimatedTime(null);

    if (useApiForExport) {
      handleApiExport(exportOption, fileName);
    } else {
      exportOption?.exportFunction(fileName);
    }
  };

  const handleApiExport = async (exportOption, fileName) => {
    setExportProgress(0);
    setCurrentExportSize(0);
    setTotalExportSize(0);
    setEstimatedTime(null);

    const encryptedFormat = Crypto.EncryptText(exportOption.fileExtension);
    const url = new URL(`${apiEndpoint}/api/APX/getReconReportByName`);
    url.searchParams.set('name', apiParams.name);
    url.searchParams.set('format', encryptedFormat);
    url.searchParams.set('filters', JSON.stringify(apiParams.filters ?? []));
    url.searchParams.set('globalFilter', apiParams.globalFilter ?? '');
    url.searchParams.set('sorting', JSON.stringify(apiParams.sorting ?? []));

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });

      if (!response?.body) {
        throw new Error('No response body');
      }

      const totalLength = parseInt(response.headers.get('Content-Length'), 10);
      const hasContentLength = !isNaN(totalLength) && totalLength > 0;

      if (hasContentLength) {
        setTotalExportSize(totalLength / (1024 * 1024)); // Convert to MB
      }

      const reader = response.body.getReader();
      const chunks = [];
      let receivedLength = 0;
      const startTime = Date.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;

        if (hasContentLength) {
          const progress = Math.round((receivedLength / totalLength) * 100);
          setExportProgress(progress);
          setCurrentExportSize(receivedLength / (1024 * 1024)); // Convert to MB

          const elapsedTime = (Date.now() - startTime) / 1000; // Convert to seconds
          const estimatedTotalTime = (elapsedTime / progress) * 100;
          setEstimatedTime(Math.round(estimatedTotalTime - elapsedTime));
        } else {
          // If Content-Length is not available, update progress by chunks
          setExportProgress((prevProgress) => Math.min(prevProgress + 10, 100));
        }
      }

      const blob = new Blob(chunks);
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      Swal.fire({
        title: 'Success',
        text: `Exported data to ${exportOption.fileExtension.toUpperCase()} successfully, completed in ${(
          (Date.now() - startTime) /
          1000
        ).toFixed(2)} seconds`,
        icon: 'success'
      });
    } catch (error) {
      console.error(`Error exporting data to ${exportOption.fileExtension}:`, error);
      Swal.fire({
        title: 'Error',
        text: `Error exporting data to ${exportOption.fileExtension.toUpperCase()}`,
        icon: 'error'
      });
    } finally {
      setExportProgress(100);
      setExportType('');
    }
  };

  const handleExportCsv = (fileName) => {
    try {
      const csvHeaders = columns.map((column) => column.header);
      const csvData = data
        .map((item) =>
          columns
            .map((column) => {
              const cellValue = getColumnValue(item, column);
              return typeof cellValue === 'object' ? JSON.stringify(cellValue) : `"${cellValue || ''}"`;
            })
            .join(',')
        )
        .join('\n');
      const content = [csvHeaders.join(','), csvData].join('\n');
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      handleCloseMenu();
      setExportProgress(100);
      setExportType('');
      Swal.fire({
        title: 'Success',
        text: 'Exported data to CSV successfully',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error exporting data to CSV:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error exporting data to CSV',
        icon: 'error'
      });
    }
  };

  const handleExportPdf = (fileName) => {
    try {
      const doc = new jsPDF();
      const pdfHeaders = columns.map((column) => column.header);
      const pdfData = data.map((item) => columns.map((column) => getColumnValue(item, column) || ''));
      autoTable(doc, { head: [pdfHeaders], body: pdfData });
      doc.save(fileName);
      handleCloseMenu();
      setExportProgress(100);
      setExportType('');
      Swal.fire({
        title: 'Success',
        text: 'Exported data to PDF successfully',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error exporting data to PDF:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error exporting data to PDF',
        icon: 'error'
      });
    }
  };

  const handleExportExcel = (fileName) => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(
        data.map((item) => {
          return columns.reduce((obj, column) => {
            obj[column.header] = getColumnValue(item, column);
            return obj;
          }, {});
        })
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, fileName);
      handleCloseMenu();
      setExportProgress(100);
      setExportType('');
      Swal.fire({
        title: 'Success',
        text: 'Exported data to Excel successfully',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error exporting data to Excel',
        icon: 'error'
      });
    }
  };

  const handleExportTxt = (fileName) => {
    try {
      const txtContent = data.map((item) => columns.map((column) => getColumnValue(item, column) || '').join(' ')).join('\n');
      const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      handleCloseMenu();
      setExportProgress(100);
      setExportType('');
      Swal.fire({
        title: 'Success',
        text: 'Exported data to TXT successfully',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error exporting data to TXT:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error exporting data to TXT',
        icon: 'error'
      });
    }
  };

  const handleExportJson = (fileName) => {
    try {
      const jsonData = data.map((item) =>
        columns.reduce((obj, column) => {
          obj[column.header] = getColumnValue(item, column);
          return obj;
        }, {})
      );
      const content = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      handleCloseMenu();
      setExportProgress(100);
      setExportType('');
      Swal.fire({
        title: 'Success',
        text: 'Exported data to JSON successfully',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error exporting data to JSON:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error exporting data to JSON',
        icon: 'error'
      });
    }
  };

  const handleExportXml = (fileName) => {
    try {
      const xmlContent = data
        .map(
          (item) =>
            '<item>' +
            columns
              .map((column) => `<${column.header.replace(/ /g, '')}>${getColumnValue(item, column)}</${column.header.replace(/ /g, '')}>`)
              .join('') +
            '</item>'
        )
        .join('');
      const content = `<?xml version="1.0" encoding="UTF-8"?><data>${xmlContent}</data>`;
      const blob = new Blob([content], { type: 'application/xml;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      handleCloseMenu();
      setExportProgress(100);
      setExportType('');
      Swal.fire({
        title: 'Success',
        text: 'Exported data to XML successfully',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error exporting data to XML:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error exporting data to XML',
        icon: 'error'
      });
    }
  };

  const exportOptions = [
    { label: 'Export CSV', icon: <CsvIcon />, fileExtension: 'csv', exportFunction: handleExportCsv },
    { label: 'Export Excel', icon: <ExcelIcon />, fileExtension: 'xlsx', exportFunction: handleExportExcel },
    { label: 'Export Text', icon: <TxtIcon />, fileExtension: 'txt', exportFunction: handleExportTxt },
    { label: 'Export PDF', icon: <PdfIcon />, fileExtension: 'pdf', exportFunction: handleExportPdf },
    { label: 'Export JSON', icon: <JsonIcon />, fileExtension: 'json', exportFunction: handleExportJson },
    { label: 'Export XML', icon: <XmlIcon />, fileExtension: 'xml', exportFunction: handleExportXml }
  ];

  const renderExportProgress = () => {
    if (!exportType) return null;

    const isComplete = exportProgress === 100;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 1, mt: 2 }}>
        <Tooltip title={isComplete ? `${exportType.toUpperCase()} Export Complete` : `Exporting ${exportType.toUpperCase()}`}>
          <IconButton size="small" color={isComplete ? 'success' : 'primary'}>
            <SaveAltIcon />
          </IconButton>
        </Tooltip>
        <LinearProgress
          variant="determinate"
          value={exportProgress}
          sx={{ flexGrow: 1, mx: 1, height: 5, borderRadius: 4, minWidth: 145 }}
        />
        <Tooltip title={`${currentExportSize.toFixed(2)} MB / ${totalExportSize.toFixed(2)} MB`}>
          <Chip label={`${Math.round(exportProgress)}%`} color="primary" size="small" sx={{ minWidth: 45 }} />
        </Tooltip>
        {!isComplete && estimatedTime !== null && (
          <Tooltip title={`Estimated time remaining: ${estimatedTime} seconds`}>
            <IconButton size="small" color="info">
              <SaveAltIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  };

  return (
    <Box align="right" style={style} className={className}>
      {componentVariant === 'ButtonGroup' ? (
        <ButtonGroup size="small" aria-label="Small button group" onClick={customOnClick} {...others}>
          {exportOptions.map((option) => (
            <Button
              key={option.label}
              startIcon={isLoading ? <CircularProgress size={20} /> : option.icon}
              onClick={() => handleExport(option.fileExtension)}
              disabled={isLoading}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      ) : (
        <>
          <Button
            disabled={isLoading}
            aria-controls={anchorElement ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorElement ? 'true' : undefined}
            onClick={customOnClick || ((event) => setAnchorElement(event.currentTarget))}
            size="small"
            startIcon={isLoading ? <CircularProgress size={20} /> : <SaveAltIcon />}
            {...others}
          >
            {isLoading ? 'Exporting...' : 'Export File'}
          </Button>

          <Menu
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            {...others}
          >
            <Stack sx={{ '& .MuiMenuItem-root+.MuiDivider-root': { my: '0.25rem' } }} divider={<Divider />} disabled={isLoading}>
              {exportOptions.map((option) => (
                <MenuItem key={option.label} onClick={() => handleExport(option.fileExtension)} {...others}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText>{option.label}</ListItemText>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </>
      )}
      {renderExportProgress()}
    </Box>
  );
};

export default ExportData;

{
  /* 
   import ExportData from 'components/Export/ExportData';

      <ExportData
        color="info"
        variant="contained"
        data={data}
        columns={columns}
        exportTypes={['csv', 'excel', 'txt', 'pdf', 'xml', 'json']}
        ExportFileName="YourExport" // Specify the export file name
        isLoading={isLoading} // Pass isLoading state
        componentVariant="ButtonGroup" // Specify the component variant ("ButtonGroup" or "Menu")
        useApiForExport={true}
        apiEndpoint={`${HOST_API_KEY}`}
        apiParams={{
          name: ENCRYPTED_REPORT_NAME,
          filters: columnFilters,
          globalFilter: globalFilter,
          sorting: sorting
        }}
      /> 
    
    */
}
