import * as React from 'react'

interface Props {
  padded?: boolean
}

export const Layout: React.SFC<Props> = ({ children, padded }) => (
  <div className="layout">
    {children}

    <style jsx>{`
      .layout {
        padding: ${padded ? '1em' : '0'};
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
