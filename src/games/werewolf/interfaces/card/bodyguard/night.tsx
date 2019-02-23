import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { NightViewProps } from '../../nightViewInterfaces'
import { guard } from '../../../interfaces/actions'
import { NightViewBase } from '../../../components/night/nightActionViewBase'

const NightView: React.SFC<NightViewProps> = ({ done, player, callByName }) => {
  const { game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <NightViewBase
        title="Bodyguard, wake up! Protect someone, they will not die tonight."
        player={player}
        done={done}
        callByName={callByName}
        role="bodyguard">
        <ChoosePlayers
          doneText="protect"
          onDone={([target]) => {
            done([guard({ target })])
          }}
          players={values(game.players).filter(p => p.alive)}>
          {props => <WerewolfProfile {...props} />}
        </ChoosePlayers>
      </NightViewBase>
    </>
  )
}

export const NightPlayerView = NightView
export const NightModeratorView = NightView
