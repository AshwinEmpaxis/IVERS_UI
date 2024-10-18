import React, { useState } from 'react';
import { Tab, Tabs, Box, Divider } from '@mui/material';
import MainCard from 'components/MainCard';
import FullMatch from './FullMatchReport';
import Tolerance from './ToleranceReports';
import NearMatch from './NearMatchReports';
import Missing from './MissingReports';
import Skipped from './SkippedReport';
import GenerateReport from './DownloadReports';

const ReportTabIndex = () => {
  const [currentTab, setCurrentTab] = useState('FullMatch');

  const tabs = [
    {
      value: 'FullMatch',
      label: 'Full Match',
      component: <FullMatch />
    },
    {
      value: 'Tolerance',
      label: 'Tolerance',
      component: <Tolerance />
    },
    {
      value: 'NearMatch',
      label: 'Near Match',
      component: <NearMatch />
    },
    {
      value: 'Missing',
      label: 'Missing',
      component: <Missing />
    },
    {
      value: 'Skipped',
      label: 'Skipped',
      component: <Skipped />
    }
  ];

  return (
    <Box>
      <MainCard>
        <GenerateReport />
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          sx={{
            '& .MuiTabs-flexContainer': {
              pl: { md: 3 },
              mr: 2,
              justifyContent: {
                sm: 'center',
                md: 'flex-start'
              }
            }
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
        <Divider />
        {tabs.map((tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>)}
      </MainCard>
    </Box>
  );
};

export default ReportTabIndex;
