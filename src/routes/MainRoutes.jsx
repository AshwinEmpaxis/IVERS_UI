import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const UploadData = Loadable(lazy(() => import('pages/Upload/UploadData')));
const Viewdata = Loadable(lazy(() => import('pages/ViewData/Viewdata')));

//Generate Reports
const TabIndexReports = Loadable(lazy(() => import('pages/GeneratedReports/ReportTabIndex')));

//LookUp
const TabIndexLookUp = Loadable(lazy(() => import('pages/LookUpData/TabIndexLookUp')));

const NotFound = Loadable(lazy(() => import('./NotFound')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />, // Use DashboardLayout as the main layout
  children: [
    {
      path: '/',
      element: <Navigate to="upload-file" replace /> // Navigate to upload-file as default
    },
    {
      path: 'upload-file',
      element: <UploadData />
    },
    {
      path: 'view-data',
      element: <Viewdata />
    },
    {
      path: 'generated-reports',
      element: <TabIndexReports />
    },
    {
      path: 'lookup-reports',
      element: <TabIndexLookUp />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: '404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ]
};

export default MainRoutes;
