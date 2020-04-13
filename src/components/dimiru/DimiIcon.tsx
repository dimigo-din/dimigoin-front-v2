import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

import variables from '../../scss/_variables.scss';

interface IIcon {
  pointer?: boolean;
}

interface IDimiIcon extends IIcon {
  icon: string;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  pointer?: boolean;
  onClick?: () => void;
}

const DimiIcon: React.FC<IDimiIcon> = ({
  children,
  icon,
  title = '',
  pointer = false,
  className = '',
  onClick,
}) => (
  <Wrapper className={className}>
    {children}
    <Icon
      className={`icon-${icon}`}
      title={title}
      pointer={pointer}
      onClick={onClick}
    />
  </Wrapper>
);

export default DimiIcon;

const Wrapper = styled.div`
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  border: 0;
  border-radius: 100%;
  box-shadow: -5px -5px 20px ${variables.white},
    5px 5px 20px ${variables.shadow};
  outline: 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: -2px -2px 5px ${variables.white},
      2px 2px 5px ${variables.shadow};
  }

  &:active {
    box-shadow: inset 1px 1px 2px ${variables.shadow},
      inset -1px -1px 2px ${variables.white};
  }
`;

const Icon = styled.a<IIcon>`
  ${({ pointer }) => pointer
    && css`
      cursor: ${pointer ? 'pointer' : 'default'};
    `};
`;
