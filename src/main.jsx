import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ThemeContextProvider from "./context/ThemeContext";
import UserContextProvider from "./context/UserContext";


ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
