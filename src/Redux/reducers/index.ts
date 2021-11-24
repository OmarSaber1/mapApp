import { DefaultRootState } from './../../utils/interfaces';
import {combineReducers} from 'redux';

import zone from './zone';
import auth from './auth';



export default combineReducers({
  auth,
  zone,
}as DefaultRootState);
