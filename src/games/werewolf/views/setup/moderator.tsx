import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { runActions } from '../../helpers/gameEngine'
import { useCommonStyles } from '../../../../helpers/commonStyles'
import { makeSeatingChart } from '../../helpers/neighbors'
import { clone } from '../../../../helpers/clone'
import { PlayerId } from '../../../../interfaces/player'

interface Props {}

export const WerewolfModeratorSetup: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)
  const classes = useCommonStyles()

  const allReady = values(game.players).reduce<boolean>(
    (memo, player) => memo && player.ready,
    true
  )

  function resetSeats() {
    let nextGame = clone(game)
    for (let pid in nextGame.players) {
      nextGame.players[pid].leftNeighbor = null
    }
    updateGame(nextGame)
  }

  function setupGame(playerOrder: PlayerId[]) {
    updateGame({
      ...runActions(game),
      ready: true,
      timer: Date.now(),
      playerOrder,
    })
  }

  const playerOrder = makeSeatingChart(game)

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
        {!playerOrder && (
          <Button onClick={resetSeats}>Reset seating chart</Button>
        )}

        <Button
          disabled={!allReady || !playerOrder}
          color={allReady && playerOrder ? 'green' : 'red'}
          onClick={() => playerOrder && setupGame(playerOrder)}>
          Ready
        </Button>
      </ActionRow>
    </>
  )
}
