import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import variables from '../../scss/_variables.scss';

const spinning = keyframes`
    0% { transform: rotate(20deg); }
    100% { transform: rotate(380deg); }
    `;
const scaling = keyframes`
    0% { transform: scale(0.3); }
    100% { transform: scale(0.7); }
`;

const DimiLoading = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 3em;
  animation: ${spinning} 1s infinite linear;
  border-radius: 50%;
  vertical-align: middle;

  ::before,
  ::after {
    position: absolute;
    top: 5%;
    left: 0;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    content: '';
  }

  ::before {
    background-color: ${variables.red};
  }
  ::after {
    background-color: #f39798;
  }

  ::before {
    left: 0;
    transform-origin: 10% 50%;
    animation: ${scaling} 1s infinite alternate ease-in-out;
  }
  ::after {
    right: 0;
    left: auto;
    animation: ${scaling} 1s 1s infinite alternate ease-in-out;
    transform: scale(0);
    transform-origin: 90% 50%;
  }
`;

export default DimiLoading;
