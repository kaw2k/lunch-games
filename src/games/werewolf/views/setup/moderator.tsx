import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { runActions } from '../../helpers/gameEngine'
import { useCommonStyles } from '../../../../helpers/commonStyles'

interface Props {}

export const WerewolfModeratorSetup: React.SFC<Props> = ({}) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)
  const classes = useCommonStyles()

  const allReady = values(game.players).reduce<boolean>(
    (memo, player) => memo && player.ready,
    true
  )

  console.log(game)

  function setupGame() {
    updateGame({
      ...runActions(game),
      ready: true,
    })
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
