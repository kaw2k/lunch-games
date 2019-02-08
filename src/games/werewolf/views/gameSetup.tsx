import * as React from 'react'

interface Props {
  ready: () => void
}

export const GameSetup: React.SFC<Props> = ({ ready }) => {
  return <div>setup</div>
}
