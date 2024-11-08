import React, { useState } from 'react';
import { Tab, Tabs, Box, Divider } from '@mui/material';
import MainCard from 'components/MainCard';
import FullMatch from './LookUp1';
import Tolerance from './ToleranceReports';
import NearMatch from './NearMatchReports';

import GenerateReport from './DownloadReports';

const TabIndexLookUp = () => {
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
    }
  ];

  return (
    <Box>
      <MainCard
        sx={{
          '& .MuiCardContent-root , .MuiCardContent-root:last-child': {
            p: 0
          }
        }}
      >
        <GenerateReport />
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          sx={{
            '& .MuiTabs-flexContainer': {
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

export default TabIndexLookUp;
