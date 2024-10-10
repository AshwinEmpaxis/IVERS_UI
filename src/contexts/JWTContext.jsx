// import React, { createContext, useReducer, useEffect } from 'react';
// import axios from 'axios';
// import { LOGIN, LOGOUT, INITIALIZED } from 'store/actions';
// import accountReducer from 'store/accountReducer';
// import Cookies from 'js-cookie';
// import Crypto from 'utils/Crypto';
// import { jwtDecode } from 'jwt-decode';
// import Loader from 'components/Loader';
// import { HOST_API_KEY } from 'config';

// const initialState = {
//   isLoggedIn: false,
//   isInitialized: false,
//   user: JSON.parse(localStorage.getItem('userDetails')) || null
// };

// const JWTContext = createContext();

// const verifyToken = (accessToken) => {
//   if (!accessToken) return false;
//   try {
//     const decoded = jwtDecode(accessToken);
//     return decoded.exp > Date.now() / 1000;
//   } catch (error) {
//     console.error('Failed to decode token:', error);
//     return false;
//   }
// };

// const setSession = (accessToken, userDetails = null) => {
//   if (accessToken && verifyToken(accessToken)) {
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('userDetails', JSON.stringify(userDetails));
//     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('userDetails');
//     delete axios.defaults.headers.common['Authorization'];
//   }
// };

// export const JWTProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(accountReducer, initialState);

//   useEffect(() => {
//     const initAuth = async () => {
//       const accessToken = localStorage.getItem('accessToken');
//       const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//       if (accessToken && verifyToken(accessToken)) {
//         setSession(accessToken, userDetails);
//         dispatch({ type: LOGIN, payload: { isLoggedIn: true, user: userDetails } });
//       }
//       // Ensure the INITIALIZED is dispatched once everything is verified
//       dispatch({ type: INITIALIZED });
//     };
//     initAuth();
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const encryptedPassword = Crypto.EncryptPassword(password);
//       const response = await axios.post(`${HOST_API_KEY}/api/Auth/SignIn`, {
//         userName: username,
//         password: encryptedPassword
//       });

//       if (response.data.status === 'Success') {
//         const { accessToken, loadedData } = response.data.response;
//         const userDetails = loadedData.response.UserManagements[0];
//         setSession(accessToken, userDetails);
//         Cookies.set('jwt', accessToken, { expires: 1, sameSite: 'Strict', secure: true });
//         dispatch({ type: LOGIN, payload: { isLoggedIn: true, user: userDetails } });
//       } else {
//         throw new Error(`Login failed: ${response.data.message}`);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setSession(null);
//     Cookies.remove('jwt');
//     dispatch({ type: LOGOUT });
//   };

//   if (!state.isInitialized) {
//     return <Loader />;
//   }

//   return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
// };

// export default JWTContext;

import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { LOGIN, LOGOUT, INITIALIZED } from 'store/actions';
import accountReducer from 'store/accountReducer';
import Cookies from 'js-cookie';
import Crypto from 'utils/Crypto';
import { jwtDecode } from 'jwt-decode';
import Loader from 'components/Loader';
import { HOST_API_KEY } from 'config';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: JSON.parse(localStorage.getItem('userDetails')) || null
};

const JWTContext = createContext();

const verifyToken = (accessToken) => {
  if (!accessToken) return false;
  try {
    const decoded = jwtDecode(accessToken);
    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return false;
  }
};

const setSession = (accessToken, userDetails = null) => {
  if (accessToken && verifyToken(accessToken)) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (accessToken && verifyToken(accessToken)) {
        setSession(accessToken, userDetails);
        dispatch({ type: LOGIN, payload: { isLoggedIn: true, user: userDetails } });
      }
      dispatch({ type: INITIALIZED });
    };
    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const encryptedPassword = Crypto.EncryptPassword(password);
      const response = await axios.post(`${HOST_API_KEY}/api/Auth/SignIn`, {
        userName: username,
        password: encryptedPassword
      });

      if (response.data.isSuccess) {
        const { token, uniquekey } = response.data;
        const accessToken = token;
        const userDetails = { uniquekey };
        setSession(accessToken, userDetails);
        Cookies.set('jwt', accessToken, { expires: 1, sameSite: 'Strict', secure: true });
        dispatch({ type: LOGIN, payload: { isLoggedIn: true, user: userDetails } });
        return response.data.message;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setSession(null);
    Cookies.remove('jwt');
    dispatch({ type: LOGOUT });
  };

  if (!state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
