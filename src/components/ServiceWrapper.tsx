import React from 'react';
import styled from '@emotion/styled';

import Container from './grids/Container';

import variables from '../scss/_variables.scss';

type ServiceWrapperProps = {
  navbar?: React.ReactNode;
  menu?: React.ReactNode;
  children?: React.ReactNode;
};

const ServiceWrapper: React.FC<ServiceWrapperProps> = ({
  navbar,
  menu,
  children,
}) => (
  <div>
    {navbar}
    <Container>
      <Wrapper>
        <Menu>{menu}</Menu>
        <Main>{children}</Main>
      </Wrapper>
    </Container>
  </div>
);

export default ServiceWrapper;

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -1rem;
  margin-left: -1rem;
`;

const Menu = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  flex: 0 0 auto;
  flex-basis: 100%;
  padding-right: 1rem;
  padding-left: 1rem;

  @media (min-width: ${variables.desktop}) {
    max-width: 21%;
    flex-basis: 21%;
  }
`;

const Main = styled.main`
  max-width: 100%;
  box-sizing: border-box;
  flex: 0 0 auto;
  flex-basis: 0;
  flex-grow: 1;
  padding-right: 1rem;
  padding-left: 1rem;
`;
