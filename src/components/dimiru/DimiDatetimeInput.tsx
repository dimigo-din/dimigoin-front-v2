import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import styled from 'styled-components';

import variables from '../../scss/_variables.scss';

const DimiDatetimePicker = ({ className = '', value, onChange }: {
  className?: string;
  value?: string;
  onChange?: (date: string) => void;
}) => (
  <StyledDateTimePicker
    className={className}
    value={value}
    onChange={onChange}
  />
);

export default DimiDatetimePicker;

const StyledDateTimePicker = styled(DateTimePicker)`
  padding: 0.5rem 1rem;
  box-shadow: -5px -5px 20px #fff, 5px 5px 20px #dadeeb;
  border-radius: 30px;
  font-size: 0.95rem;
  color: ${variables.grayDark};

  & > div.react-datetime-picker__wrapper {
    border: none;
  }

  & > button.react-datetime-picker__button {
    color: ${variables.grayDark};
  }

  .react-datetime-picker__button:enabled:hover .react-datetime-picker__button__icon,
  .react-datetime-picker__button:enabled:focus .react-datetime-picker__button__icon {
    stroke: ${variables.pink};
  }

  span {

    * {
      font-size: 13px;
    }

    abbr[title] {
      border-bottom: none !important;
      cursor: inherit !important;
      text-decoration: none !important;
    }
  }
`;
