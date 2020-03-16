import axios, { AxiosInstance, AxiosResponse } from 'axios';

const createAPI = (): AxiosInstance => {
  const { accessToken } = localStorage;

  const api = axios.create({
    baseURL: process.env.API_URL,
  });
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return api;
};

const api = createAPI();

api.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  async (error) => {
    const { response: { status } } = error;
    if (status !== 401) {
      throw error;
    }

    // If access token needs refresh
    try {
      // Try token refreshing
      const { accessToken } = localStorage;
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
