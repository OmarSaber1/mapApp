import {
  GET_ZONES,
  CLEAR_ZONES,
  ZONE_ERROR,
  ADD_ZONE,
  EDIT_ZONE,
  DELETE_ZONE,
} from '../types';

import {Action} from '../../utils/interfaces';

const initialState = {
  zones: [],
  loading: true,
  error: {},
};

const reducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  switch (type) {
    case GET_ZONES:
      return {
        ...state,
        zones: payload,
        loading: false,
      };

    case ADD_ZONE:
      return {
        ...state,
        loading: false,
      };

    case EDIT_ZONE:
      return {
        ...state,
        loading: false,
      };

    case DELETE_ZONE:
      return {
        ...state,
        loading: false,
      };

    case ZONE_ERROR:
      return {
        ...state,
        error: payload,
        loading: true,
      };
    case CLEAR_ZONES:
      return {
        ...state,
        zones: [],
        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
