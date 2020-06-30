import React from 'react';
import styled from '@emotion/styled';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';

import Router from './router';
import GlobalStyle from './components/GlobalStyle';
import configureClient from './api/configureApolloClient';

import dimigoBackgroundImage from './assets/dimigo-background.svg';

const client = configureClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <GlobalStyle />
        <Container>
          <TopLine />
          <RouterWrap>
            <Router />
          </RouterWrap>
          <BottomImage
            src={dimigoBackgroundImage}
          />
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

const TopLine = styled.div`
  width: 100%;
  height: 12px;
  background-color: #3c70e8;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const RouterWrap = styled.main`
  flex: 1 0 auto;
`;

const BottomImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  width: 100vw;
`;
