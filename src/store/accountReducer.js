// action - state management
import { LOGIN, LOGOUT, REGISTER, INITIALIZED } from './actions';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isInitialized: true
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isInitialized: true
      };
    case INITIALIZED:
      return {
        ...state,
        isInitialized: true
      };
    default:
      return state;
  }
};

export default accountReducer;
