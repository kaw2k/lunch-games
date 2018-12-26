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
        font-size: 20px;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      h1 {
        font-size: 1.5em;
      }
      h2 {
        font-size: 1.25em;
      }
      h3 {
        font-size: 1.1em;
      }

      li {
        list-style: none;
      }
    `}</style>
  </ErrorBoundary>,
  document.getElementById('root')
)
