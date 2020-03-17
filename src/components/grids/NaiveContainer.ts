import styled from 'styled-components';

import variables from '../../scss/_variables.scss';
import Container from './Container';

const NaiveContainer = styled(Container)`
  @media (min-width: ${variables.widescreen}) {
    width: calc(${variables.desktop} - ${variables.doubleGap});
  }
`;

export default NaiveContainer;
