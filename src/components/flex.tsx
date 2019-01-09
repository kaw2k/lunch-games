import * as React from 'react'

interface Props {
  flow?: 'row' | 'column'
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
}

export const Flex: React.SFC<Props> = ({ children, flow, justify }) => (
  <div className={`flex ${flow} ${justify}`}>
    {children}

    <style jsx>{`
      .flex {
        display: flex;
        justify-content: ${justify};
        flex-flow: ${flow};
        flex-wrap: wrap;
      }

      .flex > :global(*) + :global(*) {
        ${(!flow || flow === 'column') && !justify && `margin-top: 1em;`}
      }
    `}</style>
  </div>
)
