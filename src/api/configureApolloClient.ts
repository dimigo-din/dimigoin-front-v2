import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from 'apollo-boost';
import auth from '../utils/auth';

export default function configureClient() {
  const httpLink = new HttpLink({
    uri: 'https://circle-gql.dimigo.in/graphql',
  });

  const accessToken = auth.getToken();

  const authLink = new ApolloLink((operation, forward) => {
    if (accessToken) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
