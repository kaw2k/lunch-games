import * as React from 'react'

interface Props {
  disableButton?: boolean
  button: string
  onDone: () => void
}

export const ViewRole: React.SFC<Props> = ({
  button,
  onDone,
  disableButton,
}) => {
  return <div>lol</div>
}
