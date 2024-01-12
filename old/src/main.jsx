import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.scss'
import { createGlobalStyle } from 'styled-components'
import THEMES from './themes'

const randomNum = Math.floor(Math.random() * Object.keys(THEMES).length)
const theme = THEMES[Object.keys(THEMES)[randomNum]]

const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${theme.backgroundColor};
    color: ${theme.color};
  }
  a {
    background: ${theme.buttonBackground};
    padding: 0.2em;
    border-radius: 10px;
    color: ${theme.linkColor}
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
)
