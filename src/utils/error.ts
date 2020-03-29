import { ApolloError } from 'apollo-client';

export const graphqlErrorMessage = (error: ApolloError) => error.message.replace('GraphQL error: ', '');
