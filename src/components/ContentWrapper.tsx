import * as React from 'react';
import styled from '@emotion/styled';
import variables from '../scss/_variables.scss';

export default ({ header, main }: {header: React.ReactNode; main: React.ReactNode}) => (
  <div className="content">
    <Header>
      {header}
    </Header>
    <main className="content__main">
      {main}
    </main>
  </div>
);

const Header = styled.div`
  margin-bottom: 1.5rem;
    color: ${variables.grayDark};
    font-size: 26px;
    font-weight: ${variables.fontWeightBold};
`;
