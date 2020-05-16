import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './store'

import {MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme.js'

import App from './App'

import {addSnackbar} from './state/snackbars'

window.snack = (text, color, time) => store.dispatch(addSnackbar(text, color, time))

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
        <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)
