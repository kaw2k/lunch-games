import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { PlayerWerewolf } from '../../../interfaces/player'
import { getActionCreator } from '../../../interfaces/actions'

const NightView: React.SFC<{ player: PlayerWerewolf; done: () => void }> = ({
  done,
}) => {
  const { game, addAction } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ChoosePlayers
        title="Bodyguard, wake up! Protect someone, they will not die tonight."
        doneText="protect"
        onDone={([target]) => {
          addAction(getActionCreator('guard')(target))
          done()
        }}
        players={values(game.players).filter(p => p.alive)}>
        {props => <WerewolfProfile {...props} />}
      </ChoosePlayers>
    </>
  )
}

export const NightPlayerView = NightView
export const NightModeratorView = NightView
