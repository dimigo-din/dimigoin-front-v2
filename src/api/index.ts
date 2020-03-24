/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const createAPI = (): AxiosInstance => {
  const { accessToken } = localStorage;

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
  });

  if (localStorage.getItem('accessToken')) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  return api;
};

const api = createAPI();

api.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  // eslint-disable-next-line consistent-return
  async error => {
    const {
      response: { status },
    } = error;
    if (status !== 401) {
      throw error;
    }

    // If access token needs refresh
    try {
      // Try token refreshing
      const { accessToken } = localStorage;
      // eslint-disable-next-line no-param-reassign
      error.config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return axios.request(error.config);
    } catch (_error) {
      // Refresh token is expired
    }
  },
);

export default api;
