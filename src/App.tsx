import React from 'react';
import styled from '@emotion/styled';

import GlobalStyle from './components/GlobalStyle';
import Footer from './components/Footer';

import Router from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <RouterWrap>
          <Router />
        </RouterWrap>
        <Footer />
      </Container>
    </>
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
