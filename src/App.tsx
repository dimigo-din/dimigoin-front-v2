import React from 'react';
import styled from 'styled-components';

import GlobalStyle from './components/GlobalStyle';
import Router from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Router />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
`;
