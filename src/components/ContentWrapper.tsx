import * as React from 'react';
import styled from '@emotion/styled';
import variables from '../scss/_variables.scss';

interface IContentWrapper {
  header: React.ReactNode;
}

const ContentWrapper: React.FC<IContentWrapper> = ({
  header,
  children,
}) => (
  <div className="content">
    <Header>{header}</Header>
    <main className="content__main">{children}</main>
  </div>
);

export default ContentWrapper;

const Header = styled.div`
  margin-bottom: 1.5rem;
  color: ${variables.grayDark};
  font-size: 26px;
  font-weight: ${variables.fontWeightBold};
`;
