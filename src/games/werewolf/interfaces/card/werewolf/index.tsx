import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { NightViewProps } from '../../nightViewInterfaces'
import { werewolfKill } from '../../../interfaces/actions'
import { always } from 'ramda'
import { Card } from '../../../interfaces/card'
import { Emoji } from '../../../interfaces/emoji'
import { NightMessageOrder } from '../../../interfaces/nightMessage'
import { GenericSetupWerewolfRoleView } from '../../../components/setupRole/genericWerewolfViewRole'

const title = 'Werewolves, wake up and kill people'

const NightView: React.SFC<NightViewProps> = ({ done }) => {
  const { game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ChoosePlayers
        title={title}
        doneText="kill"
        columns={2}
        onDone={targets => {
          done(targets.map(target => werewolfKill({ target })))
        }}
        players={values(game.players).filter(p => p.alive)}>
        {props => <WerewolfProfile {...props} />}
      </ChoosePlayers>
    </>
  )
}

export const Werewolf = Card({
  role: 'werewolf',
  team: 'werewolves',
  description: `You are a werewolf, Kill everyone who's not a werewolf.`,
  hints: [
    'Never say you are bad.',
    'Claiming lycan works sometimes if the lycan is in the game.',
    'If a handful of people are eliminated already, try claiming seer or apprentice seer.',
  ],
  weight: -6,
  cardCount: 3,
  appearsBad: always(true),
  emoji: Emoji('🐺'),
  image: require('./werewolf.png'),
  profile: require('./werewolf-profile.png'),
  isActive: always(true),
  SetupRoleView: GenericSetupWerewolfRoleView,
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.werewolf,
  },
})
