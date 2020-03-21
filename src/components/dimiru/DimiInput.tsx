import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

import variables from '../../scss/_variables.scss';

type DimiInputProps = {
  value?: string;
  errorMessage?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  error?: boolean;
  onKeyUp?: () => void;
  onChange?: () => void;
}

const DimiInput: React.FC<DimiInputProps> = ({
  value, onChange,
  errorMessage = '', id = '',
  placeholder = '', type = 'text',
  className = '', error,
  onKeyUp,
}) => (
  <Wrapper>
    <Input
      className={className}
      id={id}
      value={value}
      type={type}
      placeholder={placeholder}
      error={error}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
    {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

type InputProps = {
  error?: boolean;
};

const Input = styled.input<InputProps>`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75em 1.5em;
  border: 0;
  appearance: none;
  background-color: ${variables.grayLighten};
  border-radius: 30px;
  box-shadow: inset 2px 2px 12px ${variables.shadow}, inset -5px -5px 8px ${variables.white};
  font-family: 'NanumSquareRound', sans-serif;
  font-size: inherit;
  transition: all 0.2s ease-in-out;

  &:focus {
    box-shadow: inset 1px 1px 16px ${variables.shadow}, inset -2px -2px 3px ${variables.white};
  }

  &::placeholder {
    color: ${variables.gray};
  }

  ${({ error = false }) => error && css`
    background-color: lighten(${variables.red}, 35%);
  `};
`;

const ErrorMessage = styled.p`
  position: absolute;
  padding-left: 1em;
  margin-top: 0.375em;
  color: ${variables.red};
  font-size: 12px;
`;

export default DimiInput;
