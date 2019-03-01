import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { PlayerWerewolf } from '../../../interfaces/player'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { sudoKill, voteKill } from '../../../interfaces/actions'

interface Props {
  player: PlayerWerewolf
  done: () => void
}

export const DayPlayer: React.SFC<Props> = ({ player, done }) => {
  const { runActions } = React.useContext(WerewolfGameContext)

  return (
    <>
      <WerewolfProfile player={player} showLiving showRole />

      <Button
        color="red"
        confirm="Only use this if you need to"
        onClick={() => {
          runActions([sudoKill({ target: player.id })])
          done()
        }}>
        Sudo Kill
      </Button>

      <Button
        onClick={() => {
          runActions([voteKill({ target: player.id })])
          done()
        }}>
        Vote Kill
      </Button>

      <ActionRow fixed>
        <Button onClick={done}>cancel</Button>
      </ActionRow>
    </>
  )
}
