import React from 'react';
import styled from '@emotion/styled';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import configureClient from './api/configureApolloClient';

import GlobalStyle from './components/GlobalStyle';
import Footer from './components/Footer';

import Router from './router';

const client = configureClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <GlobalStyle />
        <Container>
          <RouterWrap>
            <Router />
          </RouterWrap>
          <Footer />
        </Container>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const RouterWrap = styled.main`
  flex: 1 0 auto;
  padding-bottom: 32px;
`;
