import axios from 'axios'

export const configAxios = () => {
  axios.defaults.baseURL = process.env.API_URL

  let { accessToken } = localStorage
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

  axios.interceptors.response.use(response => {
    return response
  }, async error => {
    if (error.response.status === 401) { // Access token is need to refresh
      try {
        // Try token refreshing
        accessToken = localStorage.accessToken
        error.config.headers = {
          Authorization: `Bearer ${accessToken}`
        }
        return axios.request(error.config)
      } catch (_error) {
        // Refresh token is expired
      }
    } else {
      throw error
    }
  })
}
