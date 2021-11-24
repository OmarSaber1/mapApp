import {USER_LOADED, LOGIN_SUCCESS, LOGOUT, AUTH_ERROR} from '../types';
import {Action} from '../../utils/interfaces';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  error: {},
};

const reducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
