import { install } from '@material-ui/styles'
install()

import * as React from 'react'
import { render } from 'react-dom'
import { App } from './views'
import 'babel-polyfill'
import { ErrorBoundary } from './components/errorBoundry'

render(
  <ErrorBoundary>
    <App />

    <style jsx global>{`
      body {
        font-family: 'Roboto', sans-serif;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      *:not(input) {
        user-select: none;
      }

      h1 {
        font-size: 1.5rem;
      }
      h2 {
        font-size: 1.25rem;
      }
      h3 {
        font-size: 1.1rem;
      }
      h4 {
        font-size: 1rem;
      }

      h1,
      h2,
      h3,
      h4 {
        display: flex;
        align-items: center;
      }

      h1 img,
      h2 img,
      h4 img,
      h4 img {
        padding-right: 0.5em;
      }

      li {
        list-style: none;
      }
    `}</style>
  </ErrorBoundary>,
  document.getElementById('root')
)
