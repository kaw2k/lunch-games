import * as React from 'react'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'
import { ChoosePlayer } from './choosePlayer'

export const InspectRole: React.SFC<{}> = () => {
  const { updateGame } = React.useContext(SecretHitlerGameContext)

  return (
    <ChoosePlayer
      title="Who would you like to inspect?"
      doneText="inspect"
      done={p => {
        alert(p.role.party)
        updateGame({})
      }}
    />
  )
}
