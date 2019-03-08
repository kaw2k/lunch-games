import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { sudoKill, voteKill } from '../../../interfaces/actions'
import { values } from 'ramda'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { startNight } from '../../../helpers/gameEngine'
import { PlayerId } from '../../../../../interfaces/player'

interface Props {}

export const DayModerator: React.SFC<Props> = () => {
  const { game, updateGame, runActions } = React.useContext(WerewolfGameContext)
  const [selectedPlayer, setSelectedPlayer] = React.useState<PlayerId | null>(
    null
  )
  const classes = useCommonStyles()

  if (selectedPlayer) {
    const player = game.players[selectedPlayer]

    return (
      <>
        <WerewolfProfile player={player} showLiving showRole />

        <Button
          color="red"
          confirm="Only use this if you need to"
          onClick={() => {
            runActions([sudoKill({ target: player.id })])
            setSelectedPlayer(null)
          }}>
          Sudo Kill
        </Button>

        <Button
          onClick={() => {
            runActions([voteKill({ target: player.id })])
            setSelectedPlayer(null)
          }}>
          Vote Kill
        </Button>

        <ActionRow fixed>
          <Button onClick={() => setSelectedPlayer(null)}>cancel</Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      <div className={classes.twoColumns}>
        {values(game.players).map(player => (
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
