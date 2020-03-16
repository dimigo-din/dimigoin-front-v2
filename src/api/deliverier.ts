export default async (action: () => any, handlers = {}) => {
  try {
    const response = await action()
    const status = response.status
    // Success handler (Ex: Toast)

    return response.data
  } catch (error) {
    const status = error.response.status
    // Error handler (Ex: Toast)
    return Promise.reject(error)
  }
}
