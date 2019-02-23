import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { NightViewProps } from '../../nightViewInterfaces'
import { werewolfKill } from '../../../interfaces/actions'

const NightView: React.SFC<NightViewProps> = ({ done, player, callByName }) => {
  const { game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ChoosePlayers
        title="Werewolves, wake up and kill someone"
        doneText="kill"
        onDone={targets => {
          done(targets.map(target => werewolfKill({ target })))
        }}
        players={values(game.players).filter(p => p.alive)}>
        {props => <WerewolfProfile {...props} />}
      </ChoosePlayers>
    </>
  )
}

export const NightPlayerView = NightView
export const NightModeratorView = NightView
