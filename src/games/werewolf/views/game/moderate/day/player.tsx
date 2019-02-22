import * as React from 'react'
import { WerewolfGameContext } from '../../../../../../helpers/contexts'
import { PlayerWerewolf } from '../../../../interfaces/player'
import { Button } from '../../../../../../components/button'
import { ActionRow } from '../../../../../../components/actionRow'
import { runActions } from '../../../../helpers/gameEngine'
import { values } from 'ramda'
import { WerewolfProfile } from '../../../../components/werewolfProfile'
import {
  sudoKill,
  werewolfKill,
  indoctrinate,
} from '../../../../interfaces/actions'

interface Props {
  player: PlayerWerewolf
  done: () => void
}

export const DayPlayer: React.SFC<Props> = ({ player, done }) => {
  const { game, updateGame } = React.useContext(WerewolfGameContext)

  return (
    <>
      <WerewolfProfile player={player} showLiving showRole />

      <Button
        color="red"
        confirm="Only use this if you need to"
        onClick={() => {
          updateGame(runActions(game, [sudoKill({ target: player.id })]))
          done()
        }}>
        Sudo Kill
      </Button>

      <Button
        onClick={() => {
          updateGame(runActions(game, [werewolfKill({ target: player.id })]))
          done()
        }}>
        Werewolf Kill
      </Button>

      <Button
        onClick={() => {
          const cultLeader = values(game.players).find(
            p => p.role === 'cult leader'
          )
          if (!cultLeader) return done()
          updateGame(
            runActions(game, [
              indoctrinate({ target: player.id, source: cultLeader.id }),
            ])
          )
          done()
        }}>
        Indoctrinate
      </Button>

      <ActionRow fixed>
        <Button onClick={done}>cancel</Button>
      </ActionRow>
    </>
  )
}
