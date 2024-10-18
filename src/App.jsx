import { RouterProvider } from 'react-router-dom';

// project import
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
            <RouterProvider router={router} />
          </LocalizationProvider>
        </AuthProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
