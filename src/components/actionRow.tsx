import * as React from 'react'

interface Props {}

export const ActionRow: React.SFC<Props> = ({ children }) => (
  <div className="action-row">
    {children}

    <style jsx>{`
      .action-row {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: auto !important;
        border: 1px solid black;
        border-radius: 3px;
      }

      .action-row > :global(*) {
        flex: 1 1;
      }

      .action-row > :global(*) + :global(*) {
        border-left: 1px solid black;
      }
    `}</style>
  </div>
)
