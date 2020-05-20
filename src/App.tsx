import React from 'react';
import { StylesProvider } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components/';

import 'typeface-roboto';

import Search from './Search/Search';

// Add global HTTP client
// Add global styles
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root, #App, #App>div {
    height: 100%
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto';
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

function App() {
  return (
    <React.Fragment>
      <StylesProvider injectFirst>
        <GlobalStyle />
        <div id="App">
          <Search />
        </div>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
