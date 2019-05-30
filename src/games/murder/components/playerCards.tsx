import * as React from 'react'
import { Typography } from '@material-ui/core'
import { includes } from 'ramda'
import without from 'ramda/es/without'
import { PlayerMurder } from '../interfaces/player'
import { MurderGameContext } from '../../../helpers/contexts'
import { useCommonStyles } from '../../../helpers/commonStyles'
import { playerName } from '../../../components/playerName'
import { Card } from './card'

export const PlayerCards: React.SFC<{
  player: PlayerMurder
}> = ({ player }) => {
  const { player: activePlayer, updateGamePlayer } = React.useContext(
    MurderGameContext
  )
  const classes = useCommonStyles()

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        {playerName(player)}'s cards
      </Typography>

      <div className={classes.row}>
        {player.evidence.map(e => {
          const selected = includes(e.id, activePlayer.markedEvidences)

          return (
            <Card
              item={e}
              key={e.id}
              onClick={() => {
                updateGamePlayer({
                  ...activePlayer,
                  markedEvidences: selected
                    ? without([e.id], activePlayer.markedEvidences)
                    : activePlayer.markedEvidences.concat(e.id),
                })
              }}
              selected={selected}
            />
          )
        })}
      </div>

      <div className={classes.row}>
        {player.weapons.map(w => {
          const selected = includes(w.id, activePlayer.markedWeapons)

          return (
            <Card
              item={w}
              key={w.id}
              onClick={() =>
                updateGamePlayer({
                  ...activePlayer,
                  markedWeapons: selected
                    ? without([w.id], activePlayer.markedWeapons)
                    : activePlayer.markedWeapons.concat(w.id),
                })
              }
              selected={selected}
            />
          )
        })}
      </div>
    </>
  )
}
