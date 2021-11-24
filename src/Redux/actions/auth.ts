import axios from '../../apis/api-constants';

import {LOGIN_SUCCESS, USER_LOADED, LOGOUT, AUTH_ERROR} from '../types';
import {LoginResponse} from '../../utils/interfaces';
import {clearZones} from './zone';

export const loadUser = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token');
    dispatch({
      type: USER_LOADED,
      payload: token,
    });
  } catch (err: any) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.message,
    });
  }
};

export const login = (formData: any) => async (dispatch: any) => {
  try {
    const res = await axios.post('/login', formData);

    const {token} = res.data as LoginResponse;

    localStorage.setItem('token', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
  } catch (err: any) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.message,
    });
  }
};

export const logout = () => (dispatch: any) => {
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
  });
  dispatch(clearZones());
};
