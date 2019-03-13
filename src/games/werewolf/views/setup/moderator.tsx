import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values, equals } from 'ramda'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { runActions } from '../../helpers/gameEngine'
import { useCommonStyles } from '../../../../helpers/commonStyles'
import { PlayerId } from '../../../../interfaces/player'
import contains from 'ramda/es/contains'
import uniq from 'ramda/es/uniq'
import { Typography } from '@material-ui/core'

interface Props {}

export const WerewolfModeratorSetup: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)
  const classes = useCommonStyles()

  const allReady = values(game.players).reduce<boolean>(
    (memo, player) => memo && player.ready,
    true
  )

  function setupGame() {
    updateGame({
      ...runActions(game),
      ready: true,
      timer: Date.now(),
    })
  }

  if (!game.playerOrder.length) {
    return <MakeSeatingChart />
  }

  return (
    <>
      <div className={classes.twoColumns}>
        {values(game.players).map(player => (
          <WerewolfProfile
            selected={player.ready}
            showRole
            key={player.id}
            player={player}
          />
        ))}
      </div>

      <ActionRow fixed>
        <Button
          disabled={!allReady}
          color={allReady ? 'green' : 'red'}
          onClick={setupGame}>
          Ready
        </Button>
      </ActionRow>
    </>
  )
}

const MakeSeatingChart: React.SFC<{}> = () => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)
  const [seats, setSeat] = React.useState<PlayerId[]>([])
  const classes = useCommonStyles()

  const hasAllPlayers = seats.length === values(game.players).length
  const hasNoDuplicates = equals(uniq(seats), seats)

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Set up the seating chart
      </Typography>
      <Typography component="em" gutterBottom>
        Certain roles require the game to know who is next to who. Tap a player
        to add them to the order, then go around the room in one direction
        adding players.
      </Typography>

      <div className={classes.twoColumns}>
        <div>
          <Typography align="center" variant="h3" gutterBottom>
            Un-seated
          </Typography>
          {values(game.players)
            .filter(p => !contains(p.id, seats))
            .map(p => (
              <WerewolfProfile
                player={game.players[p.id]}
                onClick={() => setSeat(seats.concat(p.id))}
              />
            ))}
        </div>

        <div>
          <Typography align="center" variant="h3" gutterBottom>
            Seated
          </Typography>
          {seats.map(p => (
            <WerewolfProfile
              player={game.players[p]}
              onClick={() => setSeat(seats.filter(id => id !== p))}
            />
          ))}
        </div>
      </div>

      <ActionRow fixed>
        <Button
          disabled={!hasAllPlayers || !hasNoDuplicates}
          color={!hasAllPlayers || !hasNoDuplicates ? 'red' : 'green'}
          onClick={() => updateGame({ playerOrder: seats })}>
          Make seating chart
        </Button>
      </ActionRow>
    </>
  )
}
