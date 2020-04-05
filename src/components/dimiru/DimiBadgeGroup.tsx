/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import * as React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import variables from '../../scss/_variables.scss';

export default ({
  value = 0,
  colors = ['gray'],
  items,
  input,
  onClick,
}: {
  value?: number;
  colors: string[];
  items: string[];
  onClick?: (event: {
    value: number;
    items: string[];
    setPrevent(willSetValue: boolean): void;
    done(): void;
  }) => void;
  input?: (index: number) => void;
}) => {
  const onClickBadge = (index: number) => {
    let prevent = false;
    const event = {
      value: index,
      items,
      setPrevent(willSetValue: boolean) {
        prevent = willSetValue;
      },
      done() {
        if (!prevent && input) input(index);
      },
    };
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <Group>
      {items.map((item, index) => (
        <Button
          role="button"
          // key={`button-${index}`}
          data-active={index === value}
          onClick={() => onClickBadge(index)}
          css={css`
            border-color: ${colors[value]};
            color: ${colors[value]};
          `}
        >
          {item}
        </Button>
      ))}
    </Group>
  );
};

const Group = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: ${variables.fontWeightBold};
  user-select: none;
`;

const Button = styled.div`
  display: inline-block;
  width: 70px;
  padding-top: 0.35em;
  padding-bottom: 0.25em;
  border: 1px solid ${variables.black};
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:first-child {
    border-bottom-left-radius: 4em;
    border-top-left-radius: 4em;
  }

  &:last-child {
    border-bottom-right-radius: 4em;
    border-top-right-radius: 4em;
  }

  &:not(:last-child) {
    border-right: 0;
  }
`;
