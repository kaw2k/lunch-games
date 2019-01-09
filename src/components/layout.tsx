import * as React from 'react'

interface Props {}

export const Layout: React.SFC<Props> = ({ children }) => (
  <div className="layout">
    {children}

    <style jsx>{`
      .layout {
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
