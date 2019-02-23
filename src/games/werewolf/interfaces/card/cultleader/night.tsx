import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { NightViewProps } from '../../../interfaces/nightViewInterfaces'
import { indoctrinate } from '../../../interfaces/actions'
import { NightViewBase } from '../../../components/night/nightActionViewBase'

const NightView: React.SFC<NightViewProps> = ({ player, callByName, done }) => {
  const { game } = React.useContext(WerewolfGameContext)
  return (
    <>
      <NightViewBase
        callByName={callByName}
        player={player}
        done={done}
        role="cult leader"
        title="Cult leader, wake up! Indoctrinate someone, they are now in your cult.">
        <ChoosePlayers
          removePlayer={player}
          doneText="indoctrinate"
          onDone={([target]) => {
            done([indoctrinate({ target, source: player.id })])
          }}
          players={values(game.players).filter(
            p => !contains(player.id, p.inCult) && p.alive
          )}>
          {props => <WerewolfProfile {...props} />}
        </ChoosePlayers>
      </NightViewBase>
    </>
  )
}

export const NightPlayerView = NightView
export const NightModeratorView = NightView
