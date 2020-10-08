import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { store } from './features/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/core/styles'
import { basicTheme } from './features/theme'
import LuxonUtils from '@date-io/luxon'
import './features/locale'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={basicTheme}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Router>
            <App />
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
