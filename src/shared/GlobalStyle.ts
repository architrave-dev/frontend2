import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    margin: 0;
    padding: 0;
  }
    
  body {
    width: 100vw;
    height: 100vh;
    margin: 0px;
    // background-color: #EECFBB; /*for dev*/
  }

  h1, h2, p {
    margin: 0px;
  }

  button {
    appearance: none;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 0px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;