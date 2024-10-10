import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from 'components/Loader';
import { PATH_AFTER_LOGIN } from 'config';
import useAuth from 'hooks/useAuth';

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const params = new URLSearchParams(location.search);
    const returnTo = params.get('returnTo');
    const logoutLocation = localStorage.getItem('logoutLocation');
    const redirectTo = returnTo ? decodeURIComponent(returnTo) : logoutLocation || PATH_AFTER_LOGIN;
    return <Navigate to={redirectTo} replace />;
  }

  if (!isInitialized) {
    return <Loader />;
  }

  return <>{children}</>;
}
