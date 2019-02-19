import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { WerewolfProfile } from '../../../components/werewolfProfile'

interface Props {}

export const WerewolfPlayerGame: React.SFC<Props> = () => {
  const { player } = React.useContext(WerewolfGameContext)

  return (
    <>
      <WerewolfProfile showLiving player={player} />
    </>
  )
}
