import axios from '../../apis/api-constants';
import {
  GET_ZONES,
  CLEAR_ZONES,
  ZONE_ERROR,
  ADD_ZONE,
  EDIT_ZONE,
  DELETE_ZONE,
} from '../types';

import {ZoneResponse} from '../../utils/interfaces';

export const getZones = () => async (dispatch: any) => {
  try {
    const response = await axios.get('/zones');

    const data = response.data.data as ZoneResponse[];

    dispatch({
      type: GET_ZONES,
      payload: data,
    });
  } catch (err: any) {
    dispatch({
      type: ZONE_ERROR,
      payload: err.message,
    });
  }
};

export const clearZones = () => async (dispatch: any) => {
  try {
    dispatch({
      type: CLEAR_ZONES,
    });
  } catch (err: any) {
    dispatch({
      type: ZONE_ERROR,
      payload: err.message,
    });
  }
};

export const addZone =
  ({label, color, points}: ZoneResponse) =>
  async (dispatch: any) => {
    try {
      await axios.post('/zones', {label, color, points});
      dispatch(getZones());
      dispatch({
        type: ADD_ZONE,
      });
    } catch (err: any) {
      dispatch({
        type: ZONE_ERROR,
        payload: err.message,
      });
    }
  };

export const editZone =
  ({_id, label, color, points}: ZoneResponse) =>
  async (dispatch: any) => {
    try {
      await axios.put(`/zones/${_id}`, {label, color, points});
      dispatch(getZones());
      dispatch({
        type: EDIT_ZONE,
      });
    } catch (err: any) {
      dispatch({
        type: ZONE_ERROR,
        payload: err.message,
      });
    }
  };

export const deleteZone = (zoneId: string) => async (dispatch: any) => {
  try {
    await axios.delete(`/zones/${zoneId}`);
    dispatch(getZones());
    dispatch({
      type: DELETE_ZONE,
    });
  } catch (err: any) {
    dispatch({
      type: ZONE_ERROR,
      payload: err.message,
    });
  }
};
