import { createGlobalStyle } from 'styled-components';
import styledReset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${styledReset}

  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
  }

  html {
    background-color: #efefef;
  }

  ::selection {
    background: #fb5656;
    color: #fff;
  }

  .root {
    font-family: 'NanumSquareRound', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Helvetica, Arial, sans-serif;
    overflow-x: hidden;
  }
`;

export default GlobalStyle;
