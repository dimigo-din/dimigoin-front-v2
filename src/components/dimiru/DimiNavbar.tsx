import React from 'react';
import styled from 'styled-components';

type DimiNavbarProps = {
  brand?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
};

const DimiNavbar: React.FC<DimiNavbarProps> = ({ brand, start, end }) => {
  return (
    <Navbar>
      <Container>
        <Wrapper>
          <Brand>
            {brand}
          </Brand>
          <Menu>
            <NavbarStart>
              {start}
            </NavbarStart>
            <NavbarEnd>
              {end}
            </NavbarEnd>
          </Menu>
        </Wrapper>
      </Container>
    </Navbar>
  );
};

export default DimiNavbar;

const Navbar = styled.nav`
`;

const Container = styled.div`
`;

const Wrapper = styled.div`
`;

const Brand = styled.div`
`;

const Menu = styled.div`
`;

const NavbarStart = styled.div`
`;

const NavbarEnd = styled.div`
`;
