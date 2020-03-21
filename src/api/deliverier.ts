/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function deliverier(
  action: () => any,
  handlers = {},
): Promise<any | never> {
  try {
    const response = await action();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status } = response;
    // Success handler (Ex: Toast)

    return response.data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status } = error.response;
    // Error handler (Ex: Toast)
    return Promise.reject(error);
  }
}
