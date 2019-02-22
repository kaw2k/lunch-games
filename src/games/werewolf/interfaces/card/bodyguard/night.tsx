import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import {
  NightViewProps,
  secondaryNightMessage,
} from '../../../interfaces/night'
import { guard } from '../../../interfaces/actions'

const NightView: React.SFC<NightViewProps> = ({ done, player, callByName }) => {
  const { game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ChoosePlayers
        title={
          callByName
            ? secondaryNightMessage(player)
            : 'Bodyguard, wake up! Protect someone, they will not die tonight.'
        }
        doneText="protect"
        onDone={([target]) => {
          done([guard({ target })])
        }}
        players={values(game.players).filter(p => p.alive)}>
        {props => <WerewolfProfile {...props} />}
      </ChoosePlayers>
    </>
  )
}

export const NightPlayerView = NightView
export const NightModeratorView = NightView
