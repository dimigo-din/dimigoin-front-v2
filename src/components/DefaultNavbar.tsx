import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

import DimiIcon from './dimiru/DimiIcon';
import DimiNavbar from './dimiru/DimiNavbar';

import { ReactComponent as BrandImage } from '../assets/brand.svg';

const DefaultNavbar: React.FC<RouteComponentProps> = ({ history }) => {
  const onClickLogout = () => {
    history.push('/auth/login');
  };

  return (
    <header>
      <DimiNavbar
        brand={<Brand />}
        end={(
          <span>
            디테계
            <LogoutIcon
              icon="logout"
              pointer
              title="로그아웃"
              onClick={onClickLogout}
            />
          </span>
        )}
      />
    </header>
  );
};

export default withRouter(DefaultNavbar);

const Brand = styled(BrandImage)`
  display: block;
  height: 32px;
`;

const LogoutIcon = styled(DimiIcon)`
  margin-left: 0.5rem;
  cursor: pointer;
`;
