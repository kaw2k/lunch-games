import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { PlayerWerewolf } from '../../../interfaces/player'
import { getActionCreator } from '../../../interfaces/actions'

const NightView: React.SFC<{ player: PlayerWerewolf; done: () => void }> = ({
  player,
  done,
}) => {
  const { game, addAction } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ChoosePlayers
        removePlayer
        title="Cult leader, wake up! Indoctrinate someone, they are now in your cult."
        doneText="indoctrinate"
        onDone={([target]) => {
          addAction(getActionCreator('indoctrinate')(target, player.id))
          done()
        }}
        players={values(game.players).filter(
          p => contains(player.id, p.inCult) && p.alive
        )}>
        {props => <WerewolfProfile {...props} />}
      </ChoosePlayers>
    </>
  )
}

export const NightPlayerView = NightView
export const NightModeratorView = NightView
