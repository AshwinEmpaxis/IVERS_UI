// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: '',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;

export const drawerWidth = 260;
export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_VERSION = import.meta.env.VITE_APP_VERSION || 'v1.1.0';

// Base URL HOST_API_KEY configuration based on environment
// For IIS release: https://portal.empaxis.com:7039    //VITE_APP_PUBLIC_URL
// For local: https://localhost:44389    //VITE_APP_LOCAL_URL

// export const HOST_API_KEY = import.meta.env.VITE_APP_PUBLIC_URL || "https://localhost:44389" ;
// console.log('HOST_API_KEY', HOST_API_KEY);

// API
export const HOST_API_KEY =
  import.meta.env.MODE === 'production' ? import.meta.env.VITE_APP_PUBLIC_URL : import.meta.env.VITE_APP_PUBLIC_URL;
console.log('HOST_API_KEY', HOST_API_KEY);

export const apiEndpoints = {
  uploadExcelFile: `${HOST_API_KEY}/api/UploadFile/UploadExcelFile`,
  calculateExcelData: `${HOST_API_KEY}/api/UploadFile/Calculate`,
  registerUser: `${HOST_API_KEY}/api/Auth/SignUp`,
  getRecordDetails: `${HOST_API_KEY}/api/UploadFile/ReadRecord`,
  resetAllData: `${HOST_API_KEY}/api/UploadFile/ResetAll`,
  loginUser: `${HOST_API_KEY}/api/Auth/SignIn`,
  verifyFile: `${HOST_API_KEY}/api/UploadFile/Filecheck`,
  resetUserPassword: `${HOST_API_KEY}/api/Auth/ResetPassword`,
  getAllData: `${HOST_API_KEY}/api/UploadFile/FetchAllData`,
  fetchDateDetails: `${HOST_API_KEY}/api/UploadFile/DateFetch`,
  getHistoryData: `${HOST_API_KEY}/api/UploadFile/HistoryData`,
  logErrorDetails: `${HOST_API_KEY}/api/Auth/ErrorLogging`,
  fetchLookupDetails: `${HOST_API_KEY}/api/UploadFile/LookupFetch`,
  updateLookup: `${HOST_API_KEY}/api/UploadFile/LookupEdit`,
  deleteLookupEntry: `${HOST_API_KEY}/api/UploadFile/Lookupdlt`,
  getAllLookups: `${HOST_API_KEY}/api/UploadFile/Alllookup`
};

export const API = {
  // BASE_URL: 'http://localhost:6060/Service.svc'
  BASE_URL: 'http://localhost:55411/Service.svc'
};
