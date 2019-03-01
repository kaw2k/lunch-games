import * as React from 'react'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import values from 'ramda/es/values'
import { WerewolfProfile } from '../../../../components/werewolfProfile'

export const WerewolfPlayerDayOverview: React.SFC = ({}) => {
  const { game } = React.useContext(WerewolfGameContext)

  return (
    <>
      {values(game.players).map(p => (
        <WerewolfProfile key={p.id} player={p} showLiving />
      ))}
    </>
  )
}
