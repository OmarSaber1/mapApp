import client from './api-constants';

export const setAuthenticationToken = (token: string) => {
  if (token) {
    client.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token');
    localStorage.setItem('token', token);
  } else {
    delete client.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};
