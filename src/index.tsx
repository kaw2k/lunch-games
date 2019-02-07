import { install } from '@material-ui/styles'
install()

import CssBaseline from '@material-ui/core/CssBaseline'

import * as React from 'react'
import { render } from 'react-dom'
import { App } from './views'
import 'babel-polyfill'
import { ErrorBoundary } from './components/errorBoundry'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { blue, red } from '@material-ui/core/colors'

render(
  <ErrorBoundary>
    <MuiThemeProvider
      theme={createMuiTheme({
        // Colors!
        palette: {
          primary: blue,
          secondary: red,
        },

        // Remove all shadows in the app
        shadows: [
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
        ],

        // Reset our font sizes to be smaller
        typography: {
          fontSize: 14,
          useNextVariants: true,

          h1: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          h2: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          h3: {
            fontSize: 16,
          },
          h4: {
            fontSize: 14,
          },
          h5: {
            fontSize: 14,
          },
          h6: {
            fontSize: 14,
          },
        },

        overrides: {
          MuiTypography: {
            root: {
              // display: 'flex',
              // alignItems: 'center',
            },
          },
          MuiButton: {
            sizeLarge: {
              padding: '1em',
            },
          },
        },
      })}>
      <App />
    </MuiThemeProvider>
    <CssBaseline />
  </ErrorBoundary>,
  document.getElementById('root')
)
