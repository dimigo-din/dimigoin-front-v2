import React from 'react';
import css from '@emotion/css';
import variables from '../../scss/_variables.scss';

type DimiButtonProps = {
  gray?: boolean;
  active?: boolean;
  loading?: boolean;
  href?: string;
  small?: boolean;
  large?: boolean;
  text?: boolean;
  click?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: React.ReactNode;
};

const style = {
  btn: css`
    position: relative;
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 0.8em 2.7em;
    appearance: none;
    background-color: ${variables.red};
    border-radius: 2rem;
    box-shadow: 0 10px 24px 0 rgba(234, 51, 51, 0.61);
    color: ${variables.white};
    cursor: pointer;
    font-weight: ${variables.fontWeightBold};
    text-decoration: none;
    text-shadow: 2px 2px 3px rgba(248, 105, 105, 0.9);
    transition: all 0.2s ease-in-out, 0.5s background-color ease;
    user-select: none;
    white-space: nowrap;

    &:hover {
      box-shadow: 0 5px 12px 0 rgba(234, 51, 51, 0.41);
    }
  `,
  gray: css`
    background-color: ${variables.grayLighten};
    box-shadow: 0 10px 24px 0 rgba(50, 50, 50, 0.11);
    color: ${variables.grayDark};
    text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.35);
    &:hover {
      box-shadow: 0 5px 12px 0 rgba(234, 234, 234, 0.41);
    }
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

const DimiButton: React.FC<DimiButtonProps> = ({
  gray = false,
  active = true,
  loading = false,
  href = undefined,
  small = false,
  large = false,
  text = false,
  click,
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
      onClick={e => active && click && click(e)}
      {...props}
    >
      {children}
    </a>
  );
};

export default DimiButton;
