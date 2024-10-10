import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from 'components/Loader';
import useAuth from 'hooks/useAuth';

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    const currentPath = `${location.pathname}${location.search}`;
    const encodedReturnTo = encodeURIComponent(currentPath);
    return <Navigate to={`/login?returnTo=${encodedReturnTo}`} replace />;
  }

  return <>{children}</>;
}
