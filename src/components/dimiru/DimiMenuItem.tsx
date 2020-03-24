import React from 'react';
import { useLocation, RouteComponentProps, withRouter } from 'react-router-dom';

import styled from '@emotion/styled';
import css from '@emotion/css';

import variables from '../../scss/_variables.scss';

interface DimiMenuItemProps {
  route: string;
  active?: boolean;
  disabled?: boolean;
}

export interface MenuItem extends DimiMenuItemProps {
  name: string;
}

const DimiMenuItem: React.FC<DimiMenuItemProps & RouteComponentProps> = ({
  route,
  children,
  history,
  disabled,
}) => {
  const { pathname: currentPath } = useLocation();
  const onClickMenu = disabled ? undefined : () => history.push(route);

  return (
    <Menu
      route={route}
      active={currentPath === route}
      onClick={onClickMenu}
      disabled={disabled}
    >
      {children}
    </Menu>
  );
};

export default withRouter(DimiMenuItem);

const Menu = styled.a<DimiMenuItemProps>`
  display: block;
  width: fit-content;
  padding: 0.6em;
  margin-left: 0.6em;
  border-radius: 4em;
  color: ${variables.grayLight};
  font-size: 16px;
  font-weight: ${variables.fontWeightBold};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
  }

  ${({ disabled }) => disabled
    && css`
      cursor: default;

      &:hover {
        box-shadow: none;
      }
    `};

  ${({ active }) => active
    && css`
      background-color: ${variables.red} !important;
      box-shadow: 0 5px 15px rgba(234, 51, 51, 0.41);
      color: ${variables.white};
      text-shadow: 2px 2px 3px rgba(248, 105, 105, 0.9);

      &:hover {
        box-shadow: 0 3px 15px rgba(234, 51, 51, 0.41);
      }
    `};
`;
