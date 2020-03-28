import { ApolloError } from 'apollo-client';

export const graphqlErrorMessage = (error: ApolloError) => {
  return error.message.replace('GraphQL error: ', '');
};
