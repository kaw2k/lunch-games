import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { NightViewProps } from '../../nightViewInterfaces'
import { guard } from '../../actions'
import { NightViewBase } from '../../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '..'
import { Emoji } from '../../emoji'
import { NightMessageOrder } from '../../nightMessage'
import { GenericSetupRoleView } from '../../../components/setupRole/genericSetupRole'

const nightTitle =
  'Bodyguard, wake up! Protect someone, they will not die tonight.'

const NightView: React.SFC<NightViewProps> = ({ done, ...props }) => {
  const { game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <NightViewBase {...props} done={done} title={nightTitle} role="bodyguard">
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

export const Bodyguard = Card({
  role: 'bodyguard',
  weight: 3,
  team: 'villagers',
  emoji: Emoji('👮‍♀️'),
  cardCount: 1,
  description: `Each night, choose a player who cannot be killed that night.`,
  hints: [
    `Pick yourself to start, if the Seer reveals themselves, start picking them, unless the werewolves know you're the body guard, then protect yourself.`,
  ],
  SetupRoleView: GenericSetupRoleView,
  image: require('./bodyguard.png'),
  profile: require('./bodyguard-profile.png'),
  isActive: player => player.alive,
  appearsBad: always(false),
  night: {
    title: nightTitle,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
