import * as React from 'react'
import { ViewRole } from '../../../../components/viewRole/role'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { ViewAllies } from '../../../../components/viewRole/allies'
import { isWerewolf } from '../../../../helpers/isWerewolf'
import values from 'ramda/es/values'
import { Typography } from '@material-ui/core'
import { isRole } from '../../../../interfaces/card/cards'
import { Mason } from '../../../../interfaces/card/mason'

export const WerewolfPlayerDayRole: React.SFC = ({}) => {
  const { player, game } = React.useContext(WerewolfGameContext)
  return (
    <>
      <Typography gutterBottom variant="h2">
        {player.name || player.id}
      </Typography>

      <ViewRole role={player.role} />
      {player.secondaryRole && (
        <>
          <Typography gutterBottom variant="h2">
            Your secondary role:
          </Typography>
          <ViewRole role={player.secondaryRole} />
        </>
      )}

      {isRole(player, Mason.role) && (
        <ViewAllies
          allies={values(game.players).filter(
            p => isRole(p, Mason.role) && p.id !== player.id
          )}
        />
      )}

      {isWerewolf(player, game) && (
        <ViewAllies
          showRole
          allies={values(game.players).filter(
            p => isWerewolf(p, game) && p.id !== player.id
          )}
        />
      )}
    </>
  )
}
