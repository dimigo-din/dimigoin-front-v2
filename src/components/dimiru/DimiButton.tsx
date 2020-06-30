import React from 'react';
import css from '@emotion/css';
import variables from '../../scss/_variables.scss';

interface IDimiButton {
  gray?: boolean;
  active?: boolean;
  loading?: boolean;
  href?: string;
  small?: boolean;
  large?: boolean;
  text?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const style = {
  btn: css`
    position: relative;
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 18px 167px;
    appearance: none;
    background-color: ${variables.blue};
    border-radius: 5px;
    color: ${variables.white};
    cursor: pointer;
    font-size: 17px;
    font-weight: ${variables.fontWeightBold};
    text-decoration: none;
    transition: all 0.2s ease-in-out, 0.5s background-color ease;
    user-select: none;
    white-space: nowrap;
  `,
  gray: css`
    background-color: ${variables.grayLighten};
    box-shadow: 0 10px 24px 0 rgba(50, 50, 50, 0.11);
    color: ${variables.grayDark};
  `,
  text: css`
    background-color: transparent;
  `,
  disableCurser: css`
    cursor: not-allowed;
  `,
  large: css`
    font-size: 24px;
  `,
  small: css`
    font-size: 12px;
  `,
};

const DimiButton: React.FC<IDimiButton> = ({
  gray = false,
  active = true,
  loading = false,
  href = undefined,
  small = false,
  large = false,
  text = false,
  onClick,
  children,
  ...props
}) => {
  const buttonStyle = [
    style.btn,
    gray && style.gray,
    text && style.text,
    (loading || !active) && style.disableCurser,
    large && style.large,
    small && style.small,
  ].filter(Boolean);
  return (
    <a
      href={href}
      css={buttonStyle}
      onClick={(e) => active && onClick && onClick(e)}
      {...props}
    >
      {children}
    </a>
  );
};

export default DimiButton;
