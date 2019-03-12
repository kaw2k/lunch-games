import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import values from 'ramda/es/values'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { sortBy } from 'ramda'

interface Props {}

export const WerewolfSpectateGame: React.SFC<Props> = ({}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const classes = useCommonStyles()

  return (
    <>
      <div className={classes.twoColumns}>
        {sortBy(p => !p.alive, values(game.players)).map(player => (
          <WerewolfProfile
            alignItems="flex-start"
            showRole
            showLiving
            key={player.id}
            player={player}
          />
        ))}
      </div>
    </>
  )
}
