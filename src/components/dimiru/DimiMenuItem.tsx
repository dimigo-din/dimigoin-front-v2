import styled from '@emotion/styled';
import css from '@emotion/css';

import variables from '../../scss/_variables.scss';

interface DimiMenuItemProps {
  route: string;
  active?: boolean;
}

export interface MenuItem extends DimiMenuItemProps {
  name: string;
}

const DimiMenuItem = styled.a<DimiMenuItemProps>`
  display: block;
  width: fit-content;
  padding: 0.6em;
  margin-left: 0.6em;
  border-radius: 4em;
  color: ${variables.grayLight};
  font-size: 16px;
  font-weight: ${variables.fontWeightBold};
  text-decoration: none;

  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
  }

  ${({ active = false }) => active && css`
    background-color: ${variables.red} !important;
    box-shadow: 0 5px 15px rgba(234, 51, 51, 0.41);
    color: ${variables.white};
    text-shadow: 2px 2px 3px rgba(248, 105, 105, 0.9);

    &:hover {
      box-shadow: 0 3px 15px rgba(234, 51, 51, 0.41);
    }
  `};
`;

export default DimiMenuItem;
