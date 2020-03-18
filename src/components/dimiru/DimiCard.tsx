import React from 'react';
import styled, { css } from 'styled-components';

import variables from '../../scss/_variables.scss';

type DimiCardProps = {
  children?: React.ReactNode;
  button?: React.ReactNode;
  hover?: boolean;
  clickable?: boolean;
};

const DimiCard: React.FC<DimiCardProps> = ({ children, button, hover, clickable }) => {
  return (
    <Container
      hover={hover}
      clickable={clickable}
      button={!!button}
    >
      {button ?
        <Content>
          {children}
        </Content>
        : children
      }
      {button &&
        <Button>
          {button}
        </Button>
      }
    </Container>
  );
};

export default DimiCard;

type CardContainerProps = {
  button?: boolean;
  hover?: boolean;
  clickable?: boolean;
};

const Container = styled.div<CardContainerProps>`
  position: relative;
  padding: 25px;
  background-color: ${variables.white};
  border-radius: 3.3rem;
  box-shadow:
    5px 5px 20px #d9d9d9,
    -10px -10px 14px #fff;

  ${({ button = false }) => button && css`
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
  `};

  ${({ hover = false }) => hover && css`

    &:hover {
      z-index: 1;
      box-shadow:
        2px 16px 36px rgba(21, 19, 19, 0.15),
        -5px -5px 10px #fff;
    }
  `};

  ${({ clickable = false }) => clickable && css`

    &:active {
      box-shadow: inset 1px 1px 2px ${variables.shadow},
        inset -1px -1px 2px ${variables.white};
    }
  `};
`;

const Content = styled.div`
  padding: 0.5rem;
`;

const Button = styled.div`
  display: flex;
  align-items: stretch;
  padding: 1.25rem;
  margin-top: auto;
  cursor: pointer;

  & > span {
    flex: 1;
    margin-top: 20px;
    font-weight: ${variables.fontWeightBold};
    text-align: center;
  }
`;
