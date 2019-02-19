import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { runActions } from '../../../helpers/gameEngine'
import { getActionCreator } from '../../../interfaces/actions'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'

interface Props {}

export const WerewolfModeratorGame: React.SFC<Props> = () => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)
  const classes = useCommonStyles()

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
            onClick={() => {
              updateGame(
                runActions(game, [getActionCreator('werewolf kill')(player.id)])
              )
            }}
          />
        ))}
      </div>

      <ActionRow fixed>
        <Button color="green" confirm>
          start night
        </Button>
      </ActionRow>
    </>
  )
}
