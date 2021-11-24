import axios from 'axios';
import { URI } from '../utils/constants';

const axiosBase = axios.create({
  baseURL: URI,
});

axiosBase.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');

export default axiosBase;
