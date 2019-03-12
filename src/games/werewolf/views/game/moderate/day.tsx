import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import {
  voteKill,
  showPrompts,
  sudoKill,
  revivePlayer,
} from '../../../interfaces/actions'
import { values, sortBy } from 'ramda'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { startNight } from '../../../helpers/gameEngine'
import { PlayerId } from '../../../../../interfaces/player'
import { useTimer } from '../../../../../hooks/useTimer'
import { Typography } from '@material-ui/core'

interface Props {}

export const DayModerator: React.SFC<Props> = () => {
  const { game, updateGame, runActions } = React.useContext(WerewolfGameContext)
  const [selectedPlayer, setSelectedPlayer] = React.useState<PlayerId | null>(
    null
  )
  const classes = useCommonStyles()
  const time = useTimer(game.timer || Date.now(), game.options.dayTimeLimit)

  if (selectedPlayer) {
    const player = game.players[selectedPlayer]

    return (
      <>
        <WerewolfProfile player={player} showLiving showRole />

        <ActionRow>
          <Button
            confirm
            onClick={() => {
              runActions([revivePlayer({ target: player.id })])
              setSelectedPlayer(null)
            }}>
            Revive
          </Button>
          <Button
            confirm="you should only use this as a last resort"
            onClick={() => {
              runActions([sudoKill({ target: player.id }), showPrompts({})])
              setSelectedPlayer(null)
            }}>
            Moderator Kill
          </Button>
        </ActionRow>

        <Button
          color="red"
          onClick={() => {
            runActions([voteKill({ target: player.id }), showPrompts({})])
            setSelectedPlayer(null)
          }}>
          Kill
        </Button>

        <ActionRow fixed>
          <Button onClick={() => setSelectedPlayer(null)}>cancel</Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      {!!game.options.dayTimeLimit && (
        <Typography variant="h2">{time.message}</Typography>
      )}

      <div className={classes.twoColumns}>
        {sortBy(p => !p.alive, values(game.players)).map(player => (
          <WerewolfProfile
            alignItems="flex-start"
            showRole
            showLiving
            key={player.id}
            player={player}
            onClick={() => setSelectedPlayer(player.id)}
          />
        ))}
      </div>

      <ActionRow fixed>
        <Button
          color="green"
          confirm
          onClick={() => updateGame(startNight(game))}>
          start night
        </Button>
      </ActionRow>
    </>
  )
}
