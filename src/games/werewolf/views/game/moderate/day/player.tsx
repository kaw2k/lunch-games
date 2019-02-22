import * as React from 'react'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { PlayerWerewolf } from '../../../../interfaces/player'
import { Button } from '../../../../../../components/button'
import { ActionRow } from '../../../../../../components/actionRow'
import { runActions } from '../../../../helpers/gameEngine'
import { getActionCreator } from '../../../../interfaces/actions'
import { values } from 'ramda'
import { WerewolfProfile } from '../../../../components/werewolfProfile'

interface Props {
  player: PlayerWerewolf
  done: () => void
}

export const DayPlayer: React.SFC<Props> = ({ player, done }) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  function kill() {
    updateGame(runActions(game, [getActionCreator('sudo kill')(player.id)]))
    done()
  }

  function werewolfKill() {
    updateGame(runActions(game, [getActionCreator('werewolf kill')(player.id)]))
    done()
  }

  function indoctrinate() {
    const cultLeader = values(game.players).find(p => p.role === 'cult leader')
    if (!cultLeader) return done()
    updateGame(
      runActions(game, [
        getActionCreator('indoctrinate')(player.id, cultLeader.id),
      ])
    )
    done()
  }

  return (
    <>
      <WerewolfProfile player={player} showLiving showRole />

      <Button color="red" confirm="Only use this if you need to" onClick={kill}>
        Sudo Kill
      </Button>

      <Button onClick={werewolfKill}>Werewolf Kill</Button>

      <Button onClick={indoctrinate}>Indoctrinate</Button>

      <ActionRow fixed>
        <Button onClick={done}>cancel</Button>
      </ActionRow>
    </>
  )
}
