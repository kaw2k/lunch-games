import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import {
  NightViewProps,
  secondaryNightMessage,
} from '../../../interfaces/night'
import { indoctrinate } from '../../../interfaces/actions'

const NightView: React.SFC<NightViewProps> = ({ player, callByName, done }) => {
  const { game } = React.useContext(WerewolfGameContext)
  return (
    <>
      <ChoosePlayers
        removePlayer={player}
        title={
          callByName
            ? secondaryNightMessage(player)
            : 'Cult leader, wake up! Indoctrinate someone, they are now in your cult.'
        }
        doneText="indoctrinate"
        onDone={([target]) => {
          done([indoctrinate({ target, source: player.id })])
        }}
        players={values(game.players).filter(
          p => !contains(player.id, p.inCult) && p.alive
        )}>
        {props => <WerewolfProfile {...props} />}
      </ChoosePlayers>
    </>
  )
}

export const NightPlayerView = NightView
export const NightModeratorView = NightView
