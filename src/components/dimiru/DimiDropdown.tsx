import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

import Dimigoincon from '../Dimigoincon';
import DimiCard from './DimiCard';
import DimiDivider from './DimiDivider';

import variables from '../../scss/_variables.scss';

type DimiDropdownProps = {
  className?: string;
  value: number;
  items: readonly string[];
  onChange: (index: number) => void;
};

const DimiDropdown: React.FC<DimiDropdownProps> = ({
  className, value, items, onChange,
}) => {
  const { length } = items;
  const [active, setActive] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const open = () => setActive(true);

  const onMouseOver = (event: any) => {
    event.stopPropagation();
    setHovered(true);
    open();
  };

  const onMouseOut = (event: any) => {
    event.stopPropagation();
    setHovered(false);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(
      () => setActive(hovered),
      500,
    ));
  };

  const registerItems = useCallback(
    () => {
      itemsRef.current = itemsRef.current.slice(0, length);
    },
    [length],
  );

  const updateWidth = () => {
    if (rootRef && rootRef.current) {
      const { current } = rootRef;
      const { width } = window.getComputedStyle(current);
      const itemElementList = itemsRef.current || [];
      itemElementList.forEach((element) => {
        if (element) {
          // eslint-disable-next-line no-param-reassign
          element.style.width = width;
        }
      });
    }
  };

  const onClickSelect = (index: number) => {
    setActive(false);
    onChange(index);
  };

  useEffect(
    () => {
      registerItems();
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    },
    [registerItems, value],
  );

  return (
    <DropdownRoot
      active={active}
      hovered={hovered}
      className={className}
      onMouseLeave={onMouseOut}
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onClick={open}
      ref={rootRef}
    >
      <View
        className="view"
      >
        {items[value]}
        <ArrowdownIcon icon="arrow-down" />
      </View>
      <DropdownList
        className="list"
        onMouseOver={onMouseOver}
        onFocus={onMouseOver}
      >
        {items.map((item: string, index: number) => (
          <React.Fragment
            key={item}
          >
            <DropdownItem
              onClick={() => onClickSelect(index)}
              ref={(element: HTMLDivElement | null) => {
                itemsRef.current[index] = element;
                return element;
              }}
            >
              <ItemName>
                {item}
              </ItemName>
            </DropdownItem>
            {(index !== (length - 1)) && <ItemDivider />}
          </React.Fragment>
        ))}
      </DropdownList>
    </DropdownRoot>
  );
};

export default DimiDropdown;

type DropdownRootProps = {
  active: boolean;
  hovered: boolean;
};

const DropdownRoot = styled.div<DropdownRootProps>`
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  box-shadow: -5px -5px 20px #fff, 5px 5px 20px #dadeeb;
  padding: 0.75em 1.5em;
  border-radius: 30px;

  ${({ active, hovered }) => (hovered) && css`

    div.view {
      color: ${variables.pink};
    }

    div.list {
      display: block;
    }
  `};
`;

const View = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowdownIcon = styled(Dimigoincon)`
  margin-left: 0.5em;
  font-size: 50%;
`;

const DropdownList = styled(DimiCard)`
  position: absolute;
  left: 0;
  z-index: 1;
  display: none;
  padding: 0;
  margin-top: 0.7em;
  cursor: pointer;
  user-select: none;
  max-height: 15rem;
  overflow-y: auto;
  border-radius: 8px;
`;

const DropdownItem = styled.p`
  padding: 15px 24px;
  background-color: ${variables.white};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${variables.grayLighten};
  }
`;

const ItemName = styled.span`
`;

const ItemDivider = styled(DimiDivider)`
  position: relative !important;
  margin: 0;
`;
