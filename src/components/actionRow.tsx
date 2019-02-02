import * as React from 'react'

interface Props {
  fixed?: boolean
}

export const ActionRow: React.SFC<Props> = ({ children, fixed }) => (
  <div className="action-row">
    {children}

    <style jsx>{`
      .action-row {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 3px;

        max-width: 600px;
        margin-left: auto;
        margin-right: auto;

        position: ${fixed ? 'fixed' : 'static'};
        bottom: ${fixed && '1em'};
        left: ${fixed && '1em'};
        right: ${fixed && '1em'};
      }

      .action-row > :global(*) {
        flex: 1 1 auto;
        border-left-width: 0;
        border-right-width: 0;
      }

      .action-row > :global(*) + :global(*) {
        border-left: none;
      }

      .action-row > :global(:first-child) {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        border-left-width: 1px;
      }

      .action-row > :global(:last-child) {
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        border-right-width: 1px;
      }
    `}</style>

    <style jsx global>{`
      #root {
        padding-bottom: ${fixed && '4em'};
      }
    `}</style>
  </div>
)
