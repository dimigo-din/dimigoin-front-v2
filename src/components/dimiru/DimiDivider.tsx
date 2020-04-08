import styled from '@emotion/styled';
import css from '@emotion/css';

import variables from '../../scss/_variables.scss';

interface IDimiDivider {
  vertical?: boolean;
  horizontal?: boolean;
}

const DimiDivider = styled.hr<IDimiDivider>`
  position: absolute;
  border: 0;

  ${({ horizontal = false }) => horizontal
    && css`
      right: 0;
      left: 0;
      border-top: solid 1px ${variables.grayLighten};
    `}

  ${({ vertical = false }) => vertical
    && css`
      top: 0;
      bottom: 0;
      border-left: solid 1px ${variables.grayLighten};
    `}
`;

export default DimiDivider;
