export default async function deliverier(
  action: () => any,
  handlers = {},
): Promise<any | never> {
  try {
    const response = await action();
    const status = response.status;
    // Success handler (Ex: Toast)

    return response.data;
  } catch (error) {
    const status = error.response.status;
    // Error handler (Ex: Toast)
    return Promise.reject(error);
  }
};
