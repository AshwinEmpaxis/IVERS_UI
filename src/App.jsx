import { RouterProvider } from 'react-router-dom';

// project import
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
