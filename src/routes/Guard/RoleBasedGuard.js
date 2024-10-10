import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.string)
};

export default function RoleBasedGuard({ children, roles }) {
  const { userDetails } = useAuth();
  const userRole = userDetails?.isAdmin === 1 ? 'admin' : 'user';

  if (typeof roles !== 'undefined' && !roles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
}
