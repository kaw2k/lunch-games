import * as React from 'react'

interface Props {}

export const Layout: React.SFC<Props> = ({ children }) => (
  <div className="layout">
    {children}

    <style jsx>{`
      .layout {
        display: flex;
        flex-flow: column;
        justify-content: center;
        height: 100%;
        padding: 1em;
      }

      .layout > :global(*) {
        margin-bottom: 1em;
      }

      .layout > :global(*:last-child) {
        margin-bottom: 0;
      }
    `}</style>
  </div>
)
