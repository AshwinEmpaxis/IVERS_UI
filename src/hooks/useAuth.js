import { useContext } from 'react';
import JWTContext from 'contexts/JWTContext';

const useAuth = () => {
  const { user: userDetails, ...rest } = useContext(JWTContext);

  if (!rest) {
    throw new Error('useAuth must be used within a JWTProvider');
  }

  return { userDetails, ...rest };
};

export default useAuth;
