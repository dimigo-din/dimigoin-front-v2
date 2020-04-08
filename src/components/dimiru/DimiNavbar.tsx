import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

import Container from '../grids/Container';

import variables from '../../scss/_variables.scss';

interface IDimiNavbar extends RouteComponentProps {
  brand?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
}

const DimiNavbar: React.FC<IDimiNavbar> = ({
  brand,
  start,
  end,
  history,
}) => {
  const onClickBrand = () => history.push('/');

  return (
    <Navbar>
      <Container>
        <Wrapper>
          <Brand onClick={onClickBrand}>{brand}</Brand>
          <Menu>
            <NavbarStart>{start}</NavbarStart>
            <NavbarEnd>{end}</NavbarEnd>
          </Menu>
        </Wrapper>
      </Container>
    </Navbar>
  );
};

export default withRouter(DimiNavbar);

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  min-height: 5rem;
  align-items: center;
  background-color: transparent;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Brand = styled.div`
  font-size: 24px;
  font-weight: ${variables.fontWeightBold};
  justify-self: flex-start;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  flex: 1 0;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${variables.tablet}) {
    display: none;
  }
`;

const NavbarStart = styled.div``;

const NavbarEnd = styled.div`
  font-weight: ${variables.fontWeightBold};
`;
