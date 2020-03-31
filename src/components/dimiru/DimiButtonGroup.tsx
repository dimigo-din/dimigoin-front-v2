/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import * as React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import variables from '../../scss/_variables.scss';

export default ({
  value = 0, colors = ['gray'], items, click, clickable = true,
}: {
  value?: number;
  colors: string[];
  items: string[];
  click?: (index: number) => void;
  clickable?: boolean;
}) => {
  const onclick = (index: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (click) {
      click(index);
    }
  };
  return (
    <Group>
      {items.map((item, index) => (
        <Button
          role="button"
          clickable={clickable}
          key={`button-${item}`}
          data-active={index === value}
          onClick={(event) => onclick(index, event)}
          css={css`
            border-color: ${colors[index]};
            color: ${colors[index]};
          `}
        >
          { item }
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

const Button = styled.div<{
  clickable: boolean;
}>`
  display: inline-block;
  width: 70px;
  padding-top: 0.35em;
  padding-bottom: 0.25em;
  border: 1px solid ${variables.black};
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  ${({ clickable }) => clickable || `
    cursor: not-allowed;
  `}
  &:first-of-type {
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
